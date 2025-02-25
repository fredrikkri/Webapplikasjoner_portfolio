import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.string(),
    userId: z.string(),
    projectTitle: z.string(),
    description: z.string(),
    githubLink: z.string(),
    liveDemoLink: z.string(),
    imgUrl: z.string(),
    createdAt: z.string(),
    projectStatus: z.string(),
})

export const User = z.object({
    id: z.string(),
    role: z.string(),
    username: z.string()
  });

  export type DbProject = {
    id: string;
    userId: string;
    projectTitle: string;
    description: string;
    githubLink: string;
    liveDemoLink: string;
    imgUrl: string;
    createdAt: string;
    projectStatus: string;
  };
  
  export type DbUser = {
    id: string;
    role: string;
    username: string;
  };

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export const ProjectCreateSchema = ProjectSchema.omit({ id: true });

export const ProjectArraySchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;

export type CreateProject = z.infer<typeof ProjectCreateSchema>;

export type User = z.infer<typeof User>;