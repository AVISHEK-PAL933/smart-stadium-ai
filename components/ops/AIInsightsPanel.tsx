import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const AIInsightsPanel = ({ insights }: { insights: string[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="bulb" size={24} color="#ffd600" />
        <Text style={styles.title}>AI Insights</Text>
      </View>
      <View style={styles.content}>
        {insights.map((insight, idx) => (
          <View key={idx} style={styles.insightRow}>
            <LinearGradient
              colors={['rgba(255, 214, 0, 0.1)', 'transparent']}
              style={StyleSheet.absoluteFillObject}
              
            />
            <Ionicons name="sparkles" size={16} color="#ffd600" style={styles.icon} />
            <Text style={styles.insightText}>{insight}</Text>
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
    backgroundColor: 'rgba(25, 25, 10, 0.7)',
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
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.m,
    borderWidth: 1,
    borderColor: 'rgba(255, 214, 0, 0.2)',
    borderRadius: Theme.shapes.borderRadius.s,
  },
  icon: {
    marginRight: Theme.spacing.m,
  },
  insightText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
});
