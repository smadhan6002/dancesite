import { useMemo } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import GoldParticles from '../components/GoldParticles'

import pose0 from '../assets/Purana Manjari 2019.jpg.jpeg'
import pose1 from '../assets/jayashree_srinivasann_0aa20b1bbb01463a903c442d3bcc1059.jpg'
import pose2 from '../assets/jayashree_srinivasann_23e7b091b4e049d0b37f948f4d093fb3.jpg'
import pose3 from '../assets/jayashree_srinivasann_a9c16ced0f214959a61de7baa8fb5239.jpg'
import pose4 from '../assets/jayashree_srinivasann_e3b683d1b0814bee9a5847b97c968bab.jpg'
import pose5 from '../assets/jayashree_srinivasann_5b8ced4090de456ba84f5a563bbd235b.jpg'

type Frame = { src: string; caption: string; mark: string }

const FRAMES: Frame[] = [
  { src: pose0, caption: 'Namaskaram — the dance begins with reverence', mark: 'ARAMBHA' },
  { src: pose1, caption: 'The body takes flight, disciplined by years of practice', mark: 'GATI' },
  { src: pose2, caption: 'A mudra speaks where words cannot reach', mark: 'HASTA' },
  { src: pose3, caption: 'Balance forged through Aramandi, held with grace', mark: 'STHITI' },
  { src: pose4, caption: 'Bhava — emotion carried in a single, still gaze', mark: 'BHAVA' },
  { src: pose5, caption: 'The final pose: art, discipline, and life, complete', mark: 'POORNAM' },
]

const STEPS = FRAMES.length - 1

export default function DanceSequenceSection() {
  const { containerRef, progress, prefersReducedMotion } = useScrollProgress()

  // Which two frames we're between, and how far (0-1) between them
  const scaled = progress * STEPS
  const index = Math.min(STEPS - 1, Math.floor(scaled))
  const localT = scaled - index

  const activeIndex = localT < 0.5 ? index : Math.min(STEPS, index + 1)
  const frame = FRAMES[activeIndex]

  // Subtle cinematic camera: slow continuous zoom across the whole sequence,
  // not a per-frame rotation — avoids motion sickness per spec.
  const camScale = prefersReducedMotion ? 1 : 1.08 + progress * 0.14
  const camPanY = prefersReducedMotion ? 0 : -progress * 18 // px, gentle drift

  const dots = useMemo(() => FRAMES.map((_, i) => i), [])

  return (
    <section
      id="dance-journey"
      ref={containerRef}
      aria-label="Bharatanatyam scroll-controlled dance sequence"
      style={{ position: 'relative', height: '400vh', background: 'var(--dark-plum)' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Crossfading photographic frames, each with slow independent zoom */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {FRAMES.map((f, i) => {
            const dist = Math.abs(i - scaled)
            const opacity = Math.max(0, 1 - dist * 1.6)
            if (opacity <= 0.01) return null
            return (
              <div
                key={f.src}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity,
                  transition: prefersReducedMotion ? 'opacity 0.3s linear' : 'none',
                }}
              >
                <img
                  src={f.src}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                    transform: `scale(${camScale}) translateY(${camPanY}px)`,
                    filter: 'saturate(0.92) contrast(1.05)',
                  }}
                />
              </div>
            )
          })}
        </div>

        {/* Cinematic overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(36,16,45,0.55) 0%, rgba(36,16,45,0.15) 30%, rgba(36,16,45,0.35) 70%, rgba(36,16,45,0.9) 100%)',
          pointerEvents: 'none',
        }} />
        {!prefersReducedMotion && <GoldParticles density={26} />}

        {/* Caption + progress marks */}
        <div style={{
          position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: '760px',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.35em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '18px',
          }}>
            {frame.mark}
          </div>
          <p
            key={frame.caption}
            style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', color: 'var(--cream)',
              lineHeight: 1.4, textShadow: '0 4px 24px rgba(0,0,0,0.5)',
            }}
          >
            {frame.caption}
          </p>
        </div>

        {/* Progress dots */}
        <div style={{
          position: 'absolute', bottom: '48px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '10px', zIndex: 2,
        }}>
          {dots.map(i => (
            <div key={i} style={{
              width: i === activeIndex ? '22px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === activeIndex ? 'var(--gold)' : 'rgba(250, 244, 247, 0.35)',
              transition: 'all 0.35s ease',
            }} />
          ))}
        </div>

        {/* Scroll hint, only at the very start */}
        <div style={{
          position: 'absolute', bottom: '90px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 2, opacity: progress < 0.04 ? 1 : 0, transition: 'opacity 0.4s ease',
          fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.25em',
          color: 'var(--champagne)', textTransform: 'uppercase',
        }}>
          Scroll to continue the dance
        </div>
      </div>
    </section>
  )
}
