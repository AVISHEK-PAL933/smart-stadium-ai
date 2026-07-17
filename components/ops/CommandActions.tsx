import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const CommandActions = () => {
  const actions = [
    { label: 'Broadcast Announcement', icon: 'megaphone', color: '#2979ff' },
    { label: 'Open All Gates', icon: 'enter', color: '#00e676' },
    { label: 'Lock Stadium', icon: 'lock-closed', color: '#ff3d00' },
    { label: 'Emergency Mode', icon: 'warning', color: '#d50000' },
    { label: 'Reset Alerts', icon: 'refresh', color: '#b388ff' },
    { label: 'Generate Report', icon: 'document-text', color: '#00e5ff' },
  ];

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="apps" size={24} color="#ff3d00" />
        <Text style={styles.title}>Command Actions</Text>
      </View>
      <View style={styles.grid}>
        {actions.map((action, idx) => (
          <TouchableOpacity key={idx} style={styles.actionButton}>
            <LinearGradient
              colors={[`${action.color}30`, 'transparent']}
              style={StyleSheet.absoluteFillObject}
              
            />
            <Ionicons name={action.icon as any} size={28} color={action.color} style={styles.actionIcon} />
            <Text style={styles.actionLabel}>{action.label}</Text>
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
    backgroundColor: 'rgba(30, 10, 15, 0.7)',
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.m,
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '47%',
    aspectRatio: 1.5,
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.s,
  },
  actionIcon: {
    marginBottom: 8,
  },
  actionLabel: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
});
