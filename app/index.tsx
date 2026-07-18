import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeOut, SlideInDown, useSharedValue, withRepeat, withTiming, useAnimatedStyle, withSequence } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const { themeColors, isLoading, user, role } = useGlobalContext();
  const spin = useSharedValue(0);

  useEffect(() => {
    spin.value = withRepeat(
      withTiming(360, { duration: 2000 }),
      -1,
      false
    );
  }, []);

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spin.value}deg` }]
  }));

  useEffect(() => {
    if (!isLoading) {
      if (user && role) {
        if (role === 'ops') {
          router.replace('/(ops)');
        } else {
          router.replace('/(tabs)');
        }
      } else {
        router.replace('/welcome');
      }
    }
  }, [isLoading, user, role]);

  return (
    <LinearGradient
      colors={['#081223', '#0A0F1E', '#16213E']}
      style={styles.container}>
      <Animated.View entering={FadeIn.duration(1000)} exiting={FadeOut}>
        <MaterialCommunityIcons
          name="soccer"
          size={100}
          color="#00C8FF"
          style={styles.icon}
        />
      </Animated.View>
      <Animated.View entering={SlideInDown.duration(800).delay(200)}>
        <Text style={styles.title}>StadiumMind AI</Text>
      </Animated.View>
      <Animated.View entering={SlideInDown.duration(800).delay(400)}>
        <Text style={styles.subtitle}>FIFA World Cup 2026™</Text>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(800)} style={styles.loadingContainer}>
        <Animated.View style={spinnerStyle}>
          <MaterialCommunityIcons name="loading" size={32} color="#00C8FF" />
        </Animated.View>
        <Text style={styles.loadingText}>Initializing systems...</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 24,
    textShadowColor: 'rgba(0, 229, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 2,
    color: '#FFFFFF'
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: '#00C8FF'
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    gap: 12
  },
  loadingText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    letterSpacing: 1
  }
});
