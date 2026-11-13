// Email copy for the trial onboarding drip. Pure functions (no imports) so the
// emails can be previewed locally with `deno run preview.ts`. Kept short on purpose.
//   trial_day0  -> talk to your computer: Fn dictation + Fn+Shift file search
//   trial_day4  -> give an AI agent (Claude Code / Codex) its first job: Fn+Control
//   trial_day8  -> hands-free Assistant + organize by voice: Fn+Option

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

function bullets(items: string[]): string {
  const lis = items.map((s) => `<li style="margin:0 0 10px;">${s}</li>`).join("");
  return `<ul style="margin:0 0 16px;padding-left:20px;font-size:16px;color:#1a1a2e;line-height:1.6;">${lis}</ul>`;
}

const LAUNCH = "https://filect.io/launch";

function day0(name: string | null): { subject: string; html: string } {
  return {
    subject: "Say it, and your computer does it",
    html: shell(`
      <p style="${P}">${greet(name)}</p>
      <p style="${P}">Welcome to Filect. Two things to try today:</p>
      ${bullets([
        "Hold <strong>Fn</strong> and talk. Your words type into any app.",
        "Hold <strong>Fn + Shift</strong> and ask for a file, like “the invoice I sent last month”.",
      ])}
      ${cta(LAUNCH, "Open Filect")}
      <p style="margin:0;font-size:14px;color:#666;">Stuck? Just reply.</p>
      ${SIGN}`),
  };
}

function day4(name: string | null): { subject: string; html: string } {
  return {
    subject: "Give an AI agent its first job",
    html: shell(`
      <p style="${P}">${greet(name)}</p>
      <p style="${P}">Filect can put Claude Code or Codex to work for you.</p>
      <p style="${P}">Hold <strong>Fn + Control</strong> in any app and say a task, like “build me a one-page site” or “research standing desks and give me a shortlist”. Let go and watch it work.</p>
      <p style="${P}">It runs on your own Claude or ChatGPT plan, and Filect connects it in one click.</p>
      ${cta(`${LAUNCH}?to=agents`, "Give it a task")}
      ${SIGN}`),
  };
}

function day8(name: string | null): { subject: string; html: string } {
  return {
    subject: "Go hands-free",
    html: shell(`
      <p style="${P}">${greet(name)}</p>
      <p style="${P}">Two more to try:</p>
      ${bullets([
        "<strong>No keys at all:</strong> open the Assistant, click Start listening, and just talk.",
        "<strong>Tidy up:</strong> hold <strong>Fn + Option</strong> and say “organize my Downloads by type”.",
      ])}
      ${cta(`${LAUNCH}?to=assistant`, "Try hands-free")}
      ${SIGN}
      ${AFFILIATE}`),
  };
}

export function emailFor(kind: string, name: string | null) {
  if (kind === "trial_day4") return day4(name);
  if (kind === "trial_day8") return day8(name);
  return day0(name);
}
