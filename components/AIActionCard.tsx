import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';

interface AIActionCardProps {
  label: string;
  onPress: (text: string) => void;
}

const ACTION_MAP: Record<string, { icon: string; color: string; desc: string }> = {
  '🎫 Show my ticket': { icon: 'ticket-confirmation', color: '#00C8FF', desc: 'View QR code' },
  '🪑 Find my seat': { icon: 'seat', color: '#7C4DFF', desc: 'Get directions' },
  '🍔 Recommend food': { icon: 'hamburger', color: '#FF9800', desc: 'Concessions near you' },
  '🚻 Nearest washroom': { icon: 'human-male-female', color: '#00C8FF', desc: 'Avoid the lines' },
  '🚑 Emergency help': { icon: 'medical-bag', color: '#FF1744', desc: 'Call first responders' },
  '🅿 Parking Zone B': { icon: 'parking', color: '#5B6CFF', desc: 'Navigate to car' },
  "⚽ Today's matches": { icon: 'soccer', color: '#00E676', desc: 'Live stats & scores' },
  '🛍 FIFA Store': { icon: 'shopping', color: '#E91E63', desc: 'Buy merch & gear' },
};

export const AIActionCard = ({ label, onPress }: AIActionCardProps) => {
  const meta = ACTION_MAP[label] || { icon: 'lightning-bolt', color: '#00C8FF', desc: 'Quick Action' };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(label)} style={styles.touchable}>
      <GlassCard style={styles.card} gradientColors={['rgba(8,18,35,0.85)', 'rgba(15,23,42,0.95)']}>
        <View style={[styles.iconBox, { backgroundColor: `${meta.color}20` }]}>
          <MaterialCommunityIcons name={meta.icon as any} size={28} color={meta.color} />
        </View>
        <Text style={styles.title}>{label.substring(2).trim()}</Text>
        <Text style={styles.desc}>{meta.desc}</Text>
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: 160,
    marginRight: 16,
    marginBottom: 16,
  },
  card: {
    padding: 16,
    gap: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  desc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
});
