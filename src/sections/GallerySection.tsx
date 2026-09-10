import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { galleryStorage } from '../utils/galleryStorage'
import { GALLERY_CATEGORIES } from '../admin/config'

// Import real local assets
import img1 from '../assets/jayashree_srinivasann_72390dc097ca46fdb51378c242cc129c.jpg'
import img2 from '../assets/jayashree_srinivasann_bfef744f8e5d4cbcba11df8498cc4b55.jpg'
import img3 from '../assets/jayashree_srinivasann_a34c896d8ab54c55a5fb832cc519b760.jpg'
import img4 from '../assets/raiveeson_e4149c9ca6f44e6f8bb6a35ddfd5fe60.jpg'
import img5 from '../assets/raiveeson_7a2e458cf19d45658d947283309892cd.jpg'
import img6 from '../assets/jayashree_srinivasann_488a76705714438996f1d47282588f2b.jpg'
import img7 from '../assets/master_sriram_9ff9382d10bc481bb72b5e91194fe5cb.jpg'
import img8 from '../assets/master_sriram_4256661ffaaa431f9276e74d5f9986c6.jpg'
import img9 from '../assets/noodlesandoldbooks_61691627fc434ad498e1d5e67e919866.jpg'
import img10 from '../assets/raiveeson_23d2423e8e7644409ddc582d0c472025.jpg'

const staticPerformances = [
  {
    id: 'static_1', category: 'PERFORMANCES',
    title: 'Margazhi Recital', description: 'Graceful abhinaya capturing the essence of devotion.',
    imageData: img1, createdAt: 1000,
  },
  {
    id: 'static_2', category: 'CLASSROOM',
    title: 'Adavu Practice', description: 'Perfecting footwork with precision and rhythm.',
    imageData: img2, createdAt: 999,
  },
  {
    id: 'static_3', category: 'PERFORMANCES',
    title: 'Temple Offering', description: 'A devotional offering to the divine.',
    imageData: img3, createdAt: 998,
  },
  {
    id: 'static_4', category: 'ARANGETRAMS',
    title: 'Arangetram Moments', description: 'The grand debut performance.',
    imageData: img4, createdAt: 997,
  },
  {
    id: 'static_5', category: 'PERFORMANCES',
    title: 'Varnam Excerpt', description: 'Complex rhythmic patterns and expressive storytelling.',
    imageData: img5, createdAt: 996,
  },
  {
    id: 'static_6', category: 'FESTIVALS',
    title: 'Group Choreography', description: 'Synchronized movements in thematic productions.',
    imageData: img6, createdAt: 995,
  },
  {
    id: 'static_7', category: 'PERFORMANCES',
    title: 'Tillana Joy', description: 'The vibrant and rhythmic conclusion.',
    imageData: img7, createdAt: 994,
  },
  {
    id: 'static_8', category: 'CLASSROOM',
    title: 'Guru Shishya Parampara', description: 'Imparting traditional knowledge.',
    imageData: img8, createdAt: 993,
  },
  {
    id: 'static_9', category: 'FESTIVALS',
    title: 'Cultural Showcase', description: 'Celebrating our rich heritage on stage.',
    imageData: img9, createdAt: 992,
  },
  {
    id: 'static_10', category: 'PERFORMANCES',
    title: 'Purana Manjari', description: 'Thematic production staging ancient epics.',
    imageData: img10, createdAt: 991,
  },
]



function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  )
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [items, setItems] = useState<any[]>([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    loadGalleryItems();
    const handleFocus = () => loadGalleryItems();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const loadGalleryItems = async () => {
    try {
      const dbItems = await galleryStorage.getGalleryItems();
      const sortedDbItems = dbItems.sort((a, b) => b.createdAt - a.createdAt);
      setItems([...sortedDbItems, ...staticPerformances]);
    } catch (err) {
      console.error('Failed to load gallery items from IndexedDB', err);
      setItems(staticPerformances);
    }
  }

  const filteredItems = activeCategory === 'ALL' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % filteredItems.length);
  }

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }

  // Handle Keyboard for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [lightboxOpen, filteredItems.length]);

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: 'var(--cream)',
        padding: '120px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 48px', marginBottom: '60px' }}>
        <FadeIn>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em',
              color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '16px',
            }}>✧ EVENT GALLERY</div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 400,
              color: 'var(--deep-purple)', marginBottom: '20px',
            }}>Glimpses of Artistry</h2>
            <div style={{
              width: '60px', height: '1.5px',
              background: 'var(--gold)',
              margin: '0 auto 24px',
            }} />
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: '18px', fontStyle: 'italic',
              color: 'var(--luxury-purple)',
              marginBottom: '40px',
            }}>
              Photographs from recitals, temple offerings and arangetrams.
            </p>

            {/* Category Filters */}
            <div style={{
              display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap',
              marginBottom: '40px'
            }}>
              {GALLERY_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontFamily: "var(--font-body)",
                    fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em',
                    color: activeCategory === cat ? 'var(--deep-purple)' : 'var(--luxury-purple)',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderBottom: activeCategory === cat ? '2px solid var(--gold)' : '2px solid transparent',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Masonry Editorial Grid */}
        {filteredItems.length === 0 ? (
          <div style={{ width: '100%', textAlign: 'center', padding: '100px 0', color: 'var(--luxury-purple)', fontFamily: "var(--font-body)" }}>
            No images found in this category.
          </div>
        ) : (
          <div className="gallery-masonry">
            {filteredItems.map((item, i) => {
              return (
                <motion.div
                  key={item.id}
                  className="gallery-item"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: (i % 5) * 0.1 }}
                  onClick={() => openLightbox(i)}
                >
                  <div className="gallery-image-wrapper">
                    <img
                      src={item.imageData}
                      alt={item.title}
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      <div className="gallery-content">
                        <span className="gallery-category">{item.category}</span>
                        <h3 className="gallery-title">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              backgroundColor: 'rgba(20, 10, 30, 0.95)',
              backdropFilter: 'blur(10px)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', alignItems: 'center',
            }}
            onClick={closeLightbox}
          >
            {/* Top Bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              padding: '24px 48px', display: 'flex', justifyContent: 'flex-end',
              zIndex: 10000,
            }}>
              <button 
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--champagne)', fontSize: '32px', lineHeight: 1,
                  padding: '8px', transition: 'color 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--champagne)'}
              >
                ✕
              </button>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="lightbox-nav left"
              style={{
                position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(50, 20, 63, 0.5)', border: '1px solid var(--gold)', borderRadius: '50%',
                width: '60px', height: '60px', cursor: 'pointer', zIndex: 10000,
                color: 'var(--champagne)', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.3s ease, color 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--gold)';
                e.currentTarget.style.color = 'var(--deep-purple)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(50, 20, 63, 0.5)';
                e.currentTarget.style.color = 'var(--champagne)';
              }}
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="lightbox-nav right"
              style={{
                position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(50, 20, 63, 0.5)', border: '1px solid var(--gold)', borderRadius: '50%',
                width: '60px', height: '60px', cursor: 'pointer', zIndex: 10000,
                color: 'var(--champagne)', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.3s ease, color 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--gold)';
                e.currentTarget.style.color = 'var(--deep-purple)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(50, 20, 63, 0.5)';
                e.currentTarget.style.color = 'var(--champagne)';
              }}
            >
              →
            </button>

            {/* Main Image */}
            <motion.div 
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                width: '100%', height: '80%', padding: '0 100px',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
              }}
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
            >
              <img
                src={filteredItems[currentImageIndex].imageData}
                alt={filteredItems[currentImageIndex].title}
                style={{
                  maxWidth: '100%', maxHeight: '100%',
                  objectFit: 'contain',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                }}
              />
            </motion.div>

            {/* Image Metadata */}
            <div style={{
              position: 'absolute', bottom: '40px', left: 0, right: 0,
              textAlign: 'center', padding: '0 24px',
            }}
            onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em',
                color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '8px',
              }}>
                {filteredItems[currentImageIndex].category}
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: '28px', fontWeight: 400,
                color: 'var(--cream)', margin: 0,
              }}>
                {filteredItems[currentImageIndex].title}
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-masonry {
          column-count: 3;
          column-gap: 24px;
          width: 100%;
        }

        .gallery-item {
          break-inside: avoid;
          margin-bottom: 24px;
          width: 100%;
          cursor: pointer;
          position: relative;
          display: block;
        }

        .gallery-image-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          background-color: var(--deep-purple);
          border: 1px solid rgba(214, 168, 79, 0.2);
          border-radius: 4px;
          box-shadow: 0 8px 30px rgba(20, 10, 30, 0.08);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .gallery-image-wrapper img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Hover Overlay */
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(50, 20, 63, 0.8);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: flex-end;
          padding: 32px;
          border: 1px solid transparent;
        }

        /* Hover Details */
        .gallery-content {
          transform: translateY(20px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-category {
          display: block;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .gallery-title {
          font-family: var(--font-display);
          font-size: 28px;
          color: var(--cream);
          font-weight: 400;
          margin: 0;
          line-height: 1.2;
        }

        /* Hover Actions */
        .gallery-item:hover .gallery-image-wrapper {
          border-color: var(--gold);
          box-shadow: 0 12px 40px rgba(50, 20, 63, 0.15);
        }

        .gallery-item:hover img {
          transform: scale(1.02);
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-item:hover .gallery-content {
          transform: translateY(0);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .gallery-masonry {
            column-count: 2;
          }
        }

        @media (max-width: 768px) {
          .lightbox-nav {
            width: 44px !important;
            height: 44px !important;
            font-size: 18px !important;
          }
          .lightbox-nav.left { left: 12px !important; }
          .lightbox-nav.right { right: 12px !important; }
        }

        @media (max-width: 640px) {
          .gallery-masonry {
            column-count: 1;
            column-gap: 16px;
          }
          .gallery-item {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </section>
  )
}
