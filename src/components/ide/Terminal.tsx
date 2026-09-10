import { useEffect, useRef, useState } from 'react'
import { X, Minus } from 'lucide-react'
import { useStore } from '../../lib/store'
import { run, complete, type Line } from '../../lib/shell'
import { profile } from '../../data/profile'

const PROMPT = `${profile.handle}@portfolio:~$`

export function Terminal() {
  const { open, setTheme, theme, setTerminal, isMobile } = useStore()
  const [lines, setLines] = useState<Line[]>([
    { text: `${profile.handle}-portfolio shell — type 'help' to get started`, color: 'var(--fg-muted)' },
  ])
  const [input, setInput] = useState('')
  const [hist, setHist] = useState<string[]>([])
  const [hIdx, setHIdx] = useState(-1)
  const [hints, setHints] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines])

  const submit = () => {
    const cmd = input
    const out = run(cmd, {
      open,
      setTheme,
      theme,
      clear: () => setLines([]),
      closeTerminal: () => setTerminal(false),
    })
    setLines((l) => (cmd.trim() === 'clear' ? [] : [...l, { text: `${PROMPT} ${cmd}`, color: 'var(--fg)' }, ...out]))
    if (cmd.trim()) setHist((h) => [cmd, ...h])
    setHIdx(-1)
    setInput('')
    setHints([])
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit()
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const n = Math.min(hIdx + 1, hist.length - 1)
      if (hist[n] !== undefined) {
        setHIdx(n)
        setInput(hist[n])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const n = hIdx - 1
      setHIdx(n)
      setInput(n < 0 ? '' : hist[n])
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const opts = complete(input)
      if (opts.length === 1) {
        const parts = input.split(/\s+/)
        parts[parts.length - 1] = opts[0]
        setInput(parts.join(' ') + (opts[0].endsWith('/') ? '' : ' '))
        setHints([])
      } else setHints(opts)
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    } else if (e.key === 'c' && e.ctrlKey) {
      setLines((l) => [...l, { text: `${PROMPT} ${input}^C` }])
      setInput('')
    }
  }

  return (
    <div
      className="mono flex shrink-0 flex-col border-t text-[12px]"
      style={{ height: isMobile ? '55%' : 260, background: 'var(--bg-1)', borderColor: 'var(--border)' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex h-8 items-center gap-4 border-b px-4 text-[11px] uppercase tracking-wider" style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}>
        <span className="border-b-2 pb-1.5 pt-2" style={{ borderColor: 'var(--accent)', color: 'var(--fg)' }}>
          Terminal
        </span>
        <span className="hidden sm:inline">Problems</span>
        <span className="hidden sm:inline">Output</span>
        <span className="ml-auto flex gap-2">
          <button onClick={() => setTerminal(false)} aria-label="Minimize terminal">
            <Minus size={14} />
          </button>
          <button onClick={() => setTerminal(false)} aria-label="Close terminal">
            <X size={14} />
          </button>
        </span>
      </div>
      <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-2 leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words" style={{ color: l.color ?? 'var(--fg)' }}>
            {l.text || ' '}
          </div>
        ))}
        {hints.length > 0 && <div style={{ color: 'var(--fg-muted)' }}>{hints.join('  ')}</div>}
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--green)' }}>{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className="min-w-0 flex-1 bg-transparent outline-none"
            style={{ color: 'var(--fg)', caretColor: 'var(--accent)' }}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  )
}
