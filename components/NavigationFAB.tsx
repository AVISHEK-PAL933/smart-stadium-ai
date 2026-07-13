import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationDestination } from '../services/navigationService';

interface NavigationFABProps {
  destinations: NavigationDestination[];
  onSelectDestination: (id: string) => void;
  activeId: string | null;
}

export const NavigationFAB = ({
  destinations,
  onSelectDestination,
  activeId,
}: NavigationFABProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: themeColors.text }]}>Quick Navigation Points</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {destinations.map((dest) => {
          const isActive = activeId === dest.id;
          return (
            <TouchableOpacity
              key={dest.id}
              activeOpacity={0.8}
              onPress={() => onSelectDestination(dest.id)}
              style={[
                styles.chip,
                {
                  backgroundColor: isActive ? themeColors.tint : themeColors.card,
                  borderColor: isActive ? themeColors.tint : themeColors.border,
                },
              ]}>
              <MaterialCommunityIcons
                name={dest.icon as any}
                size={18}
                color={isActive ? '#FFFFFF' : themeColors.tint}
              />
              <Text style={[styles.label, { color: isActive ? '#FFFFFF' : themeColors.text }]}>
                {dest.name.split(' (')[0]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: Theme.spacing.s,
    gap: Theme.spacing.s,
  },
  title: {
    fontSize: Theme.typography.sizes.m - 2,
    fontWeight: 'bold',
    paddingHorizontal: Theme.spacing.l,
    opacity: 0.8,
  },
  scrollContainer: {
    paddingHorizontal: Theme.spacing.l,
    paddingBottom: Theme.spacing.s,
    gap: Theme.spacing.s,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.m,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    gap: 8,
  },
  label: {
    fontSize: Theme.typography.sizes.s,
    fontWeight: 'bold',
  },
});
