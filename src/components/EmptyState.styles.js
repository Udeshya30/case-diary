import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 42,
    paddingHorizontal: 24
  },
  title: {
    color: colors.text,
    fontWeight: "900",
    fontSize: 17,
    marginTop: 12
  },
  message: {
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 4,
    lineHeight: 20
  }
});
