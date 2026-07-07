import { useEffect, useState } from 'react';

// Bridge page for the trial onboarding emails. Email clients strip/distrust
// custom-scheme links (filect://...), so the email buttons are ordinary https
// links that land here, and THIS page hands off to the desktop app via the
// filect:// deep link. Same pattern as Verify.tsx / OpenApp.tsx.
//
// ?to= carries which screen to open (organize | search | auto-organize) so the
// app can jump straight to the relevant feature. Unknown/absent -> plain open.

const ACTIONS: Record<string, { verb: string; noun: string }> = {
  organize: { verb: 'start organizing', noun: 'your first folder' },
  search: { verb: 'try search', noun: 'in plain English' },
  'auto-organize': { verb: 'turn on Auto-organize', noun: 'and set it once' },
};

export default function Launch() {
  const [to, setTo] = useState<string>('');

  const openApp = (target: string) => {
    const suffix = target ? `?to=${encodeURIComponent(target)}` : '';
    window.location.href = `filect://open${suffix}`;
  };

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('to') ?? '';
    setTo(t);
    openApp(t);
  }, []);

  const action = ACTIONS[to];
  const line = action
    ? `We're opening Filect so you can ${action.verb} ${action.noun}.`
    : `We're opening Filect on this device.`;

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
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚀</div>
        <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Opening Filect…</h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
          {line} If it doesn't open automatically, click below.
        </p>

        <button
          onClick={() => openApp(to)}
          style={{
            width: '100%', padding: '14px 24px',
            background: 'linear-gradient(135deg, rgba(178,139,255,0.9), rgba(109,40,217,0.9))',
            border: '1px solid rgba(178,139,255,0.3)', borderRadius: '10px',
            color: '#fff', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
          }}
        >Open Filect</button>

        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '18px', lineHeight: 1.6 }}>
          Don't have Filect on this device?{' '}
          <a href="https://filect.io/#download" style={{ color: 'var(--primary)' }}>Download it here</a>.
        </p>
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes pulse { 0%,100% { opacity: 0.2; transform: translate(-50%,-50%) scale(1); } 50% { opacity: 0.5; transform: translate(-50%,-50%) scale(1.1); } }
      `}</style>
    </div>
  );
}
