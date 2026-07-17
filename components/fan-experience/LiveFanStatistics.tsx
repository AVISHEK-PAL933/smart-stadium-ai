import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const LiveFanStatistics = ({ stats }: { stats: any }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="stats-chart" size={24} color="#00e5ff" />
        <Text style={styles.title}>Live Fan Statistics</Text>
      </View>
      <View style={styles.grid}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.currentFans}</Text>
          <Text style={styles.statLabel}>Current Fans</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.countries}</Text>
          <Text style={styles.statLabel}>Countries</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.avgAge}</Text>
          <Text style={styles.statLabel}>Avg Age</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.engagement}</Text>
          <Text style={styles.statLabel}>Engagement</Text>
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
    backgroundColor: 'rgba(5, 20, 25, 0.7)',
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.m,
    justifyContent: 'space-between',
  },
  statBox: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.s,
    alignItems: 'center',
  },
  statValue: {
    color: '#00e5ff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
});
