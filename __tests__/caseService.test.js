import { describe, expect, it } from "vitest";
import { buildPartyName, deriveEffectiveNextDate, isSearchMatch } from "../src/services/caseLogic";

describe("case service", () => {
  it("generates party name", () => {
    expect(buildPartyName("Sunil Mahto", "Sudha Vishwas")).toBe("Sunil Mahto VS Sudha Vishwas");
  });

  it("derives latest relevant next date and allows empty next date", () => {
    const entries = [
      entry(1, "2026-10-10", "2026-10-15"),
      entry(2, "2026-10-12", null),
      entry(3, "2026-10-13", "2026-10-25")
    ];
    expect(deriveEffectiveNextDate(entries)).toBe("2026-10-25");
  });

  it("searches key case fields", () => {
    const item = {
      id: 1,
      court_name: "T.M. XII",
      case_number: "GR1995/22",
      first_party: "Sunil Mahto",
      second_party: "Sudha Vishwas",
      party_name: "Sunil Mahto VS Sudha Vishwas",
      status: "Active",
      info: "Land dispute case",
      start_date: "2026-10-10",
      created_at: "2026-10-10T00:00:00.000Z",
      updated_at: "2026-10-10T00:00:00.000Z"
    };
    expect(isSearchMatch(item, "gr1995")).toBe(true);
    expect(isSearchMatch(item, "t.m.")).toBe(true);
    expect(isSearchMatch(item, "sunil")).toBe(true);
    expect(isSearchMatch(item, "sudha")).toBe(true);
    expect(isSearchMatch(item, "active")).toBe(true);
    expect(isSearchMatch(item, "land")).toBe(true);
  });
});

function entry(id, entry_date, next_date) {
  return {
    id,
    case_id: 1,
    entry_date,
    activity: "Hearing",
    notes: null,
    next_date,
    created_at: "2026-10-10T00:00:00.000Z",
    updated_at: "2026-10-10T00:00:00.000Z"
  };
}
