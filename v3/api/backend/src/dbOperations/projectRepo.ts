import { DB } from "../db/db";

export const createHabitRepository = (db: DB) => {
  const exist = async (id: string): Promise<boolean> => {
    const query = db.prepare(
      "SELECT COUNT(*) as count FROM habits WHERE id = ?"
    );
    const data = query.get(id) as { count: number };
    return data.count > 0;
  }
}