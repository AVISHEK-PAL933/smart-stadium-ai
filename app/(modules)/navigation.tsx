import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { PrimaryButton } from '../../components/PrimaryButton';

export default function Navigation() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const destinations = [
    { id: 'seat', icon: 'seat', title: 'My Seat' },
    { id: 'restroom', icon: 'water-closet', title: 'Restrooms' },
    { id: 'food', icon: 'food-fork-drink', title: 'Concessions' },
    { id: 'exit', icon: 'exit-run', title: 'Nearest Exit' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Stadium Navigation" />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.delay(100)}>
          <GlassCard style={styles.mapCard}>
            <View
              style={[
                styles.mapPlaceholder,
                {
                  backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)',
                  borderColor: themeColors.border,
                },
              ]}>
              <MaterialCommunityIcons
                name="map"
                size={64}
                color={themeColors.tint}
                style={{ opacity: 0.5 }}
              />
              <Text style={[styles.mapText, { color: themeColors.icon }]}>3D Interactive Map</Text>
              {selectedDestination && (
                <View style={[styles.routeBadge, { backgroundColor: themeColors.tint }]}>
                  <Text style={styles.routeText}>
                    Routing to {destinations.find((d) => d.id === selectedDestination)?.title}
                  </Text>
                </View>
              )}
            </View>
          </GlassCard>
        </Animated.View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Quick Destinations</Text>

        <View style={styles.grid}>
          {destinations.map((dest, index) => (
            <Animated.View
              key={dest.id}
              entering={FadeInUp.delay(200 + index * 100)}
              style={styles.gridItem}>
              <TouchableOpacity
                onPress={() => setSelectedDestination(dest.id)}
                style={[
                  styles.destCard,
                  {
                    backgroundColor:
                      selectedDestination === dest.id ? themeColors.tint + '20' : themeColors.card,
                    borderColor:
                      selectedDestination === dest.id ? themeColors.tint : themeColors.border,
                  },
                ]}>
                <MaterialCommunityIcons
                  name={dest.icon as any}
                  size={32}
                  color={selectedDestination === dest.id ? themeColors.tint : themeColors.icon}
                />
                <Text style={[styles.destTitle, { color: themeColors.text }]}>{dest.title}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {selectedDestination && (
          <Animated.View entering={FadeInUp}>
            <PrimaryButton
              title="Start Navigation"
              onPress={() => {}}
              style={{ marginTop: Theme.spacing.xl }}
            />
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Theme.spacing.l, paddingBottom: 100 },
  mapCard: { padding: Theme.spacing.m, marginBottom: Theme.spacing.xl },
  mapPlaceholder: {
    height: 250,
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: { fontSize: Theme.typography.sizes.m, marginTop: Theme.spacing.s, fontWeight: 'bold' },
  routeBadge: {
    position: 'absolute',
    bottom: Theme.spacing.m,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  routeText: { color: '#fff', fontWeight: 'bold', fontSize: Theme.typography.sizes.s },
  sectionTitle: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.m,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.m,
    justifyContent: 'space-between',
  },
  gridItem: { width: '47%' },
  destCard: {
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Theme.spacing.s,
    aspectRatio: 1.2,
  },
  destTitle: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
});
