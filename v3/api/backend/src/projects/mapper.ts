import type { DbProject, Project, Entries } from "../../../frontend/src/features/types/types";

export const fromDb = (project: DbProject) => {
    return {
      id: project.id,
      userId: project.userId,
      projectTitle: project.projectTitle,
      description: project.description,
      githubLink: project.githubLink,
      liveDemoLink: project.liveDemoLink,
      imgUrl: project.imgUrl,
      createdAt: new Date(project.createdAt).toISOString(),
      projectStatus: project.projectStatus,
      isPublic: project.isPublic
    };
  };

  export const createProject = (project: Partial<Project>): Project => {
    return {
      id: project.id ?? crypto.randomUUID(),
      userId: project.userId ?? "",
      projectTitle: project.projectTitle ?? "",
      description: project.description ?? "",
      githubLink: project.githubLink ?? "",
      liveDemoLink: project.liveDemoLink ?? "",
      imgUrl: project.imgUrl ?? "",
      createdAt: project.createdAt ?? "",
      projectStatus: project.projectStatus ?? "",
      isPublic: project.isPublic ?? ""
    };
  };

  export const toDb = (data: Project) => {
    // Sikrer at alle nødvendige felter er satt
    const habit = createProject(data);
    // Caster Object.entries for type-sikkerhet
    const entries = Object.entries(habit) as Entries<Project>;
    const dbProject = {} as DbProject;
  
    // Itererer over alle felter i vanen
    for (const entry of entries) {
      if (!entry) continue;
      const [key, value] = entry;
      switch (key) {
        case "id":
          dbProject.id = value;
          break;
        case "userId":
          dbProject.userId = value;
          break;
        case "projectTitle":
          // Konverterer array til kommaseparert streng
          dbProject.projectTitle = value;
          break;
        case "description":
          dbProject.description = value;
          break;
        case "githubLink":
          dbProject.githubLink = value;
          break;
        case "liveDemoLink":
          // Konverterer Date-objekter til ISO-strenger
          dbProject.liveDemoLink = value;
          break;
        case "imgUrl":
          dbProject.imgUrl = value;
          break;
        case "createdAt":
          // Håndterer nullable felter
          dbProject.createdAt = value.toString() ?? null;
          break;
        case "projectStatus":
          dbProject.projectStatus = value;
          break;
        case "isPublic":
          dbProject.isPublic = value;
          break;
        default:
          break;
      }
    }
    return dbProject;
  };