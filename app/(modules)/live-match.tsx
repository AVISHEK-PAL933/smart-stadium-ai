import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function LiveMatch() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Live Match Center" />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInUp.delay(100)}>
          <GlassCard style={styles.scoreboard}>
            <Text style={[styles.matchStatus, { color: themeColors.tint }]}>LIVE - 68'</Text>
            <View style={styles.teamsContainer}>
              <View style={styles.team}>
                <Text style={[styles.teamName, { color: themeColors.text }]}>BRA</Text>
                <Text style={[styles.score, { color: themeColors.text }]}>2</Text>
              </View>
              <Text style={[styles.vs, { color: themeColors.icon }]}>-</Text>
              <View style={styles.team}>
                <Text style={[styles.score, { color: themeColors.text }]}>1</Text>
                <Text style={[styles.teamName, { color: themeColors.text }]}>ARG</Text>
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Key Events</Text>
        <GlassCard style={styles.timeline}>
          <View style={styles.eventRow}>
            <Text style={[styles.time, { color: themeColors.tint }]}>45'</Text>
            <MaterialCommunityIcons
              name="soccer"
              size={20}
              color={themeColors.text}
              style={styles.eventIcon}
            />
            <Text style={[styles.eventText, { color: themeColors.text }]}>
              Goal - Vini Jr. (BRA)
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: themeColors.border }]} />
          <View style={styles.eventRow}>
            <Text style={[styles.time, { color: themeColors.tint }]}>32'</Text>
            <MaterialCommunityIcons
              name="cards-outline"
              size={20}
              color="#FACC15"
              style={styles.eventIcon}
            />
            <Text style={[styles.eventText, { color: themeColors.text }]}>
              Yellow Card - Romero (ARG)
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: themeColors.border }]} />
          <View style={styles.eventRow}>
            <Text style={[styles.time, { color: themeColors.tint }]}>12'</Text>
            <MaterialCommunityIcons
              name="soccer"
              size={20}
              color={themeColors.text}
              style={styles.eventIcon}
            />
            <Text style={[styles.eventText, { color: themeColors.text }]}>Goal - Messi (ARG)</Text>
          </View>
        </GlassCard>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Match Stats</Text>
        <GlassCard style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={[styles.statValue, { color: themeColors.text }]}>58%</Text>
            <Text style={[styles.statLabel, { color: themeColors.icon }]}>Possession</Text>
            <Text style={[styles.statValue, { color: themeColors.text }]}>42%</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statValue, { color: themeColors.text }]}>12</Text>
            <Text style={[styles.statLabel, { color: themeColors.icon }]}>Shots</Text>
            <Text style={[styles.statValue, { color: themeColors.text }]}>8</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statValue, { color: themeColors.text }]}>5</Text>
            <Text style={[styles.statLabel, { color: themeColors.icon }]}>On Target</Text>
            <Text style={[styles.statValue, { color: themeColors.text }]}>3</Text>
          </View>
        </GlassCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Theme.spacing.l, paddingBottom: 100 },
  scoreboard: { padding: Theme.spacing.l, alignItems: 'center', marginBottom: Theme.spacing.xl },
  matchStatus: {
    fontSize: Theme.typography.sizes.m,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: Theme.spacing.m,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: Theme.spacing.xl,
  },
  team: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.m },
  teamName: { fontSize: Theme.typography.sizes.xl, fontWeight: 'bold' },
  score: { fontSize: 48, fontWeight: '900' },
  vs: { fontSize: Theme.typography.sizes.xl, fontWeight: 'bold', opacity: 0.5 },
  sectionTitle: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.m,
    marginTop: Theme.spacing.m,
  },
  timeline: { padding: Theme.spacing.l },
  eventRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Theme.spacing.s },
  time: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold', width: 40 },
  eventIcon: { marginRight: Theme.spacing.m },
  eventText: { fontSize: Theme.typography.sizes.m, flex: 1 },
  divider: { height: 1, width: '100%', marginVertical: Theme.spacing.s },
  statsCard: { padding: Theme.spacing.l, gap: Theme.spacing.m },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statLabel: { fontSize: Theme.typography.sizes.m },
  statValue: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: 'bold',
    width: 50,
    textAlign: 'center',
  },
});
