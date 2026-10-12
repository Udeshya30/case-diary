import { useEffect, useRef, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { DatePickerField } from "../components/DatePickerField";
import { PrimaryButton } from "../components/PrimaryButton";
import { pickProfileImage } from "../services/profileImageService";
import { defaultProfile, useAppStore } from "../store/appStore";
import { colors } from "../theme/colors";
import { screenStyles } from "../styles/globalStyles";
import { styles } from "./ProfileScreen.styles";

export function ProfileScreen() {
  const profile = useAppStore((state) => state.profile);
  const setProfile = useAppStore((state) => state.setProfile);
  const [draft, setDraft] = useState({ ...defaultProfile, ...profile });
  const [notice, setNotice] = useState(null);
  const [pickingImage, setPickingImage] = useState(false);
  const noticeTimer = useRef(null);

  useEffect(() => setDraft({ ...defaultProfile, ...profile }), [profile]);

  useEffect(() => () => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
  }, []);

  const showNotice = (text, type = "success") => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    setNotice({ text, type });
    noticeTimer.current = setTimeout(() => setNotice(null), 2400);
  };

  const patch = (value) => setDraft((current) => ({ ...current, ...value }));

  const chooseImage = async () => {
    setPickingImage(true);
    try {
      const imageUri = await pickProfileImage();
      if (imageUri) patch({ imageUri });
    } catch (error) {
      if (__DEV__) console.error(error);
      showNotice("Image not selected", "error");
    } finally {
      setPickingImage(false);
    }
  };

  const save = () => {
    setProfile(draft);
    showNotice("Profile saved");
  };

  const practiceText = draft.practiceFrom ? getExperienceText(draft.practiceFrom) : "Add practice start date";
  const displayName = draft.name.trim() || "Your Name";
  const displayRole = draft.designation.trim() || "Legal Professional";
  const courtText = draft.court.trim() || draft.enrollmentNumber.trim() || "Court details";

  return (
    <SafeAreaView style={screenStyles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={[screenStyles.content, styles.content]} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Ionicons name="person-outline" size={24} color={colors.primary} />
            </View>
            <View style={styles.headerCopy}>
              <Text style={screenStyles.title}>Profile</Text>
              <Text style={screenStyles.subtitle}>Professional identity and contact details</Text>
            </View>
            <View style={styles.headerMark}>
              <Ionicons name="shield-checkmark-outline" size={21} color={colors.primary} />
            </View>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.profileSpine}>
              <View style={styles.spineDot} />
              <View style={styles.spineLine} />
              <View style={styles.spineDotSmall} />
            </View>
            <View style={styles.profileMain}>
              <View style={styles.photoRing}>
                {draft.imageUri ? (
                  <Image source={{ uri: draft.imageUri }} style={styles.photo} />
                ) : (
                  <View style={styles.photoPlaceholder}>
                    <Ionicons name="person" size={40} color={colors.white} />
                  </View>
                )}
                <Pressable accessibilityRole="button" accessibilityLabel="Choose profile image" onPress={chooseImage} disabled={pickingImage} style={styles.photoButton}>
                  <Ionicons name="camera" size={16} color={colors.white} />
                </Pressable>
              </View>
              <View style={styles.profileCopy}>
                <Text style={styles.profileName} numberOfLines={1}>{displayName}</Text>
                <Text style={styles.profileRole} numberOfLines={1}>{displayRole}</Text>
                <View style={styles.metaList}>
                  <View style={styles.metaItem}>
                    <Ionicons name="ribbon-outline" size={14} color={colors.primary} />
                    <Text style={styles.metaText} numberOfLines={1}>{practiceText}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="business-outline" size={14} color={colors.primary} />
                    <Text style={styles.metaText} numberOfLines={1}>{courtText}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <ProfileSection icon="id-card-outline" title="Professional Details">
            <Field label="Name" value={draft.name} onChangeText={(name) => patch({ name })} placeholder="Your full name" />
            <Field label="Designation" value={draft.designation} onChangeText={(designation) => patch({ designation })} placeholder="Advocate, Lawyer, Consultant" />
            <DatePickerField label="Practice From" value={draft.practiceFrom || null} optional onChange={(practiceFrom) => patch({ practiceFrom: practiceFrom ?? "" })} />
            <Field label="Enrollment Number" value={draft.enrollmentNumber} onChangeText={(enrollmentNumber) => patch({ enrollmentNumber })} placeholder="Bar enrollment / ID" />
            <Field label="Primary Court" value={draft.court} onChangeText={(court) => patch({ court })} placeholder="Court or jurisdiction" />
          </ProfileSection>

          <ProfileSection icon="call-outline" title="Contact">
            <Field label="Phone" value={draft.phone} onChangeText={(phone) => patch({ phone })} placeholder="Mobile number" keyboardType="phone-pad" />
            <Field label="Email" value={draft.email} onChangeText={(email) => patch({ email })} placeholder="Email address" keyboardType="email-address" autoCapitalize="none" />
            <Field label="Office Address" value={draft.address} onChangeText={(address) => patch({ address })} placeholder="Office or chamber address" multiline />
          </ProfileSection>

          <View style={styles.saveWrap}>
            <PrimaryButton title="Save Profile" icon="checkmark-circle-outline" onPress={save} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {notice ? <Notice message={notice.text} type={notice.type} /> : null}
    </SafeAreaView>
  );
}

function ProfileSection({ icon, title, children }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIcon}>
          <Ionicons name={icon} size={19} color={colors.primary} />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.fieldStack}>{children}</View>
    </View>
  );
}

function getExperienceText(value) {
  const start = new Date(value);
  const today = new Date();
  let years = today.getFullYear() - start.getFullYear();
  const beforeAnniversary = today.getMonth() < start.getMonth() || (today.getMonth() === start.getMonth() && today.getDate() < start.getDate());
  if (beforeAnniversary) years -= 1;
  if (years <= 0) return "Less than 1 year experience";
  return `${years} ${years === 1 ? "year" : "years"} experience`;
}

function Field({ label, multiline, ...props }) {
  return (
    <View>
      <Text style={screenStyles.inputLabel}>{label}</Text>
      <TextInput
        {...props}
        multiline={multiline}
        placeholderTextColor={colors.textMuted}
        style={[screenStyles.input, multiline && screenStyles.textArea]}
      />
    </View>
  );
}

function Notice({ message, type }) {
  const success = type !== "error";

  return (
    <View style={[styles.notice, !success && styles.noticeError]}>
      <View style={styles.noticeIcon}>
        <Ionicons name={success ? "checkmark" : "alert"} size={18} color={success ? colors.success : colors.danger} />
      </View>
      <Text style={[styles.noticeText, !success && styles.noticeTextError]}>{message}</Text>
    </View>
  );
}
