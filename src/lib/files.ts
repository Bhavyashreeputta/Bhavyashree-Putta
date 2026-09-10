import { projects } from '../data/projects'
import { polyglot } from '../data/polyglot'

export type FileKind =
  | 'md' | 'ts' | 'tsx' | 'yaml' | 'py' | 'java' | 'cs' | 'cpp' | 'sql' | 'js'
  | 'ipynb' | 'sol' | 'php' | 'pdf' | 'sh' | 'json'

export type VFile = {
  path: string // route path, e.g. /projects/raft
  name: string // display name, e.g. raft-replication.cpp
  kind: FileKind
  view: 'readme' | 'experience' | 'skills' | 'projects' | 'project' | 'polyglot' | 'achievements' | 'resume' | 'contact'
  param?: string
  folder?: string
}

export type VFolder = { name: string; files: VFile[]; open?: boolean }

const kindOf = (name: string): FileKind => (name.split('.').pop() as FileKind) ?? 'md'

export const rootFiles: VFile[] = [
  { path: '/', name: 'README.md', kind: 'md', view: 'readme' },
  { path: '/experience', name: 'experience.ts', kind: 'ts', view: 'experience' },
  { path: '/skills', name: 'skills.yaml', kind: 'yaml', view: 'skills' },
  { path: '/achievements', name: 'achievements.md', kind: 'md', view: 'achievements' },
  { path: '/resume', name: 'resume.pdf', kind: 'pdf', view: 'resume' },
  { path: '/contact', name: 'contact.sh', kind: 'sh', view: 'contact' },
]

export const folders: VFolder[] = [
  {
    name: 'projects',
    open: true,
    files: [
      { path: '/projects', name: 'overview.md', kind: 'md', view: 'projects', folder: 'projects' },
      ...projects.map<VFile>((p) => ({
        path: `/projects/${p.id}`,
        name: p.file,
        kind: kindOf(p.file),
        view: 'project',
        param: p.id,
        folder: 'projects',
      })),
    ],
  },
  {
    name: 'polyglot',
    open: true,
    files: polyglot.map<VFile>((s) => ({
      path: `/polyglot/${s.lang}`,
      name: s.file,
      kind: kindOf(s.file),
      view: 'polyglot',
      param: s.lang,
      folder: 'polyglot',
    })),
  },
]

export const allFiles: VFile[] = [...rootFiles, ...folders.flatMap((f) => f.files)]

export const fileByPath = (path: string) => allFiles.find((f) => f.path === path)

export const fileByName = (name: string) =>
  allFiles.find((f) => f.name.toLowerCase() === name.toLowerCase() || `${f.folder}/${f.name}`.toLowerCase() === name.toLowerCase())

export const displayPath = (f: VFile) => (f.folder ? `${f.folder}/${f.name}` : f.name)

export const kindColor: Record<FileKind, string> = {
  md: 'var(--cyan)',
  ts: 'var(--accent)',
  tsx: 'var(--accent)',
  yaml: 'var(--red)',
  py: 'var(--yellow)',
  java: 'var(--orange)',
  cs: 'var(--accent-2)',
  cpp: 'var(--accent)',
  sql: 'var(--green)',
  js: 'var(--yellow)',
  ipynb: 'var(--orange)',
  sol: 'var(--fg-muted)',
  php: 'var(--accent-2)',
  pdf: 'var(--red)',
  sh: 'var(--green)',
  json: 'var(--yellow)',
}

export const kindLang: Record<FileKind, string> = {
  md: 'Markdown',
  ts: 'TypeScript',
  tsx: 'TypeScript React',
  yaml: 'YAML',
  py: 'Python',
  java: 'Java',
  cs: 'C#',
  cpp: 'C++',
  sql: 'SQL',
  js: 'JavaScript',
  ipynb: 'Jupyter',
  sol: 'Solidity',
  php: 'PHP',
  pdf: 'PDF',
  sh: 'Shell Script',
  json: 'JSON',
}
