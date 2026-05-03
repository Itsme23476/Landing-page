import React from 'react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
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
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.2,
            marginBottom: '24px',
            letterSpacing: '-0.02em'
          }}>
            Start organizing your files today.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 60px' }}>
            Try Filect risk-free. No complex tiers, just one simple plan for complete access to all AI features.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            maxWidth: '440px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(176, 102, 255, 0.3)',
            borderRadius: '24px',
            padding: '48px 40px',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 0 40px rgba(176, 102, 255, 0.05)'
          }}
        >
          {/* Top Glow */}
          <div style={{
            position: 'absolute',
            top: 0, left: '50%', transform: 'translateX(-50%)',
            width: '80%', height: '1px',
            background: 'linear-gradient(90deg, transparent, #b066ff, transparent)',
            opacity: 0.8
          }}></div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Pro Plan</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px', marginBottom: '8px' }}>
            <span style={{ fontSize: '3.5rem', fontWeight: 800 }}>$15</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>/ month</span>
          </div>
          <p style={{ color: 'var(--purple)', fontWeight: 600, marginBottom: '32px' }}>Includes a 10-day free trial</p>

          <a 
            href="#download" 
            className="button-primary" 
            style={{ 
              display: 'block', 
              width: '100%', 
              padding: '16px', 
              fontSize: '1.1rem', 
              textDecoration: 'none',
              marginBottom: '32px'
            }}
          >
            Start Free Trial
          </a>

          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              'Unlimited semantic file search',
              'Automated AI file tagging',
              'Natural language query support',
              'Secure OpenAI processing',
              'Mac and Windows support',
              'Cancel anytime'
            ].map((feature, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b066ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Pricing;
