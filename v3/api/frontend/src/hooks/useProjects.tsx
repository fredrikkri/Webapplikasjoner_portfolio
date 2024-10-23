import { useState, useCallback } from "react";
import { Project } from "../features/types/types";
import { ENDPOINTS } from "../config/config";
import { useEffectOnce } from "./useEffectOnce";

export function useProjects() {
  const [projectData, setProjectData] = useState<Project[]>([]);

  const loadProjects = useCallback(async () => {
    try {
      const response = await fetch(ENDPOINTS.projects, {
        credentials: "include",
      });
      const data = await response.json();
      console.log("Data fetched:", data.data);
      setProjectData(data.data);
      console.log("Project data set:", data.data);
    } catch (error) {
      console.error("Error fetching data from the server:", error);
    }
  }, []);

  useEffectOnce(loadProjects);

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`${ENDPOINTS.projects}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Error deleting the project:", response.statusText);
        return;
      }

      console.log(`Project with id: ${id} was deleted`);
      setProjectData((prevData) =>
        prevData.filter((project) => project.id !== id)
      );

      await loadProjects();
    } catch (error) {
      console.error("Error while deleting the project:", error);
    }
  };

  const updateProjects = async (id: string, updatedData: unknown) => {
    const response = await fetch(`${ENDPOINTS.update}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      console.log("Project updated successfully");
      await loadProjects();
    } else {
      console.error("Failed to update project");
    }
  };

  return { projectData, loadProjects, deleteProject, updateProjects };
}

export default useProjects;