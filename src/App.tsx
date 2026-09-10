import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { StoreProvider, useStore } from './lib/store'
import { TitleBar } from './components/ide/TitleBar'
import { ActivityBar } from './components/ide/ActivityBar'
import { Explorer } from './components/ide/Explorer'
import { TabBar } from './components/ide/TabBar'
import { StatusBar } from './components/ide/StatusBar'
import { Editor } from './components/ide/Editor'
import { Terminal } from './components/ide/Terminal'
import { Palette } from './components/ide/Palette'
import { Boot } from './components/ide/Boot'

// The hosted preview build uses hash routing; the real site (Vercel) uses clean URLs.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter

function Shell() {
  const { sidebar, setSidebar, terminal, setTerminal, setPalette, isMobile } = useStore()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey
      if (mod && (e.key === 'k' || e.key === 'p')) {
        e.preventDefault()
        setPalette((v) => !v)
      } else if (mod && e.key === '`') {
        e.preventDefault()
        setTerminal((v) => !v)
      } else if (mod && e.key === 'b') {
        e.preventDefault()
        setSidebar((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setPalette, setTerminal, setSidebar])

  return (
    <div className="flex h-full flex-col">
      <TitleBar />
      <div className="relative flex min-h-0 flex-1">
        {!isMobile && <ActivityBar />}
        {sidebar && (
          <div className={isMobile ? 'absolute inset-y-0 left-0 z-30 shadow-2xl' : ''}>
            <Explorer />
          </div>
        )}
        {sidebar && isMobile && (
          <div className="absolute inset-0 z-20" style={{ background: 'rgba(0,0,0,.5)' }} onClick={() => setSidebar(false)} />
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <TabBar />
          <div className="relative min-h-0 flex-1">
            <Editor />
          </div>
          {terminal && <Terminal />}
        </div>
      </div>
      {isMobile && <ActivityBar />}
      <StatusBar />
      <Palette />
    </div>
  )
}

export default function App() {
  const [booted, setBooted] = useState(() => {
    try {
      return sessionStorage.getItem('booted') === '1'
    } catch {
      return false
    }
  })
  const done = useCallback(() => {
    setBooted(true)
    try {
      sessionStorage.setItem('booted', '1')
    } catch {
      /* ignore */
    }
  }, [])
  return (
    <Router>
      <StoreProvider>
        {!booted && <Boot onDone={done} />}
        <Routes>
          <Route path="/*" element={<Shell />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </StoreProvider>
    </Router>
  )
}
