import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: "hidden"
  },
  backgroundBand: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "42%",
    backgroundColor: colors.navy,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28
  },
  mark: {
    width: 74,
    height: 74,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18
  },
  title: {
    color: colors.white,
    fontSize: 34,
    fontWeight: "900"
  },
  subtitle: {
    color: "#C7D7FF",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 5,
    marginBottom: 48
  },
  loadingRow: {
    minHeight: 54,
    borderRadius: radius.button,
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  loadingText: {
    color: colors.textMuted,
    fontWeight: "800"
  },
  errorBox: {
    width: "100%",
    maxWidth: 360,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#F0C7C5",
    padding: 16,
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start"
  },
  errorText: {
    flex: 1,
    color: colors.danger,
    fontWeight: "700",
    lineHeight: 20
  }
});
