import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, statusColors } from "../theme/colors";
import { formatDate } from "../utils/dateUtils";
import { StatusBadge } from "./StatusBadge";
import { styles } from "./CaseCard.styles";

export function CaseCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={[styles.accent, { backgroundColor: statusColors[item.status].accent }]} />
      <View style={styles.content}>
        <View style={styles.top}>
          <View style={styles.courtWrap}>
            <Ionicons name="business-outline" size={14} color={colors.textMuted} />
            <Text style={styles.court} numberOfLines={1}>{item.court_name}</Text>
          </View>
          <StatusBadge status={item.status} />
        </View>
        <Text style={styles.caseNumber}>{item.case_number}</Text>
        <Text style={styles.party} numberOfLines={2}>{item.party_name}</Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={13} color={colors.primary} />
            <Text style={styles.metaText}>Next: {formatDate(item.effective_next_date)}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="refresh-outline" size={13} color={colors.textMuted} />
            <Text style={styles.metaText}>Updated: {formatDate(item.updated_at.slice(0, 10))}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </Pressable>
  );
}
