import { allFiles, displayPath, fileByName, folders, rootFiles } from './files'
import { profile } from '../data/profile'
import { experience } from '../data/experience'
import { projects } from '../data/projects'
import { skills, depthLabel } from '../data/skills'
import { achievements } from '../data/achievements'
import { themes, type ThemeName } from './store'

export type Line = { text: string; color?: string }
export type ShellCtx = {
  open: (path: string) => void
  setTheme: (t: ThemeName) => void
  theme: ThemeName
  clear: () => void
  closeTerminal: () => void
}

const c = (text: string, color?: string): Line => ({ text, color })
const MUTED = 'var(--fg-muted)'
const ACC = 'var(--accent)'
const GREEN = 'var(--green)'
const RED = 'var(--red)'
const YEL = 'var(--yellow)'

const commands: Record<string, { desc: string; run: (args: string[], ctx: ShellCtx) => Line[] }> = {
  help: {
    desc: 'list commands',
    run: () => [
      c('available commands:', MUTED),
      ...Object.entries(commands).map(([k, v]) => c(`  ${k.padEnd(12)} ${v.desc}`)),
      c(''),
      c('shortcuts: Ctrl+K palette · Ctrl+` terminal · Ctrl+B sidebar · Tab completes · ↑↓ history', MUTED),
    ],
  },
  whoami: {
    desc: 'who is this',
    run: () => [c(profile.name, ACC), c(profile.title), c(profile.location, MUTED)],
  },
  ls: {
    desc: 'list files',
    run: (args) => {
      const dir = args[0]?.replace(/\/$/, '')
      if (dir) {
        const f = folders.find((x) => x.name === dir)
        if (!f) return [c(`ls: cannot access '${dir}': No such file or directory`, RED)]
        return [c(f.files.map((x) => x.name).join('  '))]
      }
      return [c([...folders.map((f) => f.name + '/'), ...rootFiles.map((f) => f.name)].join('  '))]
    },
  },
  open: {
    desc: 'open <file> in the editor',
    run: (args, ctx) => {
      const f = args[0] && fileByName(args[0])
      if (!f) return [c(`open: no such file: ${args[0] ?? ''}. try 'ls'`, RED)]
      ctx.open(f.path)
      return [c(`opened ${displayPath(f)}`, GREEN)]
    },
  },
  cat: {
    desc: 'print a file summary',
    run: (args, ctx) => {
      const f = args[0] && fileByName(args[0])
      if (!f) return [c(`cat: ${args[0] ?? ''}: No such file`, RED)]
      switch (f.view) {
        case 'readme':
          return [c(`# ${profile.name}`, ACC), c(profile.title), c(''), c(profile.summary)]
        case 'experience':
          return commands.experience.run([], ctx)
        case 'projects':
          return commands.projects.run([], ctx)
        case 'project': {
          const p = projects.find((x) => x.id === f.param)!
          return [c(p.name, ACC), c(p.tagline), c(''), c('stack: ' + p.stack.join(', '), MUTED), ...(p.github ? [c(p.github, MUTED)] : [])]
        }
        case 'skills':
          return commands.skills.run([], ctx)
        case 'achievements':
          return achievements.map((a) => c(`★ ${a.title} (${a.year})`, YEL))
        case 'contact':
          return commands.contact.run([], ctx)
        case 'polyglot':
          return [c('binary-ish. use: open ' + f.name, MUTED)]
        case 'resume':
          return [c('%PDF-1.7 … use: open resume.pdf', MUTED)]
      }
    },
  },
  experience: {
    desc: 'work history, one line per role',
    run: () =>
      experience.map((e) => c(`${e.period.padEnd(22)} ${e.role} @ ${e.company}`)),
  },
  projects: {
    desc: 'list projects',
    run: () => projects.map((p) => c(`${p.file.padEnd(24)} ${p.name}`)),
  },
  skills: {
    desc: 'skills [group]  — e.g. skills ai',
    run: (args) => {
      const g = args[0] ? skills.filter((s) => s.key.startsWith(args[0])) : skills
      if (!g.length) return [c(`no group '${args[0]}'. groups: ${skills.map((s) => s.key).join(', ')}`, RED)]
      return g.flatMap((s) => [c(`${s.key}:`, ACC), c('  ' + s.skills.map((k) => `${k.name} [${depthLabel[k.depth]}]`).join(', '))])
    },
  },
  contact: {
    desc: 'how to reach me',
    run: () => [c(`email    ${profile.email}`), c(`github   ${profile.github}`), c(`linkedin ${profile.linkedin}`)],
  },
  resume: {
    desc: 'open the resume',
    run: (_, ctx) => {
      ctx.open('/resume')
      return [c('opened resume.pdf', GREEN)]
    },
  },
  neofetch: {
    desc: 'system info',
    run: (_, ctx) => [
      c(`   ██████╗   ${profile.handle}@portfolio`, ACC),
      c(`   ██╔══██╗  ----------------`, ACC),
      c(`   ██████╔╝  OS: Chicago, IL`, ACC),
      c(`   ██╔══██╗  Kernel: M.S. CS, UIC (3.88)`, ACC),
      c(`   ██████╔╝  Uptime: 3+ years in production`, ACC),
      c(`   ╚═════╝   Shell: python / java / c# / ts`, ACC),
      c(`             Packages: kafka, rabbitmq, rag, raft, react`, ACC),
      c(`             Theme: ${ctx.theme}`, ACC),
    ],
  },
  theme: {
    desc: `theme <${themes.join('|')}>`,
    run: (args, ctx) => {
      const t = args[0] as ThemeName
      if (!t) return [c(`current: ${ctx.theme}. options: ${themes.join(', ')}`, MUTED)]
      if (!themes.includes(t)) return [c(`unknown theme '${t}'. options: ${themes.join(', ')}`, RED)]
      ctx.setTheme(t)
      return [c(`theme set to ${t}`, GREEN)]
    },
  },
  echo: { desc: 'echo', run: (args) => [c(args.join(' '))] },
  date: { desc: 'current date', run: () => [c(new Date().toString())] },
  pwd: { desc: 'print working dir', run: () => [c(`/home/${profile.handle}/portfolio`)] },
  clear: {
    desc: 'clear the screen',
    run: (_, ctx) => {
      ctx.clear()
      return []
    },
  },
  exit: {
    desc: 'close the terminal',
    run: (_, ctx) => {
      ctx.closeTerminal()
      return []
    },
  },
  sudo: {
    desc: 'nice try',
    run: (args) => [c(`${profile.handle} is not in the sudoers file. This incident will be reported.`, RED), ...(args.includes('hire') ? [c('...okay, that one is allowed. email me.', GREEN)] : [])],
  },
  git: {
    desc: 'git log / status',
    run: (args) => {
      if (args[0] === 'status') return [c('On branch main'), c('nothing to commit, working tree clean', MUTED)]
      return [
        c('a1f9c3e  feat: rebuild portfolio as an IDE', YEL),
        c('7d2e0b1  feat: rag conversational search over 10k reports', YEL),
        c('c4b8a90  fix: split-brain during raft leader re-election', YEL),
        c('e11d5f2  perf: kafka replay cuts hardship calc time 45%', YEL),
        c('0b3c7aa  feat: u-pass+ ships to 65k students', YEL),
      ]
    },
  },
}

export const commandNames = Object.keys(commands)

export function complete(input: string): string[] {
  const parts = input.split(/\s+/)
  if (parts.length <= 1) return commandNames.filter((k) => k.startsWith(parts[0] ?? ''))
  const last = parts[parts.length - 1]
  const cmd = parts[0]
  if (cmd === 'theme') return themes.filter((t) => t.startsWith(last))
  if (cmd === 'skills') return skills.map((s) => s.key).filter((k) => k.startsWith(last))
  const names = [...allFiles.map((f) => f.name), ...allFiles.filter((f) => f.folder).map((f) => `${f.folder}/${f.name}`), ...folders.map((f) => f.name + '/')]
  return Array.from(new Set(names.filter((n) => n.toLowerCase().startsWith(last.toLowerCase()))))
}

export function run(input: string, ctx: ShellCtx): Line[] {
  const [cmd, ...args] = input.trim().split(/\s+/)
  if (!cmd) return []
  const entry = commands[cmd]
  if (!entry) {
    const f = fileByName(cmd)
    if (f) return commands.open.run([cmd], ctx)
    return [c(`bash: ${cmd}: command not found. try 'help'`, RED)]
  }
  return entry.run(args, ctx)
}
