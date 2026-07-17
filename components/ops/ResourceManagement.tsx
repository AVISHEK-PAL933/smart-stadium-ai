import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface Resource {
  type: string;
  available: number;
  busy: number;
  offline: number;
}

export const ResourceManagement = ({ resources }: { resources: Resource[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="people" size={24} color="#fbc02d" />
        <Text style={styles.title}>Resource Management</Text>
      </View>
      <View style={styles.content}>
        {resources.map((res, idx) => (
          <View key={idx} style={styles.resourceRow}>
            <Text style={styles.resourceType}>{res.type}</Text>
            <View style={styles.stats}>
              <View style={styles.statPill}>
                <View style={[styles.dot, { backgroundColor: Colors.dark.success }]} />
                <Text style={styles.statNumber}>{res.available}</Text>
              </View>
              <View style={styles.statPill}>
                <View style={[styles.dot, { backgroundColor: Colors.dark.warning }]} />
                <Text style={styles.statNumber}>{res.busy}</Text>
              </View>
              <View style={styles.statPill}>
                <View style={[styles.dot, { backgroundColor: Colors.dark.danger }]} />
                <Text style={styles.statNumber}>{res.offline}</Text>
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
    backgroundColor: 'rgba(25, 20, 10, 0.7)',
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
  resourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  resourceType: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 40,
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statNumber: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
