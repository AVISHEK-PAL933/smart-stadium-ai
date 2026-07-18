import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';


const FORECASTS = [
  {
    id: 'F1',
    title: 'Crowd Surge — Half Time',
    description:
      'AI predicts 94% probability of heavy crowd movement between 15:45-16:00. Deploy 80 additional staff to concourse exits.',
    confidence: 94,
    impact: 'High',
    category: 'Safety',
    color: '#FF5252',
    icon: 'account-group',
    timeframe: 'Next 25 min',
  },
  {
    id: 'F2',
    title: 'F&B Revenue Peak',
    description:
      'Expected 40% spike in food & beverage orders in next 15 minutes. Recommend activating reserve stock at Concourse A.',
    confidence: 88,
    impact: 'Medium',
    category: 'Revenue',
    color: '#FF9800',
    icon: 'food',
    timeframe: 'Next 15 min',
  },
  {
    id: 'F3',
    title: 'Parking Exit Congestion',
    description:
      'Post-match traffic model projects 78 min average exit time. Open alternate routes via Zone B to reduce by ~22 min.',
    confidence: 91,
    impact: 'High',
    category: 'Operations',
    color: '#26C6DA',
    icon: 'car',
    timeframe: 'Post-Match',
  },
  {
    id: 'F4',
    title: 'Weather Impact',
    description:
      'Light rain expected at 17:30. Fan comfort score may drop 12%. Enable covered walkways and deploy 200 umbrellas.',
    confidence: 76,
    impact: 'Medium',
    category: 'Experience',
    color: '#5A6BFF',
    icon: 'weather-rainy',
    timeframe: '18:30 EST',
  },
  {
    id: 'F5',
    title: 'Medical Resource Alert',
    description:
      'Historical data for this fixture type shows 3× higher medical incidents. Pre-position 2 additional medical units at East Wing.',
    confidence: 82,
    impact: 'High',
    category: 'Safety',
    color: '#00E676',
    icon: 'medical-bag',
    timeframe: 'Ongoing',
  },
];

const AI_INSIGHTS = [
  { label: 'Prediction Accuracy', value: '94.2%', color: '#00E676', icon: 'check-circle' },
  { label: 'Models Active', value: '12', color: '#00C8FF', icon: 'brain' },
  { label: 'Data Points/s', value: '4.2K', color: '#AB47BC', icon: 'database' },
  { label: 'Alerts Generated', value: '38', color: '#FFC107', icon: 'bell' },
];

const IMPACT_COLORS: Record<string, string> = {
  High: '#FF5252',
  Medium: '#FFC107',
  Low: '#00E676',
};

export default function AIPredictiveAnalytics() {
  const { theme, themeColors } = useGlobalContext();
  const [filter, setFilter] = useState<'All' | 'Safety' | 'Revenue' | 'Operations' | 'Experience'>(
    'All'
  );

  const filtered = filter === 'All' ? FORECASTS : FORECASTS.filter((f) => f.category === filter);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['rgba(171,71,188,0.15)', 'transparent']} style={styles.bgGrad} />

      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>
            AI Predictive Analytics
          </Text>
          <Text style={[styles.headerSub, { color: themeColors.icon }]}>Forecasts & Insights</Text>
        </View>
        <MaterialCommunityIcons name="brain" size={24} color="#AB47BC" />
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* AI Metrics */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.metricsRow}>
          {AI_INSIGHTS.map((ins) => (
            <View
              key={ins.label}
              style={[
                styles.metricCard,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}>
              <MaterialCommunityIcons name={ins.icon as any} size={20} color={ins.color} />
              <Text style={[styles.metricValue, { color: themeColors.text }]}>{ins.value}</Text>
              <Text style={[styles.metricLabel, { color: themeColors.icon }]}>{ins.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Category Filter */}
        <Animated.View entering={FadeInUp.delay(150)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
            contentContainerStyle={styles.filterContent}>
            {(['All', 'Safety', 'Revenue', 'Operations', 'Experience'] as const).map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setFilter(cat)}
                style={[
                  styles.filterBtn,
                  {
                    backgroundColor: filter === cat ? '#AB47BC' : themeColors.card,
                    borderColor: filter === cat ? '#AB47BC' : themeColors.border,
                  },
                ]}>
                <Text
                  style={[
                    styles.filterText,
                    { color: filter === cat ? '#FFF' : themeColors.text },
                  ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Forecasts */}
        <View style={styles.forecastsList}>
          {filtered.map((forecast, i) => (
            <Animated.View key={forecast.id} entering={FadeInDown.delay(200 + i * 50)}>
              <View
                style={[
                  styles.forecastCard,
                  { backgroundColor: themeColors.card, borderColor: `${forecast.color}33` },
                ]}>
                <LinearGradient
                  colors={[`${forecast.color}14`, 'transparent']}
                  style={styles.forecastGrad}
                />

                {/* Header */}
                <View style={styles.forecastHeader}>
                  <View style={[styles.iconCircle, { backgroundColor: `${forecast.color}22` }]}>
                    <MaterialCommunityIcons
                      name={forecast.icon as any}
                      size={22}
                      color={forecast.color}
                    />
                  </View>
                  <View style={styles.forecastTitleWrap}>
                    <Text style={[styles.forecastTitle, { color: themeColors.text }]}>
                      {forecast.title}
                    </Text>
                    <View style={styles.forecastMeta}>
                      <View style={[styles.catPill, { backgroundColor: `${forecast.color}22` }]}>
                        <Text style={[styles.catText, { color: forecast.color }]}>
                          {forecast.category}
                        </Text>
                      </View>
                      <Text style={[styles.timeframe, { color: themeColors.icon }]}>
                        ⏱ {forecast.timeframe}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.impactPill,
                      { backgroundColor: `${IMPACT_COLORS[forecast.impact]}22` },
                    ]}>
                    <Text style={[styles.impactText, { color: IMPACT_COLORS[forecast.impact] }]}>
                      {forecast.impact}
                    </Text>
                  </View>
                </View>

                {/* Description */}
                <Text style={[styles.forecastDesc, { color: themeColors.text }]}>
                  {forecast.description}
                </Text>

                {/* Confidence */}
                <View style={styles.confidenceRow}>
                  <Text style={[styles.confidenceLabel, { color: themeColors.icon }]}>
                    AI Confidence
                  </Text>
                  <View style={[styles.confBarBg, { backgroundColor: `${forecast.color}22` }]}>
                    <View
                      style={[
                        styles.confBarFill,
                        { width: `${forecast.confidence}%`, backgroundColor: forecast.color },
                      ]}
                    />
                  </View>
                  <Text style={[styles.confidencePct, { color: forecast.color }]}>
                    {forecast.confidence}%
                  </Text>
                </View>

                {/* Action */}
                <TouchableOpacity
                  style={[
                    styles.actionBtn,
                    { borderColor: `${forecast.color}44`, backgroundColor: `${forecast.color}11` },
                  ]}>
                  <MaterialCommunityIcons
                    name="check-circle-outline"
                    size={16}
                    color={forecast.color}
                  />
                  <Text style={[styles.actionText, { color: forecast.color }]}>Take Action</Text>
                </TouchableOpacity>
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
  scrollContent: { paddingHorizontal: Theme.spacing.l, paddingBottom: 100 },
  metricsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: Theme.spacing.l },
  metricCard: {
    width: '47%',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    alignItems: 'center',
    gap: 4,
  },
  metricValue: { fontSize: Theme.typography.sizes.l, fontWeight: '900' },
  metricLabel: { fontSize: 10, textAlign: 'center' },
  filterScroll: { marginBottom: Theme.spacing.l },
  filterContent: { gap: 8, paddingRight: 16 },
  filterBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  filterText: { fontSize: Theme.typography.sizes.s, fontWeight: '700' },
  forecastsList: { gap: 14 },
  forecastCard: {
    borderRadius: Theme.shapes.borderRadius.l,
    borderWidth: 1,
    padding: Theme.spacing.l,
    overflow: 'hidden',
    gap: 12,
  },
  forecastGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 80 },
  forecastHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forecastTitleWrap: { flex: 1, gap: 4 },
  forecastTitle: { fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  forecastMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  catPill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  catText: { fontSize: 10, fontWeight: '700' },
  timeframe: { fontSize: 10 },
  impactPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  impactText: { fontSize: 10, fontWeight: '700' },
  forecastDesc: { fontSize: Theme.typography.sizes.s, lineHeight: 20, opacity: 0.85 },
  confidenceRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  confidenceLabel: { width: 90, fontSize: 11 },
  confBarBg: { flex: 1, height: 8, borderRadius: 4, overflow: 'hidden' },
  confBarFill: { height: '100%', borderRadius: 4 },
  confidencePct: { width: 36, textAlign: 'right', fontSize: 12, fontWeight: '900' },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  actionText: { fontSize: Theme.typography.sizes.s, fontWeight: '700' },
});
