import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const timelineEvents = [
  {
    year: '2010',
    title: 'The First Salangai',
    desc: 'Chathur Lakshana opens its doors in Mylapore with a handful of students and a single lamp.',
  },
  {
    year: '2014',
    title: 'Sabha Debut',
    desc: "Students begin performing at Chennai's sabhas during the Margazhi season.",
  },
  {
    year: '2017',
    title: 'First Arangetram',
    desc: 'The academy guides its first student through the sacred arangetram — a milestone of mastery.',
  },
  {
    year: '2019',
    title: 'Natya Shastra Studies',
    desc: 'Introduction of theory classes rooted in the Natya Shastra for senior students.',
  },
  {
    year: '2022',
    title: 'Fine Arts Studio',
    desc: 'Launch of the Fine Arts Studio — Kolam, temple art and classical painting added to the curriculum.',
  },
  {
    year: '2025',
    title: 'Fifteen Years',
    desc: 'Three hundred students, forty stage productions and twenty-five arangetrams. The journey continues.',
  },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function TimelineSection() {
  return (
    <section
      style={{
        backgroundColor: 'var(--light-lavender)',
        padding: '140px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background grain/pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(var(--soft-purple) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.05,
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '100px' }}
        >
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em',
            color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '16px',
          }}>
            ✧ FIFTEEN YEARS
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: 'clamp(3rem, 5vw, 5.5rem)', fontWeight: 400,
            color: 'var(--deep-purple)', lineHeight: 1.1,
          }}>
            The Academy's Journey
          </h2>
          <div style={{
            width: '60px', height: '1.5px',
            background: 'var(--gold)',
            margin: '24px auto 0',
          }} />
        </motion.div>

        {/* Vertical Timeline */}
        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto', paddingLeft: '48px' }}>
          {/* Animated gold vertical line - draws on as user scrolls */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: '12px', top: '10px', bottom: '10px',
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, var(--gold) 5%, var(--gold) 95%, transparent)',
              transformOrigin: 'top',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {timelineEvents.map((event, i) => (
              <FadeIn key={event.year} delay={i * 0.1}>
                <div style={{ position: 'relative' }}>
                  {/* Dot Marker */}
                  <div style={{
                    position: 'absolute', left: '-44px', top: '12px',
                    width: '16px', height: '16px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--light-lavender)',
                    border: '3px solid var(--gold)',
                    boxShadow: '0 0 10px rgba(214, 168, 79, 0.4)',
                  }} />

                  {/* Premium Cream Card */}
                  <div style={{
                    backgroundColor: 'var(--cream)',
                    border: '1px solid var(--color-border)',
                    padding: '32px 40px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(50, 20, 63, 0.03)',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateX(8px)'
                      e.currentTarget.style.borderColor = 'var(--gold)'
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(50, 20, 63, 0.08)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateX(0)'
                      e.currentTarget.style.borderColor = 'var(--color-border)'
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(50, 20, 63, 0.03)'
                    }}
                  >
                    <div style={{
                      fontFamily: "var(--font-display)",
                      fontSize: '32px', letterSpacing: '0.05em',
                      color: 'var(--gold)', marginBottom: '8px', fontWeight: 500, lineHeight: 1,
                    }}>
                      {event.year}
                    </div>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: '28px', fontWeight: 600,
                      color: 'var(--deep-purple)', marginBottom: '12px',
                    }}>{event.title}</h3>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '17px', color: 'var(--luxury-purple)', lineHeight: 1.6, margin: 0,
                    }}>{event.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
