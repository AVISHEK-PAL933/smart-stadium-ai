import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const ProgressBar = ({ progress, total }: { progress: number, total: number }) => {
  const width = useSharedValue(0);

  React.useEffect(() => {
    width.value = withTiming((progress / total) * 100, { duration: 1000 });
  }, [progress, total]);

  const animatedStyle = useAnimatedStyle(() => ({ width: `${width.value}%` }));

  return (
    <View style={styles.progressTrack}>
      <Animated.View style={[styles.progressFill, animatedStyle]} />
    </View>
  );
};

export const FanChallenges = ({ challenges }: { challenges: any[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="game-controller" size={24} color="#00e676" />
        <Text style={styles.title}>Daily Challenges</Text>
      </View>
      <View style={styles.content}>
        {challenges.map((challenge, idx) => (
          <View key={idx} style={styles.challengeRow}>
            <View style={styles.chInfo}>
              <Text style={styles.chTitle}>{challenge.title}</Text>
              <View style={styles.chMeta}>
                <Text style={styles.chProgress}>{challenge.progress}/{challenge.total}</Text>
                <Text style={styles.chReward}>+{challenge.reward} pts</Text>
              </View>
              <ProgressBar progress={challenge.progress} total={challenge.total} />
            </View>
            <View style={styles.chCheck}>
              {challenge.progress >= challenge.total ? (
                <Ionicons name="checkmark-circle" size={24} color="#00e676" />
              ) : (
                <Ionicons name="ellipse-outline" size={24} color="rgba(255,255,255,0.2)" />
              )}
            </View>
          </View>
        ))}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(5, 20, 15, 0.7)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: Theme.spacing.s,
  },
  content: {
    gap: Theme.spacing.m,
  },
  challengeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chInfo: {
    flex: 1,
    marginRight: Theme.spacing.m,
  },
  chTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  chMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 6,
  },
  chProgress: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  chReward: {
    color: '#ffd600',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00e676',
    borderRadius: 3,
  },
  chCheck: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
