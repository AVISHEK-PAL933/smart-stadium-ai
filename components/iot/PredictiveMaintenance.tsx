import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const PredictiveMaintenance = ({ predictions }: { predictions: any[] }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return Colors.dark.danger;
      case 'Medium': return Colors.dark.warning;
      case 'Low': return Colors.dark.success;
      default: return '#fff';
    }
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="time" size={24} color="#b388ff" />
        <Text style={styles.title}>Predictive Maintenance</Text>
      </View>
      <View style={styles.content}>
        {predictions.map((pred, idx) => (
          <View key={idx} style={styles.predCard}>
            <LinearGradient
              colors={[`${getRiskColor(pred.risk)}15`, 'transparent']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <View style={styles.iconBox}>
              <Ionicons name="alert-circle" size={20} color={getRiskColor(pred.risk)} />
            </View>
            <View style={styles.predInfo}>
              <Text style={styles.predEvent}>{pred.event}</Text>
              <Text style={styles.predTime}>Expected in: {pred.time}</Text>
            </View>
            <View style={[styles.riskBadge, { backgroundColor: getRiskColor(pred.risk) + '30' }]}>
              <Text style={[styles.riskText, { color: getRiskColor(pred.risk) }]}>{pred.risk}</Text>
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
    backgroundColor: 'rgba(20, 15, 30, 0.7)',
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
  predCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  iconBox: {
    marginRight: Theme.spacing.m,
  },
  predInfo: {
    flex: 1,
  },
  predEvent: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  predTime: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 2,
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});
