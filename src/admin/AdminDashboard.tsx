import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GALLERY_CATEGORIES } from './config';
import { galleryStorage } from '../utils/galleryStorage';
import type { GalleryItem } from '../utils/galleryStorage';
import { instagramStorage } from '../utils/instagramStorage';
import type { InstagramReel } from '../utils/instagramStorage';

type TabState = 'gallery_manage' | 'gallery_add' | 'reels_manage' | 'reels_add';

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [view, setView] = useState<TabState>('gallery_manage');
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Gallery State
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(GALLERY_CATEGORIES[1] || 'PERFORMANCES');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reels State
  const [reels, setReels] = useState<InstagramReel[]>([]);
  const [reelEditingId, setReelEditingId] = useState<string | null>(null);
  const [reelName, setReelName] = useState('');
  const [reelUrl, setReelUrl] = useState('');
  const [reelDescription, setReelDescription] = useState('');

  useEffect(() => {
    loadItems();
    loadReels();
  }, []);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  };

  // ----------------------------------------------------
  // GALLERY LOGIC
  // ----------------------------------------------------
  const loadItems = async () => {
    try {
      const data = await galleryStorage.getGalleryItems();
      setItems(data.sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
      console.error('Failed to load gallery items', err);
    }
  };

  const resetGalleryForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory(GALLERY_CATEGORIES[1] || 'PERFORMANCES');
    setYear('');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WEBP).');
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
          } else {
            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('No canvas context');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || (!imageFile && !imagePreview)) {
      alert('Please provide an image, title, and category.');
      return;
    }
    setIsSaving(true);
    try {
      let finalImageData = imagePreview!;
      if (imageFile) finalImageData = await compressImage(imageFile);
      const item: GalleryItem = {
        id: editingId || `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        imageData: finalImageData, title, category, year, description,
        createdAt: editingId ? (items.find(i => i.id === editingId)?.createdAt || Date.now()) : Date.now(),
      };
      await galleryStorage.saveGalleryItem(item);
      await loadItems();
      showMessage('Image added to gallery successfully.');
      if (!editingId) resetGalleryForm();
      setView('gallery_manage');
    } catch (err) {
      alert('Failed to save image.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditGallery = (item: GalleryItem) => {
    setEditingId(item.id);
    setTitle(item.title); setCategory(item.category); setYear(item.year || '');
    setDescription(item.description); setImagePreview(item.imageData); setImageFile(null);
    setView('gallery_add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteGallery = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this image from the gallery?")) {
      await galleryStorage.deleteGalleryItem(id);
      await loadItems();
    }
  };

  // ----------------------------------------------------
  // REELS LOGIC
  // ----------------------------------------------------
  const loadReels = async () => {
    try {
      const data = await instagramStorage.getReels();
      setReels(data.sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
      console.error('Failed to load reels', err);
    }
  };

  const resetReelForm = () => {
    setReelEditingId(null);
    setReelName('');
    setReelUrl('');
    setReelDescription('');
  };

  const isValidReelUrl = (url: string) => {
    try {
      const trimmed = url.trim();
      const parsed = new URL(trimmed);
      if (parsed.hostname !== 'instagram.com' && parsed.hostname !== 'www.instagram.com') return false;
      if (!parsed.pathname.startsWith('/reel/')) return false;
      return true;
    } catch {
      return false;
    }
  };

  const handleSaveReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reelName || !reelUrl) {
      alert('Please provide a reel name and URL.');
      return;
    }
    if (!isValidReelUrl(reelUrl)) {
      alert('Please enter a valid Instagram Reel URL (e.g. https://www.instagram.com/reel/XXXXXXXXXXX/)');
      return;
    }

    setIsSaving(true);
    try {
      const item: InstagramReel = {
        id: reelEditingId || `reel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: reelName.trim(),
        url: reelUrl.trim(),
        description: reelDescription.trim(),
        createdAt: reelEditingId ? (reels.find(i => i.id === reelEditingId)?.createdAt || Date.now()) : Date.now(),
      };
      await instagramStorage.saveReel(item);
      await loadReels();
      showMessage('Instagram reel saved successfully.');
      if (!reelEditingId) resetReelForm();
      setView('reels_manage');
    } catch (err) {
      alert('Failed to save reel.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditReel = (item: InstagramReel) => {
    setReelEditingId(item.id);
    setReelName(item.name);
    setReelUrl(item.url);
    setReelDescription(item.description || '');
    setView('reels_add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteReel = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this Instagram Reel?")) {
      await instagramStorage.deleteReel(id);
      await loadReels();
    }
  };


  // ----------------------------------------------------
  // STYLES
  // ----------------------------------------------------
  const btnStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em',
    textTransform: 'uppercase', cursor: 'pointer',
    padding: '12px 24px', border: 'none', transition: 'all 0.2s ease',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--color-bg-primary)',
    border: '1px solid var(--color-border)',
    padding: '12px 16px', fontFamily: "var(--font-body)",
    fontSize: '16px', color: 'var(--color-text-primary)', outline: 'none',
    marginBottom: '20px',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)", fontSize: '12px',
    letterSpacing: '0.15em', fontWeight: 600, color: 'var(--color-accent)',
    textTransform: 'uppercase', display: 'block', marginBottom: '8px',
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg-alternate)',
      color: 'var(--color-text-primary)',
      paddingBottom: '100px',
    }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-primary)',
        padding: '24px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 10,
        boxShadow: '0 4px 20px rgba(59, 41, 34, 0.05)',
      }}>
        <div>
          <div style={{
            fontFamily: "var(--font-body)", fontSize: '12px',
            letterSpacing: '0.2em', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '4px'
          }}>Chathur Lakshana</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: '24px', color: 'var(--color-text-heading)' }}>
            ADMIN DASHBOARD
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            Welcome, Admin
          </div>
          <button
            onClick={onLogout}
            style={{ ...btnStyle, background: 'transparent', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(184, 138, 50, 0.1)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            LOGOUT
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '48px auto', padding: '0 24px' }}>
        
        {/* Top Navigation */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {/* Gallery Tabs */}
          <div style={{ display: 'flex', gap: '16px', borderRight: '2px solid var(--color-border)', paddingRight: '24px' }}>
            <button
              className={view === 'gallery_manage' ? "btn-primary" : ""}
              onClick={() => { setView('gallery_manage'); resetGalleryForm(); }}
              style={{
                ...btnStyle,
                background: view === 'gallery_manage' ? undefined : 'transparent',
                color: view === 'gallery_manage' ? undefined : 'var(--color-text-heading)',
                border: view === 'gallery_manage' ? 'none' : '1px solid var(--color-border)',
              }}
            >
              VIEW GALLERY ({items.length})
            </button>
            <button
              className={view === 'gallery_add' ? "btn-primary" : ""}
              onClick={() => setView('gallery_add')}
              style={{
                ...btnStyle,
                background: view === 'gallery_add' ? undefined : 'transparent',
                color: view === 'gallery_add' ? undefined : 'var(--color-text-heading)',
                border: view === 'gallery_add' ? 'none' : '1px solid var(--color-border)',
              }}
            >
              + ADD GALLERY IMAGE
            </button>
          </div>

          {/* Reels Tabs */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              className={view === 'reels_manage' ? "btn-primary" : ""}
              onClick={() => { setView('reels_manage'); resetReelForm(); }}
              style={{
                ...btnStyle,
                background: view === 'reels_manage' ? undefined : 'transparent',
                color: view === 'reels_manage' ? undefined : 'var(--color-text-heading)',
                border: view === 'reels_manage' ? 'none' : '1px solid var(--color-border)',
              }}
            >
              INSTAGRAM REELS ({reels.length})
            </button>
            <button
              className={view === 'reels_add' ? "btn-primary" : ""}
              onClick={() => setView('reels_add')}
              style={{
                ...btnStyle,
                background: view === 'reels_add' ? undefined : 'transparent',
                color: view === 'reels_add' ? undefined : 'var(--color-text-heading)',
                border: view === 'reels_add' ? 'none' : '1px solid var(--color-border)',
              }}
            >
              + ADD INSTAGRAM REEL
            </button>
          </div>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: 'rgba(184, 138, 50, 0.1)', border: '1px solid var(--color-border)',
              color: 'var(--color-accent)', padding: '16px', fontFamily: "var(--font-body)",
              fontSize: '15px', marginBottom: '32px', borderRadius: '4px',
            }}
          >
            {message}
          </motion.div>
        )}

        {/* ======================================= */}
        {/* GALLERY VIEWS */}
        {/* ======================================= */}
        {view === 'gallery_add' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', padding: '40px' }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: '32px', color: 'var(--color-accent)', marginBottom: '32px' }}>
              {editingId ? 'Edit Gallery Image' : 'Add Gallery Image'}
            </h2>
            <form onSubmit={handleSaveGallery} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
              <div>
                <label style={labelStyle}>Image Upload</label>
                <div style={{
                    border: '1px dashed var(--color-border)', backgroundColor: 'var(--color-bg-secondary)',
                    height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', overflow: 'hidden', marginBottom: '16px',
                }}>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ textAlign: 'center', padding: '24px' }}>
                      <div style={{ color: 'var(--color-accent)', marginBottom: '12px', fontSize: '24px' }}>🖼️</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: '14px', color: 'var(--color-text-secondary)' }}>Select or drop image here</div>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageSelect} ref={fileInputRef} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button type="button" onClick={() => fileInputRef.current?.click()} style={{ ...btnStyle, background: 'transparent', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>Browse / Choose Image</button>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Title</label>
                <input type="text" required style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} />
                <label style={labelStyle}>Category</label>
                <select required style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} value={category} onChange={e => setCategory(e.target.value)}>
                  {GALLERY_CATEGORIES.filter(c => c !== 'ALL').map(cat => <option key={cat} value={cat} style={{ background: 'var(--color-bg-primary)' }}>{cat}</option>)}
                </select>
                <label style={labelStyle}>Year</label>
                <input type="text" required style={inputStyle} value={year} onChange={e => setYear(e.target.value)} />
                <label style={labelStyle}>Description (Optional)</label>
                <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }} value={description} onChange={e => setDescription(e.target.value)} />
                <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
                  <button type="submit" disabled={isSaving} className="btn-primary" style={{ ...btnStyle, flex: 1, opacity: isSaving ? 0.7 : 1 }}>
                    {isSaving ? 'SAVING...' : 'SAVE TO GALLERY'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={() => { setView('gallery_manage'); resetGalleryForm(); }} style={{ ...btnStyle, background: 'transparent', color: 'var(--color-text-heading)', border: '1px solid var(--color-border)' }}>CANCEL</button>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {view === 'gallery_manage' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: '32px', color: 'var(--color-accent)', marginBottom: '32px' }}>Manage Gallery</h2>
            {items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', border: '1px dashed var(--color-border)', color: 'var(--color-text-secondary)', fontFamily: "var(--font-body)" }}>No gallery images added yet.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {items.map(item => (
                  <div key={item.id} style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                    <div style={{ height: '200px', width: '100%' }}>
                      <img src={item.imageData} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '20px' }}>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '8px' }}>{item.category} {item.year ? `· ${item.year}` : ''}</div>
                      <h4 style={{ fontFamily: "var(--font-display)", fontSize: '20px', color: 'var(--color-text-heading)', marginBottom: '8px' }}>{item.title}</h4>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                        <button onClick={() => handleEditGallery(item)} style={{ ...btnStyle, padding: '8px 16px', fontSize: '11px', flex: 1, background: 'rgba(184, 138, 50, 0.1)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>EDIT</button>
                        <button onClick={() => handleDeleteGallery(item.id)} style={{ ...btnStyle, padding: '8px 16px', fontSize: '11px', flex: 1, background: 'rgba(229, 115, 115, 0.1)', color: '#e57373', border: '1px solid rgba(229, 115, 115, 0.3)' }}>DELETE</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ======================================= */}
        {/* REELS VIEWS */}
        {/* ======================================= */}
        {view === 'reels_add' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', padding: '40px' }}
          >
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: '32px', color: 'var(--color-accent)', marginBottom: '32px' }}>
              {reelEditingId ? 'Edit Instagram Reel' : 'Add Instagram Reel'}
            </h2>
            <form onSubmit={handleSaveReel} style={{ maxWidth: '600px' }}>
              <label style={labelStyle}>Reel Name *</label>
              <input type="text" required style={inputStyle} value={reelName} onChange={e => setReelName(e.target.value)} placeholder="e.g. Annual Day 2026" />
              
              <label style={labelStyle}>Instagram Reel URL *</label>
              <input type="url" required style={inputStyle} value={reelUrl} onChange={e => setReelUrl(e.target.value)} placeholder="https://www.instagram.com/reel/XXXXXXXXXXX/" />
              
              <label style={labelStyle}>Description (Optional)</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }} value={reelDescription} onChange={e => setReelDescription(e.target.value)} placeholder="Brief description of the reel..." />
              
              <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
                <button type="submit" disabled={isSaving} className="btn-primary" style={{ ...btnStyle, flex: 1, opacity: isSaving ? 0.7 : 1 }}>
                  {isSaving ? 'SAVING...' : 'SAVE REEL'}
                </button>
                {reelEditingId && (
                  <button type="button" onClick={() => { setView('reels_manage'); resetReelForm(); }} style={{ ...btnStyle, background: 'transparent', color: 'var(--color-text-heading)', border: '1px solid var(--color-border)' }}>CANCEL</button>
                )}
              </div>
            </form>
          </motion.div>
        )}

        {view === 'reels_manage' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: '32px', color: 'var(--color-accent)', marginBottom: '32px' }}>Manage Instagram Reels</h2>
            {reels.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', border: '1px dashed var(--color-border)', color: 'var(--color-text-secondary)', fontFamily: "var(--font-body)" }}>No Instagram Reels added yet.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {reels.map(item => (
                  <div key={item.id} style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                    <div style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '24px', height: '24px', color: 'var(--color-accent)' }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </div>
                        <h4 style={{ fontFamily: "var(--font-display)", fontSize: '20px', color: 'var(--color-text-heading)', margin: 0 }}>{item.name}</h4>
                      </div>
                      
                      <p style={{
                        fontFamily: "var(--font-body)", fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '24px',
                        overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
                      }}>
                        {item.description || 'No description provided.'}
                      </p>
                      
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            ...btnStyle, padding: '8px 12px', fontSize: '11px', flex: '1 1 100%', textAlign: 'center', textDecoration: 'none',
                            background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)',
                            marginBottom: '8px'
                          }}
                        >VIEW ON INSTAGRAM</a>
                        <button onClick={() => handleEditReel(item)} style={{ ...btnStyle, padding: '8px 12px', fontSize: '11px', flex: 1, background: 'rgba(184, 138, 50, 0.1)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}>EDIT</button>
                        <button onClick={() => handleDeleteReel(item.id)} style={{ ...btnStyle, padding: '8px 12px', fontSize: '11px', flex: 1, background: 'rgba(229, 115, 115, 0.1)', color: '#e57373', border: '1px solid rgba(229, 115, 115, 0.3)' }}>DELETE</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

      </div>
      <style>{`
        @media (max-width: 768px) {
          form { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}
