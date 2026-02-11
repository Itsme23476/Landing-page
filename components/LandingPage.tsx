import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { ProductPreview } from './ProductPreview';
import { Features } from './Features';
import { HowItWorks } from './HowItWorks';
import { Future } from './Future';
import { Footer } from './Footer';
import { Button } from './Button';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030014] text-white overflow-x-hidden selection:bg-lumina-500/30 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <ProductPreview />
        <Features />
        <HowItWorks />
        <Future />

        {/* Final CTA Section */}
        <section id="download" className="py-32 px-6 text-center relative overflow-hidden scroll-mt-28">
          <div className="absolute inset-0 bg-lumina-900/20 blur-[100px] -z-10"></div>
          
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              Stop searching. <br />
              <span className="text-lumina-400">Start finding.</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="primary" 
                icon={<Download size={20} />}
                href="https://github.com/Itsme23476/App-interface/releases/download/V.2.4/Lumina-Setup-v2.4.exe"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download for Windows
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};