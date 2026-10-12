import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { colors } from "../theme/colors";
import { styles } from "./EmptyState.styles";

export function EmptyState({ title, message, icon = "folder-open-outline" }) {
  return (
    <View style={styles.wrap}>
      {icon === "court" ? <IndianCourtIcon /> : <Ionicons name={icon} size={34} color={colors.textMuted} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

function IndianCourtIcon() {
  return (
    <Svg width="118" height="82" viewBox="0 0 240 150">
      <Circle cx="120" cy="70" r="58" fill="#EAF0FF" />
      <Path d="M72 58 L120 30 L168 58 Z" fill="#2457D6" opacity="0.12" />
      <Rect x="76" y="58" width="88" height="12" rx="3" fill="#0B1F3A" opacity="0.12" />
      <Rect x="82" y="116" width="76" height="10" rx="3" fill="#0B1F3A" opacity="0.12" />
      <Rect x="70" y="126" width="100" height="8" rx="3" fill="#0B1F3A" opacity="0.1" />
      {[86, 108, 130, 152].map((x) => (
        <Path key={x} d={`M${x} 72 H${x + 10} L${x + 8} 116 H${x + 2} Z`} fill="#0B1F3A" opacity="0.11" />
      ))}
      <Path d="M72 60 C94 52 146 52 168 60" stroke="#FF9933" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <Path d="M76 136 C98 142 142 142 164 136" stroke="#138808" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      <Circle cx="120" cy="48" r="7" fill="#2457D6" opacity="0.16" />
    </Svg>
  );
}
