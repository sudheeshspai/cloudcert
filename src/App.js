import { useState, useEffect } from 'react';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Navbar from './components/Navbar';
import SplashCursor from './components/spalshcursor'; 

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

  if (!user) {
    return (
      <>
        <Navbar />
        {hasAccount ? (
          <Login setUser={setUser} toggle={() => setHasAccount(false)} />
        ) : (
          <Signup setUser={setUser} toggle={() => setHasAccount(true)} />
        )}
         <SplashCursor />
      </>
    );
  }


  return (
    <>
      <Navbar onLogout={() => setUser(null)} />
      <Dashboard user={user} />
       <SplashCursor />
    </>
  );
}

export default App;