import { useState, useCallback } from 'react';
import { FoodItem } from '../services/foodService';

export interface CartCustomization {
  extraCheese: boolean;
  noOnion: boolean;
  extraSauce: boolean;
  lessSpicy: boolean;
  specialInstructions: string;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  customization: CartCustomization;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback(
    (foodItem: FoodItem, customization: CartCustomization, qty: number = 1) => {
      setCartItems((prev) => {
        const existingIdx = prev.findIndex(
          (item) =>
            item.foodItem.id === foodItem.id &&
            JSON.stringify(item.customization) === JSON.stringify(customization)
        );

        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx].quantity += qty;
          return updated;
        } else {
          return [...prev, { foodItem, quantity: qty, customization }];
        }
      });
    },
    []
  );

  const updateQuantity = useCallback(
    (foodId: string, customization: CartCustomization, delta: number) => {
      setCartItems((prev) => {
        return prev
          .map((item) => {
            if (
              item.foodItem.id === foodId &&
              JSON.stringify(item.customization) === JSON.stringify(customization)
            ) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter((item): item is CartItem => item !== null);
      });
    },
    []
  );

  const removeFromCart = useCallback((foodId: string, customization: CartCustomization) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.foodItem.id === foodId &&
            JSON.stringify(item.customization) === JSON.stringify(customization)
          )
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Price calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.foodItem.price * item.quantity, 0);
  const taxes = subtotal * 0.08; // 8% sales tax
  const deliveryCharge = subtotal > 0 ? 3.5 : 0; // Flat in-seat delivery fee
  const grandTotal = subtotal + taxes + deliveryCharge;

  return {
    cartItems,
    subtotal,
    taxes,
    deliveryCharge,
    grandTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
};
