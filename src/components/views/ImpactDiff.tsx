import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * impact.diff — production metrics rendered as a git diff.
 * Each hunk is a system Bhavya shipped; every `+` line is a measured change.
 */
type Line = { metric: string; value: string; num?: number; suffix?: string; prefix?: string; how: string }
type Hunk = { system: string; scope: string; lines: Line[] }

const hunks: Hunk[] = [
  {
    system: 'U-PASS+ transit platform',
    scope: 'University of Illinois Chicago',
    lines: [
      { metric: 'students served', value: '65,000+', num: 65000, suffix: '+', how: 'React SPA + ASP.NET / FastAPI services' },
      { metric: 'initial load time', value: '−45%', num: 45, prefix: '−', suffix: '%', how: 'code-splitting, lazy routes, memoization' },
      { metric: 'p99 latency', value: '< 120ms', num: 120, prefix: '< ', suffix: 'ms', how: 'async data loading, indexed SQL Server' },
      { metric: 'transaction failures', value: '−35%', num: 35, prefix: '−', suffix: '%', how: 'retry + dead-letter on Azure Service Bus' },
      { metric: 'escaped defects', value: '−35%', num: 35, prefix: '−', suffix: '%', how: '200+ Jest / RTL / Cypress tests in CI gates' },
    ],
  },
  {
    system: 'United For ALICE',
    scope: '44 states · 3,100+ counties',
    lines: [
      { metric: 'rows in production', value: '50,000,000+', num: 50000000, suffix: '+', how: 'Python ETL over 6 GB of ACS census data → MySQL' },
      { metric: 'hardship calc time', value: '−45%', num: 45, prefix: '−', suffix: '%', how: 'Kafka ingestion with event replay' },
      { metric: 'report permutations', value: '40,000 async', num: 40000, suffix: ' async', how: 'RabbitMQ task queues, zero blocking requests' },
      { metric: 'query latency', value: '−35%', num: 35, prefix: '−', suffix: '%', how: 'Hibernate JPA + hand-tuned SQL over 20M+ records' },
      { metric: 'research retrieval time', value: '−60%', num: 60, prefix: '−', suffix: '%', how: 'RAG assistant over 10,000+ reports, w/ JPMorgan Chase' },
      { metric: 'time to root cause', value: '−30%', num: 30, prefix: '−', suffix: '%', how: 'structured logging, tracing, health checks' },
    ],
  },
  {
    system: 'Research RAG chatbot',
    scope: 'Google-funded · UIC',
    lines: [
      { metric: 'median answer latency', value: '1.2s', num: 1.2, suffix: 's', how: 'GPT-4 + hybrid FAISS / Pinecone retrieval' },
      { metric: 'response failures', value: '−60%', num: 60, prefix: '−', suffix: '%', how: 'AKS + Terraform + Helm, failure isolation' },
      { metric: 'concurrent users', value: '50+', num: 50, suffix: '+', how: 'Cloudflare D1 history + KV cache, sub-second reads' },
    ],
  },
  {
    system: 'GetLect',
    scope: 'recruitment platform',
    lines: [
      { metric: 'services', value: '1 monolith → 8', how: 'decomposed auth, content, user management' },
      { metric: 'deploy efficiency', value: '+40%', num: 40, prefix: '+', suffix: '%', how: 'Nginx, health checks, rate limiting' },
      { metric: 'recovery time', value: '−50%', num: 50, prefix: '−', suffix: '%', how: 'AWS EC2 / S3 migration, automated backups' },
      { metric: 'database load', value: '−30%', num: 30, prefix: '−', suffix: '%', how: 'Redis caching of hot metadata + sessions' },
    ],
  },
]

const totalLines = hunks.reduce((n, h) => n + h.lines.length, 0)

function fmt(n: number) {
  return n % 1 === 0 ? n.toLocaleString('en-US') : n.toFixed(1)
}

function CountUp({ line, start }: { line: Line; start: boolean }) {
  const reduce = useReducedMotion()
  const [v, setV] = useState(line.num && !reduce ? 0 : line.num ?? 0)
  const raf = useRef<number>(0)
  useEffect(() => {
    if (!start || line.num === undefined || reduce) return
    const t0 = performance.now()
    const dur = 900
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setV(line.num! * eased)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [start, line.num, reduce])
  if (line.num === undefined) return <>{line.value}</>
  return (
    <>
      {line.prefix}
      {fmt(v)}
      {line.suffix}
    </>
  )
}

export function ImpactDiff() {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  let i = 0
  return (
    <div ref={ref} className="mono overflow-hidden rounded-lg border text-[12px] leading-[1.7]" style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}>
      <div className="flex items-center gap-3 border-b px-4 py-2 text-[11px]" style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}>
        <span style={{ color: 'var(--fg)' }}>impact.diff</span>
        <span>production, before → after me</span>
        <span className="ml-auto" style={{ color: 'var(--green)' }}>
          +{totalLines} −0
        </span>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[640px] py-2">
          <div className="px-4" style={{ color: 'var(--fg-faint)' }}>
            diff --git a/production b/production
          </div>
          {hunks.map((h) => (
            <div key={h.system} className="mt-2">
              <div className="px-4" style={{ color: 'var(--cyan)' }}>
                @@ {h.system} <span style={{ color: 'var(--fg-faint)' }}>· {h.scope}</span> @@
              </div>
              {h.lines.map((l) => {
                const idx = i++
                return (
                  <motion.div
                    key={l.metric}
                    initial={{ opacity: 0, x: -8 }}
                    animate={seen ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.05 + idx * 0.045, duration: 0.25 }}
                    className="grid grid-cols-[14px_190px_150px_1fr] items-baseline gap-3 px-4 hover:bg-[var(--sel)]"
                    style={{ background: 'color-mix(in srgb, var(--green) 6%, transparent)' }}
                  >
                    <span style={{ color: 'var(--green)' }}>+</span>
                    <span style={{ color: 'var(--fg-muted)' }}>{l.metric}</span>
                    <span className="text-[14px] font-bold tabular-nums" style={{ color: 'var(--green)' }}>
                      <CountUp line={l} start={seen} />
                    </span>
                    <span className="truncate" style={{ color: 'var(--fg-faint)' }}>
                      // {l.how}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          ))}
          <div className="mt-3 border-t px-4 pt-2" style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}>
            4 systems changed, <span style={{ color: 'var(--green)' }}>{totalLines} metrics improved(+)</span>, 0 regressions(−)
          </div>
        </div>
      </div>
    </div>
  )
}
