import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const styles = StyleSheet.create({
  shell: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    justifyContent: "flex-end"
  },
  shadow: {
    height: 86,
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 22,
    elevation: 16
  },
  svg: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0
  },
  tabs: {
    height: 86,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 10
  },
  tab: {
    flex: 1,
    height: 68,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 1
  },
  activeBubble: {
    position: "absolute",
    top: 8,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.11,
    shadowRadius: 12,
    elevation: 10
  },
  activeIcon: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  inactiveIcon: {
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2
  },
  label: {
    maxWidth: 68,
    color: colors.disabled,
    fontSize: 10,
    fontWeight: "900",
    lineHeight: 13,
    textAlign: "center"
  },
  labelActive: {
    color: colors.primary
  }
});
