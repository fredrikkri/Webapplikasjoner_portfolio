import { Project } from "../features/types/types";
import { format } from "date-fns";
import useProjects from "../hooks/useProjects";
import { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaTrash, FaEdit } from "react-icons/fa";

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
        <figure>
          <img src={imgUrl} alt={projectTitle} className="card-image" />
        </figure>
        <div className="card-content">
          <h3 className="card-title">{projectTitle}</h3>
          <p className="card-date">{format(new Date(createdAt), "dd/MM/yyyy")}</p>
          <p className="card-description">{description}</p>
          <div className="card-links">
            <a href={githubLink} className="card-link">
              <FaGithub /> GitHub
            </a>
            <a href={liveDemoLink} className="card-link">
              <FaExternalLinkAlt /> Live Demo
            </a>
          </div>
          <p className="card-status">Prosjekt status: {projectStatus}</p>
          <div className="card-actions">
            <button onClick={handleDelete} className="card-button delete-button">
              <FaTrash /> Slett prosjekt
            </button>
            <button onClick={toggleUpdateForm} className="card-button update-button">
              <FaEdit /> Oppdater prosjekt
            </button>
          </div>
        </div>
      </article>
      {isUpdateFormVisible && (
        <form onSubmit={handleUpdateSubmit} className="update-form">
          <label>
            Prosjekt tittel:
            <input
              type="text"
              name="projectTitle"
              value={updatedProjectData.projectTitle}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Beskrivelse:
            <input
              type="text"
              name="description"
              value={updatedProjectData.description}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit" className="save-button">Lagre Endringer</button>
        </form>
      )}
    </li>
  );
}