import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { Colors } from '../constants/colors';
import { useColorScheme } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { MapCoordinate } from '../services/navigationService';

interface RouteOverlayProps {
  path: MapCoordinate[];
  width: number;
  height: number;
}

export const RouteOverlay = ({ path, width, height }: RouteOverlayProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const strokeDashoffset = useSharedValue(0);

  useEffect(() => {
    strokeDashoffset.value = withRepeat(
      withSequence(withTiming(40, { duration: 1500 }), withTiming(0, { duration: 0 })),
      -1,
      false
    );
  }, [path, strokeDashoffset]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.85,
    };
  });

  const pointsString = path.map((coord) => `${coord.x},${coord.y}`).join(' ');

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          {/* Base shadow path */}
          <Polyline
            points={pointsString}
            fill="none"
            stroke={themeColors.tint}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.3}
          />
          {/* Animated dashes path */}
          <Polyline
            points={pointsString}
            fill="none"
            stroke={themeColors.tint}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="12,12"
            strokeDashoffset={strokeDashoffset.value as any}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};
