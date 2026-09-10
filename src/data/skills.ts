export type Depth = 3 | 2 | 1 // 3 = shipped to production repeatedly, 2 = deep working knowledge, 1 = used in projects

export type Skill = { name: string; depth: Depth; note?: string }
export type SkillGroup = { key: string; label: string; skills: Skill[] }

export const depthLabel: Record<Depth, string> = {
  3: 'production',
  2: 'deep',
  1: 'working',
}

export const skills: SkillGroup[] = [
  {
    key: 'languages',
    label: 'Languages',
    skills: [
      { name: 'Python', depth: 3, note: 'FastAPI, ETL, RAG, fault-injection tooling' },
      { name: 'Java', depth: 3, note: 'Spring Boot, Hibernate, Kafka consumers' },
      { name: 'C#', depth: 3, note: 'ASP.NET Core, EF Core, LINQ pipelines' },
      { name: 'TypeScript', depth: 3, note: 'React/Next.js front ends' },
      { name: 'C++', depth: 2, note: 'Raft, TCP proxy, epoll' },
      { name: 'SQL', depth: 3, note: 'query plans, indexes, migrations' },
      { name: 'JavaScript (ES6+)', depth: 3 },
    ],
  },
  {
    key: 'backend',
    label: 'Backend & Distributed Systems',
    skills: [
      { name: 'Spring Boot', depth: 3 },
      { name: 'ASP.NET Core / .NET', depth: 3 },
      { name: 'FastAPI', depth: 3 },
      { name: 'Django', depth: 2 },
      { name: 'REST API design', depth: 3 },
      { name: 'gRPC / Protobuf', depth: 2 },
      { name: 'Kafka', depth: 3 },
      { name: 'RabbitMQ', depth: 3 },
      { name: 'Azure Service Bus', depth: 3 },
      { name: 'Raft consensus', depth: 2 },
      { name: 'Microservices', depth: 3 },
      { name: 'Elasticsearch', depth: 2 },
      { name: 'Nginx', depth: 2 },
    ],
  },
  {
    key: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React', depth: 3 },
      { name: 'Next.js', depth: 2 },
      { name: 'Redux Toolkit', depth: 2 },
      { name: 'TailwindCSS', depth: 3 },
      { name: 'Framer Motion', depth: 2 },
      { name: 'WebSockets', depth: 2 },
      { name: 'Accessibility (WCAG 2.1)', depth: 2 },
      { name: 'Mapbox', depth: 2 },
    ],
  },
  {
    key: 'ai',
    label: 'AI & Retrieval',
    skills: [
      { name: 'RAG architecture', depth: 3 },
      { name: 'LangChain', depth: 3 },
      { name: 'Pinecone', depth: 3 },
      { name: 'FAISS', depth: 3 },
      { name: 'Azure OpenAI', depth: 3 },
      { name: 'Amazon Bedrock', depth: 2 },
      { name: 'Embeddings & semantic search', depth: 3 },
      { name: 'Prompt engineering / grounding', depth: 3 },
      { name: 'PyTorch', depth: 2 },
      { name: 'TensorFlow', depth: 1 },
      { name: 'NLP (BERT fine-tuning)', depth: 2 },
    ],
  },
  {
    key: 'data',
    label: 'Databases',
    skills: [
      { name: 'PostgreSQL', depth: 3 },
      { name: 'MySQL', depth: 3 },
      { name: 'Microsoft SQL Server', depth: 3 },
      { name: 'Redis', depth: 3 },
      { name: 'DynamoDB', depth: 2 },
      { name: 'Hibernate JPA', depth: 3 },
      { name: 'Entity Framework Core', depth: 3 },
      { name: 'SQLAlchemy', depth: 2 },
      { name: 'Cloudflare D1 / KV', depth: 2 },
      { name: 'Supabase', depth: 2 },
    ],
  },
  {
    key: 'cloud',
    label: 'Cloud, DevOps & Observability',
    skills: [
      { name: 'AWS (EC2, S3, RDS, Lambda)', depth: 3 },
      { name: 'Azure (AKS, DevOps, Service Bus)', depth: 3 },
      { name: 'Docker', depth: 3 },
      { name: 'Kubernetes + Helm', depth: 2 },
      { name: 'Terraform', depth: 2 },
      { name: 'GitHub Actions', depth: 3 },
      { name: 'Prometheus / Grafana', depth: 2 },
      { name: 'OpenTelemetry', depth: 2 },
      { name: 'Linux / POSIX', depth: 2 },
    ],
  },
  {
    key: 'testing',
    label: 'Testing & Quality',
    skills: [
      { name: 'JUnit / Mockito', depth: 3 },
      { name: 'xUnit', depth: 3 },
      { name: 'PyTest', depth: 3 },
      { name: 'Jest / React Testing Library', depth: 3 },
      { name: 'Cypress', depth: 3 },
      { name: 'Integration & contract testing', depth: 3 },
    ],
  },
]
