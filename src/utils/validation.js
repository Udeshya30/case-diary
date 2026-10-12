export function validateCaseDraft(draft) {
  const errors = {};
  if (!draft.court_name.trim()) errors.court_name = "Court name is required";
  if (!draft.case_number.trim()) errors.case_number = "Case number is required";
  if (!draft.first_party.trim()) errors.first_party = "First party is required";
  if (!draft.second_party.trim()) errors.second_party = "Second party is required";
  if (!draft.status) errors.status = "Status is required";
  if (!draft.start_date) errors.start_date = "Start date is required";
  return errors;
}

export function validateDiaryDraft(draft) {
  const errors = {};
  if (!draft.entry_date) errors.entry_date = "Entry date is required";
  if (!draft.activity.trim()) errors.activity = "Activity is required";
  return errors;
}
