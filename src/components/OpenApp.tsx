import { useEffect, useState } from 'react';

const SUPABASE_URL = 'https://gsvccxhdgcshiwgjvgfi.supabase.co';
const STARTER_PRICE_ID = 'price_1SeEv5BATYQXewwiQ5XO32PD';

export default function OpenApp() {
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const uid = params.get('uid');
    const email = params.get('email');
    // Bring them back to the plan they originally abandoned (falls back to Starter).
    const plan = params.get('plan') || STARTER_PRICE_ID;
    if (uid) {
      const q = new URLSearchParams({ user_id: uid, price_id: plan });
      if (email) q.set('email', email);
      setCheckoutUrl(`${SUPABASE_URL}/functions/v1/create-checkout-web?${q.toString()}`);
    }
  }, []);

  const goToCheckout = () => {
    if (checkoutUrl) window.location.href = checkoutUrl;
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
        width: '100%', maxWidth: '440px',
        backgroundColor: 'rgba(15, 15, 26, 0.4)',
        border: '1px solid var(--border-light)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px', padding: '40px 32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        textAlign: 'center', position: 'relative', zIndex: 1,
      }}>

        <div style={{
          width: '80px', height: '80px',
          backgroundColor: 'rgba(124, 77, 255, 0.1)',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px', border: '1px solid rgba(124, 77, 255, 0.2)',
        }}>
          <span style={{ fontSize: '40px' }}>👋</span>
        </div>

        <h1 style={{ color: '#FFFFFF', fontSize: '26px', fontWeight: 700, marginBottom: '12px' }}>
          Welcome back!
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
          You're one step away from letting Filect organize your files automatically.
          Finish setting up your subscription below.
        </p>

        {/* Plan summary */}
        <div style={{
          backgroundColor: 'rgba(124, 77, 255, 0.08)',
          border: '1px solid rgba(124, 77, 255, 0.15)',
          borderRadius: '12px', padding: '20px', marginBottom: '28px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 600 }}>Starter plan</span>
            <span style={{ color: '#B28BFF', fontSize: '16px', fontWeight: 700 }}>$15<span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>/mo</span></span>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'left' }}>
            Up to 1,000 media files organized automatically.
          </p>
        </div>

        {checkoutUrl ? (
          <button
            onClick={goToCheckout}
            style={{
              width: '100%', padding: '14px 24px',
              background: 'linear-gradient(135deg, rgba(178, 139, 255, 0.9) 0%, rgba(109, 40, 217, 0.9) 100%)',
              border: '1px solid rgba(178, 139, 255, 0.3)', borderRadius: '10px',
              color: '#FFFFFF', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(124, 77, 255, 0.3)',
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 77, 255, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(124, 77, 255, 0.3)'; }}
          >
            Continue to secure checkout →
          </button>
        ) : (
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
            Open the Filect app to complete your subscription, or{' '}
            <a href="https://filect.io" style={{ color: 'var(--primary)', textDecoration: 'none' }}>download it here</a>.
          </p>
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
