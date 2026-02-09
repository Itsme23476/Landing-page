import React, { useState, useEffect, useRef } from 'react';
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
  const routeLocked = useRef(false); // Prevent route changes after initial detection

  useEffect(() => {
    // Check current path and hash on mount
    const checkRoute = () => {
      // If route is already locked, don't change it
      if (routeLocked.current) return;

      const path = window.location.pathname;
      const hash = window.location.hash;
      
      // Route to reset password page
      if (path === '/reset-password' || hash.includes('reset-password') || hash.includes('type=recovery')) {
        routeLocked.current = true;
        setRoute('reset-password');
      }
      // Route to signup success page
      else if (path === '/signup-success' || path === '/confirm-signup' || hash.includes('signup-success') || hash.includes('type=signup')) {
        routeLocked.current = true;
        setRoute('signup-success');
      }
      // Default to home
      else {
        setRoute('home');
      }
    };

    // Initial check - capture the URL before Supabase processes it
    checkRoute();

    // Listen for Supabase specific Auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      console.log('Auth event:', event);
      
      if (event === 'PASSWORD_RECOVERY') {
        routeLocked.current = true;
        setRoute('reset-password');
      } else if (event === 'SIGNED_IN') {
        // If we detected signup earlier, keep showing that page
        // This handles the case where the hash gets cleared after processing
      }
    });

    return () => {
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
