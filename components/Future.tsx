import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const Future: React.FC = () => {
  return (
    <section className="py-20 px-6 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-lumina-900/40 to-black border border-lumina-500/20 p-8 md:p-12 max-w-4xl w-full text-center"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-lumina-500/10 to-transparent opacity-50"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 p-3 bg-lumina-500/10 rounded-full">
            <Sparkles className="text-lumina-400" size={20} />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">More coming soon.</h3>
          <p className="text-gray-400">
            We're building automatic AI file organization. <br />
            Let Lumina tidy up your desktop while you focus on creating.
          </p>
        </div>
      </motion.div>
    </section>
  );
};