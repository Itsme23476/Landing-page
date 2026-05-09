import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUPABASE_URL = 'https://gsvccxhdgcshiwgjvgfi.supabase.co';

const EmailCapture: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/subscribe-newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok || data.success) {
        setStatus('success');
        setMessage('Check your inbox for your 20% discount code!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Connection error. Please try again.');
    }

    setTimeout(() => {
      if (status !== 'success') {
        setStatus('idle');
        setMessage('');
      }
    }, 5000);
  };

  return (
    <section
      style={{
        position: 'relative',
        padding: '80px 24px 60px',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Subtle glow behind the card */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(147, 51, 234, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'relative',
          maxWidth: '560px',
          margin: '0 auto',
          padding: '40px 36px 36px',
          borderRadius: '16px',
          border: '1px solid rgba(147, 51, 234, 0.15)',
          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.04) 0%, rgba(15, 15, 20, 0.6) 100%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '100px',
            background: 'rgba(147, 51, 234, 0.12)',
            border: '1px solid rgba(147, 51, 234, 0.2)',
            marginBottom: '20px',
          }}
        >
          <span style={{ fontSize: '14px' }}>🎁</span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 600,
              color: '#c084fc',
              letterSpacing: '0.02em',
            }}
          >
            Exclusive Offer
          </span>
        </motion.div>

        {/* Heading */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.6rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '10px',
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
          }}
        >
          Get 20% Off Filect
        </h3>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.95rem',
            color: 'rgba(200, 190, 220, 0.7)',
            marginBottom: '28px',
            lineHeight: 1.6,
            maxWidth: '400px',
            margin: '0 auto 28px',
          }}
        >
          Subscribe for your discount code + monthly tips on file organization and productivity.
        </p>

        {/* Form */}
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                padding: '20px',
                borderRadius: '10px',
                background: 'rgba(52, 211, 153, 0.08)',
                border: '1px solid rgba(52, 211, 153, 0.2)',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>✓</div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#34d399',
                  marginBottom: '4px',
                }}
              >
                You're in!
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.85rem',
                  color: 'rgba(52, 211, 153, 0.7)',
                }}
              >
                {message}
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'center',
                alignItems: 'stretch',
              }}
            >
              <div style={{ position: 'relative', flex: '1 1 auto', maxWidth: '320px' }}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontFamily: "'Inter', sans-serif",
                    outline: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.5)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '13px 28px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  letterSpacing: '0.01em',
                  transition: 'all 0.15s ease',
                  opacity: status === 'loading' ? 0.7 : 1,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {status === 'loading' ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" fill="none" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </svg>
                    Subscribing
                  </span>
                ) : 'Get 20% Off'}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Error message */}
        <AnimatePresence>
          {status === 'error' && message && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: '12px',
                fontSize: '0.82rem',
                fontFamily: "'Inter', sans-serif",
                color: '#f87171',
                fontWeight: 500,
              }}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Footer text */}
        {status !== 'success' && (
          <p
            style={{
              marginTop: '16px',
              fontSize: '0.72rem',
              color: 'rgba(148, 163, 184, 0.4)',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.01em',
            }}
          >
            No spam, ever. Unsubscribe with one click.
          </p>
        )}
      </motion.div>

      {/* Spinner keyframes */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default EmailCapture;
