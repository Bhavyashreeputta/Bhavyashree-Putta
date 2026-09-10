import { motion } from 'framer-motion'
import { ArrowRight, FileDown, Mail, MapPin } from 'lucide-react'
import { Github, Linkedin } from '../ide/Brand'
import { profile } from '../../data/profile'
import { useTyped } from '../../lib/useTyped'
import { useStore } from '../../lib/store'
import { Card, Chips, H2 } from '../ide/Section'
import { SystemDiagram } from './SystemDiagram'
import { FileIcon } from '../ide/FileIcon'

const langs = [
  { name: 'Python', c: 'var(--yellow)' },
  { name: 'Java', c: 'var(--orange)' },
  { name: 'C#', c: 'var(--accent-2)' },
  { name: 'TypeScript', c: 'var(--accent)' },
  { name: 'C++', c: 'var(--cyan)' },
  { name: 'SQL', c: 'var(--green)' },
]

export function Readme() {
  const tagline = useTyped(profile.taglines)
  const { open, setTerminal } = useStore()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-10">
      {/* hero */}
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <div className="mono text-[11px]" style={{ color: 'var(--fg-faint)' }}>
            <span style={{ color: 'var(--accent-2)' }}>#</span> README.md
          </div>
          <div className="mono mt-4 text-[12px]" style={{ color: 'var(--fg-muted)' }}>
            <span style={{ color: 'var(--green)' }}>$</span> whoami
          </div>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{profile.name}</h1>
          <div className="mt-3 text-lg font-medium sm:text-xl" style={{ color: 'var(--accent)' }}>
            {profile.title}
          </div>
          <div className="mono mt-4 min-h-[3.2em] text-[13px] leading-relaxed sm:text-[14px]" style={{ color: 'var(--fg-muted)' }}>
            <span style={{ color: 'var(--green)' }}>~ </span>
            <span className="caret">{tagline}</span>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {langs.map((l) => (
              <span
                key={l.name}
                className="mono rounded-md border px-2.5 py-1 text-[11.5px] font-semibold"
                style={{ color: l.c, borderColor: `color-mix(in srgb, ${l.c} 45%, transparent)`, background: `color-mix(in srgb, ${l.c} 8%, transparent)` }}
              >
                {l.name}
              </span>
            ))}
            <span className="mono flex items-center gap-1 text-[11px]" style={{ color: 'var(--fg-faint)' }}>
              <MapPin size={11} /> {profile.location}
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => open('/experience')}
              className="mono flex items-center gap-2 rounded-md px-4 py-2 text-[12.5px] font-semibold transition-transform hover:translate-x-0.5"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            >
              open experience.ts <ArrowRight size={14} />
            </button>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="mono flex items-center gap-2 rounded-md border px-4 py-2 text-[12.5px] transition-colors hover:border-[var(--accent)]"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }}
            >
              <FileDown size={14} /> resume.pdf
            </a>
            <button
              onClick={() => setTerminal(true)}
              className="mono flex items-center gap-2 rounded-md border px-4 py-2 text-[12.5px] transition-colors hover:border-[var(--accent)]"
              style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }}
            >
              <span style={{ color: 'var(--green)' }}>$</span> try the terminal
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-xl border p-2 glow" style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}>
            <div className="mono flex items-center gap-2 px-2 pb-2 text-[10px]" style={{ color: 'var(--fg-faint)' }}>
              <FileIcon kind="json" /> profile.json
            </div>
            <img src={profile.photo} alt={profile.name} className="aspect-square w-full rounded-lg object-cover" loading="eager" />
            <pre className="mono mt-2 overflow-x-auto px-2 pb-1 text-[11px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              {`{
  "role":   "${profile.title}",
  "stack":  ["python", "java", "c#", "ts"],
  "degree": "M.S. CS · UIC · 3.88",
  "status": "open_to_work"
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* summary */}
      <p className="mt-10 max-w-3xl text-[15px] leading-relaxed" style={{ color: 'var(--fg)' }}>
        {profile.summary}
      </p>

      {/* stats */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {profile.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="rounded-lg border p-4"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}
          >
            <div className="mono text-2xl font-bold" style={{ color: 'var(--accent)' }}>
              {s.value}
            </div>
            <div className="mt-1 text-[12px] font-medium">{s.label}</div>
            <div className="mono mt-0.5 text-[10.5px]" style={{ color: 'var(--fg-faint)' }}>
              {s.note}
            </div>
          </motion.div>
        ))}
      </div>

      <H2 hint="every box is something I've run in production">systems I ship</H2>
      <SystemDiagram />

      <H2 hint="depth over breadth">what I actually do</H2>
      <div className="grid gap-4 md:grid-cols-3">
        {profile.pillars.map((p) => (
          <Card key={p.title}>
            <div className="mono text-[13px] font-semibold" style={{ color: 'var(--accent)' }}>
              {p.title}
            </div>
            <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              {p.blurb}
            </p>
            <div className="mt-3">
              <Chips items={p.tags} />
            </div>
          </Card>
        ))}
      </div>

      <H2>navigate</H2>
      <div className="grid gap-2 sm:grid-cols-2">
        {[
          ['/experience', 'experience.ts', 'ts', '5 roles · United Way, UIC, GetLect'],
          ['/projects', 'projects/overview.md', 'md', 'Raft, RAG scouting, Kafka fan-out, TCP proxy…'],
          ['/polyglot/python', 'polyglot/', 'py', 'the same consumer in Python, Java and C#'],
          ['/skills', 'skills.yaml', 'yaml', 'rated by depth, not by logo count'],
          ['/achievements', 'achievements.md', 'md', 'press, hackathon win, publication'],
          ['/contact', 'contact.sh', 'sh', 'email · GitHub · LinkedIn'],
        ].map(([path, name, kind, desc]) => (
          <button
            key={path}
            onClick={() => open(path)}
            className="flex items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors hover:border-[var(--accent)]"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}
          >
            <FileIcon kind={kind as 'ts'} size={12} />
            <div className="min-w-0">
              <div className="mono text-[12.5px]">{name}</div>
              <div className="truncate text-[11.5px]" style={{ color: 'var(--fg-faint)' }}>
                {desc}
              </div>
            </div>
            <ArrowRight size={14} className="ml-auto shrink-0" style={{ color: 'var(--fg-faint)' }} />
          </button>
        ))}
      </div>

      <div className="mono mt-12 flex flex-wrap items-center gap-4 text-[12px]" style={{ color: 'var(--fg-muted)' }}>
        <span>
          {profile.education.degree} · {profile.education.school} · GPA {profile.education.gpa}
        </span>
        <span className="ml-auto flex gap-3">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-[var(--fg)]">
            <Github size={16} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[var(--fg)]">
            <Linkedin size={16} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-[var(--fg)]">
            <Mail size={16} />
          </a>
        </span>
      </div>
    </motion.div>
  )
}
