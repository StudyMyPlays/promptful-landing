'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { scrollToTarget, useLenis } from '@/components/motion/smooth-scroll'
import { EASE } from '@/components/motion/primitives'
import { PremiumCta, Wordmark } from '@/components/ui/brand'
import { cn } from '@/lib/cn'
import { links, navLinks } from '@/lib/site'

export function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    if (open) return
    if (y < 480 || y < prev - 4) setHidden(false)
    else if (y > prev + 4) setHidden(true)
  })

  // Active section tracking
  useEffect(() => {
    const els = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lenis])

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    scrollToTarget(lenis, href, 0)
    history.replaceState(null, '', href)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4"
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div
          className={cn(
            'flex h-14 w-full max-w-[1180px] items-center rounded-2xl pl-4 pr-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 sm:pl-5',
            scrolled || open
              ? 'glass shadow-[0_20px_50px_-30px_rgba(0,0,0,.9)]'
              : 'border border-transparent bg-transparent',
          )}
        >
          <Link href="/" aria-label="Promptful home" className="rounded-md">
            <Wordmark size={19} beta />
          </Link>

          <nav aria-label="Primary" className="mx-auto hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={go(l.href)}
                className={cn(
                  'relative rounded-lg px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors',
                  active === l.id ? 'text-white' : 'text-white/50 hover:text-white/85',
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg border border-white/[0.07] bg-white/[0.05]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
            <Link
              href={links.login}
              className="hidden rounded-lg px-3 py-2 text-[13px] font-medium text-white/60 transition-colors hover:text-white sm:inline-flex"
            >
              Log in
            </Link>
            <PremiumCta href={links.signup} size="sm" className="hidden sm:inline-flex">
              Get started
            </PremiumCta>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/80 lg:hidden"
            >
              {open ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-[#020304]/[0.97] px-6 pb-8 pt-28 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
            <nav aria-label="Mobile" className="relative flex flex-col">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={l.href}
                  onClick={go(l.href)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.6, ease: EASE }}
                  className="flex items-baseline gap-4 border-b border-white/[0.06] py-5 text-[30px] font-bold tracking-[-0.03em] text-white/90"
                >
                  <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-mint/60">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="relative mt-auto flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
            >
              <PremiumCta href={links.signup} size="lg" className="w-full">
                Get started free
              </PremiumCta>
              <PremiumCta href={links.login} variant="secondary" size="lg" arrow={false} className="w-full">
                Log in
              </PremiumCta>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
