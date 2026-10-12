import { useCallback, useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { CASE_STATUSES } from "../constants/appConstants";
import { getCaseById, getCourtNameSuggestions, updateCase } from "../database/caseRepository";
import { createCaseWithInitialEntry } from "../services/caseService";
import { parseSmartPaste } from "../services/smartPasteService";
import { useAppStore } from "../store/appStore";
import { colors } from "../theme/colors";
import { todayDate } from "../utils/dateUtils";
import { validateCaseDraft } from "../utils/validation";
import { DatePickerField } from "../components/DatePickerField";
import { PrimaryButton } from "../components/PrimaryButton";
import { SelectField } from "../components/SelectField";
import { screenStyles } from "../styles/globalStyles";
import { styles } from "./AddCaseScreen.styles";

const emptyDraft = () => ({
  court_name: "",
  case_number: "",
  first_party: "",
  second_party: "",
  status: "Active",
  info: "",
  start_date: todayDate(),
  next_date: null
});

export function AddCaseScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const editCaseId = route.name === "EditCase" ? route.params?.caseId : undefined;
  const bumpRefresh = useAppStore((state) => state.bumpRefresh);
  const [draft, setDraft] = useState(emptyDraft);
  const [startToday, setStartToday] = useState(true);
  const [errors, setErrors] = useState({});
  const [statusOpen, setStatusOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null);
  const [courtNames, setCourtNames] = useState([]);
  const [courtFocused, setCourtFocused] = useState(false);
  const saveTitle = editCaseId ? "Update Case" : "Save Case";
  const requiredTotal = 4;
  const requiredComplete = [
    draft.court_name,
    draft.case_number,
    draft.first_party,
    draft.second_party
  ].filter((value) => value.trim()).length;
  const completionWidth = `${(requiredComplete / requiredTotal) * 100}%`;
  const filteredCourtNames = useMemo(() => {
    const term = draft.court_name.trim().toLowerCase();
    if (!term) return [];
    return courtNames
      .filter((name) => name.toLowerCase().includes(term))
      .filter((name) => name.trim().toLowerCase() !== term)
      .slice(0, 5);
  }, [courtNames, draft.court_name]);

  useFocusEffect(
    useCallback(() => {
      getCourtNameSuggestions()
        .then(setCourtNames)
        .catch((error) => {
          if (__DEV__) console.error(error);
        });
    }, [])
  );

  useEffect(() => {
    if (!editCaseId) {
      setDraft(emptyDraft());
      setStartToday(true);
      setErrors({});
      return;
    }
    getCaseById(editCaseId).then((item) => {
      if (!item) return;
      setDraft({
        court_name: item.court_name,
        case_number: item.case_number,
        first_party: item.first_party,
        second_party: item.second_party,
        status: item.status,
        info: item.info ?? "",
        start_date: item.start_date,
        next_date: null
      });
      setStartToday(item.start_date === todayDate());
    });
  }, [editCaseId]);

  const patch = useCallback((value) => {
    setDraft((current) => ({ ...current, ...value }));
    setErrors((current) => {
      const next = { ...current };
      Object.keys(value).forEach((key) => {
        delete next[key];
      });
      return next;
    });
  }, []);

  const handleSmartPaste = (field, value) => {
    patch({ [field]: value });
    const parsed = parseSmartPaste(value);
    if (!parsed) return;
    setDraft((current) => ({
      ...current,
      case_number: current.case_number.trim() && field !== "case_number" ? current.case_number : parsed.case_number,
      first_party: current.first_party.trim() && field !== "first_party" ? current.first_party : parsed.first_party,
      second_party: current.second_party.trim() ? current.second_party : parsed.second_party
    }));
    setPreview(`Parsed ${parsed.case_number}: ${parsed.first_party} VS ${parsed.second_party}`);
  };

  const submit = async () => {
    setCourtFocused(false);
    const validation = validateCaseDraft(draft);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    setSaving(true);
    try {
      if (editCaseId) {
        await updateCase(editCaseId, draft);
        navigation.goBack();
      } else {
        const id = await createCaseWithInitialEntry(draft);
        setDraft(emptyDraft());
        navigation.navigate("CaseDetail", { caseId: id });
      }
      bumpRefresh();
    } catch (error) {
      if (__DEV__) console.error(error);
      setErrors({ court_name: "Unable to save right now. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={screenStyles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={screenStyles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            {editCaseId ? (
              <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={20} color={colors.primary} />
              </Pressable>
            ) : null}
            <View style={styles.headerIcon}>
              <Ionicons name={editCaseId ? "create-outline" : "folder-open-outline"} size={24} color={colors.primary} />
            </View>
            <View style={styles.headerCopy}>
              <Text style={screenStyles.title}>{editCaseId ? "Edit Case" : "Add Case"}</Text>
              <Text style={screenStyles.subtitle}>{editCaseId ? "Update case information" : "Create a secure case record"}</Text>
            </View>
            <View style={styles.headerMark}>
              <FontAwesome5 name="gavel" size={18} color={colors.primary} />
            </View>
          </View>

          <View style={styles.formStack}>
            <View style={styles.completionCard}>
              <View style={styles.completionIcon}>
                <CourtMiniIcon />
              </View>
              <View style={styles.completionCopy}>
                <View style={styles.completionTop}>
                  <Text style={styles.completionTitle}>Required details</Text>
                  <Text style={styles.completionCount}>{requiredComplete}/{requiredTotal}</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: completionWidth }]} />
                </View>
              </View>
            </View>

            <FormSection icon="business-outline" title="Case Identity" subtitle="Court and reference details">
              <View>
                <Field
                  label="Court Name"
                  value={draft.court_name}
                  onFocus={() => setCourtFocused(Boolean(draft.court_name.trim()))}
                  onBlur={() => setTimeout(() => setCourtFocused(false), 120)}
                  onChangeText={(court_name) => {
                    patch({ court_name });
                    setCourtFocused(true);
                  }}
                  error={errors.court_name}
                  placeholder="e.g. T.M. XII"
                  required
                />
                {courtFocused && filteredCourtNames.length > 0 ? (
                  <View style={styles.suggestionPanel}>
                    {filteredCourtNames.map((name, index) => (
                      <Pressable
                        key={name}
                        accessibilityRole="button"
                        accessibilityLabel={`Use ${name}`}
                        onPress={() => {
                          patch({ court_name: name });
                          setCourtFocused(false);
                        }}
                        style={({ pressed }) => [styles.suggestionRow, index === filteredCourtNames.length - 1 && styles.suggestionRowLast, pressed && styles.suggestionRowPressed]}
                      >
                        <View style={styles.suggestionIcon}>
                          <Ionicons name="business-outline" size={15} color={colors.primary} />
                        </View>
                        <Text style={styles.suggestionText} numberOfLines={1}>{name}</Text>
                      </Pressable>
                    ))}
                  </View>
                ) : null}
              </View>
              <Field label="Case Number" value={draft.case_number} onChangeText={(value) => handleSmartPaste("case_number", value)} error={errors.case_number} placeholder="e.g. GR1995/22" required />
            </FormSection>

            <FormSection icon="people-outline" title="Parties" subtitle="Petitioner and respondent details">
              <View style={styles.partyFlow}>
                <View style={styles.partyPanel}>
                  <View style={styles.partyPanelHeader}>
                    <Ionicons name="person-outline" size={16} color={colors.primary} />
                    <Text style={styles.partyPanelTitle}>Petitioner <Text style={styles.requiredMark}>*</Text></Text>
                  </View>
                  <Field label="Petitioner" value={draft.first_party} onChangeText={(value) => handleSmartPaste("first_party", value)} error={errors.first_party} placeholder="Petitioner name" compact hideCompactLabel />
                </View>

                <View style={styles.vsWrap}>
                  <View style={styles.vsLine} />
                  <View style={styles.vsBadge}>
                    <Text style={styles.vsText}>VS</Text>
                  </View>
                  <View style={styles.vsLine} />
                </View>

                <View style={styles.partyPanel}>
                  <View style={styles.partyPanelHeader}>
                    <Ionicons name="person-outline" size={16} color={colors.danger} />
                    <Text style={styles.partyPanelTitle}>Respondent <Text style={styles.requiredMark}>*</Text></Text>
                  </View>
                  <Field label="Respondent" value={draft.second_party} onChangeText={(second_party) => patch({ second_party })} error={errors.second_party} placeholder="Respondent name" compact hideCompactLabel />
                </View>
              </View>
              {preview ? (
                <View style={styles.previewBox}>
                  <Ionicons name="checkmark-circle" size={18} color={colors.secondary} />
                  <Text style={styles.preview}>{preview}</Text>
                </View>
              ) : null}
            </FormSection>

            <FormSection icon="flag-outline" title="Status & Notes" subtitle="Keep the case context clear">
              <SelectField label="Status *" value={draft.status} options={CASE_STATUSES} visible={statusOpen} onOpen={() => setStatusOpen(true)} onClose={() => setStatusOpen(false)} onChange={(status) => patch({ status })} error={errors.status} />
              <Field label="Info" value={draft.info ?? ""} onChangeText={(info) => patch({ info })} multiline placeholder="Short notes, case summary, or important context" />
            </FormSection>

            <FormSection icon="calendar-outline" title="Dates" subtitle="Filing and next hearing dates">
              <Pressable onPress={() => {
                const next = !startToday;
                setStartToday(next);
                if (next) patch({ start_date: todayDate() });
              }} style={({ pressed }) => [styles.toggle, pressed && styles.togglePressed]}>
                <View style={styles.toggleIcon}>
                  <Ionicons name={startToday ? "today-outline" : "calendar-outline"} size={18} color={colors.primary} />
                </View>
                <View style={styles.toggleCopy}>
                  <Text style={styles.toggleText}>Today</Text>
                </View>
                <View style={[styles.switchTrack, startToday && styles.switchTrackOn]}>
                  <View style={[styles.switchThumb, startToday && styles.switchThumbOn]} />
                </View>
              </Pressable>
              <View style={styles.dateGrid}>
                <View style={styles.dateColumn}>
                  {startToday ? (
                    <View style={styles.todayDateWrap}>
                      <Text style={styles.dateFieldLabel}>Start Date <Text style={styles.requiredMark}>*</Text></Text>
                      <View style={styles.todayDateTile}>
                        <View style={styles.todayDateIcon}>
                          <Ionicons name="today-outline" size={16} color={colors.primary} />
                        </View>
                        <Text style={styles.todayDateValue}>Today</Text>
                      </View>
                    </View>
                  ) : (
                    <DatePickerField label="Start Date *" value={draft.start_date} onChange={(start_date) => start_date && patch({ start_date })} error={errors.start_date} compact />
                  )}
                </View>
                {!editCaseId ? (
                  <View style={styles.dateColumn}>
                    <DatePickerField label="Next Date" value={draft.next_date ?? null} optional onChange={(next_date) => patch({ next_date })} compact />
                  </View>
                ) : null}
              </View>
            </FormSection>

            <View style={styles.saveWrap}>
              <PrimaryButton title={saving ? "Saving..." : saveTitle} icon="checkmark-circle-outline" onPress={submit} disabled={saving} style={styles.saveButton} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function FormSection({ icon, title, subtitle, children }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIcon}>
          <Ionicons name={icon} size={19} color={colors.primary} />
        </View>
        <View style={styles.sectionCopy}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.sectionFields}>{children}</View>
    </View>
  );
}

function CourtMiniIcon() {
  return (
    <Svg width="30" height="25" viewBox="0 0 120 96">
      <Circle cx="60" cy="44" r="34" fill="#EAF0FF" />
      <Path d="M22 40 L60 17 L98 40 Z" fill="#2457D6" opacity="0.2" />
      <Rect x="24" y="42" width="72" height="8" rx="2" fill="#0B1F3A" opacity="0.24" />
      {[32, 49, 66, 83].map((x) => (
        <Path key={x} d={`M${x} 54 H${x + 8} L${x + 7} 78 H${x + 1} Z`} fill="#0B1F3A" opacity="0.2" />
      ))}
      <Rect x="26" y="80" width="68" height="7" rx="2" fill="#0B1F3A" opacity="0.2" />
      <Path d="M26 37 C43 31 77 31 94 37" stroke="#FF9933" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      <Path d="M29 91 C45 95 75 95 91 91" stroke="#138808" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
    </Svg>
  );
}

function Field({ label, error, multiline, compact, hideCompactLabel, required, ...props }) {
  return (
    <View style={styles.field}>
      {compact ? null : <Text style={screenStyles.inputLabel}>{label}{required ? <Text style={styles.requiredMark}> *</Text> : null}</Text>}
      <TextInput {...props} multiline={multiline} placeholderTextColor={colors.textMuted} style={[screenStyles.input, multiline && screenStyles.textArea]} />
      {compact && !hideCompactLabel ? <Text style={styles.compactLabel}>{label}</Text> : null}
      {error ? <Text style={screenStyles.error}>{error}</Text> : null}
    </View>
  );
}
