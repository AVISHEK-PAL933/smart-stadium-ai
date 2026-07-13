import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp, SlideInDown } from 'react-native-reanimated';
import { PrimaryButton } from '../../components/PrimaryButton';

const MENU_ITEMS = [
  { id: '1', name: 'Classic Stadium Hot Dog', price: '$8.00', icon: 'hamburger' },
  { id: '2', name: 'Nachos with Cheese', price: '$6.50', icon: 'silverware-fork-knife' },
  { id: '3', name: 'Draft Beer (Large)', price: '$12.00', icon: 'glass-wine' },
  { id: '4', name: 'Bottled Water', price: '$4.00', icon: 'water' },
  { id: '5', name: 'Pretzel', price: '$5.50', icon: 'bread-slice' },
];

export default function FoodOrdering() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const [cart, setCart] = useState<Record<string, number>>({});

  const handleAdd = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemove = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id]--;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="In-Seat Delivery" />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInUp.delay(100)}>
          <GlassCard style={styles.headerCard}>
            <MaterialCommunityIcons
              name="coffee"
              size={48}
              color={themeColors.tint}
              style={styles.icon}
            />
            <Text style={[styles.title, { color: themeColors.text }]}>Section 112 Concessions</Text>
            <Text style={[styles.subtitle, { color: themeColors.icon }]}>
              Order from nearby vendors and skip the line. Delivered in ~10 mins.
            </Text>
          </GlassCard>
        </Animated.View>

        <View style={styles.menuList}>
          {MENU_ITEMS.map((item, index) => (
            <Animated.View key={item.id} entering={FadeInUp.delay(200 + index * 100)}>
              <View
                style={[
                  styles.menuItem,
                  { backgroundColor: themeColors.card, borderColor: themeColors.border },
                ]}>
                <View
                  style={[styles.itemIconContainer, { backgroundColor: themeColors.tint + '20' }]}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={28}
                    color={themeColors.tint}
                  />
                </View>
                <View style={styles.itemDetails}>
                  <Text style={[styles.itemName, { color: themeColors.text }]}>{item.name}</Text>
                  <Text style={[styles.itemPrice, { color: themeColors.tint }]}>{item.price}</Text>
                </View>
                <View style={styles.quantityControls}>
                  {cart[item.id] ? (
                    <>
                      <TouchableOpacity
                        onPress={() => handleRemove(item.id)}
                        style={[styles.ctrlBtn, { borderColor: themeColors.border }]}>
                        <MaterialCommunityIcons name="minus" size={20} color={themeColors.text} />
                      </TouchableOpacity>
                      <Text style={[styles.qtyText, { color: themeColors.text }]}>
                        {cart[item.id]}
                      </Text>
                    </>
                  ) : null}
                  <TouchableOpacity
                    onPress={() => handleAdd(item.id)}
                    style={[
                      styles.ctrlBtn,
                      { backgroundColor: themeColors.tint, borderColor: themeColors.tint },
                    ]}>
                    <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {totalItems > 0 && (
        <Animated.View
          entering={SlideInDown}
          style={[
            styles.cartFloating,
            { borderTopColor: themeColors.border, backgroundColor: themeColors.background },
          ]}>
          <View style={styles.cartInfo}>
            <Text style={[styles.cartItems, { color: themeColors.text }]}>
              {totalItems} Items Selected
            </Text>
            <Text style={[styles.cartDesc, { color: themeColors.icon }]}>
              Delivery to Sec 112, Row M, Seat 42
            </Text>
          </View>
          <PrimaryButton title="Checkout" onPress={() => {}} style={styles.checkoutBtn} />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Theme.spacing.l, paddingBottom: 150 },
  headerCard: { padding: Theme.spacing.l, alignItems: 'center', marginBottom: Theme.spacing.xl },
  icon: {
    marginBottom: Theme.spacing.m,
    textShadowColor: 'rgba(0, 229, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  title: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.s,
    textAlign: 'center',
  },
  subtitle: { fontSize: Theme.typography.sizes.m, textAlign: 'center' },
  menuList: { gap: Theme.spacing.m },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    gap: Theme.spacing.m,
  },
  itemIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDetails: { flex: 1 },
  itemName: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold', marginBottom: 4 },
  itemPrice: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  quantityControls: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  ctrlBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: Theme.typography.sizes.m,
    fontWeight: 'bold',
    width: 20,
    textAlign: 'center',
  },
  cartFloating: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    padding: Theme.spacing.l,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.m,
  },
  cartInfo: { flex: 1 },
  cartItems: { fontSize: Theme.typography.sizes.l, fontWeight: 'bold', marginBottom: 4 },
  cartDesc: { fontSize: Theme.typography.sizes.s },
  checkoutBtn: { flexShrink: 0 },
});
