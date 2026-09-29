import { Bento } from '@/components/sections/bento'
import { ChainStory } from '@/components/sections/chain-story'
import { Faq } from '@/components/sections/faq'
import { FinalCta } from '@/components/sections/final-cta'
import { Footer } from '@/components/sections/footer'
import { Hero } from '@/components/sections/hero'
import { LogoMarquee } from '@/components/sections/logo-marquee'
import { Manifesto } from '@/components/sections/manifesto'
import { Nav } from '@/components/sections/nav'
import { Pricing } from '@/components/sections/pricing'
import { RevealDemo } from '@/components/sections/reveal-demo'
import { Showcase } from '@/components/sections/showcase'

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <div className="relative">
          <Manifesto />
          <LogoMarquee />
          <Showcase />
          <RevealDemo />
          <ChainStory />
          <Bento />
          <Pricing />
          <Faq />
        </div>
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
