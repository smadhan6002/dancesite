import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const secondaryCourses = [
  {
    level: 'FOUNDATION → ADVANCED',
    title: 'Carnatic Vocal',
    desc: 'Sarali varisai through kritis, raga alapana and layam for dancers and singers alike.',
    details: 'Voice culture · Tala training · Concert preparation',
  },
  {
    level: 'SENIOR STUDENTS',
    title: 'Choreography & Theory',
    desc: 'Natya Shastra fundamentals, thematic production design and stagecraft.',
    details: 'Composition · Lighting & costume · Production management',
  },
  {
    level: 'ALL AGES',
    title: 'Fine Arts Studio',
    desc: 'Kolam, temple art and traditional painting as companions to the performing arts.',
    details: 'Weekend studio · Exhibitions · Festival installations',
  },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
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

function FadeInScale({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function CoursesSection() {
  return (
    <section
      id="courses"
      style={{
        backgroundColor: 'var(--soft-blush)',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Gold Elements */}
      <div style={{
        position: 'absolute', top: '40px', left: '-50px', width: '100px', height: '100px',
        border: '1px solid rgba(214, 168, 79, 0.2)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '100px', right: '-150px', width: '300px', height: '300px',
        border: '1px solid rgba(214, 168, 79, 0.1)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em',
              color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '16px',
            }}>✧ TRAINING</div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 400,
              color: 'var(--deep-purple)', lineHeight: 1.2, marginBottom: '20px',
            }}>Courses Offered</h2>
            <div style={{
              width: '60px', height: '1.5px',
              background: 'var(--gold)',
              margin: '0 auto 24px',
            }} />
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
              fontStyle: 'italic', color: 'var(--luxury-purple)', lineHeight: 1.7,
            }}>
              Graded, unhurried and rooted — every syllabus ends in performance.
            </p>
          </div>
        </FadeIn>

        {/* Featured Course: Bharatanatyam */}
        <FadeInScale delay={0.1}>
          <div
            style={{
              backgroundColor: 'var(--cream)',
              border: '1px solid var(--color-border)',
              padding: '60px 40px',
              marginBottom: '40px',
              textAlign: 'center',
              boxShadow: '0 15px 40px rgba(50, 20, 63, 0.05)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle inner gold frame */}
            <div style={{
              position: 'absolute', inset: '12px',
              border: '1px solid rgba(214, 168, 79, 0.2)',
              pointerEvents: 'none',
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em',
                color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '16px',
              }}>SIGNATURE COURSE</div>
              
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 400,
                color: 'var(--deep-purple)', marginBottom: '24px',
              }}>Bharatanatyam</h3>
              
              <div style={{
                width: '60px', height: '1.5px',
                backgroundColor: 'var(--gold)',
                margin: '0 auto 24px',
              }} />
              
              <p style={{
                fontFamily: "var(--font-body)",
                fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--luxury-purple)',
                lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 32px',
              }}>
                Adavus, alarippu to varnam, abhinaya and nattuvangam, taught in graded years.
              </p>
              
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: '15px', color: 'var(--deep-purple)',
                lineHeight: 1.6, letterSpacing: '0.05em',
                marginBottom: '48px',
                display: 'flex', flexWrap: 'wrap',
                justifyContent: 'center', alignItems: 'center', gap: '16px'
              }} className="highlights-wrapper">
                <span style={{ whiteSpace: 'nowrap', fontWeight: 500 }}>Weekly Practical + Theory</span>
                <span className="bullet-point" style={{ color: 'var(--gold)' }}>✧</span>
                <span style={{ whiteSpace: 'nowrap', fontWeight: 500 }}>Annual Sabha Performance</span>
                <span className="bullet-point" style={{ color: 'var(--gold)' }}>✧</span>
                <span style={{ whiteSpace: 'nowrap', fontWeight: 500 }}>Arangetram Guidance</span>
              </div>
              
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em',
                  padding: '16px 48px', textTransform: 'uppercase',
                  cursor: 'pointer',
                  color: 'var(--deep-purple)',
                  border: '1px solid var(--gold)',
                }}
              >
                ENQUIRE NOW
              </button>
            </div>
          </div>
        </FadeInScale>

        {/* Secondary Courses Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}
          className="secondary-courses-grid"
        >
          {secondaryCourses.map((course, i) => (
            <FadeIn key={course.title} delay={0.2 + (i * 0.1)}>
              <div
                style={{
                  backgroundColor: 'var(--cream)',
                  border: '1px solid rgba(214, 168, 79, 0.2)',
                  padding: '40px 32px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  height: '100%',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--gold)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(50, 20, 63, 0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(214, 168, 79, 0.2)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em',
                  color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '16px',
                }}>{course.level}</div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', fontWeight: 400,
                  color: 'var(--deep-purple)', marginBottom: '16px',
                }}>{course.title}</h3>
                <div style={{
                  width: '30px', height: '1.5px',
                  backgroundColor: 'var(--gold)',
                  marginBottom: '20px',
                  opacity: 0.5,
                }} />
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '16px', color: 'var(--luxury-purple)',
                  lineHeight: 1.7, marginBottom: '24px',
                }}>{course.desc}</p>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '14px', color: 'var(--deep-purple)',
                  lineHeight: 1.6, letterSpacing: '0.01em', fontWeight: 500
                }}>{course.details}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .secondary-courses-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .secondary-courses-grid { grid-template-columns: 1fr !important; }
          .highlights-wrapper {
             flex-direction: column !important;
             gap: 8px !important;
          }
          .bullet-point { display: none !important; }
        }
      `}</style>
    </section>
  )
}
