import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';
import { NavigationRoute } from '../services/navigationService';

interface DestinationCardProps {
  currentRoute: NavigationRoute;
  activeStep: number;
  onNextStep: () => void;
  onCancel: () => void;
}

export const DestinationCard = ({
  currentRoute,
  activeStep,
  onNextStep,
  onCancel,
}: DestinationCardProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const currentInstruction = currentRoute.instructions[activeStep];
  const isLastStep = activeStep === currentRoute.instructions.length - 1;

  const formatTime = (secs: number) => {
    const mins = Math.ceil(secs / 60);
    return `${mins} min`;
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <View style={styles.targetCol}>
          <Text style={[styles.targetTitle, { color: themeColors.text }]}>Navigating to</Text>
          <Text style={[styles.targetName, { color: themeColors.tint }]}>
            {currentRoute.destination.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onCancel}
          style={[styles.closeBtn, { backgroundColor: themeColors.border }]}>
          <MaterialCommunityIcons name="close" size={18} color={themeColors.text} />
        </TouchableOpacity>
      </View>

      {/* Metrics Row */}
      <View style={[styles.metricsRow, { borderBottomColor: themeColors.border }]}>
        <View style={styles.metricCell}>
          <MaterialCommunityIcons name="walk" size={20} color={themeColors.icon} />
          <Text style={[styles.metricVal, { color: themeColors.text }]}>
            {formatTime(currentRoute.timeSeconds)}
          </Text>
        </View>
        <View style={styles.metricCell}>
          <MaterialCommunityIcons name="map-marker-distance" size={20} color={themeColors.icon} />
          <Text style={[styles.metricVal, { color: themeColors.text }]}>
            {currentRoute.distanceMeters} m
          </Text>
        </View>
      </View>

      {/* Step Instruction Card */}
      <View style={styles.instructionBox}>
        <View style={[styles.directionIcon, { backgroundColor: themeColors.tint + '20' }]}>
          <MaterialCommunityIcons
            name={isLastStep ? 'flag-checkered' : 'arrow-up-bold'}
            size={22}
            color={themeColors.tint}
          />
        </View>
        <Text style={[styles.instructionText, { color: themeColors.text }]}>
          {currentInstruction}
        </Text>
      </View>

      {/* Control Actions */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={isLastStep ? onCancel : onNextStep}
        style={[styles.actionBtn, { backgroundColor: isLastStep ? '#00E676' : themeColors.tint }]}>
        <Text style={styles.actionBtnText}>
          {isLastStep ? 'Arrived (End Route)' : 'Next Step Instruction'}
        </Text>
        <MaterialCommunityIcons
          name={isLastStep ? 'check-circle' : 'chevron-right'}
          size={18}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.m,
    borderRadius: 24,
    gap: Theme.spacing.m,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  targetCol: {
    flex: 1,
    gap: 2,
  },
  targetTitle: {
    fontSize: Theme.typography.sizes.s,
    fontWeight: 'bold',
    opacity: 0.6,
  },
  targetName: {
    fontSize: Theme.typography.sizes.m,
    fontWeight: '900',
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.l,
    borderBottomWidth: 1,
    paddingBottom: Theme.spacing.s,
  },
  metricCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricVal: {
    fontSize: Theme.typography.sizes.s,
    fontWeight: 'bold',
  },
  instructionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.m,
    padding: Theme.spacing.s,
  },
  directionIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    flex: 1,
    fontSize: Theme.typography.sizes.s,
    lineHeight: 18,
    fontWeight: '600',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 16,
    gap: 8,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: Theme.typography.sizes.s,
  },
});
