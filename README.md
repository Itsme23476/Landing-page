# Filect — Landing Page & Web App

Marketing site and web app for **Filect**, an AI-powered desktop file organizer and
natural-language search tool for Windows and macOS. Live at
[filect.io](https://filect.io).

This repo contains the public website (home, blog, comparison pages), the
account/auth flows, and the conversion/SEO infrastructure. The desktop app itself
lives in separate repos (`App-interface` for Windows, `Mac-version` for macOS).

## Tech stack

- **React 19 + TypeScript** built with **Vite**
- **react-router-dom** for client-side routing (SPA)
- **Supabase** for auth and edge functions (newsletter, contact)
- **framer-motion** for animation
- **Tailwind** (via CDN in `index.html`) + inline styles
- Hosted on **Vercel**; analytics via GA4, Google Ads, Vercel Analytics, and Endorsely

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your values
npm run dev                  # start the dev server
```

### Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Type-check and build for production   |
| `npm run preview` | Preview the production build locally  |
| `npm run lint`    | Run ESLint                           |

## Environment variables

See [`.env.example`](.env.example). All `VITE_`-prefixed vars are exposed to the
browser by design — the Supabase anon key is meant to be public, so security
relies on **Row-Level Security being correctly configured** on every table.
Set the real values in Vercel's project settings for production.

## Project structure

```
src/
  components/   React pages & UI (Hero, Pricing, Account, blog posts, …)
  utils/        ads.ts (conversion tracking), trialMemory.ts (trial UX)
  App.tsx       Routes
public/
  blog/         Pre-rendered static blog posts (SEO)
  compare/      "Filect vs <competitor>" comparison pages (SEO)
  sitemap.xml, robots.txt, llms.txt, pricing/privacy/terms HTML
supabase/
  functions/    Edge functions (e.g. subscribe-newsletter)
```

## Notes for contributors

- The `public/` HTML pages (blog, compare, sitemap, structured data, meta tags)
  are indexed by Google. **Change them carefully** to avoid affecting search
  rankings.
- Account, auth, and payment flows are wired to Supabase + Stripe — verify
  end-to-end before changing.
