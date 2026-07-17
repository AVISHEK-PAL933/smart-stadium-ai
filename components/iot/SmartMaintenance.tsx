import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const HealthBar = ({ health }: { health: number }) => {
  const width = useSharedValue(0);

  React.useEffect(() => {
    width.value = withTiming(health, { duration: 1500 });
  }, [health]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  const getColor = (h: number) => {
    if (h >= 90) return Colors.dark.success;
    if (h >= 70) return Colors.dark.warning;
    return Colors.dark.danger;
  };

  return (
    <View style={styles.healthTrack}>
      <Animated.View style={[styles.healthFill, { backgroundColor: getColor(health) }, animatedStyle]} />
    </View>
  );
};

export const SmartMaintenance = ({ maintenance }: { maintenance: any[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="construct" size={24} color="#00e5ff" />
        <Text style={styles.title}>Smart Maintenance</Text>
      </View>
      <View style={styles.content}>
        {maintenance.map((item, idx) => (
          <View key={idx} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.equipment}</Text>
              <Text style={styles.itemStatus}>{item.status}</Text>
            </View>
            <View style={styles.healthContainer}>
              <Text style={styles.healthValue}>{item.health}%</Text>
              <HealthBar health={item.health} />
            </View>
          </View>
        ))}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(15, 25, 30, 0.7)',
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
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemStatus: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  healthContainer: {
    width: '40%',
    alignItems: 'flex-end',
  },
  healthValue: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  healthTrack: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
    borderRadius: 3,
  },
});
