import { Text, View } from "react-native";
import { statusColors } from "../theme/colors";
import { styles } from "./StatusBadge.styles";

export function StatusBadge({ status }) {
  const palette = statusColors[status];
  return (
    <View style={[styles.badge, { backgroundColor: palette.bg }]}>
      <Text style={[styles.text, { color: palette.fg }]}>{status}</Text>
    </View>
  );
}
