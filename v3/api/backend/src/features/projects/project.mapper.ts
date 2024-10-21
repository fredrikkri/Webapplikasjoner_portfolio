import type { Project, ProjectFromDb, ProjectResponse } from "./project.schema";

const createId = () => {
  return crypto.randomUUID();
};

export const createProjectResponse = (project: Project): ProjectResponse => {
  const { name } = project;
  const [firstName, ...rest] = name.split(" ");

  return {
    ...project,
    firstName,
    lastName: rest?.at(-1) ?? "",
    avatar: name[0],
  };
};

export const fromDb = (project: ProjectFromDb) => {
  return {
    id: project.id,
    name: project.name,
    createdAt: new Date(project.created_at).toISOString(),
    updatedAt: new Date(project.updated_at).toISOString(),
  };
};

export const createProject = (project: Partial<Project>): Project => {
  return {
    id: project.id ?? createId(),
    name: project.name ?? "",
    createdAt: project?.createdAt ?? new Date().toISOString(),
    updatedAt: project?.updatedAt ?? new Date().toISOString(),
  };
};

export const toDb = (data: Partial<Project>) => {
  const project = createProject(data);

  return {
    id: project.id,
    name: project.name,
    created_at: project.createdAt,
    updated_at: project.updatedAt,
  };
};