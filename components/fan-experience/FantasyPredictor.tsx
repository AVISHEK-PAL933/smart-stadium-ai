import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const FantasyPredictor = ({ data }: { data: any }) => {
  return (
    <GlassCard style={styles.container}>
      <LinearGradient colors={['rgba(255, 214, 0, 0.1)', 'transparent']} style={StyleSheet.absoluteFillObject} />
      <View style={styles.header}>
        <Ionicons name="stats-chart" size={24} color="#ffd600" />
        <Text style={styles.title}>Fantasy Predictor</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.matchTitle}>{data.match}</Text>
        
        <Text style={styles.question}>Who will win?</Text>
        <View style={styles.optionsRow}>
          {data.options.winner.map((opt: string, idx: number) => (
            <TouchableOpacity key={idx} style={styles.optionBtn}>
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.question}>First Goal Scorer?</Text>
        <View style={styles.optionsGrid}>
          {data.options.firstGoal.map((opt: string, idx: number) => (
            <TouchableOpacity key={idx} style={styles.optionBtnGrid}>
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit Predictions</Text>
        </TouchableOpacity>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(25, 20, 5, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 214, 0, 0.3)',
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
  content: {},
  matchTitle: {
    color: '#ffd600',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Theme.spacing.m,
  },
  question: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: Theme.spacing.m,
  },
  optionBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 10,
    borderRadius: Theme.shapes.borderRadius.s,
    alignItems: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: Theme.spacing.m,
  },
  optionBtnGrid: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 10,
    borderRadius: Theme.shapes.borderRadius.s,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  submitBtn: {
    backgroundColor: '#ffd600',
    paddingVertical: 12,
    borderRadius: Theme.shapes.borderRadius.m,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
