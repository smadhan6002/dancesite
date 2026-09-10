import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  { num: '15+', label: 'YEARS OF TEACHING' },
  { num: '300+', label: 'STUDENTS TRAINED' },
  { num: '40+', label: 'STAGE PRODUCTIONS' },
  { num: '25+', label: 'ARANGETRAMS GUIDED' },
]

const testimonials = [
  {
    quote: "Radhika ma'am teaches character before choreography. My daughter walks differently since she joined.",
    name: 'LAKSHMI SUNDARAM',
    role: 'Parent, Mylapore',
  },
  {
    quote: 'My arangetram felt less like an exam and more like a blessing. Every adavu had been earned.',
    name: 'ANUSHA IYER',
    role: 'Senior student',
  },
  {
    quote: "One of the most disciplined young ensembles on the Chennai sabha circuit today.",
    name: 'R. KRISHNAMURTHY',
    role: 'Sabha secretary',
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

export default function AchievementsSection() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '140px 0',
        overflow: 'hidden',
        backgroundColor: 'var(--royal-purple)',
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(214, 168, 79, 0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em',
              color: 'var(--champagne)', textTransform: 'uppercase', marginBottom: '16px',
            }}>✧ RECOGNITION</div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 400,
              color: 'var(--cream)', marginBottom: '20px',
            }}>Achievements &amp; Voices</h2>
            <div style={{
              width: '60px', height: '1.5px',
              background: 'var(--gold)',
              margin: '0 auto 24px',
            }} />
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)', fontStyle: 'italic',
              color: 'var(--light-lavender)',
            }}>
              Measured not in trophies, but in artistes who keep dancing.
            </p>
          </div>
        </FadeIn>

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          marginBottom: '80px',
        }} className="stats-grid">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div style={{
                border: '1px solid rgba(214, 168, 79, 0.3)',
                padding: '40px 20px',
                textAlign: 'center',
                backgroundColor: 'rgba(36, 16, 45, 0.4)',
                boxShadow: '0 10px 30px rgba(36, 16, 45, 0.5)',
              }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 400,
                  color: 'var(--gold)', lineHeight: 1,
                  textShadow: '0 2px 10px rgba(214, 168, 79, 0.2)',
                }}>{s.num}</div>
                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '13px', letterSpacing: '0.15em', fontWeight: 600,
                  color: 'var(--champagne)',
                  textTransform: 'uppercase', marginTop: '16px',
                }}>{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Testimonials */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }} className="testimonials-grid">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={0.3 + i * 0.1}>
              <div style={{
                border: '1px solid rgba(214, 168, 79, 0.2)',
                padding: '40px 32px',
                backgroundColor: 'rgba(36, 16, 45, 0.6)',
                boxShadow: '0 10px 30px rgba(36, 16, 45, 0.5)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--gold)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(214, 168, 79, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              >
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: '48px', color: 'var(--gold)',
                  lineHeight: 1, marginBottom: '10px', opacity: 0.8,
                }}>"</div>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 'clamp(1.05rem, 1.5vw, 1.15rem)', fontStyle: 'italic',
                  color: 'var(--cream)',
                  lineHeight: 1.8, marginBottom: '32px', flexGrow: 1,
                }}>{t.quote}</p>
                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em',
                  color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '6px',
                }}>{t.name}</div>
                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '15px', color: 'var(--light-lavender)', fontWeight: 400,
                }}>{t.role}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
