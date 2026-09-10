import { X, ChevronRight } from 'lucide-react'
import { useStore } from '../../lib/store'
import { FileIcon } from './FileIcon'
import { profile } from '../../data/profile'

export function TabBar() {
  const { tabs, active, open, close } = useStore()
  return (
    <div className="shrink-0" style={{ background: 'var(--bg-1)' }}>
      <div className="flex h-9 overflow-x-auto border-b" style={{ borderColor: 'var(--border)' }} role="tablist">
        {tabs.map((t) => {
          const isActive = t.path === active.path
          return (
            <div
              key={t.path}
              role="tab"
              aria-selected={isActive}
              onClick={() => open(t.path)}
              onAuxClick={(e) => {
                if (e.button === 1) close(t.path)
              }}
              className="mono group flex h-full shrink-0 cursor-pointer items-center gap-2 border-r px-3 text-[12px]"
              style={{
                borderColor: 'var(--border)',
                background: isActive ? 'var(--bg)' : 'transparent',
                color: isActive ? 'var(--fg)' : 'var(--fg-muted)',
                boxShadow: isActive ? 'inset 0 1px 0 var(--accent)' : 'none',
              }}
            >
              <FileIcon kind={t.kind} />
              <span>{t.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  close(t.path)
                }}
                className="rounded p-0.5 opacity-0 transition-opacity hover:bg-[var(--bg-3)] group-hover:opacity-100"
                style={{ opacity: isActive ? 1 : undefined }}
                aria-label={`Close ${t.name}`}
              >
                <X size={12} />
              </button>
            </div>
          )
        })}
      </div>
      <div
        className="mono flex h-6 items-center gap-1 px-4 text-[11px]"
        style={{ color: 'var(--fg-faint)', background: 'var(--bg)' }}
        aria-label="Breadcrumb"
      >
        <span>{profile.handle}-portfolio</span>
        {active.folder && (
          <>
            <ChevronRight size={11} />
            <span>{active.folder}</span>
          </>
        )}
        <ChevronRight size={11} />
        <span style={{ color: 'var(--fg-muted)' }}>{active.name}</span>
      </div>
    </div>
  )
}
