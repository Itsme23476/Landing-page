#!/usr/bin/env python3
"""
Filect SEO keyword finder (cloud + local).

Pulls Google Search Console (+ Bing when it has data), finds on-topic keywords
where the site is SHOWN but NOT CLICKED (high impressions, position ~8-40),
dedupes against existing blog/compare pages and the targeted-keywords log,
and writes a ranked shortlist. The daily routine then drafts the article.

No third-party deps (any Python 3): GSC auth via an openssl-signed JWT.

Credentials come from ENV VARS (how the cloud routine gets them):
  GSC_SERVICE_ACCOUNT_JSON  full service-account key JSON (string)
  BING_API_KEY              Bing Webmaster Tools API key (optional)
  GSC_PROPERTY              defaults to https://filect.io/
Falls back to the local ~/.filect-seo/ files when those env vars are absent,
so the same script runs on the Mac and in the cloud.
"""
import os, json, time, base64, subprocess, tempfile, urllib.request, urllib.parse, glob, re, sys

# repo root = two dirs up from scripts/seo/
REPO = os.environ.get("REPO") or os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SEEDIR = os.path.join(REPO, "scripts", "seo")
LOG = os.path.join(SEEDIR, "targeted-keywords.txt")
OUT = os.path.join(SEEDIR, "candidates.json")

PROPERTY = os.environ.get("GSC_PROPERTY", "https://filect.io/")
BING_KEY = os.environ.get("BING_API_KEY", "")

def _sa_json():
    """Service-account dict from env (cloud) or local file (Mac fallback)."""
    b64 = os.environ.get("GSC_SERVICE_ACCOUNT_B64")   # preferred: .env-safe single line
    if b64:
        return json.loads(base64.b64decode(b64))
    raw = os.environ.get("GSC_SERVICE_ACCOUNT_JSON")
    if raw:
        return json.loads(raw)
    # local fallback: read config.env -> GSC_SERVICE_ACCOUNT file path
    cfg_path = os.path.expanduser("~/.filect-seo/config.env")
    cfg = {}
    if os.path.exists(cfg_path):
        for line in open(cfg_path):
            if "=" in line and not line.strip().startswith("#"):
                k, v = line.strip().split("=", 1); cfg[k] = v
    sa_file = cfg.get("GSC_SERVICE_ACCOUNT", "")
    if sa_file and os.path.exists(sa_file):
        return json.load(open(sa_file))
    sys.exit("No GSC credentials: set GSC_SERVICE_ACCOUNT_JSON or ~/.filect-seo/.")

# on-topic allowlist: a candidate must contain at least one of these
TOPIC = ["file", "folder", "document", "pdf", "search", "organiz", "organis", "sort",
         "spotlight", "finder", "voice", "dictat", "desktop", "index", "tag", "duplicate",
         "declutter", "clean up", "rename", "launcher", "hazel", "everything search",
         "copernic", "listary", "sparkle", "devonthink", "scan", "ocr", "receipt", "screenshot",
         # voice-control / Jarvis / AI-assistant positioning
         "jarvis", "assistant", "agent", "voice control", "hands-free", "hands free",
         "speak", "speech", "transcrib", "claude code", "codex", "control your computer",
         "control my computer", "control your pc", "control my pc"]
BRAND = ["filect", "filec", "fliect", "filct", "fileio"]

def b64url(b): return base64.urlsafe_b64encode(b).rstrip(b"=")

def gsc_token():
    sa = _sa_json()
    now = int(time.time())
    header = b64url(b'{"alg":"RS256","typ":"JWT"}')
    claim = b64url(json.dumps({
        "iss": sa["client_email"],
        "scope": "https://www.googleapis.com/auth/webmasters.readonly",
        "aud": "https://oauth2.googleapis.com/token",
        "iat": now, "exp": now + 3600}).encode())
    si = header + b"." + claim
    with tempfile.NamedTemporaryFile("w", delete=False) as f:
        f.write(sa["private_key"]); pk = f.name
    os.chmod(pk, 0o600)
    sig = subprocess.run(["openssl", "dgst", "-sha256", "-sign", pk, "-binary"],
                         input=si, capture_output=True).stdout
    os.unlink(pk)
    jwt = si + b"." + b64url(sig)
    data = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": jwt.decode()}).encode()
    r = urllib.request.urlopen("https://oauth2.googleapis.com/token", data=data)
    return json.load(r)["access_token"]

def gsc_queries(token, days=90):
    end = time.strftime("%Y-%m-%d", time.gmtime(time.time() - 2 * 86400))
    start = time.strftime("%Y-%m-%d", time.gmtime(time.time() - days * 86400))
    url = ("https://searchconsole.googleapis.com/webmasters/v3/sites/"
           + urllib.parse.quote(PROPERTY, safe="") + "/searchAnalytics/query")
    body = json.dumps({"startDate": start, "endDate": end,
                       "dimensions": ["query"], "rowLimit": 5000}).encode()
    req = urllib.request.Request(url, data=body,
          headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"})
    rows = json.load(urllib.request.urlopen(req)).get("rows", [])
    return [{"kw": r["keys"][0], "impr": r["impressions"], "clicks": r["clicks"],
             "pos": r["position"], "src": "gsc"} for r in rows]

def bing_queries():
    if not BING_KEY: return []
    try:
        url = ("https://ssl.bing.com/webmaster/api.svc/json/GetQueryStats?apikey="
               + BING_KEY + "&siteUrl=" + urllib.parse.quote(PROPERTY, safe=""))
        d = json.load(urllib.request.urlopen(url, timeout=30)).get("d") or []
        return [{"kw": r.get("Query", ""), "impr": r.get("Impressions", 0) or 0,
                 "clicks": r.get("Clicks", 0) or 0,
                 "pos": r.get("AvgImpressionPosition", 0) or 0, "src": "bing"} for r in d]
    except Exception as e:
        print("  (bing: no data yet / %s)" % e, file=sys.stderr); return []

def existing_slug_tokens():
    sets = []
    for d in glob.glob(REPO + "/public/blog/*/") + glob.glob(REPO + "/public/compare/*/"):
        slug = d.rstrip("/").split("/")[-1]
        sets.append(set(slug.split("-")))
    return sets

# Voice-first positioning (2026-11-22): whenever a voice / assistant / agent topic qualifies,
# it is ranked ahead of every file topic, so the writer keeps the voice angle after the seeds run out.
VOICE = re.compile(r"jarvis|assistant|voice|dictat|speech|hands.?free|agent|claude|codex|talk to|control (your |my )?(computer|pc|mac)")

STOP = {"the", "a", "an", "to", "for", "of", "on", "in", "my", "your", "how", "is",
        "best", "and", "with", "without", "that", "do", "i", "me", "it", "2026"}

def has_page(kw, slug_sets):
    toks = {t for t in re.findall(r"[a-z0-9]+", kw.lower()) if t not in STOP}
    if not toks: return True
    for s in slug_sets:
        if toks.issubset(s): return True          # exact gap already covered
        if len(toks) >= 3 and len(toks & s) >= len(toks) - 1: return True
    return False

# Google autocomplete stems for new voice topics, in feature-priority order
# (Assistant, then agents, then dictation). Used so the writer never runs out of voice topics.
SUGGEST_STEMS = ["ai voice assistant", "voice assistant for", "ai assistant for", "jarvis ai",
                 "ai that can", "talk to your computer", "voice control windows", "voice control mac",
                 "ai agent for computer", "ai agent that can use", "claude code voice", "codex voice",
                 "dictation software", "voice typing"]
OFF_TOPIC = re.compile(r"android|iphone|\bios\b|phone|\bcalls?\b|call center|\bcar\b|airfoil|github|\bapi\b|"
                       r"alexa|google home|speaker|device|watch|\btv\b|robot|kids|elderly|game|acrobat|adobe|expert|"
                       r"technician|support|\bgd\b|geometry|no longer|not working|turn off|disable|uninstall|remove|"
                       r"helmet|mask|steering|trading|stock|robinhood|crypto|controlla")

def suggest_voice(done, slug_sets):
    """Voice-topic ideas from Google autocomplete (real searches with no GSC data yet)."""
    out, seen = [], set()
    for rank, stem in enumerate(SUGGEST_STEMS):
        try:
            url = ("https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q="
                   + urllib.parse.quote(stem))
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            sugg = json.load(urllib.request.urlopen(req, timeout=15))[1]
        except Exception as e:
            print("  (autocomplete %r: %s)" % (stem, e), file=sys.stderr); continue
        for k in (x.lower().strip() for x in sugg):
            if k in seen or k in done or not VOICE.search(k) or OFF_TOPIC.search(k): continue
            if any(b in k for b in BRAND) or has_page(k, slug_sets): continue
            seen.add(k)
            out.append({"kw": k, "impr": 0, "clicks": 0, "pos": 0, "src": "autocomplete",
                        "score": round(1 / (2 + rank), 3)})   # after GSC voice topics, by stem priority
    return out

def main():
    done = set()
    if os.path.exists(LOG):
        done = {l.strip().lower() for l in open(LOG) if l.strip()}
    slug_sets = existing_slug_tokens()

    token = gsc_token()
    rows = gsc_queries(token) + bing_queries()
    # merge duplicates across engines by keyword (sum impressions, keep best pos)
    merged = {}
    for r in rows:
        k = r["kw"].lower()
        if k in merged:
            merged[k]["impr"] += r["impr"]; merged[k]["clicks"] += r["clicks"]
            merged[k]["pos"] = min(merged[k]["pos"] or 99, r["pos"] or 99)
        else:
            merged[k] = dict(r)

    cands = []
    for k, r in merged.items():
        kl = r["kw"].lower()
        if any(b in kl for b in BRAND): continue                 # skip branded
        if not any(t in kl for t in TOPIC): continue             # must be on-topic
        if not (8 <= (r["pos"] or 0) <= 40): continue            # striking distance
        if r["impr"] < (5 if VOICE.search(kl) else 25): continue  # voice topics are newer, lower bar                              # enough demand
        if (r["clicks"] / r["impr"]) > 0.02: continue            # shown-not-clicked
        if kl in done: continue                                  # not already targeted
        if has_page(r["kw"], slug_sets): continue                # no existing page
        r["score"] = round(r["impr"] * (41 - r["pos"]) / 33, 1)
        cands.append(r)

    cands += suggest_voice(done, slug_sets)
    cands.sort(key=lambda x: (not VOICE.search(x["kw"].lower()), -x["score"]))
    top = cands[:15]
    os.makedirs(SEEDIR, exist_ok=True)
    json.dump({"generated": time.strftime("%Y-%m-%d %H:%M UTC", time.gmtime()),
               "candidates": top}, open(OUT, "w"), indent=1)

    print(f"Found {len(cands)} on-topic, no-page, striking-distance gaps. Top 15:\n")
    print(f"{'score':>6}  {'impr':>5} {'clk':>3} {'pos':>5}  {'src':<12} keyword")
    for r in top:
        print(f"{r['score']:>6}  {r['impr']:>5} {r['clicks']:>3} {r['pos']:>5.1f}  {r['src']:<12} {r['kw']}")
    print(f"\nWritten to {OUT}")

if __name__ == "__main__":
    main()
