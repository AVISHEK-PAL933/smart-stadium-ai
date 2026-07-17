import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { useColorScheme } from 'react-native';
import { GlassCard } from '../../components/GlassCard';

const ZONES = [
  {
    id: 'Z1',
    name: 'North Stand',
    capacity: 18000,
    current: 16200,
    status: 'Normal',
    color: '#00E676',
  },
  {
    id: 'Z2',
    name: 'South Stand',
    capacity: 20000,
    current: 19800,
    status: 'High',
    color: '#FFC107',
  },
  {
    id: 'Z3',
    name: 'East Wing',
    capacity: 12000,
    current: 11950,
    status: 'Critical',
    color: '#FF5252',
  },
  {
    id: 'Z4',
    name: 'West Wing',
    capacity: 12000,
    current: 9000,
    status: 'Normal',
    color: '#00E676',
  },
  {
    id: 'Z5',
    name: 'VIP Lounge',
    capacity: 2000,
    current: 1800,
    status: 'Normal',
    color: '#00E676',
  },
  {
    id: 'Z6',
    name: 'Concourse A',
    capacity: 8000,
    current: 6800,
    status: 'Normal',
    color: '#00E676',
  },
];

const FLOW_DATA = [
  { time: '15:00', entries: 1200, exits: 400 },
  { time: '15:15', entries: 980, exits: 320 },
  { time: '15:30', entries: 650, exits: 550 },
  { time: '15:45', entries: 400, exits: 820 },
  { time: '16:00', entries: 200, exits: 1100 },
];

const ALERTS = [
  {
    zone: 'East Wing',
    message: 'Crowd density exceeds 99% — deploy staff',
    severity: 'Critical',
    time: '2m ago',
  },
  {
    zone: 'South Stand',
    message: 'Entry rate above safe threshold',
    severity: 'Warning',
    time: '8m ago',
  },
  { zone: 'Gate 7', message: 'Queue length > 300 people', severity: 'Warning', time: '12m ago' },
];

export default function CrowdAnalytics() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];
  const [view, setView] = useState<'zones' | 'flow' | 'alerts'>('zones');

  const totalCurrent = ZONES.reduce((a, z) => a + z.current, 0);
  const totalCapacity = ZONES.reduce((a, z) => a + z.capacity, 0);
  const overallPct = Math.round((totalCurrent / totalCapacity) * 100);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['rgba(124,77,255,0.15)', 'transparent']} style={styles.bgGrad} />

      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Crowd Analytics</Text>
          <Text style={[styles.headerSub, { color: themeColors.icon }]}>Live density & flow</Text>
        </View>
        <View style={[styles.liveBadge]}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Overall Occupancy */}
        <Animated.View entering={FadeInUp.delay(100)}>
          <GlassCard style={styles.overallCard} gradientColors={['rgba(124,77,255,0.25)', 'rgba(64,196,255,0.1)']} borderColor="rgba(124,77,255,0.4)">
            <Text style={[styles.overallLabel, { color: themeColors.icon }]}>
              Overall Stadium Occupancy
            </Text>
            <Text style={[styles.overallValue, { color: themeColors.text }]}>
              {totalCurrent.toLocaleString()} / {totalCapacity.toLocaleString()}
            </Text>
            <View style={[styles.bigBarBg, { backgroundColor: 'rgba(124,77,255,0.2)' }]}>
              <View
                style={[
                  styles.bigBarFill,
                  {
                    width: `${overallPct}%`,
                    backgroundColor:
                      overallPct > 95 ? '#FF5252' : overallPct > 85 ? '#FFC107' : '#7C4DFF',
                  },
                ]}
              />
            </View>
            <Text style={[styles.overallPct, { color: overallPct > 95 ? '#FF5252' : '#7C4DFF' }]}>
              {overallPct}% Capacity
            </Text>
          </GlassCard>
        </Animated.View>

        {/* Tabs */}
        <Animated.View entering={FadeInUp.delay(150)} style={styles.tabRow}>
          {(['zones', 'flow', 'alerts'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setView(t)}
              style={[
                styles.tabBtn,
                {
                  backgroundColor: view === t ? '#7C4DFF' : themeColors.card,
                  borderColor: view === t ? '#7C4DFF' : themeColors.border,
                },
              ]}>
              <Text style={[styles.tabText, { color: view === t ? '#FFF' : themeColors.text }]}>
                {t === 'zones'
                  ? '🗺️ Zones'
                  : t === 'flow'
                    ? '📊 Flow'
                    : `🚨 Alerts (${ALERTS.length})`}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Zones View */}
        {view === 'zones' && (
          <View style={styles.zonesList}>
            {ZONES.map((zone, i) => {
              const pct = Math.round((zone.current / zone.capacity) * 100);
              return (
                <Animated.View key={zone.id} entering={FadeInDown.delay(200 + i * 50)}>
                  <GlassCard style={styles.zoneCard} gradientColors={[`${zone.color}15`, 'transparent']} borderColor={`${zone.color}44`}>
                    <View style={styles.zoneHeader}>
                      <View style={[styles.zoneIdBadge, { backgroundColor: `${zone.color}22` }]}>
                        <Text style={[styles.zoneId, { color: zone.color }]}>{zone.id}</Text>
                      </View>
                      <Text style={[styles.zoneName, { color: themeColors.text }]}>
                        {zone.name}
                      </Text>
                      <View style={[styles.statusPill, { backgroundColor: `${zone.color}22` }]}>
                        <Text style={[styles.statusText, { color: zone.color }]}>
                          {zone.status}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.zoneBarBg, { backgroundColor: `${zone.color}22` }]}>
                      <View
                        style={[
                          styles.zoneBarFill,
                          { width: `${pct}%`, backgroundColor: zone.color },
                        ]}
                      />
                    </View>
                    <View style={styles.zoneFooter}>
                      <Text style={[styles.zoneCount, { color: themeColors.icon }]}>
                        {zone.current.toLocaleString()} people
                      </Text>
                      <Text style={[styles.zonePct, { color: zone.color }]}>{pct}%</Text>
                    </View>
                  </GlassCard>
                </Animated.View>
              );
            })}
          </View>
        )}

        {/* Flow View */}
        {view === 'flow' && (
          <Animated.View entering={FadeInUp.delay(200)}>
            <GlassCard style={styles.flowCard} gradientColors={['rgba(0,200,255,0.1)', 'transparent']} borderColor="rgba(0,200,255,0.3)">
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
                Entry / Exit Flow (Last 60 min)
              </Text>
              {FLOW_DATA.map((row) => (
                <View key={row.time} style={styles.flowRow}>
                  <Text style={[styles.flowTime, { color: themeColors.icon }]}>{row.time}</Text>
                  <View style={styles.flowBars}>
                    <View style={styles.flowBarRow}>
                      <Text style={styles.flowBarLabel}>IN</Text>
                      <View style={[styles.flowBarBg, { backgroundColor: '#00C8FF22' }]}>
                        <View
                          style={[
                            styles.flowBarFill,
                            { width: `${(row.entries / 1400) * 100}%`, backgroundColor: '#00C8FF' },
                          ]}
                        />
                      </View>
                      <Text style={[styles.flowVal, { color: '#00C8FF' }]}>{row.entries}</Text>
                    </View>
                    <View style={styles.flowBarRow}>
                      <Text style={styles.flowBarLabel}>OUT</Text>
                      <View style={[styles.flowBarBg, { backgroundColor: '#FF525222' }]}>
                        <View
                          style={[
                            styles.flowBarFill,
                            { width: `${(row.exits / 1400) * 100}%`, backgroundColor: '#FF5252' },
                          ]}
                        />
                      </View>
                      <Text style={[styles.flowVal, { color: '#FF5252' }]}>{row.exits}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </GlassCard>
          </Animated.View>
        )}

        {/* Alerts View */}
        {view === 'alerts' && (
          <View style={styles.alertsList}>
            {ALERTS.map((alert, i) => (
              <Animated.View key={i} entering={FadeInDown.delay(200 + i * 60)}>
                <GlassCard
                  style={styles.alertCard}
                  gradientColors={[
                    alert.severity === 'Critical' ? 'rgba(255,82,82,0.15)' : 'rgba(255,193,7,0.15)',
                    'transparent'
                  ]}
                  borderColor={alert.severity === 'Critical' ? 'rgba(255,82,82,0.4)' : 'rgba(255,193,7,0.4)'}>
                  <View style={styles.alertHeader}>
                    <MaterialCommunityIcons
                      name={alert.severity === 'Critical' ? 'alert-octagon' : 'alert'}
                      size={20}
                      color={alert.severity === 'Critical' ? '#FF5252' : '#FFC107'}
                    />
                    <Text style={[styles.alertZone, { color: themeColors.text }]}>
                      {alert.zone}
                    </Text>
                    <View
                      style={[
                        styles.severityPill,
                        {
                          backgroundColor:
                            alert.severity === 'Critical' ? '#FF525222' : '#FFC10722',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.severityText,
                          { color: alert.severity === 'Critical' ? '#FF5252' : '#FFC107' },
                        ]}>
                        {alert.severity}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.alertMsg, { color: themeColors.text }]}>
                    {alert.message}
                  </Text>
                  <Text style={[styles.alertTime, { color: themeColors.icon }]}>{alert.time}</Text>
                </GlassCard>
              </Animated.View>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 250 },
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
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#00E676' },
  liveText: { color: '#00E676', fontSize: 11, fontWeight: '900' },
  scrollContent: { paddingHorizontal: Theme.spacing.l, paddingBottom: 100 },
  overallCard: {
    borderRadius: Theme.shapes.borderRadius.l,
    borderWidth: 1,
    padding: Theme.spacing.l,
    marginBottom: Theme.spacing.l,
    overflow: 'hidden',
  },
  cardGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 80 },
  overallLabel: { fontSize: 12, marginBottom: 4 },
  overallValue: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: '900',
    marginBottom: Theme.spacing.m,
  },
  bigBarBg: { height: 12, borderRadius: 6, overflow: 'hidden', marginBottom: 8 },
  bigBarFill: { height: '100%', borderRadius: 6 },
  overallPct: { fontSize: Theme.typography.sizes.m, fontWeight: '900' },
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: Theme.spacing.l },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  tabText: { fontSize: 11, fontWeight: '700' },
  zonesList: { gap: 12 },
  zoneCard: {
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    gap: 10,
  },
  zoneHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  zoneIdBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneId: { fontSize: 11, fontWeight: '900' },
  zoneName: { flex: 1, fontSize: Theme.typography.sizes.s, fontWeight: '700' },
  statusPill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  statusText: { fontSize: 11, fontWeight: '700' },
  zoneBarBg: { height: 8, borderRadius: 4, overflow: 'hidden' },
  zoneBarFill: { height: '100%', borderRadius: 4 },
  zoneFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  zoneCount: { fontSize: 12 },
  zonePct: { fontSize: 12, fontWeight: '900' },
  flowCard: {
    borderRadius: Theme.shapes.borderRadius.l,
    borderWidth: 1,
    padding: Theme.spacing.l,
    gap: 16,
  },
  sectionTitle: { fontSize: Theme.typography.sizes.m, fontWeight: '900' },
  flowRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  flowTime: { width: 45, fontSize: 12, fontWeight: '700' },
  flowBars: { flex: 1, gap: 6 },
  flowBarRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  flowBarLabel: { width: 22, fontSize: 10, fontWeight: '900', color: '#8F9BB3' },
  flowBarBg: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  flowBarFill: { height: '100%', borderRadius: 4 },
  flowVal: { width: 36, fontSize: 11, fontWeight: '700', textAlign: 'right' },
  alertsList: { gap: 12 },
  alertCard: {
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    overflow: 'hidden',
    gap: 8,
  },
  alertGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 60 },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  alertZone: { flex: 1, fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  severityPill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  severityText: { fontSize: 11, fontWeight: '700' },
  alertMsg: { fontSize: Theme.typography.sizes.s },
  alertTime: { fontSize: 11 },
});
