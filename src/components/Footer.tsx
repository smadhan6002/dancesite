export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--dark-plum)', // Deepest purple for footer
        borderTop: '1px solid rgba(214, 168, 79, 0.2)',
        padding: '100px 48px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle traditional dots */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '3px', height: '3px',
          borderRadius: '50%',
          backgroundColor: 'var(--gold)',
          opacity: 0.3,
          top: `${Math.random() * 80}%`,
          left: `${10 + i * 12}%`,
        }} />
      ))}

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '80px',
          marginBottom: '80px',
        }} className="footer-grid">
          {/* Brand column */}
          <div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: '20px', fontWeight: 600, letterSpacing: '0.15em',
              color: 'var(--cream)', textTransform: 'uppercase', marginBottom: '8px',
            }}>CHATHUR LAKSHANA</div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '11px', letterSpacing: '0.2em', fontWeight: 500,
              color: 'var(--champagne)',
              textTransform: 'uppercase', marginBottom: '24px',
            }}>ACADEMY OF FINE ARTS</div>
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: '15px', fontStyle: 'italic',
              color: 'var(--light-lavender)',
              lineHeight: 1.8, maxWidth: '320px',
            }}>
              Preserving tradition, inspiring excellence and celebrating Bharatanatyam from the heart of Mylapore, Chennai.
            </p>
          </div>

          {/* Academy column */}
          <div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px', letterSpacing: '0.2em', fontWeight: 600,
              color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '24px',
            }}>ACADEMY</div>
            {['About', 'Founder', 'Courses'].map(link => (
              <div key={link} style={{ marginBottom: '16px' }}>
                <button
                  onClick={() => {
                    const map: Record<string, string> = { About: '#academy', Founder: '#founder', Courses: '#courses' }
                    document.querySelector(map[link])?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "var(--font-body)", fontWeight: 500,
                    fontSize: '15px', color: 'var(--light-lavender)',
                    transition: 'color 0.3s ease',
                    padding: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--champagne)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--light-lavender)'}
                >{link}</button>
              </div>
            ))}
          </div>

          {/* Experience column */}
          <div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px', letterSpacing: '0.2em', fontWeight: 600,
              color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '24px',
            }}>EXPERIENCE</div>
            {[
              { label: 'Performances', href: '#gallery' },
              { label: 'Gallery', href: '#gallery' },
              { label: 'Contact', href: '#contact' },
              { label: 'Admin Login', href: '/admin' },
            ].map(link => (
              <div key={link.label} style={{ marginBottom: '16px' }}>
                <button
                  onClick={() => {
                    if (link.href.startsWith('/')) {
                      window.location.href = link.href;
                    } else {
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "var(--font-body)", fontWeight: 500,
                    fontSize: '15px', color: 'var(--light-lavender)',
                    transition: 'color 0.3s ease',
                    padding: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--champagne)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--light-lavender)'}
                >{link.label}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          borderTop: '1px solid rgba(214, 168, 79, 0.2)',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div style={{
            fontFamily: "var(--font-body)", fontWeight: 500,
            fontSize: '13px', color: 'var(--light-lavender)',
          }}>
            © 2026 Chathur Lakshana Academy of Fine Arts, Chennai.
          </div>
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: '14px', fontStyle: 'italic', fontWeight: 500,
            color: 'var(--champagne)',
          }}>
            Angikam bhuvanam yasya — the world is his body.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </footer>
  )
}
