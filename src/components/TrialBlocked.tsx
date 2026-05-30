import { useEffect, useState } from 'react';

// Shown when our stripe-webhook detects that the card used at checkout was
// already used for a previous free trial (under any email). The trial sub is
// canceled before any charge happens; this page explains why and offers an
// immediate-pay path that skips the trial entirely.

const SUPABASE_FUNCTIONS = 'https://gsvccxhdgcshiwgjvgfi.supabase.co/functions/v1';

type Plan = { name: string; price: string; period: string };

export default function TrialBlocked() {
  const [params] = useState(() => new URLSearchParams(window.location.search));
  const userId = params.get('user_id') || '';
  const email = params.get('email') || '';
  const priceId = params.get('price') || 'price_1SeEv5BATYQXewwiQ5XO32PD';

  // Fetch the real price from Stripe so the page can never show a stale amount.
  // Render a loading placeholder until we have it.
  const [plan, setPlan] = useState<Plan | null>(null);
  useEffect(() => {
    document.title = 'Trial not available — Filect';
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${SUPABASE_FUNCTIONS}/get-price?price_id=${encodeURIComponent(priceId)}`);
        if (!res.ok) throw new Error(`status ${res.status}`);
        const d = await res.json();
        if (cancelled) return;
        const cleanName = (d.name || 'Subscription').replace(/^Filect\s+/i, '');
        setPlan({
          name: cleanName,
          price: `$${d.amount}`,
          period: d.interval === 'year' ? 'year' : 'month',
        });
      } catch {
        // Conservative fallback — keep messaging accurate by hiding the amount
        // rather than guessing.
        if (!cancelled) setPlan({ name: 'Subscription', price: '', period: 'month' });
      }
    })();
    return () => { cancelled = true; };
  }, [priceId]);

  const handleSubscribeNow = () => {
    const q = new URLSearchParams({ user_id: userId, price_id: priceId, source: 'web' });
    if (email) q.set('email', email);
    window.location.href = `${SUPABASE_FUNCTIONS}/create-checkout-web?${q.toString()}`;
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="glow-bg" style={{
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.10) 0%, transparent 70%)',
      }} />

      <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: 'rgba(15, 15, 26, 0.4)',
        border: '1px solid var(--border-light)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '44px 36px',
        boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.6)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Info icon — amber, not red. We're not punishing them, just informing. */}
        <div style={{
          width: '72px', height: '72px', margin: '0 auto 24px',
          backgroundColor: 'rgba(251, 191, 36, 0.12)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid rgba(251, 191, 36, 0.3)',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="13" />
            <circle cx="12" cy="16.5" r="0.8" fill="#FBBF24" />
          </svg>
        </div>

        <h1 style={{ color: '#FFFFFF', fontSize: '26px', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.02em' }}>
          Free trial not available
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
          The card you used has already been used for a free trial on a previous account.
          Free trials are limited to one per card.
        </p>

        <p style={{ color: '#FFFFFF', fontSize: '15px', lineHeight: '1.7', marginBottom: '8px' }}>
          <strong>Good news:</strong> you weren't charged — we canceled the trial before any payment went through.
        </p>

        {/* The charge-immediately box. Big, bordered, unmissable. */}
        <div style={{
          backgroundColor: 'rgba(124, 77, 255, 0.08)',
          border: '1px solid rgba(178, 139, 255, 0.35)',
          borderRadius: '12px',
          padding: '20px',
          margin: '24px 0 20px',
          textAlign: 'left',
        }}>
          <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
            Want to continue? Subscribe directly:
          </p>
          <p style={{ color: '#b28bff', fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
            {plan ? `${plan.name} — ${plan.price}/${plan.period}` : 'Loading plan…'}
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>
            ⚠️ Your card will be charged{' '}
            <strong style={{ color: '#FBBF24' }}>
              {plan?.price ? `${plan.price} immediately` : 'the plan price immediately'}
            </strong>{' '}
            — no free trial period. You can cancel anytime from your account page.
          </p>
        </div>

        <button
          onClick={handleSubscribeNow}
          style={{
            width: '100%', padding: '14px 24px', marginBottom: '12px',
            background: 'linear-gradient(135deg, rgba(178,139,255,0.9), rgba(109,40,217,0.9))',
            border: '1px solid rgba(178,139,255,0.3)', borderRadius: '10px',
            color: '#fff', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(124,77,255,0.3)',
          }}
        >
          {plan ? `Subscribe for ${plan.price}/${plan.period} — charge now` : 'Subscribe — charge now'}
        </button>

        <a
          href="/pricing.html"
          style={{
            display: 'block', textDecoration: 'none',
            padding: '12px', borderRadius: '10px',
            color: 'var(--text-secondary)', fontSize: '14px',
          }}
        >
          Maybe later
        </a>

        <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '20px', lineHeight: '1.5' }}>
          Think this is a mistake? Email <span style={{ color: 'var(--primary)' }}>support@filect.io</span> and we'll sort it out.
        </p>
      </div>
    </div>
  );
}
