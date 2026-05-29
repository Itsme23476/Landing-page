import { useEffect } from 'react';
import { motion } from 'framer-motion';

// Affiliate program landing page. Drives motivated visitors (footer link,
// account page, future welcome email) to the Endorsely signup form. Keep the
// pitch short and the CTA unmissable — copy density kills affiliate conversion.

const ENDORSELY_SIGNUP = 'https://filectio-d124.endorsely.com';

export default function Affiliates() {
  useEffect(() => {
    document.title = 'Affiliate Program — Filect';
  }, []);

  const handleApply = () => {
    window.open(ENDORSELY_SIGNUP, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Ambient background — matches Pricing.tsx aesthetic. */}
      <div className="glow-bg" style={{ top: '-10%', left: '-10%', width: '800px', height: '800px' }} />
      <div className="glow-bg" style={{ top: '20%', right: '-20%', width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(178, 139, 255, 0.1) 0%, rgba(5, 5, 8, 0) 60%)' }} />

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '80px 24px 120px', position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <span className="badge" style={{ marginBottom: '16px' }}>Affiliate Program</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-0.02em', color: '#fff' }}>
            Earn <span style={{ background: 'linear-gradient(135deg, #B28BFF, #6D28D9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>30% recurring</span> for every customer you refer
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            Recommend Filect to your audience and earn a commission on every subscription —
            for as long as they stay subscribed. No cap, no expiry on referred customers.
          </p>

          <button
            onClick={handleApply}
            style={{
              marginTop: '36px',
              padding: '16px 36px',
              fontSize: '16px',
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(135deg, rgba(178,139,255,0.95), rgba(109,40,217,0.95))',
              border: '1px solid rgba(178,139,255,0.3)',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(124,77,255,0.35)',
            }}
          >
            Apply to the affiliate program →
          </button>
          <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Takes 30 seconds. We review and approve within 24h.
          </p>
        </motion.div>

        {/* The 3 commission numbers — short, scannable, no jargon. */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '72px' }}>
          {[
            { value: '30%', label: 'Recurring commission', sub: 'On every payment, every month' },
            { value: 'Lifetime', label: 'For as long as they pay', sub: 'No 12-month cliff' },
            { value: '$50', label: 'Minimum payout', sub: 'Via PayPal, paid monthly' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                backgroundColor: 'rgba(15, 15, 26, 0.5)',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                padding: '28px 24px',
                textAlign: 'center',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <p style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '6px', letterSpacing: '-0.02em' }}>{stat.value}</p>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#b28bff', marginBottom: '4px' }}>{stat.label}</p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* How it works — 3 simple steps. */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginBottom: '32px', textAlign: 'center', letterSpacing: '-0.01em' }}>
            How it works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              { n: '1', t: 'Apply', d: 'Submit your name and where you\'ll share Filect. We approve most affiliates within 24 hours.' },
              { n: '2', t: 'Share your link', d: 'You get a unique tracking link. Drop it in YouTube descriptions, blog posts, Twitter, newsletters — anywhere.' },
              { n: '3', t: 'Get paid', d: 'Every time someone subscribes through your link, you earn 30% of their payment. Payouts arrive monthly once you hit $50.' },
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'rgba(15, 15, 26, 0.4)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '14px',
                  padding: '24px',
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(178,139,255,0.25), rgba(109,40,217,0.25))',
                  border: '1px solid rgba(178,139,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#b28bff', fontWeight: 700, fontSize: '15px',
                  marginBottom: '14px',
                }}>{step.n}</div>
                <h3 style={{ color: '#fff', fontSize: '17px', fontWeight: 700, marginBottom: '6px' }}>{step.t}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>{step.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who it's for — qualifies the audience. */}
        <section style={{ marginBottom: '72px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginBottom: '24px', textAlign: 'center', letterSpacing: '-0.01em' }}>
            Who Filect's affiliate program is for
          </h2>
          <div style={{
            backgroundColor: 'rgba(15, 15, 26, 0.4)',
            border: '1px solid var(--border-light)',
            borderRadius: '14px',
            padding: '28px',
          }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
              {[
                'Productivity YouTubers and content creators',
                'Mac/Windows software reviewers',
                'Bloggers writing about file organization, AI tools, or workflows',
                'Newsletter writers in the productivity / creator / IT space',
                'Filect customers who love the app and want to recommend it',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'start', gap: '10px', color: 'var(--text-secondary)', fontSize: '15px' }}>
                  <span style={{ color: '#4ADE80', flexShrink: 0, marginTop: '2px' }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Final CTA. */}
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          background: 'linear-gradient(135deg, rgba(124,77,255,0.08), rgba(109,40,217,0.04))',
          border: '1px solid rgba(178,139,255,0.25)',
          borderRadius: '20px',
        }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: '12px', letterSpacing: '-0.01em' }}>
            Ready to start earning?
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px' }}>
            Apply now — most affiliates are approved the same day.
          </p>
          <button
            onClick={handleApply}
            style={{
              padding: '14px 32px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(135deg, rgba(178,139,255,0.95), rgba(109,40,217,0.95))',
              border: '1px solid rgba(178,139,255,0.3)',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 6px 24px rgba(124,77,255,0.3)',
            }}
          >
            Apply to the affiliate program →
          </button>
          <p style={{ marginTop: '18px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Questions? Email <span style={{ color: 'var(--primary)' }}>support@filect.io</span>
          </p>
        </div>
      </div>
    </div>
  );
}
