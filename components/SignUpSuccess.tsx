import React from 'react';

export const SignUpSuccess: React.FC = () => {
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
        textAlign: 'center',
      }}>
        
        {/* Celebration Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          border: '1px solid rgba(34, 197, 94, 0.2)',
        }}>
          <span style={{ fontSize: '40px' }}>🎉</span>
        </div>

        {/* Title */}
        <h1 style={{
          color: '#FFFFFF',
          fontSize: '28px',
          fontWeight: 700,
          marginBottom: '12px',
        }}>
          Congratulations!
        </h1>

        {/* Subtitle */}
        <h2 style={{
          color: '#4ADE80',
          fontSize: '18px',
          fontWeight: 500,
          marginBottom: '16px',
        }}>
          Account Successfully Verified
        </h2>

        {/* Message */}
        <p style={{
          color: '#9CA3AF',
          fontSize: '15px',
          lineHeight: '1.7',
          marginBottom: '32px',
        }}>
          Your email has been confirmed and your account is now active. 
          You can close this page and log in to the app with your credentials.
        </p>

        {/* Success checkmarks */}
        <div style={{
          backgroundColor: 'rgba(34, 197, 94, 0.08)',
          border: '1px solid rgba(34, 197, 94, 0.15)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '28px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px',
          }}>
            <span style={{ color: '#4ADE80', fontSize: '18px' }}>✓</span>
            <span style={{ color: '#D1D5DB', fontSize: '14px' }}>Email verified</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px',
          }}>
            <span style={{ color: '#4ADE80', fontSize: '18px' }}>✓</span>
            <span style={{ color: '#D1D5DB', fontSize: '14px' }}>Account activated</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ color: '#4ADE80', fontSize: '18px' }}>✓</span>
            <span style={{ color: '#D1D5DB', fontSize: '14px' }}>Ready to use</span>
          </div>
        </div>

        {/* Close Button */}
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
            marginBottom: '12px',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Close This Page
        </button>

        {/* Secondary text */}
        <p style={{
          color: '#6B7280',
          fontSize: '13px',
          marginTop: '16px',
        }}>
          You can now log in to <span style={{ color: '#A78BFA' }}>File Search Assistant</span>
        </p>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};
