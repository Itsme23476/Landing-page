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
          Dictate and organize<br />
          <span className="text-gradient">anything.</span>
        </h1>

        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '500px'
        }}>
          Hold a key and talk. Your words type into any app, your files surface by voice, and your folders organize themselves. And when you are not talking, it is still the AI search that finds any file you describe.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'nowrap' }}>
          <motion.a
            href="https://github.com/Itsme23476/App-interface/releases/download/v12.2.20/Filect-Setup-v12.2.20.exe"
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
            href="https://github.com/Itsme23476/Mac-version/releases/download/v14.5.2/Filect-14.5.2-mac.dmg"
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

          {/* Static voice pill resting in the empty lower area of the mockup */}
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: '24%', left: '27%', transform: 'translateX(-50%)',
            zIndex: 20, display: 'inline-flex', alignItems: 'center', gap: '14px',
            padding: '18px 30px', borderRadius: '999px', whiteSpace: 'nowrap',
            background: 'rgba(10,10,16,0.96)', border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 24px 70px rgba(124,77,255,0.5)',
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c89bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {[0.4, 0.7, 0.5, 0.9, 0.55, 1, 0.5, 0.8, 0.45, 0.95, 0.6, 0.75, 0.5, 0.85, 0.45, 0.7, 0.5].map((h, i) => (
                <span key={i} style={{
                  display: 'block', width: '5px',
                  height: `${Math.round(12 + h * 38)}px`, borderRadius: '5px',
                  background: 'linear-gradient(180deg,#c89bff,#7c3aed)',
                }} />
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default Hero;
