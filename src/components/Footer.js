import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      textAlign: 'center',
      padding: '18px 0 10px 0',
      color: '#fff',
      fontSize: '1.1rem',
      letterSpacing: '0.5px',
      marginTop: '40px',
      userSelect: 'none',
      zIndex: 2,
      position: 'relative',
      background: 'rgba(30, 41, 59, 0.05)',
      borderTop: '2px solid #ef4444',
      boxShadow: '0 -2px 16px 0 rgba(0,0,0,0.05)',
      fontWeight: 600,
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      borderRadius: '0 0 18px 18px',
      borderLeft: '1px solid rgba(255,255,255,0.08)',
      borderRight: '1px solid rgba(255,255,255,0.08)'
    }}>
      <span role="img" aria-label="laptop">💻</span> <a
        href="https://sudheeshspai.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#ef4444',
          textDecoration: 'none',
          fontWeight: 600
        }}
      >
        Developed by sudheeshspai (hashpai)
      </a> with React and <span role="img" aria-label="coffee">☕</span>
    </footer>
  );
}
