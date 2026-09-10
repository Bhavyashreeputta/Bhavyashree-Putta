import img_0 from '../media/projects/Counterfeit.jpg'
import img_1 from '../media/projects/Sentimentpulse.jpg'
import img_2 from '../media/projects/receiptaurant.jpg'
import img_3 from '../media/projects/uihealth.jpg'
import img_4 from '../media/projects/uxresearch.jpg'
import img_5 from '../media/projects/valorant-Picsart.jpg'

export type Project = {
  id: string
  file: string // filename shown in the explorer, extension = primary language
  name: string
  tagline: string
  category: 'systems' | 'ai' | 'fullstack' | 'data' | 'research'
  featured?: boolean
  year: string
  problem: string
  approach: string[]
  outcome: string[]
  stack: string[]
  github?: string
  demo?: string
  image?: string
  snippet?: { lang: string; code: string }
  publication?: { title: string; venue: string }
}

export const projects: Project[] = [
  {
    id: 'raft',
    file: 'raft-replication.cpp',
    name: 'Distributed Replication & Consistency Simulator',
    tagline: 'A Raft-based replicated key-value store, plus the fault-injection harness that broke it until it stopped breaking.',
    category: 'systems',
    featured: true,
    year: '2025',
    problem:
      'Most "distributed systems" experience is calling a managed service. I wanted to own the hard part: leader election, log replication and membership changes that stay linearizable while nodes crash and the network lies.',
    approach: [
      'Implemented Raft in C++ over gRPC: randomized election timeouts, AppendEntries with log matching, commit index advancement, and joint-consensus membership changes across a 5-node cluster.',
      'Linearizable reads via leader lease + read-index; writes acknowledged only after majority replication.',
      'Python fault-injection framework drives partitions, message delay/reordering and node kills against the live cluster under concurrent client workloads, asserting invariants after every scenario.',
    ],
    outcome: [
      'Found and fixed a split-brain during leader re-election (stale term accepted after partition heal) — recovery now converges within one election timeout.',
      'Linearizability held across every generated scenario; the harness is reusable against any gRPC-based cluster.',
    ],
    stack: ['C++17', 'gRPC', 'Protobuf', 'Python', 'asyncio', 'CMake'],
    snippet: {
      lang: 'cpp',
      code: `// AppendEntries handler — the log-matching property in ~20 lines
AppendReply Node::AppendEntries(const AppendArgs& a) {
  std::lock_guard<std::mutex> g(mu_);
  if (a.term < term_) return {term_, false};        // stale leader
  becomeFollower(a.term);                           // step down if needed
  resetElectionTimer();
  if (a.prev_index > 0 &&
      (log_.size() <= a.prev_index ||
       log_[a.prev_index].term != a.prev_term))
    return {term_, false};                          // log mismatch → retry lower
  log_.resize(a.prev_index + 1);                    // truncate conflicting suffix
  for (auto& e : a.entries) log_.push_back(e);
  if (a.leader_commit > commit_)
    commit_ = std::min<uint64_t>(a.leader_commit, log_.size() - 1);
  applyCommitted();
  return {term_, true};
}`,
    },
  },
  {
    id: 'valorant',
    file: 'valorant-scout.py',
    name: 'Valorant Esports Manager',
    tagline: 'LLM-powered scouting assistant over 119K professional matches — semantic search, lineup fit, recruiting rationale.',
    category: 'ai',
    featured: true,
    year: '2024',
    problem:
      'Esports scouts drown in match data. Comparing players across 119,000+ pro matches by hand is slow, and dashboards alone can\'t answer "who fits this lineup and why?".',
    approach: [
      'Parallelized Riot API ingestion pipeline (asyncio + worker pool) normalizing matches into per-player performance vectors.',
      '1,536-dimensional player embeddings indexed in Pinecone; FastAPI aggregation endpoints serve semantic search and comparisons with Redis-cached hot paths.',
      'Amazon Bedrock (Claude 3 Haiku) generates lineup suggestions and recruiting rationale grounded in retrieved stats — retrieval first, generation second.',
    ],
    outcome: [
      'Real-time natural-language scouting across the full professional dataset with low-latency vector retrieval.',
      'Built for the VCT Hackathon; React dashboards for player comparison, trends and search.',
    ],
    stack: ['Python', 'FastAPI', 'Amazon Bedrock', 'Pinecone', 'Redis', 'SQLAlchemy', 'React', 'Docker', 'Riot API'],
    github: 'https://github.com/mananjen/esportsManagerChallenge',
    image: img_5,
    snippet: {
      lang: 'python',
      code: `async def scout(query: str, k: int = 8) -> ScoutReport:
    q_vec = await embed(query)                       # 1536-d
    hits = index.query(vector=q_vec, top_k=k,
                       include_metadata=True)
    ctx = "\\n".join(fmt_player(h.metadata) for h in hits.matches)
    prompt = SCOUT_PROMPT.format(question=query, context=ctx)
    answer = await bedrock.invoke("anthropic.claude-3-haiku", prompt)
    return ScoutReport(players=[h.id for h in hits.matches],
                       rationale=answer, grounded=True)`,
    },
  },
  {
    id: 'clearqueue',
    file: 'clearqueue.tsx',
    name: 'ClearQueue',
    tagline: 'Real-time waitlist with WebSocket sync, Lambda-computed ETAs and Grafana eyes on every connection.',
    category: 'fullstack',
    featured: true,
    year: '2025',
    problem:
      'Waitlists lie: stale positions, guessed wait times, and users who give up because nothing on screen changes.',
    approach: [
      'Next.js + TypeScript client keeps queue state live over WebSockets; DynamoDB is the single source of truth synced across every device in the queue.',
      'AWS Lambda recomputes ETAs from throughput history on each state change instead of a fixed per-person estimate.',
      'Prometheus exporters + Grafana dashboards track connection health, ETA accuracy and queue throughput so real-time failures are visible before users report them.',
    ],
    outcome: ['−60% task drop-offs', 'Observable in production: every reconnect, every ETA miss, on a dashboard.'],
    stack: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'WebSockets', 'AWS Lambda', 'DynamoDB', 'Prometheus', 'Grafana'],
  },
  {
    id: 'dropstream',
    file: 'DropStream.java',
    name: 'DropStream',
    tagline: 'Event-driven music release system — Kafka fan-out, Redis-cached subscriptions, idempotent consumers.',
    category: 'systems',
    featured: true,
    year: '2025',
    problem:
      'A release drop is a thundering herd: one event, thousands of fans, and at-least-once delivery that will happily notify everyone twice.',
    approach: [
      'Spring Boot producers publish release events to Kafka; consumer groups fan out into notification and engagement workflows asynchronously.',
      'Subscription lookups cached in Redis to keep the hot path off PostgreSQL.',
      'Idempotent consumer logic keyed on (eventId, subscriberId) with retries and a dead-letter topic — duplicates and failed deliveries never become duplicate notifications.',
    ],
    outcome: ['Exactly-once *effects* on top of at-least-once delivery.', 'Horizontal scale by adding consumers, not code.'],
    stack: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'PostgreSQL', 'Docker'],
    snippet: {
      lang: 'java',
      code: `@KafkaListener(topics = "releases", groupId = "notify")
public void onRelease(ReleaseEvent ev, Acknowledgment ack) {
    String key = ev.id() + ":" + ev.subscriberId();
    // SET NX — first writer wins, duplicates short-circuit
    Boolean fresh = redis.opsForValue()
        .setIfAbsent("seen:" + key, "1", Duration.ofDays(7));
    if (Boolean.FALSE.equals(fresh)) { ack.acknowledge(); return; }
    try {
        notifier.send(ev);
        ack.acknowledge();
    } catch (TransientException e) {
        redis.delete("seen:" + key);   // release the claim, let retry happen
        throw e;                       // → backoff, then DLT after N attempts
    }
}`,
    },
  },
  {
    id: 'tcp-proxy',
    file: 'tcp-proxy.cpp',
    name: 'Load-Aware TCP Proxy with Backpressure',
    tagline: 'A multithreaded C++ proxy that routes on live backend load and says "not now" before it falls over.',
    category: 'systems',
    year: '2024',
    problem:
      'Round-robin doesn\'t know a backend is drowning. Unbounded queues turn a slow backend into a dead proxy.',
    approach: [
      'POSIX sockets + epoll event loop with a worker thread pool; connection-level metrics (in-flight, RTT) pick the least-loaded backend per request.',
      'Backpressure through connection limits and queue thresholds — new work is rejected or delayed with timeouts and bounded retries instead of piling up.',
    ],
    outcome: ['Stable throughput under concurrent load tests; errors under overload became explicit and fast instead of silent and slow.'],
    stack: ['C++', 'Linux', 'POSIX sockets', 'epoll', 'Multithreading', 'TCP/IP'],
  },
  {
    id: 'inventory',
    file: 'inventory-intel.sql',
    name: 'Inventory Intelligence Platform',
    tagline: 'ABC-XYZ classification engine with automated reorder alerts, served through FastAPI and Power BI.',
    category: 'data',
    year: '2024',
    problem: 'Which SKUs matter, which are volatile, and which need reordering *now* — across 14 categories of sales, production and warehouse data.',
    approach: [
      'Normalized relational schema in PostgreSQL with optimized SQL pipelines validating simulated sales/production/warehouse feeds.',
      'ABC-XYZ classification engine and reorder-threshold detection built on indexed queries and materialized views; exposed via FastAPI.',
      'Power BI dashboards (DAX) surface the results to non-engineers.',
    ],
    outcome: ['67K+ reorder alerts surfaced; aggregation latency cut through materialized views.'],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Power BI', 'DAX', 'Docker'],
  },
  {
    id: 'receiptaurant',
    file: 'receiptaurant.js',
    name: 'Receiptaurant',
    tagline: 'LLM-parsed receipts → a searchable map of hidden restaurant surcharges.',
    category: 'ai',
    year: '2024',
    problem: 'Hidden surcharges on receipts are impossible to audit at scale by hand.',
    approach: [
      'Google AI Studio parses uploaded bills into a normalized MySQL schema (receipts, line_items, surcharges) on AWS RDS.',
      'Geospatial queries on indexed lat/long feed React charts and map overlays; Node.js API caches repeated lookups.',
    ],
    outcome: ['Surcharge patterns and city hotspots searchable in seconds.'],
    stack: ['React', 'Node.js', 'MySQL', 'AWS RDS', 'Google AI Studio', 'Maps API'],
    github: 'https://github.com/h0901/receiptaurant',
    image: img_2,
  },
  {
    id: 'sentimentpulse',
    file: 'sentimentpulse.ipynb',
    name: 'SentimentPulse',
    tagline: 'Fine-tuned BERT for election tweets, benchmarked against classical baselines.',
    category: 'ai',
    year: '2024',
    problem: 'Slang, emoji and sarcasm wreck off-the-shelf sentiment classifiers on political tweets.',
    approach: [
      'Preprocessing pipeline for slang/emoji normalization, class balancing and noise removal.',
      'Fine-tuned BERT; reproducible evaluation against scikit-learn baselines.',
    ],
    outcome: ['~67% accuracy / F1 on a hard, noisy dataset with a fully reproducible pipeline.'],
    stack: ['Python', 'PyTorch', 'BERT', 'scikit-learn', 'Pandas'],
    github: 'https://github.com/mananjen/CS583/tree/main/Mini%20Research%20Project',
    image: img_1,
  },
  {
    id: 'counterfeit',
    file: 'counterfeit-auth.sol',
    name: 'Counterfeit Medicine Authentication',
    tagline: 'Blockchain provenance + IoT cold-chain monitoring. Published at INCET 2023.',
    category: 'research',
    year: '2023',
    problem: 'Counterfeit medicines enter supply chains that have no verifiable, tamper-evident history.',
    approach: [
      'Hyperledger smart contracts record immutable provenance; MetaMask-secured transactions at each handoff.',
      'DHT11 sensors stream temperature to ThingSpeak so condition violations are logged alongside custody.',
    ],
    outcome: ['Tamper-evident tracking with live condition monitoring.'],
    stack: ['Hyperledger', 'Solidity', 'MetaMask', 'IoT (DHT11)', 'ThingSpeak'],
    github: 'https://github.com/Bhavyashreeputta/Counterfeit-Medicine-Authentication-System',
    image: img_0,
    publication: {
      title: 'An Effective Counterfeit Medicine Authentication System Using Blockchain Technology and IoT to Prevent Hazards to Human Life',
      venue: '4th International Conference on Emerging Technology (INCET 2023)',
    },
  },
  {
    id: 'uihealth',
    file: 'uihealth-vaccine.php',
    name: 'UI Health — Vaccine Registration',
    tagline: 'Role-based registration for patients, nurses and admins.',
    category: 'fullstack',
    year: '2023',
    problem: 'Registration was fragmented across three roles with duplicate and failed submissions.',
    approach: ['Unified PHP + MySQL app with role-based workflows and server-side validation.'],
    outcome: ['+40% registrations; fewer failed/duplicate submissions.'],
    stack: ['PHP', 'MySQL', 'JavaScript'],
    github: 'https://github.com/Bhavyashreeputta/UI-Health',
    image: img_3,
  },
  {
    id: 'ux-research',
    file: 'wearables-ux.md',
    name: 'Apple Watch — UX Research',
    tagline: 'Mixed-methods study: trust as a driver of fitness adherence.',
    category: 'research',
    year: '2024',
    problem: 'How do wearables actually influence sustained health behavior?',
    approach: ['30-participant surveys + interviews; thematic analysis of adoption and trust drivers.'],
    outcome: ['Trust and perceived usefulness correlate with adherence — actionable principles for health-tech UX.'],
    stack: ['HCI', 'Thematic analysis', 'Statistics'],
    github: 'https://github.com/Bhavyashreeputta/UX-Research-Empowering-Health-and-Fitness',
    image: img_4,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
