import { Counter, Reveal } from '@/components/motion/primitives'
import { harnesses, models, useCases } from '@/lib/content'

const stats = [
  { n: useCases.length, label: 'Use cases', note: 'from Coding to Travel' },
  { n: harnesses.length, label: 'Harnesses', note: 'Claude Code, Codex, Comet…' },
  { n: models.length, label: 'Models', note: 'tuned for, not guessed at' },
  { n: 14, label: 'Free reveals', note: 'yours to keep, forever' },
]

export function Numbers() {
  return (
    <section aria-label="Promptful in numbers" className="relative">
      <div className="container-x">
        <div className="grid grid-cols-2 border-y border-white/[0.06] lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={
                'relative px-2 py-10 sm:px-6 lg:py-14 ' +
                (i % 2 === 1 ? 'border-l border-white/[0.06] ' : '') +
                (i === 2 ? 'lg:border-l ' : '') +
                (i >= 2 ? 'border-t border-white/[0.06] lg:border-t-0' : '')
              }
            >
              <div className="text-[clamp(44px,6vw,76px)] font-extrabold leading-none tracking-[-0.05em]">
                <Counter to={s.n} />
                <span className="text-mint">.</span>
              </div>
              <div className="mt-3 text-[14px] font-semibold text-white/85">{s.label}</div>
              <div className="mt-0.5 text-[13px] text-white/40">{s.note}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
