import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useGlobalContext } from '../context/GlobalProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onVoicePress?: () => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChangeText,
  onVoicePress,
  placeholder = 'Search menus...',
}: SearchBarProps) => {
  const { theme, themeColors } = useGlobalContext();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.card, borderColor: themeColors.border },
      ]}>
      <MaterialCommunityIcons name="magnify" size={20} color={themeColors.icon} />
      <TextInput
        style={[styles.input, { color: themeColors.text }]}
        placeholder={placeholder}
        placeholderTextColor={themeColors.icon}
        value={value}
        onChangeText={onChangeText}
      />
      {onVoicePress && (
        <TouchableOpacity onPress={onVoicePress} style={styles.voiceBtn}>
          <MaterialCommunityIcons name="microphone" size={20} color={themeColors.tint} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: Theme.spacing.m,
    marginHorizontal: Theme.spacing.l,
    marginVertical: Theme.spacing.s,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: Theme.typography.sizes.m - 2,
    paddingVertical: 8,
  },
  voiceBtn: {
    padding: 4,
  },
});
