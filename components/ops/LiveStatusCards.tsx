import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  trend?: 'up' | 'down';
}

const StatusCard = ({ title, value, icon, color, trend }: StatusCardProps) => {
  const glow = useSharedValue(0.3);

  useEffect(() => {
    glow.value = withRepeat(withTiming(0.8, { duration: 2000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    shadowOpacity: glow.value,
    shadowColor: color,
  }));

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
      <GlassCard style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
            <Ionicons name={icon} size={24} color={color} />
          </View>
          {trend && (
            <Ionicons
              name={trend === 'up' ? 'trending-up' : 'trending-down'}
              size={20}
              color={trend === 'up' ? Colors.dark.success : Colors.dark.danger}
            />
          )}
        </View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </GlassCard>
    </Animated.View>
  );
};

export const LiveStatusCards = ({ data }: { data: any }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <StatusCard title="Visitors Inside" value={data.visitorsInside} icon="people" color="#00e5ff" trend="up" />
      <StatusCard title="Current Capacity" value={data.currentCapacity} icon="speedometer" color="#fbc02d" trend="up" />
      <StatusCard title="Tickets Scanned" value={data.ticketsScanned} icon="barcode" color="#00e676" />
      <StatusCard title="Open Gates" value={`${data.openGates}/${data.totalGates}`} icon="enter" color="#2979ff" />
      <StatusCard title="Parking Occupancy" value={data.parkingOccupancy} icon="car" color="#ff3d00" trend="up" />
      <StatusCard title="Security Alerts" value={data.securityAlerts} icon="shield-checkmark" color={data.securityAlerts > 0 ? "#ff1744" : "#00e676"} trend={data.securityAlerts > 0 ? "up" : undefined} />
      <StatusCard title="Energy Load" value={data.energyConsumption} icon="flash" color="#ffd600" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 0,
    marginBottom: Theme.spacing.l,
  },
  contentContainer: {
    paddingHorizontal: Theme.spacing.m,
    gap: Theme.spacing.m,
  },
  cardContainer: {
    width: 160,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 5,
  },
  card: {
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(20, 25, 40, 0.6)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.m,
  },
  iconBox: {
    padding: 8,
    borderRadius: 12,
  },
  value: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
});
