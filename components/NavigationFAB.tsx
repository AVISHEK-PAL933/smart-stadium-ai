import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationDestination } from '../services/navigationService';

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
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Quick Destinations</Text>
      <View style={styles.gridContainer}>
        {destinations.map((dest) => {
          const isActive = activeId === dest.id;
          return (
            <TouchableOpacity
              key={dest.id}
              activeOpacity={0.7}
              onPress={() => onSelectDestination(dest.id)}
              style={styles.cardWrapper}>
              <View style={[styles.card, isActive && styles.cardActive]}>
                <View style={[styles.iconBox, isActive && styles.iconBoxActive]}>
                  <MaterialCommunityIcons
                    name={dest.icon as any}
                    size={28}
                    color={isActive ? '#FFFFFF' : '#00C8FF'}
                  />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardName, isActive && { color: '#00C8FF' }]}>
                    {dest.name}
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
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginVertical: 12, gap: 16 },
  title: { fontSize: 20, fontWeight: 'bold', paddingHorizontal: 4, color: '#FFFFFF' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cardWrapper: { width: '48%', minWidth: 150 },
  card: { padding: 16, alignItems: 'center', gap: 12, backgroundColor: 'rgba(15,23,42,0.95)', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  cardActive: { borderColor: '#00C8FF', backgroundColor: 'rgba(0,200,255,0.1)', shadowColor: '#00C8FF' },
  iconBox: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(0,200,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  iconBoxActive: { backgroundColor: '#00C8FF' },
  cardInfo: { alignItems: 'center', gap: 4 },
  cardName: { fontSize: 16, fontWeight: 'bold', color: '#FFF', textAlign: 'center' },
  cardMetrics: { flexDirection: 'row', gap: 12, marginTop: 4 },
  metric: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metricText: { color: 'rgba(255,255,255,0.6)', fontSize: 12 },
});
