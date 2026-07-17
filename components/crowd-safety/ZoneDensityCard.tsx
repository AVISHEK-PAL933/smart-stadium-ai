import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/theme';
import { StadiumZone, DensityLevel } from '../../data/crowdSafetyData';

interface Props {
  zone: StadiumZone;
}

const DENSITY_CONFIG: Record<DensityLevel, { color: string; label: string; icon: string }> = {
  safe:        { color: '#00E676', label: 'Safe',        icon: 'check-circle-outline'   },
  busy:        { color: '#FFC107', label: 'Busy',        icon: 'alert-circle-outline'   },
  overcrowded: { color: '#FF5252', label: 'Overcrowded', icon: 'alert-octagon-outline'  },
};

const TREND_ICONS: Record<StadiumZone['trend'], string> = {
  rising:  'trending-up',
  stable:  'trending-neutral',
  falling: 'trending-down',
};

const TREND_COLORS: Record<StadiumZone['trend'], string> = {
  rising:  '#FF5252',
  stable:  '#FFC107',
  falling: '#00E676',
};

export const ZoneDensityCard: React.FC<Props> = ({ zone }) => {
  const densityPct = Math.round((zone.occupancy / zone.capacity) * 100);
  const cfg = DENSITY_CONFIG[zone.density];
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (zone.density === 'overcrowded') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.25, duration: 700, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1,    duration: 700, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [zone.density, pulseAnim]);

  return (
    <View style={[styles.card, { borderColor: cfg.color + '40' }]}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <Text style={styles.zoneName}>{zone.name}</Text>
          <View style={styles.trendRow}>
            <MaterialCommunityIcons
              name={TREND_ICONS[zone.trend] as any}
              size={12}
              color={TREND_COLORS[zone.trend]}
            />
            <Text style={[styles.trendLabel, { color: TREND_COLORS[zone.trend] }]}>
              {zone.trend}
            </Text>
          </View>
        </View>

        <Animated.View style={[styles.indicatorDot, { backgroundColor: cfg.color, transform: [{ scale: pulseAnim }] }]} />
      </View>

      {/* Density % */}
      <Text style={[styles.densityPct, { color: cfg.color }]}>{densityPct}%</Text>

      {/* Progress bar */}
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${Math.min(densityPct, 100)}%` as any, backgroundColor: cfg.color }]} />
      </View>

      {/* Occupancy row */}
      <View style={styles.occupancyRow}>
        <Text style={styles.occupancyText}>
          {zone.occupancy.toLocaleString()} / {zone.capacity.toLocaleString()}
        </Text>
        <View style={[styles.statusPill, { backgroundColor: cfg.color + '22' }]}>
          <MaterialCommunityIcons name={cfg.icon as any} size={10} color={cfg.color} />
          <Text style={[styles.statusPillText, { color: cfg.color }]}>{cfg.label}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(13, 27, 48, 0.80)',
    borderRadius: Theme.shapes.borderRadius.l,
    borderWidth: 1,
    padding: Theme.spacing.m,
    gap: Theme.spacing.s,
    shadowColor: '#00C8FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleWrap: { flex: 1 },
  zoneName: {
    color: '#FFFFFF',
    fontSize: Theme.typography.sizes.s,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 2 },
  trendLabel: { fontSize: 10, fontWeight: '700', textTransform: 'capitalize' },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  densityPct: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  barBg: {
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 3 },
  occupancyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  occupancyText: { color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '600' },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusPillText: { fontSize: 9, fontWeight: '800' },
});
