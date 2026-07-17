import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence } from 'react-native-reanimated';

const WaterTank = ({ id, level, status }: { id: string, level: number, status: string }) => {
  const waterLevel = useSharedValue(0);
  
  useEffect(() => {
    waterLevel.value = withTiming(level, { duration: 2000 });
  }, [level]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${waterLevel.value}%`,
  }));

  const getStatusColor = (s: string) => {
    if (s === 'Full') return Colors.dark.success;
    if (s === 'Filling') return Colors.dark.tint;
    if (s === 'Low') return Colors.dark.danger;
    return Colors.dark.tint;
  };

  return (
    <View style={styles.tankContainer}>
      <Text style={styles.tankId}>{id}</Text>
      <View style={styles.tankBody}>
        <Animated.View style={[styles.tankWater, { backgroundColor: getStatusColor(status) }, animatedStyle]} />
      </View>
      <Text style={styles.tankLevel}>{level}%</Text>
      <Text style={[styles.tankStatus, { color: getStatusColor(status) }]}>{status}</Text>
    </View>
  );
};

export const WaterManagement = ({ data }: { data: any }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="water" size={24} color="#00e5ff" />
        <Text style={styles.title}>Water Management</Text>
      </View>
      <View style={styles.tanksRow}>
        {data.tanks.map((tank: any, idx: number) => (
          <WaterTank key={idx} id={tank.id} level={tank.level} status={tank.status} />
        ))}
      </View>
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Ionicons name="speedometer" size={20} color="#00e5ff" />
          <Text style={styles.metricValue}>{data.consumption}</Text>
          <Text style={styles.metricLabel}>Consumption</Text>
        </View>
        <View style={styles.metricCard}>
          <Ionicons name="warning" size={20} color={data.leaks > 0 ? Colors.dark.danger : Colors.dark.success} />
          <Text style={[styles.metricValue, { color: data.leaks > 0 ? Colors.dark.danger : '#fff' }]}>{data.leaks}</Text>
          <Text style={styles.metricLabel}>Leaks Detected</Text>
        </View>
        <View style={styles.metricCard}>
          <Ionicons name="shield-checkmark" size={20} color="#00e676" />
          <Text style={styles.metricValue}>{data.quality}</Text>
          <Text style={styles.metricLabel}>Quality</Text>
        </View>
        <View style={styles.metricCard}>
          <Ionicons name="git-merge" size={20} color="#b388ff" />
          <Text style={styles.metricValue}>{data.valves}</Text>
          <Text style={styles.metricLabel}>Active Valves</Text>
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
    backgroundColor: 'rgba(5, 20, 30, 0.7)',
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
  tanksRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Theme.spacing.l,
  },
  tankContainer: {
    alignItems: 'center',
  },
  tankId: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tankBody: {
    width: 40,
    height: 80,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  tankWater: {
    width: '100%',
  },
  tankLevel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tankStatus: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.s,
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: Theme.spacing.s,
    borderRadius: Theme.shapes.borderRadius.s,
    alignItems: 'center',
  },
  metricValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  metricLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
  },
});
