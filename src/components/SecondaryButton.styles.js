import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";

export const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16
  },
  danger: {
    borderColor: "#F0C7C5",
    backgroundColor: "#FFF6F5"
  },
  disabled: {
    opacity: 0.5
  },
  pressed: {
    opacity: 0.78
  },
  text: {
    color: colors.primary,
    fontWeight: "800",
    fontSize: 15
  },
  dangerText: {
    color: colors.danger
  }
});
