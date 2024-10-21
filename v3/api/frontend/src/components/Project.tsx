import { useEffect, useRef, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import classes from "./Project.module.css";
import useProject from "../hooks/useProject";


export type ProjectProps = {
  id: string;
  userId: string;
  projectTitle: string;
  description: string;
  githubLink: string;
  liveDemoLink: string;
  imgUrl: string;
  createdAt: string;
  projectStatus: string;
  isPublic: string
};

const Project = ({
  id,
  userId,
  projectTitle,
  description,
  githubLink,
  liveDemoLink,
  imgUrl,
  createdAt,
  projectStatus,
  isPublic,
  onRemoveProject,
  onEditProjectName,
}: ProjectProps & {
  onRemoveProject: (id: string) => void;
  onEditProjectName: (id: string, name: string) => void;
}) => {
  const { status, handlers } = useProject({
    id,
    userId,
    projectTitle,
    description,
    githubLink,
    liveDemoLink,
    imgUrl,
    createdAt,
    projectStatus,
    isPublic,
    onRemoveProject,
    onEditProjectName,
  });

  return (
    <form id="create-project-form" onSubmit={handleSubmit}>
      
      {/* Left side */}
        <section id="create-project-left">
            <label htmlFor="title">Title</label>
            <input type="text" id="projectTitle" name="label" placeholder="projectTitle" onChange={handleChange} required/>
            <label htmlFor="githubLink">Github-link</label>
            <input type="text" id="githubLink" name="label" placeholder="URL" onChange={handleChange} required/>


            <label htmlFor="liveDemoLink">Live demo</label>
            <input type="text" id="liveDemoLink" name="label" placeholder="URL" onChange={handleChange}/>

            <label htmlFor="imgUrl">Image</label>
            <input type="text" id="imgUrl" name="label" placeholder="imgUrl" onChange={handleChange}/>
        </section>

        {/* Right side */}
        <section id="create-project-right">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="label" placeholder="Tell us about your project..." onChange={handleChange} required/>


        <section id="chose-status-section">
            <p>Set Status</p>
            <span>
            <label>New
              <input type="radio" name="status" value="New" checked={chosenStatus === "New"} onChange={handlechosenStatus} />
            </label>

            <label>In Progress
              <input type="radio" name="status" value="In Progress" checked={chosenStatus === "In Progress"} onChange={handlechosenStatus} />
            </label>

            <label>Finished
              <input type="radio" name="status" value="Finished" checked={chosenStatus === "Finished"} onChange={handlechosenStatus} />
            </label>
            </span>
        </section>
        
      
          </section>

          <section id="public-section">
            <p>Set Status</p>
            <span>
            <label>Public
              <input type="radio" name="isPublic" value="true" checked={isPublicStatus === "true"} onChange={handleIsPublic} />
            </label>

            <label>Private
              <input type="radio" name="isPublic" value="false" checked={isPublicStatus === "false"} onChange={handleIsPublic} />
            </label>
            </span>
        </section>

          <input id="submit-button" type="submit"/>
    </form>);
};

export default Project;