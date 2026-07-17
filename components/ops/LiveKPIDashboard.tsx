import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

const AnimatedBar = ({ value, maxValue, color, delay }: { value: number, maxValue: number, color: string, delay: number }) => {
  const height = useSharedValue(0);

  React.useEffect(() => {
    height.value = withDelay(delay, withTiming((value / maxValue) * 100, { duration: 1000 }));
  }, [value, maxValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${height.value}%`,
  }));

  return (
    <View style={styles.barTrack}>
      <Animated.View style={[styles.barFill, { backgroundColor: color }, animatedStyle]} />
    </View>
  );
};

export const LiveKPIDashboard = ({ chartData }: { chartData: any }) => {
  const maxVisitor = Math.max(...chartData.visitors);

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="bar-chart" size={24} color="#00e5ff" />
        <Text style={styles.title}>Live KPI Dashboard (Visitors)</Text>
      </View>
      <View style={styles.chartContainer}>
        {chartData.visitors.map((val: number, idx: number) => (
          <View key={idx} style={styles.barColumn}>
            <AnimatedBar value={val} maxValue={maxVisitor} color="#00e5ff" delay={idx * 150} />
            <Text style={styles.barLabel}>T-{chartData.visitors.length - idx}</Text>
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
    backgroundColor: 'rgba(10, 20, 30, 0.7)',
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
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    marginTop: Theme.spacing.m,
    paddingHorizontal: Theme.spacing.s,
  },
  barColumn: {
    alignItems: 'center',
    width: 30,
  },
  barTrack: {
    width: 16,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    borderRadius: 8,
  },
  barLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    marginTop: 8,
  },
});
