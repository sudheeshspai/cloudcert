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
    <div className="container">
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>

        {/* Email */}
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Password */}
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={iconStyle}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password */}
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={inputStyle}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={iconStyle}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Sign Up Button */}
        <button onClick={handleSignup}>Sign Up</button>

        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          Already have an account?{' '}
          <span
            onClick={toggle}
            style={{ cursor: 'pointer', textDecoration: 'underline', className: 'testhover' }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

// Styles
const inputStyle = {
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
