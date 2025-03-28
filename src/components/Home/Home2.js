import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/profile-photo.jpg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineMail, // Added import for mail icon
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              Passionate about building
              <i>
                <b className="purple"> Web Technologies </b> and leveraging {" "}
                <b className="purple">
                  AI </b> & <b className="purple">Blockchain &nbsp; 
                </b>
              </i>
              to solve real-world challenges.
              <br />
              <br />
              Experienced in developing with
              <i>
                <b className="purple"> Python, Javascript, C# and ASP.NET</b>{" "}
              </i>
              as well as modern frameworks like{" "}<i><b className="purple">React.js</b></i> and <i><b className="purple">Next.js</b></i>
              <br />
              <br />
              Dedicated to crafting <i><b className="purple">seamless, secure</b></i> and <i><b className="purple">scalable solutions</b></i> that drive user satisfaction and product impact.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid my-profile-photo" alt="myprofile" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Bhavyashreeputta"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/bhavyashree-putta-b120261b8/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="mailto:bhavyaputta13@gmail.com" 
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >     
                  <AiOutlineMail />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );  
}
export default Home2;
