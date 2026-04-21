import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "1",
      title: "Install filect",
      description: "Download the lightweight client for Windows."
    },
    {
      number: "2",
      title: "Index Folders",
      description: "Select the directories you want to make searchable."
    },
    {
      number: "3",
      title: "Just Type",
      description: 'Describe what you need: "Invoice from March" or "React project".'
    },
    {
      number: "4",
      title: "Instant Access",
      description: "Press Enter to open the file immediately."
    }
  ];

  return (
    <section id="how-it-works" style={{ paddingTop: '120px', paddingBottom: '300px', position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '80px', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
          How it works
        </h2>
      </motion.div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Background connecting line */}
        <div 
          style={{
            position: 'absolute',
            top: '24px', // Aligns with the vertical center of the 48px circle
            left: '12.5%',
            width: '75%',
            height: '1px',
            background: 'linear-gradient(90deg, rgba(109, 40, 217, 0.1) 0%, rgba(178, 139, 255, 0.3) 50%, rgba(109, 40, 217, 0.1) 100%)',
            zIndex: 0
          }}
        />

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1
        }}>
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: 1,
                padding: '0 12px'
              }}
            >
              <div 
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  borderRadius: '50%',
                  background: 'var(--bg-dark)',
                  border: '1px solid rgba(178, 139, 255, 0.4)',
                  boxShadow: '0 0 15px rgba(178, 139, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  marginBottom: '24px',
                  color: 'var(--text-primary)'
                }}
              >
                {step.number}
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px' }}>
                {step.title}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
