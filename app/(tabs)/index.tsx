import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, useWindowDimensions, Platform, Image } from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../../components/GlassCard';
import { AnimatedBackground } from '../../components/AnimatedBackground';
import { useGlobalContext } from '../../context/GlobalProvider';

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
  { id: 'live-match', title: 'Live Match', icon: 'soccer', route: '/(modules)/live-match' },
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
  {
    id: 'smart-fan-experience',
    title: 'Fan XP',
    icon: 'star',
    route: '/(modules)/smart-fan-experience',
  },
  {
    id: 'translation',
    title: 'Translation',
    icon: 'translate',
    route: '/(modules)/translation',
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    icon: 'wheelchair-accessibility',
    route: '/(modules)/accessibility',
  },
  { id: 'emergency', title: 'Emergency', icon: 'alert-circle', route: '/(modules)/emergency' },
];

export default function HomeDashboard() {
  const { theme, themeColors } = useGlobalContext();

  const { width } = useWindowDimensions();
  
  // Responsive calculations
  const maxContentWidth = 1200;
  const paddingHorizontal = 16;
  const contentWidth = Math.min(width - paddingHorizontal * 2, maxContentWidth);
  
  const cols = width >= 1024 ? 4 : width >= 768 ? 3 : 2;
  const gap = 16;
  const cardWidth = (contentWidth - (cols - 1) * gap) / cols;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <LinearGradient
        colors={[themeColors.gradientStart, themeColors.gradientEnd]}
        style={StyleSheet.absoluteFillObject}
      />
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce8058?q=80&w=2000&auto=format&fit=crop' }}
        style={[StyleSheet.absoluteFillObject, { opacity: 0.08 }]}
        resizeMode="cover"
      />
      <AnimatedBackground />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.contentWrapper, { maxWidth: maxContentWidth }]}>
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
              <Text style={[styles.greeting, { color: themeColors.text, fontWeight: '900', fontSize: Theme.typography.sizes.xl }]}>Smart Stadium AI</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: Theme.spacing.m }}>
              <TouchableOpacity
                onPress={() => router.push('/(tabs)/profile' as any)}
                style={[
                  styles.iconButton,
                  { backgroundColor: themeColors.card, borderColor: themeColors.border },
                ]}>
                <MaterialCommunityIcons name="account" size={24} color={themeColors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/(modules)/help-center' as any)}
                style={[
                  styles.iconButton,
                  { backgroundColor: themeColors.card, borderColor: themeColors.border },
                ]}>
                <MaterialCommunityIcons name="help-circle-outline" size={24} color={themeColors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/(modules)/settings' as any)}
                style={[
                  styles.iconButton,
                  { backgroundColor: themeColors.card, borderColor: themeColors.border },
                ]}>
                <MaterialCommunityIcons name="cog" size={24} color={themeColors.text} />
              </TouchableOpacity>
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



        {/* Fan Welcome Banner */}
        <Animated.View entering={FadeInUp.delay(80)} style={styles.opsBannerContainer}>
          <View style={[styles.opsBanner, { borderColor: themeColors.border, backgroundColor: themeColors.card }]}>
            <LinearGradient
              colors={[themeColors.tint + '10', themeColors.tint + '05']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.opsBannerGrad}
            />
            <View style={styles.opsIconWrap}>
              <MaterialCommunityIcons name="soccer" size={28} color={themeColors.tint} />
            </View>
            <View style={styles.opsTextWrap}>
              <Text style={[styles.opsBannerTitle, { color: themeColors.text }]}>Welcome to FIFA World Cup 2026</Text>
              <Text style={styles.opsBannerSub}>Your AI-powered stadium companion</Text>
            </View>
          </View>
        </Animated.View>

        {/* Quick Action Grid */}
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Quick Actions</Text>
        <View style={styles.grid}>
          {QUICK_ACTIONS.map((module, index) => (
              <Animated.View
                key={module.id}
                entering={FadeInDown.duration(400).delay(100 + index * 20)}
                style={{ width: cardWidth, marginBottom: gap }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.cardTouchable}
                  onPress={() => router.push(module.route as any)}>
                  <LinearGradient
                    colors={[themeColors.card, themeColors.card]}
                    style={[styles.actionCard, { borderColor: themeColors.border }]}
                  >
                    <View style={[styles.neonIconCircle, { backgroundColor: themeColors.tint + '10', borderColor: themeColors.tint }]}>
                      <MaterialCommunityIcons
                        name={module.icon as any}
                        size={32}
                        color={themeColors.tint}
                        style={styles.neonIcon}
                      />
                    </View>
                    <Text style={[styles.actionCardTitle, { color: themeColors.text }]} numberOfLines={1}>
                      {module.title}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  actionCard: {
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  neonIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  neonIcon: {
  },
  actionCardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: Theme.spacing.l,
    paddingBottom: 80,
    alignItems: 'center',
  },
  contentWrapper: {
    width: '100%',
    alignSelf: 'center',
    gap: 24,
  },
  heroSection: {
    position: 'relative',
    paddingTop: Theme.spacing.m,
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
  opsBannerContainer: {
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
  opsBannerTitle: { fontSize: Theme.typography.sizes.m, fontWeight: '900' },
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
    gap: 16,
  },
  statsCardContainer: {
    width: '47%',
  },
  statsIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
    gap: 16, // Enforces 16px gap
  },
  cardTouchable: {
    flex: 1,
  },
});
