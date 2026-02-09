import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppWindow } from './AppWindow';

const TABS = [
  { id: 'search', label: 'Search' },
  { id: 'index', label: 'Index Files' },
  { id: 'settings', label: 'Settings' },
];

export const ProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex bg-white/5 rounded-full p-1 mb-8"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-lumina-600 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>

        <AppWindow>
          <div className="bg-[#fcfcfc] w-full aspect-[16/10] relative overflow-hidden flex">
             {/* Sidebar Imitation */}
             <div className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col p-6">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-5 h-5 bg-lumina-500 rounded-md"></div>
                    <span className="font-bold text-gray-900">Lumina</span>
                </div>
                <div className="space-y-2">
                    <div className={`p-2 rounded-lg text-sm font-medium flex items-center gap-3 ${activeTab === 'search' ? 'bg-lumina-50 text-lumina-600 border-l-4 border-lumina-600' : 'text-gray-500'}`}>Search</div>
                    <div className={`p-2 rounded-lg text-sm font-medium flex items-center gap-3 ${activeTab === 'index' ? 'bg-lumina-50 text-lumina-600 border-l-4 border-lumina-600' : 'text-gray-500'}`}>Index Files</div>
                    <div className={`p-2 rounded-lg text-sm font-medium flex items-center gap-3 ${activeTab === 'settings' ? 'bg-lumina-50 text-lumina-600 border-l-4 border-lumina-600' : 'text-gray-500'}`}>Settings</div>
                </div>
                <div className="mt-auto">
                    <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                        <div className="w-8 h-8 bg-lumina-200 rounded-full flex items-center justify-center text-lumina-700 font-bold text-xs">DA</div>
                        <div className="text-xs">
                            <div className="font-semibold text-gray-900">User</div>
                            <div className="text-lumina-600">Pro Plan</div>
                        </div>
                    </div>
                </div>
             </div>

             {/* Main Content Area - Switching Images/Placeholders */}
             <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-center bg-white relative">
                <AnimatePresence mode='wait'>
                    {activeTab === 'search' && (
                        <motion.div 
                            key="search"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full flex flex-col items-center justify-center text-center"
                        >
                             <h2 className="text-3xl font-bold text-gray-900 mb-2">What are you looking for?</h2>
                             <p className="text-gray-500 mb-8">Search across your entire local drive instantly.</p>
                             
                             <div className="w-full max-w-xl bg-white border border-gray-200 shadow-xl rounded-2xl p-2 flex items-center gap-4">
                                <input 
                                    type="text" 
                                    disabled 
                                    placeholder="Search files, folders, or describe what you need..." 
                                    className="flex-1 bg-transparent border-none outline-none text-gray-700 pl-4 h-12"
                                />
                                <div className="flex items-center gap-2 pr-2">
                                    <span className="text-xs font-bold text-lumina-600 flex items-center gap-1">✦ AI</span>
                                    <button className="w-10 h-10 bg-lumina-600 rounded-xl text-white flex items-center justify-center">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                    </button>
                                </div>
                             </div>
                        </motion.div>
                    )}

                    {activeTab === 'index' && (
                        <motion.div 
                            key="index"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full flex items-center justify-center"
                        >
                             <div className="w-full h-full border-2 border-dashed border-lumina-200 rounded-3xl bg-lumina-50/30 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-amber-400 rounded-xl mb-6 shadow-sm flex items-center justify-center">
                                    <svg className="text-amber-100" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
                                </div>
                                <h3 className="text-xl font-semibold text-lumina-600 mb-2">Add folder to index</h3>
                                <p className="text-gray-400 text-sm">Drag and drop folders here, or click to browse</p>
                             </div>
                        </motion.div>
                    )}

                    {activeTab === 'settings' && (
                         <motion.div 
                            key="settings"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full overflow-hidden flex flex-col items-start text-left"
                        >
                            <h3 className="text-sm font-medium text-lumina-600 mb-4">AI Providers</h3>
                            <div className="w-full p-6 border border-gray-100 rounded-xl bg-white shadow-sm mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-700 font-medium">Provider</span>
                                    <span className="text-gray-900 font-semibold bg-gray-100 px-3 py-1 rounded text-sm">OpenAI (Recommended)</span>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center gap-3">
                                    <span className="text-gray-400 text-sm font-mono">sk-proj-...8x9s</span>
                                </div>
                            </div>
                            
                            <h3 className="text-sm font-medium text-lumina-600 mb-4">Search Enhancements</h3>
                            <div className="flex gap-4">
                                <div className="px-4 py-2 border border-lumina-200 bg-lumina-50 text-lumina-700 rounded-lg text-sm font-medium">Smart Rerank: OFF</div>
                                <div className="px-4 py-2 border border-lumina-200 bg-lumina-50 text-lumina-700 rounded-lg text-sm font-medium">Spell Check: ON</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>
          </div>
        </AppWindow>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-gray-500 font-medium"
        >
          {activeTab === 'search' && "Search files naturally, just like asking a friend."}
          {activeTab === 'index' && "Lumina intelligently indexes your files to understand what they contain."}
          {activeTab === 'settings' && "Customize your AI models and search preferences."}
        </motion.div>
      </div>
    </section>
  );
};