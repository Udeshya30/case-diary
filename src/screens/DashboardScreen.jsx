import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { getAllCases, getCasesByDateRange } from "../database/caseRepository";
import { useAppStore } from "../store/appStore";
import { colors } from "../theme/colors";
import { addDays, formatDate, parseDateOnly, todayDate, toDateOnly } from "../utils/dateUtils";
import { CaseDocketRow } from "../components/CaseDocketRow";
import { EmptyState } from "../components/EmptyState";
import { SectionHeader } from "../components/SectionHeader";
import { screenStyles } from "../styles/globalStyles";
import { styles } from "./DashboardScreen.styles";

const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

export function DashboardScreen() {
  const navigation = useNavigation();
  const heroMotion = useRef(new Animated.Value(0)).current;
  const heroEnter = useRef(new Animated.Value(0)).current;
  const lookaheadDays = useAppStore((state) => state.lookaheadDays);
  const refreshKey = useAppStore((state) => state.refreshKey);
  const [allCases, setAllCases] = useState([]);
  const [dateCases, setDateCases] = useState([]);
  const [selectedDate, setSelectedDate] = useState(todayDate());
  const [visibleMonth, setVisibleMonth] = useState(todayDate());
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [cases, filtered] = await Promise.all([getAllCases(), getCasesByDateRange(selectedDate, selectedDate)]);
      setAllCases(cases);
      setDateCases(filtered);
    } catch (error) {
      if (__DEV__) console.error(error);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  useFocusEffect(useCallback(() => { void load(); }, [load, refreshKey]));

  useFocusEffect(
    useCallback(() => () => {
      setShowSchedulePicker(false);
    }, [])
  );

  useEffect(() => {
    Animated.timing(heroEnter, {
      toValue: 1,
      duration: 520,
      useNativeDriver: true
    }).start();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(heroMotion, {
          toValue: 1,
          duration: 4200,
          useNativeDriver: true
        }),
        Animated.timing(heroMotion, {
          toValue: 0,
          duration: 4200,
          useNativeDriver: true
        })
      ])
    );
    loop.start();

    return () => {
      loop.stop();
    };
  }, [heroEnter, heroMotion]);

  const today = todayDate();
  const upcomingTo = addDays(today, lookaheadDays);
  const todayCount = allCases.filter((item) => item.effective_next_date === today).length;
  const caseDates = new Set(allCases.map((item) => item.effective_next_date).filter(Boolean));
  const upcomingCases = allCases
    .filter((item) => item.effective_next_date && item.effective_next_date >= today && item.effective_next_date <= upcomingTo)
    .sort((a, b) => a.effective_next_date.localeCompare(b.effective_next_date))
    .slice(0, 3);
  const glowTranslate = heroMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -18]
  });
  const glowScale = heroMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08]
  });
  const heroTranslate = heroEnter.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 0]
  });
  const accentTranslate = heroMotion.interpolate({
    inputRange: [0, 1],
    outputRange: [-8, 10]
  });
  const gavelRotate = heroMotion.interpolate({
    inputRange: [0, 1],
    outputRange: ["-18deg", "-10deg"]
  });

  return (
    <SafeAreaView style={screenStyles.safe}>
      <ScrollView contentContainerStyle={[screenStyles.content, styles.content]}>
        <Animated.View style={[styles.hero, { opacity: heroEnter, transform: [{ translateY: heroTranslate }] }]}>
          <Animated.View style={[styles.heroGlow, { transform: [{ translateX: glowTranslate }, { scale: glowScale }] }]} />
          <Animated.View style={[styles.heroCircleOne, { transform: [{ translateX: glowTranslate }, { scale: glowScale }] }]} />
          <Animated.View style={[styles.heroCircleTwo, { transform: [{ translateX: glowTranslate }] }]} />
          <Animated.View style={[styles.heroCircleThree, { transform: [{ scale: glowScale }] }]} />
          <Animated.View style={[styles.heroAccentPill, { transform: [{ translateX: accentTranslate }] }]} />
          <Animated.View style={[styles.heroAccentDot, { transform: [{ translateY: accentTranslate }, { scale: glowScale }] }]} />
          <Animated.View style={[styles.heroGavelMark, { transform: [{ rotate: gavelRotate }, { scale: glowScale }] }]}>
            <FontAwesome5 name="gavel" size={104} color={colors.white} />
          </Animated.View>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.logo}>Case Diary</Text>
              <Text style={styles.tagline}>Your Legal Diary</Text>
            </View>
            <View style={styles.headerIcons}>
              <Pressable style={styles.iconButton} onPress={() => navigation.navigate("All Cases")}>
                <Ionicons name="search" size={20} color={colors.white} />
              </Pressable>
              <Pressable style={styles.iconButton}>
                <Ionicons name="notifications-outline" size={20} color={colors.white} />
              </Pressable>
            </View>
          </View>
          <View style={styles.heroBottom}>
            <View>
              <Text style={styles.heroNumber}>{todayCount}</Text>
              <Text style={styles.heroCaption}>{todayCount === 1 ? "case listed today" : "cases listed today"}</Text>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="New Case" onPress={() => navigation.navigate("Add Case")} style={styles.heroActionHit}>
              <View style={styles.heroAction}>
                <Ionicons name="add" size={26} color={colors.primary} />
              </View>
            </Pressable>
          </View>
        </Animated.View>

        <View style={styles.casesHeader}>
          <View style={styles.casesHeaderCopy}>
            <Text style={styles.casesHeaderTitle}>Cases</Text>
            <View style={styles.casesHeaderPill}>
              <Ionicons name={selectedDate === today ? "today-outline" : "calendar-outline"} size={14} color={colors.primary} />
              <Text style={styles.casesHeaderPillText}>{selectedDate === today ? "Today" : formatDate(selectedDate)}</Text>
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Choose schedule date"
            onPress={() => {
              setVisibleMonth(selectedDate);
              setShowSchedulePicker((current) => !current);
            }}
            style={({ pressed }) => [styles.calendarMark, pressed && styles.calendarMarkPressed]}
          >
            <Ionicons name="calendar-clear-outline" size={21} color={colors.primary} />
          </Pressable>
        </View>
        {loading ? <ActivityIndicator color={colors.primary} /> : null}
        {!loading && dateCases.length === 0 ? (
          <EmptyState title={selectedDate === today ? "No cases today" : "No cases found"} message={selectedDate === today ? "You're all clear for today." : "No cases are listed for this date."} icon="court" />
        ) : null}
        {dateCases.map((item) => (
          <CaseDocketRow key={item.id} item={item} onPress={() => navigation.navigate("CaseDetail", { caseId: item.id })} />
        ))}

        {upcomingCases.length > 0 ? (
          <>
            <SectionHeader title="Upcoming" subtitle={`Next ${lookaheadDays} days`} />
            {upcomingCases.map((item) => (
              <CaseDocketRow key={`upcoming-${item.id}`} item={item} onPress={() => navigation.navigate("CaseDetail", { caseId: item.id })} />
            ))}
          </>
        ) : null}
      </ScrollView>
      {showSchedulePicker ? (
        <View style={styles.calendarOverlay} pointerEvents="box-none">
          <Pressable style={styles.calendarBackdrop} onPress={() => setShowSchedulePicker(false)} />
          <View style={styles.calendarOverlayPanel}>
            <ScheduleCalendar
              visibleMonth={visibleMonth}
              selectedDate={selectedDate}
              caseDates={caseDates}
              onMonthChange={setVisibleMonth}
              onToday={() => {
                setSelectedDate(today);
                setVisibleMonth(today);
                setShowSchedulePicker(false);
              }}
              onSelect={(date) => {
                setSelectedDate(date);
                setVisibleMonth(date);
                setShowSchedulePicker(false);
              }}
            />
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

function ScheduleCalendar({ visibleMonth, selectedDate, caseDates, onMonthChange, onToday, onSelect }) {
  const days = getCalendarDays(visibleMonth);
  const monthDate = parseDateOnly(visibleMonth);
  const monthTitle = monthDate.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  return (
    <View style={styles.calendarPicker}>
      <View style={styles.calendarTop}>
        <Pressable accessibilityRole="button" accessibilityLabel="Previous month" onPress={() => onMonthChange(shiftMonth(visibleMonth, -1))} style={styles.monthButton}>
          <Ionicons name="chevron-back" size={20} color={colors.navy} />
        </Pressable>
        <Text style={styles.monthTitle}>{monthTitle}</Text>
        <View style={styles.calendarTopActions}>
          {selectedDate !== todayDate() ? (
            <Pressable accessibilityRole="button" accessibilityLabel="Back to today" onPress={onToday} style={({ pressed }) => [styles.todayReset, pressed && styles.todayResetPressed]}>
              <Text style={styles.todayResetText}>Today</Text>
            </Pressable>
          ) : null}
          <Pressable accessibilityRole="button" accessibilityLabel="Next month" onPress={() => onMonthChange(shiftMonth(visibleMonth, 1))} style={styles.monthButton}>
            <Ionicons name="chevron-forward" size={20} color={colors.navy} />
          </Pressable>
        </View>
      </View>
      <View style={styles.weekRow}>
        {weekdayLabels.map((label, index) => (
          <Text key={`${label}-${index}`} style={styles.weekLabel}>{label}</Text>
        ))}
      </View>
      <View style={styles.calendarGrid}>
        {days.map((day) => {
          const hasCase = caseDates.has(day.date);
          const selected = day.date === selectedDate;
          const isToday = day.date === todayDate();

          return (
            <Pressable
              key={day.date}
              accessibilityRole="button"
              accessibilityLabel={`${formatDate(day.date)}${hasCase ? ", has cases" : ""}`}
              onPress={() => onSelect(day.date)}
              style={[
                styles.dayCell,
                !day.inMonth && styles.dayCellMuted,
                hasCase && styles.dayCellHasCase,
                selected && styles.dayCellSelected
              ]}
            >
              <Text style={[
                styles.dayText,
                !day.inMonth && styles.dayTextMuted,
                hasCase && styles.dayTextHasCase,
                selected && styles.dayTextSelected
              ]}>
                {day.day}
              </Text>
              <View style={[styles.dayDot, hasCase && styles.dayDotActive, isToday && styles.dayDotToday, selected && styles.dayDotSelected]} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function getCalendarDays(value) {
  const date = parseDateOnly(value);
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const item = new Date(start);
    item.setDate(start.getDate() + index);
    return {
      date: toDateOnly(item),
      day: item.getDate(),
      inMonth: item.getMonth() === first.getMonth()
    };
  });
}

function shiftMonth(value, amount) {
  const date = parseDateOnly(value);
  return toDateOnly(new Date(date.getFullYear(), date.getMonth() + amount, 1));
}
