import fs from "fs/promises";
import path from "path";
import { Database } from "../types";

const dbPath = path.join(process.cwd(), "src", "db.json");

const emptyDatabase: Database = {
  users: [],
  posts: []
};

export async function readDb(): Promise<Database> {
  try {
    const file = await fs.readFile(dbPath, "utf-8");
    const parsed = JSON.parse(file) as Database;

    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      posts: Array.isArray(parsed.posts) ? parsed.posts : []
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await writeDb(emptyDatabase);
      return emptyDatabase;
    }

    throw error;
  }
}

export async function writeDb(database: Database): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(database, null, 2), "utf-8");
}

export function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
