import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/theme';
import { AIRecommendation } from '../../data/crowdSafetyData';

interface Props {
  rec: AIRecommendation;
  delay?: number;
}

const URGENCY_CONFIG: Record<AIRecommendation['urgency'], { color: string; icon: string; label: string }> = {
  critical: { color: '#FF5252', icon: 'alert-octagon',        label: 'CRITICAL' },
  warning:  { color: '#FFA726', icon: 'alert-rhombus-outline', label: 'WARNING'  },
  info:     { color: '#00C8FF', icon: 'information-outline',   label: 'INFO'     },
};

export const AIRecommendationBubble: React.FC<Props> = ({ rec, delay = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(12)).current;
  const cfg = URGENCY_CONFIG[rec.urgency];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 400, delay, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, delay, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim, delay]);

  return (
    <Animated.View
      style={[
        styles.bubble,
        { borderLeftColor: cfg.color, opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}>
      {/* AI Header */}
      <View style={styles.headerRow}>
        <View style={[styles.aiChip, { backgroundColor: 'rgba(0,200,255,0.12)' }]}>
          <MaterialCommunityIcons name="robot-outline" size={11} color="#00C8FF" />
          <Text style={styles.aiChipText}>AI Safety Engine</Text>
        </View>
        <View style={[styles.urgencyBadge, { backgroundColor: cfg.color + '22' }]}>
          <MaterialCommunityIcons name={cfg.icon as any} size={10} color={cfg.color} />
          <Text style={[styles.urgencyLabel, { color: cfg.color }]}>{cfg.label}</Text>
        </View>
      </View>

      {/* Message */}
      <Text style={styles.message}>{rec.message}</Text>

      {/* Footer */}
      <View style={styles.footerRow}>
        <View style={styles.zonePill}>
          <MaterialCommunityIcons name="map-marker-outline" size={10} color="#8F9BB3" />
          <Text style={styles.zoneText}>{rec.zone}</Text>
        </View>
        <Text style={styles.timestamp}>{rec.timestamp}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: 'rgba(13, 27, 48, 0.9)',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.12)',
    borderLeftWidth: 3,
    padding: Theme.spacing.m,
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  aiChipText: { color: '#00C8FF', fontSize: 9, fontWeight: '800', letterSpacing: 0.3 },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  urgencyLabel: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  message: {
    color: '#FFFFFF',
    fontSize: Theme.typography.sizes.s,
    lineHeight: 20,
    fontWeight: '500',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  zonePill: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  zoneText: { color: '#8F9BB3', fontSize: 10, fontWeight: '600' },
  timestamp: { color: '#8F9BB3', fontSize: 10 },
});
