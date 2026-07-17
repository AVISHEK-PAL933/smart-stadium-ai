import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

const HorizontalBar = ({ label, value, color, delay }: { label: string, value: number, color: string, delay: number }) => {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withDelay(delay, withTiming(value, { duration: 1000 }));
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => ({ width: `${width.value}%` }));

  return (
    <View style={styles.hBarContainer}>
      <Text style={styles.hBarLabel}>{label}</Text>
      <View style={styles.hBarTrack}>
        <Animated.View style={[styles.hBarFill, { backgroundColor: color }, animatedStyle]} />
      </View>
      <Text style={styles.hBarValue}>{value}%</Text>
    </View>
  );
};

export const VisitorAnalytics = ({ visitors }: { visitors: any }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="people" size={24} color="#00e5ff" />
        <Text style={styles.title}>Visitor Analytics</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Traffic by Gate</Text>
        <View style={styles.bars}>
          {visitors.byGate.map((gate: any, idx: number) => (
            <HorizontalBar key={idx} label={gate.label} value={gate.value} color={gate.color} delay={idx * 150} />
          ))}
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
  content: {
    marginTop: Theme.spacing.s,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginBottom: Theme.spacing.m,
    fontWeight: '600',
  },
  bars: {
    gap: Theme.spacing.m,
  },
  hBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hBarLabel: {
    width: 50,
    color: '#fff',
    fontSize: 12,
  },
  hBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    marginHorizontal: Theme.spacing.s,
    overflow: 'hidden',
  },
  hBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  hBarValue: {
    width: 35,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
