import React, { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export const AnimatedBackground = () => {
  const { width, height } = useWindowDimensions();
  
  // Shared values for orb positions and scales
  const orb1X = useSharedValue(0);
  const orb1Y = useSharedValue(0);
  const orb1Scale = useSharedValue(1);

  const orb2X = useSharedValue(width * 0.8);
  const orb2Y = useSharedValue(height * 0.5);
  const orb2Scale = useSharedValue(1.2);

  const orb3X = useSharedValue(width * 0.2);
  const orb3Y = useSharedValue(height * 0.8);
  const orb3Scale = useSharedValue(0.8);

  useEffect(() => {
    // Orb 1 animation
    orb1X.value = withRepeat(
      withSequence(
        withTiming(width * 0.5, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 15000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    orb1Y.value = withRepeat(
      withSequence(
        withTiming(height * 0.3, { duration: 15000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 12000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    orb1Scale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 8000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Orb 2 animation
    orb2X.value = withRepeat(
      withSequence(
        withTiming(width * 0.2, { duration: 18000, easing: Easing.inOut(Easing.ease) }),
        withTiming(width * 0.8, { duration: 16000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    orb2Y.value = withRepeat(
      withSequence(
        withTiming(height * 0.1, { duration: 16000, easing: Easing.inOut(Easing.ease) }),
        withTiming(height * 0.5, { duration: 18000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    orb2Scale.value = withRepeat(
      withSequence(
        withTiming(0.9, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.2, { duration: 10000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Orb 3 animation
    orb3X.value = withRepeat(
      withSequence(
        withTiming(width * 0.9, { duration: 20000, easing: Easing.inOut(Easing.ease) }),
        withTiming(width * 0.2, { duration: 19000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    orb3Y.value = withRepeat(
      withSequence(
        withTiming(height * 0.4, { duration: 19000, easing: Easing.inOut(Easing.ease) }),
        withTiming(height * 0.8, { duration: 20000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    orb3Scale.value = withRepeat(
      withSequence(
        withTiming(1.4, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.8, { duration: 12000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, [width, height, orb1X, orb1Y, orb1Scale, orb2X, orb2Y, orb2Scale, orb3X, orb3Y, orb3Scale]);

  const style1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: orb1X.value },
      { translateY: orb1Y.value },
      { scale: orb1Scale.value },
    ],
  }));

  const style2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: orb2X.value },
      { translateY: orb2Y.value },
      { scale: orb2Scale.value },
    ],
  }));

  const style3 = useAnimatedStyle(() => ({
    transform: [
      { translateX: orb3X.value },
      { translateY: orb3Y.value },
      { scale: orb3Scale.value },
    ],
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View style={[styles.orb, styles.orb1, style1]}>
        <LinearGradient
          colors={['rgba(0, 200, 255, 0.15)', 'transparent']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      <Animated.View style={[styles.orb, styles.orb2, style2]}>
        <LinearGradient
          colors={['rgba(124, 77, 255, 0.12)', 'transparent']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      <Animated.View style={[styles.orb, styles.orb3, style3]}>
        <LinearGradient
          colors={['rgba(0, 230, 118, 0.08)', 'transparent']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    borderRadius: 9999,
  },
  orb1: {
    width: 300,
    height: 300,
    top: -50,
    left: -50,
    backgroundColor: 'rgba(0, 200, 255, 0.05)',
  },
  orb2: {
    width: 400,
    height: 400,
    top: 100,
    right: -100,
    backgroundColor: 'rgba(124, 77, 255, 0.05)',
  },
  orb3: {
    width: 350,
    height: 350,
    bottom: -50,
    left: 50,
    backgroundColor: 'rgba(0, 230, 118, 0.05)',
  },
});
