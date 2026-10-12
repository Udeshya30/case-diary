import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { CASE_STATUS_FILTERS } from "../constants/appConstants";
import { getAllCases, searchCases } from "../database/caseRepository";
import { useAppStore } from "../store/appStore";
import { colors } from "../theme/colors";
import { CaseDocketRow } from "../components/CaseDocketRow";
import { EmptyState } from "../components/EmptyState";
import { SearchBar } from "../components/SearchBar";
import { screenStyles } from "../styles/globalStyles";
import { styles } from "./AllCasesScreen.styles";

const PAGE_SIZE = 8;

export function AllCasesScreen() {
  const navigation = useNavigation();
  const listRef = useRef(null);
  const refreshKey = useAppStore((state) => state.refreshKey);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterOpen, setFilterOpen] = useState(false);
  const [cases, setCases] = useState([]);
  const [summaryCases, setSummaryCases] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const activeCount = summaryCases.filter((item) => item.status === "Active").length;
  const totalPages = Math.max(1, Math.ceil(cases.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedCases = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return cases.slice(start, start + PAGE_SIZE);
  }, [cases, currentPage]);
  const resultLabel = loading ? "Loading cases" : `Showing ${cases.length} ${cases.length === 1 ? "case" : "cases"}`;
  const pageLabel = cases.length > PAGE_SIZE ? `Page ${currentPage} of ${totalPages}` : null;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [allItems, filteredItems] = await Promise.all([getAllCases(), searchCases(query, filter)]);
      const sortedItems = [...filteredItems].sort((a, b) => {
        const firstDate = a.updated_at || "";
        const secondDate = b.updated_at || "";
        return sortOrder === "asc" ? firstDate.localeCompare(secondDate) : secondDate.localeCompare(firstDate);
      });
      setSummaryCases(allItems);
      setCases(sortedItems);
    } catch (error) {
      if (__DEV__) console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filter, query, sortOrder]);

  useFocusEffect(useCallback(() => { void load(); }, [load, refreshKey]));

  useEffect(() => {
    setPage(1);
  }, [filter, query, sortOrder]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [currentPage]);

  return (
    <SafeAreaView style={screenStyles.safe}>
      <View style={[screenStyles.content, styles.content]}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons name="albums-outline" size={24} color={colors.primary} />
          </View>
          <View style={styles.headerCopy}>
            <Text style={screenStyles.title}>All Cases</Text>
            <Text style={screenStyles.subtitle}>{loading && summaryCases.length === 0 ? "Search, filter, and reopen case files" : `${summaryCases.length} records · ${activeCount} active`}</Text>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Add case" onPress={() => navigation.navigate("Add Case")} style={styles.addButton}>
            <Ionicons name="add" size={22} color={colors.white} />
          </Pressable>
        </View>
        <View style={styles.controls}>
          <View style={styles.searchFilterRow}>
            <SearchBar value={query} onChangeText={setQuery} placeholder="Search cases" style={styles.searchInput} />
            <Pressable accessibilityRole="button" accessibilityLabel="Status filter" onPress={() => setFilterOpen((open) => !open)} style={({ pressed }) => [styles.filterButton, filterOpen && styles.filterButtonActive, pressed && styles.filterButtonPressed]}>
              <Ionicons name="filter" size={16} color={colors.primary} />
              <Text style={styles.filterButtonText}>Filter</Text>
            </Pressable>
            {filter !== "All" ? (
              <Pressable onPress={() => setFilter("All")} style={styles.clearMini}>
                <Ionicons name="close" size={15} color={colors.primary} />
              </Pressable>
            ) : null}
          </View>
        </View>
        <View style={styles.resultBar}>
          <View style={styles.resultCopy}>
            <Text style={styles.resultText}>{filter === "All" ? resultLabel : `${filter} · ${resultLabel}`}</Text>
            {pageLabel ? <Text style={styles.pageHint}>{pageLabel}</Text> : null}
          </View>
          {filter !== "All" ? (
            <Pressable onPress={() => setFilter("All")} style={styles.clear}>
              <Ionicons name="close-circle" size={15} color={colors.primary} />
              <Text style={styles.clearText}>Clear filter</Text>
            </Pressable>
          ) : null}
        </View>
        <Modal transparent visible={filterOpen} animationType="fade" onRequestClose={() => setFilterOpen(false)}>
          <View style={styles.filterModal}>
            <Pressable accessibilityRole="button" accessibilityLabel="Close filter options" onPress={() => setFilterOpen(false)} style={styles.filterBackdrop} />
            <StatusFilterSheet
              value={filter}
              sortOrder={sortOrder}
              onClose={() => setFilterOpen(false)}
              onChange={setFilter}
              onSortChange={setSortOrder}
            />
          </View>
        </Modal>
        {loading ? <ActivityIndicator color={colors.primary} /> : null}
        <FlatList
          ref={listRef}
          data={pagedCases}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <CaseDocketRow item={item} onPress={() => navigation.navigate("CaseDetail", { caseId: item.id })} />}
          ListEmptyComponent={!loading ? <EmptyState title={query ? "No cases found" : "No cases yet"} message={query ? "Try a different search." : "Add your first case to get started."} /> : null}
          ListFooterComponent={!loading && cases.length > PAGE_SIZE ? <PaginationControls page={currentPage} totalPages={totalPages} onChange={setPage} /> : null}
          contentContainerStyle={[styles.listContent, cases.length === 0 && styles.emptyList]}
        />
      </View>
    </SafeAreaView>
  );
}

function PaginationControls({ page, totalPages, onChange }) {
  return (
    <View style={styles.pagination}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Previous page"
        disabled={page <= 1}
        onPress={() => onChange(page - 1)}
        style={[styles.pageButton, page <= 1 && styles.pageButtonDisabled]}
      >
        <Ionicons name="chevron-back" size={18} color={page <= 1 ? colors.disabled : colors.primary} />
      </Pressable>
      <Text style={styles.paginationText}>{page} / {totalPages}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Next page"
        disabled={page >= totalPages}
        onPress={() => onChange(page + 1)}
        style={[styles.pageButton, page >= totalPages && styles.pageButtonDisabled]}
      >
        <Ionicons name="chevron-forward" size={18} color={page >= totalPages ? colors.disabled : colors.primary} />
      </Pressable>
    </View>
  );
}

function StatusFilterSheet({ value, sortOrder, onClose, onChange, onSortChange }) {
  return (
    <View style={styles.filterSheet}>
      <View style={styles.filterSheetHeader}>
        <Text style={styles.filterSheetTitle}>Filter</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Close status filter" onPress={onClose} hitSlop={10}>
          <Ionicons name="close" size={18} color={colors.textMuted} />
        </Pressable>
      </View>
      <Text style={styles.filterSectionLabel}>Status</Text>
      <View style={styles.optionList}>
        {CASE_STATUS_FILTERS.map((option) => {
          const selected = value === option;
          return (
            <FilterOptionRow
              key={option}
              icon={option === "All" ? "layers-outline" : "ellipse-outline"}
              label={option === "All" ? "All statuses" : option}
              selected={selected}
              onPress={() => onChange(option)}
            />
          );
        })}
      </View>
      <Text style={[styles.filterSectionLabel, styles.sortLabel]}>Sort</Text>
      <View style={styles.optionList}>
        {[
          { label: "Newest first", value: "desc", icon: "arrow-down" },
          { label: "Oldest first", value: "asc", icon: "arrow-up" }
        ].map((option) => {
          const selected = sortOrder === option.value;
          return (
            <FilterOptionRow
              key={option.value}
              icon={option.icon}
              label={option.label}
              selected={selected}
              onPress={() => onSortChange(option.value)}
            />
          );
        })}
      </View>
    </View>
  );
}

function FilterOptionRow({ icon, label, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.filterOptionRow, selected && styles.filterOptionRowActive, pressed && styles.filterOptionRowPressed]}>
      <View style={[styles.filterOptionIcon, selected && styles.filterOptionIconActive]}>
        <Ionicons name={icon} size={16} color={selected ? colors.white : colors.textMuted} />
      </View>
      <Text style={[styles.filterOptionText, selected && styles.filterOptionTextActive]}>{label}</Text>
      <Ionicons name={selected ? "checkmark-circle" : "ellipse-outline"} size={20} color={selected ? colors.primary : colors.disabled} />
    </Pressable>
  );
}
