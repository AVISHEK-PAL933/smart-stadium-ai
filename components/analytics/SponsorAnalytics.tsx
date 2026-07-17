import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const SponsorAnalytics = ({ sponsors }: { sponsors: any[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="megaphone" size={24} color="#00e676" />
        <Text style={styles.title}>Sponsor Analytics</Text>
      </View>
      <View style={styles.content}>
        {sponsors.map((sponsor, idx) => (
          <View key={idx} style={styles.sponsorRow}>
            <Text style={styles.sponsorName}>{sponsor.name}</Text>
            <View style={styles.metrics}>
              <View style={styles.metricBadge}>
                <Text style={styles.metricValue}>{sponsor.impressions}</Text>
                <Text style={styles.metricLabel}>Impressions</Text>
              </View>
              <View style={styles.metricBadge}>
                <Text style={styles.metricValue}>{sponsor.engagement}</Text>
                <Text style={styles.metricLabel}>Engagement</Text>
              </View>
              <View style={styles.metricBadge}>
                <Text style={styles.metricValue}>{sponsor.clicks}</Text>
                <Text style={styles.metricLabel}>Clicks</Text>
              </View>
            </View>
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
    backgroundColor: 'rgba(5, 30, 15, 0.7)',
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
  sponsorRow: {
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: Theme.shapes.borderRadius.s,
  },
  sponsorName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.m,
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricBadge: {
    alignItems: 'center',
  },
  metricValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  metricLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    marginTop: 4,
  },
});
