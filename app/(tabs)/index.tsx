import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../../components/GlassCard';

const QUICK_ACTIONS = [
  {
    id: 'ai-match-assistant',
    title: 'AI Assistant',
    icon: 'robot',
    route: '/(modules)/ai-match-assistant',
  },
  {
    id: 'smart-ticket',
    title: 'Ticket Booking',
    icon: 'ticket-confirmation',
    route: '/(modules)/smart-ticket',
  },
  {
    id: 'navigation',
    title: 'Seat Navigation',
    icon: 'map-marker-path',
    route: '/(modules)/navigation',
  },
  {
    id: 'food-ordering',
    title: 'Food Delivery',
    icon: 'food-fork-drink',
    route: '/(modules)/food-ordering',
  },
  { id: 'parking', title: 'Parking', icon: 'parking', route: '/(modules)/parking' },
  { id: 'emergency', title: 'Emergency', icon: 'alert-circle', route: '/(modules)/emergency' },
  { id: 'live-match', title: 'Live Match', icon: 'soccer', route: '/(modules)/live-match' },
  {
    id: 'crowd-intelligence',
    title: 'Crowd Intel',
    icon: 'account-group',
    route: '/(modules)/crowd-intelligence',
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    icon: 'human-wheelchair',
    route: '/(modules)/accessibility',
  },
  {
    id: 'multilingual-guide',
    title: 'Language AI',
    icon: 'translate',
    route: '/(modules)/multilingual-guide',
  },
  { id: 'lost-found', title: 'Lost & Found', icon: 'image-search', route: '/(modules)/lost-found' },
  {
    id: 'fan-engagement',
    title: 'Fan Zone',
    icon: 'gamepad-variant',
    route: '/(modules)/fan-engagement',
  },
  {
    id: 'merchandise',
    title: 'Merch Store',
    icon: 'shopping',
    route: '/(modules)/merchandise',
  },
  { id: 'profile', title: 'My Profile', icon: 'account', route: '/(tabs)/profile' },
  {
    id: 'ai-ops-center',
    title: 'AI Ops Hub',
    icon: 'shield-crown',
    route: '/(modules)/ai-ops-center',
  },
  {
    id: 'smart-iot-center',
    title: 'IoT Center',
    icon: 'lightning-bolt',
    route: '/(modules)/smart-iot-center',
  },
  {
    id: 'executive-analytics',
    title: 'Exec Analytics',
    icon: 'chart-pie',
    route: '/(modules)/executive-analytics',
  },
  {
    id: 'smart-fan-experience',
    title: 'Fan XP',
    icon: 'star',
    route: '/(modules)/smart-fan-experience',
  },
  {
    id: 'admin-mode',
    title: 'Admin Demo',
    icon: 'security',
    route: '/(modules)/admin-mode',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'cog',
    route: '/(modules)/settings',
  },
  {
    id: 'help-center',
    title: 'Help Center',
    icon: 'help-circle',
    route: '/(modules)/help-center',
  },
];

const STATS = [
  { label: 'Visitors', value: '78,450', icon: 'account-multiple-outline' },
  { label: 'Tickets Sold', value: '98.5%', icon: 'ticket-outline' },
  { label: 'Revenue', value: '$12.4M', icon: 'currency-usd' },
  { label: 'Seats Occupied', value: '88%', icon: 'seat-outline' },
];

export default function HomeDashboard() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.heroSection}>
          <LinearGradient
            colors={['rgba(0, 200, 255, 0.3)', 'transparent']}
            style={styles.heroGradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
          <View style={styles.heroHeader}>
            <View>
              <Text style={[styles.greeting, { color: themeColors.icon }]}>Welcome back,</Text>
              <Text style={[styles.userName, { color: themeColors.text }]}>Alex Johnson</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/(modules)/notifications' as any)}
              style={[
                styles.iconButton,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}>
              <MaterialCommunityIcons name="bell-outline" size={24} color={themeColors.text} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/(modules)/global-search' as any)}
            activeOpacity={0.8}
            style={[
              styles.searchBar,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <MaterialCommunityIcons name="magnify" size={20} color={themeColors.icon} />
            <Text style={[styles.searchInput, { color: themeColors.icon }]}>
              Search matches, food, seating...
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Live Match Banner */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.bannerContainer}>
          <GlassCard gradientColors={themeColors.cardGradient1 as any}>
            <View style={styles.bannerHeader}>
              <View style={styles.liveBadge}>
                <Text style={styles.liveText}>LIVE</Text>
              </View>
              <Text style={styles.matchTimer}>68'</Text>
            </View>
            <View style={styles.teamsContainer}>
              <View style={styles.team}>
                <Text style={styles.teamName}>BRA</Text>
                <Text style={styles.teamScore}>2</Text>
              </View>
              <Text style={styles.vs}>VS</Text>
              <View style={styles.team}>
                <Text style={styles.teamScore}>1</Text>
                <Text style={styles.teamName}>ARG</Text>
              </View>
            </View>
            <View style={styles.possessionContainer}>
              <View style={styles.possessionLabels}>
                <Text style={styles.possessionText}>Possession: 58%</Text>
                <Text style={styles.possessionText}>42%</Text>
              </View>
              <View style={[styles.progressBarBg, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: '58%', backgroundColor: themeColors.tint },
                  ]}
                />
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Operations Command Center Banner */}
        <Animated.View entering={FadeInUp.delay(80)} style={styles.opsBannerContainer}>
          <TouchableOpacity
            onPress={() => router.push('/(modules)/ai-ops-center' as any)}
            activeOpacity={0.85}
            style={[styles.opsBanner, { borderColor: 'rgba(0,200,255,0.3)' }]}>
            <LinearGradient
              colors={['rgba(0,200,255,0.18)', 'rgba(124,77,255,0.18)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.opsBannerGrad}
            />
            <View style={styles.opsIconWrap}>
              <MaterialCommunityIcons name="shield-crown" size={28} color="#00C8FF" />
            </View>
            <View style={styles.opsTextWrap}>
              <Text style={styles.opsBannerTitle}>Operations Command Center</Text>
              <Text style={styles.opsBannerSub}>Phase 12 — AI Stadium Ops Hub</Text>
            </View>
            <MaterialCommunityIcons name="arrow-right" size={20} color="#00C8FF" />
          </TouchableOpacity>
        </Animated.View>

        {/* Stats Grid */}
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Stadium Statistics</Text>
        <View style={styles.statsGrid}>
          {STATS.map((stat, index) => {
            const gradients = [
              themeColors.cardGradient2,
              themeColors.cardGradient3,
              themeColors.cardGradient1,
              ['#00E676', '#009688'],
            ];
            return (
              <Animated.View
                key={stat.label}
                entering={FadeInUp.delay(150 + index * 50)}
                style={styles.statsCardContainer}>
                <GlassCard style={styles.statsCard} gradientColors={gradients[index % gradients.length] as any}>
                  <MaterialCommunityIcons
                    name={stat.icon as any}
                    size={24}
                    color="#fff"
                  />
                  <Text style={[styles.statsValue, { color: '#fff' }]}>{stat.value}</Text>
                  <Text style={[styles.statsLabel, { color: 'rgba(255,255,255,0.7)' }]}>{stat.label}</Text>
                </GlassCard>
              </Animated.View>
            );
          })}
        </View>

        {/* Quick Action Grid */}
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Quick Actions</Text>
        <View style={styles.grid}>
          {QUICK_ACTIONS.map((module, index) => (
            <Animated.View
              key={module.id}
              entering={FadeInDown.duration(400).delay(200 + index * 50)}
              style={styles.cardContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => router.push(module.route as any)}>
                <GlassCard style={styles.card} gradientColors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.01)']}>
                  <View style={styles.iconCircle}>
                    <MaterialCommunityIcons
                      name={module.icon as any}
                      size={28}
                      color={themeColors.tint}
                      style={styles.icon}
                    />
                  </View>
                  <Text style={[styles.cardTitle, { color: themeColors.text }]}>{module.title}</Text>
                </GlassCard>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 200, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.s,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.l,
    paddingBottom: 120,
  },
  heroSection: {
    marginBottom: Theme.spacing.l,
    position: 'relative',
    paddingTop: Theme.spacing.xl,
  },
  heroGradient: {
    position: 'absolute',
    left: -20,
    right: -20,
    top: -40,
    height: 200,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.l,
  },
  greeting: {
    fontSize: Theme.typography.sizes.m,
  },
  userName: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: '900',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.m,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    gap: Theme.spacing.s,
  },
  searchInput: {
    flex: 1,
    fontSize: Theme.typography.sizes.m,
  },
  bannerContainer: {
    marginBottom: Theme.spacing.xl,
  },
  liveBanner: {
    padding: Theme.spacing.l,
    borderWidth: 1,
    borderColor: 'rgba(0, 200, 255, 0.25)',
  },
  bannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  liveBadge: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveText: {
    color: '#FFF',
    fontSize: Theme.typography.sizes.s,
    fontWeight: '900',
  },
  matchTimer: {
    color: '#00C8FF',
    fontWeight: 'bold',
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Theme.spacing.xl,
    marginBottom: Theme.spacing.l,
  },
  team: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.m,
  },
  teamName: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: '900',
    color: '#FFF',
  },
  teamScore: {
    fontSize: Theme.typography.sizes.xxl,
    fontWeight: '900',
    color: '#FFF',
  },
  vs: {
    color: 'rgba(255,255,255,0.4)',
    fontWeight: 'bold',
  },
  possessionContainer: {
    gap: 8,
  },
  possessionLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  possessionText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: Theme.typography.sizes.s,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  opsBannerContainer: {
    marginBottom: Theme.spacing.l,
  },
  opsBanner: {
    borderRadius: Theme.shapes.borderRadius.l,
    borderWidth: 1,
    padding: Theme.spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    gap: Theme.spacing.m,
  },
  opsBannerGrad: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  opsIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,200,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opsTextWrap: { flex: 1 },
  opsBannerTitle: { color: '#FFF', fontSize: Theme.typography.sizes.m, fontWeight: '900' },
  opsBannerSub: { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 },
  sectionTitle: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: '900',
    marginBottom: Theme.spacing.m,
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Theme.spacing.m,
    marginBottom: Theme.spacing.xl,
  },
  statsCardContainer: {
    width: '47%',
  },
  statsCard: {
    padding: Theme.spacing.m,
    alignItems: 'center',
    gap: 6,
  },
  statsValue: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: '900',
  },
  statsLabel: {
    fontSize: Theme.typography.sizes.s,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Theme.spacing.m,
  },
  cardContainer: {
    width: '47%',
    aspectRatio: 1.1,
  },
  card: {
    borderRadius: Theme.shapes.borderRadius.xl,
    padding: Theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textShadowColor: 'rgba(0, 200, 255, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  cardTitle: {
    fontSize: Theme.typography.sizes.s,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
