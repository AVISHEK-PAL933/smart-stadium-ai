import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const AIInsightsEngine = ({ insights }: { insights: string[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="bulb" size={24} color="#00e5ff" />
        <Text style={styles.title}>AI Insights Engine</Text>
      </View>
      <View style={styles.content}>
        {insights.map((insight, idx) => (
          <View key={idx} style={styles.insightCard}>
            <LinearGradient
              colors={['rgba(0, 229, 255, 0.15)', 'transparent']}
              style={StyleSheet.absoluteFillObject}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <Ionicons name="analytics" size={16} color="#00e5ff" style={styles.icon} />
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
    backgroundColor: 'rgba(5, 10, 25, 0.7)',
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
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.m,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.2)',
    borderRadius: Theme.shapes.borderRadius.s,
    overflow: 'hidden',
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
