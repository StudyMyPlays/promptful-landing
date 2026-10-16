/**
 * Faithful recreations of the current Promptful app UI (be-promptful main):
 * app-sidebar, header + FreeUsageBar, prompt-card, the Favorites carousel
 * and rails, chain-card with hanging step tags, and Motion Prompting.
 * Rendered at a fixed design size and scaled with <ScaleToFit>.
 */
import {
  Activity,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  Clapperboard,
  Crown,
  FileText,
  Image as ImageIcon,
  Link2,
  Lock,
  LogOut,
  MousePointerClick,
  Play,
  Search,
  Settings,
  SlidersHorizontal,
  LifeBuoy,
  Video,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import {
  favoriteIds,
  favoriteLimits,
  featuredChain,
  glowFor,
  otherChains,
  promptById,
  recommendations,
  type SamplePrompt,
} from '@/lib/content'
import { CopyDot, FavoriteDot, HarnessNote, HeartGlyph, ModelMarks, PlatformChips, PromptBody, RunsBadge, TagChip, UseCaseBadge, Wordmark, mix } from './atoms'
import { FavoritesCoverflow } from './hologram'
import { MediaArt } from './media-art'

export const APP_W = 1200
export const APP_H = 760

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
type NavKey = 'library' | 'favorites' | 'motion' | 'chains'
type IconLike = (props: { className?: string }) => React.ReactNode
const browse: { key: NavKey; label: string; Icon: IconLike }[] = [
  { key: 'favorites', label: 'Favorites', Icon: HeartIcon },
  { key: 'motion', label: 'Motion Prompting', Icon: Clapperboard },
  { key: 'chains', label: 'Prompt Chains', Icon: Link2 },
]

function HeartIcon({ className }: { className?: string }) {
  return <HeartGlyph size={16} className={className} />
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-2.5 pb-1.5 pt-0.5 text-[9.5px] font-medium uppercase tracking-[0.26em] text-white/35">{children}</div>
}

function Item({ Icon, label, active, badge, danger }: { Icon: IconLike; label: string; active?: boolean; badge?: number; danger?: boolean }) {
  return (
    <div
      className={cn(
        'relative flex items-center gap-3 rounded-lg border px-2.5 py-2 text-[13px] tracking-[0.02em]',
        active ? 'border-white/[0.08] bg-white/[0.04] font-medium text-white/90' : 'border-transparent text-white/60',
        danger && 'text-white/55',
      )}
    >
      <Icon className={cn('size-4 shrink-0', active ? 'text-primary/90' : 'text-white/55')} />
      <span className="flex-1">{label}</span>
      {badge ? (
        <span className="tabular inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.06] px-1.5 text-[11px] font-bold text-white/80">{badge}</span>
      ) : null}
    </div>
  )
}

export function Sidebar({ active }: { active: NavKey }) {
  return (
    <aside className="flex h-full w-[220px] shrink-0 flex-col bg-surface shadow-[inset_-1px_0_0_rgba(255,255,255,0.05)]">
      <div className="border-b border-white/[0.05]">
        <div className="flex h-14 items-center justify-between px-3">
          <Wordmark />
          <ChevronLeft className="size-4 text-white/50" />
        </div>
        <div className="px-3 pb-3">
          <div className={cn('flex w-full items-center gap-3 rounded-lg border px-3 py-2.5', active === 'library' ? 'border-primary/30 bg-white/[0.05]' : 'border-white/[0.08] bg-white/[0.02]')}>
            <svg className="size-4 text-primary/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span className="text-[13px] font-medium tracking-[0.02em] text-white/85">Library</span>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 px-2 py-3">
        <GroupLabel>Browse</GroupLabel>
        {browse.map(({ key, label, Icon }) => (
          <Item key={key} Icon={Icon} label={label} active={active === key} badge={key === 'favorites' ? favoriteIds.length : undefined} />
        ))}
      </nav>
      <div className="px-2 pb-1">
        <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/[0.06] px-2.5 py-2">
          <Crown className="size-4 text-primary" />
          <span className="flex-1 text-[13px] font-medium tracking-[0.02em] text-primary">Upgrade to Pro</span>
          <ArrowUpRight className="size-3.5 text-primary/60" />
        </div>
      </div>
      <div className="mx-3 border-t border-white/[0.05]" />
      <div className="space-y-0.5 px-2 py-3">
        <GroupLabel>Account</GroupLabel>
        <Item Icon={LifeBuoy} label="Help" />
        <Item Icon={Settings} label="Settings" />
        <Item Icon={LogOut} label="Sign out" danger />
      </div>
    </aside>
  )
}

/* ── Free usage bar (components/billing/free-usage-meter.tsx) ── */
function Meter({ Icon, label, used, total, className }: { Icon: LucideIcon; label: string; used: number; total: number; className?: string }) {
  return (
    <div className={cn('flex min-w-0 items-center gap-2', className)}>
      <Icon className="size-3.5 shrink-0 text-white/50" />
      <span className="text-[11px] font-medium text-white/55">{label}</span>
      <div className="flex flex-1 gap-[3px]">
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={cn('h-1.5 flex-1 rounded-full', i < used ? 'bg-primary shadow-[0_0_8px_rgba(92,255,176,0.35)]' : 'bg-white/[0.08]')} />
        ))}
      </div>
      <span className="tabular shrink-0 text-[11px] font-semibold text-white/70">
        {used}
        <span className="text-white/50">/{total}</span>
      </span>
    </div>
  )
}

export function UsageBar({ used = 5, className }: { used?: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-5 rounded-xl border border-white/[0.06] bg-white/[0.02] py-1.5 pl-3 pr-1.5', className)}>
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">Free plan</span>
      <Meter Icon={FileText} label="Prompts" used={used} total={14} className="max-w-[260px] flex-[7]" />
      <Meter Icon={Link2} label="Chains" used={1} total={2} className="max-w-[150px] flex-[3]" />
      <span className="ml-auto flex h-8 items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/[0.06] px-2.5 text-[11px] font-bold tracking-[0.03em] text-primary">
        <Crown className="size-3.5" /> Upgrade <ArrowUpRight className="size-3 opacity-60" />
      </span>
    </div>
  )
}

/** Compact stacked version used on the phone mockup. */
export function UsageMeter({ used = 5, className }: { used?: number; className?: string }) {
  return (
    <div className={cn('space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">Free plan</span>
        <span className="flex items-center gap-1 text-[11px] font-bold text-primary">
          <Crown className="size-3.5" /> Upgrade
        </span>
      </div>
      <Meter Icon={FileText} label="Prompts" used={used} total={14} />
      <Meter Icon={Link2} label="Chains" used={1} total={2} />
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

/* ── Prompt card (components/prompts/prompt-card.tsx) ─────── */
const ghostWidths = [92, 78, 86, 64, 90, 72, 81]

export function PromptCard({ p, locked = false, hover = false, favorite = false, className }: { p: SamplePrompt; locked?: boolean; hover?: boolean; favorite?: boolean; className?: string }) {
  const glow = glowFor(p.useCase)
  return (
    <div
      className={cn('relative flex h-[360px] flex-col overflow-hidden rounded-xl border bg-card', className)}
      style={
        hover
          ? { background: mix(glow, 8, 'var(--color-card)'), borderColor: mix(glow, p.chain ? 55 : 45), boxShadow: `0 0 18px ${mix(glow, 22)}` }
          : p.chain
            ? { borderColor: 'color-mix(in srgb, var(--color-primary) 40%, transparent)', boxShadow: `0 0 16px ${mix(glow, 28)}` }
            : { borderColor: 'color-mix(in srgb, var(--color-border) 40%, transparent)' }
      }
    >
      <div className="px-5 pb-3 pt-5">
        <div className="flex h-7 items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <ModelMarks model={p.model} extra={p.additionalModels?.length ?? 0} />
            <UseCaseBadge label={p.useCase} className="shrink" />
          </div>
          <RunsBadge count={p.runs} />
        </div>
        <div className="mt-3 flex items-start gap-2">
          <div className="line-clamp-2 flex-1 text-balance text-[16px] font-semibold leading-[1.3] tracking-[-0.01em] text-white/95">{p.title}</div>
          {p.chain && (
            <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full border border-primary/20 bg-primary/10">
              <Link2 className="size-2.5 text-primary/60" />
            </span>
          )}
        </div>
        <HarnessNote harness={p.harness} className="mt-1.5" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-5 pb-4">
        <div className="min-h-0 flex-1 overflow-hidden">
          {locked ? (
            <div className="relative h-full">
              <div className="space-y-2.5 pt-1 blur-[3px]">
                {ghostWidths.map((w, i) => (
                  <div key={i} className="h-2.5 rounded-full bg-white/[0.07]" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="absolute inset-0 grid place-items-center">
                <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-white/[0.1] bg-black/60 px-3 text-[11px] font-semibold text-white/70 backdrop-blur-sm">
                  <Lock className="size-3.5 text-primary" /> Hold to reveal
                </span>
              </div>
            </div>
          ) : (
            <PromptBody lines={p.body} className="text-[13.5px] leading-[1.6] text-white/60 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]" />
          )}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-1.5">
          {p.tags.slice(0, 3).map((t) => (
            <TagChip key={t} tag={t} />
          ))}
          {p.tags.length > 3 && <span className="inline-flex h-6 items-center rounded-md border border-white/[0.07] bg-white/[0.04] px-2 text-[11px] text-white/55">+{p.tags.length - 3}</span>}
        </div>
        <div className="mt-auto flex shrink-0 items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <FavoriteDot on={favorite} />
            <PlatformChips names={p.platforms} max={3} named />
          </div>
          <CopyDot locked={locked} />
        </div>
      </div>
    </div>
  )
}

/* ── Screens ───────────────────────────────────────────────── */
export function LibraryScreen({ compact = false }: { compact?: boolean }) {
  const ids = compact ? ['code-review', 'market'] : ['code-review', 'market', 'parallax']
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
            {ids.map((id, i) => (
              <PromptCard key={id} p={promptById(id)} hover={i === 0} favorite={i === 0 || id === 'parallax'} locked={i === 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Favorites (components/prompts/favorites-view.tsx) ─────── */
export function FavoritesMeter({ count = favoriteIds.length, limit = favoriteLimits.free }: { count?: number; limit?: number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]">
      <span className={cn('tabular font-mono', count >= limit ? 'text-red-400/80' : 'text-white/55')}>
        {count} / {limit} favorites
      </span>
      <span className="font-medium text-primary/80">Upgrade to keep up to {favoriteLimits.pro}</span>
    </div>
  )
}

export function Rail({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('min-w-0 rounded-lg border border-white/[0.07] bg-white/[0.02] p-4', className)}>
      <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/55">{title}</h4>
      <div className="space-y-1">{children}</div>
    </section>
  )
}

export function RailRow({ title, subtitle, meta, highlight }: { title: string; subtitle?: string; meta?: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={cn('flex items-center gap-1 rounded', highlight && 'bg-white/[0.04]')}>
      <div className="min-w-0 flex-1 px-2 py-1.5">
        <span className={cn('line-clamp-1 block text-[12px]', highlight ? 'text-white' : 'text-white/60')}>{title}</span>
        {subtitle && <span className="mt-0.5 block truncate text-[11px] text-white/50">{subtitle}</span>}
      </div>
      <div className="flex shrink-0 items-center gap-1.5 pr-1 text-[12px]">
        {meta}
        <CopyDot />
      </div>
    </div>
  )
}

export function FavoriteRails({ className }: { className?: string }) {
  const favs = favoriteIds.map(promptById)
  const mostUsed = [...favs].sort((a, b) => (b.yourRuns ?? 0) - (a.yourRuns ?? 0)).slice(0, 3)
  return (
    <div className={cn('grid grid-cols-3 gap-4', className)}>
      <Rail title="Most Used">
        {mostUsed.map((p, i) => (
          <RailRow
            key={p.id}
            title={p.title}
            highlight={i === 0}
            meta={
              <span className="inline-flex items-center gap-1 text-white/50">
                <Activity className="size-3" />
                {p.yourRuns}
              </span>
            }
          />
        ))}
      </Rail>
      <Rail title="Most Recent">
        {[...favs].reverse().slice(0, 3).map((p) => (
          <RailRow key={p.id} title={p.title} />
        ))}
      </Rail>
      <Rail title="Because You Favorited">
        {recommendations.map((r) => (
          <RailRow key={r.title} title={r.title} subtitle={`Because you favorited ${r.because}`} meta={<FavoriteDot />} />
        ))}
      </Rail>
    </div>
  )
}

export function FavoritesScreen({ compact = false, autoplay = 0 }: { compact?: boolean; autoplay?: number }) {
  return (
    <div className="flex h-full">
      {!compact && <Sidebar active="favorites" />}
      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />
        <div className="relative min-h-0 flex-1 overflow-hidden px-6 pt-5 [mask-image:linear-gradient(to_bottom,black_86%,transparent)]">
          <FavoritesMeter />
          <FavoritesCoverflow cardW={compact ? 210 : 222} autoplay={autoplay} className="mt-4" />
          <FavoriteRails className="mt-6" />
        </div>
      </div>
    </div>
  )
}

/* ── Chains (components/prompts/chain-card.tsx + chain-depth.tsx) ── */
const DROPS: [number, number][] = [
  [10, 26],
  [16, 40],
  [12, 32],
  [18, 46],
  [11, 30],
  [15, 38],
  [13, 34],
]

function LinkRun({ length }: { length: number }) {
  const w = 9
  const L = 15
  const sw = 2.1
  const pitch = L - 2 * sw - 2.5
  const count = Math.ceil(length / pitch) + 1
  const cx = w / 2 + 1
  const faces: React.ReactNode[] = []
  const edges: React.ReactNode[] = []
  for (let k = 0; k < count; k++) {
    const y = k * pitch - 2
    if (k % 2 === 0) faces.push(<rect key={k} x={cx - w / 2 + sw / 2} y={y + sw / 2} width={w - sw} height={L - sw} rx={(w - sw) / 2} fill="none" stroke="url(#chain-metal)" strokeWidth={sw} />)
    else edges.push(<rect key={k} x={cx - 1.7} y={y} width={3.4} height={L} rx={1.7} fill="url(#chain-metal)" stroke="rgba(0,0,0,0.45)" strokeWidth={0.5} />)
  }
  return (
    <svg width={w + 2} height={length} viewBox={`0 0 ${w + 2} ${length}`} className="shrink-0" aria-hidden>
      {faces}
      {edges}
    </svg>
  )
}

/** Shared gradient for every LinkRun on the page. */
export function ChainMetalDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <linearGradient id="chain-metal" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#1d2925" />
          <stop offset=".3" stopColor="#9fc9b8" />
          <stop offset=".48" stopColor="#effff7" />
          <stop offset=".7" stopColor="#5f8a7b" />
          <stop offset="1" stopColor="#1d2925" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/** Each step hangs from the card as a tag on its own chain; past six, one "+N" tag stands for the rest. */
export function HangingTags({ count, locked = false, open = true, active = 0, label }: { count: number; locked?: boolean; open?: boolean; active?: number; label?: string }) {
  const shown = Math.min(count, 6)
  const items = Array.from({ length: shown + (count > 6 ? 1 : 0) }, (_, i) => i)
  return (
    <div>
      <div className="relative">
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] rounded-full bg-[linear-gradient(to_bottom,#effff7,#9fc9b8_35%,#5f8a7b_65%,#1d2925)] shadow-[0_1px_2px_rgba(0,0,0,0.7)]" />
        <ol className="relative flex gap-3 overflow-hidden px-2 pb-3 pt-0.5">
          {items.map((i) => {
            const more = i === 6
            const final = more || i === count - 1
            const hidden = locked && i > 0 && !more
            const [closed, opened] = DROPS[i % DROPS.length]
            return (
              <li key={i} className="flex shrink-0 origin-top animate-[chain-tag-swing_2.6s_ease-in-out_infinite] flex-col items-center motion-reduce:animate-none" style={{ animationDelay: `${i * -0.45}s` }}>
                <span className="flex justify-center overflow-hidden transition-[height] duration-500" style={{ height: open ? opened : closed }}>
                  <LinkRun length={56} />
                </span>
                <span
                  className={cn(
                    'relative -mt-1 grid h-[58px] w-[46px] place-items-center overflow-hidden rounded-[10px_10px_14px_14px] border bg-[linear-gradient(160deg,color-mix(in_srgb,var(--color-primary)_8%,#1a1d1f),var(--color-card)_70%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_18px_-10px_rgba(0,0,0,0.7)]',
                    hidden
                      ? 'border-dashed border-white/[0.14] bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.03)_0_5px,transparent_5px_10px),var(--color-card)]'
                      : final
                        ? 'border-[color-mix(in_srgb,var(--color-primary)_60%,transparent)] shadow-[0_0_18px_-4px_color-mix(in_srgb,var(--color-primary)_35%,transparent)]'
                        : 'border-white/[0.12]',
                    i === active && 'border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)]',
                  )}
                >
                  <span aria-hidden className="absolute left-1/2 top-[5px] size-2 -translate-x-1/2 rounded-full bg-background shadow-[inset_0_1px_1px_rgba(0,0,0,0.7),0_0_0_1.5px_#5f8a7b]" />
                  <span className={cn('tabular mt-2.5 font-mono text-[14px] font-semibold', hidden ? 'text-white/50' : final ? 'text-primary' : 'text-white/80')}>
                    {hidden ? <Lock className="size-3.5" /> : more ? `+${count - 6}` : String(i + 1).padStart(2, '0')}
                  </span>
                </span>
              </li>
            )
          })}
        </ol>
      </div>
      {label && (
        <p className="flex h-9 min-w-0 items-center gap-2 rounded-[10px] border border-white/[0.07] bg-white/[0.02] px-3 text-[12.5px] text-white/60">
          <span className="tabular font-mono text-[11px] font-semibold text-primary">{String(active + 1).padStart(2, '0')}</span>
          <span className="min-w-0 flex-1 truncate">{label}</span>
        </p>
      )}
    </div>
  )
}

export function ChainCard({
  name = featuredChain.name,
  description = featuredChain.description,
  steps = featuredChain.steps.map((s) => s.title),
  platforms = featuredChain.platforms,
  locked = false,
  expanded = false,
  active = 0,
  className,
}: {
  name?: string
  description?: string
  steps?: string[]
  platforms?: string[]
  locked?: boolean
  expanded?: boolean
  active?: number
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_10px_24px_-14px_rgba(0,0,0,0.7)]',
        'bg-[radial-gradient(120%_70%_at_50%_0%,color-mix(in_srgb,var(--color-primary)_9%,var(--color-card))_0%,var(--color-card)_60%)]',
        expanded ? 'border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)]' : 'border-[color-mix(in_srgb,var(--color-primary)_16%,rgba(255,255,255,0.06))]',
        className,
      )}
    >
      <div className="px-5 pt-4">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="tabular bg-gradient-to-b from-white to-white/45 bg-clip-text font-mono text-[26px] font-bold leading-none tracking-[-0.04em] text-transparent">{steps.length}</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
            Steps {locked && <Lock className="size-2.5 text-white/55" />}
          </span>
        </div>
        <div className="line-clamp-2 text-balance text-[16px] font-semibold leading-[1.3] tracking-[-0.01em] text-white/95">{name}</div>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-white/50">{description}</p>
      </div>
      <div className="px-5 pb-3 pt-3.5">
        <HangingTags count={steps.length} locked={locked} active={active} label={locked && active > 0 ? 'Locked until revealed' : steps[active]} />
        {expanded && (
          <ol className="relative mt-3 space-y-1">
            <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-gradient-to-b from-primary/50 to-primary/10" />
            {steps.map((s, i) => (
              <li key={s} className="relative flex h-7 items-center gap-3">
                <span className="tabular inline-grid size-6 shrink-0 place-items-center rounded-full border border-primary/45 bg-card font-mono text-[11px] font-semibold text-primary">{i + 1}</span>
                <span className={cn('truncate text-[13px]', i === active ? 'text-white' : 'text-white/70')}>{s}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="mt-auto flex min-h-12 items-center gap-1.5 border-t border-white/[0.05] py-2 pl-5 pr-3">
        <PlatformChips names={platforms} max={4} named />
        <span
          className="inline-grid size-6 place-items-center rounded-md border"
          style={{ background: 'linear-gradient(135deg, rgba(250,204,21,0.14) 0%, rgba(253,224,71,0.26) 52%, rgba(202,138,4,0.16) 100%)', borderColor: 'rgba(250,204,21,0.45)', color: '#fde68a' }}
          title="Semi-Automated"
        >
          <MousePointerClick className="size-3" />
        </span>
        <span className="ml-auto grid size-7 place-items-center rounded-full text-white/50">
          <ChevronDown className={cn('size-4', expanded && 'rotate-180')} />
        </span>
      </div>
    </div>
  )
}

export function ChainScreen({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full">
      {!compact && <Sidebar active="chains" />}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />
        <div className="relative min-h-0 flex-1 overflow-hidden p-6 [mask-image:linear-gradient(to_bottom,black_88%,transparent)]">
          <div className="text-2xl font-bold tracking-tight">Prompt Chains</div>
          <div className="mt-1 text-[13px] text-white/35">An ordered, runnable sequence. Every step shares one use case.</div>
          <div className={cn('mt-5 grid items-start gap-4', compact ? 'grid-cols-2' : 'grid-cols-3')}>
            <ChainCard expanded active={2} />
            <ChainCard
              name={otherChains[0].name}
              description="Audit every screen for clarity and consistency, then rebuild the weakest ones as a polished system."
              steps={['UX Heuristic Audit', 'Design Token Extraction', 'Component Inventory', 'Accessibility Pass', 'Motion & Micro-interactions', 'Visual QA']}
              platforms={['Claude Design']}
              locked
              active={0}
            />
            {!compact && (
              <ChainCard
                name={otherChains[2].name}
                description="From a one-line idea to a scroll-driven launch page with depth planes, deployed."
                steps={['Positioning One-Pager', 'Hero Copy Rewriter', 'Depth-Plane Art Direction', 'Scroll-Driven Parallax Builder', 'Launch QA']}
                platforms={['Vercel']}
                active={3}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Motion Prompting (components/prompts/image-motion-view.tsx) ── */
function MotionSwitch({ value }: { value: 'image' | 'video' }) {
  return (
    <div className="flex rounded-lg border border-white/[0.08] bg-white/[0.02] p-0.5">
      {(
        [
          ['image', 'Image', ImageIcon],
          ['video', 'Video', Video],
        ] as const
      ).map(([k, l, I]) => (
        <span key={k} className={cn('flex h-8 items-center gap-1.5 rounded-md px-3 text-[12px] font-semibold', value === k ? 'bg-white/[0.07] text-white' : 'text-white/45')}>
          <I className="size-3.5" /> {l}
        </span>
      ))}
    </div>
  )
}

function MediaCard({ p, className, favorite }: { p: SamplePrompt; className?: string; favorite?: boolean }) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl bg-black shadow-[0_14px_36px_-18px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.08]', className)}>
      <MediaArt k={p.art!} className="absolute inset-0" />
      {p.kind === 'video' && (
        <>
          <span className="absolute left-1/2 top-[42%] grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/[0.15] bg-white/[0.06] backdrop-blur-sm">
            <Play className="ml-0.5 size-4 fill-white text-white" />
          </span>
          <span className="absolute right-2.5 top-2.5 rounded border border-white/[0.15] bg-black/70 px-1.5 font-mono text-[10px] text-white/80">{p.duration}</span>
        </>
      )}
      <span className="absolute left-2.5 top-2.5">
        <ModelMarks model={p.model} size="sm" />
      </span>
      <div className="absolute inset-x-0 bottom-0 space-y-1.5 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-3 pb-3 pt-10">
        <div className="flex min-w-0 items-center gap-2">
          <UseCaseBadge label={p.useCase} size="sm" overlay className="max-w-[45%] shrink-0" />
          <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold tracking-tight text-white/95">{p.title}</span>
          <FavoriteDot on={favorite} />
        </div>
        <div className="flex min-w-0 items-center gap-1">
          {p.tags.slice(0, 2).map((t) => (
            <TagChip key={t} tag={t} small />
          ))}
          <PlatformChips names={p.platforms} named className="ml-auto" />
        </div>
      </div>
    </div>
  )
}

export function MotionScreen({ compact = false }: { compact?: boolean }) {
  const synth = promptById('synthwave')
  const clock = promptById('clockwork')
  const mug = promptById('mug')
  const glass: SamplePrompt = { ...synth, id: 'glass', title: 'Glass App Icon', art: 'glassIcon', model: 'Image 2.5 Sunburst', tags: ['icon', 'glass'] }
  return (
    <div className="flex h-full">
      {!compact && <Sidebar active="motion" />}
      <div className="flex min-w-0 flex-1 flex-col gap-5 overflow-hidden p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-2xl font-bold tracking-tight">Motion Prompting</div>
            <div className="mt-1 text-[13px] text-white/35">Image generation prompts, the picture, and the prompt behind it.</div>
          </div>
          <MotionSwitch value="image" />
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <SlidersHorizontal className="size-4" /> Filters <ChevronDown className="size-4" />
          <span className="ml-3 flex gap-1.5">
            {['Image Gen', 'Photo Editing'].map((u) => (
              <UseCaseBadge key={u} label={u} size="sm" />
            ))}
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-white/25">Landscape</span>
            <span className="font-mono text-[10px] text-white/15">16:9</span>
            <span className="text-[10px] text-white/20">· 3</span>
          </div>
          <div className="mt-3 grid h-[230px] grid-cols-[2.2fr_1fr] gap-3">
            <MediaCard p={synth} favorite />
            {!compact ? <MediaCard p={glass} /> : <MediaCard p={mug} />}
          </div>
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.5fr] gap-3">
          <MediaCard p={mug} />
          <MediaCard p={clock} favorite />
        </div>
      </div>
    </div>
  )
}
