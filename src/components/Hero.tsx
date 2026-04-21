import React from 'react';
import { motion } from 'framer-motion';
import DashboardMockup from './DashboardMockup';

const Hero: React.FC = () => {
  return (
    <section style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gap: '60px', 
      alignItems: 'center', 
      padding: '80px 0',
      minHeight: '80vh'
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
            V1 NOW AVAILABLE
          </span>
        </div>
        
        <h1 className="sr-only">AI-Powered File Search & Organization</h1>
        <div style={{ 
          fontSize: '4.5rem', 
          fontWeight: 800, 
          lineHeight: 1.1,
          letterSpacing: '-0.03em'
        }} role="heading" aria-level={2}>
          Find any file.<br />
          <span className="text-gradient">Instantly.</span>
        </div>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '480px'
        }}>
          The smartest AI file manager. Search your entire computer using natural language to find and organize files with AI. No folders. No guessing. Just results.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'nowrap' }}>
          <motion.a
            href="https://github.com/Itsme23476/App-interface/releases/download/V.10/Filect.exe"
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
            href="https://github.com/Itsme23476/Mac-version/releases/download/V.11/Filect-11-mac.dmg"
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
      </motion.div>
    </section>
  );
};

export default Hero;
