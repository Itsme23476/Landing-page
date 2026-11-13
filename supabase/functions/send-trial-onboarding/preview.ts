// Renders the three trial emails into one local preview page: deno run --allow-write preview.ts
import { emailFor } from "./templates.ts";

const kinds = ["trial_day0", "trial_day4", "trial_day8"];
const blocks = kinds.map((k) => {
  const { subject, html } = emailFor(k, "Alex");
  const srcdoc = html.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  return `<section><h2>${k.replace("trial_", "").toUpperCase()} · Subject: ${subject}</h2>
<iframe srcdoc="${srcdoc}" style="width:100%;height:900px;border:1px solid #ddd;border-radius:8px;background:#fff"></iframe></section>`;
});
Deno.writeTextFileSync(new URL("./preview.html", import.meta.url),
  `<!doctype html><meta charset="utf-8"><title>Trial emails preview</title>
<body style="font-family:-apple-system,sans-serif;max-width:720px;margin:24px auto;background:#e9e9ef;color:#1a1a2e">
<h1 style="font-size:20px">New trial onboarding emails (preview, not sent)</h1>${blocks.join("")}</body>`);
console.log("wrote preview.html");
