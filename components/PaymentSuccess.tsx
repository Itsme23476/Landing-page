import React, { useEffect, useState } from 'react';

export const PaymentSuccess: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    window.location.href = '/';
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
      position: 'relative',
      overflow: 'hidden',
    }}>
      
      {/* Animated background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(124, 77, 255, 0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
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
                backgroundColor: ['#7C4DFF', '#4ADE80', '#FBBF24', '#F472B6', '#60A5FA'][Math.floor(Math.random() * 5)],
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
        backgroundColor: 'rgba(15, 15, 26, 0.95)',
        border: '1px solid rgba(124, 77, 255, 0.25)',
        borderRadius: '20px',
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

        {/* Title */}
        <h1 style={{
          color: '#FFFFFF',
          fontSize: '32px',
          fontWeight: 700,
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}>
          Payment Successful!
        </h1>

        {/* Subtitle */}
        <h2 style={{
          color: '#4ADE80',
          fontSize: '18px',
          fontWeight: 500,
          marginBottom: '20px',
        }}>
          Thank you for your purchase
        </h2>

        {/* Message */}
        <p style={{
          color: '#9CA3AF',
          fontSize: '15px',
          lineHeight: '1.7',
          marginBottom: '32px',
        }}>
          Your payment has been processed successfully. 
          You now have full access to all premium features of Lumina.
        </p>

        {/* Order confirmation box */}
        <div style={{
          backgroundColor: 'rgba(124, 77, 255, 0.08)',
          border: '1px solid rgba(124, 77, 255, 0.2)',
          borderRadius: '14px',
          padding: '24px',
          marginBottom: '28px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}>
            <span style={{ color: '#4ADE80', fontSize: '20px' }}>✓</span>
            <span style={{ color: '#D1D5DB', fontSize: '15px', fontWeight: 500 }}>Payment confirmed</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}>
            <span style={{ color: '#4ADE80', fontSize: '20px' }}>✓</span>
            <span style={{ color: '#D1D5DB', fontSize: '15px', fontWeight: 500 }}>Premium access activated</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}>
            <span style={{ color: '#4ADE80', fontSize: '20px' }}>✓</span>
            <span style={{ color: '#D1D5DB', fontSize: '15px', fontWeight: 500 }}>Receipt sent to your email</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleGoHome}
          style={{
            width: '100%',
            padding: '16px 24px',
            background: 'linear-gradient(135deg, #7C4DFF 0%, #6C3FEF 100%)',
            border: 'none',
            borderRadius: '12px',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 20px rgba(124, 77, 255, 0.35)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(124, 77, 255, 0.45)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(124, 77, 255, 0.35)';
          }}
        >
          Go to Home
        </button>

        {/* Footer text */}
        <p style={{
          color: '#6B7280',
          fontSize: '13px',
          marginTop: '20px',
        }}>
          Questions? Contact us at <span style={{ color: '#A78BFA' }}>support@lumina.ai</span>
        </p>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
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
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
