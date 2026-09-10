import { GitBranch, Check, Bell, Terminal } from 'lucide-react'
import { useStore } from '../../lib/store'
import { kindLang } from '../../lib/files'

export function StatusBar() {
  const { active, theme, setTerminal, terminal } = useStore()
  return (
    <div
      className="mono flex h-6 shrink-0 select-none items-center gap-4 px-3 text-[11px]"
      style={{ background: 'var(--accent)', color: 'var(--bg)' }}
    >
      <span className="flex items-center gap-1">
        <GitBranch size={11} /> main
      </span>
      <span className="flex items-center gap-1">
        <Check size={11} /> 0 errors
      </span>
      <button className="flex items-center gap-1" onClick={() => setTerminal((v) => !v)} aria-label="Toggle terminal">
        <Terminal size={11} /> {terminal ? 'hide' : 'terminal'}
      </button>
      <span className="ml-auto hidden sm:inline">Ln 1, Col 1</span>
      <span className="hidden sm:inline">UTF-8</span>
      <span>{kindLang[active.kind]}</span>
      <span className="hidden sm:inline">theme: {theme}</span>
      <Bell size={11} />
    </div>
  )
}
