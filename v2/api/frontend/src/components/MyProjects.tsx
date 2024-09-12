import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "../types/Project";


export default function MyProjects() {
  const [projectData, setProjectData] = useState<Project[]>([]);

  const loadProjects = () => {
    fetch("http://localhost:3999")
      .then((response) => response.json())
      .then((data: Project[]) => {
        setProjectData(data);
      })
      .catch((error: Error) => {
        console.error("Feil ved henting av data fra serveren:", error);
      });
  };

  useEffect(() => {
    loadProjects();
  }, [projectData]);

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