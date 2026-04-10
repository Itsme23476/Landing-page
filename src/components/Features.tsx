import React from 'react';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
  return (
    <section id="features" style={{ padding: '100px 0' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '60px' }}
      >
        <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Designed for flow.
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.6 }}>
          Traditional file explorers are broken. Lumina fixes them by letting you search the way you think.
        </p>
      </motion.div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gridTemplateRows: 'auto auto',
        gap: '24px' 
      }}>
        {/* Large Card 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel" 
          style={{ gridColumn: 'span 2', padding: '40px', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}
        >
          <div style={{ marginBottom: '32px' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(178, 139, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px' }}>Natural Language</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '80%' }}>
              Ask questions as if you were talking to an assistant. "Show me the photos from my trip to Japan last summer."
            </p>
          </div>
          <div style={{ flex: 1, marginTop: 'auto', opacity: 0.5 }}>
            {/* Mock Code Block background */}
            <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.8, transform: 'perspective(500px) rotateX(20deg)', transformOrigin: 'bottom', maskImage: 'linear-gradient(to top, black, transparent)' }}>
              &gt; SELECT * FROM files WHERE type='image' AND location='Japan'<br />
              &gt; Analyzing context: 'last summer' -&gt; DateRange(2022-06-01, 2022-08-31)<br />
              &gt; Executing semantic search across 2.3M documents...<br />
              &gt; Found 342 matching items in 0.04s.
            </div>
          </div>
        </motion.div>

        {/* Large Card 2 */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-panel" 
          style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ width: '48px', height: '48px', background: 'rgba(178, 139, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '12px' }}>AI Analysis</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Every file is indexed and understood, not just tagged. We read the content, so you don't have to.
          </p>
          
          <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
            <div className="badge">LUX FORM</div>
            <div className="badge">LOGO ASST</div>
          </div>
        </motion.div>

        {/* Small Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel" 
          style={{ padding: '32px' }}
        >
          <div style={{ width: '40px', height: '40px', background: 'rgba(178, 139, 255, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Lightning Fast</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Optimized C++ core that delivers results in milliseconds, regardless of library size.
          </p>
        </motion.div>

        {/* Small Card 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-panel" 
          style={{ padding: '32px' }}
        >
          <div style={{ width: '40px', height: '40px', background: 'rgba(178, 139, 255, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
              <path d="M6 8h.01"></path>
              <path d="M10 8h.01"></path>
              <path d="M14 8h.01"></path>
              <path d="M18 8h.01"></path>
              <path d="M8 12h.01"></path>
              <path d="M12 12h.01"></path>
              <path d="M16 12h.01"></path>
              <path d="M7 16h10"></path>
            </svg>
          </div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Keyboard First</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Never move your mouse. Use shortcuts for everything from searching to file management.
          </p>
        </motion.div>

        {/* Small Card 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-panel" 
          style={{ padding: '32px' }}
        >
          <div style={{ width: '40px', height: '40px', background: 'rgba(178, 139, 255, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>Broad Compatibility</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Support for over 500 file types including CAD, code snippets, and raw imagery.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
