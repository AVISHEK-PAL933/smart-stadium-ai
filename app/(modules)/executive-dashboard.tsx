import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { useColorScheme } from 'react-native';

const KPI_CARDS = [
  {
    label: 'Total Revenue',
    value: '$2.41M',
    change: '+8.3%',
    up: true,
    icon: 'currency-usd',
    color: '#00E676',
  },
  {
    label: 'Attendance',
    value: '78,450',
    change: '+2.1%',
    up: true,
    icon: 'account-multiple',
    color: '#00C8FF',
  },
  {
    label: 'Fan Satisfaction',
    value: '94.2%',
    change: '+1.5%',
    up: true,
    icon: 'emoticon-happy',
    color: '#FFC107',
  },
  {
    label: 'Incidents',
    value: '3',
    change: '-40%',
    up: true,
    icon: 'alert-circle',
    color: '#FF5252',
  },
  {
    label: 'F&B Revenue',
    value: '$480K',
    change: '+12%',
    up: true,
    icon: 'food',
    color: '#FF9800',
  },
  {
    label: 'Parking Revenue',
    value: '$124K',
    change: '+5%',
    up: true,
    icon: 'parking',
    color: '#26C6DA',
  },
];

const HOURLY_REVENUE = [40, 55, 70, 90, 65, 120, 180, 210, 195, 230, 240, 225];
const HOURS = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];

const DEPT_PERFORMANCE = [
  { dept: 'Food & Beverage', score: 94, color: '#FF9800' },
  { dept: 'Security', score: 98, color: '#FF5252' },
  { dept: 'Parking', score: 87, color: '#26C6DA' },
  { dept: 'Ticketing', score: 99, color: '#5A6BFF' },
  { dept: 'Cleaning', score: 91, color: '#66BB6A' },
];

export default function ExecutiveDashboard() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];
  const [selectedPeriod, setSelectedPeriod] = useState<'Today' | 'Week' | 'Month'>('Today');
  const maxBar = Math.max(...HOURLY_REVENUE);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['rgba(0,200,255,0.15)', 'transparent']} style={styles.bgGrad} />

      {/* Header */}
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Executive Dashboard</Text>
          <Text style={[styles.headerSub, { color: themeColors.icon }]}>Real-time KPIs</Text>
        </View>
        <View
          style={[styles.exportBtn, { backgroundColor: '#00C8FF22', borderColor: '#00C8FF44' }]}>
          <MaterialCommunityIcons name="download" size={18} color="#00C8FF" />
        </View>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.periodRow}>
          {(['Today', 'Week', 'Month'] as const).map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setSelectedPeriod(p)}
              style={[
                styles.periodBtn,
                {
                  backgroundColor: selectedPeriod === p ? '#00C8FF' : themeColors.card,
                  borderColor: selectedPeriod === p ? '#00C8FF' : themeColors.border,
                },
              ]}>
              <Text
                style={[
                  styles.periodText,
                  { color: selectedPeriod === p ? '#000' : themeColors.text },
                ]}>
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* KPI Grid */}
        <View style={styles.kpiGrid}>
          {KPI_CARDS.map((kpi, i) => (
            <Animated.View
              key={kpi.label}
              entering={FadeInDown.delay(150 + i * 40)}
              style={styles.kpiCardWrap}>
              <View
                style={[
                  styles.kpiCard,
                  { backgroundColor: themeColors.card, borderColor: themeColors.border },
                ]}>
                <LinearGradient colors={[`${kpi.color}18`, 'transparent']} style={styles.kpiGrad} />
                <View style={[styles.kpiIconCircle, { backgroundColor: `${kpi.color}22` }]}>
                  <MaterialCommunityIcons name={kpi.icon as any} size={22} color={kpi.color} />
                </View>
                <Text style={[styles.kpiValue, { color: themeColors.text }]}>{kpi.value}</Text>
                <Text style={[styles.kpiLabel, { color: themeColors.icon }]}>{kpi.label}</Text>
                <View style={styles.kpiChangeRow}>
                  <MaterialCommunityIcons
                    name={kpi.up ? 'trending-up' : 'trending-down'}
                    size={14}
                    color={kpi.up ? '#00E676' : '#FF5252'}
                  />
                  <Text style={[styles.kpiChange, { color: kpi.up ? '#00E676' : '#FF5252' }]}>
                    {kpi.change}
                  </Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Revenue Chart */}
        <Animated.View
          entering={FadeInUp.delay(400)}
          style={[
            styles.chartCard,
            { backgroundColor: themeColors.card, borderColor: themeColors.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Hourly Revenue Flow
          </Text>
          <Text style={[styles.chartSub, { color: themeColors.icon }]}>Today — $2.41M total</Text>
          <View style={styles.chartArea}>
            {HOURLY_REVENUE.map((val, i) => (
              <View key={i} style={styles.barCol}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: (val / maxBar) * 100,
                      backgroundColor: i === HOURLY_REVENUE.length - 1 ? '#00C8FF' : '#00C8FF55',
                    },
                  ]}
                />
                <Text style={[styles.barLabel, { color: themeColors.icon }]}>{HOURS[i]}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Department Performance */}
        <Animated.View
          entering={FadeInUp.delay(500)}
          style={[
            styles.deptCard,
            { backgroundColor: themeColors.card, borderColor: themeColors.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Department Performance
          </Text>
          {DEPT_PERFORMANCE.map((dept) => (
            <View key={dept.dept} style={styles.deptRow}>
              <Text style={[styles.deptName, { color: themeColors.text }]}>{dept.dept}</Text>
              <View style={[styles.deptBarBg, { backgroundColor: `${dept.color}22` }]}>
                <View
                  style={[
                    styles.deptBarFill,
                    { width: `${dept.score}%`, backgroundColor: dept.color },
                  ]}
                />
              </View>
              <Text style={[styles.deptScore, { color: dept.color }]}>{dept.score}%</Text>
            </View>
          ))}
        </Animated.View>

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
  exportBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: { paddingHorizontal: Theme.spacing.l, paddingBottom: 100 },
  periodRow: { flexDirection: 'row', gap: 10, marginBottom: Theme.spacing.l },
  periodBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  periodText: { fontSize: Theme.typography.sizes.s, fontWeight: '700' },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: Theme.spacing.l },
  kpiCardWrap: { width: '47%' },
  kpiCard: {
    borderRadius: Theme.shapes.borderRadius.l,
    borderWidth: 1,
    padding: Theme.spacing.m,
    overflow: 'hidden',
  },
  kpiGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 60 },
  kpiIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.s,
  },
  kpiValue: { fontSize: Theme.typography.sizes.l, fontWeight: '900' },
  kpiLabel: { fontSize: 11, marginVertical: 2 },
  kpiChangeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  kpiChange: { fontSize: 11, fontWeight: '700' },
  chartCard: {
    borderRadius: Theme.shapes.borderRadius.l,
    borderWidth: 1,
    padding: Theme.spacing.l,
    marginBottom: Theme.spacing.l,
  },
  sectionTitle: { fontSize: Theme.typography.sizes.m, fontWeight: '900', marginBottom: 4 },
  chartSub: { fontSize: 12, marginBottom: Theme.spacing.l },
  chartArea: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 120 },
  barCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 4 },
  bar: { width: '100%', borderRadius: 4, minHeight: 4 },
  barLabel: { fontSize: 9, fontWeight: '700' },
  deptCard: {
    borderRadius: Theme.shapes.borderRadius.l,
    borderWidth: 1,
    padding: Theme.spacing.l,
    gap: 14,
  },
  deptRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  deptName: { width: 120, fontSize: 12, fontWeight: '600' },
  deptBarBg: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  deptBarFill: { height: '100%', borderRadius: 4 },
  deptScore: { width: 36, textAlign: 'right', fontSize: 12, fontWeight: '700' },
});
