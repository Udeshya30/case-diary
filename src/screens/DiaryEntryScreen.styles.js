import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";
import { spacing } from "../theme/spacing";
import { theme } from "../theme/theme";

export const styles = StyleSheet.create({
  content: {
    paddingBottom: 122
  },
  hero: {
    minHeight: 128,
    borderRadius: 26,
    backgroundColor: colors.navy,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.lg,
    overflow: "hidden"
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center"
  },
  heroIcon: {
    width: 54,
    height: 54,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  heroCopy: {
    flex: 1
  },
  heroTitle: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "900"
  },
  heroSubtitle: {
    color: "#C7D7FF",
    fontWeight: "700",
    marginTop: 4,
    lineHeight: 20
  },
  formCard: {
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...theme.shadow
  },
  actions: { flexDirection: "row", gap: 10, marginTop: 2 }
});
