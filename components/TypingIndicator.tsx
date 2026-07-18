import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/colors';
import { useGlobalContext } from '../context/GlobalProvider';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  FadeInLeft,
  SharedValue,
} from 'react-native-reanimated';
import { GlassCard } from './GlassCard';

export const TypingIndicator = () => {
  const { theme, themeColors } = useGlobalContext();

  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    const animateDot = (dot: SharedValue<number>, delay: number) => {
      dot.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 400 }),
            withTiming(0, { duration: 400 }),
            withTiming(0, { duration: 400 })
          ),
          -1,
          true
        )
      );
    };

    animateDot(dot1, 0);
    animateDot(dot2, 200);
    animateDot(dot3, 400);
  }, [dot1, dot2, dot3]);

  const getAnimatedStyle = (dot: SharedValue<number>) => {
    return useAnimatedStyle(() => ({
      transform: [{ translateY: -10 * dot.value }],
      opacity: 0.3 + dot.value * 0.7,
      backgroundColor: dot.value > 0.5 ? '#00C8FF' : '#7C4DFF',
    }));
  };

  return (
    <Animated.View entering={FadeInLeft.duration(300)}>
      <GlassCard style={styles.container} gradientColors={['rgba(15,23,42,0.95)', 'rgba(8,18,35,0.9)']}>
        <View style={styles.thinkingBox}>
          <Text style={styles.thinkingText}>AI Thinking</Text>
          <View style={styles.dotsWrapper}>
            <Animated.View style={[styles.dot, getAnimatedStyle(dot1)]} />
            <Animated.View style={[styles.dot, getAnimatedStyle(dot2)]} />
            <Animated.View style={[styles.dot, getAnimatedStyle(dot3)]} />
          </View>
        </View>
      </GlassCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderBottomLeftRadius: 4,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    marginVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(124,77,255,0.3)',
  },
  thinkingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thinkingText: {
    color: '#00C8FF',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dotsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
