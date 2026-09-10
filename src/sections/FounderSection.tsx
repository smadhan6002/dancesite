import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Import local founder asset
import founderImage from '../assets/jayashree_srinivasann_5d04a935902545048f734fdb8f3b06ab.jpg'

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function FounderSection() {
  return (
    <section
      id="founder"
      style={{
        backgroundColor: 'var(--royal-purple)',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle gold radial glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
        background: 'radial-gradient(circle at center, rgba(214, 168, 79, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '5fr 7fr',
          gap: '80px',
          alignItems: 'center',
        }} className="founder-grid">
          
          {/* Image */}
          <FadeIn delay={0.1}>
            <div style={{
              position: 'relative',
              padding: '16px',
              border: '1px solid var(--gold)',
              background: 'rgba(50, 20, 63, 0.5)',
              boxShadow: '0 20px 40px rgba(36, 16, 45, 0.5)',
            }}>
              {/* Corner Ornaments */}
              <div style={{ position: 'absolute', top: '-4px', left: '-4px', width: '8px', height: '8px', backgroundColor: 'var(--champagne)' }} />
              <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', backgroundColor: 'var(--champagne)' }} />
              <div style={{ position: 'absolute', bottom: '-4px', left: '-4px', width: '8px', height: '8px', backgroundColor: 'var(--champagne)' }} />
              <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '8px', height: '8px', backgroundColor: 'var(--champagne)' }} />

              <img
                src={founderImage}
                alt="Jayashree Srinivasann - Founder of Chathur Lakshana Academy of Fine Arts"
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  display: 'block',
                  filter: 'contrast(1.05)',
                }}
              />
            </div>
          </FadeIn>

          {/* Text Content */}
          <FadeIn delay={0.2}>
            <div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em',
                color: 'var(--champagne)', textTransform: 'uppercase', marginBottom: '16px',
              }}>
                FOUNDER &amp; ARTISTIC DIRECTOR
              </div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 400,
                color: 'var(--cream)', lineHeight: 1.1, marginBottom: '24px',
              }}>
                Jayashree Srinivasann
              </h2>
              <div style={{
                width: '60px', height: '1.5px',
                background: 'var(--gold)',
                marginBottom: '32px',
              }} />
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
                color: 'var(--light-lavender)',
                lineHeight: 1.8,
                marginBottom: '32px',
              }}>
                Jayashree Srinivasann is a dedicated Bharatanatyam artist, teacher, and the visionary behind Chathur Lakshana Academy of Fine Arts. With decades of experience performing and imparting knowledge, she has nurtured countless students through the rigors and beauty of classical dance. Her holistic approach focuses on the Kalakshetra tradition, emphasizing both precise technique and profound artistic expression. Through her unwavering commitment, she continues to shape the next generation of artists, ensuring the spiritual and cultural depth of Bharatanatyam thrives.
              </p>
              
              {/* Short Quote */}
              <div style={{
                paddingLeft: '24px',
                borderLeft: '2px solid var(--gold)',
              }}>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: '22px', fontStyle: 'italic',
                  color: 'var(--champagne)',
                  lineHeight: 1.4, margin: 0,
                }}>
                  "The stage is not just a place to perform, it is a school where character is shaped."
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .founder-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </section>
  )
}
