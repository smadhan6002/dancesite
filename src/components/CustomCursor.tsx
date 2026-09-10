import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable on desktop
    if (window.matchMedia('(hover: none)').matches) return

    let mx = 0, my = 0
    let rx = 0, ry = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      rx = lerp(rx, mx, 0.12)
      ry = lerp(ry, my, 0.12)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(animate)
    }

    // Detect interactive elements
    const handleEnterInteractive = () => setIsHovering(true)
    const handleLeaveInteractive = () => setIsHovering(false)

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleEnterInteractive)
      el.addEventListener('mouseleave', handleLeaveInteractive)
    })

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleEnterInteractive)
        el.removeEventListener('mouseleave', handleLeaveInteractive)
      })
    }
  }, [isVisible])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <>
      {/* Dot - follows cursor precisely */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '6px' : '5px',
          height: isHovering ? '6px' : '5px',
          backgroundColor: '#D6A84F',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease, width 0.2s ease, height 0.2s ease',
          willChange: 'transform',
        }}
      />
      {/* Ring - lags behind cursor */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '40px' : '28px',
          height: isHovering ? '40px' : '28px',
          border: `1px solid ${isHovering ? 'rgba(214, 168, 79, 0.8)' : 'rgba(214, 168, 79, 0.4)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9997,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease, width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
