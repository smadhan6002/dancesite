import { useEffect, useRef, useState } from 'react'

/**
 * Tracks 0→1 scroll progress through a tall "pinned" container.
 * As the container enters/passes the viewport, progress advances;
 * scrolling back up smoothly reverses it (no separate "reverse" logic
 * needed — it's purely derived from scroll position every frame).
 */
export function useScrollProgress(containerHeightVh = 400) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const onChange = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    let rafId = 0

    const compute = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // Total scrollable distance while this container is "active"
      const total = rect.height - vh
      if (total <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0)
        return
      }
      const scrolled = -rect.top
      const p = Math.min(1, Math.max(0, scrolled / total))
      setProgress(p)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [containerHeightVh])

  return { containerRef, progress, prefersReducedMotion }
}
