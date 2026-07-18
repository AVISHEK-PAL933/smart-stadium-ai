import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import { Colors } from '../../constants/colors';

import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedBackground } from '../../components/AnimatedBackground';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeIn, FadeOut, useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const DASHBOARD_COLORS = {
  bg: '#081223',
  primary: '#00C8FF',
  low: '#00E676',
  moderate: '#FFC107',
  busy: '#FF9800',
  critical: '#FF5252',
  restricted: '#2979FF',
  panelBg: 'rgba(4, 13, 26, 0.6)',
  panelBorder: 'rgba(0, 200, 255, 0.2)',
};

const GATE_DATA = {
  'gate-a': { id: 'gate-a', name: 'Gate A', status: 'LOW', color: DASHBOARD_COLORS.low, density: '42%', people: '1,204', wait: '2 min', rec: 'Optimal Entry', top: '15%', left: '45%' },
  'gate-b': { id: 'gate-b', name: 'Gate B', status: 'MODERATE', color: DASHBOARD_COLORS.moderate, density: '68%', people: '2,410', wait: '8 min', rec: 'Normal Flow', top: '45%', right: '15%' },
  'gate-c': { id: 'gate-c', name: 'Gate C', status: 'CRITICAL', color: DASHBOARD_COLORS.critical, density: '92%', people: '3,214', wait: '14 min', rec: 'Use Gate D', bottom: '15%', left: '45%' },
  'gate-d': { id: 'gate-d', name: 'Gate D', status: 'LOW', color: DASHBOARD_COLORS.low, density: '38%', people: '890', wait: '1 min', rec: 'Optimal Entry', top: '45%', left: '15%' },
};

const AI_INSIGHTS = [
  { id: 1, icon: 'alert', color: DASHBOARD_COLORS.critical, text: 'Gate C approaching capacity. Recommend redirecting fans to Gate D.' },
  { id: 2, icon: 'parking', color: DASHBOARD_COLORS.low, text: 'Parking Zone B has available spaces. Flow is optimal.' },
  { id: 3, icon: 'food', color: DASHBOARD_COLORS.busy, text: 'Food Court A has high waiting time (Avg 18m).' },
  { id: 4, icon: 'shield-check', color: DASHBOARD_COLORS.low, text: 'Security risk is LOW across all active perimeters.' },
];

export default function CrowdIntelligence() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width > 1024;
  const isTablet = width > 768 && width <= 1024;
  
  const [selectedGate, setSelectedGate] = useState<keyof typeof GATE_DATA | null>(null);

  // Pulse animation for critical markers
  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);
  const pulseStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backBtn} 
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace('/');
          }
        }}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>
      <View style={styles.headerTitleRow}>
        <MaterialCommunityIcons name="account-group" size={28} color={DASHBOARD_COLORS.primary} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Crowd Intelligence</Text>
      </View>
      <View style={styles.headerTags}>
        <View style={[styles.tag, { borderColor: DASHBOARD_COLORS.primary }]}>
          <View style={[styles.dot, { backgroundColor: DASHBOARD_COLORS.primary }]} />
          <Text style={styles.tagText}>AI Monitoring Active</Text>
        </View>
        <View style={[styles.tag, { borderColor: DASHBOARD_COLORS.low }]}>
          <Text style={styles.tagText}>Emergency Level: NORMAL</Text>
        </View>
        <Text style={styles.lastUpdated}>Updated: Live</Text>
      </View>
    </View>
  );

  const renderLeftPanel = () => (
    <View style={[styles.sidePanel, isDesktop ? styles.desktopPanel : styles.mobilePanel]}>
      <Text style={styles.panelTitle}>Live Crowd Summary</Text>
      
      <View style={styles.kpiCard}>
        <Text style={styles.kpiLabel}>Current Attendance</Text>
        <Text style={styles.kpiValue}>72,481</Text>
        <View style={styles.kpiProgressBar}>
          <View style={[styles.kpiProgressFill, { width: '91%', backgroundColor: DASHBOARD_COLORS.primary }]} />
        </View>
        <Text style={styles.kpiSubLabel}>Capacity Used: 91%</Text>
      </View>

      <View style={styles.kpiRow}>
        <View style={styles.kpiHalfCard}>
          <MaterialCommunityIcons name="clock-outline" size={20} color={DASHBOARD_COLORS.moderate} />
          <Text style={styles.kpiSmallValue}>6 min</Text>
          <Text style={styles.kpiSmallLabel}>Avg Wait Time</Text>
        </View>
        <View style={styles.kpiHalfCard}>
          <MaterialCommunityIcons name="door-open" size={20} color={DASHBOARD_COLORS.low} />
          <Text style={styles.kpiSmallValue}>4 / 4</Text>
          <Text style={styles.kpiSmallLabel}>Open Gates</Text>
        </View>
      </View>

      <View style={[styles.kpiCard, { borderColor: DASHBOARD_COLORS.low }]}>
        <View style={styles.alertRow}>
          <MaterialCommunityIcons name="shield-check" size={24} color={DASHBOARD_COLORS.low} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.kpiLabel}>Emergency Alerts</Text>
            <Text style={[styles.kpiValue, { fontSize: 24, color: DASHBOARD_COLORS.low }]}>0 Active</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderRightPanel = () => (
    <View style={[styles.sidePanel, isDesktop ? styles.desktopPanel : styles.mobilePanel]}>
      <Text style={styles.panelTitle}>Alerts & AI Insights</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {AI_INSIGHTS.map((insight, idx) => (
          <Animated.View entering={FadeInUp.delay(200 + idx * 100)} key={insight.id} style={[styles.insightCard, { borderLeftColor: insight.color }]}>
            <MaterialCommunityIcons name={insight.icon as any} size={20} color={insight.color} style={{ marginTop: 2 }} />
            <Text style={styles.insightText}>{insight.text}</Text>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );

  const renderCenterMap = () => (
    <View style={styles.centerMapContainer}>
      {/* 3D Hologram Map */}
      <Image
        source={require('../../assets/hologram_stadium.png')}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['rgba(8, 18, 35, 0.4)', 'rgba(8, 18, 35, 0.1)', 'rgba(8, 18, 35, 0.8)']}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Map Controls */}
      <View style={styles.mapControls}>
        <TouchableOpacity style={styles.controlBtn}><MaterialCommunityIcons name="magnify-plus-outline" size={20} color="#FFF" /></TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn}><MaterialCommunityIcons name="magnify-minus-outline" size={20} color="#FFF" /></TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn}><MaterialCommunityIcons name="image-filter-center-focus" size={20} color="#FFF" /></TouchableOpacity>
        <TouchableOpacity style={styles.controlBtn}><MaterialCommunityIcons name="fullscreen" size={20} color="#FFF" /></TouchableOpacity>
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>DENSITY LEGEND</Text>
        {[
          { label: 'Low', color: DASHBOARD_COLORS.low },
          { label: 'Moderate', color: DASHBOARD_COLORS.moderate },
          { label: 'Busy', color: DASHBOARD_COLORS.busy },
          { label: 'Critical', color: DASHBOARD_COLORS.critical },
          { label: 'Restricted', color: DASHBOARD_COLORS.restricted },
        ].map(item => (
          <View key={item.label} style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Gate Markers */}
      {Object.values(GATE_DATA).map(gate => {
        const isSelected = selectedGate === gate.id;
        const isCritical = gate.status === 'CRITICAL';
        return (
          <Animated.View
            key={gate.id}
            style={[
              styles.markerWrapper,
              { top: (gate as any).top, bottom: (gate as any).bottom, left: (gate as any).left, right: (gate as any).right },
              isCritical && pulseStyle
            ]}
          >
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => setSelectedGate(isSelected ? null : (gate.id as any))}
              style={[
                styles.gateMarker,
                { borderColor: gate.color, backgroundColor: gate.color + '30' },
                isSelected && { backgroundColor: gate.color + '60', transform: [{ scale: 1.1 }] }
              ]}
            >
              <Text style={[styles.markerTitle, { color: gate.color }]}>{gate.name}</Text>
              <Text style={[styles.markerStatus, { color: gate.color }]}>{gate.status}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      {/* Gate Information Panel Overlay */}
      {selectedGate && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.gateInfoOverlay}>
          <LinearGradient
            colors={['rgba(8,18,35,0.9)', 'rgba(8,18,35,0.95)']}
            style={[styles.gateInfoPanel, { borderColor: GATE_DATA[selectedGate].color }]}
          >
            <TouchableOpacity style={styles.closeInfoBtn} onPress={() => setSelectedGate(null)}>
              <MaterialCommunityIcons name="close" size={20} color="#FFF" />
            </TouchableOpacity>
            
            <Text style={[styles.infoTitle, { color: GATE_DATA[selectedGate].color }]}>{GATE_DATA[selectedGate].name} Status</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Crowd Density</Text>
              <Text style={[styles.infoValue, { color: GATE_DATA[selectedGate].color }]}>{GATE_DATA[selectedGate].density}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>People Count</Text>
              <Text style={styles.infoValue}>{GATE_DATA[selectedGate].people}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Average Wait</Text>
              <Text style={styles.infoValue}>{GATE_DATA[selectedGate].wait}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Security Level</Text>
              <Text style={styles.infoValue}>Normal</Text>
            </View>
            
            <View style={styles.infoRecommendation}>
              <MaterialCommunityIcons name="robot-outline" size={16} color={DASHBOARD_COLORS.primary} />
              <Text style={styles.infoRecText}>AI Recommendation: {GATE_DATA[selectedGate].rec}</Text>
            </View>
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  );

  const renderBottomAnalytics = () => (
    <View style={styles.bottomAnalyticsRow}>
      {[
        { title: 'Crowd Heat', val: '78%', icon: 'fire', color: DASHBOARD_COLORS.busy },
        { title: 'Average Queue', val: '6.5m', icon: 'human-queue', color: DASHBOARD_COLORS.moderate },
        { title: 'Evac Readiness', val: '99%', icon: 'exit-run', color: DASHBOARD_COLORS.low },
        { title: 'Security Score', val: '9.8/10', icon: 'shield-star', color: DASHBOARD_COLORS.primary },
      ].map((card, idx) => (
        <Animated.View entering={FadeInUp.delay(400 + idx * 100)} key={card.title} style={styles.analyticsCard}>
          <LinearGradient
            colors={[DASHBOARD_COLORS.panelBg, 'rgba(4,13,26,0.9)']}
            style={styles.analyticsGradient}
          >
            <View style={[styles.analyticsIconBox, { backgroundColor: card.color + '20' }]}>
              <MaterialCommunityIcons name={card.icon as any} size={28} color={card.color} />
            </View>
            <View style={styles.analyticsData}>
              <Text style={[styles.analyticsVal, { color: card.color }]}>{card.val}</Text>
              <Text style={styles.analyticsTitle}>{card.title}</Text>
            </View>
          </LinearGradient>
        </Animated.View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Global Background */}
      <LinearGradient colors={[DASHBOARD_COLORS.bg, '#040914']} style={StyleSheet.absoluteFillObject} />
      <AnimatedBackground />

      {renderHeader()}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.mainDashboard, !isDesktop && { flexDirection: 'column' }]}>
          {isDesktop && renderLeftPanel()}
          
          <View style={[styles.centerColumn, !isDesktop && { height: 500, marginBottom: 16 }]}>
            {renderCenterMap()}
          </View>
          
          {isDesktop && renderRightPanel()}
          
          {/* Mobile stacking */}
          {!isDesktop && (
            <View style={styles.mobilePanelsContainer}>
              {renderLeftPanel()}
              {renderRightPanel()}
            </View>
          )}
        </View>

        {renderBottomAnalytics()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DASHBOARD_COLORS.bg },
  scrollContent: { padding: 16, paddingBottom: 100 },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: DASHBOARD_COLORS.panelBorder,
    backgroundColor: 'rgba(8,18,35,0.8)',
    flexWrap: 'wrap',
    gap: 16,
  },
  backBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8 },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', flex: 1, minWidth: 250 },
  headerIcon: { marginRight: 12, textShadowColor: DASHBOARD_COLORS.primary, textShadowRadius: 10 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#FFF', textTransform: 'uppercase', letterSpacing: 1 },
  headerTags: { flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  tag: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.05)' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8, shadowColor: DASHBOARD_COLORS.primary, shadowRadius: 6, shadowOpacity: 1 },
  tagText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  lastUpdated: { color: '#8F9BB3', fontSize: 12, fontStyle: 'italic' },

  // Layout
  mainDashboard: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  centerColumn: { flex: 1, minHeight: 400, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: DASHBOARD_COLORS.panelBorder },
  mobilePanelsContainer: { gap: 16 },

  // Side Panels
  sidePanel: {
    backgroundColor: DASHBOARD_COLORS.panelBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: DASHBOARD_COLORS.panelBorder,
    padding: 16,
  },
  desktopPanel: { width: '22%', minWidth: 280 },
  mobilePanel: { width: '100%' },
  panelTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },

  // KPI Cards
  kpiCard: { backgroundColor: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  kpiLabel: { color: '#8F9BB3', fontSize: 12, textTransform: 'uppercase', marginBottom: 4 },
  kpiValue: { color: '#FFF', fontSize: 32, fontWeight: '900' },
  kpiProgressBar: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, marginTop: 12, marginBottom: 8, overflow: 'hidden' },
  kpiProgressFill: { height: '100%', borderRadius: 3 },
  kpiSubLabel: { color: '#8F9BB3', fontSize: 12 },
  kpiRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  kpiHalfCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'flex-start' },
  kpiSmallValue: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: 8 },
  kpiSmallLabel: { color: '#8F9BB3', fontSize: 11, marginTop: 4 },
  alertRow: { flexDirection: 'row', alignItems: 'center' },

  // AI Insights
  insightCard: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 12, marginBottom: 12, borderLeftWidth: 4 },
  insightText: { color: '#E4E9F2', fontSize: 13, lineHeight: 20, flex: 1, marginLeft: 12 },

  // Center Map
  centerMapContainer: { flex: 1, position: 'relative', backgroundColor: '#000' },
  mapControls: { position: 'absolute', top: 16, right: 16, gap: 8, zIndex: 20 },
  controlBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(8,18,35,0.8)', borderWidth: 1, borderColor: DASHBOARD_COLORS.panelBorder, justifyContent: 'center', alignItems: 'center' },
  
  legendContainer: { position: 'absolute', bottom: 16, left: 16, backgroundColor: 'rgba(8,18,35,0.8)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: DASHBOARD_COLORS.panelBorder, zIndex: 20 },
  legendTitle: { color: '#FFF', fontSize: 10, fontWeight: 'bold', marginBottom: 8, letterSpacing: 1 },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  legendLabel: { color: '#8F9BB3', fontSize: 12 },

  markerWrapper: { position: 'absolute', zIndex: 10, alignItems: 'center', justifyContent: 'center' },
  gateMarker: { borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  markerTitle: { fontWeight: 'bold', fontSize: 10, textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 4 },
  markerStatus: { fontWeight: '900', fontSize: 12, marginTop: 2, textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 4 },

  gateInfoOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 30, backgroundColor: 'rgba(0,0,0,0.4)' },
  gateInfoPanel: { width: 280, borderRadius: 20, padding: 20, borderWidth: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20 },
  closeInfoBtn: { position: 'absolute', top: 12, right: 12, zIndex: 2 },
  infoTitle: { fontSize: 18, fontWeight: '900', marginBottom: 16, textTransform: 'uppercase' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  infoLabel: { color: '#8F9BB3', fontSize: 13 },
  infoValue: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  infoRecommendation: { flexDirection: 'row', alignItems: 'center', marginTop: 12, backgroundColor: 'rgba(0, 200, 255, 0.1)', padding: 10, borderRadius: 8 },
  infoRecText: { color: DASHBOARD_COLORS.primary, fontSize: 12, fontWeight: 'bold', marginLeft: 8, flex: 1 },

  // Bottom Analytics
  bottomAnalyticsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  analyticsCard: { flex: 1, minWidth: 200, borderRadius: 20, overflow: 'hidden' },
  analyticsGradient: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: DASHBOARD_COLORS.panelBorder, borderRadius: 20 },
  analyticsIconBox: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  analyticsData: { flex: 1 },
  analyticsVal: { fontSize: 24, fontWeight: '900', marginBottom: 4 },
  analyticsTitle: { color: '#8F9BB3', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
});
