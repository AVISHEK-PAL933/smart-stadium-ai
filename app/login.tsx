import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { useColorScheme } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import { router } from 'expo-router';
import { PrimaryButton } from '../components/PrimaryButton';
import { GlassCard } from '../components/GlassCard';
import { Theme } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];
  const { setRole } = useGlobalContext();

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
        colors={[themeColors.background, themeColors.card]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <Animated.View entering={FadeInUp.duration(800).delay(200)} style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="shield-check"
            size={64}
            color={themeColors.tint}
            style={styles.icon}
          />
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(800).delay(400)}>
          <GlassCard style={styles.card}>
            <Text style={[styles.title, { color: themeColors.text }]}>
              Welcome to StadiumMind AI
            </Text>
            <Text style={[styles.subtitle, { color: themeColors.icon }]}>
              Your ultimate companion for the FIFA World Cup 2026.
            </Text>

            <View style={styles.buttonContainer}>
              <PrimaryButton
                title="Login with FIFA ID"
                onPress={handleUserLogin}
                style={styles.button}
              />
              <PrimaryButton
                title="Continue as Guest"
                onPress={handleGuestEntry}
                style={[
                  styles.button,
                  {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: themeColors.border,
                  },
                ]}
              />
            </View>
          </GlassCard>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: Theme.spacing.l,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xxl,
  },
  icon: {
    textShadowColor: 'rgba(0, 229, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  card: {
    padding: Theme.spacing.xl,
  },
  title: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: '900',
    marginBottom: Theme.spacing.m,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Theme.typography.sizes.m,
    textAlign: 'center',
    marginBottom: Theme.spacing.xxl,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: Theme.spacing.m,
  },
  button: {
    width: '100%',
  },
});
