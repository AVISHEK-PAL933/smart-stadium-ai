import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface Prediction {
  label: string;
  probability: number;
  time: string;
}

const ProgressBar = ({ probability }: { probability: number }) => {
  const width = useSharedValue(0);

  React.useEffect(() => {
    width.value = withTiming(probability, { duration: 1500 });
  }, [probability]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  const getColor = (prob: number) => {
    if (prob > 80) return Colors.dark.danger;
    if (prob > 50) return Colors.dark.warning;
    return Colors.dark.success;
  };

  return (
    <View style={styles.progressTrack}>
      <Animated.View style={[styles.progressFill, { backgroundColor: getColor(probability) }, animatedStyle]} />
    </View>
  );
};

export const PredictiveAnalytics = ({ predictions }: { predictions: Prediction[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="analytics" size={24} color="#00e5ff" />
        <Text style={styles.title}>Predictive Analytics</Text>
      </View>
      <View style={styles.content}>
        {predictions.map((pred, idx) => (
          <View key={idx} style={styles.predictionRow}>
            <View style={styles.predHeader}>
              <Text style={styles.predLabel}>{pred.label}</Text>
              <View style={styles.predStats}>
                <Text style={styles.predTime}>{pred.time}</Text>
                <Text style={styles.predProb}>{pred.probability}%</Text>
              </View>
            </View>
            <ProgressBar probability={pred.probability} />
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
    backgroundColor: 'rgba(15, 20, 40, 0.7)',
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
  predictionRow: {
    marginBottom: Theme.spacing.s,
  },
  predHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  predLabel: {
    color: '#fff',
    fontSize: 14,
  },
  predStats: {
    flexDirection: 'row',
    gap: 8,
  },
  predTime: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  predProb: {
    color: '#00e5ff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
