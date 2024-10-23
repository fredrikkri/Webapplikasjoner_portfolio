import { Project } from "../features/types/types";
import { format } from "date-fns";
import useProjects from "../hooks/useProjects";
import { useState } from "react";

export default function ProjectCard({
  id,
  projectTitle,
  description,
  githubLink,
  liveDemoLink,
  imgUrl,
  createdAt,
  projectStatus,
  isPublic,
  userId,
  deleteProject
}: Project & { deleteProject: (id: string) => void }) {
  const useProjectsHook = useProjects();
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updatedProjectData, setUpdatedProjectData] = useState({
    projectTitle,
    description,
    githubLink,
    liveDemoLink,
    imgUrl,
    projectStatus,
    isPublic,
  });

  const handleDelete = () => {
    deleteProject(id);
  };
  const toggleUpdateForm = () => {
    setIsUpdateFormVisible((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    useProjectsHook.updateProjects(id, updatedProjectData);
    toggleUpdateForm();
  };

  return (
    <li className="card">
      <article>
        <h3>{projectTitle}</h3>
        <p>{format(new Date(createdAt), "dd/MM/yyyy")}</p>
        <p>userID: {userId}</p>
        <a href={githubLink}>Link to Github</a>
        <br />
        <a href={liveDemoLink}>Live Demo</a>
        <p>{description}</p>
        <p>Project status: {projectStatus}</p>
        <p>Public: {isPublic}</p>
        <button onClick={handleDelete}>Delete Project</button>
        <button onClick={toggleUpdateForm}>Update Project</button>
      </article>
      {isUpdateFormVisible && (
        <form onSubmit={handleUpdateSubmit}>
          <label>
            Project Title:
            <input
              type="text"
              name="projectTitle"
              value={updatedProjectData.projectTitle}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={updatedProjectData.description}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      )}

      <figure>
        <img src={imgUrl} alt="ImageURL" />
      </figure>
    </li>
  );
}