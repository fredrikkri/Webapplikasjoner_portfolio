import ProjectCard from "./ProjectCard";
import useProjects from "../hooks/useProjects";

export default function MyProjects() {
  const { projectData, deleteProject} = useProjects();

  if (!Array.isArray(projectData)) {
    return <></>;
  }

  return (
    <section id="my-projects">
      <hr />
      <h2>My projects</h2>
      <ul id="list-cards">
        {projectData.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            projectTitle={project.projectTitle}
            description={project.description}
            githubLink={project.githubLink}
            liveDemoLink={project.liveDemoLink}
            imgUrl={project.imgUrl}
            createdAt={project.createdAt}
            projectStatus={project.projectStatus}
            isPublic={project.isPublic}
            userId={project.userId}
            deleteProject={deleteProject}
          />
        ))}
      </ul>
    </section>
  );
}