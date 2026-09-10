import React, { useEffect, useMemo, useRef } from "react";
import { FiMapPin, FiExternalLink } from "react-icons/fi";
import Particle from "../Particle";
import "./Experiences.css";

const EXPERIENCES = [
  {
    role: "Research Software Engineer",
    company: "UIC College of Applied Health Sciences",
    period: "Jun 2025 – Present",
    start: "2025-06-01",
    end: null,
    location: "Chicago, IL",
    link: null,
    summary:
      "Google-funded RAG chatbot (Azure OpenAI + FAISS/Pinecone + WhatsApp); reliable/observable K8s services with Terraform & Helm.",
    impact: ["~1.2s median retrieval", "60% fewer failures", "50+ concurrent users"],
    highlights: [
      "Real-time escalation on WhatsApp with durable sessions via Cloudflare D1 + KV.",
      "Production hardening: health probes, centralized logging, golden-path runbooks.",
      "UX instrumentation to close the loop between retrieval quality and satisfaction.",
    ],
    tags: ["AI-Native", "FastAPI", "Kubernetes", "Terraform", "Twilio"],
  },
  {
    role: "Graduate Assistant — Full-Stack Developer",
    company: "University of Illinois Chicago",
    period: "Aug 2023 – May 2025",
    start: "2023-08-01",
    end: "2025-05-31",
    location: "Chicago, IL",
    link: null,
    summary:
      "Architected & scaled U-PASS+, serving 65K+ students with sub-120ms p99 and 99.95% uptime; accessible UIs + robust APIs.",
    impact: ["65K+ students", "p99 <120ms", "99.95% uptime"],
    highlights: [
      "Production-grade REST APIs in Python & C#; tests reduced escaped bugs ~35%.",
      "ACID transactions, migrations, indexing → zero-downtime releases.",
      "WCAG 2.1-AA rebuilds → ~35% faster pages on low-end devices.",
    ],
    tags: ["React", "FastAPI", ".NET", "SQL", "Accessibility"],
  },
  {
    role: "Web Developer",
    company: "GetLect",
    period: "May 2022 – Apr 2023",
    start: "2022-05-01",
    end: "2023-04-30",
    location: "Remote",
    link: null,
    summary:
      "Modular React UI from Figma; refactor monolith → Spring Boot services; AWS migration for perf & cost wins.",
    impact: ["30% fewer on-prem servers", "$8K/yr savings", "99.9% uptime"],
    highlights: [
      "25+ reusable components; ~30% fewer UI revision cycles.",
      "Nginx + health checks + rate limiting → consistent latency.",
    ],
    tags: ["React", "Spring Boot", "AWS", "Nginx"],
  },
  {
    role: "Front-End Developer",
    company: "Cureya",
    period: "Aug 2021 – Sep 2021",
    start: "2021-08-01",
    end: "2021-09-30",
    location: "Remote",
    link: null,
    summary:
      "Multi-screen React UI with accessibility; faster delivery with wireframes + unit tests.",
    impact: ["20% faster delivery", "Keyboard accessible"],
    highlights: [
      "Figma wireframes to align scope, reduce ambiguity.",
      "Unit tests for quicker debugging and higher reliability.",
    ],
    tags: ["React", "Testing", "Accessibility"],
  },
];

/** Group by year for sticky markers */
function groupByYear(items) {
  const groups = {};
  items.forEach((it) => {
    const year = new Date(it.start).getFullYear();
    groups[year] = groups[year] || [];
    groups[year].push(it);
  });
  // newest first
  return Object.entries(groups)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([year, arr]) => ({ year, items: arr }));
}

const ExperienceCard = ({ exp, align = "left" }) => {
  return (
    <article className={`xp-card ${align}`} tabIndex={0}>
      <header className="xp-header">
        <h3 className="xp-role">{exp.role}</h3>
        <div className="xp-meta text-center">
          <span className="xp-company">{exp.company}</span>
          <span className="xp-dot" aria-hidden>•</span>
          <span className="xp-period">{exp.period}</span>
        </div>
        <div className="xp-location">
          <FiMapPin aria-hidden /> {exp.location}
          {exp.link && (
            <a href={exp.link} className="xp-ext" target="_blank" rel="noreferrer" aria-label="Open link">
              <FiExternalLink />
            </a>
          )}
        </div>
      </header>

      <p className="xp-summary">{exp.summary}</p>

      <ul className="xp-impact" aria-label="Key outcomes">
        {exp.impact.map((chip) => (
          <li key={chip} className="chip">{chip}</li>
        ))}
      </ul>

      <ul className="xp-bullets">
        {exp.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>

      {exp.tags?.length ? (
        <ul className="xp-tags" aria-label="Tech & focus">
          {exp.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
      ) : null}
    </article>
  );
};

export default function Experiences() {
  const containerRef = useRef(null);
  const grouped = useMemo(() => groupByYear(EXPERIENCES), []);

  useEffect(() => {
    // reveal animation on enter
    const el = containerRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll(".xp-card"));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="xp-wrap" ref={containerRef} id="experiences" aria-label="Experience timeline">
      <Particle />

      <div className="xp-heading">
        <h2>My <span className="purple">Experience</span></h2>
        <p className="xp-sub">
          A craft-driven path building reliable, human-centered systems — from AI-native products to scalable cloud backends.
        </p>
      </div>

      <div className="xp-rail" aria-hidden />

      {/* Timeline with sticky year markers */}
      <div className="xp-timeline">
        {grouped.map(({ year, items }, groupIdx) => (
          <div className="xp-year-group" key={year}>
            <div className="xp-year" aria-label={`Year ${year}`}>{year}</div>

            <div className="xp-grid">
              {items.map((exp, i) => (
                <ExperienceCard
                  key={exp.role + exp.start}
                  exp={exp}
                  align={(groupIdx + i) % 2 ? "right" : "left"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
