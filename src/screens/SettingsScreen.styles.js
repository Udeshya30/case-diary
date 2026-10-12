import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";
import { spacing } from "../theme/spacing";
import { theme } from "../theme/theme";

export const styles = StyleSheet.create({
  content: {
    paddingBottom: 122
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: "#E7EEF6",
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2
  },
  cardTitle: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
  cardTitleText: { color: colors.navy, fontSize: 18, fontWeight: "900" },
  label: { color: colors.text, fontWeight: "900" },
  helperText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 3
  },
  lookaheadSimpleRow: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  lookaheadSimpleCopy: {
    flex: 1
  },
  customInputRow: {
    width: 112,
    minHeight: 44,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  customInput: {
    flex: 1,
    minHeight: 36,
    color: colors.navy,
    fontSize: 17,
    fontWeight: "900",
    padding: 0
  },
  customSuffix: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "900"
  },
  actionStack: {
    flexDirection: "row",
    gap: 12
  },
  actionCard: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "#EAF0FF",
    borderWidth: 1,
    borderColor: "#D7E2FF",
    alignItems: "center",
    justifyContent: "center"
  },
  actionCardDanger: {
    backgroundColor: "#FFF1F1",
    borderColor: "#F0C7C5"
  },
  actionCardDisabled: {
    opacity: 0.55
  },
  actionCardPressed: {
    opacity: 0.82
  },
  notice: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 106,
    minHeight: 54,
    borderRadius: radius.card,
    backgroundColor: "#E6F4ED",
    borderWidth: 1,
    borderColor: "#B9E1CB",
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    ...theme.shadow
  },
  noticeError: {
    backgroundColor: "#FFF1F1",
    borderColor: "#F0C7C5"
  },
  noticeIcon: {
    width: 30,
    height: 30,
    borderRadius: 11,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center"
  },
  noticeIconError: {
    backgroundColor: colors.surface
  },
  noticeText: {
    flex: 1,
    color: colors.success,
    fontWeight: "900"
  },
  noticeTextError: {
    color: colors.danger
  },
  appName: { color: colors.navy, fontWeight: "900", fontSize: 18 },
  appNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  muted: { color: colors.textMuted, marginTop: 4, fontWeight: "700" },
  aboutCard: {
    minHeight: 82,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D7E2FF",
    backgroundColor: "#F8FAFD",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  aboutCopy: {
    flex: 1,
    minWidth: 0
  },
  aboutTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  version: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "800"
  },
  builderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8
  },
  builderText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "800",
    flex: 1
  },
  aboutDescription: {
    color: colors.navy,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    fontWeight: "700"
  },
  priorityRow: {
    marginTop: 8
  },
  priorityText: {
    color: colors.navy,
    fontSize: 11,
    fontWeight: "800",
    lineHeight: 16
  }
});
