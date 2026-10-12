import { CASE_STATUSES } from "../constants/appConstants";

export const CASE_CSV_COLUMNS = ["court_name", "case_number", "first_party", "second_party", "status", "info", "start_date", "next_date"];

export function buildCasesCsvFromRows(cases) {
  const rows = cases.map((item) => [
    item.court_name,
    item.case_number,
    item.first_party,
    item.second_party,
    item.status,
    item.info ?? "",
    item.start_date,
    item.effective_next_date ?? ""
  ]);
  return [CASE_CSV_COLUMNS, ...rows].map((row) => row.map(escapeCsvValue).join(",")).join("\n");
}

export function parseCasesCsv(text) {
  const rows = parseCsvRows(text);
  if (rows.length < 2) throw new Error("CSV must include a header and at least one case row.");

  const headers = rows[0].map((value) => value.trim());
  const missing = CASE_CSV_COLUMNS.filter((column) => !headers.includes(column));
  if (missing.length > 0) throw new Error(`Missing CSV columns: ${missing.join(", ")}`);

  return rows.slice(1)
    .filter((row) => row.some((value) => value.trim()))
    .map((row, index) => {
      const record = Object.fromEntries(headers.map((header, headerIndex) => [header, row[headerIndex] ?? ""]));
      const draft = {
        court_name: record.court_name.trim(),
        case_number: record.case_number.trim(),
        first_party: record.first_party.trim(),
        second_party: record.second_party.trim(),
        status: record.status.trim() || "Active",
        info: record.info.trim(),
        start_date: record.start_date.trim(),
        next_date: record.next_date.trim() || null
      };
      const rowNumber = index + 2;
      validateCsvDraft(draft, rowNumber);
      return draft;
    });
}

function validateCsvDraft(draft, rowNumber) {
  const required = ["court_name", "case_number", "first_party", "second_party", "start_date"];
  const missing = required.filter((field) => !draft[field]);
  if (missing.length > 0) throw new Error(`Row ${rowNumber} missing: ${missing.join(", ")}`);
  if (!CASE_STATUSES.includes(draft.status)) throw new Error(`Row ${rowNumber} has invalid status: ${draft.status}`);
  if (!isDateOnly(draft.start_date)) throw new Error(`Row ${rowNumber} has invalid start_date. Use YYYY-MM-DD.`);
  if (draft.next_date && !isDateOnly(draft.next_date)) throw new Error(`Row ${rowNumber} has invalid next_date. Use YYYY-MM-DD.`);
}

function isDateOnly(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function escapeCsvValue(value) {
  const text = String(value ?? "");
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll("\"", "\"\"")}"`;
  return text;
}

function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted) {
      if (char === "\"" && next === "\"") {
        field += "\"";
        index += 1;
      } else if (char === "\"") {
        quoted = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === "\"") {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }

  row.push(field);
  rows.push(row);
  return rows;
}
