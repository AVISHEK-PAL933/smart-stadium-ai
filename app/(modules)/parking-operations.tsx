import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { useColorScheme } from 'react-native';

const PARKING_ZONES = [
  {
    id: 'P1',
    name: 'Zone A - North',
    total: 1200,
    occupied: 1120,
    ev: 40,
    evOccupied: 38,
    status: 'Almost Full',
    color: '#FFC107',
  },
  {
    id: 'P2',
    name: 'Zone B - South',
    total: 1500,
    occupied: 980,
    ev: 60,
    evOccupied: 22,
    status: 'Available',
    color: '#00E676',
  },
  {
    id: 'P3',
    name: 'Zone C - East',
    total: 800,
    occupied: 795,
    ev: 20,
    evOccupied: 19,
    status: 'Full',
    color: '#FF5252',
  },
  {
    id: 'P4',
    name: 'Zone D - VIP',
    total: 200,
    occupied: 190,
    ev: 30,
    evOccupied: 28,
    status: 'Almost Full',
    color: '#FFC107',
  },
  {
    id: 'P5',
    name: 'Zone E - Staff',
    total: 300,
    occupied: 240,
    ev: 10,
    evOccupied: 8,
    status: 'Available',
    color: '#00E676',
  },
];

const ENTRY_GATES = [
  { gate: 'Entry 1', status: 'Open', waitTime: '3 min', queue: 12 },
  { gate: 'Entry 2', status: 'Open', waitTime: '5 min', queue: 28 },
  { gate: 'Entry 3', status: 'Congested', waitTime: '12 min', queue: 65 },
  { gate: 'Entry 4', status: 'Closed', waitTime: '-', queue: 0 },
];

const GATE_COLORS: Record<string, string> = {
  Open: '#00E676',
  Congested: '#FFC107',
  Closed: '#FF5252',
};

export default function ParkingOperations() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];
  const [view, setView] = useState<'zones' | 'gates'>('zones');

  const totalSpaces = PARKING_ZONES.reduce((a, z) => a + z.total, 0);
  const totalOccupied = PARKING_ZONES.reduce((a, z) => a + z.occupied, 0);
  const totalEV = PARKING_ZONES.reduce((a, z) => a + z.ev, 0);
  const totalEVOccupied = PARKING_ZONES.reduce((a, z) => a + z.evOccupied, 0);
  const overallPct = Math.round((totalOccupied / totalSpaces) * 100);
  const evPct = Math.round((totalEVOccupied / totalEV) * 100);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['rgba(38,198,218,0.12)', 'transparent']} style={styles.bgGrad} />

      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Parking Operations</Text>
          <Text style={[styles.headerSub, { color: themeColors.icon }]}>
            Zone & Gate Management
          </Text>
        </View>
        <MaterialCommunityIcons name="refresh" size={22} color="#26C6DA" />
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Overall Stats */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.overallRow}>
          <View
            style={[
              styles.overallCard,
              { backgroundColor: themeColors.card, borderColor: '#26C6DA44' },
            ]}>
            <LinearGradient
              colors={['rgba(38,198,218,0.18)', 'transparent']}
              style={styles.overallGrad}
            />
            <View style={styles.overallStats}>
              <View style={styles.overallStat}>
                <MaterialCommunityIcons name="parking" size={24} color="#26C6DA" />
                <Text style={[styles.overallValue, { color: themeColors.text }]}>
                  {overallPct}%
                </Text>
                <Text style={[styles.overallLabel, { color: themeColors.icon }]}>Occupied</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.overallStat}>
                <MaterialCommunityIcons name="ev-station" size={24} color="#00E676" />
                <Text style={[styles.overallValue, { color: themeColors.text }]}>{evPct}%</Text>
                <Text style={[styles.overallLabel, { color: themeColors.icon }]}>EV Used</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.overallStat}>
                <MaterialCommunityIcons name="map-marker-check" size={24} color="#FFC107" />
                <Text style={[styles.overallValue, { color: themeColors.text }]}>
                  {(totalSpaces - totalOccupied).toLocaleString()}
                </Text>
                <Text style={[styles.overallLabel, { color: themeColors.icon }]}>Free</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Tabs */}
        <Animated.View entering={FadeInUp.delay(150)} style={styles.tabRow}>
          {(['zones', 'gates'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setView(t)}
              style={[
                styles.tabBtn,
                {
                  backgroundColor: view === t ? '#26C6DA' : themeColors.card,
                  borderColor: view === t ? '#26C6DA' : themeColors.border,
                },
              ]}>
              <Text style={[styles.tabText, { color: view === t ? '#000' : themeColors.text }]}>
                {t === 'zones' ? '🅿️ Zones' : '🚦 Entry Gates'}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Zones */}
        {view === 'zones' && (
          <View style={styles.list}>
            {PARKING_ZONES.map((zone, i) => {
              const pct = Math.round((zone.occupied / zone.total) * 100);
              const evPctZone = Math.round((zone.evOccupied / zone.ev) * 100);
              return (
                <Animated.View key={zone.id} entering={FadeInDown.delay(200 + i * 40)}>
                  <View
                    style={[
                      styles.zoneCard,
                      { backgroundColor: themeColors.card, borderColor: themeColors.border },
                    ]}>
                    <LinearGradient
                      colors={[`${zone.color}12`, 'transparent']}
                      style={styles.zoneGrad}
                    />
                    <View style={styles.zoneHeader}>
                      <View style={[styles.zoneIdBadge, { backgroundColor: `${zone.color}22` }]}>
                        <Text style={[styles.zoneId, { color: zone.color }]}>{zone.id}</Text>
                      </View>
                      <View style={styles.zoneInfo}>
                        <Text style={[styles.zoneName, { color: themeColors.text }]}>
                          {zone.name}
                        </Text>
                        <Text style={[styles.zoneFree, { color: themeColors.icon }]}>
                          {zone.total - zone.occupied} spaces free
                        </Text>
                      </View>
                      <View style={[styles.statusPill, { backgroundColor: `${zone.color}22` }]}>
                        <Text style={[styles.statusText, { color: zone.color }]}>
                          {zone.status}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.zoneBarRow}>
                      <Text style={[styles.zoneBarLabel, { color: themeColors.icon }]}>🚗</Text>
                      <View style={[styles.barBg, { backgroundColor: `${zone.color}22` }]}>
                        <View
                          style={[
                            styles.barFill,
                            { width: `${pct}%`, backgroundColor: zone.color },
                          ]}
                        />
                      </View>
                      <Text style={[styles.barPct, { color: zone.color }]}>{pct}%</Text>
                    </View>
                    <View style={styles.zoneBarRow}>
                      <Text style={[styles.zoneBarLabel, { color: themeColors.icon }]}>⚡</Text>
                      <View style={[styles.barBg, { backgroundColor: '#00E67622' }]}>
                        <View
                          style={[
                            styles.barFill,
                            { width: `${evPctZone}%`, backgroundColor: '#00E676' },
                          ]}
                        />
                      </View>
                      <Text style={[styles.barPct, { color: '#00E676' }]}>{evPctZone}%</Text>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        )}

        {/* Gates */}
        {view === 'gates' && (
          <View style={styles.list}>
            {ENTRY_GATES.map((gate, i) => {
              const col = GATE_COLORS[gate.status];
              return (
                <Animated.View key={gate.gate} entering={FadeInDown.delay(200 + i * 50)}>
                  <View
                    style={[
                      styles.gateCard,
                      { backgroundColor: themeColors.card, borderColor: themeColors.border },
                    ]}>
                    <View style={[styles.gateIcon, { backgroundColor: `${col}22` }]}>
                      <MaterialCommunityIcons name="boom-gate-up" size={24} color={col} />
                    </View>
                    <View style={styles.gateInfo}>
                      <Text style={[styles.gateName, { color: themeColors.text }]}>
                        {gate.gate}
                      </Text>
                      <Text style={[styles.gateQueue, { color: themeColors.icon }]}>
                        {gate.queue > 0 ? `${gate.queue} vehicles in queue` : 'No queue'}
                      </Text>
                    </View>
                    <View style={styles.gateRight}>
                      <View style={[styles.statusPill, { backgroundColor: `${col}22` }]}>
                        <Text style={[styles.statusText, { color: col }]}>{gate.status}</Text>
                      </View>
                      <Text style={[styles.waitTime, { color: themeColors.icon }]}>
                        ⏱ {gate.waitTime}
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
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
  scrollContent: { paddingHorizontal: Theme.spacing.l, paddingBottom: 100 },
  overallRow: { marginBottom: Theme.spacing.l },
  overallCard: {
    borderRadius: Theme.shapes.borderRadius.l,
    borderWidth: 1,
    padding: Theme.spacing.l,
    overflow: 'hidden',
  },
  overallGrad: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  overallStats: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  overallStat: { alignItems: 'center', gap: 4 },
  overallValue: { fontSize: Theme.typography.sizes.xl, fontWeight: '900' },
  overallLabel: { fontSize: 11 },
  divider: { width: 1, height: 60, backgroundColor: 'rgba(255,255,255,0.08)' },
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: Theme.spacing.l },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  tabText: { fontSize: Theme.typography.sizes.s, fontWeight: '700' },
  list: { gap: 12 },
  zoneCard: {
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    gap: 10,
    overflow: 'hidden',
  },
  zoneGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 60 },
  zoneHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  zoneIdBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoneId: { fontSize: 12, fontWeight: '900' },
  zoneInfo: { flex: 1 },
  zoneName: { fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  zoneFree: { fontSize: 11 },
  statusPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: '700' },
  zoneBarRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  zoneBarLabel: { width: 20, fontSize: 14 },
  barBg: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
  barPct: { width: 36, textAlign: 'right', fontSize: 11, fontWeight: '700' },
  gateCard: {
    flexDirection: 'row',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    alignItems: 'center',
    gap: 12,
  },
  gateIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gateInfo: { flex: 1 },
  gateName: { fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  gateQueue: { fontSize: 11, marginTop: 2 },
  gateRight: { alignItems: 'flex-end', gap: 6 },
  waitTime: { fontSize: 11 },
});
