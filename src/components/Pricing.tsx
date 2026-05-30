import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { hasUsedTrial } from '../utils/trialMemory';

type Tier = {
  name: string;
  price: string;
  priceId: string;
  blurb: string;
  features: string[];
  highlighted?: boolean;
};

const TIERS: Tier[] = [
  {
    name: 'Basic',
    price: '$15',
    priceId: 'price_1SeEv5BATYQXewwiQ5XO32PD',
    blurb: 'For getting your files under control.',
    features: [
      'Unlimited text & audio categorization',
      '1,000 image & video categorizations / mo',
      'Semantic file search',
      'Natural language queries',
      'Mac & Windows',
    ],
  },
  {
    name: 'Pro',
    price: '$50',
    priceId: 'price_1SuJOxBATYQXewwiuqsqAcMJ',
    blurb: 'For power users with large libraries.',
    highlighted: true,
    features: [
      'Unlimited text & audio categorization',
      '5,000 image & video categorizations / mo',
      'Semantic file search',
      'Natural language queries',
      'Mac & Windows',
      'Priority email support',
    ],
  },
  {
    name: 'Premium',
    price: '$199',
    priceId: 'price_1TbMZjBATYQXewwiLqkGfPuX',
    blurb: 'For teams & heavy professional use.',
    features: [
      'Unlimited text & audio categorization',
      'Effectively unlimited image & video (50,000 / mo)',
      'Semantic file search',
      'Natural language queries',
      'Mac & Windows',
      'Priority support',
    ],
  },
];

const Pricing: React.FC = () => {
  // Soft trial-abuse layer: if this browser already used a trial, swap the
  // copy so we don't promise something the server-side card check will block.
  // Read in an effect so SSR/hydration doesn't mismatch.
  const [trialUsed, setTrialUsed] = useState(false);
  useEffect(() => { setTrialUsed(hasUsedTrial()); }, []);

  return (
    <section id="pricing" style={{ padding: '120px 24px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge" style={{ marginBottom: '16px' }}>Simple Pricing</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Start organizing your files today.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 60px' }}>
            {trialUsed
              ? 'You\'ve already used your free trial. Subscribe to continue.'
              : 'Every plan includes a 10-day free trial. Cancel anytime.'}
          </p>
        </motion.div>

        <div style={{
          display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'stretch',
          flexWrap: 'wrap', maxWidth: '1100px', margin: '0 auto',
        }}>
          {TIERS.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                flex: '1 1 300px', maxWidth: '340px',
                background: tier.highlighted ? 'rgba(176, 102, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: tier.highlighted ? '2px solid rgba(176, 102, 255, 0.6)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                padding: '40px 32px',
                position: 'relative',
                textAlign: 'left',
                transform: tier.highlighted ? 'scale(1.04)' : 'none',
                boxShadow: tier.highlighted ? '0 20px 50px rgba(176, 102, 255, 0.2)' : '0 10px 30px rgba(0,0,0,0.3)',
              }}
            >
              {tier.highlighted && (
                <span style={{
                  position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg, #b28bff, #6d28d9)', color: '#fff',
                  fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em',
                  padding: '6px 16px', borderRadius: '999px', whiteSpace: 'nowrap',
                }}>
                  MOST POPULAR
                </span>
              )}

              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '4px' }}>{tier.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px', minHeight: '40px' }}>{tier.blurb}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                <span style={{ fontSize: '3rem', fontWeight: 800 }}>{tier.price}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>/ month</span>
              </div>

              <a
                href={`/signup?plan=${tier.priceId}`}
                className="button-primary"
                style={{
                  display: 'block', width: '100%', padding: '14px', fontSize: '1rem',
                  textDecoration: 'none', textAlign: 'center', marginBottom: '28px',
                  background: tier.highlighted ? undefined : 'rgba(255,255,255,0.06)',
                  border: tier.highlighted ? undefined : '1px solid rgba(176,102,255,0.4)',
                }}
              >
                Start Free Trial
              </a>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {tier.features.map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b066ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.4 }}>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
