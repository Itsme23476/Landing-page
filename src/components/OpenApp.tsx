import { useEffect, useState } from 'react';

const DEEP_LINK = 'filect://subscribe';

export default function OpenApp() {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Try to open the app immediately
    window.location.href = DEEP_LINK;
    // If the app didn't take over within a couple seconds, reveal the fallback
    const timer = setTimeout(() => setShowFallback(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const openApp = () => {
    window.location.href = DEEP_LINK;
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>

      <div className="glow-bg" style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(124, 77, 255, 0.15) 0%, transparent 70%)',
        animation: 'pulse 3s ease-in-out infinite',
      }} />

      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'rgba(15, 15, 26, 0.4)',
        border: '1px solid var(--border-light)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '40px 32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>

        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: 'rgba(124, 77, 255, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          border: '1px solid rgba(124, 77, 255, 0.2)',
        }}>
          <span style={{ fontSize: '40px' }}>🚀</span>
        </div>

        <h1 style={{
          color: '#FFFFFF',
          fontSize: '28px',
          fontWeight: 700,
          marginBottom: '12px',
        }}>
          Opening Filect…
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '15px',
          lineHeight: '1.7',
          marginBottom: '32px',
        }}>
          We're launching the Filect app so you can finish setting up your subscription.
          If it doesn't open automatically, use the button below.
        </p>

        <button
          onClick={openApp}
          style={{
            width: '100%',
            padding: '14px 24px',
            background: 'linear-gradient(135deg, rgba(178, 139, 255, 0.8) 0%, rgba(109, 40, 217, 0.8) 100%)',
            border: '1px solid rgba(178, 139, 255, 0.3)',
            borderRadius: '10px',
            color: '#FFFFFF',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 15px rgba(124, 77, 255, 0.3)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 77, 255, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(124, 77, 255, 0.3)';
          }}
        >
          Open Filect
        </button>

        {showFallback && (
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '13px',
            marginTop: '20px',
            lineHeight: '1.6',
          }}>
            Don't have the app yet?{' '}
            <a href="https://filect.io" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
              Download Filect
            </a>
          </p>
        )}
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
