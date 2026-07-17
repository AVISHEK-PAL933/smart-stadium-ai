import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const AchievementsBadges = ({ badges }: { badges: any[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="trophy" size={24} color="#ffd600" />
        <Text style={styles.title}>Achievements & Badges</Text>
      </View>
      <View style={styles.grid}>
        {badges.map((badge, idx) => (
          <View key={idx} style={[styles.badgeCard, !badge.unlocked && styles.lockedCard]}>
            {badge.unlocked && (
              <LinearGradient colors={[`${badge.color}20`, 'transparent']} style={StyleSheet.absoluteFillObject} />
            )}
            <View style={[styles.iconBox, { backgroundColor: badge.unlocked ? `${badge.color}40` : 'rgba(255,255,255,0.1)' }]}>
              <Ionicons name={badge.icon as any} size={24} color={badge.unlocked ? badge.color : 'rgba(255,255,255,0.3)'} />
            </View>
            <Text style={[styles.badgeTitle, !badge.unlocked && styles.lockedText]} numberOfLines={2}>
              {badge.title}
            </Text>
          </View>
        ))}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(15, 10, 5, 0.7)',
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
    gap: Theme.spacing.s,
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '31%',
    alignItems: 'center',
    paddingVertical: Theme.spacing.m,
    paddingHorizontal: 4,
    borderRadius: Theme.shapes.borderRadius.s,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  lockedCard: {
    borderColor: 'transparent',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeTitle: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lockedText: {
    color: 'rgba(255,255,255,0.4)',
  },
});
