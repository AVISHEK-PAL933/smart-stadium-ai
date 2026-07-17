import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface SystemService {
  service: string;
  status: 'Healthy' | 'Warning' | 'Offline';
  latency: string;
}

export const SystemHealth = ({ systems }: { systems: SystemService[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return Colors.dark.success;
      case 'Warning': return Colors.dark.warning;
      case 'Offline': return Colors.dark.danger;
      default: return Colors.dark.tint;
    }
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="server" size={24} color="#00e676" />
        <Text style={styles.title}>System Health</Text>
      </View>
      <View style={styles.content}>
        {systems.map((sys, idx) => (
          <View key={idx} style={styles.serviceRow}>
            <Text style={styles.serviceName}>{sys.service}</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.latency}>{sys.latency}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(sys.status) + '20' }]}>
                <View style={[styles.dot, { backgroundColor: getStatusColor(sys.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(sys.status) }]}>
                  {sys.status}
                </Text>
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
    backgroundColor: 'rgba(10, 30, 20, 0.7)',
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
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  serviceName: {
    color: '#fff',
    fontSize: 14,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.m,
  },
  latency: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 80,
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
