import { Project } from "../types/Project";

export default function ProjectCard({projectTitle, description, githubLink, liveDemoLink, imgUrl}: Project) {
    return (
        <li className="card">
            <article>
                <h3>{projectTitle}</h3>
                <a href={githubLink}>Link to Github</a>
                <br />
                <a href={liveDemoLink}>Live Demo</a>
                <p>{description}</p>
            </article>
            <figure>
                <img src={imgUrl} alt="ImageURL" />
            </figure>
        </li>
    );
  }