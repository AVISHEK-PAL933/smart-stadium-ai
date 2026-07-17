import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface DecisionType {
  id: string;
  action: string;
  reason: string;
  confidence: 'High' | 'Medium' | 'Low';
}

export const AIDecisionEngine = ({ decisions }: { decisions: DecisionType[] }) => {
  const getConfidenceColor = (conf: string) => {
    switch (conf) {
      case 'High': return Colors.dark.success;
      case 'Medium': return Colors.dark.warning;
      case 'Low': return Colors.dark.danger;
      default: return Colors.dark.tint;
    }
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="hardware-chip" size={24} color="#b388ff" />
        <Text style={styles.title}>AI Decision Engine</Text>
      </View>
      <View style={styles.content}>
        {decisions.map((dec) => (
          <View key={dec.id} style={styles.decisionCard}>
            <LinearGradient
              colors={['rgba(179, 136, 255, 0.1)', 'rgba(0, 229, 255, 0.05)']}
              style={StyleSheet.absoluteFillObject}
              
            />
            <View style={styles.row}>
              <View style={styles.info}>
                <Text style={styles.action}>{dec.action}</Text>
                <Text style={styles.reason}>{dec.reason}</Text>
              </View>
              <View style={styles.confidenceBadge}>
                <View style={[styles.dot, { backgroundColor: getConfidenceColor(dec.confidence) }]} />
                <Text style={[styles.confidenceText, { color: getConfidenceColor(dec.confidence) }]}>
                  {dec.confidence}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.executeButton}>
              <Text style={styles.executeText}>EXECUTE</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
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
    backgroundColor: 'rgba(20, 10, 30, 0.8)',
    borderColor: 'rgba(179, 136, 255, 0.3)',
    borderWidth: 1,
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
  decisionCard: {
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.m,
  },
  info: {
    flex: 1,
    marginRight: Theme.spacing.m,
  },
  action: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reason: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  executeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(179, 136, 255, 0.2)',
    paddingVertical: 8,
    borderRadius: Theme.shapes.borderRadius.s,
    borderWidth: 1,
    borderColor: 'rgba(179, 136, 255, 0.5)',
  },
  executeText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
    letterSpacing: 1,
  },
});
