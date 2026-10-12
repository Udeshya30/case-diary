import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";
import { theme } from "../theme/theme";

export const styles = StyleSheet.create({
  card: {
    minHeight: 132,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    ...theme.shadow
  },
  pressed: { opacity: 0.86 },
  accent: { width: 5, alignSelf: "stretch" },
  content: { flex: 1, padding: 16 },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  courtWrap: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6 },
  court: { flex: 1, color: colors.textMuted, fontWeight: "800" },
  caseNumber: { color: colors.navy, fontWeight: "900", fontSize: 18, marginTop: 8 },
  party: { color: colors.text, fontWeight: "700", marginTop: 5, lineHeight: 20 },
  meta: { flexDirection: "row", flexWrap: "wrap", gap: 9, marginTop: 12 },
  metaItem: {
    minHeight: 26,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 9,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt
  },
  metaText: { color: colors.textMuted, fontSize: 12, fontWeight: "700" }
});
