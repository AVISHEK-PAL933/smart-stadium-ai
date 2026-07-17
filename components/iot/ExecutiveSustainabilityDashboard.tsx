import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const ExecutiveSustainabilityDashboard = ({ kpis }: { kpis: any }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="stats-chart" size={24} color="#00e5ff" />
        <Text style={styles.title}>Executive Sustainability KPIs</Text>
      </View>
      <View style={styles.grid}>
        <View style={styles.kpiCard}>
          <LinearGradient colors={['rgba(0,230,118,0.15)', 'transparent']} style={StyleSheet.absoluteFillObject} />
          <Ionicons name="flash" size={24} color="#00e676" />
          <Text style={styles.kpiValue}>{kpis.energySaved}</Text>
          <Text style={styles.kpiLabel}>Energy Saved</Text>
        </View>
        <View style={styles.kpiCard}>
          <LinearGradient colors={['rgba(41,121,255,0.15)', 'transparent']} style={StyleSheet.absoluteFillObject} />
          <Ionicons name="water" size={24} color="#2979ff" />
          <Text style={styles.kpiValue}>{kpis.waterSaved}</Text>
          <Text style={styles.kpiLabel}>Water Saved</Text>
        </View>
        <View style={styles.kpiCard}>
          <LinearGradient colors={['rgba(255,214,0,0.15)', 'transparent']} style={StyleSheet.absoluteFillObject} />
          <Ionicons name="cloud" size={24} color="#ffd600" />
          <Text style={styles.kpiValue}>{kpis.co2Reduced}</Text>
          <Text style={styles.kpiLabel}>CO₂ Reduced</Text>
        </View>
        <View style={styles.kpiCard}>
          <LinearGradient colors={['rgba(179,136,255,0.15)', 'transparent']} style={StyleSheet.absoluteFillObject} />
          <Ionicons name="trash" size={24} color="#b388ff" />
          <Text style={styles.kpiValue}>{kpis.wasteRecycled}</Text>
          <Text style={styles.kpiLabel}>Waste Recycled</Text>
        </View>
        <View style={[styles.kpiCard, styles.kpiCardFull]}>
          <LinearGradient colors={['rgba(0,229,255,0.15)', 'transparent']} style={StyleSheet.absoluteFillObject} />
          <Ionicons name="cash" size={24} color="#00e5ff" />
          <Text style={styles.kpiValue}>{kpis.monthlySavings}</Text>
          <Text style={styles.kpiLabel}>Monthly Cost Savings</Text>
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
    backgroundColor: 'rgba(10, 20, 30, 0.8)',
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
  kpiCard: {
    width: '47%',
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  kpiCardFull: {
    width: '100%',
    flexDirection: 'row',
    gap: Theme.spacing.m,
  },
  kpiValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  kpiLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 4,
  },
});
