import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';


const OPS_MODULES = [
  {
    id: 'executive-dashboard',
    title: 'Executive Dashboard',
    subtitle: 'KPIs & Revenue',
    icon: 'chart-line',
    route: '/(modules)/executive-dashboard',
    color: '#00C8FF',
    alert: null,
  },
  {
    id: 'crowd-analytics',
    title: 'Crowd Analytics',
    subtitle: 'Live density & flow',
    icon: 'account-group',
    route: '/(modules)/crowd-analytics',
    color: '#7C4DFF',
    alert: 'High',
  },
  {
    id: 'incident-management',
    title: 'Incident Management',
    subtitle: 'Active incidents',
    icon: 'alert-octagon',
    route: '/(modules)/incident-management',
    color: '#FF5252',
    alert: '3',
  },
  {
    id: 'staff-management',
    title: 'Staff Management',
    subtitle: 'Roster & shifts',
    icon: 'badge-account',
    route: '/(modules)/staff-management',
    color: '#00E676',
    alert: null,
  },
  {
    id: 'food-operations',
    title: 'Food Operations',
    subtitle: 'Stalls & inventory',
    icon: 'food',
    route: '/(modules)/food-operations',
    color: '#FF9800',
    alert: '2',
  },
  {
    id: 'ticket-operations',
    title: 'Ticket Operations',
    subtitle: 'Sales & gate status',
    icon: 'ticket',
    route: '/(modules)/ticket-operations',
    color: '#5A6BFF',
    alert: null,
  },
  {
    id: 'parking-operations',
    title: 'Parking Operations',
    subtitle: 'Zone occupancy',
    icon: 'parking',
    route: '/(modules)/parking-operations',
    color: '#26C6DA',
    alert: null,
  },
  {
    id: 'ai-predictive-analytics',
    title: 'AI Predictive Analytics',
    subtitle: 'Forecasts & insights',
    icon: 'brain',
    route: '/(modules)/ai-predictive-analytics',
    color: '#AB47BC',
    alert: null,
  },
  {
    id: 'notification-center',
    title: 'Notification Center',
    subtitle: 'Broadcasts & alerts',
    icon: 'bell-ring',
    route: '/(modules)/notification-center',
    color: '#FFC107',
    alert: '5',
  },
  {
    id: 'reports',
    title: 'Reports',
    subtitle: 'Ops & revenue reports',
    icon: 'file-chart',
    route: '/(modules)/reports',
    color: '#66BB6A',
    alert: null,
  },
  {
    id: 'ai-operations-assistant',
    title: 'AI Ops Assistant',
    subtitle: 'Chat-based AI help',
    icon: 'robot-excited',
    route: '/(modules)/ai-operations-assistant',
    color: '#00C8FF',
    alert: null,
  },
];

const LIVE_STATS = [
  { label: 'Attendance', value: '78,450', icon: 'account-multiple', color: '#00C8FF' },
  { label: 'Open Incidents', value: '3', icon: 'alert-circle', color: '#FF5252' },
  { label: 'Staff On-Duty', value: '1,240', icon: 'badge-account', color: '#00E676' },
  { label: 'Revenue Today', value: '$2.4M', icon: 'currency-usd', color: '#FFC107' },
];

export default function AdminDashboard() {
  const { theme, themeColors } = useGlobalContext();
  const [activeFilter, setActiveFilter] = useState<'all' | 'alerts'>('all');

  const displayModules =
    activeFilter === 'alerts' ? OPS_MODULES.filter((m) => m.alert !== null) : OPS_MODULES;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={['rgba(0,200,255,0.18)', 'transparent']}
        style={styles.headerGradient}
      />
      <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>🏟️ Operations Hub</Text>
          <Text style={[styles.headerSub, { color: themeColors.icon }]}>AI Command Center</Text>
        </View>
        <View style={styles.statusDot}>
          <View style={styles.livePulse} />
          <Text style={styles.liveLabel}>LIVE</Text>
        </View>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Live Stats */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.statsRow}>
          {LIVE_STATS.map((stat) => (
            <View
              key={stat.label}
              style={[
                styles.statCard,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}>
              <MaterialCommunityIcons name={stat.icon as any} size={20} color={stat.color} />
              <Text style={[styles.statValue, { color: themeColors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: themeColors.icon }]}>{stat.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Filter */}
        <Animated.View entering={FadeInUp.delay(150)} style={styles.filterRow}>
          {(['all', 'alerts'] as const).map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[
                styles.filterBtn,
                {
                  backgroundColor: activeFilter === f ? '#00C8FF' : themeColors.card,
                  borderColor: activeFilter === f ? '#00C8FF' : themeColors.border,
                },
              ]}>
              <Text
                style={[
                  styles.filterText,
                  { color: activeFilter === f ? '#000' : themeColors.text },
                ]}>
                {f === 'all' ? '🔲 All Modules' : '🚨 Alerts Only'}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Modules Grid */}
        <View style={styles.modulesGrid}>
          {displayModules.map((mod, index) => (
            <Animated.View
              key={mod.id}
              entering={FadeInDown.delay(200 + index * 40)}
              style={styles.moduleCardWrapper}>
              <TouchableOpacity
                onPress={() => router.push(mod.route as any)}
                activeOpacity={0.8}
                style={[
                  styles.moduleCard,
                  { backgroundColor: themeColors.card, borderColor: themeColors.border },
                ]}>
                <LinearGradient
                  colors={[`${mod.color}22`, 'transparent']}
                  style={styles.cardGradient}
                />
                {mod.alert && (
                  <View style={[styles.alertBadge, { backgroundColor: '#FF5252' }]}>
                    <Text style={styles.alertBadgeText}>{mod.alert}</Text>
                  </View>
                )}
                <View style={[styles.iconCircle, { backgroundColor: `${mod.color}22` }]}>
                  <MaterialCommunityIcons name={mod.icon as any} size={28} color={mod.color} />
                </View>
                <Text style={[styles.moduleTitle, { color: themeColors.text }]}>{mod.title}</Text>
                <Text style={[styles.moduleSub, { color: themeColors.icon }]}>{mod.subtitle}</Text>
                <View style={styles.arrowRow}>
                  <MaterialCommunityIcons name="arrow-right" size={16} color={mod.color} />
                </View>
              </TouchableOpacity>
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
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
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
  statusDot: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00E676',
  },
  liveLabel: { color: '#00E676', fontSize: 11, fontWeight: '900' },
  scrollContent: { paddingHorizontal: Theme.spacing.l, paddingBottom: 100 },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: Theme.spacing.m,
  },
  statCard: {
    flex: 1,
    minWidth: '44%',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    alignItems: 'center',
    gap: 4,
  },
  statValue: { fontSize: Theme.typography.sizes.l, fontWeight: '900' },
  statLabel: { fontSize: 11 },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: Theme.spacing.l,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  filterText: { fontSize: Theme.typography.sizes.s, fontWeight: '700' },
  modulesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moduleCardWrapper: { width: '47%' },
  moduleCard: {
    borderRadius: Theme.shapes.borderRadius.l,
    borderWidth: 1,
    padding: Theme.spacing.m,
    overflow: 'hidden',
    position: 'relative',
  },
  cardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  alertBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  alertBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.s,
  },
  moduleTitle: { fontSize: Theme.typography.sizes.s, fontWeight: '900', marginBottom: 2 },
  moduleSub: { fontSize: 11, marginBottom: Theme.spacing.s },
  arrowRow: { alignItems: 'flex-end' },
});
