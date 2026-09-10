import { useState } from 'react'
import { Copy, Check, Mail } from 'lucide-react'
import { Github, Linkedin } from '../ide/Brand'
import { profile } from '../../data/profile'
import { Card, Doc } from '../ide/Section'
import { CodeBlock } from '../ide/CodeBlock'

const script = `#!/usr/bin/env bash
# contact.sh — reach ${profile.name}
set -euo pipefail

EMAIL="${profile.email}"
GITHUB="${profile.github}"
LINKEDIN="${profile.linkedin}"
LOCATION="${profile.location}"

case "\${1:-help}" in
  email)    open "mailto:$EMAIL" ;;
  github)   open "$GITHUB" ;;
  linkedin) open "$LINKEDIN" ;;
  *)        echo "usage: ./contact.sh {email|github|linkedin}" ;;
esac

# response time: usually < 24h. Interesting systems problems get faster replies.`

export function ContactView() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* ignore */
    }
  }
  const rows = [
    { icon: <Mail size={16} />, label: 'email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: <Github size={16} />, label: 'github', value: profile.github.replace('https://', ''), href: profile.github },
    { icon: <Linkedin size={16} />, label: 'linkedin', value: 'bhavyashree-putta', href: profile.linkedin },
  ]
  return (
    <Doc title="Contact" subtitle="contact.sh · chmod +x">
      <p className="max-w-2xl text-[14px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
        Hiring for a backend, full-stack or applied-AI role? Want to argue about consensus algorithms? Either works.
      </p>
      <div className="mt-6 grid gap-3">
        {rows.map((r) => (
          <a key={r.label} href={r.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors hover:border-[var(--accent)]" style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}>
            <span style={{ color: 'var(--accent)' }}>{r.icon}</span>
            <span className="mono w-20 text-[11px] uppercase tracking-wider" style={{ color: 'var(--fg-faint)' }}>
              {r.label}
            </span>
            <span className="mono truncate text-[13px]">{r.value}</span>
            {r.label === 'email' && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  copy()
                }}
                className="ml-auto rounded p-1 hover:bg-[var(--bg-3)]"
                aria-label="Copy email"
              >
                {copied ? <Check size={14} style={{ color: 'var(--green)' }} /> : <Copy size={14} />}
              </button>
            )}
          </a>
        ))}
      </div>
      <Card className="mt-8 !p-0">
        <CodeBlock code={script} language="bash" className="p-4" />
      </Card>
    </Doc>
  )
}
