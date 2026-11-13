import React from 'react';
import { motion } from 'framer-motion';

const iconProps = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'var(--purple-light)', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const Features: React.FC = () => {
  // First row = the three jobs (each with a real spoken example). Second row = how you use it.
  const cards = [
    {
      title: "Find and organize your files",
      description: "Describe a file by what is inside it and Filect finds it, even when you forgot the name. Tell it to tidy a folder and it sorts everything into place for you.",
      example: "“Find the contract I signed last week”",
      icon: (
        <svg {...iconProps}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      title: "Run AI agents by voice",
      description: "Put Claude Code or Codex to work. They build websites, write and edit files, run commands and research the web, and you can watch every step live.",
      example: "“Build me a landing page for the new feature”",
      icon: (
        <svg {...iconProps}>
          <rect x="2" y="4" width="20" height="16" rx="2"></rect>
          <polyline points="6 10 9 12.5 6 15"></polyline>
          <line x1="12" y1="15" x2="17" y2="15"></line>
        </svg>
      )
    },
    {
      title: "Work across your apps",
      description: "Agents act inside the apps you connect, like Gmail, Calendar, Notion, Google Drive and Zapier. Email, schedule and update your docs just by saying so.",
      example: "“Reply to the sponsor and shorten the second paragraph”",
      icon: (
        <svg {...iconProps}>
          <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
          <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
          <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
          <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
        </svg>
      )
    },
    {
      title: "Dictate anywhere",
      description: "Hold a key and talk. Your words type into any app, with punctuation added and filler words cleaned up as you go.",
      icon: (
        <svg {...iconProps}>
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      )
    },
    {
      title: "Hands-free Assistant",
      description: "Click Start and just talk, no keys needed. It ignores conversations that are not meant for it, can look at your screen, and can answer out loud in a natural voice.",
      icon: (
        <svg {...iconProps}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    {
      title: "You stay in control",
      description: "Choose Ask first to approve every action, or Full access to let it run. Only your speech is sent, never the silence, and your files are never stored or shared.",
      icon: (
        <svg {...iconProps}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    }
  ];

  const perks = [
    "No per-task fees",
    "Several tasks at once",
    "Auto-switches between Claude and Codex",
    "One-click agent setup",
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
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.02em' }}>
          Say it. Filect does the work.
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Not another chatbot. Filect takes action on your computer: it finds your files, runs AI agents, and works across your apps, all from your voice. On Windows and Mac.
        </p>
      </motion.div>

      <div className="features-grid">
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
            {card.example && (
              <p style={{ marginTop: 'auto', paddingTop: '18px', color: 'var(--purple-light)', fontSize: '0.92rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                {card.example}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '40px' }}>
        {perks.map((perk) => (
          <span key={perk} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 16px', borderRadius: '999px', background: 'rgba(176,102,255,0.07)', border: '1px solid rgba(176,102,255,0.22)', color: '#e2e8f0', fontSize: '0.88rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B28BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
            {perk}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Features;
