import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FoodCard } from '../../components/FoodCard';
import { CategoryChip } from '../../components/CategoryChip';
import { SearchBar } from '../../components/SearchBar';
import { CartItem } from '../../components/CartItem';
import { DeliveryTracker, DeliveryStatus } from '../../components/DeliveryTracker';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useCart, CartCustomization } from '../../hooks/useCart';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useLocalSearchParams } from 'expo-router';
import { FOOD_CATEGORIES, FOOD_ITEMS, FoodItem } from '../../services/foodService';

export default function FoodOrdering() {
  const colorScheme = useColorScheme();
  const theme = 'light'; // Force light/warm theme for food UI
  const themeColors = Colors[theme];

  // AI Assistant routing filter params
  const params = useLocalSearchParams<{ filter?: string }>();

  const {
    cartItems,
    subtotal,
    taxes,
    deliveryCharge,
    grandTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Customization modal state
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);
  const [customOptions, setCustomOptions] = useState<CartCustomization>({
    extraCheese: false,
    extraSauce: false,
    noOnion: false,
    lessSpicy: false,
    specialInstructions: '',
  });

  // UI state: MENU, CART, CHECKOUT, TRACKING
  const [currentStep, setCurrentStep] = useState<'MENU' | 'CART' | 'CHECKOUT' | 'TRACKING'>('MENU');

  // Checkout options
  const [paymentMethod, setPaymentMethod] = useState<
    'WALLET' | 'CARD' | 'APPLE_PAY' | 'GOOGLE_PAY'
  >('WALLET');

  // Order tracking status
  const [orderStatus, setOrderStatus] = useState<DeliveryStatus>('PREPARING');
  const [estDeliveryTime, setEstDeliveryTime] = useState(12);

  // Hook query parameters from assistant
  useEffect(() => {
    if (params?.filter) {
      const query = params.filter;
      setSearchQuery(query);
      // If matches exact category, activate category chip
      const catMatch = FOOD_CATEGORIES.find((c) => c.toLowerCase() === query.toLowerCase());
      if (catMatch) {
        setSelectedCategory(catMatch);
      }
    }
  }, [params]);

  // Menu items list matching current category and search query
  const itemsToDisplay = FOOD_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = searchQuery
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const handleOpenCustomize = (item: FoodItem) => {
    setSelectedFoodItem(item);
    setCustomOptions({
      extraCheese: false,
      extraSauce: false,
      noOnion: false,
      lessSpicy: false,
      specialInstructions: '',
    });
  };

  const handleConfirmAdd = () => {
    if (selectedFoodItem) {
      addToCart(selectedFoodItem, customOptions, 1);
      setSelectedFoodItem(null);
      showAlert('Added to Cart', `${selectedFoodItem.name} added successfully!`);
    }
  };

  const handlePlaceOrder = () => {
    setCurrentStep('TRACKING');
    setOrderStatus('PREPARING');
    setEstDeliveryTime(12);
  };

  // Mock Delivery Progress Trigger
  useEffect(() => {
    if (currentStep === 'TRACKING') {
      const t1 = setTimeout(() => {
        setOrderStatus('COOKING');
        setEstDeliveryTime(9);
      }, 4000);
      const t2 = setTimeout(() => {
        setOrderStatus('SHIPPED');
        setEstDeliveryTime(5);
      }, 8000);
      const t3 = setTimeout(() => {
        setOrderStatus('DELIVERED');
        setEstDeliveryTime(0);
      }, 12000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [currentStep]);

  const showAlert = (title: string, msg: string) => {
    if (Platform.OS === 'web') {
      alert(`${title}\n\n${msg}`);
    } else {
      Alert.alert(title, msg);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FCF8F5' }]}>
      <Header
        title={
          currentStep === 'MENU'
            ? 'Smart Concessions'
            : currentStep === 'CART'
              ? 'Shopping Cart'
              : currentStep === 'CHECKOUT'
                ? 'Payment Checkout'
                : 'Delivery Progress'
        }
      />

      {currentStep === 'MENU' && (
        <>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

          <View style={styles.categoriesWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}>
              <CategoryChip
                label="All Menus"
                isActive={selectedCategory === null}
                onPress={() => setSelectedCategory(null)}
              />
              {FOOD_CATEGORIES.map((cat) => (
                <CategoryChip
                  key={cat}
                  label={cat}
                  isActive={selectedCategory === cat}
                  onPress={() => setSelectedCategory(cat)}
                />
              ))}
            </ScrollView>
          </View>

          <ScrollView contentContainerStyle={styles.menuGrid} showsVerticalScrollIndicator={false}>
            {itemsToDisplay.map((item) => (
              <FoodCard key={item.id} item={item} onPress={() => handleOpenCustomize(item)} />
            ))}
          </ScrollView>

          {/* Floating Cart Button */}
          {cartItems.length > 0 && (
            <Animated.View entering={SlideInDown} style={styles.floatingCartWrapper}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setCurrentStep('CART')}
                style={[styles.floatingCart, { backgroundColor: themeColors.tint }]}>
                <View style={styles.cartBtnRow}>
                  <MaterialCommunityIcons name="cart-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.cartCount}>
                    {cartItems.reduce((a, b) => a + b.quantity, 0)} Items
                  </Text>
                </View>
                <Text style={styles.cartPrice}>View Cart • ${subtotal.toFixed(2)}</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Customize Modal Overlay Sheet */}
          {selectedFoodItem && (
            <View style={styles.modalOverlay}>
              <GlassCard style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: themeColors.text }]}>
                    Customize Order
                  </Text>
                  <TouchableOpacity onPress={() => setSelectedFoodItem(null)}>
                    <MaterialCommunityIcons name="close" size={22} color={themeColors.text} />
                  </TouchableOpacity>
                </View>

                <Text style={[styles.modalItemName, { color: themeColors.tint }]}>
                  {selectedFoodItem.name}
                </Text>
                <Text style={[styles.modalDesc, { color: themeColors.icon }]}>
                  {selectedFoodItem.description}
                </Text>

                {/* Options Switches */}
                <View style={styles.addonsList}>
                  <TouchableOpacity
                    onPress={() =>
                      setCustomOptions((prev) => ({ ...prev, extraCheese: !prev.extraCheese }))
                    }
                    style={[styles.addonRow, { borderBottomColor: themeColors.border }]}>
                    <Text style={[styles.addonLabel, { color: themeColors.text }]}>
                      🧀 Extra Cheese
                    </Text>
                    <MaterialCommunityIcons
                      name={
                        customOptions.extraCheese ? 'checkbox-marked' : 'checkbox-blank-outline'
                      }
                      size={20}
                      color={themeColors.tint}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setCustomOptions((prev) => ({ ...prev, extraSauce: !prev.extraSauce }))
                    }
                    style={[styles.addonRow, { borderBottomColor: themeColors.border }]}>
                    <Text style={[styles.addonLabel, { color: themeColors.text }]}>
                      🥫 Extra Sauce
                    </Text>
                    <MaterialCommunityIcons
                      name={customOptions.extraSauce ? 'checkbox-marked' : 'checkbox-blank-outline'}
                      size={20}
                      color={themeColors.tint}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setCustomOptions((prev) => ({ ...prev, noOnion: !prev.noOnion }))
                    }
                    style={[styles.addonRow, { borderBottomColor: themeColors.border }]}>
                    <Text style={[styles.addonLabel, { color: themeColors.text }]}>
                      🧅 No Onion
                    </Text>
                    <MaterialCommunityIcons
                      name={customOptions.noOnion ? 'checkbox-marked' : 'checkbox-blank-outline'}
                      size={20}
                      color={themeColors.tint}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setCustomOptions((prev) => ({ ...prev, lessSpicy: !prev.lessSpicy }))
                    }
                    style={[styles.addonRow, { borderBottomColor: themeColors.border }]}>
                    <Text style={[styles.addonLabel, { color: themeColors.text }]}>
                      🌶 Less Spicy
                    </Text>
                    <MaterialCommunityIcons
                      name={customOptions.lessSpicy ? 'checkbox-marked' : 'checkbox-blank-outline'}
                      size={20}
                      color={themeColors.tint}
                    />
                  </TouchableOpacity>
                </View>

                {/* Special Instructions */}
                <TextInput
                  style={[
                    styles.instructionsInput,
                    {
                      color: themeColors.text,
                      borderColor: themeColors.border,
                      backgroundColor:
                        theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    },
                  ]}
                  placeholder="Special instructions (e.g. well done)"
                  placeholderTextColor={themeColors.icon}
                  value={customOptions.specialInstructions}
                  onChangeText={(txt) =>
                    setCustomOptions((prev) => ({ ...prev, specialInstructions: txt }))
                  }
                />

                <PrimaryButton
                  title={`Add to Basket • $${selectedFoodItem.price.toFixed(2)}`}
                  onPress={handleConfirmAdd}
                  style={styles.modalAddBtn}
                />
              </GlassCard>
            </View>
          )}
        </>
      )}

      {currentStep === 'CART' && (
        <View style={styles.cartContainer}>
          <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false}>
            {cartItems.map((item) => (
              <CartItem
                key={`${item.foodItem.id}-${JSON.stringify(item.customization)}`}
                item={item}
                onUpdateQty={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </ScrollView>

          {/* Pricing totals summary block */}
          <GlassCard style={styles.summaryCard}>
            <View style={styles.priceRow}>
              <Text style={[styles.summaryLabel, { color: themeColors.icon }]}>Subtotal</Text>
              <Text style={[styles.summaryVal, { color: themeColors.text }]}>
                ${subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={[styles.summaryLabel, { color: themeColors.icon }]}>Taxes (8%)</Text>
              <Text style={[styles.summaryVal, { color: themeColors.text }]}>
                ${taxes.toFixed(2)}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={[styles.summaryLabel, { color: themeColors.icon }]}>
                In-Seat Delivery
              </Text>
              <Text style={[styles.summaryVal, { color: themeColors.text }]}>
                ${deliveryCharge.toFixed(2)}
              </Text>
            </View>
            <View
              style={[
                styles.priceRow,
                styles.totalPriceRow,
                { borderTopColor: themeColors.border },
              ]}>
              <Text style={[styles.totalLabel, { color: themeColors.text }]}>Grand Total</Text>
              <Text style={[styles.totalVal, { color: themeColors.tint }]}>
                ${grandTotal.toFixed(2)}
              </Text>
            </View>
          </GlassCard>

          <View style={styles.cartActions}>
            <TouchableOpacity
              onPress={() => setCurrentStep('MENU')}
              style={[
                styles.backBtn,
                { borderColor: themeColors.border, backgroundColor: themeColors.card },
              ]}>
              <Text style={[styles.backBtnText, { color: themeColors.text }]}>Keep Adding</Text>
            </TouchableOpacity>
            <PrimaryButton
              title="Proceed to Checkout"
              onPress={() => setCurrentStep('CHECKOUT')}
              style={styles.checkoutBtn}
            />
          </View>
        </View>
      )}

      {currentStep === 'CHECKOUT' && (
        <View style={styles.cartContainer}>
          <ScrollView style={styles.checkoutBody} showsVerticalScrollIndicator={false}>
            {/* Delivery location address */}
            <GlassCard style={styles.checkoutCard}>
              <Text style={[styles.checkTitle, { color: themeColors.text }]}>
                Delivery Destination
              </Text>
              <View style={styles.destBox}>
                <MaterialCommunityIcons name="seat" size={24} color={themeColors.tint} />
                <View>
                  <Text style={[styles.destSeat, { color: themeColors.text }]}>
                    Section 112, Row M, Seat 42
                  </Text>
                  <Text style={[styles.destSub, { color: themeColors.icon }]}>
                    MetLife Stadium Smart Seat
                  </Text>
                </View>
              </View>
            </GlassCard>

            {/* Payment Method Selector */}
            <GlassCard style={[styles.checkoutCard, { marginTop: Theme.spacing.m }]}>
              <Text style={[styles.checkTitle, { color: themeColors.text }]}>
                Cashless Payment Method
              </Text>
              <View style={styles.paymentList}>
                <TouchableOpacity
                  onPress={() => setPaymentMethod('WALLET')}
                  style={[styles.paymentRow, { borderBottomColor: themeColors.border }]}>
                  <MaterialCommunityIcons name="wallet" size={20} color={themeColors.tint} />
                  <Text style={[styles.addonLabel, { color: themeColors.text }]}>
                    Stadium Cashless Wallet
                  </Text>
                  <MaterialCommunityIcons
                    name={paymentMethod === 'WALLET' ? 'radiobox-marked' : 'radiobox-blank'}
                    size={20}
                    color={themeColors.tint}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setPaymentMethod('CARD')}
                  style={[styles.paymentRow, { borderBottomColor: themeColors.border }]}>
                  <MaterialCommunityIcons name="credit-card" size={20} color={themeColors.icon} />
                  <Text style={[styles.addonLabel, { color: themeColors.text }]}>
                    Credit / Debit Card
                  </Text>
                  <MaterialCommunityIcons
                    name={paymentMethod === 'CARD' ? 'radiobox-marked' : 'radiobox-blank'}
                    size={20}
                    color={themeColors.tint}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setPaymentMethod('APPLE_PAY')}
                  style={[styles.paymentRow, { borderBottomColor: themeColors.border }]}>
                  <MaterialCommunityIcons name="apple" size={20} color={themeColors.icon} />
                  <Text style={[styles.addonLabel, { color: themeColors.text }]}>Apple Pay</Text>
                  <MaterialCommunityIcons
                    name={paymentMethod === 'APPLE_PAY' ? 'radiobox-marked' : 'radiobox-blank'}
                    size={20}
                    color={themeColors.tint}
                  />
                </TouchableOpacity>
              </View>
            </GlassCard>
          </ScrollView>

          <View style={styles.cartActions}>
            <TouchableOpacity
              onPress={() => setCurrentStep('CART')}
              style={[
                styles.backBtn,
                { borderColor: themeColors.border, backgroundColor: themeColors.card },
              ]}>
              <Text style={[styles.backBtnText, { color: themeColors.text }]}>Back to Cart</Text>
            </TouchableOpacity>
            <PrimaryButton
              title={`Pay & Order • $${grandTotal.toFixed(2)}`}
              onPress={handlePlaceOrder}
              style={styles.checkoutBtn}
            />
          </View>
        </View>
      )}

      {currentStep === 'TRACKING' && (
        <ScrollView
          contentContainerStyle={styles.trackingContainer}
          showsVerticalScrollIndicator={false}>
          <DeliveryTracker
            status={orderStatus}
            seat="Sec 112, Row M, Seat 42"
            estMinutes={estDeliveryTime}
          />
          <PrimaryButton
            title="Return to Menu"
            onPress={() => {
              clearCart();
              setCurrentStep('MENU');
            }}
            style={styles.doneBtn}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  categoriesWrapper: { paddingVertical: Theme.spacing.s },
  categoriesScroll: { paddingHorizontal: Theme.spacing.l },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.l,
    paddingBottom: 120,
  },
  floatingCartWrapper: { position: 'absolute', bottom: 70, left: 16, right: 16 },
  floatingCart: {
    padding: Theme.spacing.m,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cartBtnRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cartCount: { color: '#FFFFFF', fontWeight: 'bold', fontSize: Theme.typography.sizes.s },
  cartPrice: { color: '#FFFFFF', fontWeight: 'bold', fontSize: Theme.typography.sizes.s },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: Theme.spacing.l,
    zIndex: 100,
  },
  modalCard: { padding: Theme.spacing.l, borderRadius: 24, gap: Theme.spacing.s },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold' },
  modalItemName: { fontSize: Theme.typography.sizes.l, fontWeight: '900', marginTop: 4 },
  modalDesc: { fontSize: Theme.typography.sizes.s, lineHeight: 18, marginBottom: Theme.spacing.s },
  addonsList: { gap: 2, marginBottom: Theme.spacing.s },
  addonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  addonLabel: { fontSize: Theme.typography.sizes.s, fontWeight: '600' },
  instructionsInput: {
    padding: Theme.spacing.m,
    borderRadius: 16,
    borderWidth: 1,
    fontSize: Theme.typography.sizes.s,
    height: 44,
    marginBottom: Theme.spacing.m,
  },
  modalAddBtn: { width: '100%' },

  cartContainer: { flex: 1, padding: Theme.spacing.l, gap: Theme.spacing.m },
  cartList: { flex: 1 },
  summaryCard: { padding: Theme.spacing.m, borderRadius: 20, gap: 10 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  summaryVal: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  totalPriceRow: { borderTopWidth: 1, paddingTop: Theme.spacing.s, marginTop: 4 },
  totalLabel: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold' },
  totalVal: { fontSize: Theme.typography.sizes.m, fontWeight: '900' },
  cartActions: { flexDirection: 'row', gap: Theme.spacing.s, paddingBottom: 60 },
  backBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
  },
  backBtnText: { fontWeight: 'bold', fontSize: Theme.typography.sizes.s },
  checkoutBtn: { flex: 1.5 },

  checkoutBody: { flex: 1 },
  checkoutCard: { padding: Theme.spacing.m, borderRadius: 20, gap: Theme.spacing.m },
  checkTitle: { fontSize: Theme.typography.sizes.m - 2, fontWeight: 'bold' },
  destBox: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.m },
  destSeat: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  destSub: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold', opacity: 0.6 },
  paymentList: { gap: 2 },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: Theme.spacing.m,
  },

  trackingContainer: { padding: Theme.spacing.l, gap: Theme.spacing.m, paddingBottom: 100 },
  doneBtn: { width: '100%', marginTop: Theme.spacing.m },
});
