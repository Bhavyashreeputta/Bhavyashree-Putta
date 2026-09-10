import { FileDown, ExternalLink } from 'lucide-react'
import { profile } from '../../data/profile'
import { Doc } from '../ide/Section'

export function ResumeView() {
  return (
    <Doc title="Resume" subtitle="resume.pdf" wide>
      <div className="mb-4 flex flex-wrap gap-2">
        <a href={profile.resumeUrl} download="Bhavyashree_Putta_Resume.pdf" className="mono flex items-center gap-2 rounded-md px-4 py-2 text-[12.5px] font-semibold" style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
          <FileDown size={14} /> download
        </a>
        <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="mono flex items-center gap-2 rounded-md border px-4 py-2 text-[12.5px]" style={{ borderColor: 'var(--border)', background: 'var(--bg-2)' }}>
          <ExternalLink size={14} /> open in new tab
        </a>
      </div>
      <div className="overflow-hidden rounded-lg border" style={{ borderColor: 'var(--border)', background: '#fff', height: '78vh' }}>
        <iframe src={`${profile.resumeUrl}#view=FitH`} title="Resume" className="h-full w-full" />
      </div>
    </Doc>
  )
}
