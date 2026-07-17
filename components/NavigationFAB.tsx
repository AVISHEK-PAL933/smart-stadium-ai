import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationDestination } from '../services/navigationService';
import { GlassCard } from './GlassCard';

interface NavigationFABProps {
  destinations: NavigationDestination[];
  onSelectDestination: (id: string) => void;
  activeId: string | null;
}

export const NavigationFAB = ({
  destinations,
  onSelectDestination,
  activeId,
}: NavigationFABProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: themeColors.text }]}>Quick Destinations</Text>
      <View style={styles.gridContainer}>
        {destinations.map((dest) => {
          const isActive = activeId === dest.id;
          return (
            <TouchableOpacity
              key={dest.id}
              activeOpacity={0.7}
              onPress={() => onSelectDestination(dest.id)}
              style={styles.cardWrapper}>
              <GlassCard style={[styles.card, isActive && styles.cardActive]}>
                <View style={[styles.iconBox, isActive && styles.iconBoxActive]}>
                  <MaterialCommunityIcons
                    name={dest.icon as any}
                    size={28}
                    color={isActive ? '#FFFFFF' : '#00C8FF'}
                  />
                </View>
                <Text style={[styles.cardName, isActive && { color: '#00C8FF' }]}>
                  {dest.name.split(' (')[0]}
                </Text>
                
                <View style={styles.cardMetrics}>
                  <View style={styles.metric}>
                    <MaterialCommunityIcons name="walk" size={14} color="rgba(255,255,255,0.5)" />
                    <Text style={styles.metricText}>3 min</Text>
                  </View>
                  <View style={styles.metric}>
                    <MaterialCommunityIcons name="map-marker-distance" size={14} color="rgba(255,255,255,0.5)" />
                    <Text style={styles.metricText}>150m</Text>
                  </View>
                </View>
              </GlassCard>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginVertical: Theme.spacing.s, gap: Theme.spacing.m },
  title: { fontSize: 20, fontWeight: 'bold', paddingHorizontal: 4 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cardWrapper: { width: '48%', minWidth: 150 },
  card: { padding: 16, alignItems: 'flex-start', gap: 12, backgroundColor: 'rgba(15,23,42,0.85)' },
  cardActive: { borderColor: '#00C8FF', borderWidth: 1, backgroundColor: 'rgba(0,200,255,0.1)' },
  iconBox: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(0,200,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  iconBoxActive: { backgroundColor: '#00C8FF' },
  cardName: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  cardMetrics: { flexDirection: 'row', gap: 12 },
  metric: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metricText: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
});
