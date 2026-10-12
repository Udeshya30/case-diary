export function nowTimestamp() {
  return new Date().toISOString();
}

export function buildPartyName(firstParty, secondParty) {
  return `${firstParty.trim()} VS ${secondParty.trim()}`;
}

export function deriveEffectiveNextDate(entries) {
  const entry = [...entries]
    .filter((item) => Boolean(item.next_date))
    .sort((a, b) => (a.entry_date === b.entry_date ? b.id - a.id : b.entry_date.localeCompare(a.entry_date)))[0];
  return entry?.next_date ?? null;
}

export function isSearchMatch(item, rawQuery) {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;
  return [
    item.court_name,
    item.case_number,
    item.first_party,
    item.second_party,
    item.party_name,
    item.status,
    item.info ?? ""
  ].some((value) => value.toLowerCase().includes(query));
}
