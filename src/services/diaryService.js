import { createDiaryEntry, deleteDiaryEntry, updateDiaryEntry } from "../database/diaryRepository";

export async function saveDiaryEntryWithOptionalNext(draft, createNext) {
  await createDiaryEntry(draft);
  if (createNext && draft.next_date) {
    await createDiaryEntry({
      case_id: draft.case_id,
      entry_date: draft.next_date,
      activity: "Next hearing",
      notes: null,
      next_date: null
    });
  }
}

export { deleteDiaryEntry, updateDiaryEntry };
