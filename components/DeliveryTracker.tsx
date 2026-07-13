import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';

export type DeliveryStatus = 'PREPARING' | 'COOKING' | 'SHIPPED' | 'DELIVERED';

interface DeliveryTrackerProps {
  status: DeliveryStatus;
  seat: string;
  estMinutes: number;
}

export const DeliveryTracker = ({ status, seat, estMinutes }: DeliveryTrackerProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const steps: { label: string; icon: string; key: DeliveryStatus }[] = [
    { label: 'Chef Preparing', icon: 'chef-hat', key: 'PREPARING' },
    { label: 'Cooking Hot', icon: 'fire', key: 'COOKING' },
    { label: 'Out for Delivery', icon: 'walk', key: 'SHIPPED' },
    { label: 'At Seat 42', icon: 'check-circle-outline', key: 'DELIVERED' },
  ];

  const getStepIndex = (s: DeliveryStatus) => {
    if (s === 'PREPARING') return 0;
    if (s === 'COOKING') return 1;
    if (s === 'SHIPPED') return 2;
    return 3;
  };

  const currentIdx = getStepIndex(status);

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: themeColors.text }]}>In-Seat Delivery Order</Text>
          <Text style={[styles.subtitle, { color: themeColors.icon }]}>
            Delivering to Seat: {seat}
          </Text>
        </View>
        <View style={styles.timerBadge}>
          <Text style={styles.timerText}>~{estMinutes} min</Text>
        </View>
      </View>

      {/* Progress Timeline */}
      <View style={styles.timeline}>
        {steps.map((step, idx) => {
          const isDone = idx <= currentIdx;
          const isActive = idx === currentIdx;
          return (
            <View key={step.key} style={styles.stepCol}>
              <View
                style={[
                  styles.iconNode,
                  {
                    backgroundColor: isActive
                      ? themeColors.tint
                      : isDone
                        ? '#00E67633'
                        : themeColors.border,
                    borderColor: isActive ? '#FFFFFF' : isDone ? '#00E676' : 'transparent',
                  },
                ]}>
                <MaterialCommunityIcons
                  name={step.icon as any}
                  size={16}
                  color={isDone ? '#FFFFFF' : themeColors.icon}
                />
              </View>
              <Text
                style={[
                  styles.label,
                  {
                    color: isActive ? themeColors.tint : isDone ? '#00E676' : themeColors.icon,
                    fontWeight: isActive ? '900' : '600',
                  },
                ]}
                numberOfLines={1}>
                {step.label}
              </Text>
            </View>
          );
        })}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Theme.spacing.m,
    borderRadius: 24,
    gap: Theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: Theme.typography.sizes.m - 2,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: Theme.typography.sizes.s - 2,
    fontWeight: 'bold',
    opacity: 0.6,
  },
  timerBadge: {
    backgroundColor: '#FF7043',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: Theme.typography.sizes.s - 2,
    fontWeight: 'bold',
  },
  timeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    marginTop: Theme.spacing.s,
    paddingBottom: 4,
  },
  stepCol: {
    alignItems: 'center',
    flex: 1,
    gap: Theme.spacing.s,
  },
  iconNode: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  label: {
    fontSize: 8,
    textAlign: 'center',
  },
});
