import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * ops.dashboard — a Grafana-style view of what Bhavya runs in production.
 * Live-ticking series are simulated around real reported numbers (p99 < 120ms, 1.2s RAG median, 99.9% uptime).
 */

// deterministic noise so the first paint is stable
function seeded(seed: number) {
  let s = seed
  return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296)
}
function series(n: number, base: number, amp: number, seed: number, spike?: { at: number; h: number }) {
  const r = seeded(seed)
  const out: number[] = []
  let v = base
  for (let i = 0; i < n; i++) {
    v += (r() - 0.5) * amp - (v - base) * 0.2
    let y = v
    if (spike && i >= spike.at && i < spike.at + 10) y += spike.h * Math.exp(-(i - spike.at) / 3)
    out.push(y)
  }
  return out
}

function useLive(initial: number[], step: (last: number, i: number) => number, ms = 1200) {
  const [data, setData] = useState(initial)
  const reduce = useReducedMotion()
  const i = useRef(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setData((d) => [...d.slice(1), step(d[d.length - 1], i.current++)]), ms)
    return () => clearInterval(t)
  }, [step, ms, reduce])
  return data
}

/* ---------- panels ---------- */

function Panel({ title, sub, children, span = 1, right }: { title: string; sub?: string; children: React.ReactNode; span?: number; right?: React.ReactNode }) {
  return (
    <section
      className="flex min-w-0 flex-col rounded-md border"
      style={{ borderColor: 'var(--border)', background: 'var(--bg-1)', gridColumn: `span ${span} / span ${span}` }}
    >
      <header className="flex items-center justify-between gap-2 border-b px-3 py-1.5" style={{ borderColor: 'var(--border)' }}>
        <div className="min-w-0">
          <div className="mono truncate text-[11.5px] font-semibold">{title}</div>
          {sub && (
            <div className="mono truncate text-[10px]" style={{ color: 'var(--fg-faint)' }}>
              {sub}
            </div>
          )}
        </div>
        {right}
      </header>
      <div className="flex-1 p-3">{children}</div>
    </section>
  )
}

function Stat({ value, label, spark, color = 'var(--accent)' }: { value: string; label: string; spark?: number[]; color?: string }) {
  return (
    <div className="flex h-full items-end justify-between gap-2">
      <div>
        <div className="mono text-[30px] font-extrabold leading-none tabular-nums" style={{ color }}>
          {value}
        </div>
        <div className="mt-1.5 text-[11.5px]" style={{ color: 'var(--fg-muted)' }}>
          {label}
        </div>
      </div>
      {spark && <Sparkline data={spark} color={color} />}
    </div>
  )
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 90
  const h = 34
  const min = Math.min(...data)
  const max = Math.max(...data)
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - min) / (max - min || 1)) * (h - 4) - 2])
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  return (
    <svg width={w} height={h} className="shrink-0" aria-hidden>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={color} fillOpacity="0.12" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5" fill={color} />
    </svg>
  )
}

function TimeSeries({
  data,
  unit,
  threshold,
  thresholdLabel,
  color = 'var(--accent)',
  yMax,
  fmt = (v: number) => v.toFixed(0),
}: {
  data: number[]
  unit: string
  threshold?: number
  thresholdLabel?: string
  color?: string
  yMax: number
  fmt?: (v: number) => string
}) {
  const [hover, setHover] = useState<number | null>(null)
  const W = 400
  const H = 120
  const padL = 30
  const padB = 14
  const x = (i: number) => padL + (i / (data.length - 1)) * (W - padL - 4)
  const y = (v: number) => 4 + (1 - Math.min(v, yMax) / yMax) * (H - padB - 4)
  const d = data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const ticks = [0, yMax / 2, yMax]
  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          const px = ((e.clientX - r.left) / r.width) * W
          setHover(Math.max(0, Math.min(data.length - 1, Math.round(((px - padL) / (W - padL - 4)) * (data.length - 1)))))
        }}
        onMouseLeave={() => setHover(null)}
        role="img"
        aria-label={`${unit} over the last ${data.length} samples`}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} x2={W} y1={y(t)} y2={y(t)} stroke="var(--border)" strokeWidth="1" />
            <text x={padL - 4} y={y(t) + 3} textAnchor="end" fontSize="8" fontFamily="var(--font-mono)" fill="var(--fg-faint)">
              {fmt(t)}
            </text>
          </g>
        ))}
        {threshold !== undefined && (
          <g>
            <line x1={padL} x2={W} y1={y(threshold)} y2={y(threshold)} stroke="var(--yellow)" strokeWidth="1" strokeDasharray="4 3" />
            <text x={W - 2} y={y(threshold) - 3} textAnchor="end" fontSize="8" fontFamily="var(--font-mono)" fill="var(--yellow)">
              {thresholdLabel}
            </text>
          </g>
        )}
        <path d={`${d} L${x(data.length - 1)},${H - padB} L${padL},${H - padB} Z`} fill={color} fillOpacity="0.1" />
        <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r="3" fill={color} />
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={4} y2={H - padB} stroke="var(--fg-muted)" strokeWidth="1" />
            <circle cx={x(hover)} cy={y(data[hover])} r="4" fill={color} stroke="var(--bg-1)" strokeWidth="2" />
          </g>
        )}
        <text x={padL} y={H - 2} fontSize="8" fontFamily="var(--font-mono)" fill="var(--fg-faint)">
          -{Math.round(data.length * 5)}s
        </text>
        <text x={W} y={H - 2} textAnchor="end" fontSize="8" fontFamily="var(--font-mono)" fill="var(--fg-faint)">
          now
        </text>
      </svg>
      <div className="mono pointer-events-none absolute right-2 top-1 rounded border px-1.5 py-0.5 text-[10.5px] tabular-nums" style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }}>
        {fmt(data[hover ?? data.length - 1])} {unit}
      </div>
    </div>
  )
}

function Bars({ rows }: { rows: { label: string; value: number; how: string }[] }) {
  const max = Math.max(...rows.map((r) => r.value))
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.label} className="grid grid-cols-[120px_1fr_44px] items-center gap-2 text-[11px]">
          <span className="truncate" style={{ color: 'var(--fg-muted)' }} title={r.how}>
            {r.label}
          </span>
          <span className="h-3 overflow-hidden rounded-[3px]" style={{ background: 'var(--bg-3)' }}>
            <span className="block h-full rounded-[3px]" style={{ width: `${(r.value / max) * 100}%`, background: 'var(--green)', transition: 'width .8s ease-out' }} />
          </span>
          <span className="mono text-right font-semibold tabular-nums" style={{ color: 'var(--green)' }}>
            −{r.value}%
          </span>
        </li>
      ))}
    </ul>
  )
}

const stack: { name: string; role: string; langs: string }[] = [
  { name: 'react-spa', role: 'U-PASS+ · ALICE dashboards', langs: 'TypeScript' },
  { name: 'api-spring', role: 'Spring Boot microservices', langs: 'Java' },
  { name: 'api-aspnet', role: 'ASP.NET Core APIs', langs: 'C#' },
  { name: 'api-fastapi', role: 'RAG + GIS services', langs: 'Python' },
  { name: 'kafka-ingest', role: 'census event replay', langs: 'Java' },
  { name: 'rabbitmq-reports', role: '40K report permutations', langs: 'Java' },
  { name: 'etl-acs', role: '6 GB ACS → 50M rows', langs: 'Python' },
  { name: 'servicebus-workers', role: 'enrollment + payments', langs: 'C#' },
  { name: 'vector-index', role: 'Pinecone + FAISS', langs: 'Python' },
  { name: 'aks-cluster', role: 'Terraform + Helm', langs: 'HCL' },
]

const langColor: Record<string, string> = {
  Python: 'var(--yellow)',
  Java: 'var(--orange)',
  'C#': 'var(--accent-2)',
  TypeScript: 'var(--accent)',
  HCL: 'var(--cyan)',
}

export function Dashboard() {
  const p99Init = useMemo(() => series(48, 96, 14, 7), [])
  const ragInit = useMemo(() => series(48, 1.2, 0.25, 11), [])
  const lagInit = useMemo(() => series(48, 40, 30, 3, { at: 20, h: 900 }), [])
  const p99 = useLive(p99Init, (l) => Math.max(70, Math.min(118, l + (Math.random() - 0.5) * 10 - (l - 96) * 0.2)))
  const rag = useLive(ragInit, (l) => Math.max(0.8, Math.min(1.6, l + (Math.random() - 0.5) * 0.18 - (l - 1.2) * 0.2)), 1500)
  const lag = useLive(lagInit, (l, i) => (i % 45 === 30 ? 900 : Math.max(5, l * 0.72 + (Math.random() - 0.5) * 20 + 10)), 1000)
  const [clock, setClock] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="overflow-hidden rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      {/* dashboard chrome */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b px-4 py-2.5" style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
          <span className="mono text-[12.5px] font-semibold">production / bhavya-owned</span>
        </div>
        <div className="mono flex flex-wrap items-center gap-1.5 text-[10.5px]">
          {['44 state United Ways', 'nonprofits', 'researchers', 'policy makers', '65K students', 'IDPH'].map((t) => (
            <span key={t} className="rounded border px-1.5 py-0.5" style={{ borderColor: 'color-mix(in srgb, var(--accent) 40%, transparent)', color: 'var(--accent)', background: 'var(--sel)' }}>
              {t}
            </span>
          ))}
        </div>
        <div className="mono ml-auto flex items-center gap-3 text-[10.5px]" style={{ color: 'var(--fg-muted)' }}>
          <span>Last 4m · refresh 5s</span>
          <span className="tabular-nums">{clock.toLocaleTimeString('en-US', { hour12: false })}</span>
        </div>
      </div>

      <div className="grid gap-2 p-2 sm:grid-cols-2 lg:grid-cols-4">
        <Panel title="Partner states" sub="United For ALICE">
          <Stat value="44" label="state United Ways · 3,100+ counties" />
        </Panel>
        <Panel title="Users served" sub="U-PASS+ transit">
          <Stat value="65K+" label="students · 99.95% uptime" spark={series(20, 50, 12, 5)} />
        </Panel>
        <Panel title="Rows in production" sub="ACS census ETL → MySQL">
          <Stat value="50M+" label="6 GB/yr · 20% faster processing" spark={series(20, 50, 8, 9)} />
        </Panel>
        <Panel title="Uptime (30d)" sub="all owned services">
          <Stat value="99.9%" label="0 pages this week" color="var(--green)" />
        </Panel>

        <Panel title="API p99 latency" sub="U-PASS+ · ASP.NET / FastAPI" span={2} right={<span className="mono text-[10px]" style={{ color: 'var(--green)' }}>● under SLO</span>}>
          <TimeSeries data={p99} unit="ms" threshold={120} thresholdLabel="SLO 120ms" yMax={160} />
        </Panel>
        <Panel title="RAG answer latency (median)" sub="GPT-4 · FAISS + Pinecone" span={2} right={<span className="mono text-[10px]" style={{ color: 'var(--green)' }}>● 1.2s target</span>}>
          <TimeSeries data={rag} unit="s" threshold={2} thresholdLabel="2.0s budget" yMax={3} color="var(--accent-2)" fmt={(v) => v.toFixed(1)} />
        </Panel>

        <Panel title="Kafka consumer lag" sub="census replay · recovers after each burst" span={2}>
          <TimeSeries data={lag} unit="msgs" yMax={1000} color="var(--orange)" fmt={(v) => (v >= 1000 ? '1k' : v.toFixed(0))} />
        </Panel>
        <Panel title="Improvements shipped" sub="measured, not estimated" span={2}>
          <Bars
            rows={[
              { label: 'retrieval time', value: 60, how: 'RAG assistant over 10K reports' },
              { label: 'response failures', value: 60, how: 'AKS + Terraform + Helm' },
              { label: 'hardship calc time', value: 45, how: 'Kafka event replay' },
              { label: 'initial load time', value: 45, how: 'code-splitting, lazy routes' },
              { label: 'escaped defects', value: 35, how: '200+ tests in CI gates' },
              { label: 'query latency', value: 35, how: 'JPA + hand-tuned SQL, 20M rows' },
            ]}
          />
        </Panel>

        <Panel title="Services I own" sub="runtime · language" span={4} right={<span className="mono text-[10px]" style={{ color: 'var(--green)' }}>{stack.length}/{stack.length} UP</span>}>
          <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-5">
            {stack.map((s) => (
              <li key={s.name} className="flex items-center gap-2 text-[11px]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--green)' }} />
                <span className="mono truncate">{s.name}</span>
                <span className="mono ml-auto shrink-0 rounded px-1 text-[9.5px] font-semibold" style={{ color: langColor[s.langs], background: `color-mix(in srgb, ${langColor[s.langs]} 12%, transparent)` }}>
                  {s.langs}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}
