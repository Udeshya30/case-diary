import { Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";
import { styles } from "./ConfirmDialog.styles";

export function ConfirmDialog({ visible, title, message, confirmLabel, danger, onCancel, onConfirm }) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.card}>
          <View style={styles.header}>
            <View style={[styles.icon, danger && styles.iconDanger]}>
              <Ionicons name={danger ? "trash-outline" : "help-circle-outline"} size={22} color={danger ? colors.danger : colors.primary} />
            </View>
            <View style={styles.copy}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>
            </View>
          </View>
          <View style={styles.actions}>
            <SecondaryButton title="Cancel" onPress={onCancel} style={styles.action} />
            {danger ? (
              <SecondaryButton title={confirmLabel} onPress={onConfirm} danger style={styles.action} />
            ) : (
              <PrimaryButton title={confirmLabel} onPress={onConfirm} style={styles.action} />
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
