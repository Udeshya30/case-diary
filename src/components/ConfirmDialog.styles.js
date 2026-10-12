import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";

export const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(11,31,58,0.34)", alignItems: "center", justifyContent: "center", padding: 24 },
  card: { width: "100%", maxWidth: 380, backgroundColor: colors.surface, borderRadius: 22, padding: 18 },
  header: { flexDirection: "row", gap: 12 },
  icon: { width: 44, height: 44, borderRadius: 16, backgroundColor: "#EAF0FF", alignItems: "center", justifyContent: "center" },
  iconDanger: { backgroundColor: "#FFF1F1" },
  copy: { flex: 1 },
  title: { fontSize: 18, fontWeight: "900", color: colors.navy },
  message: { color: colors.textMuted, lineHeight: 20, marginTop: 5, fontWeight: "700" },
  actions: { flexDirection: "row", gap: 10, marginTop: 18 },
  action: { flex: 1 }
});
