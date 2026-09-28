'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/* ── Proximity group (port of be-promptful hooks/use-proximity) ── */
export function ProximityGroup({
  children,
  className,
  radius = 160,
  maxScale = 0.05,
  maxBrightness = 0.18,
  dimFloor = 0.9,
}: {
  children: ReactNode
  className?: string
  radius?: number
  maxScale?: number
  maxBrightness?: number
  dimFloor?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef<number | null>(null)
  const enabled = useRef(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarse = window.matchMedia('(pointer: coarse)')
    const update = () => {
      enabled.current = !reduce.matches && !coarse.matches
    }
    update()
    reduce.addEventListener('change', update)
    coarse.addEventListener('change', update)
    return () => {
      reduce.removeEventListener('change', update)
      coarse.removeEventListener('change', update)
    }
  }, [])

  const els = useCallback(() => (ref.current ? Array.from(ref.current.querySelectorAll<HTMLElement>('[data-prox]')) : []), [])

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={(e) => {
        if (!enabled.current) return
        const { clientX: cx, clientY: cy } = e
        if (frame.current != null) cancelAnimationFrame(frame.current)
        frame.current = requestAnimationFrame(() => {
          for (const el of els()) {
            const r = el.getBoundingClientRect()
            const dist = Math.hypot(cx - (r.left + r.width / 2), cy - (r.top + r.height / 2))
            const t = Math.max(0, 1 - dist / radius)
            el.style.transform = `scale(${1 + t * maxScale})`
            el.style.filter = `brightness(${dimFloor + t * (1 + maxBrightness - dimFloor)})`
            el.style.zIndex = t > 0.1 ? '1' : ''
          }
        })
      }}
      onPointerLeave={() => {
        if (frame.current != null) cancelAnimationFrame(frame.current)
        for (const el of els()) {
          el.style.transform = ''
          el.style.filter = ''
          el.style.zIndex = ''
        }
      }}
    >
      {children}
    </div>
  )
}

/* ── Spotlight card: cursor-following mint wash + border light ── */
export function SpotlightCard({
  children,
  className,
  color = '92,255,176',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  color?: string
  as?: 'div' | 'article' | 'li'
}) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <Tag
      ref={ref as never}
      className={cn('group/spot relative isolate overflow-hidden', className)}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${e.clientX - r.left}px`)
        el.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(520px circle at var(--mx, 50%) var(--my, 0%), rgba(${color},0.075), transparent 42%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          padding: 1,
          background: `radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), rgba(${color},0.45), transparent 40%)`,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {children}
    </Tag>
  )
}

/* ── Tilt: subtle 3D tilt toward pointer ───────────────────── */
export function Tilt({ children, className, max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 140, damping: 18 })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 140, damping: 18 })
  return (
    <div className={cn('[perspective:1400px]', className)}>
      <motion.div
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        onPointerMove={(e) => {
          if (e.pointerType !== 'mouse') return
          const r = e.currentTarget.getBoundingClientRect()
          px.set((e.clientX - r.left) / r.width)
          py.set((e.clientY - r.top) / r.height)
        }}
        onPointerLeave={() => {
          px.set(0.5)
          py.set(0.5)
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ── ScaleToFit: render UI at a fixed design width, scale to container ── */
export function ScaleToFit({
  width,
  height,
  children,
  className,
}: {
  width: number
  height: number
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useIsoLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])
  return (
    <div ref={ref} className={cn('relative w-full', className)} style={{ aspectRatio: `${width} / ${height}` }}>
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
