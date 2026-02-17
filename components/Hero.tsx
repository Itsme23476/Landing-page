import React from 'react';
import { motion } from 'framer-motion';
import { Monitor } from 'lucide-react';
import { Button } from './Button';

// Floating gradient blob
const FloatingBlob: React.FC<{
  className: string;
  duration: number;
  delay?: number;
}> = ({ className, duration, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full pointer-events-none ${className}`}
    animate={{
      y: [0, -50, 0, 50, 0],
      x: [0, 30, 0, -30, 0],
      scale: [1, 1.2, 1, 0.8, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Animated ring
const AnimatedRing: React.FC<{
  size: number;
  top: string;
  left: string;
  duration: number;
  delay?: number;
}> = ({ size, top, left, duration, delay = 0 }) => (
  <motion.div
    className="absolute border border-lumina-500/20 rounded-full pointer-events-none"
    style={{ width: size, height: size, top, left }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.2, 0.4, 0.2],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Rising particle
const RisingParticle: React.FC<{ index: number }> = ({ index }) => {
  const positions = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95];
  const left = `${positions[index % positions.length]}%`;
  const duration = 8 + (index % 5) * 2;
  const delay = index * 0.8;
  const size = 3 + (index % 3);

  return (
    <motion.div
      className="absolute rounded-full bg-lumina-400 pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        bottom: '-10px',
      }}
      animate={{
        y: [0, -800],
        opacity: [0, 0.8, 0.8, 0],
        scale: [0.5, 1, 1, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Glowing orb that pulses
const PulsingOrb: React.FC<{
  size: number;
  top: string;
  left: string;
  color: string;
  duration: number;
}> = ({ size, top, left, color, duration }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      top,
      left,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Main gradient blobs */}
        <FloatingBlob 
          className="w-[500px] h-[500px] bg-lumina-600/20 blur-[100px] top-[-100px] left-[-100px]"
          duration={20}
        />
        <FloatingBlob 
          className="w-[400px] h-[400px] bg-purple-600/15 blur-[80px] top-[100px] right-[-50px]"
          duration={25}
          delay={2}
        />
        <FloatingBlob 
          className="w-[300px] h-[300px] bg-indigo-600/15 blur-[60px] bottom-[50px] left-[20%]"
          duration={18}
          delay={4}
        />

        {/* Pulsing orbs */}
        <PulsingOrb 
          size={200} 
          top="20%" 
          left="10%" 
          color="rgba(124, 77, 255, 0.3)" 
          duration={4} 
        />
        <PulsingOrb 
          size={150} 
          top="60%" 
          left="80%" 
          color="rgba(139, 92, 246, 0.25)" 
          duration={5} 
        />
        <PulsingOrb 
          size={100} 
          top="40%" 
          left="60%" 
          color="rgba(167, 139, 250, 0.2)" 
          duration={6} 
        />

        {/* Animated rings */}
        <AnimatedRing size={200} top="10%" left="5%" duration={15} />
        <AnimatedRing size={150} top="60%" left="85%" duration={20} delay={3} />
        <AnimatedRing size={100} top="70%" left="15%" duration={12} delay={5} />

        {/* Rising particles */}
        {[...Array(15)].map((_, i) => (
          <RisingParticle key={i} index={i} />
        ))}

        {/* Gradient line accents */}
        <motion.div
          className="absolute top-[30%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-lumina-500/40 to-transparent"
          animate={{
            opacity: [0, 0.5, 0],
            scaleX: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[70%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
          animate={{
            opacity: [0, 0.4, 0],
            scaleX: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124, 77, 255, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 77, 255, 1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030014]/50" />
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
            href="https://github.com/Itsme23476/App-interface/releases/download/V.3.3/Lumina-Setup-v3.3.exe"
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
