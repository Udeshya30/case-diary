import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { styles } from "./SecondaryButton.styles";

export function SecondaryButton({ title, onPress, disabled, danger, style, icon }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, danger && styles.danger, disabled && styles.disabled, pressed && styles.pressed, style]}
    >
      {icon ? <Ionicons name={icon} size={18} color={danger ? colors.danger : colors.primary} /> : null}
      <Text style={[styles.text, danger && styles.dangerText]}>{title}</Text>
    </Pressable>
  );
}
