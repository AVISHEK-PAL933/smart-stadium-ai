import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';

export default function EmergencyHelp() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Emergency Help" />
      <ScrollView contentContainerStyle={styles.content}>
        <GlassCard style={styles.card}>
          <MaterialIcons name="error-outline" size={48} color="#EF4444" style={styles.icon} />
          <Text style={[styles.title, { color: themeColors.text }]}>Need Assistance?</Text>
          <Text style={[styles.subtitle, { color: themeColors.icon }]}>
            Press the button below to alert stadium security and medical personnel.
          </Text>
          <PrimaryButton
            title="SOS Alert"
            onPress={() => {}}
            style={{ backgroundColor: '#EF4444', width: '100%' }}
          />
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
  subtitle: {
    fontSize: Theme.typography.sizes.m,
    textAlign: 'center',
    marginBottom: Theme.spacing.l,
  },
});
