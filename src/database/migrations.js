export async function runMigrations(db) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      court_name TEXT NOT NULL,
      case_number TEXT NOT NULL,
      first_party TEXT NOT NULL,
      second_party TEXT NOT NULL,
      party_name TEXT NOT NULL,
      status TEXT NOT NULL,
      info TEXT,
      start_date TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS diary_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      case_id INTEGER NOT NULL,
      entry_date TEXT NOT NULL,
      activity TEXT NOT NULL,
      notes TEXT,
      next_date TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_diary_case_id ON diary_entries(case_id);
    CREATE INDEX IF NOT EXISTS idx_diary_entry_date ON diary_entries(entry_date);
    CREATE INDEX IF NOT EXISTS idx_diary_next_date ON diary_entries(next_date);
    CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
    CREATE INDEX IF NOT EXISTS idx_cases_case_number ON cases(case_number);
  `);
}
