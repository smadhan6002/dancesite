import { motion } from 'framer-motion'
import heroImage from '../assets/Purana Manjari 2019.jpg.jpeg'
import GoldParticles from '../components/GoldParticles'

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--deep-purple)', // Fallback background
      }}
    >
      {/* Background Image with Parallax Scale */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url('${heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%', // Shifted slightly to keep focus on dancer
          backgroundRepeat: 'no-repeat',
        }} 
      />

      {/* Deep Purple Cinematic Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(50, 20, 63, 0.4) 0%, rgba(50, 20, 63, 0.85) 100%)', 
          pointerEvents: 'none',
        }} 
      />

      {/* Subtle Gold Radial Highlight */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(circle at center, rgba(214, 168, 79, 0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }} 
      />

      {/* Ambient gold atmosphere */}
      <GoldParticles density={40} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '900px',
        width: '100%',
      }}>
        {/* Decorative Indian Pattern (Top) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: '24px',
            color: 'var(--gold)',
            marginBottom: '16px',
            opacity: 0.8,
          }}
        >
          ✧
        </motion.div>

        {/* Small Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.25em',
            color: 'var(--champagne)',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          TRADITIONAL ARTS ACADEMY
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hero-title"
          style={{ 
            marginBottom: '0',
            color: 'var(--cream)',
            textShadow: '0 4px 20px rgba(36, 16, 45, 0.5)'
          }}
        >
          <span style={{ display: 'block' }}>Art &middot; Discipline &middot; Life</span>
        </motion.h1>

        {/* Gold decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            width: '80px', height: '1.5px',
            background: 'var(--gold)',
            margin: '32px auto',
            boxShadow: '0 0 10px rgba(214, 168, 79, 0.5)'
          }} 
        />

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
            fontStyle: 'italic',
            color: 'var(--light-lavender)',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto',
            textShadow: '0 2px 10px rgba(36, 16, 45, 0.5)'
          }}
        >
          Rooted in culture. Guided by gurus.<br/>
          Inspiring excellence in every learner.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            marginTop: '56px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => document.querySelector('#courses')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '16px 40px',
              cursor: 'pointer',
              color: 'var(--deep-purple)', // Dark purple text on gold
              border: '1px solid var(--gold)',
            }}
          >
            EXPLORE COURSES
          </button>
          <button
            onClick={() => document.querySelector('#academy')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '16px 40px',
              cursor: 'pointer',
              color: 'var(--cream)',
              borderColor: 'rgba(214, 168, 79, 0.5)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(214, 168, 79, 0.1)'
              e.currentTarget.style.borderColor = 'var(--gold)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(214, 168, 79, 0.5)'
            }}
          >
            OUR ACADEMY
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute', bottom: '40px', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}
      >
        <div style={{
          width: '1px', height: '80px',
          background: 'linear-gradient(to bottom, var(--gold), transparent)',
          opacity: 0.6,
        }} />
      </motion.div>
    </section>
  )
}
