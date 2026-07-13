import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

const MODULES = [
  {
    id: 'ai-match-assistant',
    title: 'AI Assistant',
    icon: 'smart-toy',
    route: '/(modules)/ai-match-assistant',
  },
  {
    id: 'smart-ticket',
    title: 'Tickets',
    icon: 'confirmation-number',
    route: '/(modules)/smart-ticket',
  },
  {
    id: 'crowd-intelligence',
    title: 'Crowds',
    icon: 'groups',
    route: '/(modules)/crowd-intelligence',
  },
  { id: 'navigation', title: 'Navigate', icon: 'map', route: '/(modules)/navigation' },
  {
    id: 'food-ordering',
    title: 'Food & Drink',
    icon: 'restaurant',
    route: '/(modules)/food-ordering',
  },
  { id: 'live-match', title: 'Live Match', icon: 'stadium', route: '/(modules)/live-match' },
  { id: 'emergency', title: 'Emergency', icon: 'warning', route: '/(modules)/emergency' },
  { id: 'lost-found', title: 'Lost & Found', icon: 'find-in-page', route: '/(modules)/lost-found' },
  { id: 'parking', title: 'Parking', icon: 'local-parking', route: '/(modules)/parking' },
  {
    id: 'accessibility',
    title: 'Accessibility',
    icon: 'accessible',
    route: '/(modules)/accessibility',
  },
  {
    id: 'multilingual-guide',
    title: 'Language',
    icon: 'translate',
    route: '/(modules)/multilingual-guide',
  },
];

export default function HomeDashboard() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Dashboard" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {MODULES.map((module, index) => (
            <Animated.View
              key={module.id}
              entering={FadeInDown.duration(400).delay(index * 100)}
              style={styles.cardContainer}>
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    backgroundColor: themeColors.card,
                    borderColor: themeColors.border,
                    shadowColor: themeColors.tint,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => router.push(module.route as any)}>
                <MaterialIcons
                  name={module.icon as any}
                  size={32}
                  color={themeColors.tint}
                  style={styles.icon}
                />
                <Text style={[styles.cardTitle, { color: themeColors.text }]}>{module.title}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.l,
    paddingBottom: 120, // Space for floating button
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Theme.spacing.m,
  },
  cardContainer: {
    width: '47%',
    aspectRatio: 1,
  },
  card: {
    flex: 1,
    borderRadius: Theme.shapes.borderRadius.xl,
    padding: Theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  icon: {
    marginBottom: Theme.spacing.l,
    textShadowColor: 'rgba(0, 229, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  cardTitle: {
    fontSize: Theme.typography.sizes.s,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
