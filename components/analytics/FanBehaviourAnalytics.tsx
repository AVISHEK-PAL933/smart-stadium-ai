import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const FanBehaviourAnalytics = ({ behaviour }: { behaviour: any }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="body" size={24} color="#fbc02d" />
        <Text style={styles.title}>Fan Behaviour Analytics</Text>
      </View>
      <View style={styles.grid}>
        <View style={styles.card}>
          <Ionicons name="fast-food" size={20} color="#ff3d00" style={styles.icon} />
          <Text style={styles.label}>Popular Food</Text>
          <Text style={styles.value}>{behaviour.popularFood}</Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="map" size={20} color="#00e5ff" style={styles.icon} />
          <Text style={styles.label}>Most Visited Area</Text>
          <Text style={styles.value}>{behaviour.mostVisited}</Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="compass" size={20} color="#b388ff" style={styles.icon} />
          <Text style={styles.label}>Navigation Usage</Text>
          <Text style={styles.value}>{behaviour.navUsage}</Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="time" size={20} color="#00e676" style={styles.icon} />
          <Text style={styles.label}>Average Stay</Text>
          <Text style={styles.value}>{behaviour.avgStay}</Text>
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
    backgroundColor: 'rgba(25, 20, 5, 0.7)',
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
  card: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.m,
  },
  icon: {
    marginBottom: 8,
  },
  label: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    marginBottom: 4,
  },
  value: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
