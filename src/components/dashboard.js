import { useState } from 'react';
import { supabase } from '../supabaseclient';
import Navbar from './Navbar';

export default function Dashboard({ user, setUser }) {
  const [certs, setCerts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
                  textDecoration: 'none',
                  color: 'white',
                  border: '1px solid #ffffff33',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff11',
                  backdropFilter: 'blur(8px)',
                  transition: 'transform 0.2s',
                  position: 'relative'
                }}>
                  <a href={cert.url} target="_blank" rel="noopener noreferrer">
                    {renderPreview(cert)}
                  </a>
                  <div style={{
                    padding: '10px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    background: '#ffffff22',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ flex: 1, textAlign: 'left' }}>📄 {cert.name}</span>
                    <button
                      onClick={() => handleDelete(cert.path)}
                      style={{
                        background: '#ff4d4d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        cursor: 'pointer',
                        marginLeft: '10px'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
