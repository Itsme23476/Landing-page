import React from 'react';
import { motion } from 'framer-motion';

interface AppWindowProps {
  children: React.ReactNode;
  title?: string;
}

export const AppWindow: React.FC<AppWindowProps> = ({ children, title = "Lumina - File Search Assistant" }) => {
  return (
    <motion.div 
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="rounded-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(124,58,237,0.15)] border border-white/10 bg-[#0f0f12] w-full max-w-5xl mx-auto"
    >
      {/* Title Bar */}
      <div className="h-10 bg-[#1a1a1f] flex items-center px-4 justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
        <div className="text-xs text-gray-500 font-medium">{title}</div>
        <div className="w-14"></div> {/* Spacer for centering */}
      </div>
      
      {/* Content Area */}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};