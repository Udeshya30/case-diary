export function toDateOnly(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateOnly(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(value, days) {
  const date = parseDateOnly(value);
  date.setDate(date.getDate() + days);
  return toDateOnly(date);
}

export function todayDate() {
  return toDateOnly(new Date());
}

export function formatDate(value) {
  if (!value) return "Not set";
  const date = parseDateOnly(value);
  return date.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

export function getDateRangeForView(view, baseDate = todayDate(), custom) {
  const base = parseDateOnly(baseDate);

  if (view === "Today") return { from: baseDate, to: baseDate };
  if (view === "Tomorrow") {
    const tomorrow = addDays(baseDate, 1);
    return { from: tomorrow, to: tomorrow };
  }
  if (view === "This Week") {
    const start = new Date(base);
    const day = start.getDay();
    start.setDate(start.getDate() - day);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { from: toDateOnly(start), to: toDateOnly(end) };
  }
  if (view === "Next Week") {
    const start = new Date(base);
    const day = start.getDay();
    start.setDate(start.getDate() - day + 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { from: toDateOnly(start), to: toDateOnly(end) };
  }
  if (view === "This Month") {
    const start = new Date(base.getFullYear(), base.getMonth(), 1);
    const end = new Date(base.getFullYear(), base.getMonth() + 1, 0);
    return { from: toDateOnly(start), to: toDateOnly(end) };
  }
  return custom ?? { from: baseDate, to: baseDate };
}
