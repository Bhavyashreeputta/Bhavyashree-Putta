import { motion } from 'framer-motion'
import { ExternalLink, Newspaper, Trophy, BookOpen, Medal } from 'lucide-react'
import { achievements, type Achievement } from '../../data/achievements'
import { profile } from '../../data/profile'
import { Card, Doc, H2 } from '../ide/Section'

const icon: Record<Achievement['kind'], React.ReactNode> = {
  press: <Newspaper size={16} />,
  award: <Trophy size={16} />,
  publication: <BookOpen size={16} />,
  finalist: <Medal size={16} />,
}
const color: Record<Achievement['kind'], string> = {
  press: 'var(--cyan)',
  award: 'var(--yellow)',
  publication: 'var(--accent-2)',
  finalist: 'var(--orange)',
}

const md = achievements.map((a) => `## ${a.title} (${a.year})\n\n${a.body}${a.link ? `\n\n[${a.linkLabel}](${a.link})` : ''}`).join('\n\n')

export function AchievementsView() {
  return (
    <Doc title="Achievements" subtitle="achievements.md" source={md} sourceLang="markdown">
      <div className="space-y-4">
        {achievements.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card>
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md" style={{ background: `color-mix(in srgb, ${color[a.kind]} 15%, transparent)`, color: color[a.kind] }}>
                  {icon[a.kind]}
                </span>
                <div className="min-w-0">
                  <div className="mono text-[10.5px] uppercase tracking-wider" style={{ color: color[a.kind] }}>
                    {a.kind} · {a.year}
                  </div>
                  <h3 className="mt-0.5 text-[15px] font-bold">{a.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                    {a.body}
                  </p>
                  {a.link && (
                    <a href={a.link} target="_blank" rel="noreferrer" className="mono mt-3 inline-flex items-center gap-1 text-[12px]" style={{ color: 'var(--accent)' }}>
                      {a.linkLabel} <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <H2>education</H2>
      <Card>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <div className="text-[15px] font-bold">{profile.education.degree}</div>
            <div className="text-[13px]" style={{ color: 'var(--fg-muted)' }}>
              {profile.education.school}
            </div>
          </div>
          <div className="mono text-[12px]" style={{ color: 'var(--fg-muted)' }}>
            {profile.education.period} · GPA {profile.education.gpa}
          </div>
        </div>
      </Card>
    </Doc>
  )
}
