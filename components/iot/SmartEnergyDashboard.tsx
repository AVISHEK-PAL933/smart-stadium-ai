import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

const AnimatedGauge = ({ label, value, color, delay }: { label: string, value: number, color: string, delay: number }) => {
  const height = useSharedValue(0);

  useEffect(() => {
    height.value = withDelay(delay, withTiming(value, { duration: 1500 }));
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${height.value}%`,
  }));

  return (
    <View style={styles.gaugeContainer}>
      <View style={styles.gaugeTrack}>
        <Animated.View style={[styles.gaugeFill, { backgroundColor: color }, animatedStyle]} />
      </View>
      <Text style={styles.gaugeValue}>{value}%</Text>
      <Text style={styles.gaugeLabel}>{label}</Text>
    </View>
  );
};

export const SmartEnergyDashboard = ({ data }: { data: any }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="flash" size={24} color="#ffd600" />
        <Text style={styles.title}>Smart Energy Dashboard</Text>
      </View>
      <View style={styles.gaugesRow}>
        <AnimatedGauge label="Solar" value={data.solar} color="#ffeb3b" delay={100} />
        <AnimatedGauge label="Grid" value={data.grid} color="#ff3d00" delay={300} />
        <AnimatedGauge label="Battery" value={data.battery} color="#00e676" delay={500} />
      </View>
      <View style={styles.kpiRow}>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiLabel}>Consumption</Text>
          <Text style={styles.kpiValue}>{data.consumption}</Text>
        </View>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiLabel}>Emissions</Text>
          <Text style={styles.kpiValue}>{data.emissions}</Text>
        </View>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiLabel}>Saved</Text>
          <Text style={[styles.kpiValue, { color: '#00e676' }]}>{data.saved}</Text>
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
    backgroundColor: 'rgba(25, 20, 5, 0.7)',
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
  gaugesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Theme.spacing.l,
  },
  gaugeContainer: {
    alignItems: 'center',
  },
  gaugeTrack: {
    width: 24,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    marginBottom: Theme.spacing.s,
  },
  gaugeFill: {
    width: '100%',
    borderRadius: 12,
  },
  gaugeValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  gaugeLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: Theme.spacing.m,
  },
  kpiBox: {
    alignItems: 'center',
    flex: 1,
  },
  kpiLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginBottom: 4,
  },
  kpiValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
