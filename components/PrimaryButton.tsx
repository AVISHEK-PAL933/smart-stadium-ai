import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useGlobalContext } from '../context/GlobalProvider';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const PrimaryButton = ({ title, onPress, style }: PrimaryButtonProps) => {
  const scale = useSharedValue(1);
  const { theme } = useGlobalContext();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedTouchable
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
      style={[styles.button, style, animatedStyle]}
      activeOpacity={0.8}>
      <LinearGradient
        colors={[
          Colors[theme].gradientStart || Colors[theme].tint,
          Colors[theme].gradientEnd || Colors[theme].tint,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Theme.shapes.borderRadius.m,
    overflow: 'hidden',
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gradient: {
    paddingVertical: Theme.spacing.m,
    paddingHorizontal: Theme.spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: Theme.typography.sizes.m,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
