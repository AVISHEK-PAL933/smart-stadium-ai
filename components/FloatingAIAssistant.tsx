import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const FloatingAIAssistant = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  const scale = useSharedValue(1);
  const glow = useSharedValue(0.5);

  React.useEffect(() => {
    glow.value = withRepeat(
      withSequence(withTiming(1, { duration: 1500 }), withTiming(0.5, { duration: 1500 })),
      -1,
      true
    );
  }, [glow]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      shadowOpacity: glow.value,
    };
  });

  return (
    <AnimatedTouchable
      activeOpacity={0.9}
      onPressIn={() => (scale.value = withSpring(0.9))}
      onPressOut={() => (scale.value = withSpring(1))}
      style={[styles.container, { shadowColor: Colors[theme].tint }, animatedStyle]}>
      <LinearGradient
        colors={[
          Colors[theme].gradientStart || Colors[theme].tint,
          Colors[theme].gradientEnd || Colors[theme].tint,
        ]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <MaterialIcons name="smart-toy" size={28} color="#FFFFFF" />
      </LinearGradient>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Theme.spacing.xl,
    right: Theme.spacing.l,
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
    zIndex: 999,
  },
  gradient: {
    flex: 1,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
