import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { DIARY_ACTIVITIES } from "../constants/appConstants";
import { getDiaryEntryById } from "../database/diaryRepository";
import { saveDiaryEntryWithOptionalNext, updateDiaryEntry } from "../services/diaryService";
import { useAppStore } from "../store/appStore";
import { colors } from "../theme/colors";
import { todayDate } from "../utils/dateUtils";
import { validateDiaryDraft } from "../utils/validation";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { DatePickerField } from "../components/DatePickerField";
import { PrimaryButton } from "../components/PrimaryButton";
import { SecondaryButton } from "../components/SecondaryButton";
import { SelectField } from "../components/SelectField";
import { screenStyles } from "../styles/globalStyles";
import { styles } from "./DiaryEntryScreen.styles";

export function DiaryEntryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const bumpRefresh = useAppStore((state) => state.bumpRefresh);
  const [draft, setDraft] = useState({ case_id: route.params.caseId, entry_date: todayDate(), activity: "Hearing", notes: "", next_date: null });
  const [errors, setErrors] = useState({});
  const [activityOpen, setActivityOpen] = useState(false);
  const [confirmNext, setConfirmNext] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!route.params.entryId) return;
    getDiaryEntryById(route.params.entryId).then((entry) => {
      if (!entry) return;
      setDraft({ case_id: entry.case_id, entry_date: entry.entry_date, activity: entry.activity, notes: entry.notes ?? "", next_date: entry.next_date });
    });
  }, [route.params.entryId]);

  const patch = (value) => setDraft((current) => ({ ...current, ...value }));

  const save = async (createNext) => {
    const validation = validateDiaryDraft(draft);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    setSaving(true);
    try {
      if (route.params.entryId) {
        await updateDiaryEntry(route.params.entryId, draft);
      } else {
        await saveDiaryEntryWithOptionalNext(draft, createNext);
      }
      bumpRefresh();
      navigation.goBack();
    } catch (error) {
      if (__DEV__) console.error(error);
      setErrors({ activity: "Unable to save diary entry. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const submit = () => {
    if (!route.params.entryId && draft.next_date) {
      setConfirmNext(true);
      return;
    }
    void save(false);
  };

  return (
    <SafeAreaView style={screenStyles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={[screenStyles.content, styles.content]} keyboardShouldPersistTaps="handled">
          <View style={styles.hero}>
            <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={20} color={colors.white} />
            </Pressable>
            <View style={styles.heroIcon}>
              <Ionicons name={route.params.entryId ? "create-outline" : "journal-outline"} size={25} color={colors.white} />
            </View>
            <View style={styles.heroCopy}>
              <Text style={styles.heroTitle}>{route.params.entryId ? "Edit Diary Entry" : "Add Diary Entry"}</Text>
              <Text style={styles.heroSubtitle}>Record hearing notes and next dates</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <DatePickerField label="Entry Date" value={draft.entry_date} onChange={(entry_date) => entry_date && patch({ entry_date })} error={errors.entry_date} />
            <SelectField label="Activity" value={DIARY_ACTIVITIES.includes(draft.activity) ? draft.activity : "Other"} options={DIARY_ACTIVITIES} visible={activityOpen} onOpen={() => setActivityOpen(true)} onClose={() => setActivityOpen(false)} onChange={(activity) => patch({ activity })} error={errors.activity} />
            <View>
              <Text style={screenStyles.inputLabel}>Custom Activity</Text>
              <TextInput value={draft.activity} onChangeText={(activity) => patch({ activity })} style={screenStyles.input} placeholderTextColor={colors.textMuted} />
            </View>
            <View>
              <Text style={screenStyles.inputLabel}>Notes</Text>
              <TextInput value={draft.notes ?? ""} onChangeText={(notes) => patch({ notes })} multiline style={[screenStyles.input, screenStyles.textArea]} placeholderTextColor={colors.textMuted} />
            </View>
            <DatePickerField label="Next Date" value={draft.next_date ?? null} optional onChange={(next_date) => patch({ next_date })} />
            <View style={styles.actions}>
              <SecondaryButton title="Cancel" icon="close-outline" onPress={() => navigation.goBack()} style={{ flex: 1 }} />
              <PrimaryButton title={saving ? "Saving..." : "Save"} icon="checkmark-circle-outline" onPress={submit} disabled={saving} style={{ flex: 1 }} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ConfirmDialog
        visible={confirmNext}
        title="Create next diary entry?"
        message="A future timeline entry will be created for the selected next date."
        confirmLabel="Create"
        onCancel={() => { setConfirmNext(false); void save(false); }}
        onConfirm={() => { setConfirmNext(false); void save(true); }}
      />
    </SafeAreaView>
  );
}
