import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <b className="purple"> Bhavyashree Putta</b>, 
            a software engineer with an unrelenting curiosity and a passion for shaping the future of 
            technology. My journey is all about creating digital experiences that go beyond just solving 
            problems—they should inspire, engage, and make a real difference in people’s lives. 
            I love the balance of creativity and logic that comes with full-stack development, cloud computing, and AI, and 
            I am always eager to find new ways to make tech feel more human.
            <br />
            <br />
            Currently pursuing my <strong>Master’s</strong> in <strong>Computer Science</strong> at the 
            <strong> University of Illinois Chicago</strong>, I am constantly exploring how innovation can improve lives, pushing myself to learn, adapt, 
            and grow in the ever-evolving tech landscape.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
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
