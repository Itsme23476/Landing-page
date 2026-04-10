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
        transition={{ duration: 0.8 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
      >
        <div>
          <span className="badge">
            <span style={{ marginRight: '6px' }}>✨</span>
            72.4 NOW AVAILABLE
          </span>
        </div>
        
        <h1 style={{ 
          fontSize: '4.5rem', 
          fontWeight: 800, 
          lineHeight: 1.1,
          letterSpacing: '-0.03em'
        }}>
          Find any file.<br />
          <span className="text-gradient">Instantly.</span>
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '480px'
        }}>
          Search your entire computer using natural language. No folders. No guessing. Just results.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
          <button className="button-primary">Download for Windows</button>
          <button className="button-secondary">Download for Mac</button>
        </div>
      </motion.div>

      {/* Right: Dashboard UI Mockup */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
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
