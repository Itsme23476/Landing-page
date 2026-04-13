import React from 'react';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
  const cards = [
    {
      title: "Natural Language",
      description: "Don't remember the filename? Just describe what's inside. Lumina understands context.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      title: "AI Analysis",
      description: "Advanced AI models analyze your documents to understand content, semantics, and intent.",
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
      title: "Keyboard First",
      description: "Summon Lumina with a simple shortcut. Navigate entirely without your mouse.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
          <path d="M6 8h.01"></path>
          <path d="M10 8h.01"></path>
          <path d="M14 8h.01"></path>
          <path d="M18 8h.01"></path>
          <path d="M8 12h.01"></path>
          <path d="M12 12h.01"></path>
          <path d="M16 12h.01"></path>
          <path d="M7 16h10"></path>
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
      title: "Minimal UI",
      description: "A distraction-free interface designed to get you to your file and out of the way.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--purple-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
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
          Traditional file explorers are broken. Lumina fixes them by letting you search the way you think.
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

