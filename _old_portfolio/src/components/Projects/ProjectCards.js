import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsGithub } from "react-icons/bs";

function ProjectCards({
  imgPath,
  imgAlt = "project preview",
  title,
  skills = [],
  problem,
  implementation = [],
  solution = [],
  ghLink,
  demoLink,
}) {
  return (
    <Card as="article" className="project-card-view proj-card" aria-label={title}>
      <figure className="proj-figure">
        <Card.Img
          variant="top"
          src={imgPath}
          alt={imgAlt}
          className="proj-img"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <Card.Body>
        <Card.Title as="h3" className="proj-title"><b>{title}</b></Card.Title>

        {skills.length > 0 && (
          <ul className="proj-chips" aria-label="Skills">
            {skills.map((s) => (
              <li className="proj-chip" key={s}>{s}</li>
            ))}
          </ul>
        )}

        {problem && (
          <div className="projX-block">
            <h6 className="proj-kicker">Problem</h6>
            <p className="proj-line" style={{ margin: 0 }}>{problem}</p>
          </div>
        )}

        {implementation.length > 0 && (
          <div className="projX-block">
            <h6 className="proj-kicker" style={{margin: "18px"}}>Implementation</h6>
            <ul className="projX-list">
              {implementation.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
        )}

        {solution.length > 0 && (
          <div className="projX-block">
            <h6 className="proj-kicker">Solution</h6>
            <ul className="projX-list">
              {solution.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </div>
        )}

        <div className="projX-actions">
          {ghLink && (
            <Button
              variant="primary"
              href={ghLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open GitHub for ${title}`}
            >
              <BsGithub /> &nbsp; GitHub
            </Button>
          )}
          {demoLink && (
            <Button
              variant="outline-light"
              href={demoLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open live demo for ${title}`}
              style={{ marginLeft: 10 }}
            >
              Live Demo
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
