import React from 'react';
import { motion } from 'framer-motion';

// Real customer testimonials. Avatars are initials-monograms on purpose — we use
// the customers' real words but do NOT attach invented/stock faces to named people.
type Testimonial = {
  name: string;
  initial: string;
  quote: string;
  gradient: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Mark',
    initial: 'M',
    quote: 'Filect saves me over 2 hours every single week organizing my files.',
    gradient: 'linear-gradient(135deg, #b066ff 0%, #7c3aed 100%)',
  },
  {
    name: 'Marie',
    initial: 'M',
    quote: 'I can find any file stored on my PC in just a few seconds.',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
  },
  {
    name: 'Robert',
    initial: 'R',
    quote: 'Filect lets me focus on the important work instead of organizing and managing files.',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #5b21b6 100%)',
  },
];

const Stars: React.FC = () => (
  <div style={{ display: 'flex', gap: '3px' }} aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#b066ff" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section style={{ padding: '40px 24px 96px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <span className="badge" style={{ marginBottom: '20px' }}>Testimonials</span>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: '20px 0 0',
            }}
          >
            Loved by people who <span className="text-gradient">hate clutter</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {TESTIMONIALS.map((t, idx) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              style={{
                flex: '1 1 320px',
                maxWidth: '360px',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(176,102,255,0.18)',
                borderRadius: '20px',
                padding: '32px',
                textAlign: 'left',
                boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
              }}
            >
              {/* Decorative quote mark */}
              <div
                aria-hidden="true"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '3.5rem',
                  lineHeight: 0.8,
                  color: 'rgba(176,102,255,0.45)',
                  marginBottom: '8px',
                  height: '28px',
                }}
              >
                &ldquo;
              </div>

              <blockquote
                style={{
                  flex: 1,
                  margin: '0 0 24px',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  color: '#f1f5f9',
                }}
              >
                {t.quote}
              </blockquote>

              <div style={{ marginBottom: '16px' }}>
                <Stars />
              </div>

              <figcaption
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: t.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#fff',
                    flexShrink: 0,
                    boxShadow: '0 0 0 4px rgba(176,102,255,0.12)',
                  }}
                >
                  {t.initial}
                </span>
                <span style={{ fontWeight: 600, color: '#fff' }}>{t.name}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
