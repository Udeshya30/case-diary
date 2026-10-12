import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import * as XLSX from "xlsx";
import { getAllCases } from "../database/caseRepository";
import { getDb } from "../database/database";
import { createCaseWithInitialEntry } from "./caseService";
import { buildCasesCsvFromRows, parseCasesCsv } from "./csvService";

const IMPORT_FILE_TYPES = [
  "text/csv",
  "application/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
];

export async function buildBackupJson() {
  const db = await getDb();
  const diary_entries = await db.getAllAsync(
    "SELECT id, case_id, entry_date, activity, notes, next_date, created_at, updated_at FROM diary_entries ORDER BY entry_date ASC"
  );
  return {
    version: 1,
    exported_at: new Date().toISOString(),
    cases: await getAllCases(),
    diary_entries
  };
}

export async function exportBackup() {
  const payload = await buildBackupJson();
  const path = `${FileSystem.documentDirectory ?? ""}caseflow-backup-${Date.now()}.json`;
  await FileSystem.writeAsStringAsync(path, JSON.stringify(payload, null, 2));
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(path, { mimeType: "application/json", dialogTitle: "Export Case Diary backup" });
  }
  return path;
}

export async function exportCasesCsv() {
  const csv = await buildCasesCsv();
  const path = `${FileSystem.documentDirectory ?? ""}caseflow-cases-${Date.now()}.csv`;
  await FileSystem.writeAsStringAsync(path, csv);
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(path, { mimeType: "text/csv", dialogTitle: "Export Case Diary cases CSV" });
  }
  return path;
}

export async function buildCasesCsv() {
  const cases = await getAllCases();
  return buildCasesCsvFromRows(cases);
}

export async function importCasesCsvText(text) {
  const drafts = parseCasesCsv(text);
  for (const draft of drafts) {
    await createCaseWithInitialEntry(draft);
  }
  return drafts.length;
}

export async function pickAndImportCasesFile() {
  const result = await DocumentPicker.getDocumentAsync({
    type: IMPORT_FILE_TYPES,
    copyToCacheDirectory: true,
    multiple: false
  });
  if (result.canceled) return { canceled: true, count: 0 };

  const asset = result.assets?.[0];
  if (!asset?.uri) throw new Error("No file was selected.");

  const count = await importCasesFromFile(asset);
  return { canceled: false, count, name: asset.name };
}

async function importCasesFromFile(asset) {
  const fileName = asset.name?.toLowerCase() ?? "";
  const isExcel = fileName.endsWith(".xlsx") || fileName.endsWith(".xls");
  const text = isExcel ? await readExcelFileAsCsv(asset.uri) : await FileSystem.readAsStringAsync(asset.uri);
  return importCasesCsvText(text);
}

async function readExcelFileAsCsv(uri) {
  const data = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  const workbook = XLSX.read(data, { type: "base64" });
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) throw new Error("Excel file does not contain a worksheet.");
  return XLSX.utils.sheet_to_csv(workbook.Sheets[firstSheetName]);
}
