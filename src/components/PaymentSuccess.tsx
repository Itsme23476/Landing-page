import { useEffect, useState } from 'react';

export default function PaymentSuccess() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    window.location.href = 'filect://open';
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      
      {/* Animated background glow */}
      <div className="glow-bg" style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(124, 77, 255, 0.15) 0%, transparent 70%)',
        animation: 'pulse 3s ease-in-out infinite',
      }} />

      {/* Confetti particles */}
      {showConfetti && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: '-20px',
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: ['#b28bff', '#4ADE80', '#FBBF24', '#F472B6', '#60A5FA'][Math.floor(Math.random() * 5)],
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                animation: `confetti-fall ${Math.random() * 2 + 2}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      <div style={{
        width: '100%',
        maxWidth: '460px',
        backgroundColor: 'rgba(15, 15, 26, 0.4)',
        border: '1px solid var(--border-light)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '48px 36px',
        boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(124, 77, 255, 0.1)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        
        {/* Success Icon with animated ring */}
        <div style={{
          position: 'relative',
          width: '100px',
          height: '100px',
          margin: '0 auto 28px',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid rgba(74, 222, 128, 0.3)',
            animation: 'ring-pulse 2s ease-out infinite',
          }} />
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(34, 197, 94, 0.12)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(34, 197, 94, 0.3)',
          }}>
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#4ADE80" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ animation: 'check-draw 0.5s ease-out 0.3s both' }}
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>

        <h1 style={{
          color: '#FFFFFF',
          fontSize: '32px',
          fontWeight: 700,
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}>
          Payment Successful!
        </h1>

        <h2 style={{
          color: '#4ADE80',
          fontSize: '18px',
          fontWeight: 500,
          marginBottom: '20px',
        }}>
          Thank you for your purchase
        </h2>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '15px',
          lineHeight: '1.7',
          marginBottom: '28px',
        }}>
          Your 10-day free trial has started. Download Filect (if you haven't already),
          then <strong style={{ color: '#fff' }}>log in with the email you used</strong> — your
          subscription is already linked to your account.
        </p>

        {/* Step 1: Download */}
        <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginBottom: '12px', textAlign: 'left' }}>1. Download the app</p>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <a href="https://github.com/Itsme23476/Mac-version/releases/latest" style={{
            flex: 1, padding: '13px', borderRadius: '10px', textDecoration: 'none', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(178,139,255,0.9), rgba(109,40,217,0.9))',
            color: '#fff', fontSize: '14px', fontWeight: 600, boxShadow: '0 4px 15px rgba(124,77,255,0.3)',
          }}>Download for Mac</a>
          <a href="https://github.com/Itsme23476/App-interface/releases/latest" style={{
            flex: 1, padding: '13px', borderRadius: '10px', textDecoration: 'none', textAlign: 'center',
            background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '14px', fontWeight: 600,
            border: '1px solid rgba(176,102,255,0.4)',
          }}>Download for Windows</a>
        </div>

        {/* Step 2: open / log in */}
        <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginBottom: '10px', textAlign: 'left' }}>2. Already have the app?</p>
        <button
          onClick={handleClose}
          style={{
            width: '100%', padding: '13px 24px',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(178,139,255,0.45)',
            borderRadius: '10px', color: '#b28bff', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
          }}
        >
          Open Filect & log in
        </button>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '13px',
          marginTop: '18px',
          lineHeight: '1.6',
        }}>
          ✓ Trial started &nbsp;·&nbsp; ✓ Subscription linked &nbsp;·&nbsp; ✓ Receipt emailed
        </p>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '13px',
          marginTop: '12px',
        }}>
          Questions? Contact us at <span style={{ color: 'var(--primary)' }}>support@filect.io</span>
        </p>
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes check-draw {
          from { stroke-dasharray: 30; stroke-dashoffset: 30; }
          to { stroke-dasharray: 30; stroke-dashoffset: 0; }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
