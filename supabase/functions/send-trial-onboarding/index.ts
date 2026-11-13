import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { emailFor } from "./templates.ts";

// Trial onboarding drip: 3 emails over the 10-day trial, sent ONLY to
// subscriptions with status = 'trialing'. Sends from hello.filect.io (warming);
// replies route back to team@filect.io. Copy lives in templates.ts.
//   trial_day0  -> talk to your computer            (age < 2d)
//   trial_day4  -> first AI agent task              (age 4-7d)
//   trial_day8  -> hands-free Assistant + organize  (age 8-11d)

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
