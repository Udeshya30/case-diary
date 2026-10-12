import { describe, expect, it } from "vitest";
import { getDateRangeForView } from "../src/utils/dateUtils";

describe("date ranges", () => {
  const base = "2026-10-11";

  it("calculates today", () => {
    expect(getDateRangeForView("Today", base)).toEqual({ from: "2026-10-11", to: "2026-10-11" });
  });

  it("calculates tomorrow", () => {
    expect(getDateRangeForView("Tomorrow", base)).toEqual({ from: "2026-10-12", to: "2026-10-12" });
  });

  it("calculates this week", () => {
    expect(getDateRangeForView("This Week", base)).toEqual({ from: "2026-10-11", to: "2026-10-17" });
  });

  it("calculates next week", () => {
    expect(getDateRangeForView("Next Week", base)).toEqual({ from: "2026-10-18", to: "2026-10-24" });
  });

  it("calculates this month", () => {
    expect(getDateRangeForView("This Month", base)).toEqual({ from: "2026-10-01", to: "2026-10-31" });
  });

  it("uses custom range", () => {
    expect(getDateRangeForView("Custom Range", base, { from: "2026-10-03", to: "2026-10-09" })).toEqual({
      from: "2026-10-03",
      to: "2026-10-09"
    });
  });
});
