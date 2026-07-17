import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../../components/GlassCard';
import { LinearGradient } from 'expo-linear-gradient';

export default function NotificationsScreen() {
  const notifications = [
    { type: 'Emergency', title: 'Heavy Rain Warning', desc: 'Please avoid open areas. Roof is closing.', time: 'Just now', icon: 'warning', color: '#ff1744', unread: true },
    { type: 'AI Assistant', title: 'Seat Upgrade Available', desc: 'Upgrade to VIP for 5000 pts.', time: '5m ago', icon: 'hardware-chip', color: '#b388ff', unread: true },
    { type: 'Food', title: 'Order Ready', desc: 'Your Hot Dog Combo is ready at Stand 4.', time: '12m ago', icon: 'fast-food', color: '#ffd600', unread: false },
    { type: 'Match', title: 'Goal! USA', desc: 'Pulisic scores in the 42nd minute.', time: '1h ago', icon: 'football', color: '#00e676', unread: false },
    { type: 'Parking', title: 'Parking Reserved', desc: 'North Lot Spot 42 confirmed.', time: '2h ago', icon: 'car', color: '#00e5ff', unread: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Notifications" />
      <View style={styles.actionRow}>
        <Text style={styles.unreadCount}>2 Unread</Text>
        <TouchableOpacity>
          <Text style={styles.markReadBtn}>Mark all read</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {notifications.map((notif, idx) => (
            <GlassCard key={idx} style={[styles.notifCard, notif.unread && styles.unreadCard]}>
              {notif.unread && <LinearGradient colors={[`${notif.color}15`, 'transparent']} style={StyleSheet.absoluteFillObject} />}
              <View style={[styles.iconBox, { backgroundColor: `${notif.color}20` }]}>
                <Ionicons name={notif.icon as any} size={24} color={notif.color} />
              </View>
              <View style={styles.notifInfo}>
                <View style={styles.notifHeader}>
                  <Text style={[styles.notifTitle, notif.unread && { color: notif.color }]}>{notif.title}</Text>
                  <Text style={styles.notifTime}>{notif.time}</Text>
                </View>
                <Text style={styles.notifDesc}>{notif.desc}</Text>
              </View>
            </GlassCard>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.s,
  },
  unreadCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
  markReadBtn: {
    color: '#00e5ff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Theme.spacing.m,
    gap: Theme.spacing.m,
  },
  notifCard: {
    flexDirection: 'row',
    padding: Theme.spacing.m,
    marginBottom: Theme.spacing.s,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#00e5ff',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.m,
  },
  notifInfo: {
    flex: 1,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notifTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notifTime: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  notifDesc: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    lineHeight: 20,
  },
});
