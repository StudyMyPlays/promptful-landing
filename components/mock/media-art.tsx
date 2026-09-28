/**
 * Code-drawn stand-ins for the generated image-prompt renders.
 * Swapped for real files when `media[key].ready` is true.
 */
import Image from 'next/image'
import { media, videos } from '@/lib/assets'
import { cn } from '@/lib/cn'

type Key = keyof typeof media

const art: Record<Key, React.ReactNode> = {
  neonRain: (
    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#07100d 0%,#0a1f18 55%,#030605 100%)' }}>
      <div className="absolute inset-x-[18%] top-[8%] h-[70%] rounded-[40%] opacity-80 blur-2xl" style={{ background: 'radial-gradient(closest-side,rgba(92,255,176,.45),transparent)' }} />
      <div className="absolute left-[12%] top-[14%] h-[46%] w-[3%] rounded-full bg-mint/80 shadow-[0_0_24px_8px_rgba(92,255,176,.45)]" />
      <div className="absolute right-[16%] top-[22%] h-[30%] w-[2.4%] rounded-full bg-[#ff5fa2]/80 shadow-[0_0_22px_6px_rgba(255,95,162,.45)]" />
      <div className="absolute inset-x-[30%] bottom-[18%] top-[34%] rounded-t-[48%] bg-[#020403]" />
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-linear-gradient(100deg,transparent 0 9px,rgba(200,255,235,.14) 9px 10px)' }} />
      <div className="absolute inset-x-0 bottom-0 h-[20%]" style={{ background: 'linear-gradient(180deg,transparent,rgba(92,255,176,.18))' }} />
    </div>
  ),
  ceramicMug: (
    <div className="absolute inset-0" style={{ background: 'radial-gradient(90% 80% at 40% 20%,#2a2d2c,#0d0f0e 70%)' }}>
      <div className="absolute bottom-[16%] left-[26%] h-[46%] w-[40%] rounded-b-[18%] rounded-t-[6%]" style={{ background: 'linear-gradient(90deg,#4b4f4c,#cfd4d0 38%,#8d938f 62%,#3a3d3b)' }} />
      <div className="absolute bottom-[30%] left-[62%] h-[22%] w-[16%] rounded-r-full border-[7px] border-l-0 border-[#9aa19c]" />
      <div className="absolute bottom-[13%] left-[18%] h-[6%] w-[58%] rounded-[50%] bg-black/60 blur-md" />
      <div className="absolute left-[30%] top-[22%] h-[14%] w-[4%] rounded-full bg-white/10 blur-sm" />
    </div>
  ),
  glassIcon: (
    <div className="absolute inset-0" style={{ background: 'radial-gradient(80% 80% at 50% 40%,#0f1f19,#040706 75%)' }}>
      <div className="absolute inset-[22%] rounded-[28%] border border-white/25 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_30px_60px_-20px_rgba(92,255,176,.45)] backdrop-blur-md" />
      <div className="absolute inset-[38%] rounded-full bg-mint shadow-[0_0_40px_12px_rgba(92,255,176,.55)]" />
      <div className="absolute left-[26%] top-[24%] h-[10%] w-[40%] rounded-full bg-white/20 blur-md" />
    </div>
  ),
  synthwave: (
    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#0b0620 0%,#2a0d3a 42%,#07130f 58%,#020304 100%)' }}>
      <div className="absolute left-1/2 top-[18%] size-[34%] -translate-x-1/2 rounded-full" style={{ background: 'repeating-linear-gradient(180deg,#ffd36b 0 8%,transparent 8% 11%), linear-gradient(180deg,#ffd36b,#ff4fa0)', WebkitMask: 'linear-gradient(180deg,#000 55%,transparent 56%, transparent 60%, #000 61%, #000 68%, transparent 69%)' }} />
      <div className="absolute inset-x-0 top-[40%] h-[18%]" style={{ background: 'linear-gradient(180deg,transparent,#05030c)', clipPath: 'polygon(0 100%,0 60%,6% 40%,9% 62%,14% 30%,18% 55%,24% 20%,29% 58%,35% 45%,41% 70%,48% 26%,53% 60%,60% 36%,66% 64%,72% 18%,77% 52%,84% 38%,90% 66%,95% 44%,100% 58%,100% 100%)' }} />
      <div className="absolute inset-x-0 bottom-0 top-[58%] [perspective:200px]">
        <div className="absolute inset-0 origin-top [transform:rotateX(62deg)]" style={{ backgroundImage: 'linear-gradient(rgba(92,255,176,.55) 1px,transparent 1px),linear-gradient(90deg,rgba(92,255,176,.55) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
      </div>
    </div>
  ),
  clockwork: (
    <div className="absolute inset-0" style={{ background: 'radial-gradient(80% 90% at 40% 40%,#2a1a0a,#070504 70%)' }}>
      {[
        ['18%', '14%', '46%', '0s', '18s'],
        ['52%', '38%', '34%', '0s', '12s'],
        ['66%', '4%', '26%', '0s', '9s'],
      ].map(([l, t, s, , d], i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: l, top: t, width: s, aspectRatio: '1',
            background: 'repeating-conic-gradient(from 0deg,#c98b3a 0 10deg,transparent 10deg 20deg)',
            WebkitMask: 'radial-gradient(circle,transparent 22%,#000 23%,#000 58%,transparent 59%,transparent 64%,#000 65%,#000 72%,transparent 73%)',
            animation: `spin ${d} linear infinite ${i % 2 ? 'reverse' : ''}`,
            opacity: 0.85,
          }}
        />
      ))}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(60% 60% at 45% 45%,transparent,rgba(0,0,0,.7))' }} />
    </div>
  ),
  heroBanner: (
    <div className="absolute inset-0" style={{ background: 'radial-gradient(70% 90% at 70% 30%,#12302a,#040706 70%)' }}>
      <div className="absolute left-[14%] top-[22%] h-[52%] w-[38%] rotate-[-8deg] rounded-xl border border-white/15 bg-white/[0.05] shadow-2xl backdrop-blur-sm" />
      <div className="absolute left-[34%] top-[30%] h-[46%] w-[40%] rotate-[4deg] rounded-xl border border-mint/30 bg-mint/[0.07] shadow-[0_20px_60px_-10px_rgba(92,255,176,.35)]" />
      <div className="absolute left-[58%] top-[16%] h-[36%] w-[26%] rotate-[12deg] rounded-xl border border-white/10 bg-white/[0.04]" />
      <div className="absolute left-[40%] top-[40%] h-[4%] w-[22%] rounded-full bg-white/30" />
      <div className="absolute left-[40%] top-[50%] h-[3%] w-[14%] rounded-full bg-white/15" />
    </div>
  ),
}

export function MediaArt({ k, className, sizes = '400px' }: { k: Key; className?: string; sizes?: string }) {
  const a = media[k]
  return (
    <div className={cn('relative overflow-hidden', className)}>
      {k === 'clockwork' && videos.clockwork.ready ? (
        <video className="absolute inset-0 h-full w-full object-cover" src={videos.clockwork.src} poster={a.ready ? a.src : undefined} muted playsInline loop autoPlay preload="none" aria-label={a.alt} />
      ) : a.ready ? (
        <Image src={a.src} alt={a.alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div role="img" aria-label={a.alt} className="absolute inset-0">
          {art[k]}
        </div>
      )}
      <div className="grain" />
    </div>
  )
}
