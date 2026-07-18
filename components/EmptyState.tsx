import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useGlobalContext } from '../context/GlobalProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = 'Nothing here yet',
  description = 'Data will appear here once it becomes available.',
}: EmptyStateProps) => {
  const { theme } = useGlobalContext();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <MaterialCommunityIcons
        name="alert-circle-outline"
        size={48}
        color={Colors[theme].icon}
        style={styles.icon}
      />
      <Text style={[styles.title, { color: Colors[theme].text }]}>{title}</Text>
      <Text style={[styles.description, { color: Colors[theme].icon }]}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.xl,
  },
  icon: {
    marginBottom: Theme.spacing.m,
  },
  title: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.s,
    textAlign: 'center',
  },
  description: {
    fontSize: Theme.typography.sizes.m,
    textAlign: 'center',
  },
});
