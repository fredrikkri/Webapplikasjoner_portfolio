import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.string(),
    userId: z.string(),
    projectTitle: z.string(),
    description: z.string(),
    githubLink: z.string(),
    liveDemoLink: z.string(),
    imgUrl: z.string(),
    createdAt: z.coerce.date(),
    status: z.string(),
    isPublic: z.string()
})

export const User = z.object({
    id: z.string(),
    role: z.string(),
    username: z.string()
  });


export const ProjectCreateSchema = ProjectSchema.omit({ id: true });

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectCreateSchema>;

export type User = z.infer<typeof User>;