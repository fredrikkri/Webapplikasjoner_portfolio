import type { User, Project } from "../../../frontend/src/features/types/types"
import type { DB } from "./db";
import fs from "node:fs/promises";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const seed = async (db: DB) => {
    const path = join(__dirname, "projects.json");
    const path2 = join(__dirname, "users.json");

    const file1 = await fs.readFile(path, "utf-8");
    const file2 = await fs.readFile(path2, "utf-8");

    const { users } = JSON.parse(file2) as {
      users: User[];
    };
    const { projects } = JSON.parse(file1) as {
      projects: Project[];
    };

    if (!Array.isArray(users)) {
      throw new Error("`users` is not array-format or it is undefined.");
    }
    
    if (!Array.isArray(projects)) {
      throw new Error("`projects` is not array-format or it is undefined.");
    }

    const insertUser = db.prepare(`
        INSERT INTO users (id, role, username) VALUES (?, ?, ?)
      `);

    const insertProject = db.prepare(`
        INSERT INTO projects (id, userId, projectTitle, description, githubLink, liveDemoLink, imgUrl, createdAt, projectStatus, isPublic)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       `);

  const transaction = db.transaction(() => {
    for (const user of users) {
      insertUser.run(user.id, user.role, user.username);
    }

    for (const project of projects) {            
      insertProject.run(
        project.id,
        project.userId,
        project.projectTitle,
        project.description,
        project.githubLink ?? null,
        project.liveDemoLink ?? null,
        project.imgUrl ?? null,
        project.createdAt ? new Date(project.createdAt).toString() : new Date().toString(),
        project.projectStatus ?? null,
        project.isPublic ?? false
      );
    }
  });

  transaction();
  console.log('Seeding completed successfully!');
};