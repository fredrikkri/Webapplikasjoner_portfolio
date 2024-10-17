import { Project } from "../features/types/Project";
import { format } from "date-fns"

export default function ProjectCard({projectTitle, description, githubLink, liveDemoLink, imgUrl, createdAt, status, isPublic}: Project) {
    return (
        <li className="card">
            <article>
                <h3>{projectTitle}</h3>
                <p>{format(createdAt, "dd/MM/yyyy")}</p>
                <a href={githubLink}>Link to Github</a>
                <br />
                <a href={liveDemoLink}>Live Demo</a>
                <p>{description}</p>
                <p>Project status: {status}</p>
                <p>Public: {isPublic}</p>
            </article>
            <figure>
                <img src={imgUrl} alt="ImageURL" />
            </figure>
        </li>
    );
  }