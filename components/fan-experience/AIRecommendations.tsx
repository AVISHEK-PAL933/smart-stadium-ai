import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const AIRecommendations = ({ recommendations }: { recommendations: any[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="sparkles" size={24} color="#ffd600" />
        <Text style={styles.title}>AI For You</Text>
      </View>
      <View style={styles.content}>
        {recommendations.map((rec, idx) => (
          <TouchableOpacity key={idx} style={styles.recCard}>
            <LinearGradient colors={['rgba(255, 214, 0, 0.1)', 'transparent']} style={StyleSheet.absoluteFillObject} />
            <View style={styles.iconBox}>
              <Ionicons name={rec.icon as any} size={20} color="#ffd600" />
            </View>
            <View style={styles.recInfo}>
              <Text style={styles.recType}>{rec.type}</Text>
              <Text style={styles.recText}>{rec.text}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.4)" />
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
    backgroundColor: 'rgba(25, 20, 5, 0.7)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: Theme.spacing.s,
  },
  content: {
    gap: Theme.spacing.s,
  },
  recCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(255,214,0,0.2)',
    overflow: 'hidden',
  },
  iconBox: {
    marginRight: Theme.spacing.m,
  },
  recInfo: {
    flex: 1,
  },
  recType: {
    color: '#ffd600',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  recText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
});
