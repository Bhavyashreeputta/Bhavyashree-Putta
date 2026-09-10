import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Code2, Eye } from 'lucide-react'
import { CodeBlock } from './CodeBlock'

/**
 * Editor "document": a rendered view with an optional "view source" toggle
 * that shows the actual data file the view is rendered from.
 */
export function Doc({
  title,
  subtitle,
  source,
  sourceLang = 'typescript',
  children,
  wide,
}: {
  title: string
  subtitle?: string
  source?: string
  sourceLang?: string
  children: ReactNode
  wide?: boolean
}) {
  const [showSource, setShowSource] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`mx-auto w-full px-5 pb-24 pt-8 sm:px-10 ${wide ? 'max-w-6xl' : 'max-w-4xl'}`}
    >
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
            {subtitle}
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        </div>
        {source && (
          <button
            onClick={() => setShowSource((v) => !v)}
            className="mono flex items-center gap-2 rounded-md border px-3 py-1.5 text-[11px] transition-colors hover:border-[var(--accent)]"
            style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)', background: 'var(--bg-2)' }}
          >
            {showSource ? <Eye size={13} /> : <Code2 size={13} />}
            {showSource ? 'render' : 'view source'}
          </button>
        )}
      </header>
      {showSource && source ? (
        <div className="rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}>
          <CodeBlock code={source} language={sourceLang} className="p-4" />
        </div>
      ) : (
        children
      )}
    </motion.div>
  )
}

export function H2({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <h2 className="mono mb-4 mt-12 flex items-center gap-3 text-sm font-semibold">
      <span style={{ color: 'var(--accent-2)' }}>##</span>
      {children}
      {hint && (
        <span className="text-[11px] font-normal" style={{ color: 'var(--fg-faint)' }}>
          {hint}
        </span>
      )}
    </h2>
  )
}

export function Card({ children, className = '', glow }: { children: ReactNode; className?: string; glow?: boolean }) {
  return (
    <div
      className={`rounded-lg border p-5 ${glow ? 'glow' : ''} ${className}`}
      style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}
    >
      {children}
    </div>
  )
}

export function Chips({ items, accent }: { items: string[]; accent?: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span key={t} className={`chip ${accent?.includes(t) ? 'chip-accent' : ''}`}>
          {t}
        </span>
      ))}
    </div>
  )
}
