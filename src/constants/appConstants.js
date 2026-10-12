export const UPCOMING_CASE_LOOKAHEAD_DAYS = 10;
export const LOOKAHEAD_OPTIONS = [10, 20, 30, 60, 90];

export const CASE_STATUSES = [
  "Active",
  "Pending",
  "Disposed",
  "Closed",
  "Stayed",
  "Transferred"
];

export const CASE_STATUS_FILTERS = ["All", ...CASE_STATUSES];

export const DIARY_ACTIVITIES = [
  "Case started",
  "Hearing",
  "Appearance",
  "Order",
  "Notice",
  "Evidence",
  "Argument",
  "Adjournment",
  "Judgment",
  "Other"
] ;

export const DATE_VIEW_OPTIONS = [
  "Today",
  "Tomorrow",
  "This Week",
  "Next Week",
  "This Month",
  "Custom Range"
];
