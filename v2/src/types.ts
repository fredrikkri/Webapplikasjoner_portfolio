import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  createdAt: z.coerce.date(),
  description: z.string(),
  githubLink: z.string(),
  liveDemoLink: z.string(),
  imgUrl: z.string()
});

export const ProjectCreateSchema = ProjectSchema.omit({ id: true });

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectCreateSchema>;