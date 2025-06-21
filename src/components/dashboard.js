import { useState, useEffect } from 'react';
import { supabase } from '../supabaseclient';
import Navbar from './Navbar';

const MAX_USER_BYTES = 100 * 1024 * 1024; // 100MB

export default function Dashboard({ user, setUser }) {
  const [certs, setCerts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [newCertName, setNewCertName] = useState('');
  const [userUsage, setUserUsage] = useState(0);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  const userFolder = `certificate/${user.id}`;

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Fetch certificates from Supabase storage (user-specific)
  const fetchCertificates = async () => {
    const { data, error } = await supabase.storage.from('certificate').list(user.id + '/', { limit: 100 });
    if (error) {
      alert('Failed to fetch certificates: ' + error.message);
      return;
    }
    let totalBytes = 0;
    const certsWithUrls = await Promise.all(
      (data || []).map(async (file) => {
        totalBytes += file.metadata?.size || 0;
        const { data: publicUrl } = supabase.storage.from('certificate').getPublicUrl(user.id + '/' + file.name);
        return {
          name: file.name.split('_').slice(1).join('_'),
          path: user.id + '/' + file.name,
          url: publicUrl.publicUrl,
          type: file.metadata?.mimetype || '',
          size: file.metadata?.size || 0
        };
      })
    );
    setCerts(certsWithUrls);
    setUserUsage(totalBytes);
    setQuotaExceeded(totalBytes >= MAX_USER_BYTES);
  };

  useEffect(() => {
    fetchCertificates();
    // eslint-disable-next-line
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file first.");
    if (quotaExceeded) return alert("Your storage quota (100MB) is exceeded. Delete some files to upload new ones.");
    if (userUsage + selectedFile.size > MAX_USER_BYTES) return alert("Uploading this file would exceed your 100MB quota.");

    setUploading(true);
    const fileName = `${Date.now()}_${selectedFile.name}`;
    const fullPath = `${user.id}/${fileName}`;

    const { error } = await supabase.storage
      .from('certificate')
      .upload(fullPath, selectedFile);

    if (error) {
      alert('Upload failed: ' + error.message);
    } else {
      await fetchCertificates(); // Refresh list after upload
      setSelectedFile(null);
      alert("✅ Upload successful!");
    }
    setUploading(false);
  };

  const handleRename = async (oldPath) => {
    if (!newCertName) return alert("Enter a new name first.");
    const fileExt = oldPath.split('.').pop();
    const newPath = `${user.id}/${Date.now()}_${newCertName}.${fileExt}`;
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
    await fetchCertificates(); // Refresh list after rename
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
      await fetchCertificates(); // Refresh list after delete
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


  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '900px', width: '95%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: '2rem' }}>
            Welcome, {user.email}
          </h2>
        </div>
        {/* Show quota info */}
        <div style={{ color: quotaExceeded ? '#ef4444' : '#aaa', marginBottom: 10, fontWeight: 500 }}>
          Storage used: {(userUsage / (1024 * 1024)).toFixed(2)} MB / 100 MB
        </div>
        {quotaExceeded && (
          <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: 10 }}>
            You have exceeded your 100MB storage quota. Delete some files to upload new ones.
          </div>
        )}
        {/* Upload Section */}
        <div
          className="dashboard-upload-section"
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length > 0) {
              setSelectedFile(e.dataTransfer.files[0]);
            }
          }}
          onDragOver={(e) => e.preventDefault()}
          style={{
            // Remove border/background here, handled by CSS
            padding: '30px',
            borderRadius: '12px',
            marginBottom: '25px',
            textAlign: 'center',
            transition: 'background 0.3s ease',
          }}
        >
          <h3 style={{ marginBottom: '10px', color: '#2563eb', fontWeight: 600 }}>Upload Certificate</h3>
          <p style={{ color: '#555', marginBottom: '15px' }}>
            Drag and drop a PDF or image file here <br /> or choose from your device below.
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={handleFileChange}
            style={{
              background: '#fff',
              padding: '10px',
              borderRadius: '8px',
              color: '#222',
              cursor: 'pointer',
              border: '1px solid #d1d5db',
              marginBottom: '15px'
            }}
          />
          {selectedFile && (
            <div style={{ color: '#2563eb', marginTop: '10px' }}>
              Selected: <strong>{selectedFile.name}</strong>
            </div>
          )}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading || quotaExceeded}
            style={{
              marginTop: '20px',
              background: quotaExceeded ? '#ef4444' : '#2563eb',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '10px',
              color: '#fff',
              fontWeight: '600',
              cursor: selectedFile && !uploading && !quotaExceeded ? 'pointer' : 'not-allowed',
              transition: '0.3s ease'
            }}
          >
            {uploading ? 'Uploading...' : 'Confirm Upload'}
          </button>
        </div>

        {/* Certificates List */}
        <div>
          <h3 style={{ color: '#2563eb', fontWeight: 600 }}>Your Certificates:</h3>
          {certs.length === 0 ? (
            <p style={{ fontStyle: 'italic', color: '#888' }}>No certificates uploaded yet.</p>
          ) : (
            <div className="cert-list-grid">
              {certs.map((cert, idx) => (
                <div key={idx} className="cert-card">
                  <a href={cert.url} target="_blank" rel="noopener noreferrer">
                    {cert.type === 'application/pdf' ? (
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                        alt="PDF icon"
                        className="cert-preview"
                        style={{ objectFit: 'contain', background: '#f3f4f6' }}
                      />
                    ) : (
                      <img
                        src={cert.url}
                        alt={cert.name}
                        className="cert-preview"
                      />
                    )}
                  </a>
                  <div className="cert-info">
                    <span style={{ color: '#2563eb', marginRight: 6 }}>📄</span>
                    {cert.name}
                  </div>
                  <div className="cert-actions">
                    <button
                      className="rename-btn"
                      onClick={() => setRenamingId(cert.path)}
                    >
                      Rename
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(cert.path)}
                    >
                      Delete
                    </button>
                  </div>
                  {renamingId === cert.path && (
                    <div className="rename-section">
                      <input
                        type="text"
                        value={newCertName}
                        onChange={(e) => setNewCertName(e.target.value)}
                        placeholder="New name (no extension)"
                      />
                      <div style={{ display: 'flex', gap: '10px', marginTop: 8 }}>
                        <button
                          style={{ background: '#22c55e', color: '#fff' }}
                          onClick={() => handleRename(cert.path)}
                        >
                          Confirm
                        </button>
                        <button
                          style={{ background: '#e5e7eb', color: '#222' }}
                          onClick={() => {
                            setRenamingId(null);
                            setNewCertName('');
                          }}
                        >
                          Cancel
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
