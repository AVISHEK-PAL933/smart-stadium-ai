import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGlobalContext } from '../context/GlobalProvider';

export default function WelcomeScreen() {
  const { setRole } = useGlobalContext();

  const handleGuestEntry = () => {
    setRole('guest');
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
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name="stadium" size={60} color="#00C8FF" />
          </View>
          <Text style={styles.brandTitle}>StadiumMind AI</Text>
          <Text style={styles.brandSubtitle}>FIFA World Cup 2026™</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(1000).delay(300)}>
          <View style={styles.glassCard}>
            <Text style={styles.welcomeTitle}>Welcome to the Future</Text>
            <Text style={styles.welcomeText}>
              Access digital tickets, order food, navigate the stadium with AI, and experience seamless operations.
            </Text>

            <View style={styles.actionContainer}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/login')}>
                <LinearGradient
                  colors={['#00C8FF', '#0072FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <MaterialCommunityIcons name="login" size={22} color="#FFF" />
                  <Text style={styles.primaryButtonText}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.7} onPress={() => router.push('/signup')}>
                <MaterialCommunityIcons name="account-plus" size={22} color="#00C8FF" />
                <Text style={styles.secondaryButtonText}>Create Account</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.ghostButton} activeOpacity={0.7} onPress={handleGuestEntry}>
                <Text style={styles.ghostButtonText}>Continue as Guest</Text>
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
  ghostButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8
  },
  ghostButtonText: {
    color: '#8A99AF',
    fontSize: 14,
    fontWeight: '600',
  }
});
