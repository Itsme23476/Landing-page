import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Lock, Mail, ArrowRight, CheckCircle, KeyRound, Loader2, AlertCircle, ChevronLeft } from 'lucide-react';

// Initialize Supabase client
const SUPABASE_URL = 'https://gsvccxhdgcshiwgjvgfi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdmNjeGhkZ2NzaGl3Z2p2Z2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczOTY2NTIsImV4cCI6MjA4Mjk3MjY1Mn0.Sbb6YJjlQ_ig2LCcs9zz_Be1kU-iIHBx4Vu4nzCPyTM';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type ViewState = 'loading' | 'request_link' | 'reset_password' | 'success_link_sent' | 'success_password_reset';

export const ResetPassword: React.FC = () => {
  const [view, setView] = useState<ViewState>('loading');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // Check if we have an active session (user clicked email link)
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setView('reset_password');
      } else {
        // No session means user clicked the lock icon directly -> show email form
        setView('request_link');
      }
    } catch (e) {
      setView('request_link');
    }
  };

  const handleRequestLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/#/reset-password',
      });
      if (error) throw error;
      setView('success_link_sent');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setView('success_password_reset');
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  if (view === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030014]">
        <Loader2 className="animate-spin text-lumina-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#030014] font-sans relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-lumina-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-[440px] bg-[#0f0f12]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/50 relative z-10 transition-all duration-500">
        {/* Back Button */}
        <a href="/" className="absolute top-6 left-6 text-gray-500 hover:text-white transition-colors">
          <ChevronLeft size={24} />
        </a>

        {/* VIEW: Request Link (Forgot Password) */}
        {view === 'request_link' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-14 h-14 bg-lumina-500/10 rounded-2xl flex items-center justify-center mb-6 border border-lumina-500/20 mx-auto">
              <KeyRound size={24} className="text-lumina-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-center text-white mb-2">Forgot Password?</h1>
            <p className="text-gray-400 text-center mb-8 text-sm">Enter your email and we'll send you a link to reset your password.</p>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleRequestLink} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-lumina-500 focus:ring-1 focus:ring-lumina-500 transition-all"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-lumina-600 hover:bg-lumina-500 text-white rounded-xl font-semibold shadow-lg shadow-lumina-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Send Reset Link <ArrowRight size={18} /></>}
              </button>
            </form>
          </div>
        )}

        {/* VIEW: Success Link Sent */}
        {view === 'success_link_sent' && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 mx-auto border border-green-500/20">
              <Mail size={32} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Check your inbox</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              We've sent a password reset link to <br/> <span className="text-white font-medium">{email}</span>
            </p>
            <button 
              onClick={() => setView('request_link')}
              className="text-lumina-400 hover:text-lumina-300 text-sm font-medium transition-colors"
            >
              Try different email
            </button>
          </div>
        )}

        {/* VIEW: Reset Password (Enter New) */}
        {view === 'reset_password' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-14 h-14 bg-lumina-500/10 rounded-2xl flex items-center justify-center mb-6 border border-lumina-500/20 mx-auto">
              <Lock size={24} className="text-lumina-400" />
            </div>

            <h1 className="text-2xl font-bold text-center text-white mb-2">Set New Password</h1>
            <p className="text-gray-400 text-center mb-8 text-sm">Please create a secure password.</p>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">New Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-lumina-500 focus:ring-1 focus:ring-lumina-500 transition-all"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-lumina-500 focus:ring-1 focus:ring-lumina-500 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-lumina-600 hover:bg-lumina-500 text-white rounded-xl font-semibold shadow-lg shadow-lumina-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Update Password'}
              </button>
            </form>
          </div>
        )}

        {/* VIEW: Success Password Reset */}
        {view === 'success_password_reset' && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 mx-auto border border-green-500/20">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Password Updated</h2>
            <p className="text-gray-400 text-sm mb-8">
              Your password has been successfully changed.<br/>
              You can now log in to the application.
            </p>
            <a 
              href="/"
              className="block w-full py-3.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-semibold transition-all"
            >
              Back to Home
            </a>
          </div>
        )}
      </div>
    </div>
  );
};