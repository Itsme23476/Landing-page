// Post-build homepage prerender (crawler/AI-search snapshot).
//
// WHY: the app is a client-rendered SPA, so non-JS crawlers (GPTBot, Perplexity,
// some bots) see an empty <div id="root">. This injects a static, accurate
// snapshot of the homepage's content into a <noscript> block in ONLY the "/"
// document. Browsers with JS ignore <noscript> entirely, so real users never see
// the snapshot (no flash) and React renders into the empty #root as usual. Non-JS
// crawlers read the <noscript> content. Downloads/auth/payment untouched.
//
// ROUTING (see vercel.json): "/" serves this prerendered index.html; every other
// SPA route serves app.html, which is the untouched bare shell — so non-home
// routes behave exactly as before.
//
// Pure Node fs only: if anything is off it fails the BUILD loudly (safe — the last
// good deploy stays live) rather than shipping a broken page.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const indexPath = join(dist, 'index.html');
const shellPath = join(dist, 'app.html');

const WIN = 'https://github.com/Itsme23476/App-interface/releases/latest';
const MAC = 'https://github.com/Itsme23476/Mac-version/releases/latest';

const FEATURES = [
  ['Auto-Organize', 'Filect sorts your files into the right folders for you, automatically. No dragging, no naming, no guessing.'],
  ['AI Analysis', "Advanced AI models read your documents to understand what's inside, so everything ends up where it belongs."],
  ['Lightning Fast', 'Built on a high-performance Rust backend for instant results as you type.'],
  ['Privacy First', 'Filect processes your files securely through OpenAI. Nothing is stored or shared, and only you can see your data.'],
  ['Broad Compatibility', 'Indexes PDFs, Docs, Code, Images, and more across your entire drive.'],
  ['Natural Language', "Don't remember the exact filename? Just describe what's inside and Filect finds it. It understands context."],
];

const STEPS = [
  ['Install Filect', 'Download the lightweight app for Windows or Mac.'],
  ['Select a folder', 'Point Filect at the folder you want organized.'],
  ['Type your instructions', 'Tell it how you want things sorted, like "by project" or "by file type".'],
  ['Folder gets organized', 'Filect sorts everything into place for you, automatically.'],
];

const TESTIMONIALS = [
  ['Mark', 'Filect saves me over 2 hours every single week organizing my files.'],
  ['Marie', 'I can find any file stored on my PC in just a few seconds.'],
  ['Robert', 'Filect lets me focus on the important work instead of organizing and managing files.'],
];

const li = (rows) => rows.map(([h, p]) => `<li><h3>${h}</h3><p>${p}</p></li>`).join('');
const quotes = TESTIMONIALS.map(([n, q]) => `<figure><blockquote>${q}</blockquote><figcaption>${n}</figcaption></figure>`).join('');

// Static, crawler-facing snapshot. Mirrors the live homepage copy. React replaces
// it on mount, so styling is intentionally minimal.
const snapshot = `<div style="max-width:1100px;margin:0 auto;padding:64px 24px;color:#e2e8f0;font-family:Inter,sans-serif;">
<h1 style="font-size:3rem;font-weight:800;color:#fff;line-height:1.1;">Find any file. Instantly.</h1>
<p style="font-size:1.2rem;max-width:560px;">The smartest AI file manager. It organizes your files automatically, so you never have to sort your desktop again. And when you need to find one of your files you can just type what it is and it shows up. No more digging through folders.</p>
<p><a href="${WIN}">Download for Windows</a> &nbsp; <a href="${MAC}">Download for Mac</a></p>
<p>Free download · 10-day free trial · card required · cancel anytime</p>
<section><h2>Features</h2><ul>${li(FEATURES)}</ul></section>
<section><h2>How it works</h2><ol>${li(STEPS)}</ol></section>
<section><h2>Loved by people who hate clutter</h2>${quotes}</section>
</div>`;

const ROOT_EMPTY = '<div id="root"></div>';

let html;
try {
  html = readFileSync(indexPath, 'utf8');
} catch (e) {
  throw new Error(`[prerender] cannot read ${indexPath} — did "vite build" run first? ${e.message}`);
}

if (!html.includes(ROOT_EMPTY)) {
  throw new Error(`[prerender] could not find ${ROOT_EMPTY} in dist/index.html — aborting so we never ship a broken page.`);
}

// 1) app.html = the untouched bare shell (served to every non-home route).
mkdirSync(dist, { recursive: true });
writeFileSync(shellPath, html, 'utf8');

// 2) index.html = same shell + the snapshot in a <noscript> after the empty #root.
//    JS users never see it (no flash); non-JS crawlers read it.
writeFileSync(indexPath, html.replace(ROOT_EMPTY, `${ROOT_EMPTY}<noscript>${snapshot}</noscript>`), 'utf8');

console.log('[prerender] wrote dist/app.html (bare shell) and injected homepage snapshot into <noscript> in dist/index.html');
