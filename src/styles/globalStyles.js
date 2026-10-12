import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const screenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: 18, paddingBottom: 28 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  title: { color: colors.navy, fontSize: 28, fontWeight: "900" },
  subtitle: { color: colors.textMuted, marginTop: 2, fontWeight: "700" },
  fieldGap: { gap: 14 },
  inputLabel: { color: colors.text, fontWeight: "800", fontSize: 13, marginBottom: 7 },
  input: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    color: colors.text,
    fontSize: 15
  },
  textArea: { minHeight: 92, textAlignVertical: "top", paddingTop: 12 },
  error: { color: colors.danger, fontSize: 12, marginTop: 5 },
  card: { backgroundColor: colors.surface, borderRadius: 18, padding: 16 },
  pillRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 }
});
