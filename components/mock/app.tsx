/**
 * Faithful, stylised recreations of the Promptful app UI
 * (be-promptful: prompt-card, prompt-detail-modal, chain-display-panel,
 * image prompting, free-usage-meter). Rendered at a fixed design size
 * and scaled with <ScaleToFit>.
 */
import {
  Activity,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Crown,
  Heart,
  Image as ImageIcon,
  Library,
  Link2,
  Lock,
  LogOut,
  Play,
  Search,
  Settings,
  SlidersHorizontal,
  Video,
} from 'lucide-react'
/* eslint-disable @next/next/no-img-element */
import { UseCaseBadge, Wordmark } from '@/components/ui/brand'
import { cn } from '@/lib/cn'
import { featuredChain, glowFor, samplePrompts, type SamplePrompt } from '@/lib/content'
import { MediaArt } from './media-art'

export const APP_W = 1200
export const APP_H = 760

/* ── Window chrome ─────────────────────────────────────────── */
export function AppWindow({ children, className, url = 'promptful.org/library' }: { children: React.ReactNode; className?: string; url?: string }) {
  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#060707] shadow-[0_60px_120px_-40px_rgba(0,0,0,.9),0_0_0_1px_rgba(0,0,0,.6)]',
        className,
      )}
    >
      <div className="flex h-10 items-center gap-2 border-b border-white/[0.06] bg-[#0a0b0b] px-4">
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <div className="mx-auto flex h-6 w-[320px] items-center justify-center gap-1.5 rounded-md border border-white/[0.05] bg-white/[0.03] font-mono text-[11px] text-white/35">
          <Lock className="size-3" /> {url}
        </div>
        <span className="w-[42px]" />
      </div>
      <div className="relative h-[calc(100%-40px)]">{children}</div>
    </div>
  )
}

/* ── Sidebar ───────────────────────────────────────────────── */
const navItems = [
  { key: 'library', label: 'Library', Icon: Library },
  { key: 'favorites', label: 'Favorites', Icon: Heart, count: 12 },
  { key: 'image', label: 'Image Prompting', Icon: ImageIcon },
  { key: 'video', label: 'Video Prompting', Icon: Video },
  { key: 'chains', label: 'Prompt Chains', Icon: Link2 },
] as const

export function Sidebar({ active }: { active: (typeof navItems)[number]['key'] }) {
  return (
    <aside className="flex h-full w-[216px] shrink-0 flex-col border-r border-white/[0.06] bg-[#050606] px-3 py-5">
      <div className="px-2">
        <Wordmark size={18} beta />
      </div>
      <nav className="mt-7 space-y-1">
        {navItems.map(({ key, label, Icon, ...rest }) => (
          <div
            key={key}
            className={cn(
              'flex h-9 items-center gap-2.5 rounded-lg px-2.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em]',
              active === key ? 'border border-white/[0.08] bg-white/[0.05] text-white' : 'text-white/40',
            )}
          >
            <Icon className={cn('size-3.5', active === key && 'text-mint')} />
            {label}
            {'count' in rest && (
              <span className="ml-auto rounded-full bg-[#ff5050]/90 px-1.5 text-[9px] font-bold text-white">{rest.count}</span>
            )}
          </div>
        ))}
      </nav>
      <div className="mt-auto space-y-3">
        <UsageMeter compact />
        <div className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-mint font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink shadow-[0_8px_24px_-12px_rgba(92,255,176,.8)]">
          <Crown className="size-3.5" /> Upgrade to Pro
        </div>
        <div className="flex items-center gap-4 px-2 font-mono text-[10px] uppercase tracking-[0.1em] text-white/30">
          <span className="flex items-center gap-1.5">
            <Settings className="size-3" /> Settings
          </span>
          <span className="flex items-center gap-1.5">
            <LogOut className="size-3" /> Sign out
          </span>
        </div>
      </div>
    </aside>
  )
}

/* ── Usage meter ───────────────────────────────────────────── */
export function UsageMeter({ used = 5, total = 14, compact = false, className }: { used?: number; total?: number; compact?: boolean; className?: string }) {
  return (
    <div className={cn('rounded-xl border border-white/[0.07] bg-white/[0.02] p-3', className)}>
      <div className="flex items-center justify-between font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/40">
        <span>Free plan</span>
        {!compact && <span className="text-mint">Upgrade ↗</span>}
      </div>
      <div className="mt-2.5 flex items-center justify-between text-[11px] text-white/60">
        <span>Prompts</span>
        <span className="tabular font-mono text-white/80">
          {used}/{total}
        </span>
      </div>
      <div className="mt-1.5 flex gap-[3px]">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={cn('h-1.5 flex-1 rounded-full', i < used ? 'bg-mint shadow-[0_0_6px_rgba(92,255,176,.6)]' : 'bg-white/[0.08]')} />
        ))}
      </div>
      <div className="mt-2.5 flex items-center justify-between text-[11px] text-white/60">
        <span>Chains</span>
        <span className="tabular font-mono text-white/80">1/2</span>
      </div>
      <div className="mt-1.5 flex gap-[3px]">
        <span className="h-1.5 flex-1 rounded-full bg-mint shadow-[0_0_6px_rgba(92,255,176,.6)]" />
        <span className="h-1.5 flex-1 rounded-full bg-white/[0.08]" />
      </div>
    </div>
  )
}

/* ── Prompt card ───────────────────────────────────────────── */
export function PromptCard({ p, locked = false, className, highlight = false }: { p: SamplePrompt; locked?: boolean; className?: string; highlight?: boolean }) {
  const glow = glowFor(p.useCase)
  return (
    <div
      className={cn('relative flex h-full flex-col rounded-xl border bg-[#0a0b0b] p-4', className)}
      style={{
        borderColor: highlight ? `color-mix(in srgb, ${glow} 45%, transparent)` : 'rgba(255,255,255,0.07)',
        boxShadow: highlight ? `0 0 28px color-mix(in srgb, ${glow} 22%, transparent)` : undefined,
      }}
    >
      <div className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-md border border-white/[0.07] bg-white/[0.03]">
          <img src={p.harnessLogo} alt="" className="size-3.5 object-contain" />
        </span>
        <UseCaseBadge label={p.useCase} glow={glow} className="text-[9.5px]" />
        <span className="ml-auto flex items-center gap-1 rounded-md border border-white/[0.06] px-1.5 py-[2px] font-mono text-[9.5px] text-white/45">
          <Activity className="size-3" /> {p.runs.toLocaleString('en-US')}
        </span>
      </div>
      <div className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/35">{p.harness}</div>
      <div className="mt-1 line-clamp-2 text-[14.5px] font-semibold leading-snug tracking-[-0.01em] text-white/90">{p.title}</div>
      <div className="relative mt-3 flex-1 space-y-1.5 overflow-hidden font-mono text-[10.5px] leading-relaxed text-white/45">
        <div className={cn('space-y-1.5', locked && 'select-none blur-[5px]')}>
          {p.body.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
        {locked && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="flex items-center gap-1.5 rounded-full border border-mint/25 bg-black/60 px-3 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-mint backdrop-blur">
              <Lock className="size-3" /> Tap to reveal
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {p.tags.map((t) => (
          <span key={t} className="rounded border border-white/[0.07] bg-white/[0.03] px-1.5 py-[1px] font-mono text-[9.5px] text-white/45">
            #{t}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center border-t border-white/[0.05] pt-3 text-white/40">
        <Heart className="size-3.5" />
        {p.chain && <Link2 className="ml-2.5 size-3.5 text-mint/70" />}
        <span className="ml-auto flex items-center gap-1 rounded-md border border-white/[0.07] px-2 py-1 font-mono text-[9.5px]">
          <Copy className="size-3" /> Copy
        </span>
      </div>
    </div>
  )
}

/* ── Screens ───────────────────────────────────────────────── */
function Topbar({ title, count }: { title: string; count?: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/[0.05] px-6 py-4">
      <div>
        <div className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/35">{title}</div>
        {count && (
          <div className="mt-0.5 text-[13px] text-white/60">
            <span className="font-semibold text-white">{count}</span> prompts
          </div>
        )}
      </div>
      <div className="ml-auto flex h-9 w-[300px] items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 text-[12px] text-white/35">
        <Search className="size-3.5" /> Search prompts, tags, tools…
        <span className="ml-auto rounded border border-white/10 px-1 font-mono text-[9px]">⌘K</span>
      </div>
      <div className="flex h-9 items-center gap-1.5 rounded-lg border border-white/[0.07] px-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/50">
        <SlidersHorizontal className="size-3.5" /> Filters
      </div>
    </div>
  )
}

export function LibraryScreen({ lockedIndex = [1, 4], compact = false }: { lockedIndex?: number[]; compact?: boolean }) {
  const list = compact ? samplePrompts.slice(0, 4) : samplePrompts
  return (
    <div className="flex h-full">
      {!compact && <Sidebar active="library" />}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title="Library" count="124" />
        <div className="flex gap-2 px-6 pt-4">
          {['Use case', 'Runs in', 'Model', 'Built for', 'Date added'].map((f, i) => (
            <span
              key={f}
              className={cn(
                'rounded-lg border px-2.5 py-1.5 text-[11px]',
                i === 0 ? 'border-mint/50 bg-mint/[0.08] text-mint' : 'border-white/[0.06] bg-white/[0.02] text-white/45',
              )}
            >
              {f}
            </span>
          ))}
        </div>
        <div className={cn('grid flex-1 gap-4 overflow-hidden p-6', compact ? 'grid-cols-2' : 'grid-cols-3')}>
          {list.map((p, i) => (
            <PromptCard key={p.title} p={p} locked={lockedIndex.includes(i)} highlight={i === 0} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function DetailScreen({ compact = false }: { compact?: boolean }) {
  const p = samplePrompts[0]
  const glow = glowFor(p.useCase)
  return (
    <div className="relative flex h-full">
      {!compact && <Sidebar active="library" />}
      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-30 blur-[2px]">
          <LibraryGhost />
        </div>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-6 flex overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-2xl">
          <div className="flex w-[56%] flex-col border-r border-white/[0.06] p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">Prompt</span>
              <span className="flex items-center gap-1.5 rounded-lg bg-mint px-3 py-1.5 text-[11px] font-bold text-ink">
                <Copy className="size-3.5" /> Copy prompt
              </span>
            </div>
            <div className="mt-5 space-y-3 font-mono text-[11.5px] leading-[1.75] text-white/70">
              <p className="text-white/90"># Role</p>
              <p>You are a staff engineer doing a pre-merge review of a production codebase. You have shipped systems at scale and you care about users more than style.</p>
              <p className="text-white/90"># Process</p>
              <p>1. Read the diff end to end before commenting.<br />2. Trace every changed path to its callers.<br />3. Rank findings by blast radius, not by line order.</p>
              <p className="text-white/90"># Output</p>
              <p>
                A table: <span className="text-mint">severity · file:line · failure scenario · fix</span>. No praise. No nits unless they hide a bug.
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-md border border-white/[0.07] bg-white/[0.03]">
                <img src={p.harnessLogo} alt="" className="size-4 object-contain" />
              </span>
              <UseCaseBadge label={p.useCase} glow={glow} />
              <span className="flex items-center gap-1 rounded-md border border-mint/25 bg-mint/[0.06] px-1.5 py-[2px] font-mono text-[9.5px] text-mint">
                <Link2 className="size-3" /> Step 6 of 7
              </span>
            </div>
            <div className="mt-4 text-[20px] font-bold leading-tight tracking-[-0.02em]">{p.title}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">Runs in Claude Code</div>
            <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
              <div className="font-mono text-[9.5px] font-semibold uppercase tracking-[0.14em] text-mint/70">When to use it</div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/60">Before merging anything that touches auth, billing, or data writes — or the night before launch.</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                ['Harness', 'Claude Code'],
                ['AI Model', 'Fable 3.1'],
                ['Runs', '1,284'],
                ['Your runs', '3'],
                ['Platforms', 'Supabase · Sentry'],
                ['Added', 'Sep 2026'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-2">
                  <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/30">{k}</div>
                  <div className="mt-0.5 text-[12px] font-medium text-white/80">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-2 pt-4">
              <span className="flex items-center gap-1.5 rounded-lg border border-[#ff5a7a]/30 bg-[#ff5a7a]/10 px-3 py-1.5 text-[11px] text-[#ff8aa0]">
                <Heart className="size-3.5 fill-current" /> Favorited
              </span>
              <span className="ml-auto flex gap-1">
                {p.tags.map((t) => (
                  <span key={t} className="rounded border border-white/[0.07] px-1.5 py-[1px] font-mono text-[9.5px] text-white/45">
                    #{t}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LibraryGhost() {
  return (
    <div className="grid h-full grid-cols-3 gap-4 p-6 pt-24">
      {samplePrompts.map((p) => (
        <PromptCard key={p.title} p={p} />
      ))}
    </div>
  )
}

export function ChainScreen({ copied = 3, compact = false }: { copied?: number; compact?: boolean }) {
  const c = featuredChain
  const current = Math.min(copied, c.steps.length - 1)
  return (
    <div className="flex h-full">
      {!compact && <Sidebar active="chains" />}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg border border-mint/25 bg-mint/[0.07]">
            <Link2 className="size-4 text-mint" />
          </span>
          <div>
            <div className="text-[18px] font-bold tracking-[-0.02em]">{c.name}</div>
            <div className="mt-0.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
              7 steps · <span className="text-mint">{copied}/7 copied</span> · {c.automation}
            </div>
          </div>
          <UseCaseBadge label={c.useCase} glow={glowFor(c.useCase)} className="ml-3" />
          <span className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-white/60">
            <Copy className="size-3.5" /> Copy all
          </span>
        </div>
        <div className="mt-5 flex min-h-0 flex-1 gap-5">
          <div className="relative w-[330px] shrink-0 space-y-1.5">
            <div className="absolute bottom-5 left-[21px] top-5 w-px bg-white/[0.07]" />
            <div
              className="absolute left-[21px] top-5 w-px bg-mint shadow-[0_0_10px_rgba(92,255,176,.8)]"
              style={{ height: `${(current / (c.steps.length - 1)) * 88}%` }}
            />
            {c.steps.map((s, i) => (
              <div
                key={s.title}
                className={cn(
                  'relative flex items-center gap-3 rounded-lg border px-2.5 py-2',
                  i === current ? 'border-mint/30 bg-mint/[0.05]' : 'border-transparent',
                )}
              >
                <span
                  className={cn(
                    'relative z-10 grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[10px]',
                    i < copied ? 'border-mint bg-mint text-ink' : i === current ? 'border-mint text-mint bg-[#0a0a0a]' : 'border-white/15 bg-[#0a0a0a] text-white/40',
                  )}
                >
                  {i < copied ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
                </span>
                <span className={cn('truncate text-[12px]', i === current ? 'text-white' : i < copied ? 'text-white/60' : 'text-white/40')}>{s.title}</span>
              </div>
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-white/[0.07] bg-[#0a0b0b] p-5">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-mint/80">
              Step {current + 1} of {c.steps.length}
            </div>
            <div className="mt-2 text-[17px] font-semibold tracking-[-0.01em]">{c.steps[current].title}</div>
            <div className="mt-4 flex-1 space-y-2.5 font-mono text-[11px] leading-[1.75] text-white/60">
              <p>{c.steps[current].note}</p>
              <p>Work through the codebase in the order below. After each pass, write a short changelog so the next step starts from a known state.</p>
              <p className="text-white/40">→ Inputs from step {current}: the cleaned tree and naming map.</p>
            </div>
            <div className="flex items-center gap-2 border-t border-white/[0.06] pt-4">
              <span className="flex items-center gap-1 rounded-lg border border-white/[0.08] px-3 py-1.5 text-[11px] text-white/60">
                <ChevronLeft className="size-3.5" /> Back
              </span>
              <span className="mx-auto flex items-center gap-1.5 rounded-lg bg-mint px-4 py-1.5 text-[11px] font-bold text-ink">
                <Copy className="size-3.5" /> Copy
              </span>
              <span className="flex items-center gap-1 rounded-lg border border-white/[0.08] px-3 py-1.5 text-[11px] text-white/60">
                Next <ChevronRight className="size-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MediaScreen({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full">
      {!compact && <Sidebar active="image" />}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title="Image & Video Prompting" />
        <div className="grid flex-1 grid-cols-[0.62fr_1fr_1fr] grid-rows-2 gap-4 p-6">
          <MediaTile k="neonRain" title="Neon Rain Street Portrait" ratio="9:16" className="row-span-2" />
          <MediaTile k="ceramicMug" title="Ceramic Mug Product Shot" ratio="1:1" />
          <MediaTile k="glassIcon" title="Glass App Icon" ratio="1:1" />
          <MediaTile k="synthwave" title="Retro Synthwave Skyline" ratio="16:9" />
          <MediaTile k="clockwork" title="Steampunk Clockwork — 30s One-Take" ratio="0:30" video />
        </div>
      </div>
    </div>
  )
}

function MediaTile({ k, title, ratio, className, video }: { k: Parameters<typeof MediaArt>[0]['k']; title: string; ratio: string; className?: string; video?: boolean }) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl border border-white/[0.07]', className)}>
      <MediaArt k={k} className="absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-10">
        <div className="flex items-center gap-1.5">
          <span className="rounded border border-white/15 bg-black/40 px-1.5 py-[1px] font-mono text-[9px] text-white/70 backdrop-blur">
            {video ? 'Seedance 2.0' : 'GPT Image 2'}
          </span>
          <span className="rounded border border-white/10 bg-black/40 px-1.5 py-[1px] font-mono text-[9px] text-white/50">{ratio}</span>
        </div>
        <div className="mt-1.5 text-[12.5px] font-semibold text-white/90">{title}</div>
      </div>
      {video && (
        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 backdrop-blur">
          <Play className="ml-0.5 size-4 fill-white text-white" />
        </span>
      )}
      <span className="absolute right-2.5 top-2.5 rounded-full border border-mint/30 bg-black/50 px-2 py-[2px] font-mono text-[8.5px] font-bold uppercase tracking-[0.12em] text-mint backdrop-blur">
        Pro
      </span>
    </div>
  )
}
