import React from 'react';

// Generic "Featured on Product Hunt" badge — links to our launch. No rank shown,
// matching the official "Featured" badge style (logo + stacked label).
const ProductHuntBadge: React.FC = () => (
  <a
    href="https://www.producthunt.com/products/filect/launches/filect"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Filect — Featured on Product Hunt"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 14px',
      borderRadius: '10px',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(218,85,47,0.55)',
      textDecoration: 'none',
      width: 'fit-content',
    }}
  >
    <svg width="26" height="26" viewBox="0 0 240 240" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="120" cy="120" r="120" fill="#DA552F" />
      <path
        fill="#fff"
        d="M137 120h-37V80h37a20 20 0 0 1 0 40zm0-64H76v128h24v-40h37a44 44 0 0 0 0-88z"
      />
    </svg>
    <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
      <span
        style={{
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
        }}
      >
        Featured on
      </span>
      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Product Hunt</span>
    </span>
  </a>
);

export default ProductHuntBadge;
