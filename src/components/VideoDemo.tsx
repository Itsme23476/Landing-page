import React, { useState } from 'react';
import { motion } from 'framer-motion';

// "See it in action" demo section. Click-to-play (the <video> only mounts on
// click) so the homepage stays fast and the 14MB file is never fetched until
// the user actually wants it. Poster + branded play button, Hormozi style.
const VideoDemo: React.FC = () => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    const g = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof g === 'function') g('event', 'video_play', { video: 'demo' });
  };

  return (
    <section id="demo" style={{ padding: '100px 24px', position: 'relative', zIndex: 10, scrollMarginTop: '80px' }}>
      <div style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '44px' }}
        >
          <span className="badge" style={{ marginBottom: '20px' }}>Watch the demo</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '20px 0 12px', lineHeight: 1.15 }}>
            See how Filect works <span className="text-gradient">in practice</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
            An 80-second look at how Filect organizes your files and finds anything you describe, so you stop wasting time searching for files and sorting folders by hand.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'relative',
            maxWidth: '1000px',
            margin: '0 auto',
            aspectRatio: '16 / 9',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(176,102,255,0.25)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(176,102,255,0.15)',
            background: '#000',
          }}
        >
          {!playing ? (
            <button
              onClick={handlePlay}
              aria-label="Play the Filect demo video"
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                border: 'none', padding: 0, margin: 0, cursor: 'pointer', background: 'transparent',
              }}
            >
              <img
                src="/filect-demo-poster.jpg"
                alt="Filect organizing files into clean folders"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <span style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,0,0,0.15), rgba(0,0,0,0.45))' }} />
              <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '88px', height: '88px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #b066ff, #7c3aed)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 50px rgba(176,102,255,0.7)',
                  }}
                >
                  <svg width="32" height="36" viewBox="0 0 24 28" fill="#fff" aria-hidden="true" style={{ marginLeft: '5px' }}>
                    <path d="M2 2l20 12L2 26V2z" />
                  </svg>
                </motion.span>
              </span>
              <span style={{
                position: 'absolute', bottom: '22px', left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, rgba(176,102,255,0.95), rgba(109,40,217,0.95))',
                color: '#fff', fontWeight: 600, fontSize: '0.95rem', padding: '8px 18px', borderRadius: '999px',
                whiteSpace: 'nowrap', boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
              }}>
                See how it works
              </span>
            </button>
          ) : (
            <video
              src="/filect-demo.mp4"
              poster="/filect-demo-poster.jpg"
              autoPlay
              controls
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#000' }}
            />
          )}
        </motion.div>

        <div style={{ marginTop: '26px' }}>
          <a
            href="/pricing.html"
            className="button-primary"
            style={{
              display: 'inline-block', padding: '17px 44px', borderRadius: '12px',
              fontSize: '1.1rem', fontWeight: 700, textDecoration: 'none', letterSpacing: '0.01em',
              boxShadow: '0 12px 36px rgba(176,102,255,0.5)',
            }}
          >
            Start your 10-day free trial →
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;
