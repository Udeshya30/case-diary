import { describe, expect, it } from "vitest";
import { buildCasesCsvFromRows, parseCasesCsv } from "../src/services/csvService";

describe("csvService", () => {
  it("exports and parses cases with commas and quotes", () => {
    const csv = buildCasesCsvFromRows([
      {
        court_name: "Civil Court, Room 2",
        case_number: "GR1995/22",
        first_party: "Sunil \"A\" Mahto",
        second_party: "Sudha Vishwas",
        status: "Active",
        info: "Important, urgent",
        start_date: "2026-10-11",
        effective_next_date: "2026-10-20"
      }
    ]);

    expect(parseCasesCsv(csv)).toEqual([
      {
        court_name: "Civil Court, Room 2",
        case_number: "GR1995/22",
        first_party: "Sunil \"A\" Mahto",
        second_party: "Sudha Vishwas",
        status: "Active",
        info: "Important, urgent",
        start_date: "2026-10-11",
        next_date: "2026-10-20"
      }
    ]);
  });

  it("rejects invalid statuses", () => {
    const csv = "court_name,case_number,first_party,second_party,status,info,start_date,next_date\nCourt,123,A,B,Unknown,,2026-10-11,";
    expect(() => parseCasesCsv(csv)).toThrow("invalid status");
  });
});
