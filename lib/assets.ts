/**
 * Visual asset manifest.
 *
 * Every photographic / generated visual on the page is looked up here.
 * While `ready` is false the page renders a code-drawn fallback (see
 * components/art), so the site is complete before the generated imagery
 * lands. Prompts for each asset live in docs/ASSET_PROMPTS.md — drop the
 * file into public/images, run `pnpm assets:optimize`, flip `ready`.
 */
export type Asset = {
  src: string
  width: number
  height: number
  alt: string
  ready: boolean
}

export type VideoAsset = {
  src: string
  poster: string
  ready: boolean
}

export const assets = {
  heroSky: { src: '/images/hero-sky.webp', width: 2560, height: 1440, alt: '', ready: false },
  heroRidges: { src: '/images/hero-ridges.webp', width: 2560, height: 900, alt: '', ready: false },
  heroForeground: { src: '/images/hero-foreground.webp', width: 2560, height: 820, alt: '', ready: false },
  showcaseBackdrop: { src: '/images/showcase-backdrop.webp', width: 2560, height: 1440, alt: '', ready: false },
  ctaTerrain: { src: '/images/cta-terrain.webp', width: 2560, height: 700, alt: '', ready: false },
} satisfies Record<string, Asset>

export const media = {
  neonRain: { src: '/images/media-neon-rain.webp', width: 900, height: 1600, alt: 'Neon Rain Street Portrait — a rain-soaked alley lit in mint neon', ready: false },
  ceramicMug: { src: '/images/media-ceramic-mug.webp', width: 1200, height: 1200, alt: 'Ceramic Mug Product Shot — matte mug on stone under soft studio light', ready: false },
  glassIcon: { src: '/images/media-glass-icon.webp', width: 1200, height: 1200, alt: 'Glass App Icon — a frosted glass glyph with a mint core', ready: false },
  synthwave: { src: '/images/media-synthwave.webp', width: 1600, height: 900, alt: 'Retro Synthwave Skyline — city silhouette under a gridded horizon', ready: false },
  clockwork: { src: '/images/media-clockwork.webp', width: 1600, height: 900, alt: 'Steampunk Clockwork — brass gears turning in low amber light', ready: false },
  heroBanner: { src: '/images/media-saas-banner.webp', width: 1600, height: 900, alt: 'SaaS Hero Banner — abstract glass panels floating in dark space', ready: false },
} satisfies Record<string, Asset>

export const videos = {
  heroLoop: { src: '/video/hero-aurora.mp4', poster: '/images/hero-sky.webp', ready: false },
  clockwork: { src: '/video/steampunk-clockwork.mp4', poster: '/images/media-clockwork.webp', ready: false },
} satisfies Record<string, VideoAsset>
