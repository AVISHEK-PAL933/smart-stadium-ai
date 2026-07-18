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
        <Animated.View style={[styles.avatarBox, floatStyle]}>
          <MaterialCommunityIcons name="robot-outline" size={48} color="#00C8FF" />
          <View style={styles.glow} />
        </Animated.View>
        
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.subtitle}>I'm StadiumMind AI.</Text>
        <Text style={styles.desc}>
          Your premium FIFA World Cup 2026 companion. I can help you with finding your seat, food recommendations, live match insights, and emergency navigation.
        </Text>

        <View style={styles.featureGrid}>
          <View style={styles.feature}><MaterialCommunityIcons name="check-circle" size={16} color="#00E676" /><Text style={styles.featureText}>Navigation</Text></View>
          <View style={styles.feature}><MaterialCommunityIcons name="check-circle" size={16} color="#00E676" /><Text style={styles.featureText}>Live Insights</Text></View>
          <View style={styles.feature}><MaterialCommunityIcons name="check-circle" size={16} color="#00E676" /><Text style={styles.featureText}>Food & Merch</Text></View>
          <View style={styles.feature}><MaterialCommunityIcons name="check-circle" size={16} color="#00E676" /><Text style={styles.featureText}>Support</Text></View>
        </View>
      </GlassCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    paddingTop: 32,
    alignItems: 'center',
    width: '100%',
  },
  card: {
    padding: 32,
    alignItems: 'center',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(124,77,255,0.3)',
    width: '100%',
    maxWidth: 600,
  },
  avatarBox: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(15,23,42,0.8)',
    borderWidth: 2,
    borderColor: '#00C8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#00C8FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  glow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0,200,255,0.2)',
    zIndex: -1,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00C8FF',
    marginBottom: 16,
  },
  desc: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },
  featureText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
