import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import counterfeit from "../../Assets/Projects/Counterfeit.png";
import events from "../../Assets/Projects/event-management.png";
import uxresearch from "../../Assets/Projects/uxresearch.png";
import receiptaurant from "../../Assets/Projects/receiptaurant.png";
import uihealth from "../../Assets/Projects/uihealth.png";
import sentimentPulse from "../../Assets/Projects/Sentimentpulse.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={receiptaurant}
              isBlog={false}
              title="Receiptaurant"
              description="Receiptaurant is an AI-powered web app that extracts restaurant surcharge details 
              from uploaded bills using Google AI Studio’s LLM. It features a React-based UI with real-time data 
              visualization and a Google Maps-powered interface, while a Node.js backend stores data in an AWS-hosted 
              MySQL database for seamless analysis. Optimized with caching strategies, it ensures fast and efficient 
              data retrieval for users."
              ghLink="https://github.com/h0901/receiptaurant"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={sentimentPulse}
              isBlog={false}
              title="SentimentPulse"
              description="SentimentPulse is a Python-based sentiment analysis system for election-related tweets, using a 
              fine-tuned BERT model that outperforms traditional ML with 67.39% accuracy and a 67.06% F1-score. 
              It features a robust text preprocessing pipeline to handle slang, emojis, and misspellings, improving data quality. 
              Leveraging NLP and deep learning, SentimentPulse uncovers public sentiment trends on social and political topics."
              ghLink="https://github.com/mananjen/CS583/tree/main/Mini%20Research%20Project"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={uxresearch}
              isBlog={false}
              title="Apple Watch - UX Research"
              description="Apple Watch & Young Adults is a UX research project examining the impact of wearables on health behavior. 
              Conducted with 30 participants, it used surveys, interviews, and thematic analysis to assess behavior changes. 
              Statistical analysis and qualitative research identified trust as a key factor in fitness adoption. The insights 
              influenced future design considerations for wearable technology in health management."
              ghLink="https://github.com/Bhavyashreeputta/UX-Research-Empowering-Health-and-Fitness"            
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={counterfeit}
              isBlog={false}
              title="Counterfeit Medicine Authentication System"
              description="A secure pharmaceutical tracking solution built with Hyperledger, smart contracts, and IoT. 
              It enables immutable tracking of medications to prevent counterfeiting, while MetaMask ensures secure 
              transaction management for real-time authenticity verification. The system also integrates a DHT11 
              temperature sensor to monitor environmental conditions, sending data to the cloud via ThingSpeak to 
              maintain product integrity across the supply chain."
              ghLink="https://github.com/Bhavyashreeputta/Counterfeit-Medicine-Authentication-System"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={uihealth}
              isBlog={false}
              title="UI Health : Vaccine Registration System"
              description="User friendly system that simplifies the vaccine registration process for patients, nurses, and admins. 
              Built with HTML, CSS, JavaScript for the front end and PHP for the back end, it includes registration modules for Pfizer, Moderna, 
              and COVID vaccines. The system resulted in a 40% increase in vaccine registrations and received positive user feedback. 
              Using a MySQL database, it efficiently manages data for seamless vaccine administration."
              ghLink="https://github.com/Bhavyashreeputta/UI-Health"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={events}
              isBlog={false}
              title="Event Management System"
              description="A comprehensive platform designed to streamline event planning, boosting user engagement by 30%. 
              Built with HTML, CSS, JavaScript, and PHP, it integrates services like catering, photography, and venue sourcing, 
              increasing service selections by 25%. With a MySQL database, it manages bookings efficiently, achieving a 4.8/5 user 
              satisfaction rating. The platform averages 25 bookings per week, improving the event planning experience."
              ghLink="https://github.com/Bhavyashreeputta/online_event_management"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
