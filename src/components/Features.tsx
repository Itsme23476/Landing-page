import React from 'react';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
  const cards = [
    {
      title: "Auto-Organize",
      description: "Filect sorts your files into the right folders for you, automatically. No dragging, no naming, no guessing.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"></path>
        </svg>
      )
    },
    {
      title: "AI Analysis",
      description: "Advanced AI models read your documents to understand what's inside, so everything ends up where it belongs.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          <path d="M2 12h20"/>
          <path d="M17 19h.01"/>
          <path d="M6 5h.01"/>
        </svg> // Fallback custom spark / AI style
      )
    },
    {
      title: "Lightning Fast",
      description: "Built on a high-performance Rust backend for instant results as you type.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      )
    },
    {
      title: "Privacy First",
      description: "Filect processes your files securely through OpenAI. Nothing is stored or shared, and only you can see your data.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    },
    {
      title: "Broad Compatibility",
      description: "Indexes PDFs, Docs, Code, Images, and more across your entire drive.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M2 15h10"></path>
          <path d="M9 18l3-3-3-3"></path>
        </svg>
      )
    },
    {
      title: "Natural Language",
      description: "Don't remember the exact filename? Just describe what's inside and Filect finds it. It understands context.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    }
  ];

  return (
    <section id="features" style={{ padding: '100px 0' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '80px', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.02em' }}>
          Designed for flow.
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Traditional file explorers are broken. Filect fixes them by organizing your files for you, and letting you find anything the way you think.
        </p>
      </motion.div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gridAutoRows: 'minmax(220px, auto)',
        gap: '24px' 
      }}>
        {cards.map((card, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-panel" 
            style={{ 
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <div style={{ width: '40px', height: '40px', background: 'rgba(178, 139, 255, 0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              {card.icon}
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>{card.title}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;

