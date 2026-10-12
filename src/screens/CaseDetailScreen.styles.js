import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { radius } from "../theme/radius";
import { spacing } from "../theme/spacing";
import { theme } from "../theme/theme";

export const styles = StyleSheet.create({
  content: {
    paddingBottom: 122
  },
  headerTitle: { color: colors.navy, fontWeight: "900", fontSize: 18 },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadow
  },
  heroCard: {
    minHeight: 188,
    backgroundColor: colors.navy,
    borderRadius: 26,
    padding: spacing.lg,
    overflow: "hidden"
  },
  heroGavelMark: {
    position: "absolute",
    right: -12,
    bottom: -18,
    opacity: 0.08,
    transform: [{ rotate: "-14deg" }]
  },
  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg
  },
  heroIcon: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  caseNumber: { color: colors.white, fontSize: 25, fontWeight: "900" },
  partyName: { color: "#C7D7FF", fontWeight: "800", lineHeight: 21, marginTop: 6 },
  courtLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: spacing.lg
  },
  courtName: { color: colors.white, fontWeight: "800", flex: 1 },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border
  },
  sectionTitle: {
    color: colors.navy,
    fontWeight: "900",
    fontSize: 17,
    marginBottom: 12
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
    marginBottom: 12
  },
  metricCard: {
    width: "48%",
    marginHorizontal: "1%",
    marginBottom: 10,
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12
  },
  metricContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  metricTextWrap: {
    flex: 1,
    minWidth: 0
  },
  metricIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center"
  },
  metricLabel: {
    color: colors.textMuted,
    fontWeight: "800",
    fontSize: 11,
    marginBottom: 4
  },
  metricValue: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 13,
    lineHeight: 18
  },
  infoNoteCard: {
    backgroundColor: "#F7FAFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDE8FF",
    padding: 12
  },
  infoNoteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8
  },
  infoNoteTitle: {
    color: colors.primary,
    fontWeight: "900",
    fontSize: 12
  },
  infoNoteText: {
    color: colors.text,
    fontWeight: "700",
    lineHeight: 20
  },
  info: { flex: 1, marginTop: 12 },
  infoLabelRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  infoLabel: { color: colors.textMuted, fontWeight: "800", fontSize: 12 },
  infoValue: { color: colors.text, fontWeight: "700", marginTop: 5, lineHeight: 20 },
  twoCol: { flexDirection: "row", gap: 20 },
  actions: { flexDirection: "row", gap: 10, marginTop: 14 },
  actionButton: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 8
  },
  timelineHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 14
  },
  timelineTitle: { color: colors.navy, fontSize: 20, fontWeight: "900" },
  timelineSubtitle: { color: colors.textMuted, fontSize: 12, fontWeight: "800", marginTop: 2 }
});
