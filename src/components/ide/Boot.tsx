import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../../data/profile'

const lines = [
  { t: `> booting ${profile.handle}-portfolio v3.0.0`, c: 'var(--fg-muted)' },
  { t: '  ✓ loading runtimes ........ python  java  c#  typescript  c++', c: 'var(--green)' },
  { t: '  ✓ mounting experience.ts ... 5 roles, 3+ years', c: 'var(--green)' },
  { t: '  ✓ indexing projects/ ....... 11 files', c: 'var(--green)' },
  { t: '  ✓ warming vector index ..... rag ready', c: 'var(--green)' },
  { t: '  ✓ 0 errors, 0 warnings', c: 'var(--green)' },
  { t: '> opening README.md', c: 'var(--accent)' },
]

export function Boot({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (n >= lines.length) {
      const t = setTimeout(onDone, 350)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setN(n + 1), n === 0 ? 250 : 140)
    return () => clearTimeout(t)
  }, [n, onDone])
  useEffect(() => {
    const skip = (e: KeyboardEvent | MouseEvent) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape' && e.key !== 'Enter') return
      onDone()
    }
    window.addEventListener('keydown', skip)
    window.addEventListener('click', skip)
    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('click', skip)
    }
  }, [onDone])
  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        exit={{ opacity: 0 }}
        className="mono fixed inset-0 z-50 flex items-center justify-center p-6 text-[12px] sm:text-[13px]"
        style={{ background: 'var(--bg)' }}
      >
        <div className="w-full max-w-xl">
          {lines.slice(0, n).map((l, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} style={{ color: l.c }}>
              {l.t}
            </motion.div>
          ))}
          {n < lines.length && <span className="caret" />}
          <div className="mt-6 text-[10px]" style={{ color: 'var(--fg-faint)' }}>
            press any key to skip
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
