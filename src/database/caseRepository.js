import { getDb } from "./database";

const CASE_COLUMNS =
  "id, court_name, case_number, first_party, second_party, party_name, status, info, start_date, created_at, updated_at";

function nowTimestamp() {
  return new Date().toISOString();
}

function buildPartyName(firstParty, secondParty) {
  return `${firstParty.trim()} VS ${secondParty.trim()}`;
}

export async function createCase(draft) {
  const db = await getDb();
  const now = nowTimestamp();
  const result = await db.runAsync(
    `INSERT INTO cases
      (court_name, case_number, first_party, second_party, party_name, status, info, start_date, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      draft.court_name.trim(),
      draft.case_number.trim(),
      draft.first_party.trim(),
      draft.second_party.trim(),
      buildPartyName(draft.first_party, draft.second_party),
      draft.status,
      draft.info?.trim() || null,
      draft.start_date,
      now,
      now
    ]
  );
  return result.lastInsertRowId;
}

export async function getCaseById(id) {
  const db = await getDb();
  return db.getFirstAsync(`SELECT ${CASE_COLUMNS} FROM cases WHERE id = ?`, [id]);
}

export async function getAllCases() {
  const db = await getDb();
  return db.getAllAsync(
    `SELECT c.${CASE_COLUMNS.replaceAll(", ", ", c.")},
      (
        SELECT d.next_date
        FROM diary_entries d
        WHERE d.case_id = c.id AND d.next_date IS NOT NULL AND d.next_date != ''
        ORDER BY d.entry_date DESC, d.id DESC
        LIMIT 1
      ) AS effective_next_date
    FROM cases c
    ORDER BY c.updated_at DESC`
  );
}

export async function getCourtNameSuggestions() {
  const db = await getDb();
  const rows = await db.getAllAsync(
    `SELECT court_name
    FROM cases
    WHERE trim(coalesce(court_name, '')) != ''
    GROUP BY lower(trim(court_name))
    ORDER BY max(updated_at) DESC`
  );
  return rows.map((item) => item.court_name);
}

export async function searchCases(query, status = "All") {
  const db = await getDb();
  const term = `%${query.trim().toLowerCase()}%`;
  const statusClause = status === "All" ? "" : "AND c.status = ?";
  const params = [term, term, term, term, term, term, term];
  if (status !== "All") params.push(status);

  return db.getAllAsync(
    `SELECT c.${CASE_COLUMNS.replaceAll(", ", ", c.")},
      (
        SELECT d.next_date FROM diary_entries d
        WHERE d.case_id = c.id AND d.next_date IS NOT NULL AND d.next_date != ''
        ORDER BY d.entry_date DESC, d.id DESC LIMIT 1
      ) AS effective_next_date
    FROM cases c
    WHERE (
      lower(c.court_name) LIKE ? OR lower(c.case_number) LIKE ? OR lower(c.first_party) LIKE ?
      OR lower(c.second_party) LIKE ? OR lower(c.party_name) LIKE ? OR lower(c.status) LIKE ?
      OR lower(coalesce(c.info, '')) LIKE ?
    ) ${statusClause}
    ORDER BY c.updated_at DESC`,
    params
  );
}

export async function getCasesByDateRange(from, to) {
  const db = await getDb();
  return db.getAllAsync(
    `SELECT * FROM (
      SELECT c.${CASE_COLUMNS.replaceAll(", ", ", c.")},
        (
          SELECT d.next_date FROM diary_entries d
          WHERE d.case_id = c.id AND d.next_date IS NOT NULL AND d.next_date != ''
          ORDER BY d.entry_date DESC, d.id DESC LIMIT 1
        ) AS effective_next_date
      FROM cases c
    )
    WHERE effective_next_date BETWEEN ? AND ?
      AND (status NOT IN ('Disposed', 'Closed') OR effective_next_date IS NOT NULL)
    ORDER BY effective_next_date ASC`,
    [from, to]
  );
}

export async function getCasesWithoutNextDate() {
  const cases = await getAllCases();
  return cases.filter((item) => !item.effective_next_date);
}

export async function updateCase(id, draft) {
  const db = await getDb();
  await db.runAsync(
    `UPDATE cases SET
      court_name = ?, case_number = ?, first_party = ?, second_party = ?, party_name = ?,
      status = ?, info = ?, start_date = ?, updated_at = ?
    WHERE id = ?`,
    [
      draft.court_name.trim(),
      draft.case_number.trim(),
      draft.first_party.trim(),
      draft.second_party.trim(),
      buildPartyName(draft.first_party, draft.second_party),
      draft.status,
      draft.info?.trim() || null,
      draft.start_date,
      nowTimestamp(),
      id
    ]
  );
}

export async function deleteCase(id) {
  const db = await getDb();
  await db.runAsync("DELETE FROM cases WHERE id = ?", [id]);
}
