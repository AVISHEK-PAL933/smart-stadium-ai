import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const FanMarketplace = ({ items }: { items: any[] }) => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="cart" size={24} color="#ff3d00" />
        <Text style={styles.title}>Fan Marketplace</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.grid}>
          {items.map((item, idx) => (
            <View key={idx} style={styles.itemCard}>
              <View style={styles.imageBox}>
                <Ionicons name={item.image as any} size={40} color="rgba(255,255,255,0.2)" />
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>{item.tag}</Text>
                </View>
              </View>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.buyBtn}>
                  <Ionicons name="add" size={16} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(25, 10, 10, 0.7)',
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
    gap: Theme.spacing.m,
    paddingRight: Theme.spacing.m,
  },
  itemCard: {
    width: 140,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: Theme.shapes.borderRadius.m,
    padding: Theme.spacing.m,
  },
  imageBox: {
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: Theme.shapes.borderRadius.s,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.m,
    position: 'relative',
  },
  tagBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff3d00',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  itemName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    height: 32,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    color: '#ffd600',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyBtn: {
    backgroundColor: '#fff',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
