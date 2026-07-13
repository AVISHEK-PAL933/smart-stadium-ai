import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const GlassCard = ({ children, style }: GlassCardProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={theme === 'dark' ? 60 : 80} tint={theme} style={styles.blur}>
        <View
          style={[
            styles.content,
            {
              backgroundColor: Colors[theme].card,
              borderColor: Colors[theme].border,
              shadowColor: Colors[theme].tint,
            },
          ]}>
          {children}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.shapes.borderRadius.xl,
    overflow: 'hidden',
  },
  blur: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Theme.spacing.l,
    borderWidth: 1,
    borderRadius: Theme.shapes.borderRadius.xl,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
});
