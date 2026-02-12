import React from 'react';
import { motion } from 'framer-motion';
import { Monitor } from 'lucide-react';
import { Button } from './Button';

// Floating orb component
const FloatingOrb: React.FC<{
  size: number;
  color: string;
  initialX: string;
  initialY: string;
  duration: number;
  delay: number;
}> = ({ size, color, initialX, initialY, duration, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: initialX,
      top: initialY,
      background: color,
      filter: 'blur(40px)',
    }}
    animate={{
      y: [0, -30, 0, 30, 0],
      x: [0, 20, 0, -20, 0],
      scale: [1, 1.1, 1, 0.9, 1],
      opacity: [0.3, 0.5, 0.3, 0.5, 0.3],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Subtle grid pattern
const GridPattern: React.FC = () => (
  <div 
    className="absolute inset-0 pointer-events-none opacity-[0.02]"
    style={{
      backgroundImage: `
        linear-gradient(rgba(124, 77, 255, 0.5) 1px, transparent 1px),
        linear-gradient(90deg, rgba(124, 77, 255, 0.5) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
    }}
  />
);

// Animated gradient line
const GlowLine: React.FC<{ top: string; delay: number }> = ({ top, delay }) => (
  <motion.div
    className="absolute left-0 right-0 h-[1px] pointer-events-none"
    style={{ top }}
    initial={{ opacity: 0, scaleX: 0 }}
    animate={{ 
      opacity: [0, 0.3, 0],
      scaleX: [0, 1, 0],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <div className="w-full h-full bg-gradient-to-r from-transparent via-lumina-500/50 to-transparent" />
  </motion.div>
);

// Small floating particles
const Particle: React.FC<{ index: number }> = ({ index }) => {
  const randomX = `${10 + (index * 17) % 80}%`;
  const randomY = `${10 + (index * 23) % 80}%`;
  const randomDuration = 15 + (index % 10);
  const randomDelay = index * 0.5;
  const randomSize = 2 + (index % 3);

  return (
    <motion.div
      className="absolute rounded-full bg-lumina-400 pointer-events-none"
      style={{
        width: randomSize,
        height: randomSize,
        left: randomX,
        top: randomY,
      }}
      animate={{
        y: [0, -100, 0],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-lumina-900/20 blur-[120px] rounded-full opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-lumina-600/10 blur-[100px] rounded-full" />
        
        {/* Grid pattern */}
        <GridPattern />
        
        {/* Floating orbs */}
        <FloatingOrb 
          size={300} 
          color="rgba(124, 77, 255, 0.08)" 
          initialX="10%" 
          initialY="20%" 
          duration={20} 
          delay={0} 
        />
        <FloatingOrb 
          size={200} 
          color="rgba(139, 92, 246, 0.06)" 
          initialX="70%" 
          initialY="10%" 
          duration={25} 
          delay={2} 
        />
        <FloatingOrb 
          size={150} 
          color="rgba(167, 139, 250, 0.05)" 
          initialX="80%" 
          initialY="60%" 
          duration={18} 
          delay={4} 
        />
        <FloatingOrb 
          size={180} 
          color="rgba(124, 77, 255, 0.04)" 
          initialX="5%" 
          initialY="70%" 
          duration={22} 
          delay={1} 
        />

        {/* Animated glow lines */}
        <GlowLine top="30%" delay={0} />
        <GlowLine top="70%" delay={2} />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <Particle key={i} index={i} />
        ))}

        {/* Corner accents */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-lumina-500/10 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 border border-lumina-500/10 rounded-full"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lumina-500/30 bg-lumina-500/10 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lumina-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lumina-500"></span>
          </span>
          <span className="text-xs font-medium text-lumina-200 tracking-wide uppercase">Latest Release</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
        >
          Find any file. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumina-300 to-lumina-500">
            Instantly.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Search your entire computer using natural language. <br className="hidden md:block" />
          No folders. No guessing. Just results.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            icon={<Monitor size={18} />} 
            variant="primary"
            href="https://github.com/Itsme23476/App-interface/releases/download/V.3.2/Lumina-Setup-v3.2.exe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download for Windows
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
