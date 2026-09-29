/**
 * Faithful recreations of the current Promptful app UI (be-promptful main):
 * app-sidebar, header + FreeUsageBar, prompt-card, chain-card,
 * image / video prompting. Rendered at a fixed design size and scaled
 * with <ScaleToFit>.
 */
/* eslint-disable @next/next/no-img-element */
import {
  Activity,
  ArrowUpRight,
  BarChart2,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Code,
  Copy,
  Crown,
  DollarSign,
  Eye,
  FilePen,
  FileText,
  GraduationCap,
  Heart,
  House,
  Image as ImageIcon,
  Layers,
  Lightbulb,
  Link2,
  Lock,
  LogOut,
  MessageSquare,
  Palette,
  Plane,
  Play,
  Scale,
  Search,
  Server,
  Settings,
  Shield,
  SlidersHorizontal,
  TrendingUp,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { featuredChain, glowFor, harnessColor, modelMeta, samplePrompts, type SamplePrompt } from '@/lib/content'
import { MediaArt } from './media-art'

export const APP_W = 1200
export const APP_H = 760

const useCaseIcon: Record<string, LucideIcon> = {
  Coding: Code,
  'Sales & Marketing': TrendingUp,
  'Content Creation': FilePen,
  Security: Shield,
  Backend: Server,
  'Real-World Use Cases': Lightbulb,
  'Data & Analytics': BarChart2,
  Research: Search,
  'UI/UX Design': Palette,
  'Writing & Communication': MessageSquare,
  'Legal & Compliance': Scale,
  'Education & Learning': GraduationCap,
  Finance: DollarSign,
  'Video Editing': Clapperboard,
  Household: House,
  Business: Briefcase,
  Travel: Plane,
}

const mix = (c: string, p: number, base = 'transparent') => `color-mix(in srgb, ${c} ${p}%, ${base})`

/* ── Shared atoms ─────────────────────────────────────────── */
function Wordmark({ size = 17 }: { size?: number }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="font-black tracking-tight text-white" style={{ fontSize: size }}>
        promptful<span className="text-mint">.</span>
      </span>
      <span className="rounded border border-white/[0.1] px-1 py-0.5 text-[7px] font-bold uppercase tracking-[0.08em] text-white/25">Beta</span>
    </span>
  )
}

function SquaresIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
      <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="9" width="5.5" height="5.5" rx="1.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function UseCaseBadge({ label, className }: { label: string; className?: string }) {
  const glow = glowFor(label)
  const Icon = useCaseIcon[label] ?? Code
  return (
    <span
      className={cn('badge-shimmer inline-flex h-6 items-center gap-1 rounded-md border px-2 text-xs font-medium leading-none', className)}
      style={{ background: mix(glow, 10), borderColor: mix(glow, 30), color: glow }}
    >
      <Icon className="size-3" />
      {label}
    </span>
  )
}

function ModelChip({ model, extra = 0, size = 28 }: { model: string; extra?: number; size?: number }) {
  const m = modelMeta[model]
  if (!m) return null
  return (
    <span
      className="relative inline-grid shrink-0 place-items-center rounded-full border p-1"
      style={{ width: size, height: size, borderColor: mix(m.color, 35), background: mix(m.color, 12) }}
    >
      <img src={m.logo} alt="" className={cn('size-full object-contain', m.invert && 'invert')} />
      {extra > 0 && (
        <span className="absolute -bottom-1 -right-1.5 inline-flex h-3.5 min-w-3.5 items-center justify-center rounded-full border border-white/[0.15] bg-[#111] px-0.5 text-[8px] font-bold leading-none text-white/80">
          +{extra}
        </span>
      )}
    </span>
  )
}

function RoundIcon({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        'grid size-8 place-items-center rounded-full border backdrop-blur-sm',
        active ? 'border-red-500/40 bg-red-500/10 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.22)]' : 'border-white/[0.1] bg-black/40 text-white/40',
      )}
    >
      {children}
    </span>
  )
}

/* ── Window chrome ─────────────────────────────────────────── */
export function AppWindow({ children, className, url = 'promptful.org' }: { children: React.ReactNode; className?: string; url?: string }) {
  return (
    <div className={cn('relative h-full w-full overflow-hidden rounded-[18px] border border-white/[0.09] bg-background shadow-[0_50px_100px_-40px_rgba(0,0,0,.9)]', className)}>
      <div className="flex h-10 items-center gap-2 border-b border-white/[0.05] bg-surface px-4">
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <div className="mx-auto flex h-6 w-[300px] items-center justify-center gap-1.5 rounded-md bg-white/[0.03] font-mono text-[11px] text-white/30">
          <Lock className="size-3" /> {url}
        </div>
        <span className="w-[42px]" />
      </div>
      <div className="relative h-[calc(100%-40px)]">{children}</div>
    </div>
  )
}

/* ── Sidebar (components/layout/app-sidebar.tsx) ──────────── */
type NavKey = 'library' | 'favorites' | 'image' | 'video' | 'chains'
const navItems: { key: NavKey; label: string; Icon: LucideIcon }[] = [
  { key: 'favorites', label: 'Favorites', Icon: Heart },
  { key: 'image', label: 'Image Prompting', Icon: ImageIcon },
  { key: 'video', label: 'Video Prompting', Icon: Video },
  { key: 'chains', label: 'Prompt Chains', Icon: Link2 },
]

export function Sidebar({ active }: { active: NavKey }) {
  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col bg-surface shadow-[inset_-1px_0_0_rgba(255,255,255,0.05)]">
      <div className="flex h-14 items-center justify-between border-b border-white/[0.05] px-3">
        <Wordmark />
        <ChevronLeft className="size-4 text-white/20" />
      </div>
      <div className="px-3 pb-3 pt-3">
        <div
          className={cn(
            'flex w-full items-center gap-3 rounded-lg border px-3 py-2.5',
            active === 'library' ? 'border-primary/30 bg-white/[0.05]' : 'border-white/[0.08] bg-white/[0.02]',
          )}
        >
          <SquaresIcon className="size-4 text-primary/70" />
          <span className="text-[12px] font-bold uppercase tracking-[0.04em] text-white/85">Library</span>
        </div>
      </div>
      <nav className="space-y-0.5 px-2 py-3">
        {navItems.map(({ key, label, Icon }) => (
          <div
            key={key}
            className={cn(
              'relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.04em]',
              active === key ? 'border border-white/[0.08] bg-white/[0.04] text-white/90' : 'text-white/60',
            )}
          >
            <Icon className={cn('size-4', active === key ? 'text-primary/90' : 'text-white/45')} />
            {label}
            {key === 'favorites' && (
              <span className="ml-auto grid h-[18px] min-w-[18px] place-items-center rounded-full border border-red-500/20 bg-red-500/20 px-1 text-[10px] font-bold text-red-400">
                12
              </span>
            )}
          </div>
        ))}
      </nav>
      <div className="mt-auto">
        <div className="px-2 pb-1">
          <div className="flex w-full items-center gap-2 rounded-lg border border-mint/20 bg-mint/[0.06] px-2.5 py-2">
            <Crown className="size-4 text-mint" />
            <span className="text-[11px] font-bold tracking-[0.04em] text-mint">UPGRADE TO PRO</span>
            <ArrowUpRight className="ml-auto size-3.5 text-mint/60" />
          </div>
        </div>
        <div className="mx-3 my-2 border-t border-white/[0.05]" />
        <div className="space-y-0.5 px-2 pb-3">
          {[
            ['Settings', Settings],
            ['Sign out', LogOut],
          ].map(([l, I]) => {
            const Ic = I as LucideIcon
            return (
              <div key={l as string} className="flex items-center gap-3 px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.04em] text-white/45">
                <Ic className="size-4" /> {l as string}
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

/* ── Free usage bar (components/billing/free-usage-meter.tsx) ── */
function Meter({ Icon, label, used, total, className }: { Icon: LucideIcon; label: string; used: number; total: number; className?: string }) {
  return (
    <div className={cn('flex min-w-0 items-center gap-2', className)}>
      <Icon className="size-3.5 shrink-0 text-white/35" />
      <span className="text-[11px] text-white/55">{label}</span>
      <div className="flex flex-1 gap-[3px]">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={cn('h-1.5 flex-1 rounded-full', i < used ? 'bg-primary shadow-[0_0_8px_rgba(92,255,176,0.35)]' : 'bg-white/[0.08]')} />
        ))}
      </div>
      <span className="tabular shrink-0 text-[11px] text-white/70">
        {used}
        <span className="text-white/30">/{total}</span>
      </span>
    </div>
  )
}

export function UsageBar({ used = 5, className }: { used?: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-5 rounded-xl border border-white/[0.06] bg-white/[0.02] py-1.5 pl-3 pr-1.5', className)}>
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">Free plan</span>
      <Meter Icon={FileText} label="Prompts" used={used} total={14} className="max-w-[260px] flex-[7]" />
      <Meter Icon={Link2} label="Chains" used={1} total={2} className="max-w-[150px] flex-[3]" />
      <span className="ml-auto flex h-8 items-center gap-1 rounded-lg border border-primary/20 bg-primary/[0.06] px-2.5 text-[11px] font-bold text-primary">
        <Crown className="size-3.5" /> Upgrade <ArrowUpRight className="size-3" />
      </span>
    </div>
  )
}

/** Compact stacked version used on the phone mockup. */
export function UsageMeter({ used = 5, className }: { used?: number; className?: string }) {
  return (
    <div className={cn('space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">Free plan</span>
        <span className="flex items-center gap-1 text-[11px] font-bold text-primary">
          <Crown className="size-3.5" /> Upgrade
        </span>
      </div>
      <Meter Icon={FileText} label="Prompts" used={used} total={14} />
      <Meter Icon={Link2} label="Chains" used={1} total={2} />
    </div>
  )
}

/* ── Prompt card (components/prompts/prompt-card.tsx) ─────── */
const ghostWidths = [92, 78, 86, 64, 90, 72, 81]

export function PromptCard({ p, locked = false, hover = false, favorite = false, className }: { p: SamplePrompt; locked?: boolean; hover?: boolean; favorite?: boolean; className?: string }) {
  const glow = glowFor(p.useCase)
  const hColor = harnessColor[p.harness] ?? '#5cffb0'
  return (
    <div
      className={cn('relative flex h-[360px] flex-col overflow-hidden rounded-xl border bg-card', className)}
      style={
        hover
          ? { background: mix(glow, 8, 'var(--color-card)'), borderColor: mix(glow, 45), boxShadow: `0 0 18px ${mix(glow, 22)}` }
          : p.chain
            ? { borderColor: 'color-mix(in srgb, var(--color-primary) 40%, transparent)' }
            : { borderColor: 'color-mix(in srgb, var(--color-border) 40%, transparent)' }
      }
    >
      <div className="px-5 pb-2.5 pt-5">
        <div className="mb-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <ModelChip model={p.model} extra={p.additionalModels?.length ?? 0} />
              <UseCaseBadge label={p.useCase} />
            </div>
            <span className="inline-flex h-7 items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 text-sm font-semibold text-muted-foreground">
              <Activity className="size-3.5" />
              {p.runs.toLocaleString('en-US')}
            </span>
          </div>
          <div className="ml-[34px] mt-1.5 text-[11px] font-medium leading-none">
            <span className="text-white/35">Use with </span>
            <span style={{ color: mix(hColor, 55, 'white') }}>{p.harness}</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="line-clamp-2 flex-1 text-lg font-semibold leading-snug text-white">{p.title}</div>
          {p.chain && (
            <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full border border-primary/20 bg-primary/10">
              <Link2 className="size-3 text-primary" />
            </span>
          )}
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden px-5 pb-4">
        {locked ? (
          <div className="relative flex-1">
            <div className="space-y-2.5 pt-1 blur-[3px]">
              {ghostWidths.map((w, i) => (
                <div key={i} className="h-2.5 rounded-full bg-white/[0.07]" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/[0.1] bg-black/60 px-3 text-[11px] font-semibold text-white/70 backdrop-blur-sm">
                <Eye className="size-3.5 text-primary" /> Tap to reveal
              </span>
            </div>
          </div>
        ) : (
          <div className="flex-1 space-y-1.5 overflow-hidden text-sm leading-relaxed text-muted-foreground">
            {p.body.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-1">
          {p.tags.map((t) => (
            <span key={t} className="inline-flex h-5 items-center gap-0.5 rounded-[3px] border border-white/[0.08] bg-white/[0.05] px-1.5 text-[10px] font-medium capitalize tracking-wide text-white/60">
              <span className="text-white/35">#</span>
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <RoundIcon active={favorite}>
            <Heart className={cn('size-3.5', favorite && 'fill-current')} />
          </RoundIcon>
          <RoundIcon>{locked ? <Lock className="size-3.5" /> : <Copy className="size-3.5" />}</RoundIcon>
        </div>
      </div>
    </div>
  )
}

/* ── Header (components/layout/header.tsx) ────────────────── */
function Header() {
  return (
    <div className="border-b border-white/[0.06] bg-background/80 px-6 py-4">
      <div className="flex h-11 items-center gap-3 rounded-md border border-white/[0.08] bg-background pl-4 pr-3 text-sm text-white/35">
        <Search className="size-4" /> Search prompts...
      </div>
      <UsageBar className="mt-3" />
    </div>
  )
}

/* ── Screens ───────────────────────────────────────────────── */
export function LibraryScreen({ compact = false }: { compact?: boolean }) {
  const list = compact ? samplePrompts.slice(0, 2) : samplePrompts.slice(0, 3)
  return (
    <div className="flex h-full">
      {!compact && <Sidebar active="library" />}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />
        <div className="px-6">
          <div className="my-5 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <SlidersHorizontal className="size-4" /> Filters
            <span className="grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-ink">1</span>
            <ChevronDown className="size-4" />
            <span className="ml-auto text-xs text-white/35">Reset all</span>
          </div>
          <p className="mb-4 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">42</span> prompts
          </p>
          <div className={cn('grid gap-4', compact ? 'grid-cols-2' : 'grid-cols-3')}>
            {list.map((p, i) => (
              <PromptCard key={p.title} p={p} hover={i === 0} favorite={i === 0} locked={i === 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function DetailScreen({ compact = false }: { compact?: boolean }) {
  const p = samplePrompts[0]
  const hColor = harnessColor[p.harness]
  return (
    <div className="relative flex h-full">
      {!compact && <Sidebar active="library" />}
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-5 flex overflow-hidden rounded-2xl border border-white/[0.08] bg-surface shadow-2xl">
          <div className="flex w-[55%] flex-col border-r border-white/[0.06] p-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">Prompt</span>
              <RoundIcon>
                <Copy className="size-3.5" />
              </RoundIcon>
            </div>
            <div className="mt-4 space-y-3 text-[13px] leading-[1.7] text-white/70">
              <p className="font-semibold text-white/90">Role</p>
              <p>You are a staff engineer doing a pre-merge review of a production codebase. You care about users more than style.</p>
              <p className="font-semibold text-white/90">Process</p>
              <p>1. Read the diff end to end before commenting.
                <br />2. Trace every changed path to its callers.
                <br />3. Rank findings by blast radius, not by line order.</p>
              <p className="font-semibold text-white/90">Output</p>
              <p>A table of severity, file, failure scenario and fix. No praise. No nits unless they hide a bug.</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center gap-1.5">
              <ModelChip model={p.model} extra={p.additionalModels?.length ?? 0} />
              <UseCaseBadge label={p.useCase} />
            </div>
            <div className="mt-4 text-[20px] font-semibold leading-tight tracking-[-0.02em]">{p.title}</div>
            <div className="mt-2 text-[11px] font-medium">
              <span className="text-white/35">Use with </span>
              <span style={{ color: mix(hColor, 55, 'white') }}>{p.harness}</span>
            </div>
            <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">When to use it</div>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/60">Before merging anything that touches auth, billing or data writes.</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                ['AI models', 'Fable 3.1, Astra, Gemini 3.8'],
                ['Runs', '1,284'],
                ['Your runs', '3'],
                ['Added', 'Sep 2026'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 py-2">
                  <div className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-white/30">{k}</div>
                  <div className="mt-0.5 truncate text-[12px] font-medium text-white/80">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between pt-4">
              <RoundIcon active>
                <Heart className="size-3.5 fill-current" />
              </RoundIcon>
              <span className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-4 text-[12px] font-bold text-ink">
                <Copy className="size-3.5" /> Copy prompt
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const lockedBars = [72, 58, 84, 64, 77, 52]

export function ChainCard({ locked = false, className }: { locked?: boolean; className?: string }) {
  const c = featuredChain
  const glow = glowFor(c.useCase)
  return (
    <div className={cn('relative pb-2.5', className)} style={{ ['--uc-glow' as string]: glow }}>
      <div className="absolute inset-x-6 bottom-0 h-6 rounded-b-xl border border-t-0 border-white/[0.05]" style={{ background: mix(glow, 3, 'var(--color-card)') }} />
      <div className="absolute inset-x-3 bottom-[5px] h-6 rounded-b-xl border border-t-0 border-white/[0.07]" style={{ background: mix(glow, 5, 'var(--color-card)') }} />
      <div
        className="relative flex h-[360px] flex-col overflow-hidden rounded-xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_24px_-14px_rgba(0,0,0,0.7)]"
        style={{ borderColor: mix(glow, 16, 'rgba(255,255,255,0.06)'), background: `linear-gradient(160deg, ${mix(glow, 7, 'var(--color-card)')} 0%, var(--color-card) 42%)` }}
      >
        <div className="absolute inset-x-0 top-0 h-px opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${mix(glow, 70)}, transparent)` }} />
        <div className="px-5 pt-5">
          <div className="flex items-center justify-between">
            <span className="grid size-7 place-items-center rounded-full border border-primary/25 bg-primary/10">
              <Link2 className="size-3.5 text-primary" />
            </span>
            <UseCaseBadge label={c.useCase} />
          </div>
          <div className="mt-3.5 line-clamp-2 text-[17px] font-semibold leading-snug tracking-tight text-white/95">{c.name}</div>
          <div className="mt-1 line-clamp-2 text-[13px] text-white/45">{c.description}</div>
        </div>
        <div className="relative mt-4 flex-1 overflow-hidden px-5 pb-3 [mask-image:linear-gradient(to_bottom,black_88%,transparent)]">
          <span className="absolute bottom-3 left-[29.5px] top-0 w-px" style={{ background: `linear-gradient(${mix(glow, 45)}, rgba(255,255,255,0.06))` }} />
          <div className="space-y-2">
            {c.steps.map((s, i) => (
              <div key={s.title} className="relative flex h-6 items-center gap-3">
                <span
                  className="relative grid size-5 shrink-0 place-items-center rounded-full border bg-card text-[10px] font-semibold"
                  style={{ borderColor: mix(glow, 45), color: mix(glow, 80, 'white') }}
                >
                  {i + 1}
                </span>
                {locked ? (
                  <span className="h-2.5 rounded-full bg-white/[0.09] blur-[2px]" style={{ width: `${lockedBars[i % lockedBars.length]}%` }} />
                ) : (
                  <span className="truncate text-[13px] text-white/60">{s.title}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex h-12 items-center gap-1.5 border-t border-white/[0.05] pl-5 pr-3">
          {['/platforms/claude-color.webp', '/platforms/openai.webp'].map((l) => (
            <span key={l} className="grid size-6 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] p-1">
              <img src={l} alt="" className="size-full object-contain" />
            </span>
          ))}
          <span
            className="ml-auto inline-flex h-7 items-center gap-1.5 rounded-full border pl-2 pr-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            style={{ borderColor: mix(glow, 28, 'rgba(255,255,255,0.08)'), background: mix(glow, 9, 'rgba(255,255,255,0.02)') }}
          >
            {locked ? <Lock className="size-3 text-white/60" /> : <Layers className="size-3.5 text-white/60" />}
            <span className="tabular text-[12px] font-semibold text-white/85">{c.steps.length}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export function ChainScreen({ copied = 3, compact = false }: { copied?: number; compact?: boolean }) {
  const c = featuredChain
  const current = Math.min(copied, c.steps.length - 1)
  return (
    <div className="flex h-full">
      {!compact && <Sidebar active="chains" />}
      <div className="flex min-w-0 flex-1 gap-5 p-6">
        {!compact && (
          <div className="w-[300px] shrink-0">
            <div className="mb-5 text-2xl font-bold tracking-tight">Prompt Chains</div>
            <ChainCard />
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col rounded-2xl border border-white/[0.07] bg-surface p-5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-full border border-primary/25 bg-primary/10">
              <Link2 className="size-3.5 text-primary" />
            </span>
            <div className="min-w-0">
              <div className="truncate text-[15px] font-semibold">{c.name}</div>
              <div className="text-[11px] text-white/40">
                {c.steps.length} steps · <span className="text-primary">{copied}/{c.steps.length} copied</span>
              </div>
            </div>
            <span className="ml-auto flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 text-[11px] font-semibold text-white/60">
              <Copy className="size-3.5" /> Copy all
            </span>
          </div>
          <div className="mt-5 flex min-h-0 flex-1 gap-5">
            <div className="w-[230px] shrink-0 space-y-1">
              {c.steps.map((s, i) => (
                <div key={s.title} className={cn('flex items-center gap-2.5 rounded-lg px-2 py-1.5', i === current && 'bg-white/[0.04]')}>
                  <span
                    className={cn(
                      'grid size-5 shrink-0 place-items-center rounded-full border text-[10px] font-semibold',
                      i < copied ? 'border-primary bg-primary text-ink' : i === current ? 'border-primary text-primary' : 'border-white/15 text-white/40',
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className={cn('truncate text-[12px]', i === current ? 'text-white' : 'text-white/45')}>{s.title}</span>
                </div>
              ))}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary/80">
                Step {current + 1} of {c.steps.length}
              </div>
              <div className="mt-1.5 text-[16px] font-semibold">{c.steps[current].title}</div>
              <div className="mt-3 flex-1 space-y-2 text-[13px] leading-relaxed text-white/60">
                <p>{c.steps[current].note}</p>
                <p>Work through the codebase in order. After each pass, write a short changelog so the next step starts from a known state.</p>
              </div>
              <div className="flex items-center gap-2 border-t border-white/[0.06] pt-4">
                <span className="flex h-8 items-center gap-1 rounded-lg border border-white/[0.08] px-3 text-[11px] text-white/60">
                  <ChevronLeft className="size-3.5" /> Back
                </span>
                <span className="mx-auto flex h-8 items-center gap-1.5 rounded-lg bg-primary px-4 text-[11px] font-bold text-ink">
                  <Copy className="size-3.5" /> Copy
                </span>
                <span className="flex h-8 items-center gap-1 rounded-lg border border-white/[0.08] px-3 text-[11px] text-white/60">
                  Next <ChevronRight className="size-3.5" />
                </span>
              </div>
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
      <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-hidden p-6">
        <div>
          <div className="text-2xl font-bold tracking-tight">Image Prompting</div>
          <div className="mt-1 text-[13px] text-white/35">Image generation prompts. Add new ones from the Library.</div>
        </div>
        <div>
          <SectionLabel name="Landscape" ratio="16:9" count={3} />
          <div className="mt-3 flex h-[210px] gap-2">
            <ImageCard k="synthwave" title="Retro Synthwave Skyline" model="GPT Image 2" className="flex-[2.2]" expanded />
            <ImageCard k="clockwork" title="Steampunk Clockwork" model="Nano Banana Pro" className="flex-1" />
            <ImageCard k="glassIcon" title="Glass App Icon" model="GPT Image 2" className="flex-1" />
          </div>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.4fr] gap-4">
          <div>
            <SectionLabel name="Square" ratio="1:1" count={2} />
            <div className="mt-3 flex h-[calc(100%-26px)] gap-2">
              <ImageCard k="ceramicMug" title="Ceramic Mug Product Shot" model="Nano Banana Pro" className="flex-1" />
            </div>
          </div>
          <VideoCard />
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ name, ratio, count }: { name: string; ratio: string; count: number }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">{name}</span>
      <span className="font-mono text-[10px] text-white/15">{ratio}</span>
      <span className="text-[10px] text-white/20">· {count}</span>
    </div>
  )
}

function ImageCard({ k, title, model, className, expanded }: { k: Parameters<typeof MediaArt>[0]['k']; title: string; model: string; className?: string; expanded?: boolean }) {
  const m = modelMeta[model]
  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black', className)}>
      <MediaArt k={k} className="absolute inset-0" />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />
      <span className="absolute left-2.5 top-2.5 grid size-8 place-items-center rounded-full border p-1.5 backdrop-blur-md" style={{ borderColor: mix(m.color, 35), background: mix(m.color, 14) }}>
        <img src={m.logo} alt="" className={cn('size-full object-contain', m.invert && 'invert')} />
      </span>
      {expanded && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-3 pb-3 pt-10">
          <span className="inline-flex h-5 items-center rounded-md border border-pink-400/40 bg-pink-500/15 px-1.5 text-[10px] font-medium text-pink-300">Image Gen</span>
          <div className="mt-1.5 line-clamp-2 text-sm font-semibold text-white">{title}</div>
        </div>
      )}
    </div>
  )
}

function VideoCard() {
  return (
    <div className="flex min-h-0 flex-col rounded-2xl border border-white/[0.08] bg-card">
      <div className="relative m-2 min-h-0 flex-1 overflow-hidden rounded-xl bg-gradient-to-br from-white/[0.07] via-black/50 to-black/80 ring-1 ring-white/10">
        <MediaArt k="clockwork" className="absolute inset-0 opacity-80" />
        <span className="absolute left-2.5 top-2.5 inline-flex h-5 items-center rounded-md border border-violet-400/40 bg-violet-500/15 px-1.5 text-[10px] font-medium text-violet-300">Video Gen</span>
        <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/[0.15] bg-white/[0.06] backdrop-blur-sm">
          <Play className="ml-0.5 size-5 fill-white text-white" />
        </span>
        <span className="absolute bottom-2.5 right-2.5 rounded border border-white/[0.15] bg-black/70 px-1.5 font-mono text-[10px] text-white/80">0:30</span>
      </div>
      <div className="px-4 pb-3 pt-1.5">
        <div className="text-base font-semibold">Steampunk Clockwork, 30s One-Take</div>
        <div className="mt-1 text-[12px] font-semibold uppercase tracking-wider text-white/40">Show prompt ⌄</div>
      </div>
    </div>
  )
}
