import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EAF0FF",
    borderWidth: 1,
    borderColor: "#D7E2FF",
    alignItems: "center",
    justifyContent: "center"
  },
  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center"
  },
  headerCopy: {
    flex: 1
  },
  headerMark: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  formStack: {
    gap: 14,
    paddingBottom: 112
  },
  completionCard: {
    minHeight: 72,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#E7EEF6",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2
  },
  completionIcon: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center"
  },
  completionCopy: {
    flex: 1,
    gap: 8
  },
  completionTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  completionTitle: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "900"
  },
  completionCount: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900"
  },
  progressTrack: {
    height: 7,
    borderRadius: 999,
    backgroundColor: "#EAF0FF",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.primary
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E7EEF6",
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginBottom: 15
  },
  sectionIcon: {
    width: 38,
    height: 38,
    borderRadius: 15,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center"
  },
  sectionCopy: {
    flex: 1
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: "900"
  },
  sectionSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2
  },
  sectionFields: {
    gap: 13
  },
  field: {
    gap: 0
  },
  suggestionPanel: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D7E2FF",
    backgroundColor: "#F8FAFD",
    overflow: "hidden"
  },
  suggestionRow: {
    minHeight: 46,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E7EEF6"
  },
  suggestionRowLast: {
    borderBottomWidth: 0
  },
  suggestionRowPressed: {
    backgroundColor: "#EDF3FF"
  },
  suggestionIcon: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center"
  },
  suggestionText: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    fontWeight: "800"
  },
  compactLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 6
  },
  partyFlow: {
    gap: 8
  },
  partyPanel: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4EBF4",
    backgroundColor: "#FAFCFF",
    padding: 12
  },
  partyPanelHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 10
  },
  partyPanelTitle: {
    color: colors.navy,
    fontWeight: "900",
    fontSize: 13
  },
  requiredMark: {
    color: colors.danger,
    fontWeight: "900"
  },
  vsWrap: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18
  },
  vsLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border
  },
  vsBadge: {
    width: 40,
    height: 28,
    borderRadius: 999,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10
  },
  vsText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900"
  },
  toggle: {
    alignSelf: "flex-start",
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D7E2FF",
    backgroundColor: "#EAF0FF",
    paddingLeft: 8,
    paddingRight: 9,
    paddingVertical: 5
  },
  togglePressed: {
    opacity: 0.82
  },
  toggleIcon: {
    width: 24,
    height: 24,
    borderRadius: 9,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center"
  },
  toggleCopy: {
    flexGrow: 0
  },
  toggleText: { color: colors.primary, fontWeight: "900", fontSize: 13 },
  switchTrack: {
    width: 38,
    height: 22,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 3,
    justifyContent: "center"
  },
  switchTrackOn: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  switchThumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.white
  },
  switchThumbOn: {
    alignSelf: "flex-end"
  },
  dateGrid: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start"
  },
  dateColumn: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    maxWidth: "50%"
  },
  todayDateWrap: {
    gap: 7
  },
  dateFieldLabel: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 13
  },
  todayDateTile: {
    minHeight: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D7E2FF",
    backgroundColor: "#F8FAFD",
    paddingHorizontal: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  todayDateIcon: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center"
  },
  todayDateValue: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900",
    flex: 1
  },
  previewBox: {
    minHeight: 44,
    borderRadius: 14,
    backgroundColor: "#E9F7F4",
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  preview: { color: colors.secondary, fontWeight: "800", flex: 1, lineHeight: 18 },
  saveWrap: {
    marginTop: 2
  },
  saveButton: {
    minHeight: 56,
    borderRadius: 18,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 6
  }
});
