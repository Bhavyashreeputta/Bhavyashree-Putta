import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fileByPath, type VFile } from './files'

export type ThemeName = 'night' | 'dracula' | 'matrix' | 'paper'
export const themes: ThemeName[] = ['night', 'dracula', 'matrix', 'paper']

type Store = {
  tabs: VFile[]
  active: VFile
  open: (path: string) => void
  close: (path: string) => void
  closeOthers: (path: string) => void
  sidebar: boolean
  setSidebar: (v: boolean | ((v: boolean) => boolean)) => void
  terminal: boolean
  setTerminal: (v: boolean | ((v: boolean) => boolean)) => void
  palette: boolean
  setPalette: (v: boolean | ((v: boolean) => boolean)) => void
  theme: ThemeName
  setTheme: (t: ThemeName) => void
  isMobile: boolean
}

const Ctx = createContext<Store | null>(null)

const readTheme = (): ThemeName => {
  try {
    const t = localStorage.getItem('theme') as ThemeName | null
    return t && themes.includes(t) ? t : 'night'
  } catch {
    return 'night'
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const active = useMemo(() => fileByPath(location.pathname) ?? fileByPath('/')!, [location.pathname])

  const [tabs, setTabs] = useState<VFile[]>(() => (active.path === '/' ? [active] : [fileByPath('/')!, active]))
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 900 : false))
  const [sidebar, setSidebar] = useState(() => !isMobile)
  const [terminal, setTerminal] = useState(false)
  const [palette, setPalette] = useState(false)
  const [theme, setThemeState] = useState<ThemeName>(readTheme)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  // keep the active file in the tab strip
  useEffect(() => {
    setTabs((t) => (t.some((f) => f.path === active.path) ? t : [...t, active]))
  }, [active])

  const open = useCallback(
    (path: string) => {
      if (!fileByPath(path)) return
      navigate(path)
      if (isMobile) setSidebar(false)
    },
    [navigate, isMobile],
  )

  const close = useCallback(
    (path: string) => {
      setTabs((t) => {
        const idx = t.findIndex((f) => f.path === path)
        if (idx === -1) return t
        const next = t.filter((f) => f.path !== path)
        if (next.length === 0) {
          navigate('/')
          return [fileByPath('/')!]
        }
        if (path === active.path) {
          const fallback = next[Math.max(0, idx - 1)]
          navigate(fallback.path)
        }
        return next
      })
    },
    [active.path, navigate],
  )

  const closeOthers = useCallback(
    (path: string) => {
      const f = fileByPath(path)
      if (!f) return
      setTabs([f])
      navigate(path)
    },
    [navigate],
  )

  const value: Store = {
    tabs,
    active,
    open,
    close,
    closeOthers,
    sidebar,
    setSidebar,
    terminal,
    setTerminal,
    palette,
    setPalette,
    theme,
    setTheme: setThemeState,
    isMobile,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useStore = () => {
  const s = useContext(Ctx)
  if (!s) throw new Error('useStore outside provider')
  return s
}
