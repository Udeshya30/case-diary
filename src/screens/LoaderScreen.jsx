import { ActivityIndicator, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { styles } from "./LoaderScreen.styles";

export function LoaderScreen({ error }) {
  return (
    <View style={styles.safe}>
      <View style={styles.backgroundBand} />
      <View style={styles.content}>
        <View style={styles.mark}>
          <Ionicons name="briefcase-outline" size={34} color={colors.white} />
        </View>
        <Text style={styles.title}>Case Diary</Text>
        <Text style={styles.subtitle}>Your Offline Legal Diary</Text>
        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="warning-outline" size={20} color={colors.danger} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.loadingText}>Preparing local diary</Text>
          </View>
        )}
      </View>
    </View>
  );
}
