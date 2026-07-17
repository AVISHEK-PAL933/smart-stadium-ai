import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const AIRecommendationsPanel = ({ recommendations }: { recommendations: any[] }) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return Colors.dark.success;
      case 'Medium': return Colors.dark.warning;
      case 'Low': return Colors.dark.tint;
      default: return '#fff';
    }
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="bulb" size={24} color="#ffd600" />
        <Text style={styles.title}>AI Recommendations</Text>
      </View>
      <View style={styles.content}>
        {recommendations.map((rec, idx) => (
          <View key={idx} style={styles.recCard}>
            <LinearGradient
              colors={[`${getImpactColor(rec.impact)}20`, 'transparent']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <View style={styles.recHeader}>
              <View style={[styles.impactBadge, { backgroundColor: getImpactColor(rec.impact) + '30' }]}>
                <View style={[styles.dot, { backgroundColor: getImpactColor(rec.impact) }]} />
                <Text style={[styles.impactText, { color: getImpactColor(rec.impact) }]}>{rec.impact} Impact</Text>
              </View>
              <Text style={styles.confidenceText}>{rec.confidence}% Match</Text>
            </View>
            <Text style={styles.recText}>{rec.text}</Text>
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
    backgroundColor: 'rgba(20, 20, 10, 0.7)',
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
    gap: Theme.spacing.s,
  },
  recCard: {
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  recHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  impactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  impactText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  confidenceText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  recText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
});
