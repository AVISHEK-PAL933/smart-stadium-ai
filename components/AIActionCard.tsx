import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';

interface AIActionCardProps {
  label: string;
  onPress: (text: string) => void;
}

const ACTION_MAP: Record<string, { icon: string; color: string; desc: string }> = {
  '🎫 Show my ticket': { icon: 'ticket-confirmation', color: '#3B82F6', desc: 'View QR code' },
  '🪑 Find my seat': { icon: 'seat', color: '#A855F7', desc: 'Get directions' },
  '🍔 Recommend food': { icon: 'hamburger', color: '#F97316', desc: 'Concessions near you' },
  '🚻 Nearest washroom': { icon: 'human-male-female', color: '#06B6D4', desc: 'Avoid the lines' },
  '🚑 Emergency help': { icon: 'medical-bag', color: '#EF4444', desc: 'Call first responders' },
  '🅿 Parking Zone B': { icon: 'parking', color: '#6366F1', desc: 'Navigate to car' },
  "⚽ Today's matches": { icon: 'soccer', color: '#22C55E', desc: 'Live stats & scores' },
  '🛍 FIFA Store': { icon: 'shopping', color: '#EC4899', desc: 'Buy merch & gear' },
};

export const AIActionCard = ({ label, onPress }: AIActionCardProps) => {
  const meta = ACTION_MAP[label] || { icon: 'lightning-bolt', color: '#00C8FF', desc: 'Quick Action' };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(label)} style={styles.touchable}>
      <GlassCard style={styles.card} gradientColors={['rgba(8,18,35,0.85)', 'rgba(15,23,42,0.95)']}>
        <View style={[styles.iconBox, { backgroundColor: `${meta.color}20` }]}>
          <MaterialCommunityIcons name={meta.icon as any} size={16} color={meta.color} />
        </View>
        <Text style={styles.title}>{label.substring(2).trim()}</Text>
        <Text style={styles.desc}>{meta.desc}</Text>
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: 150,
    height: 85,
    marginRight: 12,
  },
  card: {
    flex: 1,
    padding: 10,
    gap: 4,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  desc: {
    fontSize: 12,
    color: '#CBD5E1',
    fontFamily: 'Inter',
  },
});
