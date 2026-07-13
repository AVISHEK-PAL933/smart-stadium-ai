import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { PrimaryButton } from '../../components/PrimaryButton';

const RECENT_ITEMS = [
  { id: '1', name: 'Black iPhone 13', location: 'Gate D', time: '10 mins ago', status: 'Found' },
  {
    id: '2',
    name: 'Brown Leather Wallet',
    location: 'Section 112',
    time: '1 hr ago',
    status: 'Lost',
  },
  {
    id: '3',
    name: 'Car Keys (Toyota)',
    location: 'Restroom C',
    time: '2 hrs ago',
    status: 'Found',
  },
];

export default function LostFound() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Lost & Found" />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInUp.delay(100)}>
          <GlassCard style={styles.heroCard}>
            <MaterialCommunityIcons
              name="magnify"
              size={48}
              color={themeColors.tint}
              style={styles.icon}
            />
            <Text style={[styles.title, { color: themeColors.text }]}>AI Match & Recover</Text>
            <Text style={[styles.subtitle, { color: themeColors.icon }]}>
              Did you lose something? Register it here and our AI will match it with found items in
              the stadium.
            </Text>
            <PrimaryButton title="Report Lost Item" onPress={() => {}} />
          </GlassCard>
        </Animated.View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Recently Reported</Text>

        <View style={styles.itemsList}>
          {RECENT_ITEMS.map((item, index) => (
            <Animated.View key={item.id} entering={FadeInUp.delay(200 + index * 100)}>
              <GlassCard style={styles.itemCard}>
                <View style={styles.itemIconBg}>
                  <MaterialCommunityIcons
                    name={item.status === 'Found' ? 'check-circle' : 'help-circle-outline'}
                    size={24}
                    color={item.status === 'Found' ? '#39FF14' : '#FACC15'}
                  />
                </View>
                <View style={styles.itemDetails}>
                  <Text style={[styles.itemName, { color: themeColors.text }]}>{item.name}</Text>
                  <Text style={[styles.itemLoc, { color: themeColors.icon }]}>
                    📍 {item.location} • {item.time}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.viewBtn, { backgroundColor: themeColors.tint + '20' }]}>
                  <Text style={[styles.viewBtnText, { color: themeColors.tint }]}>View</Text>
                </TouchableOpacity>
              </GlassCard>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Theme.spacing.l, paddingBottom: 100 },
  heroCard: { padding: Theme.spacing.l, alignItems: 'center', marginBottom: Theme.spacing.xl },
  icon: {
    marginBottom: Theme.spacing.m,
    textShadowColor: 'rgba(0, 229, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  title: { fontSize: Theme.typography.sizes.xl, fontWeight: 'bold', marginBottom: Theme.spacing.s },
  subtitle: {
    fontSize: Theme.typography.sizes.m,
    textAlign: 'center',
    marginBottom: Theme.spacing.l,
  },
  sectionTitle: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.m,
  },
  itemsList: { gap: Theme.spacing.m },
  itemCard: {
    padding: Theme.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.m,
  },
  itemIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDetails: { flex: 1 },
  itemName: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold', marginBottom: 4 },
  itemLoc: { fontSize: Theme.typography.sizes.s },
  viewBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  viewBtnText: { fontWeight: 'bold', fontSize: Theme.typography.sizes.s },
});
