import { useState } from 'react';
import { supabase } from '../supabaseclient';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Signup({ setUser, toggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert('Signup successful! Check your email to verify.');
      setUser({ email });
    }
  };

  return (
    <div className="container" style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="card" style={{ background: 'rgba(18,36,77,0.85)', border: '2px solid #2563eb', color: '#eaf1fb', backdropFilter: 'blur(8px) saturate(120%)', WebkitBackdropFilter: 'blur(8px) saturate(120%)', boxShadow: '0 2px 12px rgba(0,0,0,0.18)', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#38bdf8', fontWeight: 700, marginBottom: '20px' }}>Sign Up</h2>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ background: '#12244d', color: '#eaf1fb', border: '1.5px solid #2563eb' }}
          />
        </div>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ background: '#12244d', color: '#eaf1fb', border: '1.5px solid #2563eb' }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#38bdf8',
              fontSize: '1.1rem'
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={{ background: '#12244d', color: '#eaf1fb', border: '1.5px solid #2563eb' }}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#38bdf8',
              fontSize: '1.1rem'
            }}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button onClick={handleSignup} style={{ width: '100%', marginTop: 18, background: 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)', color: '#fff', border: 'none' }}>Sign Up</button>
        <p style={{ marginTop: '15px', textAlign: 'center', color: '#7dd3fc' }}>
          Already have an account?{' '}
          <span
            onClick={toggle}
            style={{
              cursor: 'pointer',
              textDecoration: 'underline',
              color: '#38bdf8',
              fontWeight: 500
            }}
            onMouseOver={e => (e.target.style.color = '#ef4444')}
            onMouseOut={e => (e.target.style.color = '#38bdf8')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

// If you want to use these style objects, move them above the component or inside it before the return statement, like this:

const inputStyle = {
  maxWidth: '500px',
  padding: '12px',
  margin: '10px 0',
  borderRadius: '10px',
  background: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  border: 'none',
  outline: 'none',
  fontSize: '1rem',
  paddingRight: '40px'
};

const iconStyle = {
  position: 'absolute',
  right: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  color: 'white',
  fontSize: '1rem'
};
