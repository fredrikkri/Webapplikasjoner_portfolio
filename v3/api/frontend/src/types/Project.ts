import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.string(),
    projectTitle: z.string(),
    description: z.string(),
    githubLink: z.string(),
    liveDemoLink: z.string(),
    imgUrl: z.string(),
    createdAt: z.date()
})

export const ProjectCreateSchema = ProjectSchema.omit({ id: true });

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectCreateSchema>;