import { polyglot, polyglotProblem } from '../../data/polyglot'
import { useStore } from '../../lib/store'
import { Card, Doc } from '../ide/Section'
import { CodeBlock } from '../ide/CodeBlock'
import { FileIcon } from '../ide/FileIcon'
import { fileByPath } from '../../lib/files'

export function PolyglotView({ lang }: { lang: string }) {
  const { open } = useStore()
  const s = polyglot.find((p) => p.lang === lang) ?? polyglot[0]
  return (
    <Doc title={polyglotProblem.title} subtitle={`polyglot/${s.file}`} wide>
      <p className="max-w-3xl text-[14px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
        {polyglotProblem.description}
      </p>

      <div className="mt-6 flex gap-1 border-b" style={{ borderColor: 'var(--border)' }}>
        {polyglot.map((p) => {
          const f = fileByPath(`/polyglot/${p.lang}`)!
          const active = p.lang === s.lang
          return (
            <button
              key={p.lang}
              onClick={() => open(f.path)}
              className="mono -mb-px flex items-center gap-2 border-b-2 px-3 py-2 text-[12px]"
              style={{ borderColor: active ? 'var(--accent)' : 'transparent', color: active ? 'var(--fg)' : 'var(--fg-muted)' }}
            >
              <FileIcon kind={f.kind} /> {p.file}
            </button>
          )
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Card className="!p-0 overflow-hidden">
          <CodeBlock code={s.code} language={s.lang} className="p-4" />
        </Card>
        <div className="space-y-3">
          <Card>
            <div className="mono text-[11px]" style={{ color: 'var(--accent)' }}>
              // what to notice in {s.label}
            </div>
            <ul className="mt-2 space-y-2 text-[13px] leading-relaxed">
              {s.notes.map((n, i) => (
                <li key={i} className="flex gap-2">
                  <span style={{ color: 'var(--accent-2)' }}>→</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <div className="mono text-[11px]" style={{ color: 'var(--green)' }}>
              // invariants, all three versions
            </div>
            <ul className="mono mt-2 space-y-1.5 text-[11.5px]" style={{ color: 'var(--fg-muted)' }}>
              <li>claim before effect (SET NX)</li>
              <li>ack / commit only after effect</li>
              <li>transient → release claim, backoff, retry</li>
              <li>permanent / exhausted → dead-letter, never block</li>
              <li>duplicates are a no-op, not a second email</li>
            </ul>
          </Card>
        </div>
      </div>
    </Doc>
  )
}
