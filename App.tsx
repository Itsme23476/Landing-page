import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { LandingPage } from './components/LandingPage';
import { SecretResetPassword } from './components/SecretResetPassword';
import { SignUpSuccess } from './components/SignUpSuccess';

// Initialize Supabase to listen for recovery events
const SUPABASE_URL = 'https://gsvccxhdgcshiwgjvgfi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdmNjeGhkZ2NzaGl3Z2p2Z2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczOTY2NTIsImV4cCI6MjA4Mjk3MjY1Mn0.Sbb6YJjlQ_ig2LCcs9zz_Be1kU-iIHBx4Vu4nzCPyTM';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type Route = 'home' | 'reset-password' | 'signup-success';

const App: React.FC = () => {
  const [route, setRoute] = useState<Route>('home');

  useEffect(() => {
    // Check current path and hash on mount and changes
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      
      // Route to reset password page
      if (path === '/reset-password' || hash.includes('reset-password') || hash.includes('type=recovery')) {
        setRoute('reset-password');
      }
      // Route to signup success page
      else if (path === '/signup-success' || path === '/confirm-signup' || hash.includes('signup-success') || hash.includes('type=signup')) {
        setRoute('signup-success');
      }
      // Default to home
      else {
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
      } else if (event === 'SIGNED_IN') {
        // Check if this is from email confirmation
        const hash = window.location.hash;
        if (hash.includes('type=signup')) {
          setRoute('signup-success');
        }
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

  if (route === 'signup-success') {
    return <SignUpSuccess />;
  }

  return <LandingPage />;
};

export default App;
