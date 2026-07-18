import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  trend?: 'up' | 'down';
}

const StatusCard = ({ title, value, icon, color, trend }: StatusCardProps) => {
  const glow = useSharedValue(0.1);

  useEffect(() => {
    glow.value = withRepeat(withTiming(0.4, { duration: 2000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  return (
    <View style={styles.cardContainer}>
      <GlassCard style={styles.card}>
        <Animated.View style={[styles.glowLayer, { backgroundColor: color }, animatedStyle]} />
        <LinearGradient colors={['rgba(255,255,255,0.05)', 'transparent']} style={StyleSheet.absoluteFillObject} />
        
        <View style={styles.cardHeader}>
          <View style={[styles.iconBox, { backgroundColor: color + '20', borderColor: color + '40' }]}>
            <Ionicons name={icon} size={22} color={color} />
          </View>
          {trend && (
            <View style={[styles.trendBadge, { backgroundColor: trend === 'up' ? Colors.dark.success + '20' : Colors.dark.danger + '20' }]}>
              <Ionicons
                name={trend === 'up' ? 'trending-up' : 'trending-down'}
                size={14}
                color={trend === 'up' ? Colors.dark.success : Colors.dark.danger}
              />
            </View>
          )}
        </View>
        
        <View style={styles.cardBody}>
          <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>{value}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </GlassCard>
    </View>
  );
};

export const LiveStatusCards = ({ data }: { data: any }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <StatusCard title="Visitors Inside" value={data.visitorsInside} icon="people" color="#00C8FF" trend="up" />
      <StatusCard title="Current Capacity" value={data.currentCapacity} icon="speedometer" color="#FFC107" trend="up" />
      <StatusCard title="Tickets Scanned" value={data.ticketsScanned} icon="barcode" color="#00E676" />
      <StatusCard title="Open Gates" value={`${data.openGates}/${data.totalGates}`} icon="enter" color="#6C63FF" />
      <StatusCard title="Parking Occupancy" value={data.parkingOccupancy} icon="car" color="#FF9800" trend="up" />
      <StatusCard title="Security Alerts" value={data.securityAlerts} icon="shield-checkmark" color={data.securityAlerts > 0 ? "#FF5252" : "#00E676"} trend={data.securityAlerts > 0 ? "up" : undefined} />
      <StatusCard title="Energy Load" value={data.energyConsumption} icon="flash" color="#FFD700" />
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
    gap: 16,
  },
  cardContainer: {
    width: 170,
  },
  card: {
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(18,29,51,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  glowLayer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    zIndex: 2,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cardBody: {
    zIndex: 2,
  },
  value: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  title: {
    color: Colors.dark.icon,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
