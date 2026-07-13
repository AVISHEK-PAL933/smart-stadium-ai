import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { PrimaryButton } from '../../components/PrimaryButton';

const PARKING_ZONES = [
  { id: 'z1', name: 'Zone A (North)', capacity: '85%', available: 150, color: '#FACC15' },
  { id: 'z2', name: 'Zone B (East)', capacity: '45%', available: 550, color: '#39FF14' },
  { id: 'z3', name: 'Zone C (South)', capacity: '98%', available: 20, color: '#EF4444' },
];

export default function ParkingAssistant() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Parking & Transit" />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInUp.delay(100)}>
          <GlassCard style={styles.heroCard}>
            <MaterialIcons
              name="local-parking"
              size={48}
              color={themeColors.tint}
              style={styles.icon}
            />
            <Text style={[styles.title, { color: themeColors.text }]}>Your Reservation</Text>
            <View style={styles.resCard}>
              <View>
                <Text style={[styles.resLabel, { color: themeColors.icon }]}>SPOT</Text>
                <Text style={[styles.resValue, { color: themeColors.text }]}>P4-12B</Text>
              </View>
              <View>
                <Text style={[styles.resLabel, { color: themeColors.icon }]}>ZONE</Text>
                <Text style={[styles.resValue, { color: themeColors.text }]}>East</Text>
              </View>
            </View>
            <PrimaryButton title="Navigate to Spot" onPress={() => {}} style={styles.navBtn} />
          </GlassCard>
        </Animated.View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Live Availability</Text>

        <View style={styles.zoneList}>
          {PARKING_ZONES.map((zone, index) => (
            <Animated.View key={zone.id} entering={FadeInUp.delay(200 + index * 100)}>
              <GlassCard style={styles.zoneCard}>
                <View style={styles.zoneHeader}>
                  <Text style={[styles.zoneName, { color: themeColors.text }]}>{zone.name}</Text>
                  <Text style={[styles.zoneAvail, { color: themeColors.icon }]}>
                    {zone.available} spots left
                  </Text>
                </View>
                <View style={[styles.progressBg, { backgroundColor: themeColors.border }]}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: zone.capacity as any, backgroundColor: zone.color },
                    ]}
                  />
                </View>
              </GlassCard>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Theme.spacing.l, paddingBottom: 100 },
  heroCard: { padding: Theme.spacing.l, alignItems: 'center', marginBottom: Theme.spacing.xl },
  icon: {
    marginBottom: Theme.spacing.m,
    textShadowColor: 'rgba(0, 229, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  title: { fontSize: Theme.typography.sizes.xl, fontWeight: 'bold', marginBottom: Theme.spacing.m },
  resCard: {
    flexDirection: 'row',
    gap: Theme.spacing.xxl,
    marginBottom: Theme.spacing.xl,
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.m,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  resLabel: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  resValue: { fontSize: Theme.typography.sizes.xl, fontWeight: 'bold', marginTop: 4 },
  navBtn: { width: '100%' },
  sectionTitle: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.m,
  },
  zoneList: { gap: Theme.spacing.m },
  zoneCard: { padding: Theme.spacing.m },
  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.s,
  },
  zoneName: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold' },
  zoneAvail: { fontSize: Theme.typography.sizes.m },
  progressBg: { height: 8, borderRadius: 4, width: '100%', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
});
