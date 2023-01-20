import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

let db = null;

export async function createConnection() {
  const file = join(__dirname, "../db.json");

  const adapter = new JSONFile(file);

  // nueva conexion
  db = new Low(adapter);

  await db.read();

  db.data ||= { tasks: [] };

  await db.write();
}

export const getConnection = () => db;
