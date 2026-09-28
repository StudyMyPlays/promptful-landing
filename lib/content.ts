/**
 * Marketing content, sourced from the Promptful product
 * (be-promptful: lib/constants.ts, lib/billing.ts, seeded chains).
 */

export type UseCase = { label: string; glow: string }

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
  { label: 'Education & Learning', glow: '#84cc16' },
  { label: 'Finance', glow: '#34d399' },
  { label: 'Video Editing', glow: '#fb7185' },
  { label: 'Household', glow: '#38bdf8' },
  { label: 'Business', glow: '#fdba74' },
  { label: 'Travel', glow: '#67e8f9' },
]

export const glowFor = (label: string) => useCases.find((u) => u.label === label)?.glow ?? '#5cffb0'

export type Tool = { label: string; logo: string; kind: 'harness' | 'model' | 'platform'; invert?: boolean }

export const harnesses: Tool[] = [
  { label: 'Claude Code', logo: '/platforms/claude-color.webp', kind: 'harness' },
  { label: 'Codex', logo: '/platforms/openai.webp', kind: 'harness', invert: true },
  { label: 'ChatGPT Work', logo: '/platforms/openai.webp', kind: 'harness', invert: true },
  { label: 'Perplexity Comet', logo: '/platforms/perplexity-color.webp', kind: 'harness' },
  { label: 'Perplexity Computer', logo: '/platforms/perplexity-color.webp', kind: 'harness' },
  { label: 'Claude Co-Work', logo: '/platforms/claude-color.webp', kind: 'harness' },
  { label: 'Firecrawl Agent', logo: '/platforms/firecrawl.svg', kind: 'harness' },
  { label: 'Higgsfield Supercomputer', logo: '/platforms/higgsfield.svg', kind: 'harness' },
]

export const models: Tool[] = [
  { label: 'Astra', logo: '/platforms/openai.webp', kind: 'model', invert: true },
  { label: 'Fable 3.1', logo: '/platforms/claude-color.webp', kind: 'model' },
  { label: 'Gemini 3.8', logo: '/platforms/gemini-color.svg', kind: 'model' },
  { label: 'Deep Research', logo: '/platforms/perplexity-color.webp', kind: 'model' },
  { label: 'GPT Image 2', logo: '/platforms/openai.webp', kind: 'model', invert: true },
  { label: 'Runway Aleph 2', logo: '/platforms/runway.webp', kind: 'model' },
  { label: 'Seedance 2.0', logo: '/platforms/seedance.webp', kind: 'model' },
]

export const platforms: Tool[] = [
  { label: 'Supabase', logo: '/platforms/supabase.webp', kind: 'platform' },
  { label: 'Polar', logo: '/platforms/polar.svg', kind: 'platform' },
  { label: 'Sentry', logo: '/platforms/sentry.svg', kind: 'platform' },
  { label: 'PostHog', logo: '/platforms/posthog.svg', kind: 'platform' },
  { label: 'Resend', logo: '/platforms/resend-icon-black.png', kind: 'platform', invert: true },
  { label: 'YouTube', logo: '/platforms/youtube.svg', kind: 'platform' },
  { label: 'TikTok', logo: '/platforms/tiktok.svg', kind: 'platform' },
  { label: 'Instagram', logo: '/platforms/instagram.svg', kind: 'platform' },
  { label: 'Reddit', logo: '/platforms/reddit.svg', kind: 'platform' },
]

export type SamplePrompt = {
  title: string
  useCase: string
  harness: string
  harnessLogo: string
  model: string
  tags: string[]
  runs: number
  body: string[]
  chain?: boolean
}

export const samplePrompts: SamplePrompt[] = [
  {
    title: 'Production Code Review for Bugs and Vulnerabilities',
    useCase: 'Coding',
    harness: 'Claude Code',
    harnessLogo: '/platforms/claude-color.webp',
    model: 'Fable 3.1',
    tags: ['review', 'security', 'bugs'],
    runs: 1284,
    chain: true,
    body: [
      'You are a staff engineer doing a pre-merge review.',
      'Read the diff end to end before commenting.',
      'Rank findings by blast radius, not by line order.',
    ],
  },
  {
    title: 'Viral Content Hook Strategist [Long-Form]',
    useCase: 'Content Creation',
    harness: 'ChatGPT Work',
    harnessLogo: '/platforms/openai.webp',
    model: 'Astra',
    tags: ['hooks', 'youtube', 'retention'],
    runs: 962,
    body: [
      'Study the first 30 seconds of the top five videos.',
      'Name the tension each one opens, then withhold it.',
      'Write ten hooks, each under twelve words.',
    ],
  },
  {
    title: 'Privacy Policy Generation (GDPR & CCPA)',
    useCase: 'Legal & Compliance',
    harness: 'Claude Co-Work',
    harnessLogo: '/platforms/claude-color.webp',
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
    title: 'Comprehensive Market Researcher',
    useCase: 'Research',
    harness: 'Perplexity Comet',
    harnessLogo: '/platforms/perplexity-color.webp',
    model: 'Deep Research',
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
    title: 'WCAG 2.1 AA Compliance Audit & Remediation',
    useCase: 'UI/UX Design',
    harness: 'Claude Code',
    harnessLogo: '/platforms/claude-color.webp',
    model: 'Fable 3.1',
    tags: ['a11y', 'wcag', 'audit'],
    runs: 588,
    chain: true,
    body: [
      'Walk every route with a keyboard only.',
      'Check contrast, focus order, names and live regions.',
      'Fix in place — then list what still needs a human.',
    ],
  },
  {
    title: 'Short-Form Script Director',
    useCase: 'Video Editing',
    harness: 'Higgsfield Supercomputer',
    harnessLogo: '/platforms/higgsfield.svg',
    model: 'Seedance 2.0',
    tags: ['tiktok', 'script', 'shots'],
    runs: 470,
    body: [
      'Open on motion, never on a face saying hello.',
      'One idea per cut. Every cut earns the next.',
      'Deliver a shot list with timings to the frame.',
    ],
  },
]

export type Chain = {
  name: string
  description: string
  useCase: string
  harnesses: string[]
  automation: string
  steps: { title: string; note: string }[]
}

export const featuredChain: Chain = {
  name: 'Ship-Ready Codebase Audit',
  description:
    'Seven passes that take a working codebase to launch-ready: dead code, structure, naming and state first, then performance, a bug and vulnerability review, and a pre-launch QA and security sweep.',
  useCase: 'Coding',
  harnesses: ['Claude Code', 'Codex'],
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
]

export const pricing = {
  free: {
    name: 'Free',
    price: '$0',
    cadence: '/ permanent',
    tagline: 'Reveal 14 text prompts and 2 chains from the library — yours to keep.',
    features: [
      'Browse the full text prompt library and every chain',
      'Reveal 14 prompts and 2 chains — yours to keep',
      'Platforms and favorites',
    ],
    cta: 'Start for free',
  },
  pro: {
    name: 'Pro',
    price: '$20',
    cadence: '/ month',
    tagline: 'For power users, creators, and developers needing production-ready scale.',
    billing: 'Billed monthly through Polar — cancel any time',
    features: [
      { title: 'Unlimited text prompts and chains', detail: 'No reveal limit, ever.' },
      { title: 'The Image Prompt Library', detail: 'Every image prompt and the picture it made.', proOnly: true },
      { title: 'The Video Prompt Library', detail: 'Every motion prompt, the clip it produced, and the settings behind it.', proOnly: true },
      { title: 'The Knowledge Layer', detail: '2026 AI Tool Index + Weekly Trend Newsletter' },
      { title: 'First Access', detail: 'New prompt drops as they land' },
      { title: 'Cancel Any Time', detail: 'Keep Pro until the end of the period you paid for' },
    ],
    cta: 'Upgrade to Pro',
  },
  academy: {
    name: 'AI Academy',
    headline: '4 weeks to AI that does the work — not just talks about it.',
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
      a: 'A curated library of production-ready prompts. Every prompt is written by hand, tagged with the use case it solves, the harness it runs in and the model it was tuned for — so you stop guessing and start from something that already works.',
    },
    {
      q: 'Who writes the prompts?',
      a: 'We do. Nothing in the library is scraped or user-submitted. Each prompt is written, run, and tagged before it ships, and new drops land every week.',
    },
    {
      q: 'Do I need to be technical?',
      a: 'No. Most prompts are copy, paste, run. The coding and agent prompts say exactly which harness they were built for — Claude Code, Codex, Perplexity Comet and more — so you know where to paste them.',
    },
  ],
  'Plans & billing': [
    {
      q: 'What do I actually get for $20 a month?',
      a: 'Every prompt and every chain, with no reveal limit — plus the image and video prompt libraries, with the picture or clip each one produced and the settings behind it. Free accounts browse the whole library and reveal 14 prompts and 2 chains of their choosing, and anything revealed stays theirs after upgrading.',
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
      q: 'What is a prompt chain?',
      a: 'An ordered, runnable sequence — every step shares one use case. Step through it with Back and Next, copy each prompt as you go, or copy the whole chain at once.',
    },
    {
      q: 'What happens when I reveal a prompt on Free?',
      a: 'Press and hold to reveal. It uses one of your 14 free reveals, and once revealed it stays yours for good — even if you never upgrade.',
    },
    {
      q: 'Which tools are the prompts written for?',
      a: 'Harnesses like Claude Code, Codex, ChatGPT Work, Perplexity Comet and Higgsfield, and models like Fable 3.1, Gemini 3.8, GPT Image 2, Runway Aleph 2 and Seedance 2.0. Every card tells you which.',
    },
  ],
}
