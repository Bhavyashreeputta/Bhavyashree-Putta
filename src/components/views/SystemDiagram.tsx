/**
 * Animated architecture of the systems Bhavya has actually shipped —
 * request flow on the left, retrieval flow on the right.
 */
type Node = { id: string; x: number; y: number; w: number; label: string; sub: string; color: string }

const nodes: Node[] = [
  { id: 'client', x: 20, y: 90, w: 120, label: 'React / TS SPA', sub: 'p99 < 120ms', color: 'var(--cyan)' },
  { id: 'api', x: 190, y: 90, w: 180, label: 'API layer', sub: 'Spring · ASP.NET · FastAPI', color: 'var(--accent)' },
  { id: 'bus', x: 420, y: 30, w: 130, label: 'Kafka / RabbitMQ', sub: 'replay · DLQ · idempotent', color: 'var(--orange)' },
  { id: 'db', x: 420, y: 150, w: 130, label: 'SQL Server / Postgres', sub: '50M+ rows · ACID', color: 'var(--green)' },
  { id: 'workers', x: 600, y: 30, w: 120, label: 'Workers', sub: '40K report perms', color: 'var(--yellow)' },
  { id: 'vec', x: 600, y: 150, w: 120, label: 'Pinecone / FAISS', sub: '1536-d · hybrid', color: 'var(--accent-2)' },
  { id: 'llm', x: 770, y: 90, w: 120, label: 'LLM', sub: 'GPT-4 · Bedrock', color: 'var(--red)' },
]

const edges: [string, string][] = [
  ['client', 'api'],
  ['api', 'bus'],
  ['api', 'db'],
  ['bus', 'workers'],
  ['workers', 'db'],
  ['db', 'vec'],
  ['vec', 'llm'],
  ['api', 'vec'],
]

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
const H = 48

function anchor(n: Node, side: 'l' | 'r') {
  return { x: side === 'l' ? n.x : n.x + n.w, y: n.y + H / 2 }
}

export function SystemDiagram() {
  return (
    <div className="overflow-x-auto rounded-lg border p-3" style={{ borderColor: 'var(--border)', background: 'var(--bg-1)' }}>
      <svg viewBox="0 0 910 240" className="h-auto w-full min-w-[640px]" role="img" aria-label="Architecture diagram of systems shipped">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--fg-faint)" />
          </marker>
        </defs>
        {edges.map(([a, b]) => {
          const A = byId[a]
          const B = byId[b]
          const p = anchor(A, 'r')
          const q = anchor(B, 'l')
          const mx = (p.x + q.x) / 2
          const d = `M${p.x},${p.y} C${mx},${p.y} ${mx},${q.y} ${q.x},${q.y}`
          return (
            <g key={a + b}>
              <path d={d} fill="none" stroke="var(--border)" strokeWidth="2" markerEnd="url(#arr)" />
              <path d={d} fill="none" stroke={B.color} strokeWidth="1.5" className="flow-line" opacity="0.9" />
            </g>
          )
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect x={n.x} y={n.y} width={n.w} height={H} rx="6" fill="var(--bg-2)" stroke={n.color} strokeOpacity="0.6" />
            <rect x={n.x} y={n.y} width="3" height={H} rx="1.5" fill={n.color} />
            <text x={n.x + 12} y={n.y + 19} fontFamily="var(--font-mono)" fontSize="11" fontWeight="600" fill="var(--fg)">
              {n.label}
            </text>
            <text x={n.x + 12} y={n.y + 35} fontFamily="var(--font-mono)" fontSize="9" fill="var(--fg-muted)">
              {n.sub}
            </text>
          </g>
        ))}
        <text x="20" y="225" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--fg-faint)">
          // request path (left) and retrieval path (right) — every box is something I have built and run in production
        </text>
      </svg>
    </div>
  )
}
