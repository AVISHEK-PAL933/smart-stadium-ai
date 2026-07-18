import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';


const GATES = [
  {
    id: 'G1',
    name: 'Gate 1 - North',
    status: 'Open',
    scanned: 12480,
    capacity: 14000,
    queue: 32,
    flags: 0,
  },
  {
    id: 'G2',
    name: 'Gate 2 - North',
    status: 'Open',
    scanned: 11900,
    capacity: 14000,
    queue: 18,
    flags: 0,
  },
  {
    id: 'G3',
    name: 'Gate 3 - East',
    status: 'Open',
    scanned: 8200,
    capacity: 10000,
    queue: 67,
    flags: 2,
  },
  {
    id: 'G4',
    name: 'Gate 4 - South',
    status: 'Closed',
    scanned: 9800,
    capacity: 12000,
    queue: 0,
    flags: 0,
  },
  {
    id: 'G5',
    name: 'Gate 5 - VIP',
    status: 'Open',
    scanned: 1940,
    capacity: 2000,
    queue: 5,
    flags: 1,
  },
  {
    id: 'G6',
    name: 'Gate 6 - West',
    status: 'Open',
    scanned: 10200,
    capacity: 12000,
    queue: 24,
    flags: 0,
  },
];

const TICKET_CATEGORIES = [
  { cat: 'General Admission', sold: 42000, total: 45000, price: '$45', color: '#00C8FF' },
  { cat: 'Premium', sold: 18000, total: 20000, price: '$120', color: '#7C4DFF' },
  { cat: 'VIP', sold: 1980, total: 2000, price: '$350', color: '#FFC107' },
  { cat: 'Corporate Box', sold: 120, total: 150, price: '$1,200', color: '#00E676' },
];

const FRAUD_FLAGS = [
  { ticketId: 'TKT-88471', gate: 'Gate 3', issue: 'Duplicate scan attempt', time: '2m ago' },
  { ticketId: 'TKT-22190', gate: 'Gate 5', issue: 'Invalid sector access', time: '14m ago' },
  { ticketId: 'TKT-56001', gate: 'Gate 3', issue: 'Blacklisted ticket ID', time: '22m ago' },
];

export default function TicketOperations() {
  const { theme, themeColors } = useGlobalContext();
  const [tab, setTab] = useState<'gates' | 'sales' | 'fraud'>('gates');

  const totalScanned = GATES.reduce((a, g) => a + g.scanned, 0);
  const totalFlags = GATES.reduce((a, g) => a + g.flags, 0);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['rgba(90,107,255,0.12)', 'transparent']} style={styles.bgGrad} />

      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Ticket Operations</Text>
          <Text style={[styles.headerSub, { color: themeColors.icon }]}>
            Gate & Sales Dashboard
          </Text>
        </View>
        {totalFlags > 0 && (
          <View style={[styles.flagBadge]}>
            <Text style={styles.flagText}>{totalFlags} flags</Text>
          </View>
        )}
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.statsRow}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <Text style={[styles.statValue, { color: '#5A6BFF' }]}>
              {totalScanned.toLocaleString()}
            </Text>
            <Text style={[styles.statLabel, { color: themeColors.icon }]}>Tickets Scanned</Text>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <Text style={[styles.statValue, { color: '#00E676' }]}>98.5%</Text>
            <Text style={[styles.statLabel, { color: themeColors.icon }]}>Sell-Through</Text>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <Text style={[styles.statValue, { color: '#FF5252' }]}>{totalFlags}</Text>
            <Text style={[styles.statLabel, { color: themeColors.icon }]}>Fraud Flags</Text>
          </View>
        </Animated.View>

        {/* Tabs */}
        <Animated.View entering={FadeInUp.delay(150)} style={styles.tabRow}>
          {(['gates', 'sales', 'fraud'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={[
                styles.tabBtn,
                {
                  backgroundColor: tab === t ? '#5A6BFF' : themeColors.card,
                  borderColor: tab === t ? '#5A6BFF' : themeColors.border,
                },
              ]}>
              <Text style={[styles.tabText, { color: tab === t ? '#FFF' : themeColors.text }]}>
                {t === 'gates'
                  ? '🚪 Gates'
                  : t === 'sales'
                    ? '🎫 Sales'
                    : `🚩 Fraud (${totalFlags})`}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Gates */}
        {tab === 'gates' && (
          <View style={styles.list}>
            {GATES.map((gate, i) => {
              const pct = Math.round((gate.scanned / gate.capacity) * 100);
              const col =
                gate.status === 'Closed' ? '#FF5252' : gate.queue > 50 ? '#FFC107' : '#00E676';
              return (
                <Animated.View key={gate.id} entering={FadeInDown.delay(200 + i * 40)}>
                  <View
                    style={[
                      styles.gateCard,
                      { backgroundColor: themeColors.card, borderColor: themeColors.border },
                    ]}>
                    <View style={styles.gateHeader}>
                      <View style={[styles.gateIconWrap, { backgroundColor: `${col}22` }]}>
                        <MaterialCommunityIcons name="gate" size={22} color={col} />
                      </View>
                      <View style={styles.gateInfo}>
                        <Text style={[styles.gateName, { color: themeColors.text }]}>
                          {gate.name}
                        </Text>
                        <Text style={[styles.gateQueue, { color: themeColors.icon }]}>
                          Queue: {gate.queue} people
                        </Text>
                      </View>
                      <View style={[styles.statusPill, { backgroundColor: `${col}22` }]}>
                        <Text style={[styles.statusText, { color: col }]}>{gate.status}</Text>
                      </View>
                    </View>
                    <View style={[styles.barBg, { backgroundColor: `${col}22` }]}>
                      <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: col }]} />
                    </View>
                    <View style={styles.gateFooter}>
                      <Text style={[styles.gateScanned, { color: themeColors.icon }]}>
                        {gate.scanned.toLocaleString()} / {gate.capacity.toLocaleString()}
                      </Text>
                      {gate.flags > 0 && (
                        <Text style={styles.gateFlags}>🚩 {gate.flags} flags</Text>
                      )}
                      <Text style={[styles.gatePct, { color: col }]}>{pct}%</Text>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        )}

        {/* Sales */}
        {tab === 'sales' && (
          <View style={styles.list}>
            {TICKET_CATEGORIES.map((cat, i) => {
              const pct = Math.round((cat.sold / cat.total) * 100);
              return (
                <Animated.View key={cat.cat} entering={FadeInDown.delay(200 + i * 50)}>
                  <View
                    style={[
                      styles.salesCard,
                      { backgroundColor: themeColors.card, borderColor: themeColors.border },
                    ]}>
                    <LinearGradient
                      colors={[`${cat.color}15`, 'transparent']}
                      style={styles.salesGrad}
                    />
                    <View style={styles.salesHeader}>
                      <Text style={[styles.salesCat, { color: themeColors.text }]}>{cat.cat}</Text>
                      <Text style={[styles.salesPrice, { color: cat.color }]}>{cat.price}</Text>
                    </View>
                    <View style={[styles.barBg, { backgroundColor: `${cat.color}22` }]}>
                      <View
                        style={[styles.barFill, { width: `${pct}%`, backgroundColor: cat.color }]}
                      />
                    </View>
                    <View style={styles.salesFooter}>
                      <Text style={[styles.salesCount, { color: themeColors.icon }]}>
                        {cat.sold.toLocaleString()} / {cat.total.toLocaleString()} sold
                      </Text>
                      <Text style={[styles.salesPct, { color: cat.color }]}>{pct}%</Text>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        )}

        {/* Fraud */}
        {tab === 'fraud' && (
          <View style={styles.list}>
            {FRAUD_FLAGS.map((flag, i) => (
              <Animated.View key={i} entering={FadeInDown.delay(200 + i * 50)}>
                <View
                  style={[
                    styles.fraudCard,
                    { backgroundColor: themeColors.card, borderColor: '#FF525244' },
                  ]}>
                  <LinearGradient
                    colors={['rgba(255,82,82,0.10)', 'transparent']}
                    style={styles.fraudGrad}
                  />
                  <View style={styles.fraudHeader}>
                    <MaterialCommunityIcons name="flag" size={18} color="#FF5252" />
                    <Text style={[styles.fraudId, { color: themeColors.text }]}>
                      {flag.ticketId}
                    </Text>
                    <Text style={[styles.fraudGate, { color: themeColors.icon }]}>{flag.gate}</Text>
                  </View>
                  <Text style={[styles.fraudIssue, { color: themeColors.text }]}>{flag.issue}</Text>
                  <View style={styles.fraudFooter}>
                    <Text style={[styles.fraudTime, { color: themeColors.icon }]}>{flag.time}</Text>
                    <TouchableOpacity style={[styles.resolveBtn]}>
                      <Text style={styles.resolveText}>Block Ticket</Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
  flagBadge: {
    backgroundColor: '#FF525222',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#FF525244',
  },
  flagText: { color: '#FF5252', fontSize: 11, fontWeight: '700' },
  scrollContent: { paddingHorizontal: Theme.spacing.l, paddingBottom: 100 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: Theme.spacing.l },
  statCard: {
    flex: 1,
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    alignItems: 'center',
    gap: 4,
  },
  statValue: { fontSize: Theme.typography.sizes.m, fontWeight: '900' },
  statLabel: { fontSize: 10, textAlign: 'center' },
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: Theme.spacing.l },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  tabText: { fontSize: 11, fontWeight: '700' },
  list: { gap: 12 },
  gateCard: {
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    gap: 10,
  },
  gateHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  gateIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gateInfo: { flex: 1 },
  gateName: { fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  gateQueue: { fontSize: 11 },
  statusPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: '700' },
  barBg: { height: 8, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
  gateFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  gateScanned: { fontSize: 11 },
  gateFlags: { fontSize: 11, color: '#FF5252', fontWeight: '700' },
  gatePct: { fontSize: 12, fontWeight: '900' },
  salesCard: {
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    gap: 10,
    overflow: 'hidden',
  },
  salesGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 60 },
  salesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  salesCat: { fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  salesPrice: { fontSize: Theme.typography.sizes.m, fontWeight: '900' },
  salesFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  salesCount: { fontSize: 11 },
  salesPct: { fontSize: 12, fontWeight: '900' },
  fraudCard: {
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    gap: 8,
    overflow: 'hidden',
  },
  fraudGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 60 },
  fraudHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fraudId: { flex: 1, fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  fraudGate: { fontSize: 11 },
  fraudIssue: { fontSize: Theme.typography.sizes.s },
  fraudFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  fraudTime: { fontSize: 11 },
  resolveBtn: {
    backgroundColor: '#FF525222',
    borderWidth: 1,
    borderColor: '#FF525044',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  resolveText: { color: '#FF5252', fontSize: 11, fontWeight: '700' },
});
