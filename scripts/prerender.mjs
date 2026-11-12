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
  ['Find and organize your files', 'Describe a file by what is inside it and Filect finds it, even when you forgot the name. Tell it to tidy a folder and it sorts, renames and files everything for you.'],
  ['Run AI agents by voice', 'Put Claude Code or Codex to work. They build websites, write and edit files, run commands and research the web, and you can watch every step live.'],
  ['Work across your apps', 'Agents act inside the apps you connect, like Gmail, Calendar, Notion, Google Drive and Zapier. Email, schedule and update your docs just by saying so.'],
  ['Dictate anywhere', 'Hold a key and talk. Your words type into any app, with punctuation added and filler words cleaned up as you go.'],
  ['Hands-free Assistant', 'Click Start and just talk, no keys needed. It ignores conversations that are not meant for it, can look at your screen, and can answer out loud in a natural voice.'],
  ['You stay in control', 'Choose Ask first to approve every action, or Full access to let it run. Only your speech is sent, never the silence, and your files are never stored or shared.'],
];

const STEPS = [
  ['Install Filect', 'Download the lightweight app for Windows or Mac.'],
  ['Connect your AI', 'Link Claude Code or Codex in one click. They run on your own Claude or ChatGPT plan.'],
  ['Just say it', 'Hold a key and talk, or go hands-free. Ask for a file, a fix, an email or a whole website.'],
  ['Watch it get done', 'Follow every step live, approve what you want, and open the result in one click.'],
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
<h1 style="font-size:3rem;font-weight:800;color:#fff;line-height:1.1;">Control your entire computer by voice.</h1>
<p style="font-size:1.2rem;max-width:560px;">Just say what you want. Filect finds and organizes your files, puts AI agents like Claude Code and Codex to work for you, and handles your email, calendar and docs. No typing. No clicking.</p>
<p><a href="${WIN}">Download for Windows</a> &nbsp; <a href="${MAC}">Download for Mac</a></p>
<p>Free download · 10-day free trial · card required · cancel anytime. Every feature works on Windows and Mac.</p>
<section><h2>Say it. Filect does the work.</h2><ul>${li(FEATURES)}</ul>
<p>No per-task fees: agents run on your own Claude or ChatGPT plan. Run several tasks at once. Filect switches between Claude and Codex automatically, with one-click agent setup.</p></section>
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
