import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const Header: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setLoggedIn(!!data.session));
  }, []);

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
        <img 
          src="/logo.png" 
          alt="Filect" 
          style={{ 
            width: '30px', 
            height: '30px', 
            borderRadius: '7px',
          }} 
        />
        <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Filect</span>
      </a>

      <nav style={{ display: 'flex', gap: '32px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
        <a href="/#features" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Features</a>
        <a href="/#how-it-works" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>How it works</a>
        <a href="/blog" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Blog</a>
        <a href="/pricing.html" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Pricing</a>
        <a href="/#download" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Download</a>
        <a href="/contact" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Contact</a>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {loggedIn ? (
          <a href="/account" className="button-primary" style={{ padding: '8px 20px', borderRadius: '6px', fontSize: '0.9rem', textDecoration: 'none', display: 'inline-block' }}>Account</a>
        ) : (
          <>
            <a href="/signup?mode=login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>Log in</a>
            <a href="/signup" className="button-primary" style={{ padding: '8px 20px', borderRadius: '6px', fontSize: '0.9rem', textDecoration: 'none', display: 'inline-block' }}>Get Started</a>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
