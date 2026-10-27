// IndexNow submitter for Bing (and other IndexNow engines).
// Usage:
//   node scripts/indexnow.mjs                 -> submits every URL in public/sitemap.xml
//   node scripts/indexnow.mjs <url> [url...]  -> submits only the URLs you pass
// The key is auto-detected from the public/<32-hex>.txt key file.
import { readFileSync, readdirSync } from 'node:fs';

const HOST = 'filect.io';
const pub = new URL('../public/', import.meta.url);

const keyFile = readdirSync(pub).find((f) => /^[0-9a-f]{8,128}\.txt$/i.test(f));
if (!keyFile) { console.error('No IndexNow key file (public/<hex>.txt) found.'); process.exit(1); }
const key = keyFile.replace(/\.txt$/, '');
const keyLocation = `https://${HOST}/${keyFile}`;

let urls = process.argv.slice(2);
if (urls.length === 0) {
  const sitemap = readFileSync(new URL('sitemap.xml', pub), 'utf8');
  urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (urls.length === 0) { console.error('No URLs to submit.'); process.exit(1); }

const body = { host: HOST, key, keyLocation, urlList: urls };
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
// IndexNow returns 200 or 202 on success; 403 means the key file is not reachable yet.
console.log(`Submitted ${urls.length} URL(s) to IndexNow -> HTTP ${res.status} ${res.statusText}`);
if (res.status === 403) console.error('403 = key file not reachable. Make sure ' + keyLocation + ' is live (deploy first).');
