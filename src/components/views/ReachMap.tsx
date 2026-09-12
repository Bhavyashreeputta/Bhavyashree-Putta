import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Reach — who relies on the systems Bhavya has shipped, and at what scale.
 * The map is a tile-grid of the US; states light up in a sweep.
 */

// NPR-style tile grid: [abbr, col, row]
const tiles: [string, number, number][] = [
  ['AK', 0, 0], ['ME', 11, 0],
  ['VT', 9, 1], ['NH', 10, 1],
  ['WA', 0, 2], ['ID', 1, 2], ['MT', 2, 2], ['ND', 3, 2], ['MN', 4, 2], ['IL', 5, 2], ['WI', 6, 2], ['MI', 7, 2], ['NY', 8, 2], ['RI', 9, 2], ['MA', 10, 2],
  ['OR', 0, 3], ['NV', 1, 3], ['WY', 2, 3], ['SD', 3, 3], ['IA', 4, 3], ['IN', 5, 3], ['OH', 6, 3], ['PA', 7, 3], ['NJ', 8, 3], ['CT', 9, 3],
  ['CA', 0, 4], ['UT', 1, 4], ['CO', 2, 4], ['NE', 3, 4], ['MO', 4, 4], ['KY', 5, 4], ['WV', 6, 4], ['VA', 7, 4], ['MD', 8, 4], ['DE', 9, 4],
  ['AZ', 1, 5], ['NM', 2, 5], ['KS', 3, 5], ['AR', 4, 5], ['TN', 5, 5], ['NC', 6, 5], ['SC', 7, 5], ['DC', 8, 5],
  ['OK', 3, 6], ['LA', 4, 6], ['MS', 5, 6], ['AL', 6, 6], ['GA', 7, 6],
  ['HI', 0, 7], ['TX', 3, 7], ['FL', 7, 7],
]

// States NOT covered by United For ALICE. Edit this list to match the real partner map —
// everything else lights up. (44 states + DC lit by default.)
const unlit = new Set(['AK', 'MT', 'WY', 'ND', 'SD', 'NE'])

const audiences = [
  { who: 'State United Ways', scale: 44, suffix: '', note: 'United For ALICE partners' },
  { who: 'Counties measured', scale: 3100, suffix: '+', note: 'financial-hardship data' },
  { who: 'Students on transit', scale: 65000, suffix: '+', note: 'U-PASS+ · UIC' },
  { who: 'Research reports searchable', scale: 10000, suffix: '+', note: 'RAG assistant · w/ JPMorgan Chase' },
  { who: 'Residents mapped for IDPH', scale: 12500000, suffix: '+', note: 'SewerAtlas · public-health planning' },
]

const users = ['nonprofits', 'researchers', 'policy makers', 'public-health staff', 'students', 'esports scouts']

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && (setSeen(true), io.disconnect()), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, seen }
}

function Count({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!start || reduce) return
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400)
      setV(to * (1 - Math.pow(1 - p, 4)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, to, reduce])
  const n = Math.round(v)
  const text = n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 10_000 ? `${Math.round(n / 1000)}K` : n.toLocaleString('en-US')
  return (
    <span className="tabular-nums">
      {text}
      {suffix}
    </span>
  )
}

export function ReachMap() {
  const { ref, seen } = useInView<HTMLDivElement>()
  const reduce = useReducedMotion()
  const S = 40 // tile size
  const G = 5 // gap
  const W = 12 * (S + G)
  const H = 8 * (S + G)
  const lit = tiles.filter(([a]) => !unlit.has(a)).length

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
      {/* left: the story */}
      <div>
        <div className="mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
          reach
        </div>
        <h2 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl" style={{ textWrap: 'balance' }}>
          Code that <span style={{ color: 'var(--accent)' }}>{lit - 1} state United Ways</span>, nonprofits, researchers and policy makers rely on to decide where help goes.
        </h2>
        <p className="mt-3 max-w-lg text-[13.5px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          United For ALICE measures financial hardship for working households across the country. The platform, pipelines and search
          behind it are mine to build and keep running — alongside a transit system for a campus and a GIS tool for a state health department.
        </p>

        <ul className="mt-6 divide-y" style={{ borderColor: 'var(--border)' }}>
          {audiences.map((a, i) => (
            <motion.li
              key={a.who}
              initial={{ opacity: 0, y: 6 }}
              animate={seen ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="flex items-baseline gap-4 py-2.5"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="mono w-24 shrink-0 text-right text-[22px] font-bold sm:w-28 sm:text-[26px]" style={{ color: 'var(--accent)' }}>
                <Count to={a.scale} suffix={a.suffix} start={seen} />
              </span>
              <span className="min-w-0">
                <span className="block text-[14px] font-semibold">{a.who}</span>
                <span className="mono block truncate text-[11px]" style={{ color: 'var(--fg-faint)' }}>
                  {a.note}
                </span>
              </span>
            </motion.li>
          ))}
        </ul>

        <div className="mono mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[11px]" style={{ color: 'var(--fg-muted)' }}>
          <span style={{ color: 'var(--fg-faint)' }}>used by</span>
          {users.map((u) => (
            <span key={u}>{u}</span>
          ))}
        </div>
      </div>

      {/* right: the map */}
      <div className="relative">
        <div className="rounded-xl border p-4 sm:p-6" style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}>
          <div className="mono mb-3 flex items-center justify-between text-[11px]" style={{ color: 'var(--fg-muted)' }}>
            <span>united-for-alice · coverage</span>
            <span>
              <span style={{ color: 'var(--accent)' }}>■</span> partner state &nbsp;
              <span style={{ color: 'var(--fg-faint)' }}>■</span> not yet
            </span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Tile map of the United States with ${lit} states highlighted`}>
            <defs>
              <filter id="tileglow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {tiles.map(([abbr, c, r]) => {
              const on = !unlit.has(abbr)
              const delay = 0.2 + c * 0.06 + r * 0.03
              return (
                <motion.g
                  key={abbr}
                  initial={reduce ? false : { opacity: 0.15, scale: 0.8 }}
                  animate={seen ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay, duration: 0.4, ease: 'easeOut' }}
                  style={{ transformOrigin: `${c * (S + G) + S / 2}px ${r * (S + G) + S / 2}px` }}
                >
                  <rect
                    x={c * (S + G)}
                    y={r * (S + G)}
                    width={S}
                    height={S}
                    rx={6}
                    fill={on ? 'var(--accent)' : 'var(--bg-3)'}
                    fillOpacity={on ? 0.9 : 1}
                    filter={on ? 'url(#tileglow)' : undefined}
                  />
                  <text
                    x={c * (S + G) + S / 2}
                    y={r * (S + G) + S / 2 + 4}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="11"
                    fontWeight="700"
                    fill={on ? 'var(--bg)' : 'var(--fg-faint)'}
                  >
                    {abbr}
                  </text>
                </motion.g>
              )
            })}
          </svg>
          <div className="mt-3 flex items-end justify-between gap-4">
            <span className="mono max-w-[260px] text-[11px]" style={{ color: 'var(--fg-faint)' }}>
              every lit state has partners running reports on this platform
            </span>
            <span className="mono whitespace-nowrap text-[28px] font-extrabold leading-none" style={{ color: 'var(--accent)' }}>
              <Count to={lit - 1} suffix="" start={seen} />
              <span className="text-[12px] font-medium" style={{ color: 'var(--fg-muted)' }}>
                {' '}
                / 50 states
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
