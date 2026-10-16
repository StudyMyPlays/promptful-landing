export const APP_URL = 'https://www.promptful.org'

/**
 * Where this landing page itself is served, used for the canonical URL, sitemap and
 * structured data. Set NEXT_PUBLIC_SITE_URL once a custom domain is attached; until
 * then Vercel's production hostname is used.
 */
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelHost ? `https://${vercelHost}` : 'https://promptful-landing.vercel.app')
).replace(/\/+$/, '')

export const seo = {
  title: 'Promptful | AI Prompt Library for Claude Code, ChatGPT and Codex',
  description:
    'A curated AI prompt library of tested text, image and video prompts and multi-step prompt chains, each tagged with the harness it runs in (Claude Code, Codex, ChatGPT, Perplexity) and the model it was tuned for. Start free.',
  keywords: [
    'AI prompt library',
    'prompt library',
    'Claude Code prompts',
    'ChatGPT prompts',
    'Codex prompts',
    'Perplexity prompts',
    'prompt chains',
    'AI video prompts',
    'AI image prompts',
    'prompt templates',
    'coding prompts',
    'best AI prompts',
  ],
} as const

export const links = {
  signup: `${APP_URL}/signup`,
  login: `${APP_URL}/login`,
  pricing: `${APP_URL}/pricing`,
  academy: `${APP_URL}/booking`,
  enroll: `${APP_URL}/booking/enroll`,
  support: 'mailto:support@promptful.org',
} as const

export const navLinks = [
  { id: 'library', label: 'Library', href: '#library' },
  { id: 'favorites', label: 'Favorites', href: '#favorites' },
  { id: 'reveal', label: 'How it works', href: '#reveal' },
  { id: 'chains', label: 'Chains', href: '#chains' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
] as const
