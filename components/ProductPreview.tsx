import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppWindow } from './AppWindow';
import { Search, Sparkles, FolderOpen } from 'lucide-react';

const TABS = [
  { id: 'search', label: 'Search', icon: Search },
  { id: 'organize', label: 'Organize', icon: Sparkles },
  { id: 'index', label: 'Index Files', icon: FolderOpen },
];

const DESCRIPTIONS = {
  search: "Search files naturally with AI-powered understanding.",
  organize: "Describe how you want files organized — AI does the rest.",
  index: "Index your folders so Lumina understands what's inside.",
};

export const ProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          {/* Tab Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-1.5 gap-1"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id 
                      ? 'bg-lumina-600 text-white shadow-lg shadow-lumina-600/25' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Screenshot Display */}
        <AppWindow>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 w-full aspect-[16/10] relative overflow-hidden">
            <AnimatePresence mode='wait'>
              {activeTab === 'search' && (
                <motion.div 
                  key="search"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <img 
                    src="/app-search.png"
                    alt="Lumina Search Interface"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
              )}

              {activeTab === 'organize' && (
                <motion.div 
                  key="organize"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <img 
                    src="/app-organize.png"
                    alt="Lumina AI Organize Feature"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
              )}

              {activeTab === 'index' && (
                <motion.div 
                  key="index"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <img 
                    src="/app-index.png"
                    alt="Lumina Index Files"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AppWindow>

        {/* Description */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <AnimatePresence mode='wait'>
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="text-gray-400 font-medium text-lg"
            >
              {DESCRIPTIONS[activeTab as keyof typeof DESCRIPTIONS]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
