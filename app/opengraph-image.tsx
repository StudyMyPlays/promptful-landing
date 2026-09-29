import { ImageResponse } from 'next/og'

export const alt = 'Be Promptful: Curated. Validated. Yours.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'radial-gradient(120% 80% at 50% 110%, #0d2c22 0%, #05100c 45%, #020304 75%)',
          color: '#F5F7FA',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 36, fontWeight: 900, letterSpacing: -1 }}>
            promptful<span style={{ color: '#5CFFB0' }}>.</span>
          </div>
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.15)' }} />
          <div style={{ fontSize: 16, letterSpacing: 5, color: 'rgba(245,247,250,0.45)' }}>THE PROMPT LIBRARY</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 104, fontWeight: 900, lineHeight: 1, letterSpacing: -4 }}>
          <span>Curated. Validated.</span>
          <span style={{ color: '#5CFFB0' }}>Yours.</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 14 }}>
            {['17 USE CASES', 'PROMPT CHAINS', 'WEEKLY DROPS'].map((t) => (
              <div key={t} style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 999, padding: '10px 18px', fontSize: 16, letterSpacing: 3, color: 'rgba(245,247,250,0.7)' }}>
                {t}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 20, color: '#5CFFB0', letterSpacing: 1 }}>promptful.org</div>
        </div>
      </div>
    ),
    size,
  )
}
