import { useState } from 'react'
import { ChevronDown, ChevronRight, X } from 'lucide-react'
import { folders, rootFiles, type VFile } from '../../lib/files'
import { useStore } from '../../lib/store'
import { FileIcon } from './FileIcon'
import { profile } from '../../data/profile'

function Row({ file, depth }: { file: VFile; depth: number }) {
  const { active, open } = useStore()
  const isActive = active.path === file.path
  return (
    <button
      onClick={() => open(file.path)}
      className="mono flex w-full items-center gap-2 py-[3px] pr-2 text-left text-[12.5px] transition-colors"
      style={{
        paddingLeft: 12 + depth * 14,
        background: isActive ? 'var(--sel)' : 'transparent',
        color: isActive ? 'var(--fg)' : 'var(--fg-muted)',
        boxShadow: isActive ? 'inset 2px 0 0 var(--accent)' : 'none',
      }}
    >
      <FileIcon kind={file.kind} />
      <span className="truncate">{file.name}</span>
    </button>
  )
}

export function Explorer() {
  const { setSidebar, isMobile } = useStore()
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(
    Object.fromEntries(folders.map((f) => [f.name, !!f.open])),
  )
  const toggle = (n: string) => setOpenFolders((o) => ({ ...o, [n]: !o[n] }))

  // README first, then folders, then the rest of root files (mirrors editor sort with folders on top)
  const [readme, ...rest] = rootFiles

  return (
    <aside
      className="flex h-full w-64 shrink-0 flex-col border-r"
      style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}
      aria-label="Explorer"
    >
      <div
        className="flex h-9 items-center justify-between px-4 text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: 'var(--fg-muted)' }}
      >
        Explorer
        {isMobile && (
          <button onClick={() => setSidebar(false)} aria-label="Close explorer">
            <X size={14} />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="mono flex items-center gap-1 px-2 py-1 text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--fg)' }}>
          <ChevronDown size={13} /> {profile.handle}-portfolio
        </div>
        {folders.map((f) => (
          <div key={f.name}>
            <button
              onClick={() => toggle(f.name)}
              className="mono flex w-full items-center gap-1 py-[3px] pl-3 text-left text-[12.5px]"
              style={{ color: 'var(--fg)' }}
            >
              {openFolders[f.name] ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
              <span style={{ color: 'var(--yellow)' }}>▰</span> {f.name}
            </button>
            {openFolders[f.name] && f.files.map((file) => <Row key={file.path} file={file} depth={1} />)}
          </div>
        ))}
        <Row file={readme} depth={0} />
        {rest.map((file) => (
          <Row key={file.path} file={file} depth={0} />
        ))}
      </div>
      <div className="mono border-t px-4 py-3 text-[10.5px] leading-relaxed" style={{ borderColor: 'var(--border)', color: 'var(--fg-faint)' }}>
        <div>
          <span style={{ color: 'var(--green)' }}>●</span> open to Software Engineer roles
        </div>
        <div>Indianapolis, IN · Open to Relocation</div>
      </div>
    </aside>
  )
}
