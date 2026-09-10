import { kindColor, type FileKind } from '../../lib/files'

const glyph: Record<FileKind, string> = {
  md: 'M↓',
  ts: 'TS',
  tsx: 'TSX',
  yaml: '⋮',
  py: 'Py',
  java: 'J',
  cs: 'C#',
  cpp: 'C++',
  sql: 'SQL',
  js: 'JS',
  ipynb: 'nb',
  sol: 'Ξ',
  php: 'php',
  pdf: 'PDF',
  sh: '$_',
  json: '{}',
}

export function FileIcon({ kind, size = 11 }: { kind: FileKind; size?: number }) {
  return (
    <span
      className="mono inline-flex shrink-0 items-center justify-center rounded-[3px] font-bold leading-none"
      style={{
        color: kindColor[kind],
        fontSize: size - 3,
        width: size + 11,
        height: size + 5,
        border: `1px solid color-mix(in srgb, ${kindColor[kind]} 45%, transparent)`,
        background: `color-mix(in srgb, ${kindColor[kind]} 10%, transparent)`,
      }}
      aria-hidden
    >
      {glyph[kind]}
    </span>
  )
}
