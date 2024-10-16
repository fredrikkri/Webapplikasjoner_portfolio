import { Project } from "../types/Project";

export default function ProjectCard({projectTitle, description, githubLink, liveDemoLink, imgUrl, createdAt}: Project) {
    return (
        <li className="card">
            <article>
                <h3>{projectTitle}</h3>
                <p>{createdAt.toString()}</p>
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