import ProjectCard from "./ProjectCard";
import useProjects from "../hooks/useProjects";


export default function MyProjects() {
    const { projectData } = useProjects();

    return (
        <section id="my-projects">
        <h2>My projects</h2>
        <ul id="list-cards">
        {projectData.map((project, index) => (
            <ProjectCard key={index} 
            id={project.id}
            projectTitle={project.projectTitle} 
            description={project.description}
            githubLink={project.githubLink}
            liveDemoLink={project.liveDemoLink}
            imgUrl={project.imgUrl}
            createdAt={project.createdAt}
            />
        ))}
        </ul>
    </section>
    );
  }