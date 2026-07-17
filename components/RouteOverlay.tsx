import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Polyline, Defs, Filter, FeDropShadow } from 'react-native-svg';

interface RouteOverlayProps {
  path: { x: number; y: number }[];
  width: number;
  height: number;
}

export const RouteOverlay = ({ path, width, height }: RouteOverlayProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Simple interval for reliable SVG animation across Web/Native
    const interval = setInterval(() => {
      setOffset((prev) => (prev - 2) % 24);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const pointsString = path.map((coord) => `${coord.x},${coord.y}`).join(' ');

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Defs>
          <Filter id="glow">
            <FeDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00C8FF" floodOpacity="0.8" />
          </Filter>
        </Defs>

        {/* Outer Shadow Path */}
        <Polyline
          points={pointsString}
          fill="none"
          stroke="#00C8FF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.3}
          filter="url(#glow)"
        />

        {/* Solid Inner Core */}
        <Polyline
          points={pointsString}
          fill="none"
          stroke="#00C8FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Animated Moving Dots overlay */}
        <Polyline
          points={pointsString}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4,20"
          strokeDashoffset={offset}
        />
      </Svg>
    </View>
  );
};
