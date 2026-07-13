import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

const Dot = ({ index }: { index: number }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      index * 150,
      withRepeat(
        withSequence(withTiming(-8, { duration: 300 }), withTiming(0, { duration: 300 })),
        -1,
        false
      )
    );
  }, [translateY, index]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.dot, { backgroundColor: themeColors.tint }, animatedStyle]} />
  );
};

export const TypingIndicator = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.card, borderColor: themeColors.border },
      ]}>
      <Dot index={0} />
      <Dot index={1} />
      <Dot index={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: Theme.spacing.m,
    paddingVertical: Theme.spacing.s + 2,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    marginVertical: Theme.spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
