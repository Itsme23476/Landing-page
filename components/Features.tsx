import React from 'react';
import { motion } from 'framer-motion';
import { Search, HardDrive, Zap, Layout, Sparkles, Keyboard } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "Natural Language",
    description: "Don't remember the filename? Just describe what's inside. Lumina understands context.",
    icon: Search
  },
  {
    title: "AI Analysis",
    description: "Advanced AI models analyze your documents to understand content, semantics, and intent.",
    icon: Sparkles
  },
  {
    title: "Lightning Fast",
    description: "Built on a high-performance Rust backend for instant results as you type.",
    icon: Zap
  },
  {
    title: "Keyboard First",
    description: "Summon Lumina with a simple shortcut. Navigate entirely without your mouse.",
    icon: Keyboard
  },
  {
    title: "Broad Compatibility",
    description: "Indexes PDFs, Docs, Code, Images, and more across your entire drive.",
    icon: HardDrive
  },
  {
    title: "Minimal UI",
    description: "A distraction-free interface designed to get you to your file and out of the way.",
    icon: Layout
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 bg-[#030014] scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Designed for flow.</h2>
          <p className="text-gray-400 text-lg">
            Traditional file explorers are broken. Lumina fixes them by letting you search the way you think.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-lumina-500/30 hover:bg-white/[0.07] transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-lumina-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-lumina-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};