import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';

const ARTICLES = [
  {
    id: 'how-to-organize-desktop-files-automatically',
    title: 'How to Organize Files on Your Desktop Automatically',
    excerpt: 'Tired of manually sorting files into folders? Learn how to automatically organize your desktop files using AI. A practical guide to ending file clutter for good on Windows and Mac.',
    date: 'May 6, 2026',
    readTime: '9 min read',
    category: 'Productivity',
  },
  {
    id: 'best-way-to-clean-up-messy-desktop',
    title: 'Best Way to Clean Up a Messy Desktop (2026 Guide)',
    excerpt: 'Your desktop is a mess again. Here\'s how to clean it up in 20 minutes and keep it clean permanently using a simple system backed by AI-powered file search.',
    date: 'May 6, 2026',
    readTime: '8 min read',
    category: 'Guides',
  },
  {
    id: 'how-to-organize-files-with-ai',
    title: 'How to Organize Files with AI in 2026 (Complete Guide)',
    excerpt: 'AI file organization can reduce search time from minutes to under three seconds without sorting a single folder. Here\'s exactly how it works, what file types it handles, and how to switch today.',
    date: 'Oct 24, 2026',
    readTime: '8 min read',
    category: 'Productivity',
  },
  {
    id: 'why-traditional-file-search-is-broken',
    title: 'Why File Search on Windows and Mac Is Broken',
    excerpt: 'Windows Search and macOS Spotlight haven\'t fundamentally changed in 20 years. Here\'s a technical breakdown of why they fail, what a good file search tool must do, and which alternative actually works.',
    date: 'Oct 18, 2026',
    readTime: '7 min read',
    category: 'Product',
  },
  {
    id: 'future-of-local-ai',
    title: 'Local AI on Your Desktop: What It Is, Why It Matters, and What\'s Coming Next',
    excerpt: 'Local AI running on your device, no cloud, is finally practical in 2026. Here\'s why it matters for privacy, what hardware you need, and which use cases it already beats cloud AI for.',
    date: 'Oct 10, 2026',
    readTime: '8 min read',
    category: 'Engineering',
  }
];

const BlogIndex: React.FC = () => {
  return (
    <div className="app-container" style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background ambient glows */}
      <div className="glow-bg" style={{ top: '-10%', left: '-10%', width: '800px', height: '800px' }}></div>
      <div className="glow-bg" style={{ top: '20%', right: '-20%', width: '1000px', height: '1000px', background: 'radial-gradient(circle, rgba(178, 139, 255, 0.1) 0%, rgba(5, 5, 8, 0) 60%)' }}></div>
      <div className="glow-bg" style={{ bottom: '10%', left: '10%', background: 'radial-gradient(circle, rgba(109, 40, 217, 0.1) 0%, rgba(5, 5, 8, 0) 60%)' }}></div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        <main style={{ flex: 1, padding: '80px 0' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: '60px', textAlign: 'center' }}
          >
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 800, 
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '20px'
            }}>
              Filect <span className="text-gradient">Articles</span>
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Insights, guides, and thoughts on the future of file management and local AI.
            </p>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
            gap: '32px' 
          }}>
            {ARTICLES.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a
                  href={`/blog/${article.id}/`}
                  style={{
                    display: 'block',
                    padding: '32px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    textDecoration: 'none',
                    color: 'inherit',
                    height: '100%',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'rgba(176,102,255,0.4)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(176,102,255,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ 
                    display: 'inline-block', 
                    padding: '6px 12px', 
                    background: 'rgba(176,102,255,0.1)', 
                    color: '#b066ff', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem', 
                    fontWeight: 600,
                    marginBottom: '20px'
                  }}>
                    {article.category}
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 700, 
                    marginBottom: '16px',
                    lineHeight: 1.3
                  }}>
                    {article.title}
                  </h3>
                  
                  <p style={{ 
                    color: 'var(--text-secondary)', 
                    lineHeight: 1.6, 
                    marginBottom: '24px',
                    fontSize: '0.95rem'
                  }}>
                    {article.excerpt}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingTop: '20px',
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem'
                  }}>
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </main>

        <footer style={{ marginTop: 'auto', borderTop: '1px solid var(--border-light)', padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p>&copy; {new Date().getFullYear()} Filect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default BlogIndex;
