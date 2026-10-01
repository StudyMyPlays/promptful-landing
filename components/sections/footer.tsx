import Link from 'next/link'
import { Wordmark } from '@/components/ui/brand'
import { APP_URL, links } from '@/lib/site'

const cols = [
  {
    title: 'Product',
    items: [
      { label: 'Library', href: '#library' },
      { label: 'Prompt chains', href: '#chains' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Learn',
    items: [
      { label: 'AI Academy', href: links.academy },
      { label: 'Enroll', href: links.enroll },
      { label: 'Full pricing', href: links.pricing },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Create account', href: links.signup },
      { label: 'Log in', href: links.login },
      { label: 'Contact support', href: links.support },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] bg-[#030405]">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_2fr]">
          <div>
            <Wordmark size={24} beta />
            <p className="mt-4 max-w-[300px] text-[14px] leading-relaxed text-white/45">
              A curated collection of exclusive prompts, created for everything.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">{c.title}</div>
                <ul className="mt-4 space-y-2.5">
                  {c.items.map((it) => (
                    <li key={it.label}>
                      <Link href={it.href} className="text-[14px] text-white/60 transition-colors hover:text-white">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.05] pt-8 text-[12px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Promptful · {APP_URL.replace('https://www.', '')}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">Built for builders who prompt</span>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <div className="container-x">
          <div className="translate-y-[18%] text-center text-[clamp(64px,19vw,260px)] font-black leading-[0.8] tracking-[-0.06em] text-transparent">
            <span className="bg-gradient-to-b from-white/[0.07] to-white/0 bg-clip-text">promptful</span>
            <span className="bg-gradient-to-b from-mint/40 to-mint/0 bg-clip-text">.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
