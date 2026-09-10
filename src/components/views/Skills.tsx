import { skills, depthLabel, type Depth } from '../../data/skills'
import { Doc } from '../ide/Section'

const yaml = skills
  .map(
    (g) =>
      `${g.key}:  # ${g.label}\n` +
      g.skills.map((s) => `  - name: ${s.name}\n    depth: ${depthLabel[s.depth]}${s.note ? `\n    note: "${s.note}"` : ''}`).join('\n'),
  )
  .join('\n\n')

const depthColor: Record<Depth, string> = { 3: 'var(--green)', 2: 'var(--accent)', 1: 'var(--fg-faint)' }

function Bar({ depth }: { depth: Depth }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={depthLabel[depth]} title={depthLabel[depth]}>
      {[1, 2, 3].map((n) => (
        <span key={n} className="h-2 w-2 rounded-[2px]" style={{ background: n <= depth ? depthColor[depth] : 'var(--bg-3)' }} />
      ))}
    </span>
  )
}

export function SkillsView() {
  return (
    <Doc title="Skills" subtitle="skills.yaml · rated by depth" source={yaml} sourceLang="yaml" wide>
      <div className="mono mb-6 flex flex-wrap gap-5 text-[11px]" style={{ color: 'var(--fg-muted)' }}>
        <span className="flex items-center gap-2">
          <Bar depth={3} /> production — shipped and operated repeatedly
        </span>
        <span className="flex items-center gap-2">
          <Bar depth={2} /> deep — built real things, can debug it at 2am
        </span>
        <span className="flex items-center gap-2">
          <Bar depth={1} /> working — used in projects
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:items-start">
        {skills.map((g) => (
          <section key={g.key} className="rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}>
            <div className="mono flex items-center gap-2 border-b px-4 py-2 text-[12px] font-semibold" style={{ borderColor: 'var(--border)' }}>
              <span style={{ color: 'var(--red)' }}>{g.key}:</span>
              <span style={{ color: 'var(--fg-faint)' }}># {g.label}</span>
            </div>
            <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {g.skills.map((s) => (
                <li key={s.name} className="flex items-center gap-3 px-4 py-2 text-[13px]" style={{ borderColor: 'var(--border)' }}>
                  <Bar depth={s.depth} />
                  <span className="font-medium">{s.name}</span>
                  {s.note && (
                    <span className="mono ml-auto hidden truncate text-[10.5px] sm:inline" style={{ color: 'var(--fg-faint)' }}>
                      {s.note}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Doc>
  )
}
