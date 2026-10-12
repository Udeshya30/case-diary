import * as SQLite from "expo-sqlite";
import { runMigrations } from "./migrations";

let db = null;

export async function getDb() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("caseflow.db");
  }
  return db;
}

export async function initDatabase() {
  const database = await getDb();
  await database.execAsync("PRAGMA foreign_keys = ON;");
  await runMigrations(database);
}

export async function clearDatabase() {
  const database = await getDb();
  await database.withTransactionAsync(async () => {
    await database.runAsync("DELETE FROM diary_entries;");
    await database.runAsync("DELETE FROM cases;");
  });
}
