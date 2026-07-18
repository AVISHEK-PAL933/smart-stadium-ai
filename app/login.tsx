import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, withRepeat, withSequence, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { setRole } = useGlobalContext();
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    );
  }, [pulse]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    shadowColor: '#00C8FF',
    shadowOpacity: pulse.value === 1.05 ? 0.6 : 0.2,
    shadowRadius: pulse.value === 1.05 ? 20 : 10,
    shadowOffset: { width: 0, height: 0 },
  }));

  const handleGuestEntry = () => {
    setRole('guest');
    router.replace('/(tabs)');
  };

  const handleUserLogin = () => {
    setRole('user');
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#081223', '#0A0F1E', '#16213E']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={styles.content}>
        <Animated.View entering={FadeInUp.duration(1000)} style={styles.header}>
          <Animated.View style={[styles.iconWrapper, logoAnimatedStyle]}>
            <MaterialCommunityIcons name="stadium" size={60} color="#00C8FF" />
          </Animated.View>
          <Text style={styles.brandTitle}>StadiumMind AI</Text>
          <Text style={styles.brandSubtitle}>FIFA World Cup 2026™</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(1000).delay(300)}>
          <View style={styles.glassCard}>
            <Text style={styles.welcomeTitle}>Welcome to the Future</Text>
            <Text style={styles.welcomeText}>
              Sign in to access your digital tickets, order food, and get personalized AI-guided stadium navigation.
            </Text>

            <View style={styles.actionContainer}>
              <TouchableOpacity activeOpacity={0.8} onPress={handleUserLogin}>
                <LinearGradient
                  colors={['#00C8FF', '#0072FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <MaterialCommunityIcons name="account-circle" size={22} color="#FFF" />
                  <Text style={styles.primaryButtonText}>Login with FIFA ID</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.7} onPress={handleGuestEntry}>
                <MaterialCommunityIcons name="account-guest" size={22} color="#00C8FF" />
                <Text style={styles.secondaryButtonText}>Continue as Guest</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081223',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0,200,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1,
    marginBottom: 8,
  },
  brandSubtitle: {
    fontSize: 14,
    color: '#00C8FF',
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '600',
  },
  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    backdropFilter: 'blur(10px)',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 15,
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  actionContainer: {
    gap: 16,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.3)',
    backgroundColor: 'rgba(0,200,255,0.05)',
    gap: 10,
  },
  secondaryButtonText: {
    color: '#00C8FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
