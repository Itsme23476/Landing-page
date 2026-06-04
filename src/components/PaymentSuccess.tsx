import { useEffect, useState } from 'react';
import { trackDownload } from '../utils/ads';

const MAC_URL = 'https://github.com/Itsme23476/Mac-version/releases/latest';
const WIN_URL = 'https://github.com/Itsme23476/App-interface/releases/latest';

export default function PaymentSuccess() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [isWindows, setIsWindows] = useState(false);
  // ?from=app means they paid from inside the desktop app — they already have it,
  // so skip the download steps and just send them back to the app.
  const [fromApp] = useState(() => new URLSearchParams(window.location.search).get('from') === 'app');

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    const ua = (navigator.userAgent || '').toLowerCase();
    setIsWindows(ua.includes('win'));
    // NOTE: deliberately NO filect:// URL-scheme redirect for app purchases.
    // The custom scheme is unreliable from packaged apps, and on Windows it
    // resolves to the *Mac* app registration → a wrong "open Filect Mac" prompt.
    // Both desktop apps poll their subscription every 3s and auto-unlock on
    // their own, so we just tell the user to switch back — no scheme needed,
    // and no Mac/Windows divergence.
    // Soft trial-abuse layer: remember in this browser that a trial has been
    // used. Next visit to /pricing will show "Subscribe now" instead of
    // "Start free trial". Trivially bypassable; the real enforcement is
    // server-side card fingerprint matching in stripe-webhook.
    import('../utils/trialMemory').then(({ markTrialUsed }) => markTrialUsed());

    // Fire the Google Ads "Trial Started" conversion — once per success page.
    // Fires for BOTH the web-first flow AND the app-first flow (land on site →
    // download the app → start the trial inside it). In both, the Stripe checkout
    // and this success page render in the user's browser, which is where the
    // ad-click GCLID lives — so Google can attribute it. Trials with no GCLID
    // (organic/direct) fire the event but aren't counted as ad conversions.
    let conversionFired = false;
    const fireAdsConversion = () => {
      if (conversionFired) return;
      conversionFired = true;
      const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof g === 'function') {
        g('event', 'conversion', { send_to: 'AW-18065589953/yzZgCO_uzLgcEMGNrKZD' });
      }
    };

    // Trial-abuse check. Our stripe-webhook may have just canceled the sub
    // because the card was already used for a prior trial. Detect that case
    // and redirect to /trial-blocked instead of showing success. We poll a
    // few times because the webhook is racing the success_url redirect.
    (async () => {
      try {
        const supabaseUrl = 'https://gsvccxhdgcshiwgjvgfi.supabase.co';
        const anon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdmNjeGhkZ2NzaGl3Z2p2Z2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczOTY2NTIsImV4cCI6MjA4Mjk3MjY1Mn0.Sbb6YJjlQ_ig2LCcs9zz_Be1kU-iIHBx4Vu4nzCPyTM';
        // We don't know the user's session here (this page is reached from
        // Stripe, not an authenticated nav). Best-effort: check most recent
        // sub by session/email if present. If not detectable, just show
        // success (the canceled sub is harmless — user can re-attempt).
        const sessionId = new URLSearchParams(window.location.search).get('session_id');
        if (!sessionId) { fireAdsConversion(); return; }
        for (let attempt = 0; attempt < 6; attempt++) {
          await new Promise((r) => setTimeout(r, attempt === 0 ? 800 : 1500));
          const res = await fetch(`${supabaseUrl}/rest/v1/subscriptions?select=user_id,status,trial_blocked_reason&order=updated_at.desc&limit=1`, {
            headers: { apikey: anon, Authorization: `Bearer ${anon}` },
          }).catch(() => null);
          if (!res || !res.ok) continue;
          const rows = await res.json();
          const latest = rows?.[0];
          if (latest?.trial_blocked_reason === 'duplicate_trial_card') {
            const q = new URLSearchParams();
            if (latest.user_id) q.set('user_id', latest.user_id);
            const priceFromUrl = new URLSearchParams(window.location.search).get('price');
            if (priceFromUrl) q.set('price', priceFromUrl);
            window.location.replace(`/trial-blocked?${q.toString()}`);
            return;
          }
        }
        // Polled and never blocked → a genuine trial started.
        fireAdsConversion();
      } catch {
        // Best-effort only; never block success page if check fails.
        fireAdsConversion();
      }
    })();

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    window.location.href = 'filect://open';
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      
      {/* Animated background glow */}
      <div className="glow-bg" style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(124, 77, 255, 0.15) 0%, transparent 70%)',
        animation: 'pulse 3s ease-in-out infinite',
      }} />

      {/* Confetti particles */}
      {showConfetti && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: '-20px',
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: ['#b28bff', '#4ADE80', '#FBBF24', '#F472B6', '#60A5FA'][Math.floor(Math.random() * 5)],
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                animation: `confetti-fall ${Math.random() * 2 + 2}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <div style={{
        width: '100%',
        maxWidth: '460px',
        backgroundColor: 'rgba(15, 15, 26, 0.4)',
        border: '1px solid var(--border-light)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '48px 36px',
        boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(124, 77, 255, 0.1)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        
        {/* Success Icon with animated ring */}
        <div style={{
          position: 'relative',
          width: '100px',
          height: '100px',
          margin: '0 auto 28px',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid rgba(74, 222, 128, 0.3)',
            animation: 'ring-pulse 2s ease-out infinite',
          }} />
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(34, 197, 94, 0.12)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(34, 197, 94, 0.3)',
          }}>
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#4ADE80" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ animation: 'check-draw 0.5s ease-out 0.3s both' }}
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>

        <h1 style={{
          color: '#FFFFFF',
          fontSize: '32px',
          fontWeight: 700,
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}>
          You're all set!
        </h1>

        <h2 style={{
          color: '#4ADE80',
          fontSize: '18px',
          fontWeight: 500,
          marginBottom: '20px',
        }}>
          Your 10-day free trial has started
        </h2>

        {fromApp ? (
          <p style={{
            color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', marginBottom: '28px',
          }}>
            Your subscription is active — <strong style={{ color: '#fff' }}>you can close this tab.</strong>{' '}
            Filect is unlocking automatically; just switch back to the app.
          </p>
        ) : (
          <>
            <p style={{
              color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', marginBottom: '28px',
            }}>
              Download Filect and <strong style={{ color: '#fff' }}>log in with the email you used</strong> —
              your subscription is already linked.
            </p>

            {/* Step 1: Download (auto-detected OS) */}
            <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginBottom: '12px', textAlign: 'left' }}>1. Download the app</p>
            <a href={isWindows ? WIN_URL : MAC_URL} onClick={() => trackDownload(isWindows ? 'windows' : 'mac')} style={{
              display: 'block', padding: '14px', borderRadius: '10px', textDecoration: 'none', textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(178,139,255,0.9), rgba(109,40,217,0.9))',
              color: '#fff', fontSize: '15px', fontWeight: 600, boxShadow: '0 4px 15px rgba(124,77,255,0.3)',
            }}>Download for {isWindows ? 'Windows' : 'Mac'}</a>
            <p style={{ marginTop: '10px', marginBottom: '24px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              On {isWindows ? 'Mac' : 'Windows'} instead?{' '}
              <a href={isWindows ? MAC_URL : WIN_URL} onClick={() => trackDownload(isWindows ? 'mac' : 'windows')} style={{ color: 'var(--primary)', textDecoration: 'none' }}>Download here</a>
            </p>

            {/* Step 2: open / log in */}
            <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginBottom: '10px', textAlign: 'left' }}>2. Already have the app?</p>
            <button
              onClick={handleClose}
              style={{
                width: '100%', padding: '13px 24px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(178,139,255,0.45)',
                borderRadius: '10px', color: '#b28bff', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Open Filect & log in
            </button>
          </>
        )}

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '13px',
          marginTop: '18px',
          lineHeight: '1.6',
        }}>
          ✓ Trial started &nbsp;·&nbsp; ✓ No charge today &nbsp;·&nbsp; ✓ Subscription linked
        </p>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '13px',
          marginTop: '12px',
        }}>
          Questions? Contact us at <span style={{ color: 'var(--primary)' }}>support@filect.io</span>
        </p>
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes check-draw {
          from { stroke-dasharray: 30; stroke-dashoffset: 30; }
          to { stroke-dasharray: 30; stroke-dashoffset: 0; }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
