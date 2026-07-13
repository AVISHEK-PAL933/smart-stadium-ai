import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';

export const LoadingState = ({ message = 'Loading...' }: { message?: string }) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <ActivityIndicator size="large" color={Colors[theme].tint} />
      <Text style={[styles.text, { color: Colors[theme].icon }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: Theme.spacing.m,
    fontSize: Theme.typography.sizes.m,
  },
});
