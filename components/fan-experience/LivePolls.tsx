import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const PollBar = ({ label, votes, total }: { label: string, votes: number, total: number }) => {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming((votes / total) * 100, { duration: 1000 });
  }, [votes, total]);

  const animatedStyle = useAnimatedStyle(() => ({ width: `${width.value}%` }));

  return (
    <View style={styles.pollBarContainer}>
      <View style={styles.pollHeader}>
        <Text style={styles.pollLabel}>{label}</Text>
        <Text style={styles.pollVotes}>{votes}%</Text>
      </View>
      <View style={styles.pollTrack}>
        <Animated.View style={[styles.pollFill, animatedStyle]} />
      </View>
    </View>
  );
};

export const LivePolls = ({ polls }: { polls: any[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="podium" size={24} color="#00e5ff" />
        <Text style={styles.title}>Live Polls</Text>
      </View>
      <View style={styles.content}>
        {polls.map((poll, idx) => {
          const total = poll.options.reduce((sum: number, o: any) => sum + o.votes, 0);
          return (
            <View key={idx} style={styles.pollCard}>
              <Text style={styles.question}>{poll.question}</Text>
              {poll.options.map((opt: any, i: number) => (
                <PollBar key={i} label={opt.label} votes={opt.votes} total={total} />
              ))}
            </View>
          );
        })}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(5, 15, 25, 0.7)',
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
  pollCard: {
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: Theme.shapes.borderRadius.m,
  },
  question: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.m,
  },
  pollBarContainer: {
    marginBottom: Theme.spacing.m,
  },
  pollHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  pollLabel: {
    color: '#fff',
    fontSize: 14,
  },
  pollVotes: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  pollTrack: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  pollFill: {
    height: '100%',
    backgroundColor: '#00e5ff',
    borderRadius: 4,
  },
});
