import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DEFAULT_PLAN = 'price_1SuJOxBATYQXewwiuqsqAcMJ'; // Pro

export default function Signup() {
  const params = new URLSearchParams(window.location.search);
  const plan = params.get('plan') || DEFAULT_PLAN;

  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const goToCheckout = (userId: string, userEmail: string) => {
    const q = new URLSearchParams({ user_id: userId, email: userEmail, price_id: plan });
    window.location.href = `${SUPABASE_URL}/functions/v1/create-checkout?${q.toString()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setBusy(true);
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: 'https://filect.io/signup-success' },
        });
        if (error) {
          // If they already have an account, switch them to log in
          if (error.message.toLowerCase().includes('already')) {
            setMode('login');
            setError('You already have an account — please log in.');
          } else {
            setError(error.message);
          }
          return;
        }
        if (data.user) { goToCheckout(data.user.id, email); return; }
        setError('Could not create your account. Please try again.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) { setError(error.message); return; }
        if (data.user) { goToCheckout(data.user.id, email); return; }
        setError('Could not log you in. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
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
        <h1 style={{ color: '#FFFFFF', fontSize: '26px', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '28px', textAlign: 'center' }}>
          {mode === 'signup'
            ? 'Sign up to start your 10-day free trial. You won’t be charged until the trial ends — cancel anytime before then.'
            : 'Log in to continue to checkout.'}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email" placeholder="Email" value={email} autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password" placeholder="Password" value={password}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {error && (
            <p style={{ color: '#ff6b6b', fontSize: '13px', margin: '4px 0 12px', textAlign: 'center' }}>{error}</p>
          )}

          <button
            type="submit" disabled={busy}
            style={{
              width: '100%', padding: '14px 24px',
              background: 'linear-gradient(135deg, rgba(178, 139, 255, 0.9) 0%, rgba(109, 40, 217, 0.9) 100%)',
              border: '1px solid rgba(178, 139, 255, 0.3)', borderRadius: '10px',
              color: '#FFFFFF', fontSize: '15px', fontWeight: 600, cursor: busy ? 'default' : 'pointer',
              opacity: busy ? 0.7 : 1, boxShadow: '0 4px 15px rgba(124, 77, 255, 0.3)',
            }}
          >
            {busy ? 'Please wait…' : mode === 'signup' ? 'Continue to checkout →' : 'Log in & continue →'}
          </button>
        </form>

        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '18px', textAlign: 'center' }}>
          {mode === 'signup' ? 'Already have an account? ' : 'Need an account? '}
          <span
            onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }}
            style={{ color: 'var(--primary)', cursor: 'pointer' }}
          >
            {mode === 'signup' ? 'Log in' : 'Sign up'}
          </span>
        </p>

        <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
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
