import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi there! I am <b className="purple">Bhavyashree Putta</b> — a{" "}
            <strong>Full-Stack Engineer</strong> who thrives at the intersection
            of design, data, and intelligence. I believe great engineering is
            equal parts logic and empathy, crafting systems that are not only
            scalable and reliable but also make technology feel <i>human</i>.
            <br />
            <br />
            I recently earned my <strong>Master’s in Computer Science</strong>{" "}
            from the <strong>University of Illinois Chicago</strong>, where I
            specialized in building <strong>AI-native, cloud-first systems</strong>
            that blend creativity with engineering precision. My work has ranged
            from developing distributed platforms that serve{" "}
            <strong>65K+ users</strong> to designing retrieval-augmented AI
            chatbots that bring information to life in real time.
            <br />
            <br />
            What drives me most is the challenge of turning ideas into seamless
            user experiences, whether that means building full-stack products
            end-to-end, optimizing APIs for performance, or exploring how
            language models can amplify human capability. I bring to every team
            a mindset of <strong>ownership, curiosity, and craftsmanship</strong>,
            and I love collaborating with people who care deeply about both the
            product and the process.
            <br />
            <br />
            Outside of work, I recharge by:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Volunteering
            </li>
            <li className="about-activity">
              <ImPointRight /> Cooking
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Build with intent, code with impact, and never stop innovating."{" "}
          </p>
          <footer className="blockquote-footer">Bhavyashree</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
