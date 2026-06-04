// Google Ads "App Download" conversion (secondary) + a GA4 event so you can see
// the Mac/Windows split. Call on any real download-button click.
export function trackDownload(os: 'mac' | 'windows'): void {
  const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof g !== 'function') return;
  g('event', 'conversion', { send_to: 'AW-18065589953/27W3CMKVz7gcEMGNrKZD' });
  g('event', 'app_download', { os });
}
