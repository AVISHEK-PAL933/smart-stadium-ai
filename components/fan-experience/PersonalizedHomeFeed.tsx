import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const PersonalizedHomeFeed = ({ feed }: { feed: any }) => {
  return (
    <GlassCard style={styles.container}>
      <LinearGradient colors={['rgba(0, 229, 255, 0.1)', 'transparent']} style={StyleSheet.absoluteFillObject} />
      <View style={styles.header}>
        <Text style={styles.welcomeText}>{feed.welcomeMessage}</Text>
        <Ionicons name="notifications" size={24} color="#00e5ff" />
      </View>
      <View style={styles.matchCard}>
        <Ionicons name="football" size={20} color="#ffd600" />
        <Text style={styles.matchText}>{feed.upcomingMatch}</Text>
      </View>
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recently Visited</Text>
        <View style={styles.tagsRow}>
          {feed.recentModules.map((mod: string, idx: number) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>{mod}</Text>
            </View>
          ))}
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
    backgroundColor: 'rgba(10, 15, 30, 0.7)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.m,
    marginBottom: Theme.spacing.m,
  },
  matchText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: Theme.spacing.s,
  },
  recentSection: {
    marginTop: Theme.spacing.s,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginBottom: Theme.spacing.s,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.s,
  },
  tag: {
    backgroundColor: 'rgba(0, 229, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.4)',
  },
  tagText: {
    color: '#00e5ff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
