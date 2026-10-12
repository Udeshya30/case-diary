import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";
import { theme } from "../theme/theme";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 104,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E8EEF5",
    ...theme.shadow
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 15,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  value: {
    color: colors.navy,
    fontWeight: "900",
    fontSize: 28
  },
  label: {
    color: colors.textMuted,
    fontWeight: "800",
    fontSize: 12,
    marginTop: 2
  }
});
