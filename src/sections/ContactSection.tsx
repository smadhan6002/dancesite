import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import contactImage from '../assets/raiveeson_7a2e458cf19d45658d947283309892cd.jpg'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--color-border)',
  padding: '12px 0',
  fontFamily: "var(--font-body)",
  fontSize: '16px',
  color: 'var(--deep-purple)',
  outline: 'none',
  transition: 'border-color 0.3s ease',
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: '12px',
  letterSpacing: '0.2em',
  fontWeight: 600,
  color: 'var(--gold)',
  textTransform: 'uppercase' as const,
  display: 'block',
  marginBottom: '8px',
}

const ADMIN_WHATSAPP_NUMBER = "919840000000"; // Replace with actual Admin WhatsApp number

export default function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [course, setCourse] = useState('Bharatanatyam')
  const [message, setMessage] = useState('')
  
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    const whatsappText = `Hello Chathur Lakshana Academy,

I would like to make an enquiry.

━━━━━━━━━━━━━━━━

Name: ${name}
Phone: ${phone || 'Not provided'}
Email: ${email}
Course: ${course}

Message:
${message || 'No additional message'}

━━━━━━━━━━━━━━━━

This enquiry was submitted through the Chathur Lakshana Academy website.
Thank you.`

    const encodedText = encodeURIComponent(whatsappText)
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodedText}`
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank")
    
    // Show instruction state
    setSubmitted(true)
    setIsSubmitting(false)

    // Reset form after a delay
    setTimeout(() => {
      setSubmitted(false)
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setCourse('Bharatanatyam')
    }, 6000)
  }

  return (
    <section
      id="contact"
      style={{
        backgroundColor: 'var(--cream)',
        padding: '140px 0',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em',
              color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '16px',
            }}>✧ ENROLMENT</div>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 400,
              color: 'var(--deep-purple)', marginBottom: '20px',
            }}>Begin your journey</h2>
            <div style={{
              width: '60px', height: '1.5px',
              background: 'var(--gold)',
              margin: '0 auto 24px',
            }} />
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)', fontStyle: 'italic', color: 'var(--luxury-purple)', lineHeight: 1.7,
            }}>
              New batches open every quarter for children and adults alike.
            </p>
          </div>
        </FadeIn>

        {/* Two column: image info + form */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
        }} className="contact-grid">
          {/* Left: image + studio info */}
          <FadeIn delay={0.1}>
            <div>
              <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '32px', border: '1px solid var(--gold)', padding: '12px' }}>
                <img
                  src={contactImage}
                  alt="Bharatanatyam dancer"
                  style={{
                    width: '100%', aspectRatio: '4/3',
                    objectFit: 'cover', display: 'block',
                    filter: 'contrast(1.05)',
                  }}
                />
                {/* Overlay info */}
                <div style={{
                  position: 'absolute', bottom: '12px', left: '12px', right: '12px',
                  padding: '60px 28px 28px',
                  background: 'linear-gradient(to top, rgba(36, 16, 45, 0.95), rgba(36, 16, 45, 0.6), transparent)',
                }}>
                  <div style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '12px', letterSpacing: '0.2em', fontWeight: 600,
                    color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '10px',
                  }}>STUDIO</div>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '16px', color: 'var(--cream)', lineHeight: 1.6, fontWeight: 400,
                  }}>
                    Chathur Lakshana Academy of Fine Arts,<br/>Mylapore, Chennai 600004
                  </p>
                  <div style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '12px', letterSpacing: '0.2em', fontWeight: 600,
                    color: 'var(--gold)', textTransform: 'uppercase',
                    marginTop: '24px', marginBottom: '8px',
                  }}>CLASS HOURS</div>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '16px', color: 'var(--cream)', fontWeight: 400,
                  }}>
                    Tue–Thu 5–8 pm · Sat &amp; Sun 8 am–1 pm
                  </p>
                </div>
              </div>

              {/* Contact boxes */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { label: 'PHONE', value: '+91 98400 00000' },
                  { label: 'EMAIL', value: 'info@chathurlakshana.in' },
                ].map(c => (
                  <div key={c.label} style={{
                    border: '1px solid var(--color-border)',
                    padding: '24px',
                    backgroundColor: 'transparent',
                  }}>
                    <div style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '12px', letterSpacing: '0.2em', fontWeight: 600,
                      color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '12px',
                    }}>{c.label}</div>
                    <div style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '15px', color: 'var(--deep-purple)', fontWeight: 500,
                    }}>{c.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: Enquiry form */}
          <FadeIn delay={0.2}>
            <div style={{
              backgroundColor: 'var(--cream)',
              border: '1px solid var(--color-border)',
              padding: '56px 48px',
              boxShadow: '0 10px 40px rgba(50, 20, 63, 0.05)',
            }}>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: '13px', letterSpacing: '0.2em', fontWeight: 600,
                color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '40px',
              }}>SEND AN ENQUIRY</div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center', padding: '60px 20px',
                    fontFamily: "var(--font-display)",
                    fontSize: '26px', color: 'var(--deep-purple)',
                  }}
                >
                  ✦ Opening WhatsApp...<br />
                  <span style={{ fontSize: '16px', color: 'var(--luxury-purple)', fontStyle: 'italic', fontFamily: 'var(--font-body)', display: 'block', marginTop: '16px', lineHeight: 1.6 }}>
                    Your enquiry is ready to send.<br/>Please review the message and press Send in the WhatsApp app.
                  </span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <div>
                    <label style={labelStyle}>FULL NAME</label>
                    <input type="text" required placeholder="" style={inputStyle}
                      value={name} onChange={e => setName(e.target.value)}
                      onFocus={e => e.currentTarget.style.borderBottomColor = 'var(--gold)'}
                      onBlur={e => e.currentTarget.style.borderBottomColor = 'var(--color-border)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>EMAIL</label>
                    <input type="email" required placeholder="" style={inputStyle}
                      value={email} onChange={e => setEmail(e.target.value)}
                      onFocus={e => e.currentTarget.style.borderBottomColor = 'var(--gold)'}
                      onBlur={e => e.currentTarget.style.borderBottomColor = 'var(--color-border)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>PHONE</label>
                    <input type="tel" placeholder="" style={inputStyle}
                      value={phone} onChange={e => setPhone(e.target.value)}
                      onFocus={e => e.currentTarget.style.borderBottomColor = 'var(--gold)'}
                      onBlur={e => e.currentTarget.style.borderBottomColor = 'var(--color-border)'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>COURSE OF INTEREST</label>
                    <select
                      value={course}
                      onChange={e => setCourse(e.target.value)}
                      style={{
                        ...inputStyle,
                        cursor: 'pointer',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23D6A84F' strokeWidth='1.5' fill='none'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 4px center',
                        paddingRight: '24px',
                      }}
                    >
                      <option>Bharatanatyam</option>
                      <option>Carnatic Vocal</option>
                      <option>Choreography & Theory</option>
                      <option>Fine Arts Studio</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>MESSAGE</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                      }}
                      onFocus={e => e.currentTarget.style.borderBottomColor = 'var(--gold)'}
                      onBlur={e => e.currentTarget.style.borderBottomColor = 'var(--color-border)'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '18px',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      fontFamily: "var(--font-body)",
                      fontSize: '14px', fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginTop: '16px',
                      opacity: isSubmitting ? 0.7 : 1,
                      color: 'var(--deep-purple)',
                    }}
                  >
                    {isSubmitting ? 'PROCESSING...' : 'SEND ENQUIRY'}
                  </button>
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '13px', color: 'var(--luxury-purple)', lineHeight: 1.5,
                  }}>
                    This form will securely open WhatsApp with your pre-filled enquiry details.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
