import React, { useEffect } from "react";
import "./Experiences.css";
import '../../../src/style.css';
import Particle from "../Particle";

const ExperienceTimeline = () => {
  useEffect(() => {
    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.3 }
    );

    timelineItems.forEach((item) => observer.observe(item));

    return () => {
      timelineItems.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <div className="timeline-container">
      <Particle />
        <div className="experiences-heading" style={{marginBottom: '40px'}}>
            <h2>My <span className="purple">Experiences</span></h2>
        </div>
      <div className="timeline-line"></div>

      <div className="timeline-item left">
        <div className="circle"></div>
          <div className="content-box">
            <h3 className="title"><b>Graduate Assistant - Full Stack Developer</b></h3>
            <p className="subtitle"><span>University of Illinois Chicago</span> <span>August 2023 – Preset</span></p>
            <ul className="description">
              <li>
              • Developed scalable RESTful APIs integrated with responsive interfaces, ensuring secure JSON transmission, 99.9% 
              uptime, and seamless handling of over 250K monthly requests to enhance functionality and user experience. 
              </li>
              <li>
              • Resolved 200+ JIRA tickets, addressing diverse website issues while working within an Agile Scrum framework to 
                ensure smooth project execution and continuous improvement.  
              </li>
              <li>
              • Collaborated with the accessibility team to implement WCAG-compliant improvements, expanding usability for 
                diverse users and increasing accessibility scores by 20%.
              </li>
              <li>
              • Automated data processing with ETL scripts, reducing manual effort by 30% and improving operational efficiency.
              </li>
            </ul>
          </div>
      </div>
      

      <div className="timeline-item right">
        <div className="circle"></div>
        <div className="content-box">
          <h3 className="title">Full Stack Developer Intern</h3>
          <p className="subtitle">
            <span>University of Illinois Chicago</span> <span>May 2024 - August 2024</span>
          </p>
          <ul className="description">
            <li>
            • Spearheaded the development of U-PASS+ with CTA and Metra, a transit enrollment platform for 10,000+ 
              students, demonstrating leadership and teamwork while generating over $3M in funding. 
            </li>
            <li>
            • Transitioned the authentication system from cookie-based to Azure AD token-based using react’s MSAL.js library, 
              increased security by 40%, and reduced login issues by 30%.  
            </li>
            <li>
            • Implemented SQL migrations to enable zero-downtime database updates across three different environments. 
            </li>
            <li>
            • Developed and executed C# integrated tests to validate key functionalities and reduce production bugs.  
            </li>
          </ul>
        </div>
      </div>

      <div className="timeline-item left">
        <div className="circle"></div>
        <div className="content-box">
          <h3 className="title">Web Developer</h3>
          <p className="subtitle">
            <span>GetLect</span> <span>May 2022 - October 2022</span>
          </p>
          <ul className="description">
            <li>
            • Improved user experience by actively participating in the design of a more intuitive user interface, utilizing Figma to create 
            wireframes, which resulted in a 15% increase in user engagement.  
            </li>
            <li>
            • Engineered high-scalable PHP code for the website's backend, reducing code smells by 20% through systematic refactoring, 
            enhancing code maintainability. 
            </li>
            <li>
            • Led the successful migration of the website from cPanel to AWS, resulting in a 30% improvement in page load times and 
            overall performance metrics.  
            </li>
            <li>
            • Dockerized backend services, ensuring consistent deployments and reducing environment-specific issues by 50%.  
            </li>
          </ul>
        </div>
      </div>
      <div className="timeline-item right">
        <div className="circle"></div>
        <div className="content-box">
          <h3 className="title">Front-End Developer</h3>
          <p className="subtitle">
            <span>Cureya</span> <span>August 2021 - September 2021</span>
          </p>
          <ul className="description">
            <li>
            • Created comprehensive wireframes for the company's website using Figma, streamlining the design process and achieving a 20% reduction in development time. 
            </li>
            <li>
            • Developed a web application with multiple screens and implemented rigorous unit-test cases using HTML, CSS, and React.js, ensuring a 15% increase in code reliability and faster debugging. 
            </li>
            <li>
            • Assisted in making the application compatible with all browsers and Keyboard Accessible.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
