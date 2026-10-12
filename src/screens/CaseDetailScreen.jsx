import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { deleteCase, getCaseById } from "../database/caseRepository";
import { deleteDiaryEntry, getDiaryEntriesForCase } from "../database/diaryRepository";
import { useAppStore } from "../store/appStore";
import { colors } from "../theme/colors";
import { formatDate } from "../utils/dateUtils";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { EmptyState } from "../components/EmptyState";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";
import { StatusBadge } from "../components/StatusBadge";
import { TimelineItem } from "../components/TimelineItem";
import { screenStyles } from "../styles/globalStyles";
import { styles } from "./CaseDetailScreen.styles";

export function CaseDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const bumpRefresh = useAppStore((state) => state.bumpRefresh);
  const [item, setItem] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteEntryId, setDeleteEntryId] = useState(null);
  const [deleteCaseOpen, setDeleteCaseOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [caseItem, diary] = await Promise.all([getCaseById(route.params.caseId), getDiaryEntriesForCase(route.params.caseId)]);
      setItem(caseItem);
      setEntries(diary);
    } catch (error) {
      if (__DEV__) console.error(error);
    } finally {
      setLoading(false);
    }
  }, [route.params.caseId]);

  useFocusEffect(useCallback(() => { void load(); }, [load]));

  const confirmDeleteEntry = async () => {
    if (!deleteEntryId) return;
    await deleteDiaryEntry(deleteEntryId);
    setDeleteEntryId(null);
    bumpRefresh();
    await load();
  };

  const confirmDeleteCase = async () => {
    await deleteCase(route.params.caseId);
    setDeleteCaseOpen(false);
    bumpRefresh();
    navigation.navigate("MainTabs", { screen: "All Cases" });
  };

  if (loading) {
    return <SafeAreaView style={screenStyles.safe}><ActivityIndicator style={{ marginTop: 60 }} color={colors.primary} /></SafeAreaView>;
  }

  if (!item) {
    return <SafeAreaView style={screenStyles.safe}><EmptyState title="Case not found" message="This case may have been deleted." /></SafeAreaView>;
  }

  return (
    <SafeAreaView style={screenStyles.safe}>
      <ScrollView contentContainerStyle={[screenStyles.content, styles.content]}>
        <View style={screenStyles.headerRow}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={10} style={styles.headerButton}>
            <Ionicons name="arrow-back" size={22} color={colors.navy} />
          </Pressable>
          <Text style={styles.headerTitle}>Case Details</Text>
          <Pressable onPress={() => setDeleteCaseOpen(true)} hitSlop={10} style={styles.headerButton}>
            <Ionicons name="trash-outline" size={20} color={colors.danger} />
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <FontAwesome5 name="gavel" size={92} color={colors.white} style={styles.heroGavelMark} />
          <View style={styles.heroTop}>
            <View style={styles.heroIcon}>
              <Ionicons name="briefcase-outline" size={24} color={colors.white} />
            </View>
            <StatusBadge status={item.status} />
          </View>
          <Text style={styles.caseNumber}>{item.case_number}</Text>
          <Text style={styles.partyName}>{item.party_name}</Text>
          <View style={styles.courtLine}>
            <Ionicons name="business-outline" size={15} color="#C7D7FF" />
            <Text style={styles.courtName}>{item.court_name}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <SecondaryButton title="Edit" icon="create-outline" onPress={() => navigation.navigate("EditCase", { caseId: item.id })} style={styles.actionButton} />
          <PrimaryButton title="Add Entry" icon="journal-outline" onPress={() => navigation.navigate("DiaryEntry", { caseId: item.id })} style={styles.actionButton} />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Case overview</Text>
          <View style={styles.statsGrid}>
            <MetricCard icon="document-text-outline" label="Case no." value={item.case_number} />
            <MetricCard icon="business-outline" label="Court" value={item.court_name} />
            <MetricCard icon="calendar-outline" label="Created" value={formatDate(item.created_at.slice(0, 10))} />
            <MetricCard icon="refresh-outline" label="Updated" value={formatDate(item.updated_at.slice(0, 10))} />
          </View>

          <View style={styles.infoNoteCard}>
            <View style={styles.infoNoteHeader}>
              <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
              <Text style={styles.infoNoteTitle}>Case info</Text>
            </View>
            <Text style={styles.infoNoteText}>{item.info || "No additional information"}</Text>
          </View>
        </View>

        <View style={styles.timelineHeader}>
          <View>
            <Text style={styles.timelineTitle}>Timeline</Text>
            <Text style={styles.timelineSubtitle}>{entries.length} {entries.length === 1 ? "entry" : "entries"}</Text>
          </View>
          <Ionicons name="git-branch-outline" size={22} color={colors.primary} />
        </View>
        {entries.length === 0 ? <EmptyState title="No timeline yet" message="Add a diary entry to start the case history." icon="git-branch-outline" /> : null}
        {entries.map((entry, index) => (
          <TimelineItem
            key={entry.id}
            item={entry}
            isLast={index === entries.length - 1}
            onEdit={() => navigation.navigate("DiaryEntry", { caseId: item.id, entryId: entry.id })}
            onDelete={() => setDeleteEntryId(entry.id)}
          />
        ))}
      </ScrollView>

      <ConfirmDialog
        visible={deleteEntryId !== null}
        title="Delete diary entry?"
        message="This will permanently remove this timeline entry from this device."
        confirmLabel="Delete"
        danger
        onCancel={() => setDeleteEntryId(null)}
        onConfirm={confirmDeleteEntry}
      />
      <ConfirmDialog
        visible={deleteCaseOpen}
        title="Delete case?"
        message="This will permanently delete the case and all diary entries from this device."
        confirmLabel="Delete Case"
        danger
        onCancel={() => setDeleteCaseOpen(false)}
        onConfirm={confirmDeleteCase}
      />
    </SafeAreaView>
  );
}

function MetricCard({ icon, label, value }) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricContent}>
        <View style={styles.metricTextWrap}>
          <Text style={styles.metricLabel}>{label}</Text>
          <Text style={styles.metricValue}>{value}</Text>
        </View>
        <View style={styles.metricIconWrap}>
          <Ionicons name={icon} size={14} color={colors.primary} />
        </View>
      </View>
    </View>
  );
}

function Info({ icon, label, value }) {
  return (
    <View style={styles.info}>
      <View style={styles.infoLabelRow}>
        {icon ? <Ionicons name={icon} size={14} color={colors.textMuted} /> : null}
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}
