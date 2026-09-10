export type Bullet = { text: string; metric?: string }

export type Experience = {
  id: string
  role: string
  company: string
  org?: string
  period: string
  start: string
  end: string | null
  location: string
  product?: string
  summary: string
  bullets: Bullet[]
  stack: string[]
  languages: ('Python' | 'Java' | 'C#' | 'TypeScript' | 'C++' | 'SQL')[]
}

export const experience: Experience[] = [
  {
    id: 'united-way',
    role: 'Software Engineer',
    company: 'United Way of Northern New Jersey',
    product: 'United For ALICE',
    period: 'Dec 2025 – Present',
    start: '2025-12-01',
    end: null,
    location: 'Remote · Chicago, IL',
    summary:
      'Full-stack owner on the United For ALICE research platform — the dataset 44 state United Ways and nonprofit partners use to measure financial hardship across 3,100+ US counties and shape local policy.',
    bullets: [
      {
        text: 'Own end-to-end React + TypeScript and backend features for partner dashboards — interactive maps, data tables and report visualizations built on a shared component architecture.',
        metric: '−25% feature dev time',
      },
      {
        text: 'Python ETL pipelines transform 6 GB of annual ACS census data into structured records loaded into production MySQL; C#/LINQ transformation jobs over 7M+ records feed downstream analytics.',
        metric: '50M+ rows · −20% processing time',
      },
      {
        text: 'Kafka-based ingestion decouples Census Bureau and state-partner producers from downstream services via event replay; RabbitMQ task queues generate 40K+ report permutations asynchronously instead of blocking API requests.',
        metric: '−45% hardship calc time',
      },
      {
        text: 'Spring Boot microservices and ASP.NET Core APIs for reporting and map-based exploration; Hibernate JPA / EF Core mappings and hand-tuned JPQL/SQL over 20M+ records.',
        metric: '−35% query latency',
      },
      {
        text: 'Built a RAG conversational search assistant with JPMorgan Chase engineers — LangChain, vector search and natural-language querying across 10,000+ research reports and datasets.',
        metric: '−60% retrieval time',
      },
      {
        text: 'Structured logging, distributed request tracing, health checks and exception telemetry across services; Docker images built and shipped through Azure DevOps pipelines.',
        metric: '99.9% uptime · −30% MTTR',
      },
    ],
    stack: [
      'React', 'TypeScript', 'FastAPI', 'Spring Boot', 'ASP.NET Core', 'Kafka', 'RabbitMQ',
      'Hibernate JPA', 'Entity Framework Core', 'MySQL', 'SQL Server', 'LangChain', 'Docker', 'Azure DevOps',
    ],
    languages: ['Python', 'Java', 'C#', 'TypeScript', 'SQL'],
  },
  {
    id: 'uic-research',
    role: 'Research Software Engineer',
    company: 'University of Illinois',
    org: 'College of Applied Health Sciences · Discovery Partners Institute',
    period: 'Jun 2025 – Nov 2025',
    start: '2025-06-01',
    end: '2025-11-30',
    location: 'Chicago, IL',
    summary:
      'Two funded research builds: a Google-funded RAG health chatbot designed for low-connectivity environments, and SewerAtlas, a statewide GIS planning dashboard for the Illinois Department of Public Health.',
    bullets: [
      {
        text: 'FastAPI RAG chatbot on Azure OpenAI GPT-4 with hybrid Pinecone + FAISS retrieval, tuned for accurate, reliable answers where connectivity is poor.',
        metric: '1.2s median latency',
      },
      {
        text: 'Two-tier session architecture: Cloudflare D1 for persistent chat history, KV with TTL expiry as a read cache — cut D1 read load and kept access sub-second for 50+ concurrent users.',
      },
      {
        text: 'Containerized services deployed to Azure Kubernetes Service with Terraform + Helm — horizontal scaling, failure isolation, per-pod observability.',
        metric: '−60% response failures',
      },
      {
        text: 'SewerAtlas: React + TypeScript + FastAPI + Mapbox dashboard mapping wastewater service areas against 12.5M+ residents and 10+ critical facility types.',
      },
      {
        text: 'Geospatial ETL in Python merging 15–25 spatial layers into PostgreSQL/Supabase with 500K+ indexed features; GitHub Actions CI/CD cut releases from 20–30 manual minutes to under 5.',
        metric: 'days → <1h data prep',
      },
    ],
    stack: [
      'FastAPI', 'Azure OpenAI', 'Pinecone', 'FAISS', 'Cloudflare D1/KV', 'AKS', 'Terraform', 'Helm',
      'React', 'TypeScript', 'Mapbox', 'PostgreSQL', 'Supabase', 'GitHub Actions',
    ],
    languages: ['Python', 'TypeScript', 'SQL'],
  },
  {
    id: 'uic-upass',
    role: 'Graduate Assistant · Full-Stack Developer',
    company: 'University of Illinois Chicago',
    product: 'U-PASS+',
    period: 'Aug 2023 – May 2025',
    start: '2023-08-01',
    end: '2025-05-31',
    location: 'Chicago, IL',
    summary:
      'Built and scaled U-PASS+, the transit enrollment and payment platform for 65K+ UIC students — featured by the Cook County Chronicle for beating expectations on transit access.',
    bullets: [
      {
        text: 'Architected the React SPA with code-splitting, lazy-loaded routes and memoized components; async data fetching kept First Input Delay under 50ms during peak registration.',
        metric: '−45% initial load · p99 < 120ms',
      },
      {
        text: 'Enrollment, payment and pass-provisioning services written as ASP.NET Core (C#) and FastAPI (Python) APIs with schema validation and dependency-injected services; xUnit / PyTest / JUnit suites covered edge cases and race conditions.',
        metric: '−40% integration failures',
      },
      {
        text: 'Azure Service Bus queues with background consumers orchestrate enrollment + payment workflows; retry, timeout and dead-letter recovery handle bus outages and downstream API failures.',
        metric: '−35% transaction failures · +60% peak throughput',
      },
      {
        text: 'Designed SQL Server schemas, EF Core mappings, composite indexes and ACID transaction boundaries using query-plan analysis.',
        metric: '+60% query perf · zero-downtime migrations',
      },
      {
        text: '200+ Jest, React Testing Library and Cypress tests wired into CI/CD gates, catching regressions pre-merge and supporting stable weekly releases.',
        metric: '+40% coverage · −35% escaped defects',
      },
    ],
    stack: [
      'React', 'TypeScript', 'ASP.NET Core', 'FastAPI', 'Azure Service Bus', 'SQL Server',
      'Entity Framework Core', 'xUnit', 'PyTest', 'Jest', 'Cypress', 'CI/CD',
    ],
    languages: ['C#', 'Python', 'TypeScript', 'SQL'],
  },
  {
    id: 'getlect',
    role: 'Full-Stack Java Developer',
    company: 'GetLect',
    period: 'May 2022 – Apr 2023',
    start: '2022-05-01',
    end: '2023-04-30',
    location: 'Remote',
    summary:
      'Recruitment and course-delivery platform — took a monolith apart, put it on AWS, and made the front end match the Figma.',
    bullets: [
      {
        text: 'Spring Boot REST APIs for authentication (JWT + Spring Security), content delivery and course management with paginated, DTO-based endpoints.',
        metric: '−30% page load',
      },
      {
        text: 'Refactored the monolith into 8 microservices (auth, content, user management) behind Nginx load balancers with health checks and rate limiting.',
        metric: '+40% deploy efficiency · 99.9% availability',
      },
      {
        text: 'Migrated on-prem workloads to AWS EC2 + S3 with automated backup and recovery; Redis caching for hot course metadata and session data.',
        metric: '−50% recovery time · −30% DB load',
      },
      {
        text: '25+ reusable React + TypeScript components implemented from Figma designs; MySQL composite indexing and query tuning.',
        metric: '−40% response time',
      },
    ],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'MySQL', 'Redis', 'Nginx', 'AWS EC2/S3', 'React', 'TypeScript'],
    languages: ['Java', 'TypeScript', 'SQL'],
  },
  {
    id: 'cureya',
    role: 'Front-End Developer (Intern)',
    company: 'Cureya',
    period: 'Aug 2021 – Sep 2021',
    start: '2021-08-01',
    end: '2021-09-30',
    location: 'Remote',
    summary: 'Multi-screen, keyboard-accessible React UI shipped from Figma wireframes with unit tests.',
    bullets: [
      { text: 'Figma wireframes aligned scope before build; unit tests shortened debugging cycles.', metric: '20% faster delivery' },
    ],
    stack: ['React', 'Figma', 'Jest'],
    languages: ['TypeScript'],
  },
]
