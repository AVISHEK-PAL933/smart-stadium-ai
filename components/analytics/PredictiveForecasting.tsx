import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const PredictiveForecasting = ({ predictions }: { predictions: any[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="eye" size={24} color="#b388ff" />
        <Text style={styles.title}>Predictive Forecasting</Text>
      </View>
      <View style={styles.grid}>
        {predictions.map((pred, idx) => (
          <View key={idx} style={styles.predCard}>
            <LinearGradient
              colors={['rgba(179, 136, 255, 0.1)', 'transparent']}
              style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.row}>
              <Text style={styles.predLabel}>{pred.label}</Text>
              <Ionicons
                name={pred.trend === 'up' ? 'trending-up' : 'trending-down'}
                size={16}
                color={pred.trend === 'up' ? Colors.dark.success : Colors.dark.danger}
              />
            </View>
            <Text style={styles.predValue}>{pred.value}</Text>
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
    backgroundColor: 'rgba(25, 10, 30, 0.7)',
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
    gap: Theme.spacing.s,
    justifyContent: 'space-between',
  },
  predCard: {
    width: '48%',
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.s,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  predLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  predValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
