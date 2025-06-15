import { useState } from 'react';
import { supabase } from '../supabaseclient';
import Navbar from './Navbar';

export default function Dashboard({ user, setUser }) {
  const [certs, setCerts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
const [newCertName, setNewCertName] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file first.");

    setUploading(true);
    const fileName = `${Date.now()}_${selectedFile.name}`;

    const { error } = await supabase.storage
      .from('certificate')
      .upload(fileName, selectedFile);

    if (error) {
      alert('Upload failed: ' + error.message);
    } else {
      const { data: publicUrl } = supabase.storage
        .from('certificate')
        .getPublicUrl(fileName);

      setCerts([...certs, {
        name: selectedFile.name,
        path: fileName,
        url: publicUrl.publicUrl,
        type: selectedFile.type
      }]);
      setSelectedFile(null);
      alert("✅ Upload successful!");
    }
    setUploading(false);
  };
  const handleRename = async (oldPath) => {
  if (!newCertName) return alert("Enter a new name first.");

  const fileExt = oldPath.split('.').pop(); // preserve extension
  const newPath = `${Date.now()}_${newCertName}.${fileExt}`;

  const { data, error: downloadError } = await supabase
    .storage
    .from('certificate')
    .download(oldPath);

  if (downloadError) {
    return alert("Download failed: " + downloadError.message);
  }

  const { error: uploadError } = await supabase
    .storage
    .from('certificate')
    .upload(newPath, data);

  if (uploadError) {
    return alert("Rename (upload new) failed: " + uploadError.message);
  }

  const { error: deleteError } = await supabase
    .storage
    .from('certificate')
    .remove([oldPath]);

  if (deleteError) {
    return alert("Rename (delete old) failed: " + deleteError.message);
  }

  const { data: publicUrl } = supabase
    .storage
    .from('certificate')
    .getPublicUrl(newPath);

  setCerts(certs.map(cert =>
    cert.path === oldPath
      ? { ...cert, name: newCertName + '.' + fileExt, path: newPath, url: publicUrl.publicUrl }
      : cert
  ));

  setRenamingId(null);
  setNewCertName('');
  alert("✅ Certificate renamed!");
};


  const handleDelete = async (certPath) => {
    const confirm = window.confirm("Are you sure you want to delete this certificate?");
    if (!confirm) return;

    const { error } = await supabase.storage
      .from('certificate')
      .remove([certPath]);

    if (error) {
      alert('❌ Delete failed: ' + error.message);
    } else {
      setCerts(certs.filter(cert => cert.path !== certPath));
      alert('🗑️ Certificate deleted successfully!');
    }
  };
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Logout failed: ' + error.message);
    } else {
      setUser(null);
    }
  };


  const renderPreview = (cert) => {
    if (cert.type === 'application/pdf') {
      return (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
          alt="PDF icon"
          style={{ width: '100%', height: '200px', objectFit: 'contain' }}
        />
      );
    }
    

    return (
      <img
        src={cert.url}
        alt={cert.name}
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }}
      />
    );
  };

  return (
    <div className="container">
      
      <div className="card" style={{ width: '95%', maxWidth: '900px', textAlign: 'center' }}>
      
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
  <h2 style={{ margin: 0 }}>🎓 Welcome, {user.email}</h2>

</div>


        {/* Upload Section */}
        <div style={{
          border: '2px dashed #ffffff55',
          padding: '30px',
          borderRadius: '15px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          marginBottom: '25px'
        }}>
          <h3 style={{ marginBottom: '10px' }}>📤 Upload Certificate</h3>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={handleFileChange}
            style={{
              background: '#ffffff22',
              padding: '10px',
              borderRadius: '10px',
              color: 'white'
            }}
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            style={{
              marginTop: '20px',
              background: '#00c6ff',
              backgroundImage: 'linear-gradient(45deg, #00c6ff, #0072ff)',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: '600',
              cursor: selectedFile && !uploading ? 'pointer' : 'not-allowed',
              transition: '0.3s ease'
            }}
          >
            {uploading ? 'Uploading...' : '🚀 Confirm Upload'}
          </button>
        </div>
        {/* Certificates List */}
        <div>
          <h3>Your Certificates:</h3>
          {certs.length === 0 ? (
            <p style={{ fontStyle: 'italic', color: '#ccc' }}>No certificates uploaded yet.</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '20px',
              marginTop: '20px'
            }}>
              {certs.map((cert, idx) => (
     <div key={idx} style={{
  border: '1px solid #ffffff22',
  borderRadius: '15px',
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
  overflow: 'hidden',
  transition: '0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
}}>
  <a href={cert.url} target="_blank" rel="noopener noreferrer">
    {renderPreview(cert)}
  </a>

  <div style={{ padding: '12px 15px', fontSize: '0.85rem', fontWeight: 500, color: '#fff' }}>
    📄 {cert.name}
  </div>
 <div style={{
  display: 'flex',
  justifyContent: 'space-around',
  padding: '12px',
  background: 'rgba(255,255,255,0.03)',
  borderTop: '1px solid #ffffff11',
  gap: '10px'
}}>
  <button
    onClick={() => setRenamingId(cert.path)}
    style={{
      background: '#ffaa00',
      border: 'none',
      color: '#000',
      borderRadius: '8px',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      transition: 'all 0.2s ease-in-out'
    }}
    onMouseOver={(e) => e.target.style.background = '#ffc233'}
    onMouseOut={(e) => e.target.style.background = '#ffaa00'}
  > Rename</button>

  <button
    onClick={() => handleDelete(cert.path)}
    style={{
      background: '#ff4d4d',
      border: 'none',
      color: 'white',
      borderRadius: '8px',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      transition: 'all 0.2s ease-in-out'
    }}
    onMouseOver={(e) => e.target.style.background = '#ff6666'}
    onMouseOut={(e) => e.target.style.background = '#ff4d4d'}
  > Delete</button>
</div>

     {renamingId === cert.path && (
  <div
    style={{
      padding: '12px',
      background: '#111',
      borderTop: '1px solid #333',
      boxSizing: 'border-box'
    }}
  >
    <input
      type="text"
      value={newCertName}
      onChange={(e) => setNewCertName(e.target.value)}
      placeholder="New name (no extension)"
      style={{
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #555',
        marginBottom: '12px',
        background: '#222',
        color: 'white',
        fontSize: '0.85rem',
        boxSizing: 'border-box'
      }}
    />
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'space-between'
      }}
    >
      <button
        onClick={() => handleRename(cert.path)}
        style={{
          flex: 1,
          background: '#28a745',
          border: 'none',
          color: 'white',
          padding: '8px',
          borderRadius: '6px',
          cursor: 'pointer',
          minWidth: '100px'
        }}
      >
        ✅ Confirm
      </button>
      <button
        onClick={() => {
          setRenamingId(null);
          setNewCertName('');
        }}
        style={{
          flex: 1,
          background: '#555',
          border: 'none',
          color: 'white',
          padding: '8px',
          borderRadius: '6px',
          cursor: 'pointer',
          minWidth: '100px'
        }}
      >
        ❌ Cancel
      </button>
    </div>
  </div>
)}

</div>

                
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
