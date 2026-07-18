import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useGlobalContext } from '../context/GlobalProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';
import { NavigationRoute } from '../services/navigationService';

interface DestinationCardProps {
  currentRoute: NavigationRoute;
  activeStep: number;
  onNextStep: () => void;
  onCancel: () => void;
}

const DetailRow = ({ icon, label, value, color = '#00C8FF' }: any) => (
  <View style={styles.detailRow}>
    <View style={styles.detailIconBox}>
      <MaterialCommunityIcons name={icon} size={18} color={color} />
    </View>
    <View style={styles.detailTextCol}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

export const DestinationCard = ({
  currentRoute,
  activeStep,
  onNextStep,
  onCancel,
}: DestinationCardProps) => {
  const { theme, themeColors } = useGlobalContext();

  const currentInstruction = currentRoute.instructions[activeStep];
  const isLastStep = activeStep === currentRoute.instructions.length - 1;

  const formatTime = (secs: number) => {
    const mins = Math.ceil(secs / 60);
    return `${mins} min`;
  };

  return (
    <GlassCard style={styles.container} gradientColors={['rgba(8,18,35,0.95)', 'rgba(15,23,42,0.9)']}>
      <View style={styles.header}>
        <View style={styles.targetCol}>
          <Text style={styles.targetTitle}>Navigating to</Text>
          <Text style={styles.targetName}>{currentRoute.destination.name}</Text>
        </View>
        <TouchableOpacity onPress={onCancel} style={styles.closeBtn}>
          <MaterialCommunityIcons name="close" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Main Metrics (ETA / Dist / Speed) */}
      <View style={styles.primaryMetrics}>
        <View style={styles.mainMetricBlock}>
          <Text style={styles.mainMetricVal}>{formatTime(currentRoute.timeSeconds)}</Text>
          <Text style={styles.mainMetricLabel}>Est. Time</Text>
        </View>
        <View style={styles.mainMetricBlock}>
          <Text style={styles.mainMetricVal}>{currentRoute.distanceMeters} m</Text>
          <Text style={styles.mainMetricLabel}>Distance</Text>
        </View>
        <View style={styles.mainMetricBlock}>
          <Text style={styles.mainMetricVal}>1.4 m/s</Text>
          <Text style={styles.mainMetricLabel}>Avg Speed</Text>
        </View>
      </View>

      {/* Next Turn Instruction */}
      <View style={styles.instructionBox}>
        <View style={styles.directionIcon}>
          <MaterialCommunityIcons name={isLastStep ? 'flag-checkered' : 'arrow-top-right-thick'} size={28} color="#00C8FF" />
        </View>
        <View style={styles.instructionTextWrapper}>
          <Text style={styles.instructionLabel}>{isLastStep ? 'Final Destination' : 'Next Turn'}</Text>
          <Text style={styles.instructionText}>{currentInstruction}</Text>
        </View>
      </View>

      {/* Secondary Details Grid */}
      <View style={styles.detailsGrid}>
        <DetailRow icon="map-marker-radius" label="Current Zone" value="Zone C (Level 2)" />
        <DetailRow icon="account-group" label="Crowd Density" value="Moderate (65%)" color="#FF9800" />
        <DetailRow icon="wheelchair-accessibility" label="Accessibility" value="Wheelchair Friendly" color="#00E676" />
        <DetailRow icon="store" label="Nearby Facilities" value="Restroom (20m)" color="#7C4DFF" />
      </View>

      {/* Control Actions */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={isLastStep ? onCancel : onNextStep}
        style={[styles.actionBtn, { backgroundColor: isLastStep ? '#00E676' : '#00C8FF' }]}>
        <Text style={styles.actionBtnText}>
          {isLastStep ? 'Arrived (End Route)' : 'Next Step'}
        </Text>
        <MaterialCommunityIcons
          name={isLastStep ? 'check-circle' : 'chevron-right'}
          size={20}
          color="#1E293B"
        />
      </TouchableOpacity>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, borderRadius: 24, gap: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  targetCol: { flex: 1, gap: 4 },
  targetTitle: { fontSize: 14, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', fontWeight: 'bold' },
  targetName: { fontSize: 24, fontWeight: '900', color: '#FFF' },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  primaryMetrics: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  mainMetricBlock: { alignItems: 'center', flex: 1 },
  mainMetricVal: { fontSize: 20, fontWeight: 'bold', color: '#00C8FF' },
  mainMetricLabel: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 },
  instructionBox: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 8 },
  directionIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(0,200,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  instructionTextWrapper: { flex: 1, gap: 4 },
  instructionLabel: { fontSize: 12, color: '#00C8FF', fontWeight: 'bold', textTransform: 'uppercase' },
  instructionText: { fontSize: 18, fontWeight: '600', color: '#FFF', lineHeight: 24 },
  detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  detailRow: { width: '45%', minWidth: 140, flexDirection: 'row', gap: 12, alignItems: 'center' },
  detailIconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  detailTextCol: { flex: 1 },
  detailLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 2 },
  detailValue: { fontSize: 13, color: '#FFF', fontWeight: '600' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 56, borderRadius: 28, gap: 8, marginTop: 10 },
  actionBtnText: { color: '#1E293B', fontWeight: 'bold', fontSize: 16 },
});
