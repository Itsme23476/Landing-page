import React from 'react';
import { motion } from 'framer-motion';

/* ─── Light-ray data ────────────────────────────── */
const RAYS = [
  { angle: -155, length: 55, opacity: 0.35, w: 1.2 },
  { angle: -140, length: 45, opacity: 0.25, w: 0.8 },
  { angle: -125, length: 60, opacity: 0.4,  w: 1   },
  { angle: -110, length: 50, opacity: 0.2,  w: 0.7 },
  { angle:  -45, length: 55, opacity: 0.3,  w: 1   },
  { angle:  -30, length: 70, opacity: 0.45, w: 1.5 },
  { angle:  -15, length: 48, opacity: 0.2,  w: 0.8 },
  { angle:   20, length: 65, opacity: 0.35, w: 1   },
  { angle:   35, length: 52, opacity: 0.25, w: 0.9 },
  { angle:  130, length: 60, opacity: 0.4,  w: 1.2 },
  { angle:  145, length: 45, opacity: 0.25, w: 0.8 },
  { angle:  160, length: 55, opacity: 0.3,  w: 1   },
  { angle:  175, length: 48, opacity: 0.2,  w: 0.7 },
  { angle:  -85, length: 58, opacity: 0.28, w: 1   },
  { angle:   95, length: 62, opacity: 0.32, w: 1   },
];

/* ─── Sparkle dots ──────────────────────────────── */
const DOTS = [
  { x: '8%',  y: '30%', r: 3, glow: 14 },
  { x: '18%', y: '68%', r: 2, glow: 10 },
  { x: '78%', y: '20%', r: 3, glow: 14 },
  { x: '88%', y: '62%', r: 2, glow: 10 },
  { x: '55%', y: '12%', r: 1.5, glow: 8 },
  { x: '35%', y: '82%', r: 2, glow: 10 },
];

const CtaSection: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #1a1035 0%, #0d0a1a 55%, #07060f 100%)',
        padding: '120px 24px',
        textAlign: 'center',
      }}
    >
      {/* ── Radial light-ray streaks ── */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 500"
      >
        {RAYS.map((r, i) => {
          const cx = 600, cy = 250;
          const rad = (r.angle * Math.PI) / 180;
          const x2 = cx + Math.cos(rad) * r.length * 10;
          const y2 = cy + Math.sin(rad) * r.length * 10;
          return (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={x2}  y2={y2}
              stroke={`rgba(180,130,255,${r.opacity})`}
              strokeWidth={r.w}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* ── Sparkle dots ── */}
      {DOTS.map((d, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [d.glow > 12 ? 0.6 : 0.4, 1, d.glow > 12 ? 0.6 : 0.4] }}
          transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: d.x,
            top: d.y,
            width: d.r * 2,
            height: d.r * 2,
            borderRadius: '50%',
            background: '#b066ff',
            boxShadow: `0 0 ${d.glow}px #b066ff`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: '0.1em',
            }}
          >
            Start finding,
          </h2>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#b066ff',
              marginBottom: '48px',
            }}
          >
            stop looking.
          </h2>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(176,102,255,0.6)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, #b066ff 0%, #7c3aed 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '16px 44px',
              fontSize: '1rem',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: 'pointer',
              letterSpacing: '0.01em',
              boxShadow: '0 0 24px rgba(176,102,255,0.4)',
              transition: 'box-shadow 0.2s ease',
              marginBottom: '24px',
            }}
          >
            Download Lumina
          </motion.button>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: 'rgba(200,180,255,0.5)',
              textTransform: 'uppercase',
            }}
          >
            Available for Windows 15+ and macOS 12+
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
