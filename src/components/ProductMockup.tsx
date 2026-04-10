import React from 'react';
import { motion } from 'framer-motion';

const ProductMockup: React.FC = () => {
  return (
    <section style={{ 
      padding: '60px 0',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Background Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '50%', background: 'var(--purple-primary)', filter: 'blur(120px)', opacity: 0.15, zIndex: 0 }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="glass-panel product-window-float" 
        style={{ 
          width: '100%', 
          maxWidth: '1000px', 
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(12, 12, 18, 0.6)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        {/* macOS Titlebar */}
        <div style={{ 
          padding: '16px 20px', 
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ED6A5E' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F4BF4F' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#61C554' }}></div>
          
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(255,255,255,0.05)', 
              padding: '6px 16px', 
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Search, Organize, Index Files
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar */}
          <div style={{ 
            width: '240px', 
            borderRight: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(0,0,0,0.2)',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, paddingLeft: '12px', marginBottom: '8px', letterSpacing: '0.05em' }}>LIBRARY</div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: 'var(--text-primary)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              All Files
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Recent
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              Favorites
            </div>
          </div>

          {/* Main Area */}
          <div style={{ flex: 1, padding: '40px', position: 'relative', overflow: 'hidden' }}>
            {/* Laser scan line */}
            <div className="product-scan-line" />
            <div style={{ 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <div style={{ flex: 1, fontSize: '1.2rem', color: '#fff' }}>
                Find my tax returns from 2022 in PDF format...
              </div>
            </div>

            <div style={{ marginTop: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.05em' }}>SEARCH RESULTS</div>
                <div className="badge" style={{ color: 'var(--purple-light)', borderColor: 'rgba(178, 139, 255, 0.3)' }}>99% MATCH</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="result-row-1" style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '16px',
                  padding: '16px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer'
                }}>
                  <div style={{ padding: '12px', background: 'rgba(178, 139, 255, 0.1)', borderRadius: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="file-logo-animate">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>IRS-form-1040-Final.pdf</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>/Documents/Taxes/2022/</div>
                  </div>
                </div>

                <div className="result-row-2" style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '16px',
                  padding: '16px',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}>
                  <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="file-logo-animate-alt">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>Tax_Return_Summary.docx</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>/Downloads/</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProductMockup;
