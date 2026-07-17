import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

const BarChart = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);
  return (
    <View style={styles.chartContainer}>
      {data.map((val, idx) => {
        const height = useSharedValue(0);
        useEffect(() => {
          height.value = withDelay(idx * 100, withTiming((val / max) * 100, { duration: 1000 }));
        }, [val]);
        const animatedStyle = useAnimatedStyle(() => ({ height: `${height.value}%` }));

        return (
          <View key={idx} style={styles.barCol}>
            <View style={styles.barTrack}>
              <Animated.View style={[styles.barFill, animatedStyle]} />
            </View>
            <Text style={styles.barLabel}>{['M','T','W','T','F','S','S'][idx]}</Text>
          </View>
        );
      })}
    </View>
  );
};

export const RevenueAnalytics = ({ revenue }: { revenue: any }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="trending-up" size={24} color="#00e676" />
        <Text style={styles.title}>Revenue Analytics</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Daily Revenue Trend (Current Week)</Text>
        <BarChart data={revenue.daily} />
        
        <Text style={[styles.subtitle, { marginTop: Theme.spacing.l }]}>Revenue by Category</Text>
        <View style={styles.categories}>
          {revenue.byCategory.map((cat: any, idx: number) => (
            <View key={idx} style={styles.catRow}>
              <View style={styles.catInfo}>
                <View style={[styles.dot, { backgroundColor: cat.color }]} />
                <Text style={styles.catLabel}>{cat.label}</Text>
              </View>
              <Text style={styles.catValue}>{cat.value}%</Text>
            </View>
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
    backgroundColor: 'rgba(5, 25, 15, 0.7)',
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
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: Theme.spacing.s,
  },
  barCol: {
    alignItems: 'center',
  },
  barTrack: {
    width: 20,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    backgroundColor: '#00e676',
    borderRadius: 4,
  },
  barLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    marginTop: 8,
  },
  categories: {
    gap: Theme.spacing.s,
  },
  catRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  catInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  catLabel: {
    color: '#fff',
    fontSize: 14,
  },
  catValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
