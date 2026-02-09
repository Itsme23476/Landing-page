import React from 'react';
import { motion } from 'framer-motion';

export const HowItWorks: React.FC = () => {
  const steps = [
    { num: '01', title: 'Install Lumina', desc: 'Download the lightweight client for Windows.' },
    { num: '02', title: 'Index Folders', desc: 'Select the directories you want to make searchable.' },
    { num: '03', title: 'Just Type', desc: 'Describe what you need: "Invoice from March" or "React project".' },
    { num: '04', title: 'Instant Access', desc: 'Press Enter to open the file immediately.' },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 border-t border-white/5 bg-[#030014] scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-16 text-center">How it works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lumina-500/30 to-transparent"></div>

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative pt-8 md:text-center"
            >
              <div className="md:mx-auto w-10 h-10 rounded-full bg-[#030014] border border-lumina-500 text-lumina-400 flex items-center justify-center font-bold text-sm mb-6 relative z-10 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                {idx + 1}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};