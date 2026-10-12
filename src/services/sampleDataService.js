import { createCaseWithInitialEntry } from "./caseService";

export async function insertDevelopmentSampleData() {
  if (!__DEV__) return;
  await createCaseWithInitialEntry({
    court_name: "T.M. XII",
    case_number: "GR1995/22",
    first_party: "Sunil Mahto",
    second_party: "Sudha Vishwas",
    status: "Active",
    info: "Land dispute case. Notice issued.",
    start_date: "2026-10-10",
    next_date: "2026-10-15"
  });
  await createCaseWithInitialEntry({
    court_name: "Civil Court",
    case_number: "CS145/23",
    first_party: "Ramesh Kumar",
    second_party: "State of Bihar",
    status: "Pending",
    info: "Civil matter.",
    start_date: "2026-10-05",
    next_date: "2026-10-18"
  });
  await createCaseWithInitialEntry({
    court_name: "Family Court",
    case_number: "FC88/24",
    first_party: "Anita Devi",
    second_party: "Manoj Kumar",
    status: "Stayed",
    info: "Matter currently stayed.",
    start_date: "2026-10-02",
    next_date: "2026-10-20"
  });
  await createCaseWithInitialEntry({
    court_name: "High Court",
    case_number: "CR120/24",
    first_party: "State",
    second_party: "Rajesh Kumar",
    status: "Disposed",
    info: "Case disposed.",
    start_date: "2026-09-15",
    next_date: null
  });
}
