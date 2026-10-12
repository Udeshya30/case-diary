import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  wrap: { gap: 7 },
  label: { color: colors.text, fontWeight: "800", fontSize: 13 },
  input: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D7E2FF",
    backgroundColor: "#F8FAFD",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  inputCompact: {
    minHeight: 50,
    paddingHorizontal: 9,
    gap: 7
  },
  inputPressed: {
    opacity: 0.82
  },
  inputIcon: {
    width: 30,
    height: 30,
    borderRadius: 11,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center"
  },
  inputIconCompact: {
    width: 28,
    height: 28,
    borderRadius: 10
  },
  disabled: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border
  },
  value: { color: colors.text, fontWeight: "800", flex: 1 },
  valueCompact: {
    fontSize: 12
  },
  placeholder: { color: colors.textMuted, fontWeight: "500" },
  error: { color: colors.danger, fontSize: 12 },
  modal: {
    flex: 1,
    justifyContent: "center",
    padding: 18,
    backgroundColor: "rgba(11, 31, 58, 0.28)"
  },
  calendar: {
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 8
  },
  calendarTop: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10
  },
  calendarTopActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  monthButton: {
    width: 34,
    height: 34,
    borderRadius: 13,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center"
  },
  monthTitle: {
    flex: 1,
    textAlign: "center",
    color: colors.navy,
    fontSize: 15,
    fontWeight: "900"
  },
  titleControls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8
  },
  titleChip: {
    minHeight: 34,
    borderRadius: 10,
    backgroundColor: "transparent",
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  titleChipActive: {
    backgroundColor: "transparent"
  },
  titleChipText: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "900"
  },
  titleChipTextActive: {
    color: colors.primary
  },
  todayReset: {
    minHeight: 30,
    borderRadius: 999,
    backgroundColor: "#E9F7F4",
    borderWidth: 1,
    borderColor: "#BFE7DF",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  todayResetPressed: {
    opacity: 0.75
  },
  todayResetText: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "900"
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 5
  },
  weekLabel: {
    flex: 1,
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "900"
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 4
  },
  monthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 4
  },
  monthCell: {
    width: "30.8%",
    minHeight: 44,
    borderRadius: 15,
    backgroundColor: "#F8FAFD",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  monthCellSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  monthCellText: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: "900"
  },
  monthCellTextSelected: {
    color: colors.white
  },
  yearGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingTop: 4
  },
  yearCell: {
    width: "30.8%",
    minHeight: 44,
    borderRadius: 15,
    backgroundColor: "#F8FAFD",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  dayCell: {
    width: `${100 / 7}%`,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13
  },
  dayCellMuted: {
    opacity: 0.42
  },
  dayCellSelected: {
    backgroundColor: colors.primary
  },
  dayText: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: "900"
  },
  dayTextMuted: {
    color: colors.textMuted
  },
  dayTextSelected: {
    color: colors.white
  },
  dayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
    backgroundColor: "transparent"
  },
  dayDotToday: {
    backgroundColor: colors.secondary
  },
  dayDotSelected: {
    backgroundColor: colors.white
  }
});
