import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '24px 0',
      position: 'relative',
      zIndex: 10
    }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
        <div style={{ 
          width: '24px', 
          height: '24px', 
          background: 'linear-gradient(135deg, var(--purple-light), var(--purple-dark))',
          borderRadius: '6px',
          boxShadow: '0 0 15px rgba(178, 139, 255, 0.5)'
        }}></div>
        <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Filect</span>
      </a>

      <nav style={{ display: 'flex', gap: '32px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
        <a href="/#features" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Features</a>
        <a href="/#how-it-works" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>How it works</a>
        <a href="/blog" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Blog</a>
        <a href="/#pricing" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Pricing</a>
        <a href="/#download" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Download</a>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <a href="#download" className="button-primary" style={{ padding: '8px 20px', borderRadius: '6px', fontSize: '0.9rem', textDecoration: 'none', display: 'inline-block' }}>Get Started</a>
      </div>
    </header>
  );
};

export default Header;
