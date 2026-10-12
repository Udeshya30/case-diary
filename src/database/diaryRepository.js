import { getDb } from "./database";

function nowTimestamp() {
  return new Date().toISOString();
}

export async function createDiaryEntry(draft) {
  const db = await getDb();
  const now = nowTimestamp();
  const result = await db.runAsync(
    `INSERT INTO diary_entries
      (case_id, entry_date, activity, notes, next_date, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      draft.case_id,
      draft.entry_date,
      draft.activity.trim(),
      draft.notes?.trim() || null,
      draft.next_date || null,
      now,
      now
    ]
  );
  return result.lastInsertRowId;
}

export async function getDiaryEntriesForCase(caseId) {
  const db = await getDb();
  return db.getAllAsync(
    `SELECT id, case_id, entry_date, activity, notes, next_date, created_at, updated_at
     FROM diary_entries WHERE case_id = ? ORDER BY entry_date ASC, id ASC`,
    [caseId]
  );
}

export async function getDiaryEntryById(id) {
  const db = await getDb();
  return db.getFirstAsync(
    `SELECT id, case_id, entry_date, activity, notes, next_date, created_at, updated_at
     FROM diary_entries WHERE id = ?`,
    [id]
  );
}

export async function updateDiaryEntry(id, draft) {
  const db = await getDb();
  await db.runAsync(
    `UPDATE diary_entries SET entry_date = ?, activity = ?, notes = ?, next_date = ?, updated_at = ? WHERE id = ?`,
    [draft.entry_date, draft.activity.trim(), draft.notes?.trim() || null, draft.next_date || null, nowTimestamp(), id]
  );
}

export async function deleteDiaryEntry(id) {
  const db = await getDb();
  await db.runAsync("DELETE FROM diary_entries WHERE id = ?", [id]);
}

export async function getEntriesByDateRange(from, to) {
  const db = await getDb();
  return db.getAllAsync(
    `SELECT id, case_id, entry_date, activity, notes, next_date, created_at, updated_at
     FROM diary_entries WHERE entry_date BETWEEN ? AND ? ORDER BY entry_date ASC`,
    [from, to]
  );
}
