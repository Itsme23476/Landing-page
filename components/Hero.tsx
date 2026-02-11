import React from 'react';
import { motion } from 'framer-motion';
import { Monitor } from 'lucide-react';
import { Button } from './Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-lumina-900/20 blur-[120px] rounded-full -z-10 opacity-60"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-lumina-600/10 blur-[100px] rounded-full -z-10"></div>

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
            href="https://github.com/Itsme23476/App-interface/releases/download/V.2.4/Lumina-Setup-v2.4.exe"
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