import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeIn, useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { GlassCard } from './GlassCard';

export const AIHeader = () => {
  const pulse = useSharedValue(1);

  React.useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, [pulse]);

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: pulse.value === 1.2 ? 0.6 : 1,
  }));

  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>
      
      <View style={styles.centerSection}>
        <View style={styles.avatarGlow}>
          <MaterialCommunityIcons name="robot-outline" size={24} color="#00C8FF" />
        </View>
        <View style={styles.titleCol}>
          <Text style={styles.title}>StadiumMind AI</Text>
          <View style={styles.statusRow}>
            <Animated.View style={[styles.statusDot, dotStyle]} />
            <Text style={styles.statusText}>Online • Voice Ready</Text>
          </View>
        </View>
      </View>

      <View style={styles.rightActions}>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialCommunityIcons name="bell-outline" size={22} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialCommunityIcons name="cog-outline" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'rgba(8,18,35,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,200,255,0.2)',
  },
  backBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarGlow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,200,255,0.1)',
    borderWidth: 1,
    borderColor: '#00C8FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00C8FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  titleCol: { gap: 2 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00E676',
  },
  statusText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  rightActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBtn: {
    padding: 8,
  },
});
