import { useEffect, useState } from 'react';

// Bridge page: the confirmation email's "Verify account" button is an https link
// (Gmail-clickable) that lands here. This page does NOT verify anything itself —
// it hands the token_hash to the desktop app via the filect:// deep link, and the
// app verifies locally. That keeps it safe from email-scanner prefetch (the token
// is only ever consumed inside the app, never by a GET on this page).
export default function Verify() {
  const [tokenHash, setTokenHash] = useState<string | null>(null);

  const openApp = (th: string) => {
    window.location.href = `filect://verify?token_hash=${encodeURIComponent(th)}`;
  };

  useEffect(() => {
    const th = new URLSearchParams(window.location.search).get('token_hash');
    setTokenHash(th);
    if (th) openApp(th);
  }, []);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="glow-bg" style={{
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(124, 77, 255, 0.15) 0%, transparent 70%)', animation: 'pulse 3s ease-in-out infinite',
      }} />

      <div style={{
        width: '100%', maxWidth: '440px', backgroundColor: 'rgba(15, 15, 26, 0.4)',
        border: '1px solid var(--border-light)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px', padding: '40px 32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        textAlign: 'center', position: 'relative', zIndex: 1,
      }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>✅</div>
        <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
          {tokenHash ? 'Opening Filect…' : 'Verification link invalid'}
        </h1>

        {tokenHash ? (
          <>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
              We're taking you back to the Filect app to finish verifying your account.
              If it doesn't open automatically, click below.
            </p>
            <button
              onClick={() => openApp(tokenHash)}
              style={{
                width: '100%', padding: '14px 24px',
                background: 'linear-gradient(135deg, rgba(178,139,255,0.9), rgba(109,40,217,0.9))',
                border: '1px solid rgba(178,139,255,0.3)', borderRadius: '10px',
                color: '#fff', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
              }}
            >Open Filect</button>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '18px', lineHeight: 1.6 }}>
              Don't have the app open on this device? Just enter the 6-digit code from your email in the Filect app instead.
            </p>
          </>
        ) : (
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>
            This link is missing its verification token. Please open the Filect app and enter the 6-digit code from your email.
          </p>
        )}
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes pulse { 0%,100% { opacity: 0.2; transform: translate(-50%,-50%) scale(1); } 50% { opacity: 0.5; transform: translate(-50%,-50%) scale(1.1); } }
      `}</style>
    </div>
  );
}
