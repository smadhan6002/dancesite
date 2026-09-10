import { useEffect, useRef } from 'react'

/**
 * Subtle ambient gold dust — pure canvas, no libraries.
 * Pauses when off-screen and respects prefers-reduced-motion.
 */
export default function GoldParticles({ density = 34 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2)
    let visible = true
    let rafId = 0

    type P = { x: number; y: number; r: number; s: number; o: number; drift: number }
    let particles: P[] = []

    const resize = () => {
      const parent = canvas.parentElement
      width = parent ? parent.clientWidth : window.innerWidth
      height = parent ? parent.clientHeight : window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const init = () => {
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.6,
        s: 0.15 + Math.random() * 0.35,
        o: 0.15 + Math.random() * 0.45,
        drift: (Math.random() - 0.5) * 0.3,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.y -= p.s
        p.x += p.drift
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(214, 168, 79, ${p.o})`
        ctx.shadowColor = 'rgba(231, 200, 121, 0.8)'
        ctx.shadowBlur = 4
        ctx.fill()
      }
      rafId = requestAnimationFrame(draw)
    }

    resize()
    init()

    if (!reduceMotion) {
      rafId = requestAnimationFrame(draw)
    } else {
      draw() // draw a single static frame, no loop
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (!reduceMotion) {
        if (visible && !rafId) rafId = requestAnimationFrame(draw)
        if (!visible && rafId) { cancelAnimationFrame(rafId); rafId = 0 }
      }
    }, { threshold: 0 })
    io.observe(canvas)

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      io.disconnect()
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        opacity: 0.8,
      }}
    />
  )
}
