import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { useColorScheme } from 'react-native';

type ReportCat = 'All' | 'Operations' | 'Safety' | 'Revenue' | 'Attendance';

interface Report {
  id: string;
  title: string;
  category: ReportCat;
  period: string;
  size: string;
  status: 'Ready' | 'Generating' | 'Scheduled';
  generated: string;
  highlights: string[];
  color: string;
  icon: string;
}

const REPORTS: Report[] = [
  {
    id: 'R001',
    title: 'Match Day Operations Summary',
    category: 'Operations',
    period: 'Today',
    size: '2.4 MB',
    status: 'Ready',
    generated: 'Auto-generated',
    highlights: ['1,240 staff deployed', '3 incidents resolved', '99.2% gate uptime'],
    color: '#00C8FF',
    icon: 'clipboard-check',
  },
  {
    id: 'R002',
    title: 'Revenue & Financial Report',
    category: 'Revenue',
    period: 'Today',
    size: '1.8 MB',
    status: 'Ready',
    generated: '10 min ago',
    highlights: ['$2.41M total revenue', '+8.3% vs last match', 'F&B: $480K'],
    color: '#00E676',
    icon: 'currency-usd',
  },
  {
    id: 'R003',
    title: 'Safety & Incident Log',
    category: 'Safety',
    period: 'Today',
    size: '0.9 MB',
    status: 'Ready',
    generated: '5 min ago',
    highlights: ['3 active incidents', '2 medical responses', '0 serious injuries'],
    color: '#FF5252',
    icon: 'shield-check',
  },
  {
    id: 'R004',
    title: 'Crowd Attendance Analysis',
    category: 'Attendance',
    period: 'Today',
    size: '3.1 MB',
    status: 'Ready',
    generated: '15 min ago',
    highlights: ['78,450 attendees', '88% capacity', 'Peak: 15:30 EST'],
    color: '#7C4DFF',
    icon: 'account-group',
  },
  {
    id: 'R005',
    title: 'Weekly Operations Report',
    category: 'Operations',
    period: 'This Week',
    size: '8.2 MB',
    status: 'Generating',
    generated: 'In progress...',
    highlights: ['4 matches analyzed', '92% ops efficiency', 'SLA: 99.1%'],
    color: '#FF9800',
    icon: 'chart-bar',
  },
  {
    id: 'R006',
    title: 'Monthly Revenue Report',
    category: 'Revenue',
    period: 'July 2026',
    size: '-',
    status: 'Scheduled',
    generated: 'Aug 1, 00:00',
    highlights: ['Auto-scheduled', 'PDF + CSV export', 'Sent to executives'],
    color: '#26C6DA',
    icon: 'file-chart',
  },
];

const CAT_COLORS: Record<string, string> = {
  Operations: '#00C8FF',
  Safety: '#FF5252',
  Revenue: '#00E676',
  Attendance: '#7C4DFF',
  All: '#FFC107',
};

const STATUS_CONFIG: Record<string, { color: string; icon: string }> = {
  Ready: { color: '#00E676', icon: 'check-circle' },
  Generating: { color: '#FFC107', icon: 'loading' },
  Scheduled: { color: '#8F9BB3', icon: 'clock-outline' },
};

export default function Reports() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];
  const [cat, setCat] = useState<ReportCat>('All');

  const filtered = cat === 'All' ? REPORTS : REPORTS.filter((r) => r.category === cat);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['rgba(102,187,106,0.12)', 'transparent']} style={styles.bgGrad} />

      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Reports</Text>
          <Text style={[styles.headerSub, { color: themeColors.icon }]}>
            Operations & Analytics Reports
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.newBtn, { backgroundColor: '#66BB6A22', borderColor: '#66BB6A44' }]}>
          <MaterialCommunityIcons name="plus" size={18} color="#66BB6A" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.statsRow}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <MaterialCommunityIcons name="file-document" size={20} color="#66BB6A" />
            <Text style={[styles.statValue, { color: themeColors.text }]}>
              {REPORTS.filter((r) => r.status === 'Ready').length}
            </Text>
            <Text style={[styles.statLabel, { color: themeColors.icon }]}>Ready</Text>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <MaterialCommunityIcons name="loading" size={20} color="#FFC107" />
            <Text style={[styles.statValue, { color: themeColors.text }]}>
              {REPORTS.filter((r) => r.status === 'Generating').length}
            </Text>
            <Text style={[styles.statLabel, { color: themeColors.icon }]}>Generating</Text>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#8F9BB3" />
            <Text style={[styles.statValue, { color: themeColors.text }]}>
              {REPORTS.filter((r) => r.status === 'Scheduled').length}
            </Text>
            <Text style={[styles.statLabel, { color: themeColors.icon }]}>Scheduled</Text>
          </View>
        </Animated.View>

        {/* Category Filter */}
        <Animated.View entering={FadeInUp.delay(150)}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.catScroll}
            contentContainerStyle={styles.catContent}>
            {(['All', 'Operations', 'Revenue', 'Safety', 'Attendance'] as ReportCat[]).map((c) => {
              const col = CAT_COLORS[c];
              return (
                <TouchableOpacity
                  key={c}
                  onPress={() => setCat(c)}
                  style={[
                    styles.catBtn,
                    {
                      backgroundColor: cat === c ? col : themeColors.card,
                      borderColor: cat === c ? col : themeColors.border,
                    },
                  ]}>
                  <Text style={[styles.catText, { color: cat === c ? '#000' : themeColors.text }]}>
                    {c}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Animated.View>

        {/* Reports List */}
        <View style={styles.list}>
          {filtered.map((report, i) => {
            const stCfg = STATUS_CONFIG[report.status];
            return (
              <Animated.View key={report.id} entering={FadeInDown.delay(200 + i * 40)}>
                <View
                  style={[
                    styles.reportCard,
                    { backgroundColor: themeColors.card, borderColor: themeColors.border },
                  ]}>
                  <LinearGradient
                    colors={[`${report.color}12`, 'transparent']}
                    style={styles.reportGrad}
                  />

                  <View style={styles.reportHeader}>
                    <View style={[styles.iconCircle, { backgroundColor: `${report.color}22` }]}>
                      <MaterialCommunityIcons
                        name={report.icon as any}
                        size={22}
                        color={report.color}
                      />
                    </View>
                    <View style={styles.reportTitleWrap}>
                      <Text style={[styles.reportTitle, { color: themeColors.text }]}>
                        {report.title}
                      </Text>
                      <View style={styles.reportMeta}>
                        <View
                          style={[
                            styles.catPill,
                            { backgroundColor: `${CAT_COLORS[report.category]}22` },
                          ]}>
                          <Text
                            style={[styles.catPillText, { color: CAT_COLORS[report.category] }]}>
                            {report.category}
                          </Text>
                        </View>
                        <Text style={[styles.period, { color: themeColors.icon }]}>
                          📅 {report.period}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.statusPill, { backgroundColor: `${stCfg.color}22` }]}>
                      <MaterialCommunityIcons
                        name={stCfg.icon as any}
                        size={12}
                        color={stCfg.color}
                      />
                      <Text style={[styles.statusText, { color: stCfg.color }]}>
                        {report.status}
                      </Text>
                    </View>
                  </View>

                  {/* Highlights */}
                  <View style={styles.highlights}>
                    {report.highlights.map((h, hi) => (
                      <View key={hi} style={styles.highlightRow}>
                        <View style={[styles.dot, { backgroundColor: report.color }]} />
                        <Text style={[styles.highlightText, { color: themeColors.icon }]}>{h}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Footer */}
                  <View style={styles.reportFooter}>
                    <Text style={[styles.reportSize, { color: themeColors.icon }]}>
                      {report.size} · {report.generated}
                    </Text>
                    {report.status === 'Ready' && (
                      <View style={styles.actionRow}>
                        <TouchableOpacity
                          style={[
                            styles.actionBtn,
                            {
                              backgroundColor: `${report.color}22`,
                              borderColor: `${report.color}44`,
                            },
                          ]}>
                          <MaterialCommunityIcons name="eye" size={14} color={report.color} />
                          <Text style={[styles.actionText, { color: report.color }]}>View</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.actionBtn,
                            {
                              backgroundColor: `${report.color}22`,
                              borderColor: `${report.color}44`,
                            },
                          ]}>
                          <MaterialCommunityIcons name="download" size={14} color={report.color} />
                          <Text style={[styles.actionText, { color: report.color }]}>Export</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
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
  newBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  statValue: { fontSize: Theme.typography.sizes.l, fontWeight: '900' },
  statLabel: { fontSize: 10 },
  catScroll: { marginBottom: Theme.spacing.l },
  catContent: { gap: 8, paddingRight: 16 },
  catBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  catText: { fontSize: Theme.typography.sizes.s, fontWeight: '700' },
  list: { gap: 12 },
  reportCard: {
    borderRadius: Theme.shapes.borderRadius.l,
    borderWidth: 1,
    padding: Theme.spacing.l,
    overflow: 'hidden',
    gap: 12,
  },
  reportGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 80 },
  reportHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportTitleWrap: { flex: 1, gap: 4 },
  reportTitle: { fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  reportMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  catPill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  catPillText: { fontSize: 10, fontWeight: '700' },
  period: { fontSize: 10 },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: { fontSize: 10, fontWeight: '700' },
  highlights: { gap: 4 },
  highlightRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 5, height: 5, borderRadius: 2.5 },
  highlightText: { fontSize: 12 },
  reportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  reportSize: { fontSize: 11 },
  actionRow: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionText: { fontSize: 11, fontWeight: '700' },
});
