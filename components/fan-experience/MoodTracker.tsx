import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

export const MoodTracker = () => {
  const [selected, setSelected] = useState<number | null>(null);
  
  const moods = [
    { emoji: '😃', label: 'Happy' },
    { emoji: '🤩', label: 'Excited' },
    { emoji: '😰', label: 'Nervous' },
    { emoji: '🎉', label: 'Celebrating' },
    { emoji: '😞', label: 'Disappointed' },
  ];

  return (
    <GlassCard style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>
      <View style={styles.moodsRow}>
        {moods.map((mood, idx) => (
          <TouchableOpacity 
            key={idx} 
            style={[styles.moodBtn, selected === idx && styles.moodSelected]}
            onPress={() => setSelected(idx)}
          >
            <Text style={styles.emoji}>{mood.emoji}</Text>
            <Text style={styles.label}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(25, 5, 20, 0.7)',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Theme.spacing.m,
  },
  moodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodBtn: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  moodSelected: {
    backgroundColor: 'rgba(255, 61, 0, 0.2)',
    borderColor: '#ff3d00',
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    color: '#fff',
    fontSize: 10,
  },
});
