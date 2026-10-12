import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";
import { spacing } from "../theme/spacing";
import { theme } from "../theme/theme";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    position: "relative"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.lg
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
  addButton: {
    width: 46,
    height: 46,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 5
  },
  controls: {
    gap: 10,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
    zIndex: 30,
    ...theme.shadow
  },
  searchFilterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  searchInput: {
    flex: 1,
    minWidth: 0
  },
  filterButton: {
    minHeight: 38,
    borderRadius: 999,
    backgroundColor: "#EAF0FF",
    borderWidth: 1,
    borderColor: "#D7E2FF",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 7
  },
  filterButtonPressed: {
    opacity: 0.78
  },
  filterButtonActive: {
    backgroundColor: "#DCE7FF",
    borderColor: "#BFD0FF"
  },
  filterButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900",
    maxWidth: 48
  },
  clearMini: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  resultBar: {
    minHeight: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginBottom: spacing.sm
  },
  resultCopy: {
    flex: 1
  },
  resultText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "800"
  },
  pageHint: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 2
  },
  clear: {
    minHeight: 32,
    paddingHorizontal: spacing.sm,
    borderRadius: 999,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF0FF",
    borderWidth: 1,
    borderColor: "#D7E2FF"
  },
  clearText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900"
  },
  filterSheet: {
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    ...theme.shadow
  },
  filterModal: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(11, 31, 58, 0.28)"
  },
  filterBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent"
  },
  filterSheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  filterSheetTitle: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "900"
  },
  filterSectionLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase",
    marginBottom: 8
  },
  sortLabel: {
    marginTop: spacing.md
  },
  optionList: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#F8FAFD",
    overflow: "hidden"
  },
  filterOptionRow: {
    minHeight: 48,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  filterOptionRowActive: {
    backgroundColor: "#EDF3FF"
  },
  filterOptionRowPressed: {
    opacity: 0.82
  },
  filterOptionIcon: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center"
  },
  filterOptionIconActive: {
    backgroundColor: colors.primary
  },
  filterOptionText: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    fontWeight: "800"
  },
  filterOptionTextActive: {
    color: colors.primary,
    fontWeight: "900"
  },
  pagination: {
    minHeight: 42,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md
  },
  pageButton: {
    width: 34,
    height: 34,
    borderRadius: 13,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center"
  },
  pageButtonDisabled: {
    backgroundColor: colors.surfaceAlt,
    opacity: 0.65
  },
  paginationText: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: "900"
  },
  listContent: {
    paddingBottom: 120
  },
  emptyList: {
    flexGrow: 1
  }
});
