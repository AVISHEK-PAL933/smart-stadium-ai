import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';

interface CategoryChipProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export const CategoryChip = ({ label, isActive, onPress }: CategoryChipProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: isActive ? themeColors.tint : themeColors.card,
          borderColor: isActive ? themeColors.tint : themeColors.border,
        },
      ]}>
      <Text style={[styles.text, { color: isActive ? '#FFFFFF' : themeColors.text }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Theme.spacing.m,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: Theme.spacing.s,
  },
  text: {
    fontSize: Theme.typography.sizes.s,
    fontWeight: 'bold',
  },
});
