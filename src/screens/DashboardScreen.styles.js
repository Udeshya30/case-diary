import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";
import { theme } from "../theme/theme";

export const styles = StyleSheet.create({
  content: {
    paddingBottom: 122
  },
  hero: {
    minHeight: 188,
    borderRadius: 28,
    backgroundColor: colors.navy,
    padding: 20,
    marginBottom: 16,
    overflow: "hidden"
  },
  heroGlow: {
    position: "absolute",
    right: -56,
    top: -62,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "rgba(36, 87, 214, 0.62)"
  },
  heroCircleOne: {
    position: "absolute",
    left: 24,
    bottom: 30,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.18)"
  },
  heroCircleTwo: {
    position: "absolute",
    right: 104,
    top: 58,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(191, 211, 255, 0.22)"
  },
  heroCircleThree: {
    position: "absolute",
    right: 46,
    bottom: 52,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(255, 255, 255, 0.12)"
  },
  heroAccentPill: {
    position: "absolute",
    left: -20,
    top: 92,
    width: 96,
    height: 20,
    borderRadius: 999,
    backgroundColor: "rgba(15, 139, 141, 0.28)",
    transform: [{ rotate: "-18deg" }]
  },
  heroAccentDot: {
    position: "absolute",
    right: 128,
    bottom: 24,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.22)"
  },
  heroGavelMark: {
    position: "absolute",
    right: -12,
    bottom: -18,
    opacity: 0.08
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12
  },
  logo: { color: colors.white, fontSize: 31, fontWeight: "900" },
  tagline: { color: "#BFD3FF", fontWeight: "700", marginTop: 4 },
  headerIcons: { flexDirection: "row", gap: 10 },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.16)"
  },
  heroBottom: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 30
  },
  heroNumber: {
    color: colors.white,
    fontSize: 46,
    fontWeight: "900"
  },
  heroCaption: {
    color: "#C7D7FF",
    fontWeight: "800",
    marginTop: 2
  },
  heroActionHit: {
    width: 66,
    height: 66,
    alignItems: "center",
    justifyContent: "center"
  },
  heroAction: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 7
  },
  heroActionText: {
    color: colors.primary,
    fontWeight: "900"
  },
  casesHeader: {
    marginTop: 6,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  casesHeaderCopy: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    flexWrap: "wrap"
  },
  casesHeaderPill: {
    minHeight: 32,
    borderRadius: 999,
    backgroundColor: "#EAF0FF",
    borderWidth: 1,
    borderColor: "#D7E2FF",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  casesHeaderPillText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "900"
  },
  casesHeaderTitle: {
    color: colors.navy,
    fontSize: 17,
    fontWeight: "900"
  },
  todayReset: {
    minHeight: 28,
    borderRadius: 999,
    backgroundColor: "#E9F7F4",
    borderWidth: 1,
    borderColor: "#BFE7DF",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  todayResetPressed: {
    opacity: 0.75
  },
  todayResetText: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "900"
  },
  calendarMark: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  calendarMarkPressed: {
    opacity: 0.78
  },
  calendarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 96,
    zIndex: 20
  },
  calendarBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent"
  },
  calendarOverlayPanel: {
    position: "absolute",
    top: 250,
    left: 18,
    right: 18
  },
  calendarPicker: {
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 14,
    overflow: "hidden",
    ...theme.shadow
  },
  calendarTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11
  },
  calendarTopActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7
  },
  monthButton: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center"
  },
  monthTitle: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "900"
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 7
  },
  weekLabel: {
    width: "14.285%",
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "900"
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  dayCell: {
    width: "14.285%",
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12
  },
  dayCellMuted: {
    opacity: 0.42
  },
  dayCellHasCase: {
    backgroundColor: "#EAF0FF"
  },
  dayCellSelected: {
    backgroundColor: colors.primary
  },
  dayText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900"
  },
  dayTextMuted: {
    color: colors.textMuted
  },
  dayTextHasCase: {
    color: colors.primary
  },
  dayTextSelected: {
    color: colors.white
  },
  dayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 3,
    backgroundColor: "transparent"
  },
  dayDotActive: {
    backgroundColor: colors.primary
  },
  dayDotToday: {
    backgroundColor: colors.secondary
  },
  dayDotSelected: {
    backgroundColor: colors.white
  }
});
