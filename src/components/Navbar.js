import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const location = useLocation();

  // Don't show Navbar on login or signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }
  return (
    <nav style={{
      width: '96%',
      maxWidth: '980px',
      margin: '18px auto 0 auto',
      background: 'rgba(18,36,77,0.85)',
      borderRadius: '18px',
      padding: '14px 36px',
      backdropFilter: 'blur(12px) saturate(140%)',
      WebkitBackdropFilter: 'blur(12px) saturate(140%)',
      boxShadow: '0 6px 32px rgba(0,0,0,0.22)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#eaf1fb',
      fontWeight: '600',
      fontSize: '1.08rem',
      border: '2px solid #2563eb',
      position: 'sticky',
      top: '10px',
      zIndex: 1000
    }}>
      {/* Logo and Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }}>
        <img
          src="./favicon.ico"
          alt="Certhex Logo"
          style={{
            height: '38px',
            width: '38px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(56,189,248,0.13)'
          }}
        />
        <span style={{
          fontSize: '1.7rem',
          fontWeight: 'bold',
          letterSpacing: '2px',
          color: '#38bdf8',
          textShadow: '0 2px 8px #12244d44'
        }}>
          CLOUDCERTS
        </span>
      </div>

      {/* Logout Button */}
      {user && onLogout && (
        <button
          onClick={onLogout}
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)',
            color: '#fff',
            border: 'none',
            marginTop: '5px',
            height: '48px',
            width: 'auto',
            padding: '0 28px',
            borderRadius: '24px',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '1rem',
            boxShadow: '0 4px 16px rgba(56,189,248,0.13)',
            transition: 'all 0.2s ease-in-out',
            letterSpacing: '1px',
            outline: 'none',
          }}
          onMouseOver={e => e.target.style.transform = 'scale(1.07)'}
          onMouseOut={e => e.target.style.transform = 'scale(1)'}
        >
          Logout
        </button>
      )}
    </nav>
  );
}
