import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

export const AIWelcomeCard = () => {
  const float = useSharedValue(0);

  React.useEffect(() => {
    float.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1500 }),
        withTiming(0, { duration: 1500 })
      ),
      -1,
      true
    );
  }, [float]);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }],
  }));

  return (
    <Animated.View entering={FadeInDown.duration(600)} style={styles.wrapper}>
      <GlassCard style={styles.card} gradientColors={['#16213E', '#16213E']}>
        <View style={styles.headerRow}>
          <View style={styles.avatarBox}>
            <MaterialCommunityIcons name="robot-outline" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>StadiumMind AI</Text>
            <Text style={styles.subtitle}>Hello!</Text>
          </View>
        </View>
        
        <Text style={styles.desc}>
          Your AI companion for navigation, tickets, food, parking and live match updates.
        </Text>

        <View style={styles.featureGrid}>
          <View style={styles.feature}><Text style={styles.featureText}>Navigation</Text></View>
          <View style={styles.feature}><Text style={styles.featureText}>Tickets</Text></View>
          <View style={styles.feature}><Text style={styles.featureText}>Live Match</Text></View>
          <View style={styles.feature}><Text style={styles.featureText}>Support</Text></View>
        </View>
      </GlassCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    alignItems: 'center',
    width: '100%',
  },
  card: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    width: '100%',
    maxWidth: 600,
    height: 180,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  avatarBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 14,
    color: '#CBD5E1',
    fontFamily: 'Inter',
  },
  desc: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
    marginBottom: 12,
    marginTop: 12,
    fontFamily: 'Inter',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  feature: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
});
