import { z } from "zod";

export const projectsSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const projectFromDbSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const projectResponseSchema = projectsSchema.extend({
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string(),
});

export const updateProjectSchema = projectsSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const createProjectSchema = projectsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
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