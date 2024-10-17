import { DB } from './db';

export const createTables = (db: DB) => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          role TEXT NOT NULL,
          username TEXT NOT NULL,
        );
      `);
}