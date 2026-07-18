import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useGlobalContext } from '../context/GlobalProvider';

interface SuggestionChipProps {
  label: string;
  onPress: (text: string) => void;
}

export const SuggestionChip = ({ label, onPress }: SuggestionChipProps) => {
  const { theme, themeColors } = useGlobalContext();

  // Strip emoji for query if wanted, or just send full label
  const handlePress = () => {
    // E.g. "🎫 Show my ticket" -> send "Show my ticket"
    const cleanedText = label
      .replace(
        /[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g,
        ''
      )
      .trim();
    onPress(cleanedText);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={[styles.chip, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
      <Text style={[styles.text, { color: themeColors.text }]}>{label}</Text>
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
    marginBottom: Theme.spacing.s,
  },
  text: {
    fontSize: Theme.typography.sizes.s,
    fontWeight: '600',
  },
});
