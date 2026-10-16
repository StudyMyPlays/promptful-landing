/**
 * Marketing content, sourced from the Promptful product
 * (be-promptful: lib/constants.ts, lib/billing.ts, lib/favorites/limits.ts,
 * lib/defaults/default-platforms.ts, seeded chains).
 */

export type UseCase = { label: string; glow: string }

/** Every text use case, in the app's order (PROMPT_TYPES). */
export const useCases: UseCase[] = [
  { label: 'Coding', glow: '#3b82f6' },
  { label: 'Sales & Marketing', glow: '#f97316' },
  { label: 'Content Creation', glow: '#a855f7' },
  { label: 'Security', glow: '#ef4444' },
  { label: 'Backend', glow: '#22c55e' },
  { label: 'Real-World Use Cases', glow: '#eab308' },
  { label: 'Data & Analytics', glow: '#06b6d4' },
  { label: 'Research', glow: '#818cf8' },
  { label: 'UI/UX Design', glow: '#ec4899' },
  { label: 'Writing & Communication', glow: '#14b8a6' },
  { label: 'Legal & Compliance', glow: '#f59e0b' },
  { label: 'Video Editing', glow: '#fb7185' },
  { label: 'Household', glow: '#38bdf8' },
  { label: 'Business', glow: '#fdba74' },
  { label: 'Travel', glow: '#67e8f9' },
  { label: 'Mobile App Development', glow: '#a78bfa' },
  { label: 'Social Media', glow: '#e879f9' },
  { label: 'DevOps & Infrastructure', glow: '#cbd5e1' },
  { label: 'Payments & Billing', glow: '#86efac' },
  { label: 'Product Management', glow: '#93c5fd' },
  { label: 'Performance', glow: '#fde047' },
  { label: 'Parallax Website', glow: '#6ee7b7' },
]

/** Image cards carry one of these instead (IMAGE_USE_CASES). */
export const imageUseCases: UseCase[] = [
  { label: 'Image Gen', glow: '#ec4899' },
  { label: 'Photo Editing', glow: '#fbbf24' },
]

/** A video card's use case is its video type (VIDEO_TYPES). */
export const videoTypes: UseCase[] = [
  { label: 'Motion Graphics', glow: '#38bdf8' },
  { label: 'UGC / Creator Content', glow: '#fb7185' },
  { label: 'Animations', glow: '#c084fc' },
  { label: '3D / CGI', glow: '#2dd4bf' },
  { label: 'VFX / Experimental', glow: '#fb923c' },
  { label: 'Product / E-commerce', glow: '#facc15' },
]

const allBadges = [...useCases, ...imageUseCases, ...videoTypes]
export const glowFor = (label: string) => allBadges.find((u) => u.label === label)?.glow ?? '#5cffb0'

export type Tool = { label: string; logo: string; kind: 'harness' | 'model' | 'platform'; color: string; invert?: boolean }

export const harnesses: Tool[] = [
  { label: 'Claude Code', logo: '/platforms/claude-color.webp', kind: 'harness', color: '#C15F3C' },
  { label: 'Codex', logo: '/platforms/openai.webp', kind: 'harness', color: '#10A37F' },
  { label: 'ChatGPT Work', logo: '/platforms/openai.webp', kind: 'harness', color: '#10A37F' },
  { label: 'Perplexity Comet', logo: '/platforms/perplexity-color.webp', kind: 'harness', color: '#20808D' },
  { label: 'Perplexity Computer', logo: '/platforms/perplexity-color.webp', kind: 'harness', color: '#20808D' },
  { label: 'Claude Co-Work', logo: '/platforms/claude-color.webp', kind: 'harness', color: '#C15F3C' },
  { label: 'Firecrawl Agent', logo: '/platforms/firecrawl.svg', kind: 'harness', color: '#FF6B35' },
  { label: 'Higgsfield Supercomputer', logo: '/platforms/higgsfield.svg', kind: 'harness', color: '#D946EF' },
]

export const models: Tool[] = [
  { label: 'Astra', logo: '/platforms/openai.webp', kind: 'model', color: '#10A37F' },
  { label: 'Fable 3.1', logo: '/platforms/claude-color.webp', kind: 'model', color: '#C15F3C' },
  { label: 'Opus 5.5', logo: '/platforms/claude-color.webp', kind: 'model', color: '#C15F3C' },
  { label: 'Gemini 3.8', logo: '/platforms/gemini-color.svg', kind: 'model', color: '#4285F4' },
  { label: 'Deep Research', logo: '/platforms/perplexity-color.webp', kind: 'model', color: '#20808D' },
  { label: 'BrowserUse', logo: '/platforms/perplexity-color.webp', kind: 'model', color: '#20808D' },
  { label: 'Image 2.5 Flare', logo: '/platforms/openai.webp', kind: 'model', color: '#F97316' },
  { label: 'Image 2.5 Sunburst', logo: '/platforms/gemini-color.svg', kind: 'model', color: '#FBBC04' },
  { label: 'Seedance 2.5', logo: '/platforms/seedance.webp', kind: 'model', color: '#0EA5E9' },
]

/** The platform directory a prompt can be built for (default-platforms.ts). */
export const platforms: Tool[] = [
  { label: 'Supabase', logo: '/platforms/supabase.webp', kind: 'platform', color: '#34B27B' },
  { label: 'Claude Design', logo: '/platforms/claude-color.webp', kind: 'platform', color: '#C15F3C' },
  { label: 'Resend', logo: '/platforms/resend-icon-black.png', kind: 'platform', color: '#E11D48', invert: true },
  { label: 'Swift', logo: '/platforms/apple.webp', kind: 'platform', color: '#F05138', invert: true },
  { label: 'Polar', logo: '/platforms/polar.svg', kind: 'platform', color: '#0062FF' },
  { label: 'Stripe', logo: '/platforms/stripe.svg', kind: 'platform', color: '#635BFF' },
  { label: 'Vercel', logo: '/platforms/vercel.svg', kind: 'platform', color: '#FFFFFF', invert: true },
  { label: 'GitHub', logo: '/platforms/github.svg', kind: 'platform', color: '#FFFFFF', invert: true },
  { label: 'Expo', logo: '/platforms/expo.svg', kind: 'platform', color: '#FFFFFF', invert: true },
  { label: 'Cloudflare', logo: '/platforms/cloudflare.svg', kind: 'platform', color: '#F38020' },
  { label: 'Upstash', logo: '/platforms/upstash.svg', kind: 'platform', color: '#00E9A3' },
  { label: 'Sentry', logo: '/platforms/sentry.svg', kind: 'platform', color: '#7553FF' },
  { label: 'PostHog', logo: '/platforms/posthog.svg', kind: 'platform', color: '#F9BD2B' },
  { label: 'Remotion', logo: '/platforms/remotion.png', kind: 'platform', color: '#0B84F3' },
  { label: 'Hyperframes', logo: '/platforms/hyperframes.svg', kind: 'platform', color: '#A78BFA' },
  { label: 'YouTube', logo: '/platforms/youtube.svg', kind: 'platform', color: '#FF0000' },
  { label: 'TikTok', logo: '/platforms/tiktok.svg', kind: 'platform', color: '#FE2C55' },
  { label: 'Instagram', logo: '/platforms/instagram.svg', kind: 'platform', color: '#E1306C' },
  { label: 'Reddit', logo: '/platforms/reddit.svg', kind: 'platform', color: '#FF4500' },
  { label: 'X', logo: '/platforms/x.svg', kind: 'platform', color: '#FFFFFF', invert: true },
]

const byLabel = (list: Tool[]) => Object.fromEntries(list.map((t) => [t.label, t])) as Record<string, Tool>
export const modelMeta = byLabel(models)
export const harnessMeta = byLabel(harnesses)
export const platformMeta = byLabel(platforms)

export type SamplePrompt = {
  id: string
  title: string
  kind: 'text' | 'image' | 'video'
  /** Text: a use case. Image: an image use case. Video: a video type. */
  useCase: string
  harness?: string
  model: string
  /** Extra models beyond the lead one; the card shows a "+N" on the logo. */
  additionalModels?: string[]
  platforms?: string[]
  tags: string[]
  runs: number
  /** Your own copies, shown on the Most Used rail. */
  yourRuns?: number
  /** Markdown-ish lines: a leading "## " renders as a heading. */
  body: string[]
  chain?: boolean
  /** Art key for image and video cards (components/mock/media-art). */
  art?: 'synthwave' | 'clockwork' | 'glassIcon' | 'neonRain' | 'ceramicMug' | 'heroBanner'
  duration?: string
}

export const samplePrompts: SamplePrompt[] = [
  {
    id: 'code-review',
    kind: 'text',
    title: 'Production Code Review for Bugs and Vulnerabilities',
    useCase: 'Coding',
    harness: 'Claude Code',
    model: 'Fable 3.1',
    additionalModels: ['Astra', 'Gemini 3.8'],
    platforms: ['GitHub', 'Supabase', 'Vercel'],
    tags: ['review', 'security', 'bugs', 'pre-merge'],
    runs: 1284,
    yourRuns: 9,
    chain: true,
    body: [
      '## Role',
      'You are a staff engineer doing a pre-merge review of a production codebase.',
      '## Process',
      'Read the diff end to end before commenting. Trace every changed path to its callers.',
      'Rank findings by blast radius, not by line order.',
      '## Output',
      'A table of severity, file, failure scenario and fix. No praise. No nits unless they hide a bug.',
    ],
  },
  {
    id: 'hooks',
    kind: 'text',
    title: 'Viral Content Hook Strategist [Long-Form]',
    useCase: 'Content Creation',
    harness: 'ChatGPT Work',
    model: 'Astra',
    platforms: ['YouTube'],
    tags: ['hooks', 'youtube', 'retention'],
    runs: 962,
    yourRuns: 6,
    body: [
      '## Task',
      'Study the first 30 seconds of the top five videos in this niche.',
      'Name the tension each one opens, then withhold it.',
      '## Output',
      'Ten hooks, each under twelve words, ranked by curiosity gap.',
    ],
  },
  {
    id: 'privacy',
    kind: 'text',
    title: 'Privacy Policy Generation (GDPR & CCPA)',
    useCase: 'Legal & Compliance',
    harness: 'Claude Co-Work',
    model: 'Fable 3.1',
    tags: ['gdpr', 'ccpa', 'policy'],
    runs: 731,
    body: [
      'Inventory every data flow the product touches.',
      'Map each one to a lawful basis and a retention window.',
      'Write it so a customer can read it in four minutes.',
    ],
  },
  {
    id: 'market',
    kind: 'text',
    title: 'Comprehensive Market Researcher',
    useCase: 'Research',
    harness: 'Perplexity Comet',
    model: 'Deep Research',
    additionalModels: ['BrowserUse'],
    tags: ['market', 'tam', 'sources'],
    runs: 655,
    chain: true,
    body: [
      'Size the market bottom-up, then sanity-check top-down.',
      'Cite every number. Flag anything older than a year.',
      'End with the three questions the data cannot answer.',
    ],
  },
  {
    id: 'parallax',
    kind: 'text',
    title: 'Scroll-Driven Parallax Landing Page Builder',
    useCase: 'Parallax Website',
    harness: 'Claude Code',
    model: 'Fable 3.1',
    platforms: ['Vercel'],
    tags: ['parallax', 'framer-motion', 'landing'],
    runs: 588,
    yourRuns: 4,
    body: [
      '## Goal',
      'Build a landing page whose sections move on separate depth planes.',
      '## Rules',
      'Sky, far ridge, near ridge, product. Each plane gets its own scroll rate.',
      'Respect prefers-reduced-motion and keep every crest whole at any width.',
    ],
  },
  {
    id: 'synthwave',
    kind: 'image',
    title: 'Retro Synthwave Skyline',
    useCase: 'Image Gen',
    harness: 'Higgsfield Supercomputer',
    model: 'Image 2.5 Flare',
    tags: ['synthwave', 'retro', 'skyline'],
    runs: 512,
    yourRuns: 3,
    art: 'synthwave',
    body: ['A city skyline at dusk under a gridded mint horizon, 80s synthwave palette, film grain.'],
  },
  {
    id: 'clockwork',
    kind: 'video',
    title: 'Steampunk Clockwork, 30s One-Take',
    useCase: 'Motion Graphics',
    model: 'Seedance 2.5',
    platforms: ['Remotion'],
    tags: ['steampunk', 'macro', 'one-take'],
    runs: 470,
    yourRuns: 2,
    art: 'clockwork',
    duration: '0:30',
    body: ['Macro dolly through brass gears turning in low amber light, one continuous take.'],
  },
  {
    id: 'mug',
    kind: 'image',
    title: 'Ceramic Mug Product Shot',
    useCase: 'Photo Editing',
    model: 'Image 2.5 Sunburst',
    tags: ['product', 'studio'],
    runs: 344,
    art: 'ceramicMug',
    body: ['Matte ceramic mug on wet stone, soft key light from the left, shallow depth of field.'],
  },
]

export const promptById = (id: string) => samplePrompts.find((p) => p.id === id)!

/** The account's favorites, in the order the carousel shows them. */
export const favoriteIds = ['hooks', 'synthwave', 'code-review', 'clockwork', 'parallax'] as const
/** The favorite the carousel opens on: the hero's main card. */
export const featuredFavorite = 2

/** "Because You Favorited" suggestions (lib/favorites/recommend.ts). */
export const recommendations = [
  { title: 'Pre-Launch QA & Security Audit Generator', because: 'Production Code Review for Bugs and Vulnerabilities', useCase: 'Security' },
  { title: 'Short-Form Script Director', because: 'Viral Content Hook Strategist [Long-Form]', useCase: 'Social Media' },
  { title: 'Frontend Performance Audit & Optimization', because: 'Scroll-Driven Parallax Landing Page Builder', useCase: 'Performance' },
]

/** Mirrors lib/favorites/limits.ts and public.favorite_limit(). */
export const favoriteLimits = { free: 5, pro: 25 } as const

export type Chain = {
  name: string
  description: string
  useCase: string
  harnesses: string[]
  platforms: string[]
  automation: string
  steps: { title: string; note: string }[]
}

export const featuredChain: Chain = {
  name: 'Ship-Ready Codebase Audit',
  description:
    'Seven passes that take a working codebase to launch-ready: dead code, structure, naming and state first, then performance, a bug and vulnerability review, and a pre-launch QA and security sweep.',
  useCase: 'Coding',
  harnesses: ['Claude Code', 'Codex'],
  platforms: ['GitHub', 'Vercel', 'Supabase'],
  automation: 'Semi-Automated',
  steps: [
    { title: 'Codebase Dead Code & Ghost Flow Auditor', note: 'Find what nothing calls, and flows that go nowhere.' },
    { title: 'Folder Structure Audit & Reorganization', note: 'Group by feature. Make ownership obvious.' },
    { title: 'Standardize Naming Conventions', note: 'One vocabulary, applied everywhere.' },
    { title: 'State Management Audit & Cleanup', note: 'Every piece of state gets exactly one home.' },
    { title: 'Frontend Performance Audit & Optimization', note: 'Measure first. Then cut bytes and renders.' },
    { title: 'Production Code Review for Bugs and Vulnerabilities', note: 'Ranked by blast radius, not by line order.' },
    { title: 'Pre-Launch QA & Security Audit Generator', note: 'The checklist you run the night before.' },
  ],
}

export const otherChains = [
  { name: 'UX Audit → Polished UI', useCase: 'UI/UX Design', steps: 6 },
  { name: 'Market → Positioning', useCase: 'Research', steps: 6 },
  { name: 'Idea → Parallax Launch Page', useCase: 'Parallax Website', steps: 5 },
]

export const pricing = {
  free: {
    name: 'Free',
    price: '$0',
    cadence: '/ permanent',
    tagline: 'Reveal 14 text prompts and 2 chains from the library. Yours to keep.',
    features: [
      'Browse the full text prompt library and every chain',
      'Reveal 14 prompts and 2 chains, yours to keep',
      `Platforms and up to ${favoriteLimits.free} favorites`,
    ],
    cta: 'Start for free',
  },
  pro: {
    name: 'Pro',
    price: '$20',
    cadence: '/ month',
    tagline: 'For power users, creators, and developers needing production-ready scale.',
    billing: 'Billed monthly through Polar. Cancel any time.',
    features: [
      { title: 'Unlimited text prompts and chains', detail: 'No reveal limit, ever.' },
      { title: 'The Video Prompt Library', detail: 'Every motion prompt, the clip it produced, and the settings behind it.', proOnly: true },
      { title: `${favoriteLimits.pro} favorites`, detail: 'A bigger shelf, with Because You Favorited suggestions.' },
      { title: 'The Knowledge Layer', detail: '2026 AI Tool Index + Weekly Trend Newsletter' },
      { title: 'First Access', detail: 'New prompt drops as they land' },
      { title: 'Cancel Any Time', detail: 'Keep Pro until the end of the period you paid for' },
    ],
    cta: 'Upgrade to Pro',
  },
  academy: {
    name: 'AI Academy',
    headline: '4 weeks to AI that does the work, not just talks about it.',
    price: '$279',
    cadence: 'one-time · no subscription',
    stats: [
      { value: '4', label: 'Weeks' },
      { value: '14', label: 'Seats' },
      { value: 'Live', label: 'Cohort' },
    ],
  },
}

export type Faq = { q: string; a: string }

export const faqs: Record<'General' | 'Plans & billing' | 'The library', Faq[]> = {
  General: [
    {
      q: 'What is Promptful?',
      a: 'A curated library of production-ready prompts. Every prompt is written by hand, tagged with the use case it solves, the harness it runs in, the model it was tuned for and the platforms it was built for, so you stop guessing and start from something that already works.',
    },
    {
      q: 'Who writes the prompts?',
      a: 'We do. Nothing in the library is scraped or user-submitted. Each prompt is written, run, and tagged before it ships, and new drops land every week.',
    },
    {
      q: 'Do I need to be technical?',
      a: 'No. Most prompts are copy, paste, run. The coding and agent prompts say exactly which harness they were built for (Claude Code, Codex, Perplexity Comet and more), so you know where to paste them.',
    },
  ],
  'Plans & billing': [
    {
      q: 'What do I actually get for $20 a month?',
      a: `Every prompt and every chain, with no reveal limit, plus the video prompt library with the clip each one produced and the settings behind it, and room for ${favoriteLimits.pro} favorites. Free accounts browse the whole library, keep ${favoriteLimits.free} favorites and reveal 14 prompts and 2 chains of their choosing, and anything revealed stays theirs after upgrading.`,
    },
    {
      q: 'Can I cancel my subscription?',
      a: 'Yes. Cancel any time from your billing portal. You keep Pro until the end of the period you paid for, and everything you revealed stays yours.',
    },
    {
      q: 'How is billing handled?',
      a: 'Securely through Polar. Pro is billed monthly; there are no hidden fees and no annual lock-in.',
    },
  ],
  'The library': [
    {
      q: 'How do favorites work?',
      a: `Heart a prompt and it joins your Favorites: a carousel of your go-to cards, each one copy away, with Most Used, Most Recent and Because You Favorited suggestions beside it. Free keeps ${favoriteLimits.free}, Pro keeps ${favoriteLimits.pro}. Copy the same prompt twice and Promptful offers to keep it close.`,
    },
    {
      q: 'What is a prompt chain?',
      a: 'An ordered, runnable sequence where every step shares one use case. Each step hangs from the chain card as its own tag; tap one to open that prompt, or open the card to see every step by name.',
    },
    {
      q: 'What happens when I reveal a prompt on Free?',
      a: 'Press and hold to reveal. It uses one of your 14 free reveals, and once revealed it stays yours for good, even if you never upgrade.',
    },
    {
      q: 'Which tools are the prompts written for?',
      a: 'Harnesses like Claude Code, Codex, ChatGPT Work, Perplexity Comet and Higgsfield, models like Fable 3.1, Opus 5.5, Gemini 3.8, Image 2.5 Flare and Seedance 2.5, and platforms from Supabase and Vercel to Remotion and TikTok. Every card tells you which.',
    },
  ],
}
