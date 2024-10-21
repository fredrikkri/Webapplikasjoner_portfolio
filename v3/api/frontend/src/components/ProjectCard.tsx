import { Project } from "../features/types/types";
import { format } from "date-fns"
import useProjects from "../hooks/useProjects";


export default function ProjectCard({id, projectTitle, description, githubLink, liveDemoLink, imgUrl, createdAt, projectStatus, isPublic, userId}: Project) {
    const useProjectsHook = useProjects();
    return (
        <li className="card">
            <article>
                <h3>{projectTitle}</h3>
                <p>{format(createdAt, "dd/MM/yyyy")}</p>
                <p>userID: {userId}</p>
                <a href={githubLink}>Link to Github</a>
                <br />
                <a href={liveDemoLink}>Live Demo</a>
                <p>{description}</p>
                <p>Project status: {projectStatus}</p>
                <p>Public: {isPublic}</p>
                <button onClick={() => useProjectsHook.deleteProject(id)}>Delete Project</button>
            </article>
            <figure>
                <img src={imgUrl} alt="ImageURL" />
            </figure>
        </li>
    );
  }