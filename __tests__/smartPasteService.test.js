import { describe, expect, it } from "vitest";
import { parseSmartPaste } from "../src/services/smartPasteService";

describe("parseSmartPaste", () => {
  it("parses case number and parties", () => {
    expect(parseSmartPaste("GR1995/22 Sunil Mahto VS Sudha Vishwas")).toEqual({
      case_number: "GR1995/22",
      first_party: "Sunil Mahto",
      second_party: "Sudha Vishwas"
    });
  });

  it("supports separator variations", () => {
    expect(parseSmartPaste("GR1995/22 - Sunil Mahto v. Sudha Vishwas")).toEqual({
      case_number: "GR1995/22",
      first_party: "Sunil Mahto",
      second_party: "Sudha Vishwas"
    });
  });

  it("returns null when uncertain", () => {
    expect(parseSmartPaste("Sunil Mahto Sudha Vishwas")).toBeNull();
  });
});
