import { useGlobalContext } from '../context/GlobalProvider';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface RatingStarsProps {
  rating: number;
  size?: number;
}

export const RatingStars = ({ rating, size = 14 }: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const starsArray = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsArray.push(<MaterialCommunityIcons key={i} name="star" size={size} color="#FFD700" />);
    } else if (i === fullStars + 1 && hasHalf) {
      starsArray.push(
        <MaterialCommunityIcons key={i} name="star-half-full" size={size} color="#FFD700" />
      );
    } else {
      starsArray.push(
        <MaterialCommunityIcons key={i} name="star-outline" size={size} color="#E0E0E0" />
      );
    }
  }

  return <View style={styles.container}>{starsArray}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
