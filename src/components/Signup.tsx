import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DEFAULT_PLAN = 'price_1SuJOxBATYQXewwiuqsqAcMJ'; // Pro

export default function Signup() {
  const params = new URLSearchParams(window.location.search);
  const plan = params.get('plan') || DEFAULT_PLAN;

  const [mode, setMode] = useState<'signup' | 'login'>(
    params.get('mode') === 'login' ? 'login' : 'signup'
  );
  const [step, setStep] = useState<'credentials' | 'code'>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const goToCheckout = (userId: string, userEmail: string) => {
    const q = new URLSearchParams({ user_id: userId, email: userEmail, price_id: plan });
    window.location.href = `${SUPABASE_URL}/functions/v1/create-checkout-web?${q.toString()}`;
  };

  // After any successful auth, send the user to the right place:
  //  - active/trialing subscription      -> /account (manage)
  //  - no sub but they explicitly picked a plan (came from pricing) -> checkout
  //  - no sub, no plan (e.g. nav signup) -> pricing to choose a plan first
  const routeAfterAuth = async (userId: string, userEmail: string) => {
    const { data } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', userId)
      .in('status', ['active', 'trialing'])
      .limit(1);
    if (data && data.length) { window.location.href = '/account'; return; }
    if (params.get('plan')) { goToCheckout(userId, userEmail); return; }
    window.location.href = '/pricing.html';
  };

  // ONLY auto-continue to checkout when we're genuinely returning from a Google
  // OAuth redirect (marked with ?oauth=1). A stale/persisted session from a
  // previous visit must NOT silently send the user to checkout.
  useEffect(() => {
    const isOAuthReturn = new URLSearchParams(window.location.search).get('oauth') === '1';
    if (!isOAuthReturn) return;
    supabase.auth.getSession().then(async ({ data }) => {
      const user = data.session?.user;
      if (!user) return;
      // Tag the signup source on first web signup (Google users don't go through
      // the email signUp where we set this). Only set if not already present.
      if (!user.user_metadata?.signup_source) {
        try { await supabase.auth.updateUser({ data: { signup_source: 'web' } }); } catch (_e) { /* noop */ }
      }
      routeAfterAuth(user.id, user.email || '');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signInWithGoogle = async () => {
    setError('');
    // Only carry a plan through OAuth if one was explicitly chosen (came from
    // pricing). A plain nav signup carries none, so we route to pricing after.
    const explicit = params.get('plan');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/signup?oauth=1${explicit ? `&plan=${explicit}` : ''}` },
    });
    if (error) setError(error.message);
  };

  // Step 1: email + password
  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setInfo('');
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setBusy(true);
    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) { setError(error.message); return; }
        if (data.user) { await routeAfterAuth(data.user.id, email); return; }
        setError('Could not log you in. Please try again.');
        return;
      }
      // signup
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://filect.io/signup-success',
          data: { signup_source: 'web' },
        },
      });
      if (error) {
        if (error.message.toLowerCase().includes('already')) {
          setMode('login');
          setError('You already have an account — please log in.');
        } else { setError(error.message); }
        return;
      }
      // Move to code step. (Supabase emails a 6-digit code; no session yet.)
      setStep('code');
      setInfo(`We sent a 6-digit code to ${email}. Enter it below to verify your email.`);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally { setBusy(false); }
  };

  // Step 2: verify the 6-digit code, then go to checkout
  const handleCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setInfo('');
    if (!code.trim()) { setError('Enter the 6-digit code from your email.'); return; }
    setBusy(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email, token: code.trim(), type: 'signup',
      });
      if (error) { setError('That code is incorrect or expired. Check your email and try again.'); return; }
      if (data.user) { await routeAfterAuth(data.user.id, email); return; }
      setError('Could not verify. Please try again.');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally { setBusy(false); }
  };

  const resendCode = async () => {
    setError(''); setInfo('');
    setBusy(true);
    try {
      const { error } = await supabase.auth.resend({ type: 'signup', email });
      if (error) setError(error.message);
      else setInfo(`New code sent to ${email}.`);
    } finally { setBusy(false); }
  };

  const wrongEmail = () => {
    setStep('credentials'); setCode(''); setError(''); setInfo('');
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="glow-bg" style={{
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(124, 77, 255, 0.15) 0%, transparent 70%)',
        animation: 'pulse 3s ease-in-out infinite',
      }} />

      <div style={{
        width: '100%', maxWidth: '420px',
        backgroundColor: 'rgba(15, 15, 26, 0.4)',
        border: '1px solid var(--border-light)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px', padding: '40px 32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative', zIndex: 1,
      }}>

        {step === 'credentials' ? (
          <>
            <h1 style={{ color: '#FFFFFF', fontSize: '26px', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>
              {mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px', textAlign: 'center' }}>
              {mode === 'signup'
                ? 'Sign up to start your 10-day free trial. You won’t be charged until the trial ends — cancel anytime before then.'
                : 'Log in to continue to checkout.'}
            </p>

            <button type="button" onClick={signInWithGoogle} style={googleBtn}>
              <svg width="18" height="18" viewBox="0 0 18 18" style={{ flexShrink: 0 }}>
                <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/>
                <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"/>
                <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.42 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
              </svg>
              Continue with Google
            </button>
            <div style={dividerStyle}><span style={{ background: 'rgba(15,15,26,0.4)', padding: '0 12px' }}>or</span></div>

            <form onSubmit={handleCredentials}>
              <input type="email" placeholder="Email" value={email} autoComplete="email" onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              <input type="password" placeholder="Password" value={password} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
              {error && <p style={errStyle}>{error}</p>}
              <button type="submit" disabled={busy} style={primaryBtn(busy)}>
                {busy ? 'Please wait…' : mode === 'signup' ? 'Continue →' : 'Log in & continue →'}
              </button>
            </form>

            <div style={{ marginTop: '18px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '10px' }}>
                {mode === 'signup' ? 'Already have an account?' : 'Need an account?'}
              </p>
              <button type="button" onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }} style={ghostBtn}>
                {mode === 'signup' ? 'Log in' : 'Sign up'}
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 style={{ color: '#FFFFFF', fontSize: '26px', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>
              Verify your email
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px', textAlign: 'center' }}>
              {info || `We sent a 6-digit code to ${email}.`}
            </p>

            <form onSubmit={handleCode}>
              <input
                type="text" inputMode="numeric" placeholder="Enter the code" value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
                style={{ ...inputStyle, textAlign: 'center', fontSize: '22px', letterSpacing: '6px', fontWeight: 700 }}
              />
              {error && <p style={errStyle}>{error}</p>}
              <button type="submit" disabled={busy} style={primaryBtn(busy)}>
                {busy ? 'Verifying…' : 'Verify & continue →'}
              </button>
            </form>

            <div style={{ marginTop: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button type="button" onClick={resendCode} disabled={busy} style={linkBtn}>Resend code</button>
              <button type="button" onClick={wrongEmail} style={linkBtn}>Wrong email? Go back</button>
            </div>
          </>
        )}

        <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <span>🔒</span> Secure payment powered by Stripe
        </p>
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '13px 16px', marginBottom: '12px',
  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)',
  borderRadius: '10px', color: '#fff', fontSize: '15px', outline: 'none',
};
const errStyle: React.CSSProperties = { color: '#ff6b6b', fontSize: '13px', margin: '4px 0 12px', textAlign: 'center' };
function primaryBtn(busy: boolean): React.CSSProperties {
  return {
    width: '100%', padding: '14px 24px',
    background: 'linear-gradient(135deg, rgba(178, 139, 255, 0.9) 0%, rgba(109, 40, 217, 0.9) 100%)',
    border: '1px solid rgba(178, 139, 255, 0.3)', borderRadius: '10px',
    color: '#FFFFFF', fontSize: '15px', fontWeight: 600, cursor: busy ? 'default' : 'pointer',
    opacity: busy ? 0.7 : 1, boxShadow: '0 4px 15px rgba(124, 77, 255, 0.3)',
  };
}
const ghostBtn: React.CSSProperties = {
  width: '100%', padding: '11px', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(178,139,255,0.45)', borderRadius: '10px', color: '#b28bff',
  fontSize: '15px', fontWeight: 600, cursor: 'pointer',
};
const linkBtn: React.CSSProperties = {
  background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline',
};
const googleBtn: React.CSSProperties = {
  width: '100%', padding: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
  background: '#ffffff', color: '#1a1a2e', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
};
const dividerStyle: React.CSSProperties = {
  textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px', margin: '0 0 16px',
  borderTop: '1px solid var(--border-light)', lineHeight: '0',
};
