import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useGlobalContext } from '../context/GlobalProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RatingStars } from './RatingStars';
import { FoodItem } from '../services/foodService';

interface FoodCardProps {
  item: FoodItem;
  onPress: () => void;
}

export const FoodCard = ({ item, onPress }: FoodCardProps) => {
  const { theme, themeColors } = useGlobalContext();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
      {/* Food Photography Container */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.foodImage} />

        {/* Vegetarian Badge */}
        <View
          style={[
            styles.vegBadge,
            {
              backgroundColor: item.isVegetarian ? '#00E67633' : '#EF444433',
              borderColor: item.isVegetarian ? '#00E676' : '#EF4444',
            },
          ]}>
          <Text style={[styles.vegText, { color: item.isVegetarian ? '#00E676' : '#EF4444' }]}>
            {item.isVegetarian ? 'VEG' : 'NON-VEG'}
          </Text>
        </View>
      </View>

      {/* Details Area */}
      <View style={styles.details}>
        <Text style={[styles.title, { color: themeColors.text }]} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.ratingRow}>
          <RatingStars rating={item.rating} />
          <Text style={[styles.ratingVal, { color: themeColors.icon }]}>{item.rating}</Text>
        </View>

        {/* Nutritional & Prep Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCell}>
            <MaterialCommunityIcons name="clock-outline" size={14} color={themeColors.icon} />
            <Text style={[styles.statText, { color: themeColors.icon }]}>
              {item.prepTimeMinutes} min
            </Text>
          </View>
          <View style={styles.statCell}>
            <MaterialCommunityIcons name="fire" size={14} color="#FF7043" />
            <Text style={[styles.statText, { color: themeColors.icon }]}>{item.calories} kcal</Text>
          </View>
        </View>

        {/* Price & Add Button */}
        <View style={styles.footer}>
          <Text style={[styles.price, { color: '#FF7043' }]}>${item.price.toFixed(2)}</Text>
          <View style={[styles.addBtn, { backgroundColor: '#FF7043' }]}>
            <MaterialCommunityIcons name="plus" size={18} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Theme.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  imageWrapper: {
    height: 120,
    position: 'relative',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  vegBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  vegText: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  details: {
    padding: Theme.spacing.s + 2,
    gap: 6,
  },
  title: {
    fontSize: Theme.typography.sizes.m - 2,
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingVal: {
    fontSize: Theme.typography.sizes.s - 2,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.s,
    marginTop: 2,
  },
  statCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: Theme.typography.sizes.s - 2,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: Theme.typography.sizes.m - 2,
    fontWeight: '900',
  },
  addBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
