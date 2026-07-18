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
      <GlassCard style={styles.card} gradientColors={['rgba(124,77,255,0.15)', 'rgba(0,200,255,0.05)']}>
        <View style={styles.headerRow}>
          <Animated.View style={[styles.avatarBox, floatStyle]}>
            <MaterialCommunityIcons name="robot-outline" size={28} color="#00C8FF" />
            <View style={styles.glow} />
          </Animated.View>
          <View style={styles.headerText}>
            <Text style={styles.title}>StadiumMind AI</Text>
            <Text style={styles.subtitle}>Hello!</Text>
          </View>
        </View>
        
        <Text style={styles.desc}>
          I can help with tickets, food, navigation and live match information.
        </Text>

        <View style={styles.featureGrid}>
          <View style={styles.feature}><MaterialCommunityIcons name="check-circle" size={14} color="#00E676" /><Text style={styles.featureText}>Navigation</Text></View>
          <View style={styles.feature}><MaterialCommunityIcons name="check-circle" size={14} color="#00E676" /><Text style={styles.featureText}>Live Insights</Text></View>
          <View style={styles.feature}><MaterialCommunityIcons name="check-circle" size={14} color="#00E676" /><Text style={styles.featureText}>Food & Merch</Text></View>
          <View style={styles.feature}><MaterialCommunityIcons name="check-circle" size={14} color="#00E676" /><Text style={styles.featureText}>Support</Text></View>
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
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(124,77,255,0.3)',
    width: '100%',
    maxWidth: 600,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  avatarBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(15,23,42,0.8)',
    borderWidth: 2,
    borderColor: '#00C8FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00C8FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  glow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,200,255,0.2)',
    zIndex: -1,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00C8FF',
  },
  desc: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 22,
    marginBottom: 16,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
