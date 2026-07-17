import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const ExecutiveKPIDashboard = ({ kpis }: { kpis: any[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="pie-chart" size={24} color="#00e5ff" />
        <Text style={styles.title}>Executive KPIs</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.grid}>
          {/* Row 1 */}
          <View style={styles.row}>
            {kpis.slice(0, 6).map((kpi, idx) => (
              <View key={idx} style={styles.kpiCard}>
                <LinearGradient colors={[`${kpi.color}15`, 'transparent']} style={[StyleSheet.absoluteFillObject, { borderRadius: Theme.shapes.borderRadius.m }]} />
                <View style={[styles.iconBox, { backgroundColor: `${kpi.color}30` }]}>
                  <Ionicons name={kpi.icon as any} size={20} color={kpi.color} />
                </View>
                <Text style={styles.kpiValue}>{kpi.value}</Text>
                <Text style={styles.kpiLabel}>{kpi.label}</Text>
              </View>
            ))}
          </View>
          {/* Row 2 */}
          <View style={styles.row}>
            {kpis.slice(6, 12).map((kpi, idx) => (
              <View key={idx} style={styles.kpiCard}>
                <LinearGradient colors={[`${kpi.color}15`, 'transparent']} style={[StyleSheet.absoluteFillObject, { borderRadius: Theme.shapes.borderRadius.m }]} />
                <View style={[styles.iconBox, { backgroundColor: `${kpi.color}30` }]}>
                  <Ionicons name={kpi.icon as any} size={20} color={kpi.color} />
                </View>
                <Text style={styles.kpiValue}>{kpi.value}</Text>
                <Text style={styles.kpiLabel}>{kpi.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(10, 15, 30, 0.7)',
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
    flexDirection: 'column',
    gap: Theme.spacing.m,
    paddingRight: Theme.spacing.m,
  },
  row: {
    flexDirection: 'row',
    gap: Theme.spacing.m,
  },
  kpiCard: {
    width: 140,
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  kpiValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  kpiLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
});
