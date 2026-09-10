import { useEffect, useRef } from 'react'
import { useStore } from '../../lib/store'
import { Readme } from '../views/Readme'
import { ExperienceView } from '../views/Experience'
import { SkillsView } from '../views/Skills'
import { ProjectsView, ProjectView } from '../views/Projects'
import { PolyglotView } from '../views/Polyglot'
import { AchievementsView } from '../views/Achievements'
import { ResumeView } from '../views/Resume'
import { ContactView } from '../views/Contact'

export function Editor() {
  const { active } = useStore()
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.scrollTo({ top: 0 })
  }, [active.path])

  let view: React.ReactNode
  switch (active.view) {
    case 'readme':
      view = <Readme />
      break
    case 'experience':
      view = <ExperienceView />
      break
    case 'skills':
      view = <SkillsView />
      break
    case 'projects':
      view = <ProjectsView />
      break
    case 'project':
      view = <ProjectView id={active.param!} />
      break
    case 'polyglot':
      view = <PolyglotView lang={active.param!} />
      break
    case 'achievements':
      view = <AchievementsView />
      break
    case 'resume':
      view = <ResumeView />
      break
    case 'contact':
      view = <ContactView />
      break
  }
  return (
    <div ref={ref} className="editor-grid absolute inset-0 overflow-y-auto" style={{ background: 'var(--bg)' }}>
      <div key={active.path}>{view}</div>
    </div>
  )
}
