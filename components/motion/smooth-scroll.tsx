'use client'

import { MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState } from 'react'

const LenisContext = createContext<Lenis | null>(null)
export const useLenis = () => useContext(LenisContext)

/** Inertial smooth scrolling. Native scroll events still fire, so framer's useScroll keeps working. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    })
    let raf = 0
    const loop = (time: number) => {
      instance.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    setLenis(instance)
    return () => {
      cancelAnimationFrame(raf)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
    </MotionConfig>
  )
}

/** Scroll to an element or y offset, via Lenis when active. */
export function scrollToTarget(lenis: Lenis | null, target: string | number | HTMLElement, offset = -88) {
  if (lenis) {
    lenis.scrollTo(target as never, { offset, duration: 1.4 })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (el) {
    const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
