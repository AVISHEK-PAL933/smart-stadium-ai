import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useColorScheme } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

interface MarkerProps {
  x: number;
  y: number;
  icon: string;
  isPulsing?: boolean;
  color?: string;
}

export const Marker = ({ x, y, icon, isPulsing = false, color }: MarkerProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const markerColor = color || themeColors.tint;
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (isPulsing) {
      pulse.value = withRepeat(
        withSequence(withTiming(1.3, { duration: 600 }), withTiming(1.0, { duration: 600 })),
        -1,
        true
      );
    } else {
      pulse.value = withTiming(1.0, { duration: 200 });
    }
  }, [isPulsing, pulse]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulse.value }],
    };
  });

  return (
    <Animated.View style={[styles.markerContainer, { left: x - 18, top: y - 18 }, animatedStyle]}>
      {isPulsing && <View style={[styles.pulseRing, { borderColor: markerColor }]} />}
      <View style={[styles.dot, { backgroundColor: markerColor }]}>
        <MaterialCommunityIcons name={icon as any} size={16} color="#FFFFFF" />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    position: 'absolute',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pulseRing: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    opacity: 0.6,
  },
});
