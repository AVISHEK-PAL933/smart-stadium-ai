import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';


type Dept = 'All' | 'Security' | 'Medical' | 'F&B' | 'Cleaning' | 'Ticketing';

const STAFF = [
  {
    id: 'S001',
    name: 'James Miller',
    role: 'Security Officer',
    dept: 'Security',
    zone: 'North Stand',
    status: 'On Duty',
    shift: '08:00-16:00',
    avatar: '👮',
  },
  {
    id: 'S002',
    name: 'Dr. Sarah Park',
    role: 'Paramedic',
    dept: 'Medical',
    zone: 'Medical Bay A',
    status: 'On Duty',
    shift: '07:00-19:00',
    avatar: '👩‍⚕️',
  },
  {
    id: 'S003',
    name: 'Carlos Rivera',
    role: 'F&B Supervisor',
    dept: 'F&B',
    zone: 'Concourse A',
    status: 'On Break',
    shift: '10:00-22:00',
    avatar: '👨‍🍳',
  },
  {
    id: 'S004',
    name: 'Amara Osei',
    role: 'Gate Agent',
    dept: 'Ticketing',
    zone: 'Gate 7',
    status: 'On Duty',
    shift: '12:00-20:00',
    avatar: '🎫',
  },
  {
    id: 'S005',
    name: 'Wei Zhang',
    role: 'Cleaning Lead',
    dept: 'Cleaning',
    zone: 'South Stand',
    status: 'On Duty',
    shift: '09:00-17:00',
    avatar: '🧹',
  },
  {
    id: 'S006',
    name: 'Elena Torres',
    role: 'Security Officer',
    dept: 'Security',
    zone: 'East Wing',
    status: 'Dispatched',
    shift: '08:00-16:00',
    avatar: '👮‍♀️',
  },
  {
    id: 'S007',
    name: 'Tom Bradley',
    role: 'F&B Staff',
    dept: 'F&B',
    zone: 'Stall 12',
    status: 'On Duty',
    shift: '11:00-21:00',
    avatar: '🍔',
  },
  {
    id: 'S008',
    name: 'Nadia Patel',
    role: 'First Aider',
    dept: 'Medical',
    zone: 'VIP Lounge',
    status: 'On Duty',
    shift: '13:00-21:00',
    avatar: '🩺',
  },
];

const SHIFTS = [
  { label: 'Morning', time: '06:00–14:00', count: 320, color: '#FFC107' },
  { label: 'Afternoon', time: '14:00–20:00', count: 580, color: '#00C8FF' },
  { label: 'Evening', time: '20:00–02:00', count: 340, color: '#7C4DFF' },
];

const STATUS_COLORS: Record<string, string> = {
  'On Duty': '#00E676',
  'On Break': '#FFC107',
  Dispatched: '#FF9800',
  'Off Duty': '#8F9BB3',
};

const DEPT_COLORS: Record<string, string> = {
  Security: '#FF5252',
  Medical: '#00E676',
  'F&B': '#FF9800',
  Cleaning: '#26C6DA',
  Ticketing: '#5A6BFF',
};

export default function StaffManagement() {
  const { theme, themeColors } = useGlobalContext();
  const [dept, setDept] = useState<Dept>('All');

  const filtered = dept === 'All' ? STAFF : STAFF.filter((s) => s.dept === dept);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['rgba(0,230,118,0.12)', 'transparent']} style={styles.bgGrad} />

      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Staff Management</Text>
          <Text style={[styles.headerSub, { color: themeColors.icon }]}>1,240 on duty now</Text>
        </View>
        <MaterialCommunityIcons name="account-plus" size={24} color="#00E676" />
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Shift Overview */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.shiftsRow}>
          {SHIFTS.map((shift) => (
            <View
              key={shift.label}
              style={[
                styles.shiftCard,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}>
              <LinearGradient
                colors={[`${shift.color}22`, 'transparent']}
                style={styles.shiftGrad}
              />
              <Text style={[styles.shiftLabel, { color: shift.color }]}>{shift.label}</Text>
              <Text style={[styles.shiftCount, { color: themeColors.text }]}>{shift.count}</Text>
              <Text style={[styles.shiftTime, { color: themeColors.icon }]}>{shift.time}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Dept Filter */}
        <Animated.View entering={FadeInUp.delay(150)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.deptScroll}
            contentContainerStyle={styles.deptScrollContent}>
            {(['All', 'Security', 'Medical', 'F&B', 'Cleaning', 'Ticketing'] as Dept[]).map((d) => {
              const col = d === 'All' ? '#00E676' : DEPT_COLORS[d];
              return (
                <TouchableOpacity
                  key={d}
                  onPress={() => setDept(d)}
                  style={[
                    styles.deptBtn,
                    {
                      backgroundColor: dept === d ? col : themeColors.card,
                      borderColor: dept === d ? col : themeColors.border,
                    },
                  ]}>
                  <Text
                    style={[styles.deptText, { color: dept === d ? '#000' : themeColors.text }]}>
                    {d}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>

        {/* Staff List */}
        <View style={styles.staffList}>
          {filtered.map((staff, i) => (
            <Animated.View key={staff.id} entering={FadeInDown.delay(200 + i * 40)}>
              <View
                style={[
                  styles.staffCard,
                  { backgroundColor: themeColors.card, borderColor: themeColors.border },
                ]}>
                <View style={styles.staffAvatarWrap}>
                  <Text style={styles.staffAvatar}>{staff.avatar}</Text>
                </View>
                <View style={styles.staffInfo}>
                  <View style={styles.staffNameRow}>
                    <Text style={[styles.staffName, { color: themeColors.text }]}>
                      {staff.name}
                    </Text>
                    <View
                      style={[styles.statusDot, { backgroundColor: STATUS_COLORS[staff.status] }]}
                    />
                  </View>
                  <Text style={[styles.staffRole, { color: themeColors.icon }]}>{staff.role}</Text>
                  <View style={styles.staffMeta}>
                    <View
                      style={[
                        styles.deptTag,
                        { backgroundColor: `${DEPT_COLORS[staff.dept] || '#00C8FF'}22` },
                      ]}>
                      <Text
                        style={[
                          styles.deptTagText,
                          { color: DEPT_COLORS[staff.dept] || '#00C8FF' },
                        ]}>
                        {staff.dept}
                      </Text>
                    </View>
                    <MaterialCommunityIcons name="map-marker" size={12} color={themeColors.icon} />
                    <Text style={[styles.zoneText, { color: themeColors.icon }]}>{staff.zone}</Text>
                  </View>
                </View>
                <View style={styles.staffRight}>
                  <View
                    style={[
                      styles.statusPill,
                      { backgroundColor: `${STATUS_COLORS[staff.status]}22` },
                    ]}>
                    <Text style={[styles.statusText, { color: STATUS_COLORS[staff.status] }]}>
                      {staff.status}
                    </Text>
                  </View>
                  <Text style={[styles.shiftTimeText, { color: themeColors.icon }]}>
                    {staff.shift}
                  </Text>
                </View>
              </View>
            </Animated.View>
          ))}
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
  scrollContent: { paddingHorizontal: Theme.spacing.l, paddingBottom: 100 },
  shiftsRow: { flexDirection: 'row', gap: 10, marginBottom: Theme.spacing.l },
  shiftCard: {
    flex: 1,
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    overflow: 'hidden',
    alignItems: 'center',
    gap: 4,
  },
  shiftGrad: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  shiftLabel: { fontSize: 11, fontWeight: '900' },
  shiftCount: { fontSize: Theme.typography.sizes.xl, fontWeight: '900' },
  shiftTime: { fontSize: 10 },
  deptScroll: { marginBottom: Theme.spacing.l },
  deptScrollContent: { gap: 8, paddingRight: 16 },
  deptBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  deptText: { fontSize: Theme.typography.sizes.s, fontWeight: '700' },
  staffList: { gap: 10 },
  staffCard: {
    flexDirection: 'row',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    alignItems: 'center',
    gap: 12,
  },
  staffAvatarWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(0,200,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  staffAvatar: { fontSize: 22 },
  staffInfo: { flex: 1, gap: 4 },
  staffNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  staffName: { fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  staffRole: { fontSize: 11 },
  staffMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  deptTag: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  deptTagText: { fontSize: 10, fontWeight: '700' },
  zoneText: { fontSize: 10 },
  staffRight: { alignItems: 'flex-end', gap: 6 },
  statusPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: '700' },
  shiftTimeText: { fontSize: 10 },
});
