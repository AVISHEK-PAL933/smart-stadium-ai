import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';

interface VoiceButtonProps {
  isListening: boolean;
  onPress: () => void;
}

export const VoiceButton = ({ isListening, onPress }: VoiceButtonProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const scale = useSharedValue(1);

  useEffect(() => {
    if (isListening) {
      scale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 400 }), withTiming(1.0, { duration: 400 })),
        -1,
        true
      );
    } else {
      scale.value = withTiming(1.0, { duration: 200 });
    }
  }, [isListening]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[
          styles.button,
          {
            backgroundColor: isListening ? '#FF5252' : themeColors.tint,
            shadowColor: isListening ? '#FF5252' : themeColors.tint,
          },
        ]}>
        <MaterialCommunityIcons
          name={isListening ? 'microphone-off' : 'microphone'}
          size={24}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
});
