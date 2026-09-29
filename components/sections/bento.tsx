'use client'

/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import { Heart, Newspaper, Play } from 'lucide-react'
import { ProximityGroup, SpotlightCard } from '@/components/motion/interactive'
import { EASE, Reveal, SplitReveal, Stagger, staggerItem } from '@/components/motion/primitives'
import { MediaArt } from '@/components/mock/media-art'
import { cn } from '@/lib/cn'
import { harnesses, models, platforms, useCases } from '@/lib/content'

function CardShell({ className, title, body, children }: { className?: string; title: string; body: string; children: React.ReactNode }) {
  return (
    <motion.div variants={staggerItem} className={cn('min-w-0', className)}>
      <SpotlightCard className="flex h-full flex-col rounded-[22px] border border-white/[0.07] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
        <div className="relative min-h-[220px] flex-1 overflow-hidden">{children}</div>
        <div className="border-t border-white/[0.05] p-6">
          <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{title}</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-white/50">{body}</p>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

function UseCaseConstellation() {
  return (
    <ProximityGroup className="flex h-full flex-wrap content-center justify-center gap-2 p-6 sm:p-8" radius={140} maxScale={0.08}>
      {useCases.map((u, i) => (
        <motion.span
          key={u.label}
          data-prox
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.03 }}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-[transform,filter] duration-200 ease-out"
          style={{
            background: `color-mix(in srgb, ${u.glow} 9%, #080909)`,
            border: `1px solid color-mix(in srgb, ${u.glow} 32%, transparent)`,
            color: `color-mix(in srgb, ${u.glow} 65%, white)`,
            boxShadow: `0 0 18px -6px color-mix(in srgb, ${u.glow} 45%, transparent)`,
          }}
        >
          <span className="size-1.5 rounded-full" style={{ background: u.glow, boxShadow: `0 0 8px ${u.glow}` }} />
          {u.label}
        </motion.span>
      ))}
    </ProximityGroup>
  )
}

function FilterPanel() {
  const rows = [
    { k: 'Runs in', items: harnesses.slice(0, 3) },
    { k: 'Model', items: models.slice(0, 3) },
    { k: 'Built for', items: platforms.slice(0, 3) },
  ]
  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      {rows.map((r, ri) => (
        <div key={r.k}>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/30">{r.k}</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {r.items.map((t, i) => (
              <span
                key={t.label}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[11.5px]',
                  i === ri ? 'border-mint/45 bg-mint/[0.08] text-mint' : 'border-white/[0.07] bg-white/[0.02] text-white/55',
                )}
              >
                <img src={t.logo} alt="" className={cn('size-3.5 object-contain', t.invert && 'invert')} loading="lazy" />
                {t.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function MediaMosaic() {
  return (
    <div className="absolute inset-0 grid grid-cols-[0.8fr_1fr] grid-rows-2 gap-2 p-4">
      <MediaArt k="neonRain" className="row-span-2 rounded-xl" sizes="200px" />
      <MediaArt k="glassIcon" className="rounded-xl" sizes="200px" />
      <div className="relative overflow-hidden rounded-xl">
        <MediaArt k="clockwork" className="absolute inset-0" sizes="200px" />
        <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/40 backdrop-blur">
          <Play className="ml-0.5 size-3.5 fill-white text-white" />
        </span>
        <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 font-mono text-[9px] text-white/70">0:30</span>
      </div>
    </div>
  )
}

function Favorites() {
  const items = [
    ['Production Code Review for Bugs and Vulnerabilities', '#3b82f6', 'Used 9×'],
    ['Viral Content Hook Strategist [Long-Form]', '#a855f7', 'Used 6×'],
    ['Terms of Service Generation', '#f59e0b', 'Used 4×'],
  ]
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-6">
      <div className="mb-1 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/30">
        <span>Most used</span>
        <Heart className="size-3.5 fill-[#ff5a7a] text-[#ff5a7a]" />
      </div>
      {items.map(([t, c, u], i) => (
        <motion.div
          key={t}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.1 }}
          className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
        >
          <span className="size-1.5 shrink-0 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
          <span className="truncate text-[12.5px] text-white/75">{t}</span>
          <span className="ml-auto shrink-0 font-mono text-[9.5px] text-white/35">{u}</span>
        </motion.div>
      ))}
    </div>
  )
}

function KnowledgeLayer() {
  const rows = [
    ['Agents', 'Claude Co-Work', 'Rising'],
    ['Video', 'Seedance 2.0', 'New'],
    ['Research', 'Perplexity Comet', 'Steady'],
    ['Image', 'GPT Image 2', 'Rising'],
  ]
  return (
    <div className="flex h-full flex-col justify-center p-6">
      <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/30">
        <Newspaper className="size-3.5" /> 2026 AI Tool Index · Fri
      </div>
      <div className="mt-3 divide-y divide-white/[0.05] rounded-xl border border-white/[0.06] bg-white/[0.015]">
        {rows.map(([cat, tool, trend]) => (
          <div key={tool} className="flex items-center gap-3 px-3 py-2 text-[12px]">
            <span className="w-16 shrink-0 font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/30">{cat}</span>
            <span className="truncate text-white/75">{tool}</span>
            <span className={cn('ml-auto shrink-0 rounded px-1.5 font-mono text-[9px]', trend === 'New' ? 'bg-mint/10 text-mint' : trend === 'Rising' ? 'text-mint/70' : 'text-white/35')}>
              {trend}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Bento() {
  return (
    <section id="features" className="relative py-[clamp(96px,13vw,180px)]">
      <div className="container-x">
        <div className="max-w-[640px]">
          <SplitReveal
            className="display-md text-balance"
            lines={[['Built like a library.'], [{ text: 'Used like a toolkit.', className: 'text-white/45' }]]}
          />
          <Reveal delay={0.1}>
            <p className="lede mt-4">Findable in two clicks, runnable in one, and clear about what it was built for.</p>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6" stagger={0.08} amount={0.1}>
          <CardShell
            className="md:col-span-2 lg:col-span-4"
            title="Organised by the job, not the jargon."
            body="Coding to household, legal to travel. Every card carries a use case with its own colour, so the library reads at a glance."
          >
            <UseCaseConstellation />
          </CardShell>
          <CardShell className="lg:col-span-2" title="Filter by where it runs." body="Harness, model and platform. Narrow the whole library to the three you need.">
            <FilterPanel />
          </CardShell>
          <CardShell className="lg:col-span-2" title="Image & video, with receipts." body="Every media prompt ships with the output it made and the settings behind it.">
            <MediaMosaic />
          </CardShell>
          <CardShell className="lg:col-span-2" title="Your go-to shelf." body="Heart what works. Most used and most recent, always one tap away.">
            <Favorites />
          </CardShell>
          <CardShell className="md:col-span-2 lg:col-span-2" title="Know what’s moving." body="The 2026 AI Tool Index and a weekly trend newsletter, included with Pro.">
            <KnowledgeLayer />
          </CardShell>
        </Stagger>
      </div>
    </section>
  )
}

