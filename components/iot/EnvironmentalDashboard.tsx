import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const EnvironmentalDashboard = ({ env }: { env: any }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="cloud" size={24} color="#00e5ff" />
        <Text style={styles.title}>Environmental Dashboard</Text>
      </View>
      <View style={styles.grid}>
        <View style={styles.card}>
          <Ionicons name="partly-sunny" size={24} color="#fbc02d" />
          <Text style={styles.value}>{env.weather}</Text>
          <Text style={styles.label}>Weather</Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="water" size={24} color="#2979ff" />
          <Text style={styles.value}>{env.rainProb}%</Text>
          <Text style={styles.label}>Rain Probability</Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="sunny" size={24} color="#ff3d00" />
          <Text style={styles.value}>{env.uvIndex}</Text>
          <Text style={styles.label}>UV Index</Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="leaf" size={24} color="#00e676" />
          <Text style={styles.value}>{env.aqi}</Text>
          <Text style={styles.label}>AQI</Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="navigate" size={24} color="#b388ff" />
          <Text style={styles.value}>{env.windSpeed}</Text>
          <Text style={styles.label}>Wind Speed</Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="thermometer" size={24} color="#ff1744" />
          <Text style={styles.value}>{env.heatIndex}</Text>
          <Text style={styles.label}>Heat Index</Text>
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
    backgroundColor: 'rgba(5, 20, 25, 0.7)',
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
    width: '30%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: Theme.spacing.s,
    borderRadius: Theme.shapes.borderRadius.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'center',
  },
  label: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
});
