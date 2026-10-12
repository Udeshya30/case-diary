const caseNumberPattern = /^([A-Za-z]{1,8}\s*\.?\s*[A-Za-z0-9./-]*\d[A-Za-z0-9./-]*)\s*-?\s+(.+)$/;
const partySeparatorPattern = /\s+(?:VS|Vs|vs|V\.|v\.|V|v)\s+/;

export function parseSmartPaste(input) {
  const normalized = input.replace(/\s+/g, " ").trim();
  const match = normalized.match(caseNumberPattern);
  if (!match) return null;

  const caseNumber = match[1].replace(/\s+/g, "").trim();
  const rest = match[2].trim();
  const parts = rest.split(partySeparatorPattern).map((part) => part.trim()).filter(Boolean);

  if (parts.length !== 2) return null;
  if (parts[0].length < 2 || parts[1].length < 2) return null;

  return {
    case_number: caseNumber,
    first_party: parts[0],
    second_party: parts[1]
  };
}
