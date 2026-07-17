import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const RewardPoints = ({ rewards }: { rewards: any }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="gift" size={24} color="#ff3d00" />
        <Text style={styles.title}>Rewards & Points</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {rewards.recentActivity.map((act: any, idx: number) => (
          <View key={idx} style={styles.activityRow}>
            <View>
              <Text style={styles.actTitle}>{act.action}</Text>
              <Text style={styles.actDate}>{act.date}</Text>
            </View>
            <Text style={styles.actPoints}>{act.points}</Text>
          </View>
        ))}

        <Text style={[styles.sectionTitle, { marginTop: Theme.spacing.m }]}>Redeem Rewards</Text>
        <View style={styles.redeemGrid}>
          {rewards.redeemable.map((item: any, idx: number) => (
            <TouchableOpacity key={idx} style={styles.redeemCard}>
              <LinearGradient colors={['rgba(255, 61, 0, 0.1)', 'transparent']} style={StyleSheet.absoluteFillObject} />
              <Ionicons name={item.icon as any} size={24} color="#ff3d00" />
              <Text style={styles.redeemTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.redeemCost}>{item.cost} pts</Text>
            </TouchableOpacity>
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
    backgroundColor: 'rgba(25, 10, 5, 0.7)',
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
  content: {
    gap: Theme.spacing.s,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  actTitle: {
    color: '#fff',
    fontSize: 14,
  },
  actDate: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    marginTop: 2,
  },
  actPoints: {
    color: '#00e676',
    fontSize: 14,
    fontWeight: 'bold',
  },
  redeemGrid: {
    flexDirection: 'row',
    gap: Theme.spacing.s,
    justifyContent: 'space-between',
  },
  redeemCard: {
    flex: 1,
    alignItems: 'center',
    padding: Theme.spacing.s,
    borderWidth: 1,
    borderColor: 'rgba(255, 61, 0, 0.2)',
    borderRadius: Theme.shapes.borderRadius.s,
    overflow: 'hidden',
  },
  redeemTitle: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  redeemCost: {
    color: '#ff3d00',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
