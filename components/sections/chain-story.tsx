'use client'

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { Check, Copy, Link2 } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'
import { Reveal, SplitReveal } from '@/components/motion/primitives'
import { UseCaseBadge } from '@/components/ui/brand'
import { cn } from '@/lib/cn'
import { featuredChain, glowFor, otherChains } from '@/lib/content'

const steps = featuredChain.steps

function Intro({ className }: { className?: string }) {
  return (
    <div className={className}>
      <SplitReveal
        className="display-md text-balance"
        lines={[['Seven prompts.'], [{ text: 'One launch-ready codebase.', className: 'text-white/45' }]]}
      />
    </div>
  )
}

function ChainMeta({ copied }: { copied: number }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-lg border border-mint/25 bg-mint/[0.07]">
        <Link2 className="size-4 text-mint" />
      </span>
      <div className="mr-2">
        <div className="text-[15px] font-semibold tracking-[-0.01em]">{featuredChain.name}</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
          {featuredChain.harnesses.join(' · ')} · {featuredChain.automation}
        </div>
      </div>
      <UseCaseBadge label={featuredChain.useCase} glow={glowFor(featuredChain.useCase)} />
      <span className="tabular rounded-full border border-mint/30 bg-mint/[0.06] px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-mint">
        {copied}/{steps.length} copied
      </span>
    </div>
  )
}

function StepCard({ i, done, current }: { i: number; done: boolean; current: boolean }) {
  const s = steps[i]
  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-[18px] border p-5 transition-[border-color,background-color,box-shadow] duration-500',
        current
          ? 'border-mint/40 bg-[#0b1411] shadow-[0_0_40px_-10px_rgba(92,255,176,.35)]'
          : done
            ? 'border-white/[0.09] bg-[#0a0b0b]'
            : 'border-white/[0.06] bg-[#070808]',
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'grid size-8 place-items-center rounded-full border font-mono text-[11px] font-semibold transition-colors duration-500',
            done ? 'border-mint bg-mint text-ink' : current ? 'border-mint text-mint' : 'border-white/15 text-white/40',
          )}
        >
          {done ? <Check className="size-4" strokeWidth={3} /> : i + 1}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">Step {String(i + 1).padStart(2, '0')}</span>
      </div>
      <div className={cn('mt-5 text-[16.5px] font-semibold leading-snug tracking-[-0.015em] transition-colors', done || current ? 'text-white' : 'text-white/55')}>
        {s.title}
      </div>
      <p className="mt-2 text-[13.5px] leading-relaxed text-white/45">{s.note}</p>
      <div className="mt-auto flex items-center gap-2 pt-5">
        <div className="h-[5px] flex-1 space-y-1">
          <span className="block h-[3px] w-[82%] rounded-full bg-white/[0.07]" />
        </div>
        <span
          className={cn(
            'flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-500',
            done ? 'border-mint/30 text-mint' : 'border-white/[0.08] text-white/40',
          )}
        >
          {done ? <Check className="size-3" /> : <Copy className="size-3" />} {done ? 'Copied' : 'Copy'}
        </span>
      </div>
    </div>
  )
}

export function ChainStory() {
  return (
    <section id="chains" className="relative">
      <PinnedChain />
      <StackedChain />
    </section>
  )
}

/* ── Desktop: horizontal pinned track ─────────────────────── */
function PinnedChain() {
  const ref = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 })
  const x = useTransform(p, [0.05, 0.95], [0, -distance])
  const rail = useTransform(p, [0.05, 0.95], ['0%', '100%'])
  const [copied, setCopied] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const k = Math.round(((v - 0.05) / 0.9) * steps.length)
    setCopied(Math.max(0, Math.min(steps.length, k)))
  })

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      const parent = track.current.parentElement!
      setDistance(Math.max(0, track.current.scrollWidth - parent.clientWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <div ref={ref} className="relative hidden h-[340vh] lg:block">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-x">
          <Intro />
          <p className="lede mt-4 max-w-[620px]">{featuredChain.description}</p>
        </div>
        <div className="container-x mt-10">
          <ChainMeta copied={copied} />
        </div>
        <div className="mt-8 overflow-hidden">
          <div className="container-x">
            <div className="relative">
              <Rail progress={rail} />
              <motion.div ref={track} className="flex w-max gap-5 pt-8" style={{ x }}>
                {steps.map((s, i) => (
                  <div key={s.title} className="h-[260px] w-[clamp(280px,24vw,330px)] shrink-0">
                    <StepCard i={i} done={i < copied} current={i === copied} />
                  </div>
                ))}
                <OtherChainsCard />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Rail({ progress }: { progress: MotionValue<string> }) {
  return (
    <div className="absolute inset-x-0 top-0 h-px bg-white/[0.07]">
      <motion.div className="relative h-full bg-mint shadow-[0_0_12px_rgba(92,255,176,.9)]" style={{ width: progress }}>
        <span className="absolute -right-1 -top-[3px] size-[7px] rounded-full bg-mint shadow-[0_0_12px_3px_rgba(92,255,176,.7)]" />
      </motion.div>
    </div>
  )
}

function OtherChainsCard() {
  return (
    <div className="flex h-[260px] w-[300px] shrink-0 flex-col justify-between rounded-[18px] border border-dashed border-white/[0.1] p-5">
      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">More chains</div>
      <div className="space-y-2.5">
        {otherChains.map((c) => (
          <div key={c.name} className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
            <Link2 className="size-3.5 shrink-0" style={{ color: glowFor(c.useCase) }} />
            <span className="truncate text-[13.5px] font-medium text-white/80">{c.name}</span>
            <span className="ml-auto shrink-0 font-mono text-[10px] text-white/35">{c.steps} steps</span>
          </div>
        ))}
      </div>
      <p className="text-[12.5px] text-white/40">Research, UX, legal and content. New chains ship with every drop.</p>
    </div>
  )
}

/* ── Mobile / tablet: vertical stepped list ───────────────── */
function StackedChain() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const rail = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const [copied, setCopied] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setCopied(Math.max(0, Math.min(steps.length, Math.round(v * steps.length)))))
  return (
    <div className="container-x py-[clamp(72px,12vw,120px)] lg:hidden">
      <Intro />
      <Reveal delay={0.1}>
        <p className="lede mt-6">{featuredChain.description}</p>
      </Reveal>
      <div className="mt-8">
        <ChainMeta copied={copied} />
      </div>
      <ol ref={ref} className="relative mt-8 space-y-3 pl-8">
        <span className="absolute bottom-4 left-[11px] top-4 w-px bg-white/[0.07]" aria-hidden>
          <motion.span className="block w-full bg-mint shadow-[0_0_10px_rgba(92,255,176,.8)]" style={{ height: rail }} />
        </span>
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <span
              className={cn(
                'absolute -left-8 top-5 grid size-[23px] place-items-center rounded-full border bg-[#020304] font-mono text-[10px] transition-colors duration-500',
                i < copied ? 'border-mint bg-mint text-ink' : 'border-white/15 text-white/40',
              )}
              aria-hidden
            >
              {i < copied ? <Check className="size-3" strokeWidth={3} /> : i + 1}
            </span>
            <div className={cn('rounded-2xl border p-4 transition-colors duration-500', i < copied ? 'border-white/[0.1] bg-[#0a0b0b]' : 'border-white/[0.06] bg-[#070808]')}>
              <div className="text-[15px] font-semibold leading-snug tracking-[-0.01em]">{s.title}</div>
              <p className="mt-1 text-[13.5px] leading-relaxed text-white/45">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
