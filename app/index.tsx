import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { useColorScheme } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];
  const { isLoading, role } = useGlobalContext();

  useEffect(() => {
    if (!isLoading) {
      if (role) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    }
  }, [isLoading, role]);

  return (
    <LinearGradient
      colors={[themeColors.background, theme === 'dark' ? '#0F172A' : '#E2E8F0']}
      style={styles.container}>
      <Animated.View entering={FadeIn.duration(1000)} exiting={FadeOut}>
        <MaterialCommunityIcons
          name="soccer"
          size={80}
          color={themeColors.tint}
          style={styles.icon}
        />
      </Animated.View>
      <Animated.View entering={SlideInDown.duration(800).delay(200)}>
        <Text style={[styles.title, { color: themeColors.text }]}>StadiumMind AI</Text>
      </Animated.View>
      <Animated.View entering={SlideInDown.duration(800).delay(400)}>
        <Text style={[styles.subtitle, { color: themeColors.icon }]}>FIFA World Cup 2026™</Text>
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
    textShadowRadius: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
});
