import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedProps, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const AISustainabilityScore = ({ score }: { score: number }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(score, { duration: 2000 });
  }, [score]);

  const radius = 60;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference - (circumference * progress.value) / 100,
  }));

  const getColor = (val: number) => {
    if (val >= 80) return Colors.dark.success;
    if (val >= 50) return Colors.dark.warning;
    return Colors.dark.danger;
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="leaf" size={24} color="#00e676" />
        <Text style={styles.title}>AI Sustainability Score</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.gaugeContainer}>
          <Svg width={150} height={150} viewBox="0 0 150 150">
            <Circle
              cx={75}
              cy={75}
              r={radius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <AnimatedCircle
              cx={75}
              cy={75}
              r={radius}
              stroke={getColor(score)}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              animatedProps={animatedProps}
              strokeLinecap="round"
              rotation="-90"
              origin="75, 75"
            />
          </Svg>
          <View style={styles.scoreTextContainer}>
            <Text style={styles.scoreValue}>{score}</Text>
            <Text style={styles.scoreLabel}>/ 100</Text>
          </View>
        </View>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(5, 30, 20, 0.7)',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
    alignSelf: 'flex-start',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: Theme.spacing.s,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.m,
  },
  gaugeContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  scoreLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
});
