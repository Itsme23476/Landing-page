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
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(147, 51, 234, 0.06) 0%, transparent 70%)',
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
          maxWidth: '720px',
          margin: '0 auto',
          padding: '48px 48px 44px',
          borderRadius: '20px',
          border: '1px solid rgba(147, 51, 234, 0.12)',
          background: 'linear-gradient(145deg, rgba(20, 16, 36, 0.8) 0%, rgba(10, 10, 16, 0.9) 100%)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Top row: badge + heading */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
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
              padding: '5px 14px',
              borderRadius: '100px',
              background: 'rgba(147, 51, 234, 0.1)',
              border: '1px solid rgba(147, 51, 234, 0.18)',
            }}
          >
            <span style={{ fontSize: '13px' }}>🎁</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#c084fc',
                letterSpacing: '0.03em',
              }}
            >
              Exclusive Offer
            </span>
          </motion.div>

          {/* Heading */}
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            Get 20% Off Filect Pro
          </h3>
        </div>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            color: 'rgba(200, 190, 220, 0.65)',
            marginBottom: '32px',
            lineHeight: 1.6,
            maxWidth: '480px',
            margin: '0 auto 32px',
          }}
        >
          Drop your email and we'll send you a 20% discount code, plus monthly tips on file organization and productivity.
        </p>

        {/* Form / Success */}
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                padding: '24px 32px',
                borderRadius: '12px',
                background: 'rgba(52, 211, 153, 0.06)',
                border: '1px solid rgba(52, 211, 153, 0.15)',
                maxWidth: '440px',
                margin: '0 auto',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>✓</div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
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
                  fontSize: '0.88rem',
                  color: 'rgba(52, 211, 153, 0.65)',
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
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'stretch',
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                style={{
                  flex: '1 1 auto',
                  minWidth: 0,
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  background: 'rgba(0, 0, 0, 0.35)',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  fontFamily: "'Inter', sans-serif",
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.45)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(147, 51, 234, 0.06)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '14px 32px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  fontSize: '0.92rem',
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

        {/* Error */}
        <AnimatePresence>
          {status === 'error' && message && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: '14px',
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

        {/* Footer */}
        {status !== 'success' && (
          <p
            style={{
              marginTop: '18px',
              fontSize: '0.73rem',
              color: 'rgba(148, 163, 184, 0.35)',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.01em',
            }}
          >
            No spam, ever. Unsubscribe with one click.
          </p>
        )}
      </motion.div>

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
