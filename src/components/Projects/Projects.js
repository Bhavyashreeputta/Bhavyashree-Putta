import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import valorant from "../../Assets/Projects/valorant-Picsart.png";
import receiptaurant from "../../Assets/Projects/receiptaurant.png";
import sentimentPulse from "../../Assets/Projects/Sentimentpulse.png";
import uxresearch from "../../Assets/Projects/uxresearch.png";
import counterfeit from "../../Assets/Projects/Counterfeit.png";
import uihealth from "../../Assets/Projects/uihealth.png";
import events from "../../Assets/Projects/event-management.png";

function Projects() {
  return (
    <Container fluid className="project-section" id="projects">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Projects</strong>
        </h1>
        <p style={{ color: "white" }}>
          Each card shows the skills, the problem, how I implemented it, and what the solution delivers.
        </p>

        <Row style={{ justifyContent: "center" }}>
          <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={valorant}
              imgAlt="Valorant Esports Manager dashboard"
              title="Valorant Esports Manager (Hackathon)"
              tagline="AI scouting for 119K+ matches."
              skills={[
                "Amazon Bedrock (Claude 3 Haiku)",
                "Pinecone",
                "FastAPI",
                "React",
                "Riot API",
                "Python",
                "SQLAlchemy",
                "Redis",
                "Docker",
              ]}
              problem="Scouting across 119K+ matches is noisy and slow; no unified view of player fit."
              implementation={[
                "Parallel Riot API ingestion → 1,536-D player embeddings in Pinecone.",
                "FastAPI aggregation endpoints; Bedrock LLM generates lineup suggestions + rationale.",
                "React dashboards for comparisons, trends, and search.",
              ]}
              solution={[
                "Real-time player insights and lineup fit.",
                "High-throughput lookups via vector search + cached hot paths.",
              ]}
              ghLink="https://github.com/mananjen/esportsManagerChallenge"
            />
          </Col>

          <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={receiptaurant}
              imgAlt="Receiptaurant UI"
              title="Receiptaurant"
              tagline="LLM-assisted surcharge analytics."
              skills={[
                "Google AI Studio",
                "React",
                "Node.js",
                "AWS RDS (MySQL)",
                "Maps API",
                "Caching",
              ]}
              problem="Hidden surcharges on receipts are hard to audit at scale."
              implementation={[
                "LLM parsing of uploaded bills; normalized MySQL schema (receipts, line_items, surcharges).",
                "Geospatial queries with indexed lat/long; React charts + map overlays.",
                "Node.js API with caching for sub-second repeated lookups.",
              ]}
              solution={[
                "Searchable surcharge patterns & city hotspots in seconds.",
                "Faster investigations; reduced manual review time.",
              ]}
              ghLink="https://github.com/h0901/receiptaurant"
            />
          </Col>

          <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={sentimentPulse}
              imgAlt="SentimentPulse charts"
              title="SentimentPulse"
              tagline="Fine-tuned BERT for election tweets."
              skills={["Python", "BERT (fine-tuned)", "Sklearn", "Pandas", "NLP"]}
              problem="Noisy signals (slang/emojis) reduce sentiment classification accuracy."
              implementation={[
                "Preprocessing handles slang/emoji; class balancing and noise removal.",
                "Fine-tuned BERT; benchmarked against classical ML baselines.",
              ]}
              solution={[
                "~67% accuracy / 67% F1; reproducible evaluation pipeline.",
                "Cleaner datasets for better downstream analysis.",
              ]}
              ghLink="https://github.com/mananjen/CS583/tree/main/Mini%20Research%20Project"
            />
          </Col>

          <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={uxresearch}
              imgAlt="Apple Watch UX research visuals"
              title="Apple Watch — UX Research"
              tagline="Trust as a driver of fitness adherence."
              skills={["HCI", "Survey + Interview", "Thematic Analysis", "Statistics"]}
              problem="Unclear how wearables influence motivation and sustained health behavior."
              implementation={[
                "Mixed-methods with 30 participants: surveys + interviews.",
                "Thematic analysis to identify adoption and trust drivers.",
              ]}
              solution={[
                "Trust + perceived usefulness correlate with adherence.",
                "Actionable principles for future health-tech UX.",
              ]}
              ghLink="https://github.com/Bhavyashreeputta/UX-Research-Empowering-Health-and-Fitness"
            />
          </Col>

          <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={counterfeit}
              imgAlt="Counterfeit medicine tracking"
              title="Counterfeit Medicine Authentication"
              tagline="Blockchain + IoT for integrity."
              skills={[
                "Hyperledger",
                "Smart Contracts",
                "MetaMask",
                "IoT (DHT11)",
                "ThingSpeak",
                "Cloud",
              ]}
              problem="Counterfeits threaten patient safety; supply chains need verifiable authenticity."
              implementation={[
                "Hyperledger smart contracts for immutable provenance.",
                "MetaMask-secured transactions; sensors stream temperature to cloud.",
              ]}
              solution={[
                "Tamper-evident tracking + live condition monitoring.",
                "Stronger supply-chain trust and safety.",
              ]}
              ghLink="https://github.com/Bhavyashreeputta/Counterfeit-Medicine-Authentication-System"
            />
          </Col>

          <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={uihealth}
              imgAlt="UI Health vaccine registration UI"
              title="UI Health — Vaccine Registration"
              tagline="Clear modules for each role."
              skills={["PHP", "MySQL", "HTML/CSS/JS", "Modular Workflows"]}
              problem="Registration was fragmented across patients, nurses, and admins."
              implementation={[
                "Unified app with role-based workflows and validations.",
                "Reliable MySQL persistence; simplified forms and flows.",
              ]}
              solution={[
                "40% increase in registrations.",
                "Fewer failed/duplicate submissions; better UX.",
              ]}
              ghLink="https://github.com/Bhavyashreeputta/UI-Health"
            />
          </Col>

          <Col md={6} lg={4} className="project-card">
            <ProjectCard
              imgPath={events}
              imgAlt="Event management screenshots"
              title="Event Management System"
              tagline="Centralized planning with vendors."
              skills={["PHP", "MySQL", "HTML/CSS/JS"]}
              problem="Planning scattered across vendors and channels."
              implementation={[
                "Central vendor discovery and guided booking flows.",
                "Server-side persistence and status dashboards.",
              ]}
              solution={[
                "Higher engagement and quicker planning cycles.",
                "Improved weekly booking throughput.",
              ]}
              ghLink="https://github.com/Bhavyashreeputta/online_event_management"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
