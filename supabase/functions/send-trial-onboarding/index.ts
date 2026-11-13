import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Trial onboarding drip: 3 emails over the 10-day trial, sent ONLY to
// subscriptions with status = 'trialing'. Sends from hello.filect.io (warming);
// replies route back to team@filect.io.
//   trial_day0  -> organize your first folder   (age < 2d)
//   trial_day4  -> natural-language search       (age 4-7d)
//   trial_day8  -> auto-organize (retention)     (age 8-11d)

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM = "Filect <hello@hello.filect.io>";
const REPLY_TO = "team@filect.io";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to, subject, html, reply_to: REPLY_TO }),
  });
  return res.ok;
}

function shell(inner: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#7C4DFF;padding:32px 40px;text-align:center;">
          <span style="color:#fff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">Filect</span>
        </td></tr>
        <tr><td style="padding:40px;">${inner}</td></tr>
        <tr><td style="padding:20px 40px;border-top:1px solid #f0f0f0;text-align:center;">
          <p style="margin:0;font-size:12px;color:#999;">You're getting this because you started a Filect trial.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function cta(url: string, label: string): string {
  return `<table cellpadding="0" cellspacing="0" style="margin:28px 0;"><tr>
    <td style="background:#7C4DFF;border-radius:8px;padding:14px 32px;">
      <a href="${url}" style="color:#fff;text-decoration:none;font-size:16px;font-weight:600;">${label}</a>
    </td></tr></table>`;
}

const P = "margin:0 0 16px;font-size:16px;color:#1a1a2e;line-height:1.6;";
const SIGN = `<p style="margin:24px 0 0;font-size:15px;color:#1a1a2e;">Damianos, Filect</p>`;
const AFFILIATE = `<p style="margin:20px 0 0;font-size:13px;color:#999;line-height:1.6;">Loving Filect? Earn 30% recurring for anyone you refer. <a href="https://filect.io/affiliates" style="color:#7C4DFF;">Become an affiliate</a>.</p>`;

function greet(name: string | null): string {
  return name ? `Hi ${name.split(" ")[0]},` : "Hi there,";
}

function steps(items: string[]): string {
  const lis = items.map((s) => `<li style="margin:0 0 8px;">${s}</li>`).join("");
  return `<ol style="margin:0 0 16px;padding-left:20px;font-size:15px;color:#1a1a2e;line-height:1.6;">${lis}</ol>`;
}

const LAUNCH = "https://filect.io/launch";

function day0(name: string | null): { subject: string; html: string } {
  return {
    subject: "Organize your first folder in 2 minutes",
    html: shell(`
      <p style="${P}">${greet(name)}</p>
      <p style="${P}">Welcome to Filect. You've got 10 days to see what it does, so let's start with the moment that makes people go “oh.”</p>
      <p style="${P}">Pick your messiest folder. Downloads is the usual suspect. Then:</p>
      ${steps(["Open Filect and point it at that folder", "Hit Organize", "Watch it sort everything into clean, named folders in about a minute"])}
      <p style="${P}">No setup, no tagging, no rules to write.</p>
      ${cta(`${LAUNCH}?to=organize`, "Organize your first folder")}
      <p style="margin:0 0 16px;font-size:14px;color:#666;line-height:1.6;">Want the full picture first? Here's a <a href="https://youtu.be/eJuYcfTJDio" style="color:#7C4DFF;">24-minute walkthrough</a> of everything Filect can do.</p>
      <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">Stuck on anything? Just reply, a real person reads these.</p>
      ${SIGN}`),
  };
}

function day4(name: string | null): { subject: string; html: string } {
  return {
    subject: "Stop remembering file names",
    html: shell(`
      <p style="${P}">${greet(name)}</p>
      <p style="${P}">Most people spend their first few days organizing. Fewer find the feature I use most: search that understands plain English.</p>
      <p style="${P}">You don't need the file name. You describe it. Try typing one of these:</p>
      <ul style="margin:0 0 16px;padding-left:20px;font-size:15px;color:#1a1a2e;line-height:1.7;">
        <li>the invoice I sent last month</li>
        <li>the screenshot with the error message</li>
        <li>that contract from Acme</li>
      </ul>
      <p style="${P}">It reads inside your files, PDFs, docs, images, so it finds things by what they contain, not just what they're called. Everything stays on your machine. Nothing is uploaded.</p>
      ${cta(`${LAUNCH}?to=search`, "Try a search")}
      <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">If it can't find something, reply and tell me. I want to know.</p>
      ${SIGN}`),
  };
}

function day8(name: string | null): { subject: string; html: string } {
  return {
    subject: "Set it once, never sort again",
    html: shell(`
      <p style="${P}">${greet(name)}</p>
      <p style="${P}">You've been organizing folders by hand. Here's how to stop.</p>
      <p style="${P}">Turn on Auto-organize and Filect watches the folders you choose. New files get sorted into place the moment they land, so your Downloads stays clean without you thinking about it.</p>
      ${steps(["Open Settings, then Auto-organize", "Choose the folders to watch (Downloads and Desktop are a good start)", "Turn it on"])}
      <p style="${P}">This is the feature people say they can't go back from.</p>
      ${cta(`${LAUNCH}?to=auto-organize`, "Turn on Auto-organize")}
      <p style="margin:0;font-size:14px;color:#666;line-height:1.6;">Any questions, just reply.</p>
      ${SIGN}
      ${AFFILIATE}`),
  };
}

function emailFor(kind: string, name: string | null) {
  if (kind === "trial_day4") return day4(name);
  if (kind === "trial_day8") return day8(name);
  return day0(name);
}

serve(async (req) => {
  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch (_e) { body = {}; }

  if (typeof body.test_email === "string") {
    const kind = typeof body.kind === "string" ? body.kind : "trial_day0";
    const name = typeof body.name === "string" ? body.name : null;
    const { subject, html } = emailFor(kind, name);
    const ok = await sendEmail(body.test_email, subject, html);
    return Response.json({ mode: "test", kind, to: body.test_email, sent: ok });
  }

  const { data: candidates, error } = await supabase.rpc("get_trial_onboarding_candidates");
  if (error) return Response.json({ error: error.message }, { status: 500 });

  if (body.dry_run === true) {
    return Response.json({ mode: "dry_run", count: (candidates ?? []).length, candidates });
  }

  let sent = 0;
  for (const c of (candidates ?? []) as Array<{ user_id: string; email: string; full_name: string | null; kind: string }>) {
    const { subject, html } = emailFor(c.kind, c.full_name);
    const ok = await sendEmail(c.email, subject, html);
    if (ok) {
      await supabase.from("trial_emails").insert({ user_id: c.user_id, kind: c.kind, email: c.email });
      sent++;
    }
  }
  return Response.json({ mode: "live", candidates: (candidates ?? []).length, sent });
});
