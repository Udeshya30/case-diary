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
  profileCard: {
    minHeight: 160,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#E7EEF6",
    padding: 14,
    paddingLeft: 24,
    overflow: "hidden",
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 2
  },
  profileSpine: {
    position: "absolute",
    left: 10,
    top: 16,
    bottom: 16,
    width: 6,
    alignItems: "center",
    justifyContent: "space-between"
  },
  spineLine: {
    position: "absolute",
    top: 8,
    bottom: 8,
    width: 2,
    borderRadius: 999,
    backgroundColor: "#D7E2FF"
  },
  spineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary
  },
  spineDotSmall: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.secondary
  },
  profileMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  photoRing: {
    width: 92,
    height: 92,
    borderRadius: 32,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center"
  },
  photo: {
    width: 82,
    height: 82,
    borderRadius: 28
  },
  photoPlaceholder: {
    width: 82,
    height: 82,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  photoButton: {
    position: "absolute",
    right: 0,
    bottom: 2,
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.surface
  },
  profileCopy: {
    flex: 1
  },
  profileName: {
    color: colors.navy,
    fontSize: 23,
    fontWeight: "900"
  },
  profileRole: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 4
  },
  metaList: {
    gap: 6,
    marginTop: 12
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7
  },
  metaText: {
    flexShrink: 1,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "800"
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...theme.shadow
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
  sectionTitle: {
    color: colors.navy,
    fontSize: 18,
    fontWeight: "900"
  },
  fieldStack: {
    gap: 13
  },
  saveWrap: {
    marginTop: spacing.lg
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
  noticeText: {
    flex: 1,
    color: colors.success,
    fontWeight: "900"
  },
  noticeTextError: {
    color: colors.danger
  }
});
