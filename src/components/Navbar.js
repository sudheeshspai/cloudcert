import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const location = useLocation();

  // Don't show Navbar on login or signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }
  return (
    <div style={{
      width: '90%',
      maxWidth: '900px',
      margin: '20px auto',
      background: 'rgba(255, 255, 255, 0.08)',
      borderRadius: '50px',
      padding: '12px 24px',
      backdropFilter: 'blur(14px)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#ffffffdd',
      fontWeight: '600',
      fontSize: '1rem',
      position: 'sticky',
      top: '10px',
      zIndex: 1000
    }}>
      {/* Logo */}
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    }}>
        <img
            src="./favicon.ico"
            alt="Certhex Logo"
            style={{
                height: '36px',
                width: '36px',
              
                
            }}
        />
        <span style={{
            fontSize: '1.6rem',
            fontWeight: 'bold',
            letterSpacing: '1.5px',
            color: 'white'
           
        }}>
            CERTHEX
        </span>
    </div>

    {/* Logout Button */}
     {onLogout && (
      <button
        onClick={onLogout}
        style={{
          background: 'linear-gradient(135deg, #ff5e62, #ff9966)',
          color: '#fff',
          border: 'none',
          marginTop: '5px',
          height: '50px',
          width: 'auto',
          padding: '15px',
          borderRadius: '30px',
          fontWeight: '400',
          cursor: 'pointer',
          fontSize: '0.9rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease-in-out'
        }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.06)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        Logout
      </button>
     )}

      {/* User Info */}
    </div>
  );
}
