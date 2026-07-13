import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function LostFound() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Lost & Found" />
      <ScrollView contentContainerStyle={styles.content}>
        <GlassCard style={styles.card}>
          <MaterialIcons name="search" size={48} color={themeColors.tint} style={styles.icon} />
          <Text style={[styles.title, { color: themeColors.text }]}>Report an Item</Text>
          <Text style={[styles.subtitle, { color: themeColors.icon }]}>
            Did you lose something? Register it here and our AI will match it with found items.
          </Text>
        </GlassCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Theme.spacing.l },
  card: { padding: Theme.spacing.l, alignItems: 'center' },
  icon: { marginBottom: Theme.spacing.m },
  title: { fontSize: Theme.typography.sizes.xl, fontWeight: 'bold', marginBottom: Theme.spacing.s },
  subtitle: { fontSize: Theme.typography.sizes.m, textAlign: 'center' },
});
