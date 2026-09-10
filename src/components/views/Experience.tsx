import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { experience } from '../../data/experience'
import { Chips, Doc } from '../ide/Section'

const source = `import type { Experience } from './types'

// Rendered by <ExperienceView />. Edit here, the timeline updates.
export const experience: Experience[] = ${JSON.stringify(experience, null, 2)}
`

const LANGS = ['Python', 'Java', 'C#', 'TypeScript'] as const
const langColor: Record<string, string> = {
  Python: 'var(--yellow)',
  Java: 'var(--orange)',
  'C#': 'var(--accent-2)',
  TypeScript: 'var(--accent)',
}

export function ExperienceView() {
  const [filter, setFilter] = useState<string | null>(null)
  return (
    <Doc title="Experience" subtitle="experience.ts · 3+ years · 5 roles" source={source} wide>
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <span className="mono text-[11px]" style={{ color: 'var(--fg-faint)' }}>
          filter by language:
        </span>
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => setFilter(filter === l ? null : l)}
            className="mono rounded-md border px-2.5 py-1 text-[11.5px] transition-colors"
            style={{
              color: filter === l ? 'var(--bg)' : langColor[l],
              background: filter === l ? langColor[l] : 'transparent',
              borderColor: `color-mix(in srgb, ${langColor[l]} 50%, transparent)`,
            }}
          >
            {l}
          </button>
        ))}
        {filter && (
          <span className="mono text-[11px]" style={{ color: 'var(--fg-muted)' }}>
            → {experience.filter((e) => e.languages.includes(filter as 'Java')).length} roles used {filter} in production
          </span>
        )}
      </div>

      <ol className="relative border-l pl-6 sm:pl-8" style={{ borderColor: 'var(--border)' }}>
        {experience.map((e, i) => {
          const dimmed = filter && !e.languages.includes(filter as 'Java')
          return (
            <motion.li
              key={e.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: dimmed ? 0.35 : 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="relative mb-10"
            >
              <span
                className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 sm:-left-[39px]"
                style={{ borderColor: e.end ? 'var(--fg-faint)' : 'var(--green)', background: e.end ? 'var(--bg)' : 'var(--green)' }}
              />
              <div className="mono text-[11px]" style={{ color: e.end ? 'var(--fg-faint)' : 'var(--green)' }}>
                // {e.period} {e.end ? '' : '· current'}
              </div>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-bold">{e.role}</h3>
                <span className="text-[14px] font-medium" style={{ color: 'var(--accent)' }}>
                  {e.company}
                </span>
                {e.product && <span className="chip chip-accent">{e.product}</span>}
              </div>
              {e.org && (
                <div className="mt-0.5 text-[12px]" style={{ color: 'var(--fg-muted)' }}>
                  {e.org}
                </div>
              )}
              <div className="mono mt-1 flex items-center gap-1 text-[11px]" style={{ color: 'var(--fg-faint)' }}>
                <MapPin size={11} /> {e.location}
              </div>
              <p className="mt-3 max-w-3xl text-[13.5px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                {e.summary}
              </p>
              <ul className="mt-4 space-y-2.5">
                {e.bullets.map((b, j) => (
                  <li key={j} className="grid gap-1 text-[13px] leading-relaxed sm:grid-cols-[1fr_auto] sm:gap-4">
                    <span className="flex gap-2">
                      <span className="mono shrink-0" style={{ color: 'var(--accent-2)' }}>
                        →
                      </span>
                      <span>{b.text}</span>
                    </span>
                    {b.metric && (
                      <span className="mono self-start whitespace-nowrap rounded px-2 py-0.5 text-[11px] font-semibold" style={{ background: 'var(--sel)', color: 'var(--accent)' }}>
                        {b.metric}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Chips items={e.stack} accent={filter ? e.stack.filter((s) => s.toLowerCase().includes(filter.toLowerCase())) : []} />
              </div>
              <div className="mono mt-2 flex flex-wrap gap-2 text-[10.5px]" style={{ color: 'var(--fg-faint)' }}>
                languages:
                {e.languages.map((l) => (
                  <span key={l} style={{ color: langColor[l] ?? 'var(--fg-muted)' }}>
                    {l}
                  </span>
                ))}
              </div>
            </motion.li>
          )
        })}
      </ol>
    </Doc>
  )
}
