export function caseDisplayTitle(item) {
  return `${item.case_number} - ${item.party_name}`;
}

export function initials(value) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
