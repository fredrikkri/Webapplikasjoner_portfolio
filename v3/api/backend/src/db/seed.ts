import type { User, Project } from "../../../frontend/src/features/types/types"
import type { DB } from "./db";
import fs from "node:fs/promises";
import { join } from 'path';


export const seed = async (db: DB) => {
    const path = join(import.meta.dirname, "data.json");
    const file = await fs.readFile(path, "utf-8");
    const { users, projects } = JSON.parse(file) as {
      users: User[];
      projects: Project[];
    };

    const insertUser = db.prepare(`
        INSERT INTO users (id, role, username) VALUES (?, ?, ?)
      `);

    const insertProject = db.prepare(`
        INSERT INTO projects (id, userId, projectTitle, description, githubLink, liveDemoLink, imgUrl, createdAt, status, isPublic)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       `);

    db.transaction(() => {
        for (const user of users) {
          insertUser.run(user.id, user.role, user.username);
        }
    
        for (const project of projects) {
            insertProject.run(
            project.id,
            project.userId,
            project.projectTitle,
            project.description,
            project.githubLink,
            project.liveDemoLink,
            project.imgUrl,
            project.createdAt,
            project.status,
            project.isPublic
          );
        }
      })();
};