import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const AIExecutiveAssistant = ({ assistant }: { assistant: any }) => {
  return (
    <GlassCard style={styles.container}>
      <LinearGradient
        colors={['rgba(179, 136, 255, 0.15)', 'rgba(0, 229, 255, 0.05)']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.header}>
        <Ionicons name="hardware-chip" size={24} color="#b388ff" />
        <Text style={styles.title}>AI Executive Assistant</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.summaryText}>{assistant.summary}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {assistant.recommendations.map((rec: string, idx: number) => (
            <View key={idx} style={styles.listItem}>
              <Ionicons name="checkmark-circle" size={16} color="#00e676" />
              <Text style={styles.listText}>{rec}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk Alerts</Text>
          {assistant.risks.map((risk: string, idx: number) => (
            <View key={idx} style={styles.listItem}>
              <Ionicons name="warning" size={16} color="#ff3d00" />
              <Text style={styles.listText}>{risk}</Text>
            </View>
          ))}
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
    backgroundColor: 'rgba(20, 10, 30, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(179, 136, 255, 0.3)',
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
  summaryText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  section: {
    marginTop: Theme.spacing.s,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 8,
  },
  listText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
});
