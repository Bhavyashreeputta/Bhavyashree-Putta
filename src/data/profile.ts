import resumeUrl from '../media/Bhavyashree_Putta_Resume.pdf'
import photo from '../media/profile.jpg'

export const profile = {
  name: 'Bhavyashree Putta',
  handle: 'bhavya',
  title: 'Software Engineer · Full-Stack & AI',
  location: 'Chicago, IL',
  email: 'bhavyaputta13@gmail.com',
  github: 'https://github.com/Bhavyashreeputta',
  linkedin: 'https://www.linkedin.com/in/bhavyashree-putta-b120261b8/',
  resumeUrl,
  photo,
  taglines: [
    'I ship backends that survive traffic and retrieval systems that survive users.',
    'Python, Java and C# — same engineer, same standards, whichever runtime you run.',
    'From Raft consensus to RAG pipelines: depth first, then breadth.',
    'React on the front, queues in the middle, ACID at the bottom.',
  ],
  summary:
    'Software Engineer with 3+ years building full-stack products, event-driven backends and AI-powered retrieval systems that carry real load: 65K+ students on a transit platform, 50M+ census rows in production, 119K esports matches behind a vector index. I write production code in Python, Java and C#, and I care about the same things in all three — correctness under concurrency, observability, and boring, reliable releases.',
  stats: [
    { label: 'users served', value: '65K+', note: 'U-PASS+ transit platform' },
    { label: 'rows in prod', value: '50M+', note: 'ACS census ETL → MySQL' },
    { label: 'RAG median latency', value: '1.2s', note: 'GPT-4 + FAISS/Pinecone' },
    { label: 'uptime maintained', value: '99.9%', note: 'across three platforms' },
  ],
  pillars: [
    {
      title: 'Backend & Distributed Systems',
      blurb:
        'Spring Boot, ASP.NET Core and FastAPI services; Kafka and RabbitMQ pipelines with replay, idempotent consumers and dead-letter recovery; a Raft implementation written from the paper, not a library.',
      tags: ['Kafka', 'RabbitMQ', 'gRPC', 'Raft', 'Azure Service Bus', 'Redis'],
    },
    {
      title: 'Full-Stack Product',
      blurb:
        'React + TypeScript SPAs with code-splitting and memoization tuned to p99 < 120ms and FID < 50ms; 200+ Jest/RTL/Cypress tests wired into CI gates; schemas and indexes designed for zero-downtime migrations.',
      tags: ['React', 'TypeScript', 'Next.js', 'SQL Server', 'PostgreSQL', 'CI/CD'],
    },
    {
      title: 'Applied AI & Retrieval',
      blurb:
        'RAG systems in production — hybrid FAISS + Pinecone retrieval over 10K+ research reports, Bedrock-hosted LLM scouting over 119K matches, session state on Cloudflare D1/KV, all measured on latency and answer quality, not vibes.',
      tags: ['RAG', 'LangChain', 'Pinecone', 'FAISS', 'Azure OpenAI', 'Amazon Bedrock'],
    },
  ],
  education: {
    school: 'University of Illinois Chicago',
    degree: 'M.S. Computer Science',
    period: 'Aug 2023 – May 2025',
    gpa: '3.88 / 4.0',
  },
}

export type Profile = typeof profile
