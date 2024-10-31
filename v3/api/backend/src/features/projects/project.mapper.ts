// project.mapper.ts

import type { Project, ProjectFromDb, ProjectResponse } from "./project.schema";

const createId = () => {
  return crypto.randomUUID();
};

export const createProjectResponse = (project: Project): ProjectResponse => {
  const { id, 
    projectTitle, 
    description, 
    githubLink, 
    liveDemoLink, 
    imgUrl, 
    createdAt,
    projectStatus, 
    isPublic, 
    userId, } = project;

  return {
    ...project,
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
  };
};

export const fromDb = (project: ProjectFromDb) => {
  return {
    id: project.id, 
    projectTitle: project.projectTitle, 
    description: project.description, 
    githubLink: project.githubLink, 
    liveDemoLink: project.liveDemoLink, 
    imgUrl: project.imgUrl, 
    createdAt: project.createdAt,
    projectStatus: project.projectStatus, 
    isPublic: project.isPublic, 
    userId: project.userId,
  };
};

export const createProject = (project: Partial<Project>): Project => {
  return {
    id: project.id ?? createId(),  
    projectTitle: project?.projectTitle ?? "", 
    description: project?.description ?? "", 
    githubLink: project?.githubLink ?? "", 
    liveDemoLink: project?.liveDemoLink ?? "", 
    imgUrl: project?.imgUrl ?? "", 
    createdAt: project?.createdAt ?? "",
    projectStatus: project?.projectStatus ?? "", 
    isPublic: project?.isPublic ?? "", 
    userId: project?.userId ?? "",
  };
};

export const toDb = (data: Partial<Project>) => {
  const project = createProject(data);

  return {
    id: project.id, 
    projectTitle: project.projectTitle, 
    description: project.description, 
    githubLink: project.githubLink, 
    liveDemoLink: project.liveDemoLink, 
    imgUrl: project.imgUrl, 
    createdAt: project.createdAt,
    projectStatus: project.projectStatus, 
    isPublic: project.isPublic, 
    userId: project.userId,
  };
};