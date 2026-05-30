// Lightweight client-side "this browser already trialed Filect" marker.
//
// SOFT layer on top of the HARD card-fingerprint check we do server-side in
// stripe-webhook. The cookie/localStorage is trivially bypassed (incognito,
// clear cookies, different browser) so it's NOT enforcement — it's UX. We
// use it on the pricing page to swap "Start free trial" → "Subscribe now"
// without aggressive "we caught you!" messaging, which would create support
// tickets from legitimate cross-device customers.

const KEY = 'filect_trial_used';

export function markTrialUsed(): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ at: Date.now() }));
    // Also drop a year-long cookie so server-rendered pages (pricing.html) can
    // read it via vanilla JS without depending on the React bundle.
    const oneYear = 365 * 24 * 60 * 60;
    document.cookie = `${KEY}=1; path=/; max-age=${oneYear}; samesite=lax`;
  } catch {
    // Private mode / disabled storage — silently no-op. Honest customers
    // still get the trial; only the soft nudge is skipped.
  }
}

export function hasUsedTrial(): boolean {
  try {
    if (localStorage.getItem(KEY)) return true;
    if (document.cookie.split(';').some(c => c.trim().startsWith(`${KEY}=`))) return true;
  } catch {
    // No storage access → treat as fresh user (don't gate honest customers).
  }
  return false;
}

// Optional escape hatch for support: if a customer hits a false-positive
// ("I cleared this and still see no trial"), we can tell them to run
// `localStorage.removeItem('filect_trial_used')` in DevTools.
export function clearTrialUsed(): void {
  try {
    localStorage.removeItem(KEY);
    document.cookie = `${KEY}=; path=/; max-age=0`;
  } catch { /* no-op */ }
}
