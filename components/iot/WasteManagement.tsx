import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const WasteBar = ({ label, value, color }: { label: string, value: number, color: string }) => {
  const width = useSharedValue(0);

  React.useEffect(() => {
    width.value = withTiming(value, { duration: 1500 });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View style={styles.barContainer}>
      <View style={styles.barHeader}>
        <Text style={styles.barLabel}>{label}</Text>
        <Text style={styles.barValue}>{value}%</Text>
      </View>
      <View style={styles.barTrack}>
        <Animated.View style={[styles.barFill, { backgroundColor: color }, animatedStyle]} />
      </View>
    </View>
  );
};

export const WasteManagement = ({ data }: { data: any }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="trash" size={24} color="#00e676" />
        <Text style={styles.title}>Waste Management</Text>
      </View>
      <View style={styles.content}>
        <WasteBar label="Recycling Bins" value={data.recycling} color="#00e676" />
        <WasteBar label="Organic Waste" value={data.organic} color="#fbc02d" />
        <WasteBar label="Plastic Waste" value={data.plastic} color="#ff3d00" />
      </View>
      <View style={styles.statusRow}>
        <View style={styles.statusPill}>
          <Ionicons name="car" size={16} color="#b388ff" />
          <Text style={styles.statusText}>Collection: {data.collection}</Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: data.alerts > 0 ? 'rgba(255, 82, 82, 0.2)' : 'rgba(0, 230, 118, 0.2)' }]}>
          <Ionicons name="warning" size={16} color={data.alerts > 0 ? Colors.dark.danger : Colors.dark.success} />
          <Text style={[styles.statusText, { color: data.alerts > 0 ? Colors.dark.danger : Colors.dark.success }]}>
            {data.alerts} Alerts
          </Text>
        </View>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(10, 25, 15, 0.7)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: Theme.spacing.s,
  },
  content: {
    gap: Theme.spacing.m,
    marginBottom: Theme.spacing.m,
  },
  barContainer: {
    gap: 6,
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  barValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  barTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: Theme.spacing.m,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
