import { useState, useEffect } from 'react';
import { type Project } from "../features/types/Project";
import { ENDPOINTS } from '../config';

export function useProjects() {
  const [projectData, setProjectData] = useState<Project[]>([]);

  const loadProjects = () => {
    fetch(ENDPOINTS.projects, {
      credentials: "include"
    })
      .then((response) => response.json())
      .then((data: Project[]) => {
        setProjectData(data);
      })
      .catch((error: Error) => {
        console.error("Error fetching data from the server:", error);
      });
  };

  useEffect(() => {
    loadProjects();
  }, [projectData]);

  return { projectData, loadProjects };
}

export default useProjects;