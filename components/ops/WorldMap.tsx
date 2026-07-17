import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence } from 'react-native-reanimated';

const MapMarker = ({ top, left, label, count, color }: { top: string, left: string, label: string, count: string, color: string }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value === 1.5 ? 0.5 : 1,
  }));

  return (
    <View style={[styles.markerContainer, { top: top as any, left: left as any }]}>
      <Animated.View style={[styles.markerGlow, { backgroundColor: color }, animatedStyle]} />
      <View style={[styles.markerDot, { backgroundColor: color }]} />
      <View style={styles.markerLabel}>
        <Text style={styles.countryName}>{label}</Text>
        <Text style={styles.visitorCount}>{count}</Text>
      </View>
    </View>
  );
};

export const WorldMap = () => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="earth" size={24} color="#00e5ff" />
        <Text style={styles.title}>Global Visitors</Text>
      </View>
      <View style={styles.mapArea}>
        {/* Abstract Map Representation */}
        <View style={styles.abstractMap}>
          <View style={styles.gridLineHorizontal} />
          <View style={styles.gridLineHorizontal2} />
          <View style={styles.gridLineVertical} />
          <View style={styles.gridLineVertical2} />
        </View>
        
        <MapMarker top="30%" left="20%" label="USA" count="15.2k" color="#2979ff" />
        <MapMarker top="45%" left="45%" label="UK" count="8.4k" color="#00e676" />
        <MapMarker top="60%" left="70%" label="Brazil" count="12.1k" color="#ffd600" />
        <MapMarker top="35%" left="80%" label="Japan" count="5.3k" color="#ff1744" />
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(5, 10, 25, 0.8)',
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
  mapArea: {
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: Theme.shapes.borderRadius.m,
    position: 'relative',
    overflow: 'hidden',
  },
  abstractMap: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLineHorizontal: {
    position: 'absolute',
    top: '33%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  gridLineHorizontal2: {
    position: 'absolute',
    top: '66%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  gridLineVertical: {
    position: 'absolute',
    left: '33%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  gridLineVertical2: {
    position: 'absolute',
    left: '66%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  markerGlow: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  markerLabel: {
    position: 'absolute',
    top: 40,
    alignItems: 'center',
    width: 80,
  },
  countryName: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  visitorCount: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 9,
  },
});
