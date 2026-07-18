import { useGlobalContext } from '../context/GlobalProvider';
import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';
import Animated, { FadeInRight } from 'react-native-reanimated';

const InfoRow = ({ icon, label, value, color = '#00C8FF' }: any) => (
  <View style={styles.infoRow}>
    <View style={[styles.iconBox, { backgroundColor: `${color}20` }]}>
      <MaterialCommunityIcons name={icon} size={20} color={color} />
    </View>
    <View style={styles.infoTextCol}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

export const AIInfoPanel = () => {
  return (
    <Animated.View entering={FadeInRight.delay(300).duration(500)} style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        <GlassCard style={styles.matchCard} gradientColors={['#0B1120', '#0F172A']}>
          <Text style={styles.sectionTitle}>Today's Match</Text>
          <View style={styles.scoreRow}>
            <View style={styles.team}>
              <MaterialCommunityIcons name="shield-star" size={32} color="#00C8FF" />
              <Text style={styles.teamName}>USA</Text>
            </View>
            <View style={styles.scoreCenter}>
              <Text style={styles.scoreText}>2 - 1</Text>
              <Text style={styles.timeText}>72' Live</Text>
            </View>
            <View style={styles.team}>
              <MaterialCommunityIcons name="shield-sun" size={32} color="#FF9800" />
              <Text style={styles.teamName}>BRA</Text>
            </View>
          </View>
        </GlassCard>

        <GlassCard style={styles.statsCard} gradientColors={['#0B1120', '#0F172A']}>
          <Text style={styles.sectionTitle}>Stadium Status</Text>
          <View style={styles.statsGrid}>
            <InfoRow icon="weather-partly-cloudy" label="Weather" value="72°F Clear" color="#FFCA28" />
            <InfoRow icon="account-group" label="Crowd" value="85% Full" color="#FF1744" />
            <InfoRow icon="car" label="Parking" value="Lot B Open" color="#00E676" />
            <InfoRow icon="walk" label="Concourse" value="Smooth" color="#00C8FF" />
          </View>
        </GlassCard>

        <GlassCard style={styles.tipsCard} gradientColors={['#0B1120', '#0F172A']}>
          <View style={styles.tipsHeader}>
            <MaterialCommunityIcons name="lightbulb-on" size={20} color="#FFCA28" />
            <Text style={styles.sectionTitle}>AI Insight</Text>
          </View>
          <Text style={styles.tipText}>
            Lines at Section 112 concessions are currently short (approx. 2 min wait). Good time to grab a snack before the 80th minute!
          </Text>
        </GlassCard>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(8,18,35,0.5)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.05)',
  },
  scroll: {
    gap: 24,
    paddingBottom: 40,
  },
  matchCard: {
    padding: 16,
    gap: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  team: {
    alignItems: 'center',
    gap: 8,
  },
  teamName: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Inter',
  },
  scoreCenter: {
    alignItems: 'center',
    gap: 4,
  },
  scoreText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  timeText: {
    color: '#00E676',
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    fontFamily: 'Inter',
  },
  statsCard: {
    padding: 16,
    borderRadius: 20,
    gap: 12,
    width: '100%',
  },
  statsGrid: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#CBD5E1',
    marginBottom: 2,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  tipsCard: {
    padding: 16,
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    width: '100%',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tipText: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Inter',
  },
});
