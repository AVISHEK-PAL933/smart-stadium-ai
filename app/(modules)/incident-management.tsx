import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';


type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
type Status = 'Active' | 'Assigned' | 'Resolved';

interface Incident {
  id: string;
  title: string;
  location: string;
  severity: Severity;
  status: Status;
  time: string;
  assignee: string | null;
  description: string;
}

const INCIDENTS: Incident[] = [
  {
    id: 'INC-001',
    title: 'Medical Emergency',
    location: 'Section C7, Row 14',
    severity: 'Critical',
    status: 'Assigned',
    time: '3m ago',
    assignee: 'Dr. Park (Medical)',
    description: 'Fan reported chest pain. Paramedic team dispatched.',
  },
  {
    id: 'INC-002',
    title: 'Crowd Crush Risk',
    location: 'East Wing Gate 3',
    severity: 'Critical',
    status: 'Active',
    time: '7m ago',
    assignee: null,
    description: 'Density at 99%. Immediate gate management required.',
  },
  {
    id: 'INC-003',
    title: 'Fan Altercation',
    location: 'North Stand Block B',
    severity: 'High',
    status: 'Assigned',
    time: '15m ago',
    assignee: 'Security Team 4',
    description: 'Verbal dispute between two groups of fans.',
  },
  {
    id: 'INC-004',
    title: 'Electrical Fault',
    location: 'Concourse A Level 2',
    severity: 'Medium',
    status: 'Active',
    time: '22m ago',
    assignee: null,
    description: 'Lights flickering in food court area. Engineer alerted.',
  },
  {
    id: 'INC-005',
    title: 'Lost Child',
    location: 'Information Desk',
    severity: 'High',
    status: 'Resolved',
    time: '45m ago',
    assignee: 'Staff Maria',
    description: 'Child reunited with parents. Case closed.',
  },
];

const SEVERITY_CONFIG: Record<Severity, { color: string; icon: string }> = {
  Critical: { color: '#FF5252', icon: 'alert-octagon' },
  High: { color: '#FF9800', icon: 'alert-circle' },
  Medium: { color: '#FFC107', icon: 'alert' },
  Low: { color: '#00E676', icon: 'information' },
};

const STATUS_CONFIG: Record<Status, { color: string }> = {
  Active: { color: '#FF5252' },
  Assigned: { color: '#FFC107' },
  Resolved: { color: '#00E676' },
};

export default function IncidentManagement() {
  const { theme, themeColors } = useGlobalContext();
  const [filter, setFilter] = useState<'All' | Status>('All');
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = INCIDENTS.filter((inc) => {
    const matchFilter = filter === 'All' || inc.status === filter;
    const matchSearch =
      search === '' ||
      inc.title.toLowerCase().includes(search.toLowerCase()) ||
      inc.location.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    Active: INCIDENTS.filter((i) => i.status === 'Active').length,
    Assigned: INCIDENTS.filter((i) => i.status === 'Assigned').length,
    Resolved: INCIDENTS.filter((i) => i.status === 'Resolved').length,
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['rgba(255,82,82,0.12)', 'transparent']} style={styles.bgGrad} />

      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Incident Management</Text>
          <Text style={[styles.headerSub, { color: themeColors.icon }]}>
            {INCIDENTS.filter((i) => i.status !== 'Resolved').length} active incidents
          </Text>
        </View>
        <View style={[styles.addBtn, { backgroundColor: '#FF525222', borderColor: '#FF525244' }]}>
          <MaterialCommunityIcons name="plus" size={20} color="#FF5252" />
        </View>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Summary Chips */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.summaryRow}>
          {(['Active', 'Assigned', 'Resolved'] as Status[]).map((s) => (
            <View
              key={s}
              style={[
                styles.summaryChip,
                {
                  backgroundColor: `${STATUS_CONFIG[s].color}22`,
                  borderColor: `${STATUS_CONFIG[s].color}44`,
                },
              ]}>
              <Text style={[styles.summaryCount, { color: STATUS_CONFIG[s].color }]}>
                {counts[s]}
              </Text>
              <Text style={[styles.summaryLabel, { color: STATUS_CONFIG[s].color }]}>{s}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Search */}
        <Animated.View
          entering={FadeInUp.delay(150)}
          style={[
            styles.searchBar,
            { backgroundColor: themeColors.card, borderColor: themeColors.border },
          ]}>
          <MaterialCommunityIcons name="magnify" size={18} color={themeColors.icon} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search incidents..."
            placeholderTextColor={themeColors.icon}
            style={[styles.searchInput, { color: themeColors.text }]}
          />
        </Animated.View>

        {/* Filter Tabs */}
        <Animated.View entering={FadeInUp.delay(180)} style={styles.filterRow}>
          {(['All', 'Active', 'Assigned', 'Resolved'] as const).map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={[
                styles.filterBtn,
                {
                  backgroundColor: filter === f ? '#FF5252' : themeColors.card,
                  borderColor: filter === f ? '#FF5252' : themeColors.border,
                },
              ]}>
              <Text
                style={[styles.filterText, { color: filter === f ? '#FFF' : themeColors.text }]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Incidents List */}
        <View style={styles.list}>
          {filtered.map((inc, i) => {
            const sevCfg = SEVERITY_CONFIG[inc.severity];
            const stCfg = STATUS_CONFIG[inc.status];
            const isSelected = selected === inc.id;
            return (
              <Animated.View key={inc.id} entering={FadeInDown.delay(200 + i * 50)}>
                <TouchableOpacity
                  onPress={() => setSelected(isSelected ? null : inc.id)}
                  activeOpacity={0.85}
                  style={[
                    styles.incCard,
                    { backgroundColor: themeColors.card, borderColor: `${sevCfg.color}44` },
                  ]}>
                  <LinearGradient
                    colors={[`${sevCfg.color}10`, 'transparent']}
                    style={styles.incGrad}
                  />
                  <View style={styles.incHeader}>
                    <MaterialCommunityIcons
                      name={sevCfg.icon as any}
                      size={20}
                      color={sevCfg.color}
                    />
                    <Text style={[styles.incId, { color: themeColors.icon }]}>{inc.id}</Text>
                    <Text style={[styles.incTitle, { color: themeColors.text }]}>{inc.title}</Text>
                    <View style={[styles.statusPill, { backgroundColor: `${stCfg.color}22` }]}>
                      <Text style={[styles.statusText, { color: stCfg.color }]}>{inc.status}</Text>
                    </View>
                  </View>
                  <View style={styles.incMeta}>
                    <MaterialCommunityIcons name="map-marker" size={14} color={themeColors.icon} />
                    <Text style={[styles.incLocation, { color: themeColors.icon }]}>
                      {inc.location}
                    </Text>
                    <Text style={[styles.incTime, { color: themeColors.icon }]}>{inc.time}</Text>
                  </View>
                  {isSelected && (
                    <View style={styles.incDetail}>
                      <Text style={[styles.incDesc, { color: themeColors.text }]}>
                        {inc.description}
                      </Text>
                      {inc.assignee && (
                        <View style={styles.assigneeRow}>
                          <MaterialCommunityIcons name="account-check" size={14} color="#00E676" />
                          <Text style={[styles.assigneeText, { color: '#00E676' }]}>
                            {inc.assignee}
                          </Text>
                        </View>
                      )}
                      <View style={styles.actionRow}>
                        {inc.status === 'Active' && (
                          <TouchableOpacity
                            style={[
                              styles.actionBtn,
                              { backgroundColor: '#FFC10722', borderColor: '#FFC10744' },
                            ]}>
                            <Text style={[styles.actionText, { color: '#FFC107' }]}>Assign</Text>
                          </TouchableOpacity>
                        )}
                        {inc.status !== 'Resolved' && (
                          <TouchableOpacity
                            style={[
                              styles.actionBtn,
                              { backgroundColor: '#00E67622', borderColor: '#00E67644' },
                            ]}>
                            <Text style={[styles.actionText, { color: '#00E676' }]}>Resolve</Text>
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          style={[
                            styles.actionBtn,
                            { backgroundColor: '#00C8FF22', borderColor: '#00C8FF44' },
                          ]}>
                          <Text style={[styles.actionText, { color: '#00C8FF' }]}>Escalate</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 200 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.l,
    paddingTop: 56,
    paddingBottom: Theme.spacing.m,
    gap: Theme.spacing.m,
  },
  backBtn: { padding: 4 },
  headerCenter: { flex: 1 },
  headerTitle: { fontSize: Theme.typography.sizes.l, fontWeight: '900' },
  headerSub: { fontSize: Theme.typography.sizes.s, marginTop: 2 },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: { paddingHorizontal: Theme.spacing.l, paddingBottom: 100 },
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: Theme.spacing.m },
  summaryChip: {
    flex: 1,
    borderWidth: 1,
    borderRadius: Theme.shapes.borderRadius.m,
    padding: Theme.spacing.m,
    alignItems: 'center',
    gap: 4,
  },
  summaryCount: { fontSize: Theme.typography.sizes.xl, fontWeight: '900' },
  summaryLabel: { fontSize: 11, fontWeight: '700' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.m,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    gap: 8,
    marginBottom: Theme.spacing.m,
  },
  searchInput: { flex: 1, fontSize: Theme.typography.sizes.s },
  filterRow: { flexDirection: 'row', gap: 8, marginBottom: Theme.spacing.l },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  filterText: { fontSize: 11, fontWeight: '700' },
  list: { gap: 12 },
  incCard: {
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    overflow: 'hidden',
    gap: 8,
  },
  incGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 60 },
  incHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  incId: { fontSize: 10, fontWeight: '700' },
  incTitle: { flex: 1, fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  statusPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: '700' },
  incMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  incLocation: { flex: 1, fontSize: 12 },
  incTime: { fontSize: 11 },
  incDetail: {
    gap: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  incDesc: { fontSize: Theme.typography.sizes.s, lineHeight: 20 },
  assigneeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  assigneeText: { fontSize: 12, fontWeight: '700' },
  actionRow: { flexDirection: 'row', gap: 8 },
  actionBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  actionText: { fontSize: 12, fontWeight: '700' },
});
