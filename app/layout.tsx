import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { SmoothScroll } from '@/components/motion/smooth-scroll'
import { APP_URL } from '@/lib/site'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

const title = 'Promptful — Curated. Validated. Yours.'
const description =
  'A curated library of production-ready prompts and chains — each tagged with the harness it runs in and the model it was tuned for. Reveal 14 free.'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title,
  description,
  applicationName: 'Promptful',
  openGraph: {
    type: 'website',
    siteName: 'Be Promptful',
    title,
    description,
    url: APP_URL,
  },
  twitter: { card: 'summary_large_image', title, description },
}

export const viewport: Viewport = {
  themeColor: '#020304',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-mint px-4 py-2 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
