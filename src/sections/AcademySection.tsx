import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import academyImage from '../assets/upasana_uk_f7e914d7be394adcaa01b38b13fdb01b.jpg'

const values = [
  {
    label: 'TRADITION',
    text: 'Rooted in the Pandanallur and Vazhuvoor bani — authentic, uncompromised and handed down with reverence.',
  },
  {
    label: 'VISION',
    text: 'An academy where every student becomes both a complete artiste and a confident individual.',
  },
  {
    label: 'PHILOSOPHY',
    text: 'Nurturing artistic excellence alongside personality development — the stage as a school of character.',
  },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function AcademySection() {
  return (
    <section
      id="academy"
      className="section-cinematic-top"
      style={{
        backgroundColor: 'rgba(247, 241, 229, 0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '120px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '200px',
        background: 'linear-gradient(to bottom, rgba(184, 138, 50, 0.05), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
        {/* Section header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)', fontWeight: 600, letterSpacing: '0.18em',
              color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '20px',
            }}>ABOUT THE ACADEMY</div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 400,
              color: 'var(--color-text-heading)', lineHeight: 1.2, marginBottom: '24px',
            }}>
              A lineage kept alive, one adavu<br />at a time
            </h2>
            <div style={{
              width: '60px', height: '1.5px',
              background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
              margin: '0 auto 24px',
            }} />
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
              fontStyle: 'italic', color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
            }}>
              Chathur Lakshana — the four marks of a complete artiste: form, rhythm, emotion, devotion.
            </p>
          </div>
        </FadeIn>

        {/* Two column layout: image + values */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'start',
        }}
          className="academy-grid"
        >
          {/* Left: Image with caption */}
          <FadeIn delay={0.1}>
            <div style={{
              position: 'relative',
              backgroundColor: 'var(--color-bg-alternate)',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
            }}>
              <motion.img
                src={academyImage}
                alt="Bharatanatyam dancer eyes closeup"
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'sepia(0.15) contrast(1.05)',
                }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '20px 24px',
                background: 'linear-gradient(to top, rgba(247, 241, 229, 0.95), rgba(247, 241, 229, 0.7), transparent)',
              }}>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '15px', fontStyle: 'italic', fontWeight: 500,
                  color: 'var(--color-text-heading)', lineHeight: 1.6,
                  marginTop: '20px',
                }}>
                  Drishti bhedam — the discipline of the gaze, taught before the feet ever move.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right: Values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {values.map((v, i) => (
              <FadeIn key={v.label} delay={0.2 + i * 0.12}>
                <div style={{
                  backgroundColor: 'rgba(237, 225, 207, 0.65)', // var(--color-bg-secondary) semi-transparent
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  border: '1px solid rgba(216, 195, 154, 0.5)', // var(--color-border) with opacity
                  padding: '28px 32px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
                  cursor: 'default',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(184, 138, 50, 0.08)'
                    e.currentTarget.style.backgroundColor = 'rgba(237, 225, 207, 0.85)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.backgroundColor = 'rgba(237, 225, 207, 0.65)'
                  }}
                >
                  <div style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '14px', fontWeight: 600, letterSpacing: '0.15em',
                    color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '12px',
                  }}>{v.label}</div>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '18px', fontWeight: 400,
                    color: 'var(--color-text-primary)', lineHeight: 1.7,
                  }}>{v.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .academy-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  )
}
