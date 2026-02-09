import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const SUPABASE_URL = 'https://gsvccxhdgcshiwgjvgfi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdmNjeGhkZ2NzaGl3Z2p2Z2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczOTY2NTIsImV4cCI6MjA4Mjk3MjY1Mn0.Sbb6YJjlQ_ig2LCcs9zz_Be1kU-iIHBx4Vu4nzCPyTM';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

type PageState = 'loading' | 'invalid' | 'form' | 'success';

export const SecretResetPassword: React.FC = () => {
  const [pageState, setPageState] = useState<PageState>('loading');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  useEffect(() => {
    let mounted = true;

    // Listen for auth state changes - this catches when Supabase processes the URL tokens
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event, 'Session:', !!session);
      
      if (!mounted) return;

      if (event === 'PASSWORD_RECOVERY') {
        // Supabase detected recovery tokens - show form
        setPageState('form');
      } else if (event === 'SIGNED_IN' && session) {
        // Session established from recovery link
        setPageState('form');
      } else if (event === 'TOKEN_REFRESHED' && session) {
        setPageState('form');
      }
    });

    // Also check session after giving Supabase time to process URL hash
    const checkSession = async () => {
      // Give Supabase SDK time to process the URL hash tokens
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (!mounted) return;

      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setPageState('form');
        return;
      }

      // Check if URL has tokens but session failed to establish
      const hash = window.location.hash;
      if (hash.includes('access_token') || hash.includes('type=recovery')) {
        // Tokens exist - wait a bit more and retry
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (!mounted) return;

        const { data: { session: retrySession } } = await supabase.auth.getSession();
        if (retrySession) {
          setPageState('form');
        } else {
          // Still no session - tokens may have expired
          setPageState('invalid');
        }
      } else {
        // No tokens in URL
        setPageState('invalid');
      }
    };

    checkSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const showMessage = (text: string, type: 'error' | 'success') => {
    setMessage({ text, type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validate password length
    if (password.length < 6) {
      showMessage('Password must be at least 6 characters', 'error');
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      showMessage('Passwords do not match', 'error');
      return;
    }

    setLoading(true);

    try {
      // Send the new password to Supabase
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      // Success - show success message
      setPageState('success');
    } catch (error: any) {
      console.error('Error:', error);
      showMessage(error.message || 'Failed to update password. The link may have expired.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    window.close();
    // Fallback if window.close() doesn't work
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'linear-gradient(135deg, #0F0F1A 0%, #1a1a2e 50%, #16213e 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'rgba(15, 15, 26, 0.9)',
        border: '1px solid rgba(124, 77, 255, 0.2)',
        borderRadius: '16px',
        padding: '40px 32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}>
        
        {/* Loading State */}
        {pageState === 'loading' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(124, 77, 255, 0.2)',
              borderTopColor: '#7C4DFF',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }} />
            <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Verifying your reset link...</p>
          </div>
        )}

        {/* Invalid/Expired Link State */}
        {pageState === 'invalid' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
            }}>⚠️</div>
            <h1 style={{
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: 600,
              marginBottom: '12px',
            }}>Invalid or Expired Link</h1>
            <p style={{
              color: '#9CA3AF',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '24px',
            }}>
              This password reset link is invalid or has expired. Please request a new one from the app.
            </p>
            <button
              onClick={handleClose}
              style={{
                width: '100%',
                padding: '14px 24px',
                backgroundColor: 'rgba(124, 77, 255, 0.1)',
                border: '1px solid rgba(124, 77, 255, 0.3)',
                borderRadius: '10px',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(124, 77, 255, 0.2)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(124, 77, 255, 0.1)'}
            >
              Close This Page
            </button>
          </div>
        )}

        {/* Password Form State */}
        {pageState === 'form' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px',
              }}>🔐</div>
              <h1 style={{
                color: '#FFFFFF',
                fontSize: '24px',
                fontWeight: 600,
                marginBottom: '8px',
              }}>Create New Password</h1>
              <p style={{
                color: '#9CA3AF',
                fontSize: '14px',
              }}>Enter your new password below</p>
            </div>

            {/* Message Display */}
            {message && (
              <div style={{
                backgroundColor: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                border: `1px solid ${message.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
                borderRadius: '10px',
                padding: '14px 16px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}>
                <span style={{ fontSize: '16px' }}>{message.type === 'error' ? '⚠️' : '✓'}</span>
                <span style={{ 
                  color: message.type === 'error' ? '#F87171' : '#4ADE80', 
                  fontSize: '14px' 
                }}>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: '#9CA3AF',
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px',
                }}>
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(124, 77, 255, 0.5)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                />
              </div>

              <div style={{ marginBottom: '28px' }}>
                <label style={{
                  display: 'block',
                  color: '#9CA3AF',
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px',
                }}>
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(124, 77, 255, 0.5)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                />
              </div>

              <button
                id="submitBtn"
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  background: loading ? 'rgba(124, 77, 255, 0.5)' : 'linear-gradient(135deg, #7C4DFF 0%, #6C3FEF 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 15px rgba(124, 77, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-1px)')}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderTopColor: '#FFFFFF',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }} />
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          </div>
        )}

        {/* Success State */}
        {pageState === 'success' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '72px',
              height: '72px',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}>
              <span style={{ fontSize: '36px' }}>✓</span>
            </div>
            <h2 style={{
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: 600,
              marginBottom: '12px',
            }}>Password Updated!</h2>
            <p style={{
              color: '#9CA3AF',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '28px',
            }}>
              Your password has been successfully changed.<br />
              You can now sign in with your new password.
            </p>
            <button
              onClick={handleClose}
              style={{
                width: '100%',
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #7C4DFF 0%, #6C3FEF 100%)',
                border: 'none',
                borderRadius: '10px',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 15px rgba(124, 77, 255, 0.3)',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Close This Page
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        ::placeholder {
          color: #6B7280;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};
