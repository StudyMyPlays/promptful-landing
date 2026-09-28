export const APP_URL = 'https://www.promptful.org'

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
  { id: 'reveal', label: 'How it works', href: '#reveal' },
  { id: 'chains', label: 'Chains', href: '#chains' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
] as const
