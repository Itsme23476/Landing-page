import React from 'react';
import { motion } from 'framer-motion';
import DashboardMockup from './DashboardMockup';
import { trackDownload } from '../utils/ads';
import ProductHuntBadge from './ProductHuntBadge';

const Hero: React.FC = () => {
  return (
    <section style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gap: '60px',
      alignItems: 'center',
      padding: '96px 0 104px'
    }}>
      {/* Left: Text content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
      >
        <div>
          <span className="badge">
            <span style={{ marginRight: '6px' }}>✨</span>
            NEW · TALK TO FILECT
          </span>
        </div>
        
        <h1 style={{
          margin: 0,
          fontSize: '4.5rem',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em'
        }}>
          Dictate anywhere.<br />
          <span className="text-gradient">Find anything.</span>
        </h1>

        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '500px'
        }}>
          Hold a key and talk. Your words type into any app, your files surface by voice, and your folders organize themselves. And when you are not talking, it is still the AI search that finds any file you describe.
        </p>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { k: 'Dictate', hold: 'Fn' },
            { k: 'Voice search', hold: 'Fn + ⇧' },
            { k: 'Voice organize', hold: 'Fn + ⌥' },
          ].map((c) => (
            <span key={c.k} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 14px', borderRadius: '999px', border: '1px solid rgba(176,102,255,0.35)', background: 'rgba(176,102,255,0.08)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
              <strong style={{ color: '#fff', fontWeight: 600 }}>{c.k}</strong>
              <span style={{ color: 'var(--text-secondary)' }}>hold {c.hold}</span>
            </span>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'nowrap' }}>
          <motion.a
            href="https://github.com/Itsme23476/App-interface/releases/download/v12.2.16/Filect.exe"
            onClick={() => trackDownload('windows')}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(176,102,255,0.6)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #b066ff 0%, #7c3aed 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '16px 32px',
              fontSize: '1rem',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: 'pointer',
              letterSpacing: '0.01em',
              boxShadow: '0 0 24px rgba(176,102,255,0.4)',
              transition: 'box-shadow 0.2s ease',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              textAlign: 'center'
            }}
          >
            Download for Windows
          </motion.a>

          <motion.a
            href="https://github.com/Itsme23476/Mac-version/releases/download/v14.1.18/Filect-14.1.18-mac.dmg"
            onClick={() => trackDownload('mac')}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '16px 32px',
              fontSize: '1rem',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: 'pointer',
              letterSpacing: '0.01em',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              textAlign: 'center'
            }}
          >
            Download for Mac
          </motion.a>
        </div>

        <button
          type="button"
          onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', alignSelf: 'flex-start', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500, fontFamily: 'inherit', transition: 'color 0.2s' }}
          onMouseOver={e => (e.currentTarget.style.color = '#fff')}
          onMouseOut={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(176,102,255,0.18)', border: '1px solid rgba(176,102,255,0.5)' }}>
            <svg width="9" height="11" viewBox="0 0 24 28" fill="#b066ff" aria-hidden="true"><path d="M2 2l20 12L2 26V2z" /></svg>
          </span>
          Watch the 80-second demo
        </button>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
          Free download · 10-day free trial · card required · cancel anytime
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, opacity: 0.85 }}>
          Voice features on Mac. File search and organize on Mac and Windows.
        </p>

        <ProductHuntBadge />
      </motion.div>

      {/* Right: Dashboard UI Mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'relative', width: '100%' }}
      >
        {/* Ambient purple glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%', height: '90%',
          background: 'rgba(176, 102, 255, 0.18)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <DashboardMockup />
        </div>

        {/* Floating voice pill: how dictation looks while you talk (hovers over any app) */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: '14%', left: '34%', transform: 'translateX(-50%)',
            zIndex: 3, display: 'flex', alignItems: 'center', gap: '4px',
            padding: '15px 24px', borderRadius: '999px',
            background: 'rgba(10,10,16,0.94)', border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 16px 50px rgba(124,77,255,0.5), inset 0 0 0 4px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {[0.5, 0.8, 0.4, 1, 0.6, 0.9, 0.5, 1, 0.7, 0.45, 0.85, 0.55].map((h, i) => (
            <span key={i} style={{
              display: 'block', width: '4px',
              height: `${Math.round(10 + h * 22)}px`, borderRadius: '4px',
              background: 'linear-gradient(180deg,#c89bff,#7c3aed)',
              transformOrigin: 'center',
              animation: `filectVoiceBar 1.1s ease-in-out ${(i * 0.08).toFixed(2)}s infinite`,
            }} />
          ))}
          <style>{`@keyframes filectVoiceBar{0%,100%{transform:scaleY(0.3)}50%{transform:scaleY(1)}}`}</style>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
