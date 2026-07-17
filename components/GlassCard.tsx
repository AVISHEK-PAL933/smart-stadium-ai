import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  gradientColors?: [string, string];
}

export const GlassCard = ({ children, style, gradientColors }: GlassCardProps) => {
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
          {gradientColors && (
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
          )}
          {children}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  blur: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Theme.spacing.l,
    borderWidth: 1.5,
    borderRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
});
