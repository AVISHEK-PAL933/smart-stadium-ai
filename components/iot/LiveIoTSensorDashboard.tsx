import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';

const SensorCard = ({ item }: { item: any }) => {
  const glow = useSharedValue(0.3);

  useEffect(() => {
    glow.value = withRepeat(withTiming(0.8, { duration: 2500 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: item.color,
    borderWidth: glow.value,
  }));

  return (
    <Animated.View style={[styles.sensorCard, animatedStyle]}>
      <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>
      <View style={styles.sensorInfo}>
        <Text style={styles.sensorValue}>{item.value}</Text>
        <Text style={styles.sensorLabel}>{item.label}</Text>
      </View>
    </Animated.View>
  );
};

export const LiveIoTSensorDashboard = ({ sensors }: { sensors: any[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="hardware-chip" size={24} color="#00e5ff" />
        <Text style={styles.title}>Live IoT Sensors</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.gridRow}>
          {sensors.slice(0, 6).map((sensor, idx) => (
            <SensorCard key={idx} item={sensor} />
          ))}
        </View>
        <View style={styles.gridRow}>
          {sensors.slice(6, 12).map((sensor, idx) => (
            <SensorCard key={idx} item={sensor} />
          ))}
        </View>
      </ScrollView>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(10, 20, 25, 0.7)',
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
  scroll: {
    flexDirection: 'column',
  },
  gridRow: {
    flexDirection: 'row',
    gap: Theme.spacing.m,
    marginBottom: Theme.spacing.m,
    paddingRight: Theme.spacing.m,
  },
  sensorCard: {
    width: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: Theme.shapes.borderRadius.m,
    padding: Theme.spacing.m,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  iconBox: {
    padding: 8,
    borderRadius: 12,
    marginBottom: Theme.spacing.s,
  },
  sensorInfo: {
    flexDirection: 'column',
  },
  sensorValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sensorLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
});
