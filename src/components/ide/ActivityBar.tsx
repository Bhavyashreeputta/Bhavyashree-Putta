import { Files, Terminal, Mail, FileDown, Palette } from 'lucide-react'
import { Github, Linkedin } from './Brand'
import { useStore, themes } from '../../lib/store'
import { profile } from '../../data/profile'

function Btn({
  label,
  active,
  onClick,
  href,
  children,
}: {
  label: string
  active?: boolean
  onClick?: () => void
  href?: string
  children: React.ReactNode
}) {
  const cls =
    'relative flex h-11 w-11 items-center justify-center transition-colors hover:text-[var(--fg)] md:h-12 md:w-12'
  const style = { color: active ? 'var(--fg)' : 'var(--fg-faint)' }
  const bar = active ? (
    <span className="absolute left-0 top-2 bottom-2 hidden w-0.5 rounded-r md:block" style={{ background: 'var(--accent)' }} />
  ) : null
  if (href)
    return (
      <a className={cls} style={style} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
        {bar}
        {children}
      </a>
    )
  return (
    <button className={cls} style={style} onClick={onClick} aria-label={label} title={label}>
      {bar}
      {children}
    </button>
  )
}

export function ActivityBar() {
  const { sidebar, setSidebar, terminal, setTerminal, theme, setTheme, isMobile } = useStore()
  const nextTheme = () => setTheme(themes[(themes.indexOf(theme) + 1) % themes.length])
  return (
    <nav
      className={
        isMobile
          ? 'flex h-12 shrink-0 items-center justify-around border-t'
          : 'flex w-12 shrink-0 flex-col items-center border-r'
      }
      style={{ background: 'var(--bg-1)', borderColor: 'var(--border)' }}
      aria-label="Activity bar"
    >
      <Btn label="Explorer" active={sidebar} onClick={() => setSidebar((v) => !v)}>
        <Files size={20} />
      </Btn>
      <Btn label="Terminal" active={terminal} onClick={() => setTerminal((v) => !v)}>
        <Terminal size={20} />
      </Btn>
      <Btn label={`Theme: ${theme}`} onClick={nextTheme}>
        <Palette size={20} />
      </Btn>
      {!isMobile && <div className="flex-1" />}
      <Btn label="Download resume" href={profile.resumeUrl}>
        <FileDown size={20} />
      </Btn>
      <Btn label="GitHub" href={profile.github}>
        <Github size={20} />
      </Btn>
      <Btn label="LinkedIn" href={profile.linkedin}>
        <Linkedin size={20} />
      </Btn>
      <Btn label="Email" href={`mailto:${profile.email}`}>
        <Mail size={20} />
      </Btn>
    </nav>
  )
}
