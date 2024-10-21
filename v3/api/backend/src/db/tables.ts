import type { DB } from "./db";

export const createTables = async (db: DB) => {
  db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    role TEXT NOT NULL,
    username TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    projectTitle TEXT,
    description TEXT,
    githubLink TEXT,
    liveDemoLink TEXTL,
    imgUrl TEXT,
    createdAt TEXT,
    projectStatus TEXT,
    isPublic TEXT,
    FOREIGN KEY (userId) REFERENCES users(id)
  );

`);
  db.exec(`
  CREATE INDEX IF NOT EXISTS idx_projects_userId ON projects(userId);
`);
};
