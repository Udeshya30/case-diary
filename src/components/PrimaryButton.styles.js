import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";

export const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: radius.button,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 18
  },
  disabled: {
    backgroundColor: colors.disabled
  },
  pressed: {
    opacity: 0.88
  },
  text: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 15
  }
});
