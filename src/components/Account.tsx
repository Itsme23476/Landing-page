import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from './Header';
import { trackDownload } from '../utils/ads';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const MAC_URL = 'https://github.com/Itsme23476/Mac-version/releases/latest';
const WIN_URL = 'https://github.com/Itsme23476/App-interface/releases/latest';

const PLAN_NAMES: Record<string, string> = {
  price_1SeEv5BATYQXewwiQ5XO32PD: 'Basic',   // monthly
  price_1TbNhCBATYQXewwi6k6RJfAV: 'Basic',   // annual
  price_1SuJOxBATYQXewwiuqsqAcMJ: 'Pro',     // monthly
  price_1TbNhOBATYQXewwinVl6TOP1: 'Pro',     // annual
  price_1TbMZjBATYQXewwiLqkGfPuX: 'Premium', // monthly
  price_1TbNhOBATYQXewwiHTK56Jwy: 'Premium', // annual
};

type Sub = {
  status: string; price_id: string | null; current_period_end: string | null;
  cancel_at_period_end?: boolean; retention_offer_used?: boolean; discount_pending?: boolean;
};

type CancelStep = 'none' | 'reason' | 'offer' | 'stayed' | 'canceled';

export default function Account() {
  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [sub, setSub] = useState<Sub | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWindows, setIsWindows] = useState(false);

  const [cancelStep, setCancelStep] = useState<CancelStep>('none');
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [flowErr, setFlowErr] = useState('');
  const [endsDate, setEndsDate] = useState<string | null>(null);
  const [justChanged] = useState(() => new URLSearchParams(window.location.search).get('changed') === '1');

  useEffect(() => {
    setIsWindows((navigator.userAgent || '').toLowerCase().includes('win'));
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      if (!user) { window.location.href = '/signup?mode=login'; return; }
      setEmail(user.email || null);
      setUserId(user.id);
      const { data: rows } = await supabase
        .from('subscriptions')
        .select('status, price_id, current_period_end, cancel_at_period_end, retention_offer_used, discount_pending')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1);
      setSub(rows && rows.length ? (rows[0] as Sub) : null);
      setLoading(false);
    });
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const manage = () => {
    if (userId) window.open(`${SUPABASE_URL}/functions/v1/create-portal-session?user_id=${userId}`, '_blank', 'noopener');
  };

  const fn = (name: string) => `${SUPABASE_URL}/functions/v1/${name}`;

  // Continue from the reason step: show the one-time offer, or (if already used)
  // go straight to confirming the cancellation.
  const continueFromReason = () => {
    setFlowErr('');
    if (reason.trim().length < 30) { setFlowErr('Please tell us a bit more (at least 30 characters).'); return; }
    if (sub?.retention_offer_used) { doCancel(); } else { setCancelStep('offer'); }
  };

  const claimOffer = async () => {
    setBusy(true); setFlowErr('');
    try {
      const r = await fetch(fn('apply-retention-offer'), {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ user_id: userId, reason: reason.trim() }),
      });
      const j = await r.json();
      if (j.ok) setCancelStep('stayed');
      else setFlowErr('Could not apply the discount. Please try again.');
    } catch { setFlowErr('Something went wrong. Please try again.'); }
    finally { setBusy(false); }
  };

  const doCancel = async () => {
    setBusy(true); setFlowErr('');
    try {
      const r = await fetch(fn('cancel-subscription'), {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ user_id: userId, reason: reason.trim() }),
      });
      const j = await r.json();
      if (j.ok) { setEndsDate(j.ends || null); setCancelStep('canceled'); }
      else if (j.error === 'reason_too_short') setFlowErr('Please tell us a bit more (at least 30 characters).');
      else setFlowErr('Could not cancel right now. Please try again.');
    } catch { setFlowErr('Something went wrong. Please try again.'); }
    finally { setBusy(false); }
  };

  const planName = sub?.price_id ? (PLAN_NAMES[sub.price_id] || 'Filect') : null;
  const renews = sub?.current_period_end
    ? new Date(sub.current_period_end).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : null;
  const active = sub && (sub.status === 'active' || sub.status === 'trialing');

  return (
    <div className="app-container" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <Header />
      </div>

      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px 80px' }}>
        <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '4px' }}>Account</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '40px' }}>{email}</p>

        {loading ? (
          <p style={{ color: 'var(--text-secondary)' }}>Loading…</p>
        ) : (
          <>
            {justChanged && (
              <div style={{
                background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
                borderRadius: '12px', padding: '14px 18px', marginBottom: '20px',
                color: '#4ADE80', fontSize: '0.9rem', fontWeight: 500,
              }}>
                ✓ Your plan has been updated{planName ? ` to ${planName}` : ''}. The change is now active on your subscription.
              </div>
            )}

            {/* Subscription */}
            <section style={sectionStyle}>
              <h2 style={sectionTitle}>Subscription</h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 600 }}>
                      {active ? `${planName || 'Filect'} plan` : 'No active subscription'}
                    </span>
                    {sub && (
                      <span style={{
                        fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: '999px',
                        color: active ? '#4ADE80' : '#F87171',
                        background: active ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
                      }}>
                        {sub.status === 'trialing' ? 'Free trial' : sub.status === 'active' ? 'Active' : sub.status}
                      </span>
                    )}
                  </div>
                  {renews && active && !sub?.cancel_at_period_end && (
                    <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {sub?.status === 'trialing' ? 'Trial ends' : 'Renews'} {renews}
                    </p>
                  )}
                  {active && sub?.cancel_at_period_end && (
                    <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: '#FBBF24' }}>
                      Cancels on {renews} — you keep access until then.
                    </p>
                  )}
                  {active && sub?.discount_pending && !sub?.cancel_at_period_end && (
                    <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: '#4ADE80' }}>
                      🎉 50% off applied to your next invoice
                    </p>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px', alignItems: 'center' }}>
                {active ? (
                  <>
                    <a href="/pricing.html" style={{ ...primaryBtn, textDecoration: 'none' }}>Change plan</a>
                    <button onClick={manage} style={ghostBtn}>Billing & invoices</button>
                    {!sub?.cancel_at_period_end && (
                      <button
                        onClick={() => { setReason(''); setFlowErr(''); setCancelStep('reason'); }}
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline', marginLeft: 'auto' }}
                      >Cancel subscription</button>
                    )}
                  </>
                ) : (
                  <a href="/pricing.html" style={{ ...primaryBtn, textDecoration: 'none', textAlign: 'center' }}>Start your free trial</a>
                )}
              </div>
            </section>

            {/* Download */}
            <section style={sectionStyle}>
              <h2 style={sectionTitle}>Download the app</h2>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={isWindows ? WIN_URL : MAC_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload(isWindows ? 'windows' : 'mac')} style={primaryBtn}>Download for {isWindows ? 'Windows' : 'Mac'}</a>
                <a href={isWindows ? MAC_URL : WIN_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload(isWindows ? 'mac' : 'windows')} style={ghostBtn}>Download for {isWindows ? 'Mac' : 'Windows'}</a>
              </div>
              <p style={{ margin: '14px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Log in inside the app with this same email to use your subscription.
              </p>
            </section>

            {/* Affiliate program — existing customers convert to affiliates at
                ~10x the rate of cold visitors, so this card lives right inside
                their account page. */}
            <section style={{
              ...sectionStyle,
              background: 'linear-gradient(135deg, rgba(124,77,255,0.08), rgba(109,40,217,0.04))',
              borderColor: 'rgba(178,139,255,0.25)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 320px' }}>
                  <h2 style={{ ...sectionTitle, marginBottom: 4 }}>💜 Love Filect? Earn 30% recurring</h2>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Refer friends and earn 30% of every payment they make — for as long as they stay subscribed.
                  </p>
                </div>
                <a
                  href="/affiliates"
                  style={{
                    display: 'inline-block',
                    padding: '10px 18px',
                    background: 'linear-gradient(135deg, rgba(178,139,255,0.95), rgba(109,40,217,0.95))',
                    border: '1px solid rgba(178,139,255,0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(124,77,255,0.25)',
                  }}
                >
                  Become an affiliate →
                </a>
              </div>
            </section>

            {/* Account */}
            <section style={{ ...sectionStyle, marginBottom: 0 }}>
              <h2 style={sectionTitle}>Account</h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Email</p>
                  <p style={{ margin: '2px 0 0', color: '#fff', fontSize: '0.95rem' }}>{email}</p>
                </div>
                <button onClick={signOut} style={ghostBtn}>Sign out</button>
              </div>
            </section>
          </>
        )}
      </main>

      {cancelStep !== 'none' && (
        <div style={overlay} onClick={() => !busy && setCancelStep('none')}>
          <div style={modalCard} onClick={(e) => e.stopPropagation()}>
            {cancelStep === 'reason' && (
              <>
                <h3 style={modalTitle}>Before you go</h3>
                <p style={modalText}>We'd genuinely like to improve. Why are you cancelling?</p>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Tell us what's not working for you…"
                  rows={4}
                  style={textarea}
                />
                <p style={{ fontSize: '0.75rem', color: reason.trim().length >= 30 ? 'var(--text-secondary)' : '#FBBF24', margin: '6px 0 0' }}>
                  {reason.trim().length}/30 characters minimum
                </p>
                {flowErr && <p style={errText}>{flowErr}</p>}
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button onClick={() => setCancelStep('none')} style={ghostBtn}>Never mind</button>
                  <button onClick={continueFromReason} disabled={reason.trim().length < 30} style={{ ...primaryBtn, opacity: reason.trim().length < 30 ? 0.5 : 1, cursor: reason.trim().length < 30 ? 'not-allowed' : 'pointer' }}>Continue</button>
                </div>
              </>
            )}

            {cancelStep === 'offer' && (
              <>
                <h3 style={modalTitle}>Wait — here's 50% off</h3>
                <p style={modalText}>
                  We'd love for you to stay. Take <strong style={{ color: '#fff' }}>50% off your next month</strong> on us — no code needed, applied instantly.
                </p>
                {flowErr && <p style={errText}>{flowErr}</p>}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                  <button onClick={claimOffer} disabled={busy} style={primaryBtn}>{busy ? 'Applying…' : 'Claim 50% off & stay'}</button>
                  <button onClick={doCancel} disabled={busy} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}>No thanks, cancel my subscription</button>
                </div>
              </>
            )}

            {cancelStep === 'stayed' && (
              <>
                <h3 style={modalTitle}>You're all set 🎉</h3>
                <p style={modalText}>Your 50% discount is applied to your next month. Thanks for staying with Filect!</p>
                <button onClick={() => window.location.reload()} style={{ ...primaryBtn, marginTop: '16px' }}>Done</button>
              </>
            )}

            {cancelStep === 'canceled' && (
              <>
                <h3 style={modalTitle}>Subscription cancelled</h3>
                <p style={modalText}>
                  Your subscription will end{endsDate ? ` on ${new Date(endsDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}` : ' at the end of your period'}. You'll keep full access until then.
                </p>
                <button onClick={() => window.location.reload()} style={{ ...primaryBtn, marginTop: '16px' }}>Done</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 100,
};

const modalCard: React.CSSProperties = {
  width: '100%', maxWidth: '440px', background: '#15151a',
  border: '1px solid var(--border-light)', borderRadius: '20px', padding: '32px',
};

const modalTitle: React.CSSProperties = { color: '#fff', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' };
const modalText: React.CSSProperties = { color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 };
const errText: React.CSSProperties = { color: '#F87171', fontSize: '0.82rem', margin: '12px 0 0' };
const textarea: React.CSSProperties = {
  width: '100%', marginTop: '16px', padding: '12px 14px', borderRadius: '10px',
  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)',
  color: '#fff', fontSize: '0.9rem', fontFamily: 'inherit', resize: 'vertical',
};

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--border-light)',
  borderRadius: '16px',
  padding: '28px',
  marginBottom: '20px',
};

const sectionTitle: React.CSSProperties = {
  color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600,
  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '18px',
};

const primaryBtn: React.CSSProperties = {
  padding: '11px 24px',
  background: 'linear-gradient(135deg, rgba(178,139,255,0.9), rgba(109,40,217,0.9))',
  border: '1px solid rgba(178,139,255,0.3)', borderRadius: '10px',
  color: '#fff', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
  display: 'inline-block',
};

const ghostBtn: React.CSSProperties = {
  padding: '11px 24px', background: 'none',
  border: '1px solid var(--border-light)', borderRadius: '10px',
  color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
  textDecoration: 'none', display: 'inline-block',
};
