import { useState } from 'react';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Navbar from './components/Navbar';
import Cubes from './components/cubes';
import Footer from './components/Footer';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [hasAccount, setHasAccount] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Replace this with your actual upload logic
      alert(`Uploading: ${selectedFile.name}`);
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <>
      {/* Cubes as full-website animated background */}
      <div
        style={{
          position: 'fixed',
          zIndex: 0,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        <Cubes
          gridSize={13}
          maxAngle={60}
          radius={5}
          borderStyle="2px dashed rgb(8, 24, 255)"
          faceColor="#1a1a2e"
          rippleColor="#ff6b6b"
          rippleSpeed={1.5}
          autoAnimate={true}
          rippleOnClick={true}
        />
      </div>

      {/* Main app content always above the background */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Navbar user={user} onLogout={() => setUser(null)} />
        {!user ? (
          hasAccount ? (
            <Login setUser={setUser} toggle={() => setHasAccount(false)} />
          ) : (
            <Signup setUser={setUser} toggle={() => setHasAccount(true)} />
          )
        ) : (
          <Dashboard user={user} setUser={setUser} />
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;