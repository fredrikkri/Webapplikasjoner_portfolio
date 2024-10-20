import { useState, useEffect } from 'react';
import { Project } from '../features/types/types';
import { BASE_URL, ENDPOINTS } from "../config/config";

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

  const deleteProject = async (id: String) => {    
    try {
        const response = await fetch(`${ENDPOINTS.projects}/${id}`, {
          method: 'DELETE',
        });
    
        if (!response.ok) {
          console.error("Error deleting the project:", response.statusText);
          console.log(`${BASE_URL}/${id}`)
          return;
        }
        setProjectData((prevProjects) => 
          prevProjects.filter((project) => project.id !== id)
        );
        console.log(`Project with id: ${id} \n was deleted`);
        // Her kan du oppdatere prosjektlisten lokalt om nødvendig
      } catch (error) {
        console.error("Error while deleting the project:", error);
      }
    };

  useEffect(() => {
    loadProjects();
  }, [projectData]);

  return { projectData, loadProjects, deleteProject };
}

export default useProjects;