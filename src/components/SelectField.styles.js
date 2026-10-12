import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";

export const styles = StyleSheet.create({
  wrap: { gap: 7 },
  label: { color: colors.text, fontWeight: "800", fontSize: 13 },
  input: {
    minHeight: 48,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  value: { color: colors.text, fontSize: 15, fontWeight: "700" },
  error: { color: colors.danger, fontSize: 12 },
  backdrop: { flex: 1, backgroundColor: "rgba(11,31,58,0.32)", justifyContent: "flex-end" },
  sheet: { backgroundColor: colors.surface, padding: 18, borderTopLeftRadius: 22, borderTopRightRadius: 22 },
  sheetTitle: { fontSize: 17, fontWeight: "900", color: colors.navy, marginBottom: 8 },
  option: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border
  },
  optionText: { color: colors.text, fontSize: 15, fontWeight: "700" }
});
