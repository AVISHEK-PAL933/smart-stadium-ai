import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';


const STALLS = [
  {
    id: 'ST01',
    name: 'Burger Bar',
    zone: 'Concourse A',
    status: 'Open',
    queue: 12,
    revenue: '$4,820',
    stock: 85,
    icon: '🍔',
    color: '#FF9800',
  },
  {
    id: 'ST02',
    name: 'Pizza Point',
    zone: 'North Stand',
    status: 'Open',
    queue: 8,
    revenue: '$3,440',
    stock: 72,
    icon: '🍕',
    color: '#FF5252',
  },
  {
    id: 'ST03',
    name: 'Sushi Express',
    zone: 'VIP Lounge',
    status: 'Open',
    queue: 4,
    revenue: '$6,100',
    stock: 60,
    icon: '🍱',
    color: '#00C8FF',
  },
  {
    id: 'ST04',
    name: 'Taco Station',
    zone: 'South Stand',
    status: 'Low Stock',
    queue: 15,
    revenue: '$2,900',
    stock: 25,
    icon: '🌮',
    color: '#FFC107',
  },
  {
    id: 'ST05',
    name: 'Drinks Hub',
    zone: 'Concourse B',
    status: 'Open',
    queue: 20,
    revenue: '$5,600',
    stock: 90,
    icon: '🥤',
    color: '#26C6DA',
  },
  {
    id: 'ST06',
    name: 'Snack Corner',
    zone: 'East Wing',
    status: 'Closed',
    queue: 0,
    revenue: '$1,200',
    stock: 0,
    icon: '🍿',
    color: '#8F9BB3',
  },
];

const ALERTS_FOOD = [
  { message: 'Taco Station — stock below 30%', severity: 'Warning', time: '5m ago' },
  {
    message: 'Queue at Drinks Hub exceeds 20 — open additional register',
    severity: 'Info',
    time: '10m ago',
  },
  { message: 'Snack Corner ran out of stock — closed', severity: 'Critical', time: '35m ago' },
];

const STATUS_COLORS: Record<string, string> = {
  Open: '#00E676',
  'Low Stock': '#FFC107',
  Closed: '#FF5252',
};

export default function FoodOperations() {
  const { theme, themeColors } = useGlobalContext();
  const [tab, setTab] = useState<'stalls' | 'alerts'>('stalls');

  const totalRevenue = STALLS.reduce(
    (acc, s) => acc + parseFloat(s.revenue.replace(/[$,]/g, '')),
    0
  );
  const openCount = STALLS.filter((s) => s.status === 'Open').length;
  const totalQueue = STALLS.reduce((acc, s) => acc + s.queue, 0);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['rgba(255,152,0,0.12)', 'transparent']} style={styles.bgGrad} />

      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Food Operations</Text>
          <Text style={[styles.headerSub, { color: themeColors.icon }]}>F&B Dashboard</Text>
        </View>
        <MaterialCommunityIcons name="refresh" size={22} color="#FF9800" />
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Summary */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.summaryRow}>
          <View
            style={[
              styles.summCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <Text style={[styles.summValue, { color: '#00E676' }]}>
              {openCount}/{STALLS.length}
            </Text>
            <Text style={[styles.summLabel, { color: themeColors.icon }]}>Stalls Open</Text>
          </View>
          <View
            style={[
              styles.summCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <Text style={[styles.summValue, { color: '#FF9800' }]}>{totalQueue}</Text>
            <Text style={[styles.summLabel, { color: themeColors.icon }]}>In Queue</Text>
          </View>
          <View
            style={[
              styles.summCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <Text style={[styles.summValue, { color: '#00C8FF' }]}>
              ${(totalRevenue / 1000).toFixed(1)}K
            </Text>
            <Text style={[styles.summLabel, { color: themeColors.icon }]}>Revenue</Text>
          </View>
        </Animated.View>

        {/* Tabs */}
        <Animated.View entering={FadeInUp.delay(150)} style={styles.tabRow}>
          {(['stalls', 'alerts'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={[
                styles.tabBtn,
                {
                  backgroundColor: tab === t ? '#FF9800' : themeColors.card,
                  borderColor: tab === t ? '#FF9800' : themeColors.border,
                },
              ]}>
              <Text style={[styles.tabText, { color: tab === t ? '#000' : themeColors.text }]}>
                {t === 'stalls' ? '🏪 Stalls' : `⚠️ Alerts (${ALERTS_FOOD.length})`}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Stalls */}
        {tab === 'stalls' && (
          <View style={styles.stallsList}>
            {STALLS.map((stall, i) => (
              <Animated.View key={stall.id} entering={FadeInDown.delay(200 + i * 40)}>
                <View
                  style={[
                    styles.stallCard,
                    { backgroundColor: themeColors.card, borderColor: themeColors.border },
                  ]}>
                  <LinearGradient
                    colors={[`${stall.color}15`, 'transparent']}
                    style={styles.stallGrad}
                  />
                  <View style={styles.stallHeader}>
                    <Text style={styles.stallIcon}>{stall.icon}</Text>
                    <View style={styles.stallInfo}>
                      <Text style={[styles.stallName, { color: themeColors.text }]}>
                        {stall.name}
                      </Text>
                      <Text style={[styles.stallZone, { color: themeColors.icon }]}>
                        {stall.zone}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statusPill,
                        { backgroundColor: `${STATUS_COLORS[stall.status]}22` },
                      ]}>
                      <Text style={[styles.statusText, { color: STATUS_COLORS[stall.status] }]}>
                        {stall.status}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.stallStats}>
                    <View style={styles.stallStat}>
                      <MaterialCommunityIcons
                        name="account-group"
                        size={14}
                        color={themeColors.icon}
                      />
                      <Text style={[styles.stallStatText, { color: themeColors.text }]}>
                        {stall.queue} in queue
                      </Text>
                    </View>
                    <View style={styles.stallStat}>
                      <MaterialCommunityIcons name="currency-usd" size={14} color="#00E676" />
                      <Text style={[styles.stallStatText, { color: '#00E676' }]}>
                        {stall.revenue}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.stockRow}>
                    <Text style={[styles.stockLabel, { color: themeColors.icon }]}>
                      Stock Level
                    </Text>
                    <View style={[styles.stockBarBg, { backgroundColor: `${stall.color}22` }]}>
                      <View
                        style={[
                          styles.stockBarFill,
                          {
                            width: `${stall.stock}%`,
                            backgroundColor: stall.stock < 30 ? '#FF5252' : stall.color,
                          },
                        ]}
                      />
                    </View>
                    <Text
                      style={[
                        styles.stockPct,
                        { color: stall.stock < 30 ? '#FF5252' : stall.color },
                      ]}>
                      {stall.stock}%
                    </Text>
                  </View>
                </View>
              </Animated.View>
            ))}
          </View>
        )}

        {/* Alerts */}
        {tab === 'alerts' && (
          <View style={styles.alertsList}>
            {ALERTS_FOOD.map((alert, i) => {
              const col =
                alert.severity === 'Critical'
                  ? '#FF5252'
                  : alert.severity === 'Warning'
                    ? '#FFC107'
                    : '#00C8FF';
              return (
                <Animated.View key={i} entering={FadeInDown.delay(200 + i * 50)}>
                  <View
                    style={[
                      styles.alertCard,
                      { backgroundColor: themeColors.card, borderColor: `${col}44` },
                    ]}>
                    <MaterialCommunityIcons
                      name={
                        alert.severity === 'Critical'
                          ? 'alert-octagon'
                          : alert.severity === 'Warning'
                            ? 'alert'
                            : 'information'
                      }
                      size={18}
                      color={col}
                    />
                    <View style={styles.alertBody}>
                      <Text style={[styles.alertMsg, { color: themeColors.text }]}>
                        {alert.message}
                      </Text>
                      <Text style={[styles.alertTime, { color: themeColors.icon }]}>
                        {alert.time}
                      </Text>
                    </View>
                    <View style={[styles.severityPill, { backgroundColor: `${col}22` }]}>
                      <Text style={[styles.severityText, { color: col }]}>{alert.severity}</Text>
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
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: Theme.spacing.l },
  summCard: {
    flex: 1,
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    alignItems: 'center',
    gap: 4,
  },
  summValue: { fontSize: Theme.typography.sizes.l, fontWeight: '900' },
  summLabel: { fontSize: 11 },
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: Theme.spacing.l },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  tabText: { fontSize: Theme.typography.sizes.s, fontWeight: '700' },
  stallsList: { gap: 12 },
  stallCard: {
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    overflow: 'hidden',
    gap: 10,
  },
  stallGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 60 },
  stallHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stallIcon: { fontSize: 26 },
  stallInfo: { flex: 1 },
  stallName: { fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  stallZone: { fontSize: 11 },
  statusPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: '700' },
  stallStats: { flexDirection: 'row', gap: 16 },
  stallStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  stallStatText: { fontSize: 12, fontWeight: '600' },
  stockRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stockLabel: { fontSize: 11, width: 70 },
  stockBarBg: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  stockBarFill: { height: '100%', borderRadius: 3 },
  stockPct: { width: 32, textAlign: 'right', fontSize: 11, fontWeight: '700' },
  alertsList: { gap: 12 },
  alertCard: {
    flexDirection: 'row',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    alignItems: 'center',
    gap: 10,
  },
  alertBody: { flex: 1, gap: 3 },
  alertMsg: { fontSize: Theme.typography.sizes.s },
  alertTime: { fontSize: 11 },
  severityPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  severityText: { fontSize: 10, fontWeight: '700' },
});
