'use client'

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { Children, useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export const EASE = [0.22, 1, 0.36, 1] as const

/* ── Reveal: fade + rise + de-blur on enter ─────────────────── */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  blur = 8,
  as = 'div',
  amount = 0.25,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  blur?: number
  as?: 'div' | 'section' | 'li' | 'span' | 'p' | 'article'
  amount?: number
}) {
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Comp>
  )
}

/* ── Stagger group ─────────────────────────────────────────── */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
}

/* ── SplitReveal: masked word-by-word rise ─────────────────── */
type Seg = string | { text: string; className?: string }

export function SplitReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.06,
  as: Tag = 'h2',
  immediate = false,
}: {
  lines: Seg[][]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
  as?: ElementType
  immediate?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const show = immediate || inView
  let wordIndex = 0
  const label = lines.map((l) => l.map((s) => (typeof s === 'string' ? s : s.text)).join('')).join(' ')

  return (
    <Tag ref={ref} className={className} aria-label={label}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className={cn('block', lineClassName)}>
          {line.flatMap((seg, si) => {
            const text = typeof seg === 'string' ? seg : seg.text
            const segClass = typeof seg === 'string' ? undefined : seg.className
            return text
              .split(/(\s+)/)
              .filter(Boolean)
              .map((word, wi) => {
                if (/^\s+$/.test(word)) return <span key={`${si}-${wi}`}> </span>
                const i = wordIndex++
                return (
                  <span key={`${si}-${wi}`} className="inline-block overflow-hidden pb-[0.2em] -mb-[0.2em] align-bottom">
                    <motion.span
                      className={cn('inline-block will-change-transform', segClass)}
                      initial={{ y: '110%', rotate: 4 }}
                      animate={show ? { y: '0%', rotate: 0 } : undefined}
                      transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
                    >
                      {word}
                    </motion.span>
                  </span>
                )
              })
          })}
        </span>
      ))}
    </Tag>
  )
}

/* ── ScrubText: word opacity scrubbed by scroll ────────────── */
export function ScrubText({
  text,
  className,
  highlight = [],
  offset = ['start 0.85', 'end 0.45'],
}: {
  text: string
  className?: string
  highlight?: string[]
  offset?: [string, string]
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as never })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        const clean = w.replace(/[^\w’'-]/g, '')
        return (
          <ScrubWord key={i} progress={scrollYProgress} range={[start, end]} mint={highlight.includes(clean)}>
            {w}
          </ScrubWord>
        )
      })}
    </p>
  )
}

function ScrubWord({
  children,
  progress,
  range,
  mint,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  mint: boolean
}) {
  const opacity = useTransform(progress, range, [0.16, 1])
  const reduce = useReducedMotion()
  return (
    <>
      <motion.span style={{ opacity: reduce ? 1 : opacity }} className={mint ? 'text-mint' : undefined}>
        {children}
      </motion.span>{' '}
    </>
  )
}

/* ── Parallax: translate on scroll relative to own position ─── */
export function Parallax({
  children,
  className,
  speed = 0.2,
  style,
}: {
  children: ReactNode
  className?: string
  speed?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`])
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: reduce ? 0 : y }}>
      {children}
    </motion.div>
  )
}

/* ── Magnetic: element follows pointer slightly ────────────── */
export function Magnetic({ children, strength = 0.25, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  return (
    <motion.div
      ref={ref}
      className={cn('inline-flex', className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

/* ── Counter: counts up when in view ───────────────────────── */
export function Counter({ to, duration = 1.6, className, suffix = '' }: { to: number; duration?: number; className?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [val, setVal] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000))
      const eased = 1 - Math.pow(1 - p, 4)
      setVal(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])
  return (
    <span ref={ref} className={cn('tabular', className)}>
      {val}
      {suffix}
    </span>
  )
}

/* ── Marquee ───────────────────────────────────────────────── */
export function Marquee({
  children,
  reverse = false,
  duration = 40,
  className,
}: {
  children: ReactNode
  reverse?: boolean
  duration?: number
  className?: string
}) {
  const items = Children.toArray(children)
  return (
    <div className={cn('marquee edge-fade-x overflow-hidden', className)}>
      <div
        className="marquee-track flex w-max"
        data-reverse={reverse}
        style={{ ['--marquee-dur' as string]: `${duration}s` }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items}
          </div>
        ))}
      </div>
    </div>
  )
}
