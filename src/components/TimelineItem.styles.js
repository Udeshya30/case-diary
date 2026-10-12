import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";

export const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12 },
  lineCol: { width: 18, alignItems: "center" },
  dot: { width: 13, height: 13, borderRadius: 7, backgroundColor: colors.primary, marginTop: 5 },
  line: { flex: 1, width: 2, backgroundColor: colors.border, marginVertical: 4 },
  body: {
    flex: 1,
    padding: 14,
    paddingBottom: 16,
    marginBottom: 12,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  top: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  date: { color: colors.textMuted, fontWeight: "800" },
  actions: { flexDirection: "row", gap: 14 },
  activity: { color: colors.navy, fontSize: 17, fontWeight: "900", marginTop: 4 },
  notes: { color: colors.text, lineHeight: 21, marginTop: 5 },
  next: { color: colors.primary, fontWeight: "800", marginTop: 8 }
});
