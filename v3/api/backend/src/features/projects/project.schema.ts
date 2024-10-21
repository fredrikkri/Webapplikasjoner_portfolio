import { z } from "zod";

export const projectsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  projectTitle: z.string(),
  description: z.string(),
  githubLink: z.string(),
  liveDemoLink: z.string(),
  imgUrl: z.string(),
  createdAt: z.string(),
  projectStatus: z.string(),
  isPublic: z.string(),
});

export const projectFromDbSchema = z.object({
  id: z.string(),
  userId: z.string(),
  projectTitle: z.string(),
  description: z.string(),
  githubLink: z.string(),
  liveDemoLink: z.string(),
  imgUrl: z.string(),
  createdAt: z.string(),
  projectStatus: z.string(),
  isPublic: z.string(),
});

export const projectResponseSchema = projectsSchema.extend({
  id: z.string(),
  userId: z.string(),
  projectTitle: z.string(),
  description: z.string(),
  githubLink: z.string(),
  liveDemoLink: z.string(),
  imgUrl: z.string(),
  createdAt: z.string(),
  projectStatus: z.string(),
  isPublic: z.string(),
});

export const updateProjectSchema = projectsSchema.omit({
  createdAt: true,
});

export const createProjectSchema = projectsSchema.omit({
  id: true,
  createdAt: true,
});

export type Project = z.infer<typeof projectsSchema>;
export type ProjectFromDb = z.infer<typeof projectFromDbSchema>;
export type CreateProject = z.infer<typeof createProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
export type ProjectResponse = z.infer<typeof projectResponseSchema>;

export const validateCreateProject = (data: unknown) => {
  return createProjectSchema.safeParse(data);
};

export const validateUpdateProject = (data: unknown) => {
  return updateProjectSchema.safeParse(data);
};

export const validateProject = (data: unknown) => {
  return projectsSchema.safeParse(data);
};