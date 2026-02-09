import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { LandingPage } from './components/LandingPage';
import { SecretResetPassword } from './components/SecretResetPassword';

// Initialize Supabase to listen for recovery events
const SUPABASE_URL = 'https://gsvccxhdgcshiwgjvgfi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdmNjeGhkZ2NzaGl3Z2p2Z2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczOTY2NTIsImV4cCI6MjA4Mjk3MjY1Mn0.Sbb6YJjlQ_ig2LCcs9zz_Be1kU-iIHBx4Vu4nzCPyTM';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const App: React.FC = () => {
  const [route, setRoute] = useState<'home' | 'reset-password'>('home');

  useEffect(() => {
    // Check current path and hash on mount and changes
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      
      // Route to reset page when accessing /reset-password OR /#/reset-password OR Supabase recovery link
      if (path === '/reset-password' || hash.includes('reset-password') || hash.includes('type=recovery')) {
        setRoute('reset-password');
      } else {
        setRoute('home');
      }
    };

    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);
    checkRoute(); // Initial check

    // Listen for Supabase specific Auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setRoute('reset-password');
      }
    });

    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
      subscription.unsubscribe();
    };
  }, []);

  if (route === 'reset-password') {
    return <SecretResetPassword />;
  }

  return <LandingPage />;
};

export default App;