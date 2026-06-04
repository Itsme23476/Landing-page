// Google Ads "App Download" conversion (secondary) + a GA4 event with the OS,
// so you can see the Mac/Windows split. Deduped so the per-button onClick and
// the global listener below can't double-fire on the same click.
let firingDownload = false;
export function trackDownload(os: 'mac' | 'windows'): void {
  if (firingDownload) return;
  firingDownload = true;
  setTimeout(() => { firingDownload = false; }, 0); // reset after this click dispatch
  const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g !== 'function') return;
  g('event', 'conversion', { send_to: 'AW-18065589953/27W3CMKVz7gcEMGNrKZD' });
  g('event', 'app_download', { os });
}

// Safety net: catch a click on ANY download link — current OR future buttons —
// by detecting the GitHub repo in the href. This means new/updated/refactored
// download buttons are tracked automatically even if someone forgets the
// per-button onClick. OS is derived from the repo (App-interface = Windows,
// Mac-version = Mac), so it survives version bumps too.
let downloadTrackingInitialized = false;
export function initDownloadTracking(): void {
  if (downloadTrackingInitialized || typeof document === 'undefined') return;
  downloadTrackingInitialized = true;
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement | null)?.closest?.('a');
    const href = a?.getAttribute('href') || '';
    if (/App-interface/.test(href)) trackDownload('windows');
    else if (/Mac-version/.test(href)) trackDownload('mac');
  }, true); // capture phase, so it runs regardless of stopPropagation
}
