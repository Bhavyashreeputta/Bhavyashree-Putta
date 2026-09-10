import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, BookOpen } from 'lucide-react'
import { Github } from '../ide/Brand'
import { projects, type Project } from '../../data/projects'
import { useStore } from '../../lib/store'
import { Card, Chips, Doc, H2 } from '../ide/Section'
import { CodeBlock } from '../ide/CodeBlock'
import { FileIcon } from '../ide/FileIcon'
import { fileByPath } from '../../lib/files'

const cats: { key: Project['category'] | 'all'; label: string }[] = [
  { key: 'all', label: 'all' },
  { key: 'systems', label: 'systems' },
  { key: 'ai', label: 'ai / retrieval' },
  { key: 'fullstack', label: 'full-stack' },
  { key: 'data', label: 'data' },
  { key: 'research', label: 'research' },
]

const catColor: Record<Project['category'], string> = {
  systems: 'var(--orange)',
  ai: 'var(--accent-2)',
  fullstack: 'var(--cyan)',
  data: 'var(--green)',
  research: 'var(--yellow)',
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const { open } = useStore()
  const f = fileByPath(`/projects/${p.id}`)!
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.04 }}
      onClick={() => open(f.path)}
      className={`group flex flex-col rounded-lg border p-5 text-left transition-colors hover:border-[var(--accent)] ${p.featured ? 'glow' : ''}`}
      style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}
    >
      <div className="mono flex items-center gap-2 text-[11px]" style={{ color: 'var(--fg-muted)' }}>
        <FileIcon kind={f.kind} />
        {p.file}
        <span className="ml-auto" style={{ color: catColor[p.category] }}>
          {p.category}
        </span>
      </div>
      <div className="mt-3 text-[15px] font-bold leading-snug">{p.name}</div>
      <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
        {p.tagline}
      </p>
      <div className="mt-3">
        <Chips items={p.stack.slice(0, 5)} />
      </div>
      <div className="mono mt-3 flex items-center gap-1 text-[11px] opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'var(--accent)' }}>
        open <ArrowRight size={12} />
      </div>
    </motion.button>
  )
}

export function ProjectsView() {
  const [cat, setCat] = useState<(typeof cats)[number]['key']>('all')
  const list = projects.filter((p) => cat === 'all' || p.category === cat)
  return (
    <Doc title="Projects" subtitle={`projects/overview.md · ${projects.length} builds`} wide>
      <div className="mb-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className="mono rounded-md border px-2.5 py-1 text-[11.5px] transition-colors"
            style={{
              borderColor: cat === c.key ? 'var(--accent)' : 'var(--border)',
              color: cat === c.key ? 'var(--accent)' : 'var(--fg-muted)',
              background: cat === c.key ? 'var(--sel)' : 'transparent',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} />
        ))}
      </div>
      <p className="mono mt-8 text-[11px]" style={{ color: 'var(--fg-faint)' }}>
        // glowing cards are the ones I'd talk about in a systems interview. Filenames use the primary language of each build.
      </p>
    </Doc>
  )
}

export function ProjectView({ id }: { id: string }) {
  const p = projects.find((x) => x.id === id)
  const { open } = useStore()
  if (!p) return null
  const idx = projects.findIndex((x) => x.id === id)
  const next = projects[(idx + 1) % projects.length]
  return (
    <Doc title={p.name} subtitle={`projects/${p.file} · ${p.year} · ${p.category}`} wide>
      <p className="max-w-3xl text-[15px] leading-relaxed">{p.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer" className="mono flex items-center gap-2 rounded-md border px-3 py-1.5 text-[12px] hover:border-[var(--accent)]" style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }}>
            <Github size={13} /> source
          </a>
        )}
        {p.demo && (
          <a href={p.demo} target="_blank" rel="noreferrer" className="mono flex items-center gap-2 rounded-md border px-3 py-1.5 text-[12px] hover:border-[var(--accent)]" style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }}>
            <ExternalLink size={13} /> live
          </a>
        )}
        {p.publication && (
          <span className="mono flex items-center gap-2 rounded-md border px-3 py-1.5 text-[12px]" style={{ borderColor: 'var(--border)', color: 'var(--yellow)' }}>
            <BookOpen size={13} /> {p.publication.venue}
          </span>
        )}
      </div>

      <div className={`mt-8 grid gap-6 ${p.image || p.snippet ? 'lg:grid-cols-[1.1fr_1fr]' : ''}`}>
        <div>
          <H2>problem</H2>
          <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            {p.problem}
          </p>
          <H2>approach</H2>
          <ul className="space-y-2.5 text-[13.5px] leading-relaxed">
            {p.approach.map((a, i) => (
              <li key={i} className="flex gap-2">
                <span className="mono shrink-0" style={{ color: 'var(--accent-2)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <H2>outcome</H2>
          <ul className="space-y-2 text-[13.5px] leading-relaxed">
            {p.outcome.map((o, i) => (
              <li key={i} className="flex gap-2">
                <span className="mono shrink-0" style={{ color: 'var(--green)' }}>
                  ✓
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
          <H2>stack</H2>
          <Chips items={p.stack} />
        </div>
        {(p.image || p.snippet) && (
          <div className="space-y-4 lg:mt-12">
            {p.snippet && (
              <Card className="!p-0">
                <div className="mono border-b px-4 py-2 text-[11px]" style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}>
                  {p.file} — excerpt
                </div>
                <CodeBlock code={p.snippet.code} language={p.snippet.lang} className="p-4" />
              </Card>
            )}
            {p.image && (
              <img src={p.image} alt={`${p.name} screenshot`} className="w-full rounded-lg border" style={{ borderColor: 'var(--border)' }} loading="lazy" />
            )}
            {p.publication && (
              <Card>
                <div className="mono text-[11px]" style={{ color: 'var(--yellow)' }}>
                  publication
                </div>
                <div className="mt-1 text-[13px] italic">{p.publication.title}</div>
                <div className="mt-1 text-[12px]" style={{ color: 'var(--fg-muted)' }}>
                  {p.publication.venue}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>

      <div className="mt-12 flex flex-wrap gap-2">
        <button onClick={() => open('/projects')} className="mono rounded-md border px-3 py-1.5 text-[12px] hover:border-[var(--accent)]" style={{ borderColor: 'var(--border)' }}>
          ← overview.md
        </button>
        <button onClick={() => open(`/projects/${next.id}`)} className="mono flex items-center gap-2 rounded-md border px-3 py-1.5 text-[12px] hover:border-[var(--accent)]" style={{ borderColor: 'var(--border)' }}>
          next: {next.file} <ArrowRight size={12} />
        </button>
      </div>
    </Doc>
  )
}
