import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, statusColors } from "../theme/colors";
import { styles } from "./CaseDocketRow.styles";

const monthLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export function CaseDocketRow({ item, onPress }) {
  const dateParts = (item.effective_next_date ?? item.updated_at.slice(0, 10)).split("-");
  const day = dateParts[2] ?? "--";
  const monthIndex = Number(dateParts[1]) - 1;
  const month = monthLabels[monthIndex] ?? "--";
  const status = statusColors[item.status] ?? statusColors.Active;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.dateBlock}>
        <Text style={styles.dateDay}>{day}</Text>
        <Text style={styles.dateMonth}>{month}</Text>
      </View>
      <View style={[styles.statusRail, { backgroundColor: status.accent }]} />
      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={styles.caseNumber} numberOfLines={1}>{item.case_number}</Text>
          <View style={[styles.status, { backgroundColor: status.bg }]}>
            <Text style={[styles.statusText, { color: status.fg }]}>{item.status}</Text>
          </View>
        </View>
        <Text style={styles.party} numberOfLines={1}>{item.party_name}</Text>
        <View style={styles.courtRow}>
          <Ionicons name="business-outline" size={13} color={colors.textMuted} />
          <Text style={styles.court} numberOfLines={1}>{item.court_name}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={19} color={colors.disabled} />
    </Pressable>
  );
}
