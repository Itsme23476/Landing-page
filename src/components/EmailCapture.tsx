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
        setMessage('You\'re in! We\'ll keep you posted.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Connection error. Please try again.');
    }

    // Reset status after 4 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 4000);
  };

  return (
    <section
      style={{
        position: 'relative',
        maxWidth: '680px',
        margin: '0 auto',
        padding: '60px 24px 0',
        textAlign: 'center',
      }}
    >
      {/* Heading */}
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '8px',
          letterSpacing: '-0.01em',
        }}
      >
        Stay in the Loop
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.95rem',
          color: 'rgba(200, 180, 255, 0.6)',
          marginBottom: '24px',
          lineHeight: 1.6,
        }}
      >
        Get product updates, tips, and early access to new features.
      </motion.p>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading'}
          style={{
            flex: '1 1 260px',
            maxWidth: '360px',
            padding: '14px 18px',
            borderRadius: '8px',
            border: '1px solid rgba(176, 102, 255, 0.25)',
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            fontSize: '0.95rem',
            fontFamily: "'Inter', sans-serif",
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(176, 102, 255, 0.6)';
            e.currentTarget.style.boxShadow = '0 0 16px rgba(176, 102, 255, 0.15)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(176, 102, 255, 0.25)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />

        <motion.button
          type="submit"
          disabled={status === 'loading'}
          whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(176, 102, 255, 0.5)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '14px 32px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 50%, #6d28d9 100%)',
            color: '#ffffff',
            fontSize: '0.95rem',
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            cursor: status === 'loading' ? 'wait' : 'pointer',
            letterSpacing: '0.01em',
            boxShadow: '0 0 20px rgba(176, 102, 255, 0.3)',
            transition: 'all 0.2s ease',
            opacity: status === 'loading' ? 0.7 : 1,
            whiteSpace: 'nowrap',
          }}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </motion.button>
      </motion.form>

      {/* Status message */}
      <AnimatePresence>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: '16px',
              fontSize: '0.85rem',
              fontFamily: "'Inter', sans-serif",
              color: status === 'success' ? '#34d399' : '#f87171',
              fontWeight: 500,
            }}
          >
            {status === 'success' ? '✓ ' : ''}{message}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Privacy note */}
      <p
        style={{
          marginTop: '14px',
          fontSize: '0.75rem',
          color: 'rgba(148, 163, 184, 0.5)',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        No spam. Unsubscribe anytime.
      </p>
    </section>
  );
};

export default EmailCapture;
