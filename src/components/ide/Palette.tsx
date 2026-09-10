import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore, themes } from '../../lib/store'
import { allFiles, displayPath, type VFile } from '../../lib/files'
import { FileIcon } from './FileIcon'
import { profile } from '../../data/profile'

type Item = { id: string; label: string; hint?: string; file?: VFile; action: () => void }

function fuzzy(q: string, s: string) {
  q = q.toLowerCase()
  s = s.toLowerCase()
  if (!q) return 1
  if (s.includes(q)) return 3
  let i = 0
  for (const ch of s) if (ch === q[i]) i++
  return i === q.length ? 1 : 0
}

export function Palette() {
  const { palette, setPalette, open, setTheme, setTerminal } = useStore()
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const ref = useRef<HTMLInputElement>(null)

  const items = useMemo<Item[]>(
    () => [
      ...allFiles.map<Item>((f) => ({ id: f.path, label: displayPath(f), hint: 'open', file: f, action: () => open(f.path) })),
      { id: 'terminal', label: '> Toggle terminal', hint: 'Ctrl+`', action: () => setTerminal((v) => !v) },
      ...themes.map<Item>((t) => ({ id: 't-' + t, label: `> Theme: ${t}`, hint: 'theme', action: () => setTheme(t) })),
      { id: 'resume', label: '> Download resume', hint: 'pdf', action: () => window.open(profile.resumeUrl, '_blank') },
      { id: 'gh', label: '> Open GitHub', action: () => window.open(profile.github, '_blank') },
      { id: 'li', label: '> Open LinkedIn', action: () => window.open(profile.linkedin, '_blank') },
      { id: 'mail', label: '> Email Bhavya', action: () => window.open(`mailto:${profile.email}`) },
    ],
    [open, setTerminal, setTheme],
  )

  const results = useMemo(() => {
    const query = q.startsWith('>') ? q.slice(1).trim() : q
    return items
      .map((it) => ({ it, s: fuzzy(query, it.label) }))
      .filter((r) => r.s > 0 && (!q.startsWith('>') || it_isCmd(r.it)))
      .sort((a, b) => b.s - a.s)
      .map((r) => r.it)
  }, [q, items])

  useEffect(() => {
    if (palette) {
      setQ('')
      setIdx(0)
      setTimeout(() => ref.current?.focus(), 10)
    }
  }, [palette])
  useEffect(() => setIdx(0), [q])

  const pick = (it: Item) => {
    it.action()
    setPalette(false)
  }

  return (
    <AnimatePresence>
      {palette && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-40 flex items-start justify-center pt-[12vh]"
          style={{ background: 'rgba(0,0,0,.45)' }}
          onClick={() => setPalette(false)}
        >
          <motion.div
            initial={{ y: -10, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -10, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="w-[min(92vw,560px)] overflow-hidden rounded-lg border shadow-2xl"
            style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}
            role="dialog"
            aria-label="Command palette"
          >
            <input
              ref={ref}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setIdx((i) => Math.min(i + 1, results.length - 1))
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  setIdx((i) => Math.max(i - 1, 0))
                } else if (e.key === 'Enter' && results[idx]) pick(results[idx])
                else if (e.key === 'Escape') setPalette(false)
              }}
              placeholder="Search files by name, or type > for commands"
              className="mono w-full border-b bg-transparent px-4 py-3 text-[13px] outline-none"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            />
            <ul className="max-h-[50vh] overflow-y-auto py-1">
              {results.map((it, i) => (
                <li key={it.id}>
                  <button
                    onMouseEnter={() => setIdx(i)}
                    onClick={() => pick(it)}
                    className="mono flex w-full items-center gap-3 px-4 py-1.5 text-left text-[12.5px]"
                    style={{ background: i === idx ? 'var(--sel)' : 'transparent', color: i === idx ? 'var(--fg)' : 'var(--fg-muted)' }}
                  >
                    {it.file ? <FileIcon kind={it.file.kind} /> : <span className="w-[22px]" />}
                    <span className="truncate">{it.label}</span>
                    {it.hint && (
                      <span className="ml-auto text-[10.5px]" style={{ color: 'var(--fg-faint)' }}>
                        {it.hint}
                      </span>
                    )}
                  </button>
                </li>
              ))}
              {results.length === 0 && (
                <li className="mono px-4 py-3 text-[12px]" style={{ color: 'var(--fg-faint)' }}>
                  no matches
                </li>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const it_isCmd = (it: Item) => it.label.startsWith('>')
