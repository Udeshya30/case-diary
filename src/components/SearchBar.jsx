import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { styles } from "./SearchBar.styles";

export function SearchBar({ value, onChangeText, placeholder = "Search", style }) {
  return (
    <View style={[styles.wrap, style]}>
      <Ionicons name="search" size={20} color={colors.textMuted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
}
