import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const DigitalFanPassport = ({ user }: { user: any }) => {
  return (
    <GlassCard style={styles.container}>
      <LinearGradient colors={['rgba(255, 214, 0, 0.2)', 'transparent']} style={StyleSheet.absoluteFillObject} />
      <View style={styles.header}>
        <Ionicons name="card" size={20} color="#ffd600" />
        <Text style={styles.headerTitle}>Digital Fan Passport</Text>
      </View>
      <View style={styles.cardBody}>
        <Image source={{ uri: user.photoUrl }} style={styles.photo} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.subtitle}>{user.nationality} • {user.favoriteTeam}</Text>
          
          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Ionicons name="star" size={12} color="#00e5ff" />
              <Text style={styles.badgeText}>{user.membershipTier}</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="medal" size={12} color="#00e676" />
              <Text style={styles.badgeText}>{user.loyaltyLevel}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.pointsCol}>
          <Text style={styles.pointsLabel}>Reward Points</Text>
          <Text style={styles.pointsValue}>{user.rewardPoints}</Text>
        </View>
        <Ionicons name="qr-code" size={40} color="#fff" />
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(25, 20, 5, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 214, 0, 0.3)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  headerTitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ffd600',
  },
  userInfo: {
    marginLeft: Theme.spacing.m,
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 8,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: Theme.spacing.m,
  },
  pointsCol: {},
  pointsLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  pointsValue: {
    color: '#ffd600',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
