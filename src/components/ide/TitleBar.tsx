import { Search } from 'lucide-react'
import { useStore } from '../../lib/store'
import { displayPath } from '../../lib/files'
import { profile } from '../../data/profile'

export function TitleBar() {
  const { active, setPalette } = useStore()
  return (
    <div
      className="flex h-9 shrink-0 select-none items-center gap-3 border-b px-3"
      style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="h-3 w-3 rounded-full" style={{ background: '#ff5f57' }} />
        <span className="h-3 w-3 rounded-full" style={{ background: '#febc2e' }} />
        <span className="h-3 w-3 rounded-full" style={{ background: '#28c840' }} />
      </div>
      <div className="mono hidden text-[11px] sm:block" style={{ color: 'var(--fg-muted)' }}>
        {profile.handle}@portfolio
      </div>
      <button
        onClick={() => setPalette(true)}
        className="mono mx-auto flex h-6 w-full max-w-md items-center gap-2 rounded-md border px-3 text-[11px] transition-colors hover:border-[var(--accent)]"
        style={{ background: 'var(--bg-2)', borderColor: 'var(--border)', color: 'var(--fg-muted)' }}
        aria-label="Open command palette"
      >
        <Search size={12} />
        <span className="truncate">{displayPath(active)}</span>
        <span className="ml-auto hidden rounded border px-1 text-[10px] sm:inline" style={{ borderColor: 'var(--border)' }}>
          Ctrl K
        </span>
      </button>
      <div className="mono hidden text-[11px] sm:block" style={{ color: 'var(--fg-faint)' }}>
        v3.0.0
      </div>
    </div>
  )
}
