# Promptful landing: generated asset prompts

Every visual slot on the landing page already has a code-drawn fallback, so the site is complete without these files. Generated imagery replaces the fallbacks and lifts the page from "polished" to "cinematic".

## Workflow

1. Generate each asset on fal.ai using the model named below.
2. Download the file and save it to `public/images/src/<filename>.png`. Save videos straight into `public/video/`.
3. Run `pnpm assets:optimize`. It writes an optimised WebP to `public/images/<filename>.webp` and keeps the alpha channel.
4. In `lib/assets.ts`, set `ready: true` for that entry.

## Shared art direction

Put this text at the start of every image prompt:

> Cinematic nocturnal landscape photography, near-black palette (#020304), a single cool mint-green light source (#5CFFB0) glowing softly from beyond the horizon, deep shadows, subtle volumetric haze, fine 35mm film grain, ultra-detailed, calm and premium, editorial, no people, no text, no logos, no watermark.

**Negative prompt** (where the model supports one):

> text, letters, logo, watermark, people, animals, buildings, sun, moon disc, lens flare, oversaturated, neon purple, cartoon, illustration, HDR halos, noise artifacts, frame, border

---

## Stills: ChatGPT Image 2 (GPT Image 2)

### 1. `hero-sky` (hero background, the slowest parallax layer)
- **Size:** 16:9, the largest size available (2560×1440 or larger). Opaque.
- **Prompt:** *[shared art direction]* A vast night sky over a dark horizon. Faint mint-green aurora ribbons drift low across the lower third, dissolving upward into deep blue-black. Sparse, tiny, crisp stars in the upper half. The horizon line sits at 70% of the frame height and is almost black. Lots of empty dark space in the upper-center for a headline. Wide 24mm lens.
- **Note:** Keep the centre calm, because the headline sits on top of it.

### 2. `hero-ridges` (far mountain ridge layer)
- **Size:** 2560×900 (about 3:1). **Transparent background** (PNG with alpha).
- **Prompt:** *[shared art direction]* A long panorama of distant, soft, rolling mountain ridges in layered silhouettes. Misty valleys between the ridges. The ridge tops catch a faint mint rim light from behind. Smooth, gentle shapes, not jagged. Everything above the ridgeline is fully transparent.
- **If transparency is unavailable:** generate it on a flat pure-black sky, and I'll mask the sky out.

### 3. `hero-foreground` (near foreground layer that overlaps the product mockup)
- **Size:** 2560×820 (about 3:1). **Transparent background.**
- **Prompt:** *[shared art direction]* Close foreground of low, rounded, dark hills covered in dense wild grass and small shrubs. The top edges are soft and organic, with individual grass blades catching a thin mint rim light. The hills rise gently from the bottom edge and peak at about 45% of the frame height at the left and right sides, dipping lower in the centre. Almost black below. Everything above the hill line is fully transparent.
- **Note:** The dip in the centre matters, because it lets the product screenshot show through.

### 4. `showcase-backdrop` (landscape inside the sticky product frame)
- **Size:** 16:9, 2560×1440. Opaque.
- **Prompt:** *[shared art direction]* Blue hour just after dusk. A wide valley of layered rolling hills fades into haze. The distant hills catch a soft mint afterglow along their ridgelines. A clear gradient sky runs from deep teal-black to near-black. A calm, spacious composition with the visual weight in the lower third.

### 5. `cta-terrain` (final CTA foreground dunes)
- **Size:** 2560×700 (about 3.6:1). **Transparent background.**
- **Prompt:** *[shared art direction]* Smooth, sculpted sand dunes at night in sweeping curves, lit by a low mint-green light that grazes their crests and leaves long soft shadows. Silky surfaces. Dunes rise from the bottom edge to about 55% of the frame height. Everything above them is fully transparent.

### Media tiles (the Image & Video library mockups and the bento card)
These match the seeded image prompts in the product. They don't use the shared art direction; use the individual prompts below.

| Filename | Size | Prompt |
|---|---|---|
| `media-neon-rain` | 9:16 (900×1600) | Cinematic street portrait at night in heavy rain. A lone figure in a dark hooded coat, seen from behind, stands in a narrow alley. A mint-green neon tube and a single magenta neon sign reflect in the wet asphalt. Shallow depth of field, rain streaks, moody, 85mm. |
| `media-ceramic-mug` | 1:1 (1200×1200) | Studio product photograph of a matte stone-grey ceramic mug on a dark slate plinth. Soft single-source key light from the upper left, subtle steam, deep charcoal background, minimalist, high-end catalog style. |
| `media-glass-icon` | 1:1 (1200×1200) | 3D app icon: a rounded-square slab of frosted glass floating on a black background, with a glowing mint-green orb suspended inside. Soft refraction, caustic reflections, premium Apple-style render. |
| `media-synthwave` | 16:9 (1600×900) | Retro synthwave skyline: a striped setting sun in orange and pink over a city silhouette, a neon mint grid floor receding to the horizon, and a deep purple-to-black sky with faint stars. |
| `media-clockwork` | 16:9 (1600×900) | Macro photograph of interlocking brass steampunk gears and cogs, lit by warm amber rim light against deep black. Shallow depth of field, polished metal, cinematic. |
| `media-saas-banner` | 16:9 (1600×900) | Abstract SaaS hero banner: translucent frosted glass panels floating at angles in dark space, one panel lit mint-green from within, soft shadows, minimal and premium. |

---

## Video: Seedance 2.5 lite (image-to-video)

### 6. `hero-aurora.mp4` → `public/video/hero-aurora.mp4`
- **Input image:** `hero-sky` (the full-resolution original).
- **Settings:** 5s, 16:9, 1080p (720p is fine), no audio, **camera locked**.
- **Prompt:** Static locked-off camera. The mint aurora ribbons drift and ripple very slowly to the right, the stars twinkle faintly, and thin haze moves gently along the horizon. Seamless, calm, hypnotic. No camera movement, no new objects.
- **Note:** It plays as a muted loop, so choose the take whose first and last frames match most closely. Keep it under about 2.5 MB. Then set `videos.heroLoop.ready = true`.

### 7. `steampunk-clockwork.mp4` → `public/video/steampunk-clockwork.mp4`
- **Input image:** `media-clockwork`.
- **Settings:** 5s, 16:9, 720p, no audio.
- **Prompt:** Macro shot. The brass gears rotate slowly and smoothly in interlocking directions while the warm light shimmers across the polished metal. Locked camera, shallow depth of field.
- **Note:** Set `videos.clockwork.ready = true`.
