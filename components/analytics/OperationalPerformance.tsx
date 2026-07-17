import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const OperationalPerformance = ({ operations }: { operations: any[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="speedometer" size={24} color="#ff3d00" />
        <Text style={styles.title}>Operational Performance</Text>
      </View>
      <View style={styles.content}>
        {operations.map((op, idx) => (
          <View key={idx} style={styles.opRow}>
            <View style={styles.opInfo}>
              <Text style={styles.opMetric}>{op.metric}</Text>
              <Text style={styles.opTarget}>Target: {op.target}</Text>
            </View>
            <View style={styles.opTimeBadge}>
              <Text style={styles.opTime}>{op.time}</Text>
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
    backgroundColor: 'rgba(25, 10, 10, 0.7)',
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
    gap: Theme.spacing.m,
  },
  opRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  opInfo: {
    flex: 1,
  },
  opMetric: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  opTarget: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 2,
  },
  opTimeBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  opTime: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
