import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { formatDate, parseDateOnly, toDateOnly, todayDate } from "../utils/dateUtils";
import { styles } from "./DatePickerField.styles";

const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function DatePickerField({ label, value, onChange, placeholder = "dd mm yyyy", disabled, optional, error, compact }) {
  const [show, setShow] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(value || todayDate());
  const [pickerMode, setPickerMode] = useState("day");
  const [yearStart, setYearStart] = useState(getYear(value || todayDate()) - 5);
  const selectedDate = value || todayDate();
  const visibleYear = getYear(visibleMonth);
  const visibleMonthIndex = getMonthIndex(visibleMonth);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        disabled={disabled}
        onPress={() => {
          setVisibleMonth(value || todayDate());
          setPickerMode("day");
          setYearStart(getYear(value || todayDate()) - 5);
          setShow(true);
        }}
        style={({ pressed }) => [styles.input, compact && styles.inputCompact, disabled && styles.disabled, pressed && styles.inputPressed]}
      >
        <View style={[styles.inputIcon, compact && styles.inputIconCompact]}>
          <Ionicons name="calendar-clear-outline" size={compact ? 15 : 17} color={disabled ? colors.textMuted : colors.primary} />
        </View>
        <Text style={[styles.value, compact && styles.valueCompact, !value && styles.placeholder]} numberOfLines={1}>{value ? formatDate(value) : placeholder}</Text>
        {optional && value ? (
          <Pressable onPress={() => onChange(null)} hitSlop={10}>
            <Ionicons name="close-circle" size={20} color={colors.textMuted} />
          </Pressable>
        ) : null}
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Modal transparent visible={show} animationType="fade" onRequestClose={() => setShow(false)}>
        <Pressable style={styles.modal} onPress={() => setShow(false)}>
          <Pressable style={styles.calendar} onPress={(event) => event.stopPropagation()}>
            <View style={styles.calendarTop}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Previous"
                onPress={() => {
                  if (pickerMode === "year") setYearStart((current) => current - 12);
                  else setVisibleMonth(shiftMonth(visibleMonth, pickerMode === "month" ? -12 : -1));
                }}
                style={styles.monthButton}
              >
                <Ionicons name="chevron-back" size={20} color={colors.navy} />
              </Pressable>
              {pickerMode === "year" ? (
                <Text style={styles.monthTitle}>{yearStart} - {yearStart + 11}</Text>
              ) : (
                <View style={styles.titleControls}>
                  <Pressable accessibilityRole="button" accessibilityLabel="Select month" onPress={() => setPickerMode("month")} style={[styles.titleChip, pickerMode === "month" && styles.titleChipActive]}>
                    <Text style={[styles.titleChipText, pickerMode === "month" && styles.titleChipTextActive]}>{monthLabels[visibleMonthIndex]}</Text>
                  </Pressable>
                  <Pressable accessibilityRole="button" accessibilityLabel="Select year" onPress={() => {
                    setYearStart(visibleYear - 5);
                    setPickerMode("year");
                  }} style={styles.titleChip}>
                    <Text style={styles.titleChipText}>{visibleYear}</Text>
                  </Pressable>
                </View>
              )}
              <View style={styles.calendarTopActions}>
                {pickerMode === "day" && selectedDate !== todayDate() ? (
                  <Pressable accessibilityRole="button" accessibilityLabel="Back to today" onPress={() => {
                    const today = todayDate();
                    onChange(today);
                    setVisibleMonth(today);
                    setPickerMode("day");
                    setShow(false);
                  }} style={({ pressed }) => [styles.todayReset, pressed && styles.todayResetPressed]}>
                    <Text style={styles.todayResetText}>Today</Text>
                  </Pressable>
                ) : null}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Next"
                  onPress={() => {
                    if (pickerMode === "year") setYearStart((current) => current + 12);
                    else setVisibleMonth(shiftMonth(visibleMonth, pickerMode === "month" ? 12 : 1));
                  }}
                  style={styles.monthButton}
                >
                  <Ionicons name="chevron-forward" size={20} color={colors.navy} />
                </Pressable>
              </View>
            </View>
            {pickerMode === "month" ? (
              <View style={styles.monthGrid}>
                {monthLabels.map((month, index) => {
                  const selected = index === visibleMonthIndex;
                  return (
                    <Pressable
                      key={month}
                      accessibilityRole="button"
                      accessibilityLabel={`Select ${month}`}
                      onPress={() => {
                        setVisibleMonth(setMonth(visibleMonth, index));
                        setPickerMode("day");
                      }}
                      style={[styles.monthCell, selected && styles.monthCellSelected]}
                    >
                      <Text style={[styles.monthCellText, selected && styles.monthCellTextSelected]}>{month}</Text>
                    </Pressable>
                  );
                })}
              </View>
            ) : null}
            {pickerMode === "year" ? (
              <View style={styles.yearGrid}>
                {Array.from({ length: 12 }, (_, index) => yearStart + index).map((year) => {
                  const selected = year === visibleYear;
                  return (
                    <Pressable
                      key={year}
                      accessibilityRole="button"
                      accessibilityLabel={`Select ${year}`}
                      onPress={() => {
                        setVisibleMonth(setYear(visibleMonth, year));
                        setPickerMode("month");
                      }}
                      style={[styles.yearCell, selected && styles.monthCellSelected]}
                    >
                      <Text style={[styles.monthCellText, selected && styles.monthCellTextSelected]}>{year}</Text>
                    </Pressable>
                  );
                })}
              </View>
            ) : null}
            {pickerMode === "day" ? (
              <>
                <View style={styles.weekRow}>
                  {weekdayLabels.map((day, index) => <Text key={`${day}-${index}`} style={styles.weekLabel}>{day}</Text>)}
                </View>
                <View style={styles.calendarGrid}>
                  {getCalendarDays(visibleMonth).map((day) => {
                    const selected = day.date === selectedDate;
                    const isToday = day.date === todayDate();
                    return (
                      <Pressable
                        key={day.date}
                        accessibilityRole="button"
                        accessibilityLabel={formatDate(day.date)}
                        onPress={() => {
                          onChange(day.date);
                          setVisibleMonth(day.date);
                          setShow(false);
                        }}
                        style={[styles.dayCell, !day.inMonth && styles.dayCellMuted, selected && styles.dayCellSelected]}
                      >
                        <Text style={[styles.dayText, !day.inMonth && styles.dayTextMuted, selected && styles.dayTextSelected]}>{day.day}</Text>
                        <View style={[styles.dayDot, isToday && styles.dayDotToday, selected && styles.dayDotSelected]} />
                      </Pressable>
                    );
                  })}
                </View>
              </>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function getYear(value) {
  return parseDateOnly(value).getFullYear();
}

function getMonthIndex(value) {
  return parseDateOnly(value).getMonth();
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

function setMonth(value, monthIndex) {
  const date = parseDateOnly(value);
  return toDateOnly(new Date(date.getFullYear(), monthIndex, 1));
}

function setYear(value, year) {
  const date = parseDateOnly(value);
  return toDateOnly(new Date(year, date.getMonth(), 1));
}
