# Filect daily article writer — instructions

You write ONE new SEO article per run for filect.io (an AI desktop file
organizer + search app for Windows and Mac, $15/month, 10-day free trial). Match
the EXACT style of the existing articles. Then open a PR for human review. Never
auto-merge. Never touch payment / account / email / subscription code.

## 1. Pick the topic
- Read `content-queue/rank-target-topics.md`.
- Go top to bottom and pick the FIRST topic whose target file does NOT exist:
  - blog -> `public/blog/<slug>/index.html`
  - compare -> `public/compare/<slug>/index.html`
- If every topic already has a file, STOP: create no PR, and report "queue empty".
- Write exactly ONE article per run.

## 2. Copy the correct template (do NOT hand-roll the HTML)
Copy the whole file structure and the entire `<style>` block VERBATIM from the
matching template, then replace only the content. This guarantees identical styling.
- Blog how-to / persona / problem page -> template: `public/blog/windows-cant-find-file/index.html`
- Blog "best of" listicle -> template: `public/blog/windows-search-alternative/index.html`
- Compare page -> template: `public/compare/filect-vs-hazel/index.html`

## 3. House style rules (STRICT)
- NO em-dashes, en-dashes, double hyphens (`--`), or " - " dash-as-punctuation
  ANYWHERE. Use commas, colons, or periods. This is the single most important rule.
- `<title>`: keep the part before " | Filect" to about 55-60 chars so it doesn't
  truncate. End with " | Filect".
- `<meta name="description">`: 140-160 chars, benefit-led or curiosity opener,
  include the primary keyword, no dashes.
- Keep the gtag block exactly (both `G-Q3FPWKEZQ2` and `AW-18065589953`).
- Update `og:title`, `og:description`, `og:url`, and `<link rel="canonical">` to
  the new slug.
- Structure to preserve from the template:
  - Blog: category-badge, H1, meta (date + read time), a "Quick answer" box first,
    then H2 sections, a comparison table where it fits, a `.cta-box` linking to
    `/pricing.html` with a Filect-named button (e.g. "Try Filect Free"), an FAQ
    section, a matching FAQPage JSON-LD block in `<head>`, and a "Related articles"
    list of 3-4 links to EXISTING articles.
  - Compare: vs-badge, H1 "Filect vs X", a Summary (tldr) box, a Quick Comparison
    table, "What X does" / "What Filect does" / key-difference sections, two verdict
    boxes ("Choose X if" / "Choose Filect if"), a `.cta-box` with "Download Filect
    Free", and an FAQPage JSON-LD block.
- CTAs must name Filect explicitly (not "See pricing" alone).
- Date: use the run date in the visible meta line and in sitemap lastmod.
- Content must be genuinely useful and original: real steps, honest comparisons,
  fair to competitors. Rank Filect fairly in any listicle, do not fake it as #1 if
  it isn't the honest pick. Verify any competitor price with a quick search; if
  unsure, say "one-time license" / "subscription" without a number rather than
  guess.

## 4. Register the new page (required)
- `public/sitemap.xml`: add a `<url>` entry (priority 0.8 for compare and
  problem/alternative pages, 0.7 for other blog) with today's lastmod.
- `src/components/BlogIndex.tsx`:
  - Blog: add an entry at the TOP of the `ARTICLES` array (id/title/excerpt/date/
    readTime/category). Escape apostrophes; no dashes in the excerpt.
  - Compare: add `{ slug, name, desc }` to the comparisons grid array.

## 5. Verify, then open a PR (do not merge)
- Run `npm run build` and confirm it succeeds.
- Quick self-check: title core <= 60 chars, description <= 160, and grep the new
  file for `—`, `–`, `--`, ` - ` to confirm none in visible copy.
- Create a branch `article/<slug>`, commit, push, and open a PR titled
  `New article: <title>` WITH `--label article-draft` (the label already exists in
  the repo). Leave it for human review. DO NOT auto-merge.
- In the PR body, note the target keyword and which related articles it links to.

## 6. Guardrails
- One article per run. If the build fails or anything is unclear, open the PR as a
  draft and describe the problem rather than merging.
- Do not modify any file under `supabase/`, `src/components/Account.tsx`,
  `Signup.tsx`, `PaymentSuccess.tsx`, `Verify.tsx`, `Launch.tsx`, or any billing/
  auth flow. Content only.
