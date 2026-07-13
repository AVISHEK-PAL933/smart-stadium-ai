import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <LinearGradient
      colors={[
        theme === 'dark' ? 'rgba(8,18,35,0.9)' : 'rgba(248,250,252,0.9)',
        theme === 'dark' ? 'rgba(8,18,35,0.7)' : 'rgba(248,250,252,0.7)',
      ]}
      style={[
        styles.container,
        {
          paddingTop: insets.top + Theme.spacing.s,
          borderBottomColor: Colors[theme].border,
        },
      ]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>{title}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.l,
    paddingBottom: Theme.spacing.m,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
