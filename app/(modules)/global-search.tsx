import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../../components/GlassCard';
import { useRouter } from 'expo-router';

export default function GlobalSearchScreen() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const mockResults = [
    { type: 'Food', title: 'Hot Dog Combo', desc: 'Fan Zone B', icon: 'fast-food' },
    { type: 'Tickets', title: 'Match 15: USA vs ENG', desc: 'Category 1 Seating', icon: 'ticket' },
    { type: 'Parking', title: 'North Lot VIP', desc: 'Available Spaces: 42', icon: 'car' },
    { type: 'AI Assistant', title: 'Ask about Stadium Rules', desc: 'Tap to chat with AI', icon: 'hardware-chip' },
    { type: 'Operations', title: 'Gate B Congestion', desc: 'Wait time: 5m', icon: 'shield-checkmark' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Global Search" />
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="rgba(255,255,255,0.5)" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search food, tickets, parking, AI..."
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
      </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {mockResults.map((result, idx) => (
            <TouchableOpacity key={idx} onPress={() => router.back()}>
              <GlassCard style={styles.resultCard}>
                <View style={styles.iconBox}>
                  <Ionicons name={result.icon as any} size={24} color="#00e5ff" />
                </View>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultType}>{result.type}</Text>
                  <Text style={styles.resultTitle}>{result.title}</Text>
                  <Text style={styles.resultDesc}>{result.desc}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.3)" />
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  searchContainer: {
    margin: Theme.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Theme.shapes.borderRadius.m,
    paddingHorizontal: Theme.spacing.m,
    height: 50,
  },
  searchIcon: {
    marginRight: Theme.spacing.s,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Theme.spacing.m,
    gap: Theme.spacing.m,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.m,
    marginBottom: Theme.spacing.s,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.m,
  },
  resultInfo: {
    flex: 1,
  },
  resultType: {
    color: '#00e5ff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  resultTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultDesc: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginTop: 2,
  },
});
