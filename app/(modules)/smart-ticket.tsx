import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';

export default function SmartTicket() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Smart Ticket" />
      <ScrollView contentContainerStyle={styles.content}>
        <GlassCard style={styles.card}>
          <View style={styles.header}>
            <MaterialCommunityIcons name="ticket-confirmation" size={32} color={themeColors.tint} />
            <Text style={[styles.title, { color: themeColors.text }]}>FIFA World Cup 2026™</Text>
          </View>

          <View style={[styles.matchInfo, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.teams, { color: themeColors.text }]}>BRA vs ARG</Text>
            <Text style={[styles.date, { color: themeColors.icon }]}>July 15, 2026 • 20:00</Text>
            <Text style={[styles.stadium, { color: themeColors.icon }]}>MetLife Stadium</Text>
          </View>

          <View style={styles.seatInfo}>
            <View style={styles.seatBox}>
              <Text style={[styles.label, { color: themeColors.icon }]}>GATE</Text>
              <Text style={[styles.value, { color: themeColors.text }]}>D</Text>
            </View>
            <View style={styles.seatBox}>
              <Text style={[styles.label, { color: themeColors.icon }]}>BLOCK</Text>
              <Text style={[styles.value, { color: themeColors.text }]}>112</Text>
            </View>
            <View style={styles.seatBox}>
              <Text style={[styles.label, { color: themeColors.icon }]}>ROW</Text>
              <Text style={[styles.value, { color: themeColors.text }]}>M</Text>
            </View>
            <View style={styles.seatBox}>
              <Text style={[styles.label, { color: themeColors.icon }]}>SEAT</Text>
              <Text style={[styles.value, { color: themeColors.text }]}>42</Text>
            </View>
          </View>

          <View style={[styles.qrContainer, { backgroundColor: '#FFFFFF' }]}>
            <MaterialCommunityIcons name="qrcode" size={120} color="#000000" />
          </View>

          <PrimaryButton title="Add to Wallet" onPress={() => {}} style={styles.button} />
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.s,
    marginBottom: Theme.spacing.m,
  },
  title: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: 'bold',
  },
  matchInfo: {
    borderBottomWidth: 1,
    paddingBottom: Theme.spacing.m,
    marginBottom: Theme.spacing.m,
  },
  teams: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.xs,
  },
  date: {
    fontSize: Theme.typography.sizes.m,
    marginBottom: Theme.spacing.xs,
  },
  stadium: {
    fontSize: Theme.typography.sizes.m,
  },
  seatInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xl,
  },
  seatBox: {
    alignItems: 'center',
  },
  label: {
    fontSize: Theme.typography.sizes.s,
    marginBottom: Theme.spacing.xs,
  },
  value: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: 'bold',
  },
  qrContainer: {
    alignSelf: 'center',
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.s,
    marginBottom: Theme.spacing.xl,
  },
  button: {
    width: '100%',
  },
});
