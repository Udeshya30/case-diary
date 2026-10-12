import * as caseRepository from "../database/caseRepository";
import * as diaryRepository from "../database/diaryRepository";
export { buildPartyName, deriveEffectiveNextDate, isSearchMatch, nowTimestamp } from "./caseLogic";

export async function createCaseWithInitialEntry(draft) {
  const caseId = await caseRepository.createCase(draft);
  await diaryRepository.createDiaryEntry({
    case_id: caseId,
    entry_date: draft.start_date,
    activity: "Case started",
    notes: "Initial case entry",
    next_date: draft.next_date || null
  });
  return caseId;
}

export function countToday(cases, today) {
  return cases.filter((item) => item.effective_next_date === today).length;
}

export function countUpcoming(cases, from, to) {
  return cases.filter((item) => item.effective_next_date && item.effective_next_date >= from && item.effective_next_date <= to).length;
}
