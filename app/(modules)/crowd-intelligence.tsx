import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

const GATE_DATA = [
  { id: 'gate-a', name: 'Gate A', status: 'Low', waitTime: '2 mins', color: '#39FF14' },
  { id: 'gate-b', name: 'Gate B', status: 'Moderate', waitTime: '8 mins', color: '#FACC15' },
  { id: 'gate-c', name: 'Gate C', status: 'High', waitTime: '15 mins', color: '#FF3B30' },
  { id: 'gate-d', name: 'Gate D (VIP)', status: 'Low', waitTime: '1 min', color: '#39FF14' },
];

export default function CrowdIntelligence() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Crowd Intelligence" />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInUp.delay(100)}>
          <GlassCard style={styles.heroCard}>
            <MaterialCommunityIcons
              name="account-group"
              size={48}
              color={themeColors.tint}
              style={styles.icon}
            />
            <Text style={[styles.title, { color: themeColors.text }]}>Live Stadium Density</Text>
            <Text style={[styles.subtitle, { color: themeColors.icon }]}>
              Overall crowd levels are Moderate. Navigate toward Gate A or D for fastest entry.
            </Text>
          </GlassCard>
        </Animated.View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Gate Activity</Text>

        <View style={styles.gateList}>
          {GATE_DATA.map((gate, index) => (
            <Animated.View key={gate.id} entering={FadeInUp.delay(200 + index * 100)}>
              <GlassCard style={styles.gateCard}>
                <View style={styles.gateInfo}>
                  <Text style={[styles.gateName, { color: themeColors.text }]}>{gate.name}</Text>
                  <Text style={[styles.gateWait, { color: themeColors.icon }]}>
                    Wait: {gate.waitTime}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: gate.color + '20', borderColor: gate.color },
                  ]}>
                  <Text style={[styles.statusText, { color: gate.color }]}>{gate.status}</Text>
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
  title: { fontSize: Theme.typography.sizes.xl, fontWeight: 'bold', marginBottom: Theme.spacing.s },
  subtitle: { fontSize: Theme.typography.sizes.m, textAlign: 'center' },
  sectionTitle: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.m,
  },
  gateList: { gap: Theme.spacing.m },
  gateCard: {
    padding: Theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gateInfo: { gap: 4 },
  gateName: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold' },
  gateWait: { fontSize: Theme.typography.sizes.s },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1 },
  statusText: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
});
