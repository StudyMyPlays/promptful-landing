import { ScrubText } from '@/components/motion/primitives'

const paragraphs = [
  {
    text: 'Most prompts you find are untested, untagged, and written for a model that shipped last year. So you paste, tweak, and hope it holds up in the tool you actually use.',
    highlight: [],
    className: 'text-white/55',
  },
  {
    text: 'Promptful is a curated library of production-ready prompts, written by hand and run before they ship. Every card tells you where it runs, from Claude Code to Perplexity Comet, and which model it was tuned for.',
    highlight: ['production-ready', 'written', 'by', 'hand'],
  },
  {
    text: 'When one prompt is not enough, chains string them into ordered, repeatable runs. You bring the work. The library brings the playbook.',
    highlight: ['chains'],
  },
]

export function Manifesto() {
  return (
    <section id="intro" className="relative py-[clamp(96px,14vw,200px)]">
      <div className="container-x">
        <div className="mx-auto max-w-[760px]">
          <div className="space-y-[1.1em] text-[clamp(22px,2.6vw,34px)] font-semibold leading-[1.3] tracking-[-0.025em]">
            {paragraphs.map((p, i) => (
              <ScrubText key={i} text={p.text} highlight={p.highlight} className={p.className} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
