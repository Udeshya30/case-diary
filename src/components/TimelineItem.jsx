import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { formatDate } from "../utils/dateUtils";
import { styles } from "./TimelineItem.styles";

export function TimelineItem({ item, isLast, onEdit, onDelete }) {
  return (
    <View style={styles.row}>
      <View style={styles.lineCol}>
        <View style={styles.dot} />
        {!isLast ? <View style={styles.line} /> : null}
      </View>
      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={styles.date}>{formatDate(item.entry_date)}</Text>
          <View style={styles.actions}>
            <Pressable onPress={onEdit} hitSlop={10}>
              <Ionicons name="create-outline" size={20} color={colors.primary} />
            </Pressable>
            <Pressable onPress={onDelete} hitSlop={10}>
              <Ionicons name="trash-outline" size={20} color={colors.danger} />
            </Pressable>
          </View>
        </View>
        <Text style={styles.activity}>{item.activity}</Text>
        {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
        {item.next_date ? <Text style={styles.next}>Next: {formatDate(item.next_date)}</Text> : null}
      </View>
    </View>
  );
}
