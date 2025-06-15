import { useState } from 'react';
import { supabase } from '../supabaseclient';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login({ setUser, toggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      setUser(data.user);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%',
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
            }}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              paddingRight: '40px',
              width: '100%',
              maxWidth: '500px'
            }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-40%)',
              cursor: 'pointer',
              color: '#ccc',
              fontSize: '0.9rem'
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account?{' '}
          <span onClick={toggle} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}
