import { useState } from 'react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

// Standalone cancellation/retention flow opened from the desktop app
// (filect.io/cancel?uid=…&email=…). Runs the same flow as the account page:
// reason (30-char min) -> "stay for 50% off" -> claim or cancel. Identity comes
// from the URL, so no separate web login is needed.
type Step = 'reason' | 'offer' | 'stayed' | 'canceled';

export default function Cancel() {
  const params = new URLSearchParams(window.location.search);
  const uid = params.get('uid');

  const [step, setStep] = useState<Step>('reason');
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [offerUsed, setOfferUsed] = useState(false);
  const [endsDate, setEndsDate] = useState<string | null>(null);

  const fn = (name: string) => `${SUPABASE_URL}/functions/v1/${name}`;

  const continueFromReason = () => {
    setErr('');
    if (reason.trim().length < 30) { setErr('Please tell us a bit more (at least 30 characters).'); return; }
    setStep('offer');
  };

  const claimOffer = async () => {
    setBusy(true); setErr('');
    try {
      const r = await fetch(fn('apply-retention-offer'), {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ user_id: uid, reason: reason.trim() }),
      });
      const j = await r.json();
      if (j.ok) setStep('stayed');
      else if (j.error === 'already_used') { setOfferUsed(true); setErr("You've already used this offer."); }
      else setErr('Could not apply the discount. Please try again.');
    } catch { setErr('Something went wrong. Please try again.'); }
    finally { setBusy(false); }
  };

  const doCancel = async () => {
    setBusy(true); setErr('');
    try {
      const r = await fetch(fn('cancel-subscription'), {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ user_id: uid, reason: reason.trim() }),
      });
      const j = await r.json();
      if (j.ok) { setEndsDate(j.ends || null); setStep('canceled'); }
      else if (j.error === 'reason_too_short') setErr('Please tell us a bit more (at least 30 characters).');
      else setErr('Could not cancel right now. Please try again.');
    } catch { setErr('Something went wrong. Please try again.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="glow-bg" style={{
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(124, 77, 255, 0.15) 0%, transparent 70%)', animation: 'pulse 3s ease-in-out infinite',
      }} />
      <div style={{
        width: '100%', maxWidth: '440px', background: 'rgba(15,15,26,0.5)',
        border: '1px solid var(--border-light)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '20px', padding: '32px', position: 'relative', zIndex: 1,
      }}>
        {!uid ? (
          <p style={txt}>This link is missing your account info. Please open it from the Filect app.</p>
        ) : step === 'reason' ? (
          <>
            <h1 style={title}>Before you go</h1>
            <p style={txt}>We'd genuinely like to improve. Why are you cancelling?</p>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={4}
              placeholder="Tell us what's not working for you…" style={textarea} />
            <p style={{ fontSize: '0.75rem', color: reason.trim().length >= 30 ? 'var(--text-secondary)' : '#FBBF24', margin: '6px 0 0' }}>
              {reason.trim().length}/30 characters minimum
            </p>
            {err && <p style={errStyle}>{err}</p>}
            <button onClick={continueFromReason} disabled={reason.trim().length < 30}
              style={{ ...primaryBtn, opacity: reason.trim().length < 30 ? 0.5 : 1, marginTop: '18px' }}>Continue</button>
          </>
        ) : step === 'offer' ? (
          <>
            <h1 style={title}>Wait — here's 50% off</h1>
            <p style={txt}>We'd love for you to stay. Take <strong style={{ color: '#fff' }}>50% off your next month</strong>, applied instantly.</p>
            {err && <p style={errStyle}>{err}</p>}
            {!offerUsed && (
              <button onClick={claimOffer} disabled={busy} style={{ ...primaryBtn, marginTop: '18px' }}>
                {busy ? 'Applying…' : 'Claim 50% off & stay'}
              </button>
            )}
            <button onClick={doCancel} disabled={busy} style={linkBtn}>
              {busy ? 'Please wait…' : 'No thanks, cancel my subscription'}
            </button>
          </>
        ) : step === 'stayed' ? (
          <>
            <h1 style={title}>You're all set 🎉</h1>
            <p style={txt}>Your 50% discount is applied to your next month. Thanks for staying with Filect!</p>
            <a href="filect://open" style={{ ...primaryBtn, display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: '18px' }}>Return to Filect</a>
          </>
        ) : (
          <>
            <h1 style={title}>Subscription cancelled</h1>
            <p style={txt}>Your subscription will end{endsDate ? ` on ${new Date(endsDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}` : ' at the end of your period'}. You'll keep full access until then.</p>
            <a href="filect://open" style={{ ...primaryBtn, display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: '18px' }}>Return to Filect</a>
          </>
        )}
      </div>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes pulse { 0%,100% { opacity: 0.2; transform: translate(-50%,-50%) scale(1); } 50% { opacity: 0.5; transform: translate(-50%,-50%) scale(1.1); } }
      `}</style>
    </div>
  );
}

const title: React.CSSProperties = { color: '#fff', fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px' };
const txt: React.CSSProperties = { color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 };
const errStyle: React.CSSProperties = { color: '#F87171', fontSize: '0.82rem', margin: '12px 0 0' };
const textarea: React.CSSProperties = {
  width: '100%', marginTop: '16px', padding: '12px 14px', borderRadius: '10px',
  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)',
  color: '#fff', fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical',
};
const primaryBtn: React.CSSProperties = {
  width: '100%', padding: '13px 24px',
  background: 'linear-gradient(135deg, rgba(178,139,255,0.9), rgba(109,40,217,0.9))',
  border: '1px solid rgba(178,139,255,0.3)', borderRadius: '10px',
  color: '#fff', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
};
const linkBtn: React.CSSProperties = {
  width: '100%', marginTop: '12px', padding: '10px', background: 'none', border: 'none',
  color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline',
};
