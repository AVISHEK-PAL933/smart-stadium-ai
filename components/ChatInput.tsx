import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { VoiceButton } from './VoiceButton';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isListening: boolean;
  onVoicePress: () => void;
}

export const ChatInput = ({
  value,
  onChangeText,
  onSend,
  isListening,
  onVoicePress,
}: ChatInputProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.card, borderTopColor: themeColors.border },
      ]}>
      <VoiceButton isListening={isListening} onPress={onVoicePress} />

      <TextInput
        style={[
          styles.input,
          {
            color: themeColors.text,
            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            borderColor: themeColors.border,
          },
        ]}
        placeholder={isListening ? 'Listening...' : 'Ask something...'}
        placeholderTextColor={themeColors.icon}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSend}
        editable={!isListening}
      />

      <TouchableOpacity
        onPress={onSend}
        disabled={!value.trim()}
        style={[styles.sendButton, { opacity: value.trim() ? 1 : 0.6 }]}>
        <LinearGradient
          colors={[
            themeColors.gradientStart || themeColors.tint,
            themeColors.gradientEnd || themeColors.tint,
          ]}
          style={styles.sendGradient}>
          <MaterialCommunityIcons name="send" size={20} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Theme.spacing.m,
    borderTopWidth: 1,
    alignItems: 'center',
    gap: Theme.spacing.s,
  },
  input: {
    flex: 1,
    paddingHorizontal: Theme.spacing.m,
    height: 48,
    borderRadius: 24,
    fontSize: Theme.typography.sizes.m,
    borderWidth: 1,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  sendGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
