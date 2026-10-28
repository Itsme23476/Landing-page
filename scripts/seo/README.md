# Filect daily SEO article — autonomous runbook

The daily cloud routine follows THIS file. Goal: publish **one genuinely good,
accurate, on-brand** article per day targeting a keyword where filect.io already
ranks (position ~8-40) but gets no clicks. Quality must be high enough that no
human review is needed. If an article can't clear the QA gate, publish nothing.

## Facts you must get right (no guessing)
- Product: **Filect** — local AI file search + organizer + unlimited voice
  dictation for **Windows and macOS**. Audience is Windows-first.
- Pricing: **Basic** and **Pro** (monthly/annual) and **Enterprise**
  (contact-gated). Voice dictation is unlimited on every plan. Verify current
  prices/features from `src/` or `public/pricing.html` before stating any — never
  invent a number. If unsure of a fact, write around it; do not fabricate.
- Never claim features Filect doesn't have. Never disparage competitors with
  unverifiable claims. No fake testimonials, stats, or dates.
- House copy rule: **no em-dashes and no double hyphens** in published prose.

## Steps
1. `python3 scripts/seo/keyword-finder.py` → reads GSC/Bing (env creds) and writes
   `scripts/seo/candidates.json`. Pick the top candidate NOT already in
   `scripts/seo/targeted-keywords.txt`. If the list is empty, stop (commit nothing).
2. Choose a clean slug (lowercase, hyphenated, no stop words, no year).
3. Draft the article as `public/blog/<slug>/index.html`, mirroring the structure,
   `<head>` tags, and JSON-LD of an existing strong post
   (`public/blog/best-file-search-software/index.html` is the template). Requirements:
   - Unique `<title>` (~55-60 chars) and meta description (~150 chars) built around
     the keyword and its real search intent.
   - Valid `Article`/`FAQPage` JSON-LD with correct url, datePublished (today, UTC),
     author/publisher matching the template.
   - 1,200-1,800 words of genuinely useful, specific content that answers the
     query better than the current page-1 results. Real how-to steps, a comparison
     where relevant, and an honest Filect angle (not a hard sell).
   - A short FAQ (3-5 Q&A) matching the FAQ JSON-LD.
4. Internal links: add 2-4 contextual links to related existing blog/compare pages,
   and add one link TO the new post from the most relevant existing page.
5. Add the new URL to `public/sitemap.xml` with today's `<lastmod>`.
6. Append the chosen keyword (lowercased) to `scripts/seo/targeted-keywords.txt`.

## QA gate (ALL must pass, else discard and publish nothing)
- [ ] `npm run build` (or the repo's build) succeeds with the new file.
- [ ] JSON-LD parses as valid JSON and matches the visible content.
- [ ] No placeholders (`lorem`, `TODO`, `XXX`, `[...]`), no broken internal links.
- [ ] Pricing/plan/competitor facts verified against the repo, not invented.
- [ ] No em-dashes, no double hyphens.
- [ ] Self-critique pass: re-read as a skeptical Filect user. If it reads as thin
      AI filler or says anything you can't back up, rewrite or discard.

## Publish
- Commit `public/blog/<slug>/`, the edited sitemap, the edited linking page, and
  `scripts/seo/targeted-keywords.txt` directly to `main` (Vercel auto-deploys).
  Commit message: `seo: add <slug> (daily auto-article)`.
- After the push, best-effort ping IndexNow: `node scripts/indexnow.mjs https://filect.io/blog/<slug>/`.
  The cloud sandbox blocks api.indexnow.org, so this ping will fail there. That is fine and NOT a QA failure: the page is already live on Vercel and gets crawled via the sitemap. Report it as a note, nothing more.
- Do NOT open a PR. One article per run. Keep `candidates.json` out of commits.
