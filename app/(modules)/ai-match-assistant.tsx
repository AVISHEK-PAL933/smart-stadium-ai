import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function AIMatchAssistant() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="AI Match Assistant" />
      <ScrollView contentContainerStyle={styles.content}>
        <GlassCard style={styles.card}>
          <MaterialIcons name="smart-toy" size={48} color={themeColors.tint} style={styles.icon} />
          <Text style={[styles.title, { color: themeColors.text }]}>How can I help?</Text>
          <Text style={[styles.subtitle, { color: themeColors.icon }]}>
            Ask me about match stats, player lineups, or stadium facilities.
          </Text>
          <View style={[styles.promptContainer, { backgroundColor: themeColors.border }]}>
            <MaterialIcons name="star" size={20} color={themeColors.tint} />
            <Text style={[styles.promptText, { color: themeColors.text }]}>
              "Who is starting for Brazil today?"
            </Text>
          </View>
        </GlassCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Theme.spacing.l,
  },
  card: {
    padding: Theme.spacing.l,
    alignItems: 'center',
  },
  icon: {
    marginBottom: Theme.spacing.m,
  },
  title: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.s,
  },
  subtitle: {
    fontSize: Theme.typography.sizes.m,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  promptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.m,
    width: '100%',
    gap: Theme.spacing.s,
  },
  promptText: {
    fontSize: Theme.typography.sizes.m,
    fontStyle: 'italic',
  },
});
