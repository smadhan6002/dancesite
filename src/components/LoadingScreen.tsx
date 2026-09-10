import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Animate progress from 0 to 100 over ~1.8s
    const start = performance.now()
    const duration = 1800

    const tick = (now: number) => {
      const elapsed = now - start
      const p = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(p)
      if (p < 100) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setVisible(false)
          setTimeout(onComplete, 600)
        }, 200)
      }
    }
    requestAnimationFrame(tick)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#24102D',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          {/* CL Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div style={{
              width: '72px',
              height: '72px',
              border: '1px solid rgba(214, 168, 79, 0.6)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '28px',
              fontWeight: 500,
              color: '#D6A84F',
              letterSpacing: '0.05em',
              boxShadow: '0 0 30px rgba(214, 168, 79, 0.2)',
            }}>
              CL
            </div>
            <div style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              color: 'rgba(214, 168, 79, 0.7)',
              textTransform: 'uppercase',
            }}>
              CHATHUR LAKSHANA
            </div>
          </motion.div>

          {/* Gold Progress Bar */}
          <div style={{ width: '200px', position: 'relative' }}>
            <div style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(214, 168, 79, 0.15)',
            }} />
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '1px',
                backgroundColor: '#D6A84F',
                boxShadow: '0 0 8px rgba(214, 168, 79, 0.6)',
                width: `${progress}%`,
              }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: 'rgba(233, 221, 235, 0.5)',
              textTransform: 'uppercase',
            }}
          >
            ENTERING THE WORLD OF CLASSICAL ARTS
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
