import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CartItem as ICartItem, CartCustomization } from '../hooks/useCart';

interface CartItemProps {
  item: ICartItem;
  onUpdateQty: (foodId: string, customization: CartCustomization, delta: number) => void;
  onRemove: (foodId: string, customization: CartCustomization) => void;
}

export const CartItem = ({ item, onUpdateQty, onRemove }: CartItemProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const customizationText = () => {
    const addons = [];
    if (item.customization.extraCheese) addons.push('Extra Cheese');
    if (item.customization.extraSauce) addons.push('Extra Sauce');
    if (item.customization.noOnion) addons.push('No Onion');
    if (item.customization.lessSpicy) addons.push('Less Spicy');
    return addons.join(', ') || 'No customization';
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.card, borderColor: themeColors.border },
      ]}>
      <View style={[styles.iconWrapper, { backgroundColor: themeColors.tint + '15' }]}>
        <MaterialCommunityIcons
          name={item.foodItem.icon as any}
          size={28}
          color={themeColors.tint}
        />
      </View>

      <View style={styles.details}>
        <Text style={[styles.name, { color: themeColors.text }]}>{item.foodItem.name}</Text>
        <Text style={[styles.customText, { color: themeColors.icon }]}>{customizationText()}</Text>
        <Text style={[styles.price, { color: themeColors.tint }]}>
          ${(item.foodItem.price * item.quantity).toFixed(2)}
        </Text>
      </View>

      <View style={styles.controlsCol}>
        <TouchableOpacity
          onPress={() => onRemove(item.foodItem.id, item.customization)}
          style={styles.deleteBtn}>
          <MaterialCommunityIcons name="trash-can-outline" size={18} color="#FF7043" />
        </TouchableOpacity>

        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={() => onUpdateQty(item.foodItem.id, item.customization, -1)}
            style={[styles.qtyBtn, { borderColor: themeColors.border }]}>
            <MaterialCommunityIcons name="minus" size={14} color={themeColors.text} />
          </TouchableOpacity>
          <Text style={[styles.qtyText, { color: themeColors.text }]}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => onUpdateQty(item.foodItem.id, item.customization, 1)}
            style={[styles.qtyBtn, { borderColor: themeColors.border }]}>
            <MaterialCommunityIcons name="plus" size={14} color={themeColors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Theme.spacing.m,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    gap: Theme.spacing.m,
    marginBottom: Theme.spacing.s,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: Theme.typography.sizes.m - 2,
    fontWeight: 'bold',
  },
  customText: {
    fontSize: Theme.typography.sizes.s - 2,
    fontWeight: '600',
  },
  price: {
    fontSize: Theme.typography.sizes.s,
    fontWeight: '900',
  },
  controlsCol: {
    alignItems: 'flex-end',
    gap: Theme.spacing.s,
  },
  deleteBtn: {
    padding: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: Theme.typography.sizes.s,
    fontWeight: 'bold',
    width: 14,
    textAlign: 'center',
  },
});
