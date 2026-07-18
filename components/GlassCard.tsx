import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useGlobalContext } from '../context/GlobalProvider';
import { LinearGradient } from 'expo-linear-gradient';

export interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  gradientColors?: [string, string, ...string[]];
  borderColor?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  gradientColors,
  borderColor,
  ...props
}) => {
  const { theme, themeColors } = useGlobalContext();

  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={theme === 'dark' ? 60 : 80} tint={theme} style={styles.blur}>
        <View
          style={[
            styles.content,
            {
              backgroundColor: themeColors.card,
              borderColor: borderColor || themeColors.border,
              shadowColor: themeColors.tint,
            },
          ]}
          {...props}>
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
