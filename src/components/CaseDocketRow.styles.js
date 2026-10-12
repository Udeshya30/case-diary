import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";
import { theme } from "../theme/theme";

export const styles = StyleSheet.create({
  row: {
    minHeight: 102,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
    paddingRight: 12,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...theme.shadow
  },
  pressed: {
    opacity: 0.88
  },
  dateBlock: {
    width: 62,
    alignSelf: "stretch",
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center"
  },
  dateDay: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "900"
  },
  dateMonth: {
    color: "#C7D7FF",
    fontSize: 12,
    fontWeight: "900",
    marginTop: 2
  },
  statusRail: {
    width: 4,
    height: 58,
    borderRadius: 999
  },
  body: {
    flex: 1,
    paddingVertical: 13
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  caseNumber: {
    flex: 1,
    color: colors.navy,
    fontSize: 17,
    fontWeight: "900"
  },
  status: {
    minHeight: 24,
    paddingHorizontal: 9,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center"
  },
  statusText: {
    fontSize: 11,
    fontWeight: "900"
  },
  party: {
    color: colors.text,
    fontWeight: "800",
    marginTop: 6
  },
  courtRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8
  },
  court: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "800"
  }
});
