import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'ACADEMY', href: '#academy' },
  { label: 'FOUNDER', href: '#founder' },
  { label: 'COURSES', href: '#courses' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(50, 20, 63, 0.95)' : 'transparent', // deep-purple when scrolled
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(214, 168, 79, 0.2)' : '1px solid transparent',
        transition: 'all 0.4s ease',
        // Ensure navbar respects viewport width
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // Responsive horizontal padding
        padding: '0 24px',
        height: scrolled ? '72px' : '96px', // Compacts on scroll
        maxWidth: '100%',
        transition: 'height 0.4s ease',
        // Allow logo and brand to wrap on very small screens
        flexWrap: 'wrap',
      }}>
        {/* Logo */}
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <div style={{
            width: '42px', height: '42px',
            border: '1px solid var(--color-accent)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-accent)',
            fontFamily: "var(--font-display)",
            fontSize: '18px',
            fontWeight: 500,
            letterSpacing: '0.05em',
          }}>CL</div>
          <div>
            <div style={{
              fontFamily: "var(--font-display)",
               // Responsive logo text size using clamp
               fontSize: 'clamp(0.9rem, 2vw, 1rem)',
               fontWeight: 600,
               letterSpacing: '0.15em',
               color: 'var(--cream)',
               textTransform: 'uppercase',
            }}>CHATHUR LAKSHANA</div>
            <div style={{
              fontFamily: "var(--font-body)",
               // Responsive subtext size
               fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
               fontWeight: 500,
               letterSpacing: '0.18em',
               color: 'var(--color-accent)',
               textTransform: 'uppercase',
            }}>ACADEMY OF FINE ARTS</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: '2px solid transparent',
                cursor: 'pointer',
                fontFamily: "var(--font-body)",
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.15em',
                color: 'var(--cream)',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                padding: '4px 0',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--color-accent)';
                e.currentTarget.style.borderBottom = '2px solid var(--color-accent)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--cream)';
                e.currentTarget.style.borderBottom = '2px solid transparent';
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="btn-primary"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '12px 28px',
              cursor: 'pointer',
              color: 'var(--deep-purple)', // Purple text on gold button
            }}
          >
            ENROL NOW
          </button>
        </div>

        {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: '1px solid rgba(214, 168, 79, 0.4)',
              cursor: 'pointer',
              width: '48px', height: '48px',
              alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '5px',
              padding: '8px',
              zIndex: 200,
            }}
            className="mobile-menu-btn"
          >
            <span style={{ display: 'block', width: '18px', height: '1.5px', backgroundColor: 'var(--cream)', transition: 'transform 0.3s ease', transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ display: 'block', width: '18px', height: '1.5px', backgroundColor: 'var(--cream)', opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.3s ease' }} />
            <span style={{ display: 'block', width: '18px', height: '1.5px', backgroundColor: 'var(--cream)', transition: 'transform 0.3s ease', transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
               position: 'fixed',
               top: 0,
               left: 0,
               right: 0,
               backgroundColor: 'var(--deep-purple)',
               borderTop: '1px solid rgba(214, 168, 79, 0.2)',
               overflow: 'hidden',
               boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
               zIndex: 150,
             }}
          >
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 24px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "var(--font-body)",
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  color: 'var(--cream)',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(214, 168, 79, 0.1)',
                }}
              >{link.label}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          nav .btn-primary { display: none !important; }
          /* Hide desktop navigation on mobile */
          nav > div > div:not(.mobile-menu-btn) { display: none !important; }
          /* Ensure logo area wraps nicely */
          nav a { flex-wrap: wrap; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </motion.nav>
  )
}
