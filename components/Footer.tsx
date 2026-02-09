import React from 'react';
import { Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-[#02000d]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-lumina-600 rounded-md"></div>
          <span className="text-lg font-bold text-white">Lumina</span>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-500 items-center">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a 
            href="#/reset-password" 
            className="text-gray-700 hover:text-lumina-500 transition-colors"
            title="Reset Password"
            aria-label="Reset Password"
          >
            <Lock size={14} />
          </a>
        </div>
        
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} Lumina. All rights reserved.
        </div>
      </div>
    </footer>
  );
};