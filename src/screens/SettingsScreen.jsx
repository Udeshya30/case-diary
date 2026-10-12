import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { clearDatabase } from "../database/database";
import { exportCasesCsv, pickAndImportCasesFile } from "../services/backupService";
import { useAppStore } from "../store/appStore";
import { colors } from "../theme/colors";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { screenStyles } from "../styles/globalStyles";
import { styles } from "./SettingsScreen.styles";

export function SettingsScreen() {
  const lookaheadDays = useAppStore((state) => state.lookaheadDays);
  const setLookaheadDays = useAppStore((state) => state.setLookaheadDays);
  const bumpRefresh = useAppStore((state) => state.bumpRefresh);
  const profileName = useAppStore((state) => state.profile.name);
  const [clearOpen, setClearOpen] = useState(false);
  const [notice, setNotice] = useState(null);
  const [importing, setImporting] = useState(false);
  const [customLookahead, setCustomLookahead] = useState(String(lookaheadDays));
  const noticeTimer = useRef(null);

  useEffect(() => {
    setCustomLookahead(String(lookaheadDays));
  }, [lookaheadDays]);

  useEffect(() => () => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
  }, []);

  const showNotice = (text, type = "success") => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    setNotice({ text, type });
    noticeTimer.current = setTimeout(() => setNotice(null), 2600);
  };

  const clearAll = async () => {
    await clearDatabase();
    bumpRefresh();
    setClearOpen(false);
    showNotice("All local data cleared");
  };

  const exportCsv = async () => {
    try {
      await exportCasesCsv();
      showNotice("CSV exported");
    } catch (error) {
      if (__DEV__) console.error(error);
      showNotice("Export failed", "error");
    }
  };

  const importFile = async () => {
    setImporting(true);
    try {
      const result = await pickAndImportCasesFile();
      if (result.canceled) return;
      bumpRefresh();
      showNotice(`${result.count} ${result.count === 1 ? "case" : "cases"} imported`);
    } catch (error) {
      if (__DEV__) console.error(error);
      showNotice("Import failed", "error");
    } finally {
      setImporting(false);
    }
  };

  const updateCustomLookahead = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 3);
    setCustomLookahead(digits);
    const nextValue = Number(digits);
    if (nextValue > 0) setLookaheadDays(Math.min(nextValue, 999));
  };

  return (
    <SafeAreaView style={screenStyles.safe}>
      <ScrollView contentContainerStyle={[screenStyles.content, styles.content]}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name="settings-outline" size={24} color={colors.primary} />
          </View>
          <View style={styles.headerCopy}>
            <Text style={screenStyles.title}>Settings</Text>
            <Text style={screenStyles.subtitle}>Local data, backups, and schedule preferences</Text>
          </View>
          <View style={styles.headerMark}>
            <Ionicons name="shield-checkmark-outline" size={21} color={colors.primary} />
          </View>
        </View>

        <SettingCard title="General" icon="options-outline">
          <View style={styles.lookaheadSimpleRow}>
            <View style={styles.lookaheadSimpleCopy}>
              <Text style={styles.label}>Upcoming Window</Text>
              <Text style={styles.helperText}>Max 999 days</Text>
            </View>
            <View style={styles.customInputRow}>
              <TextInput
                value={customLookahead}
                onChangeText={updateCustomLookahead}
                keyboardType="number-pad"
                maxLength={3}
                placeholder="999"
                placeholderTextColor={colors.textMuted}
                style={styles.customInput}
              />
              <Text style={styles.customSuffix}>days</Text>
            </View>
          </View>
        </SettingCard>

        <SettingCard title="Data" icon="server-outline">
          <View style={styles.actionStack}>
            <SettingsAction
              icon="download-outline"
              title="Export Cases"
              onPress={exportCsv}
            />
            <SettingsAction
              icon="cloud-upload-outline"
              title={importing ? "Importing..." : "Import Cases"}
              onPress={importFile}
              disabled={importing}
            />
            <SettingsAction
              icon="trash-outline"
              title="Clear All Data"
              onPress={() => setClearOpen(true)}
              danger
            />
          </View>
        </SettingCard>

        <SettingCard title="About" icon="information-circle-outline">
          <View style={styles.aboutContent}>
            <View style={styles.aboutCopy}>
              <View style={styles.aboutTop}>
                <View style={styles.appNameRow}>
                  <Text style={styles.appName}>Case Diary</Text>
                  <Text style={styles.version}>v1.0.0</Text>
                </View>
                <Ionicons name="briefcase-outline" size={18} color={colors.primary} />
              </View>
              <Text style={styles.muted}>Offline Legal Diary</Text>
              <Text style={styles.aboutDescription}>
                Case Diary is a simple offline legal diary for managing cases, tracking important dates,
                and keeping notes in one place without needing a backend or cloud service.
              </Text>
              <View style={styles.priorityRow}>
                <Text style={styles.priorityText}>Most important: stay on top of hearings, next steps, and case updates.</Text>
              </View>
              <View style={styles.builderRow}>
                <Ionicons name="hammer-outline" size={14} color={colors.textMuted} />
                <Text style={styles.builderText}>Built by Udeshya kumar</Text>
              </View>
            </View>
          </View>
        </SettingCard>
      </ScrollView>
      <ConfirmDialog
        visible={clearOpen}
        title="Clear all data?"
        message="Deletes every case and diary entry on this device."
        confirmLabel="Clear"
        danger
        onCancel={() => setClearOpen(false)}
        onConfirm={clearAll}
      />
      {notice ? <Notice message={notice.text} type={notice.type} /> : null}
    </SafeAreaView>
  );
}

function SettingCard({ title, icon, children }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTitle}>
        <Ionicons name={icon} size={20} color={colors.primary} />
        <Text style={styles.cardTitleText}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function SettingsAction({ icon, title, onPress, danger, disabled }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionCard,
        danger && styles.actionCardDanger,
        disabled && styles.actionCardDisabled,
        pressed && styles.actionCardPressed
      ]}
    >
      <Ionicons name={icon} size={24} color={danger ? colors.danger : colors.primary} />
    </Pressable>
  );
}

function Notice({ message, type }) {
  const success = type !== "error";

  return (
    <View style={[styles.notice, !success && styles.noticeError]}>
      <View style={[styles.noticeIcon, !success && styles.noticeIconError]}>
        <Ionicons name={success ? "checkmark" : "alert"} size={18} color={success ? colors.success : colors.danger} />
      </View>
      <Text style={[styles.noticeText, !success && styles.noticeTextError]}>{message}</Text>
    </View>
  );
}
