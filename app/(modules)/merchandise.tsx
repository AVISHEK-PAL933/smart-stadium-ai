import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  FadeInUp,
  FadeInDown,
  SlideInRight,
} from 'react-native-reanimated';
import { AnimatedBackground } from '../../components/AnimatedBackground';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab =
  'STORE' | 'PRODUCT' | 'CUSTOMIZE' | 'CART' | 'CHECKOUT' | 'ORDERS' | 'REVIEWS' | 'FLASH' | 'AI';

interface Product {
  id: string;
  name: string;
  team: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  stock: number;
  icon: string;
  badge?: string;
  description: string;
  limited?: boolean;
}

interface CartItem {
  product: Product;
  qty: number;
  customName?: string;
  customNumber?: string;
}

interface Order {
  id: string;
  date: string;
  items: string;
  total: number;
  status: 'placed' | 'packed' | 'shipped' | 'out_delivery' | 'delivered';
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 'p01',
    name: 'Brazil Home Jersey 2026',
    team: 'Brazil',
    category: 'Jersey',
    price: 89,
    originalPrice: 120,
    discount: 26,
    rating: 4.8,
    reviews: 2341,
    stock: 48,
    icon: 'tshirt-crew',
    badge: 'BEST SELLER',
    description:
      'Official FIFA 2026 Brazil home jersey. Moisture-wicking fabric, embroidered badge, and slim-fit design.',
    limited: false,
  },
  {
    id: 'p02',
    name: 'Argentina Away Jersey',
    team: 'Argentina',
    category: 'Jersey',
    price: 85,
    originalPrice: 110,
    discount: 23,
    rating: 4.7,
    reviews: 1892,
    stock: 31,
    icon: 'tshirt-crew',
    badge: 'TOP RATED',
    description:
      'Official Argentina away jersey with light blue stripes. Comfortable polyester blend.',
    limited: false,
  },
  {
    id: 'p03',
    name: 'FIFA 2026™ Match Ball',
    team: 'FIFA',
    category: 'Football',
    price: 149,
    originalPrice: 200,
    discount: 25,
    rating: 4.9,
    reviews: 870,
    stock: 12,
    icon: 'soccer',
    badge: 'LIMITED',
    description:
      'Official FIFA World Cup 2026 match ball. Thermally bonded panels for consistent flight.',
    limited: true,
  },
  {
    id: 'p04',
    name: 'World Cup 2026 Scarf',
    team: 'FIFA',
    category: 'Scarf',
    price: 24,
    originalPrice: 35,
    discount: 31,
    rating: 4.5,
    reviews: 3210,
    stock: 200,
    icon: 'scarf',
    description: 'Knitted team scarf in official World Cup 2026 colors. Warm and stylish.',
    limited: false,
  },
  {
    id: 'p05',
    name: 'France Champions Cap',
    team: 'France',
    category: 'Cap',
    price: 32,
    originalPrice: 45,
    discount: 29,
    rating: 4.4,
    reviews: 980,
    stock: 75,
    icon: 'hat-fedora',
    description: 'Embroidered France national team cap with adjustable strap.',
    limited: false,
  },
  {
    id: 'p06',
    name: 'Gold Edition Collector Ball',
    team: 'FIFA',
    category: 'Collectible',
    price: 299,
    originalPrice: 400,
    discount: 25,
    rating: 5.0,
    reviews: 142,
    stock: 5,
    icon: 'trophy',
    badge: '⭐ EXCLUSIVE',
    description:
      'Gold-plated collector edition FIFA 2026 ball. Hand-signed by legends. Certificate of authenticity included.',
    limited: true,
  },
  {
    id: 'p07',
    name: 'Stadium Sneakers Pro',
    team: 'FIFA',
    category: 'Shoes',
    price: 119,
    originalPrice: 160,
    discount: 26,
    rating: 4.6,
    reviews: 567,
    stock: 29,
    icon: 'shoe-sneaker',
    description: 'FIFA 2026 official co-branded sneakers. Cushioned sole, breathable mesh upper.',
    limited: false,
  },
  {
    id: 'p08',
    name: 'Spain Flag 150x90cm',
    team: 'Spain',
    category: 'Flag',
    price: 18,
    originalPrice: 25,
    discount: 28,
    rating: 4.3,
    reviews: 1540,
    stock: 300,
    icon: 'flag',
    description: 'High-quality polyester Spanish national team flag. Perfect for stadium cheering.',
    limited: false,
  },
  {
    id: 'p09',
    name: 'England Away Jersey',
    team: 'England',
    category: 'Jersey',
    price: 82,
    originalPrice: 105,
    discount: 22,
    rating: 4.6,
    reviews: 1105,
    stock: 55,
    icon: 'tshirt-crew',
    description: 'England away jersey for 2026 World Cup. Dark navy colorway with gold trim.',
    limited: false,
  },
  {
    id: 'p10',
    name: 'FIFA Fan Wristband Set',
    team: 'FIFA',
    category: 'Accessories',
    price: 14,
    originalPrice: 20,
    discount: 30,
    rating: 4.2,
    reviews: 4200,
    stock: 1000,
    icon: 'watch',
    badge: 'POPULAR',
    description: 'Set of 3 silicone FIFA wristbands in official team colors.',
    limited: false,
  },
];

const CATEGORIES = [
  'All',
  'Jersey',
  'Football',
  'Shoes',
  'Cap',
  'Scarf',
  'Flag',
  'Accessories',
  'Collectible',
];
const TEAMS = ['All', 'Brazil', 'Argentina', 'France', 'Spain', 'England', 'FIFA'];

const REVIEWS_DATA = [
  {
    user: 'Carlos_BR',
    rating: 5,
    text: 'Amazing quality! The Brazil jersey fits perfectly and the fabric is premium.',
    verified: true,
    date: 'Jul 10',
  },
  {
    user: 'SofiaK',
    rating: 4,
    text: 'Great product. The scarf is warm and the colours are vibrant. Fast delivery!',
    verified: true,
    date: 'Jul 8',
  },
  {
    user: 'Yuki_T',
    rating: 5,
    text: 'The collector ball is absolutely stunning. Worth every penny.',
    verified: false,
    date: 'Jul 6',
  },
  {
    user: 'PriyaS',
    rating: 4,
    text: 'Nice quality cap. Adjustable strap is comfortable. Would recommend!',
    verified: true,
    date: 'Jul 5',
  },
  {
    user: 'Marco_R',
    rating: 3,
    text: 'Decent product but delivery was slower than expected. Product itself is good.',
    verified: true,
    date: 'Jul 3',
  },
];

const ORDER_HISTORY: Order[] = [
  { id: 'ORD-7821', date: 'Jul 11', items: 'Brazil Jersey × 1', total: 89, status: 'shipped' },
  { id: 'ORD-7654', date: 'Jul 8', items: 'FIFA Wristbands × 2', total: 28, status: 'delivered' },
  { id: 'ORD-7412', date: 'Jul 5', items: 'World Cup Scarf × 1', total: 24, status: 'delivered' },
];

const FLASH_SALE_ITEMS = [
  {
    id: 'f1',
    name: 'Germany Jersey FLASH',
    originalPrice: 95,
    salePrice: 52,
    icon: 'tshirt-crew',
    stock: 8,
  },
  {
    id: 'f2',
    name: 'FIFA Cap Bundle',
    originalPrice: 60,
    salePrice: 29,
    icon: 'hat-fedora',
    stock: 15,
  },
  { id: 'f3', name: 'Argentina Scarf', originalPrice: 35, salePrice: 14, icon: 'scarf', stock: 3 },
  { id: 'f4', name: 'Brazil Flag XL', originalPrice: 30, salePrice: 12, icon: 'flag', stock: 20 },
];

const AI_SUGGESTIONS = [
  {
    icon: '🇧🇷',
    q: 'Recommend Brazil products',
    a: "Based on your fan profile, here are top Brazil picks: Brazil Home Jersey 2026 (⭐4.8 - $89), Brazil Flag ($18), and FIFA 2026 Match Ball ($149). The jersey is this week's best seller!",
  },
  {
    icon: '💰',
    q: 'Best deals under $50',
    a: 'Top deals under $50: FIFA Fan Wristband Set ($14), Spain Flag ($18), World Cup Scarf ($24), and France Champions Cap ($32). All have 20%+ discounts today!',
  },
  {
    icon: '🎁',
    q: 'Suggest a gift',
    a: 'For a football fan, I recommend the Gold Edition Collector Ball ($299) for a premium gift, or the FIFA Wristband Set ($14) for a budget-friendly option. Both ship in 2 days!',
  },
  {
    icon: '⭐',
    q: 'Highest rated items',
    a: 'Highest rated products: Gold Collector Ball (5.0⭐), FIFA Match Ball (4.9⭐), Brazil Jersey (4.8⭐). These are community fan-favorites with thousands of verified reviews.',
  },
  {
    icon: '🏆',
    q: 'Limited edition items',
    a: "Limited stock alert! Gold Edition Collector Ball (5 left), FIFA Match Ball (12 left). Once gone, they won't be restocked. Order now to avoid missing out!",
  },
];

const FONTS = ['Classic', 'Block', 'Script', 'Modern', 'Retro'];
const JERSEY_COLORS = ['#009C3B', '#74ACDF', '#002395', '#C60B1E', '#FFFFFF', '#000000'];

// ─── Star Rating Component ────────────────────────────────────────────────────

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <MaterialCommunityIcons
          key={s}
          name={s <= Math.round(rating) ? 'star' : 'star-outline'}
          size={size}
          color="#FFD700"
        />
      ))}
    </View>
  );
}

// ─── Product Card Component ───────────────────────────────────────────────────

function ProductCard({
  product,
  onPress,
  onAddCart,
  onWishlist,
  wishlisted,
}: {
  product: Product;
  onPress: () => void;
  onAddCart: () => void;
  onWishlist: () => void;
  wishlisted: boolean;
}) {
  const { theme, themeColors } = useGlobalContext();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePress = () => {
    scale.value = withSequence(withSpring(0.95), withSpring(1));
    onPress();
  };

  return (
    <Animated.View style={[animStyle, styles.productCardWrap]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
        <GlassCard style={styles.productCard}>
          {/* Badge */}
          {product.badge && (
            <View style={styles.productBadge}>
              <Text style={styles.productBadgeText}>{product.badge}</Text>
            </View>
          )}
          {/* Discount badge */}
          <View style={styles.discountBadge}>
            <Text style={styles.discountBadgeText}>-{product.discount}%</Text>
          </View>
          {/* Wishlist */}
          <TouchableOpacity onPress={onWishlist} style={styles.wishlistBtn}>
            <MaterialCommunityIcons
              name={wishlisted ? 'heart' : 'heart-outline'}
              size={20}
              color={wishlisted ? '#FF5252' : themeColors.icon}
            />
          </TouchableOpacity>
          {/* Icon */}
          <View style={[styles.productIconWrap, { backgroundColor: themeColors.tint + '15' }]}>
            <MaterialCommunityIcons name={product.icon as any} size={48} color={themeColors.tint} />
          </View>
          {/* Info */}
          <Text style={[styles.productName, { color: themeColors.text }]} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={[styles.productTeam, { color: themeColors.icon }]}>{product.team}</Text>
          <StarRating rating={product.rating} />
          <Text style={[styles.productReviews, { color: themeColors.icon }]}>
            ({product.reviews.toLocaleString()})
          </Text>
          <View style={styles.priceRow}>
            <Text style={[styles.productPrice, { color: themeColors.tint }]}>${product.price}</Text>
            <Text style={[styles.productOriginalPrice, { color: themeColors.icon }]}>
              ${product.originalPrice}
            </Text>
          </View>
          {product.stock < 20 && <Text style={styles.lowStock}>⚠ Only {product.stock} left!</Text>}
          <TouchableOpacity
            onPress={onAddCart}
            style={[styles.addCartBtn, { backgroundColor: themeColors.tint }]}>
            <MaterialCommunityIcons name="cart-plus" size={16} color="#FFF" />
            <Text style={styles.addCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </GlassCard>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Order Timeline Component ─────────────────────────────────────────────────

const ORDER_STEPS = [
  { key: 'placed', label: 'Order Placed', icon: 'receipt' },
  { key: 'packed', label: 'Packed', icon: 'package-variant-closed' },
  { key: 'shipped', label: 'Shipped', icon: 'truck-delivery' },
  { key: 'out_delivery', label: 'Out for Delivery', icon: 'moped' },
  { key: 'delivered', label: 'Delivered', icon: 'check-circle' },
];

function OrderTimeline({ status }: { status: Order['status'] }) {
  const { theme, themeColors } = useGlobalContext();
  const currentIdx = ORDER_STEPS.findIndex((s) => s.key === status);

  return (
    <View style={styles.timeline}>
      {ORDER_STEPS.map((step, i) => {
        const done = i <= currentIdx;
        const active = i === currentIdx;
        return (
          <View key={step.key} style={styles.timelineRow}>
            <View style={styles.timelineLeft}>
              <View
                style={[
                  styles.timelineDot,
                  {
                    backgroundColor: done
                      ? active
                        ? themeColors.tint
                        : '#00E676'
                      : themeColors.border,
                    borderColor: done
                      ? active
                        ? themeColors.tint
                        : '#00E676'
                      : themeColors.border,
                  },
                ]}>
                <MaterialCommunityIcons
                  name={step.icon as any}
                  size={14}
                  color={done ? '#FFF' : themeColors.icon}
                />
              </View>
              {i < ORDER_STEPS.length - 1 && (
                <View
                  style={[
                    styles.timelineLine,
                    { backgroundColor: i < currentIdx ? '#00E676' : themeColors.border },
                  ]}
                />
              )}
            </View>
            <Text
              style={[
                styles.timelineLabel,
                {
                  color: done ? themeColors.text : themeColors.icon,
                  fontWeight: active ? '900' : '500',
                },
              ]}>
              {step.label}
              {active && ' ●'}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

// ─── Flash Sale Timer Component ───────────────────────────────────────────────

function FlashTimer() {
  const [seconds, setSeconds] = useState(3600 * 4 + 23 * 60 + 17); // 4h 23m 17s

  React.useEffect(() => {
    const iv = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(iv);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <View style={styles.timerRow}>
      {[`${pad(h)}h`, `${pad(m)}m`, `${pad(s)}s`].map((unit, i) => (
        <View key={i} style={styles.timerUnit}>
          <Text style={styles.timerNum}>{unit.slice(0, -1)}</Text>
          <Text style={styles.timerLabel}>{unit.slice(-1).toUpperCase()}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function MerchandiseStore() {
  const { theme, themeColors } = useGlobalContext();

  const [activeTab, setActiveTab] = useState<Tab>('STORE');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);

  // Store filters
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTeam, setSelectedTeam] = useState('All');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'discount'>('rating');

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Checkout
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  // Customize jersey
  const [customName, setCustomName] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [customFont, setCustomFont] = useState('Classic');
  const [customColor, setCustomColor] = useState('#009C3B');

  // AI assistant
  const [aiInput, setAiInput] = useState('');
  const [aiHistory, setAiHistory] = useState<{ q: string; a: string; icon?: string }[]>([
    {
      q: '',
      a: '🛍 Welcome to the AI Shopping Assistant! I can recommend products, find deals, compare items, and suggest gifts. What are you looking for?',
      icon: '🤖',
    },
  ]);

  // Reviews
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  // Computed
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchText.toLowerCase()) ||
      p.team.toLowerCase().includes(searchText.toLowerCase());
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchTeam = selectedTeam === 'All' || p.team === selectedTeam;
    return matchSearch && matchCat && matchTeam;
  }).sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'discount') return b.discount - a.discount;
    return b.rating - a.rating;
  });

  const cartSubtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const couponDiscount = couponApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const deliveryCharge = cartSubtotal > 100 ? 0 : 8.99;
  const tax = Math.round((cartSubtotal - couponDiscount) * 0.08);
  const grandTotal = cartSubtotal - couponDiscount + tax + deliveryCharge;

  const addToCart = useCallback((product: Product, customName?: string, customNumber?: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing)
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { product, qty: 1, customName, customNumber }];
    });
    Alert.alert('✅ Added to Cart', `${product.name} has been added to your cart!`);
  }, []);

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  const sendAI = useCallback(() => {
    if (!aiInput.trim()) return;
    const q = aiInput.trim();
    setAiInput('');
    const suggestion = AI_SUGGESTIONS.find(
      (s) =>
        s.q.toLowerCase().includes(q.toLowerCase().slice(0, 5)) ||
        q.toLowerCase().includes(s.q.toLowerCase().slice(0, 6))
    );
    const answer = suggestion
      ? suggestion.a
      : `Great question! Let me help you find the perfect FIFA merchandise. Try asking about specific teams (Brazil, Argentina, France), price ranges, or product types like jerseys, balls, or collectibles. You can also say "best deals" or "limited edition" to see exclusive offers!`;
    setAiHistory((h) => [...h, { q, a: answer }]);
  }, [aiInput]);

  const placeOrder = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Add items to your cart first.');
      return;
    }
    const ref = `ORD-${Math.floor(8000 + Math.random() * 999)}`;
    setOrderRef(ref);
    setOrderPlaced(true);
    setCart([]);
  };

  // ── Tabs ──────────────────────────────────────────────────────────────────

  const TABS: { key: Tab; label: string; icon: string; badge?: number }[] = [
    { key: 'STORE', label: 'Store', icon: 'storefront' },
    { key: 'PRODUCT', label: 'Details', icon: 'information' },
    { key: 'CUSTOMIZE', label: 'Customize', icon: 'palette' },
    {
      key: 'CART',
      label: 'Cart',
      icon: 'cart',
      badge: cart.length > 0 ? cart.reduce((s, i) => s + i.qty, 0) : undefined,
    },
    { key: 'CHECKOUT', label: 'Checkout', icon: 'credit-card' },
    { key: 'ORDERS', label: 'Orders', icon: 'package-variant' },
    { key: 'REVIEWS', label: 'Reviews', icon: 'star-box' },
    { key: 'FLASH', label: 'Flash Sale', icon: 'lightning-bolt' },
    { key: 'AI', label: 'AI Shop', icon: 'robot' },
  ];

  // ── Render Store ──────────────────────────────────────────────────────────

  const renderStore = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Hero Banner */}
      <Animated.View entering={FadeInDown.duration(500)}>
        <LinearGradient
          colors={['rgba(124,77,255,0.35)', 'rgba(0,200,255,0.15)']}
          style={styles.heroBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <MaterialCommunityIcons name="shopping" size={36} color="#FFD700" />
          <Text style={styles.heroTitle}>FIFA World Cup 2026™</Text>
          <Text style={styles.heroSub}>Official Merchandise Store</Text>
          <View style={styles.heroBadgeRow}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>🚚 Free Delivery Over $100</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>✅ Authentic Products</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Search & Filters */}
      <GlassCard style={styles.searchCard}>
        <View
          style={[
            styles.searchBar,
            { backgroundColor: themeColors.background, borderColor: themeColors.border },
          ]}>
          <MaterialCommunityIcons name="magnify" size={20} color={themeColors.icon} />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search jerseys, balls, collectibles…"
            placeholderTextColor={themeColors.icon}
            style={[styles.searchInput, { color: themeColors.text }]}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <MaterialCommunityIcons name="close-circle" size={18} color={themeColors.icon} />
            </TouchableOpacity>
          )}
        </View>
        {/* Mock Voice / Image search */}
        <View style={styles.searchIcons}>
          <TouchableOpacity
            onPress={() => Alert.alert('🎙 Voice Search', 'Listening… say a product name or team')}
            style={[
              styles.searchIconBtn,
              { backgroundColor: '#7C4DFF20', borderColor: '#7C4DFF' },
            ]}>
            <MaterialCommunityIcons name="microphone" size={18} color="#7C4DFF" />
            <Text style={[styles.searchIconText, { color: '#7C4DFF' }]}>Voice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert('📷 Image Search', 'Point camera at a product to find similar items')
            }
            style={[
              styles.searchIconBtn,
              { backgroundColor: '#00C8FF20', borderColor: '#00C8FF' },
            ]}>
            <MaterialCommunityIcons name="camera" size={18} color="#00C8FF" />
            <Text style={[styles.searchIconText, { color: '#00C8FF' }]}>Image</Text>
          </TouchableOpacity>
        </View>
      </GlassCard>

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.filterChip,
              selectedCategory === cat
                ? { backgroundColor: themeColors.tint, borderColor: themeColors.tint }
                : { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <Text
              style={[
                styles.filterChipText,
                { color: selectedCategory === cat ? '#FFF' : themeColors.text },
              ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Team & Sort Row */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TEAMS.map((team) => (
            <TouchableOpacity
              key={team}
              onPress={() => setSelectedTeam(team)}
              style={[
                styles.teamChip,
                selectedTeam === team
                  ? { backgroundColor: '#7C4DFF', borderColor: '#7C4DFF' }
                  : { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}>
              <Text
                style={[
                  styles.teamChipText,
                  { color: selectedTeam === team ? '#FFF' : themeColors.text },
                ]}>
                {team}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Sort */}
        <View style={styles.sortRow}>
          {(['rating', 'price', 'discount'] as const).map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setSortBy(s)}
              style={[
                styles.sortChip,
                sortBy === s
                  ? { backgroundColor: '#00C8FF20', borderColor: '#00C8FF' }
                  : { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}>
              <Text
                style={[
                  styles.sortChipText,
                  { color: sortBy === s ? '#00C8FF' : themeColors.icon },
                ]}>
                {s === 'rating' ? '⭐' : s === 'price' ? '💲' : '🏷'}{' '}
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Results count */}
      <Text style={[styles.resultCount, { color: themeColors.icon }]}>
        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
      </Text>

      {/* AI Recommendations Banner */}
      <GlassCard style={styles.aiRecBanner}>
        <MaterialCommunityIcons name="robot" size={20} color="#7C4DFF" />
        <View style={{ flex: 1 }}>
          <Text style={[styles.aiRecTitle, { color: themeColors.text }]}>AI Recommendation</Text>
          <Text style={[styles.aiRecSub, { color: themeColors.icon }]}>
            Based on your Brazil fan profile & match ticket — Brazil Jersey 2026 is top pick!
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setSelectedProduct(PRODUCTS[0]);
            setActiveTab('PRODUCT');
          }}
          style={[styles.aiRecBtn, { backgroundColor: '#7C4DFF' }]}>
          <Text style={styles.aiRecBtnText}>View</Text>
        </TouchableOpacity>
      </GlassCard>

      {/* Product Grid */}
      <View style={styles.productGrid}>
        {filteredProducts.map((product, i) => (
          <Animated.View key={product.id} entering={FadeInUp.delay(i * 60)}>
            <ProductCard
              product={product}
              onPress={() => {
                setSelectedProduct(product);
                setActiveTab('PRODUCT');
              }}
              onAddCart={() => addToCart(product)}
              onWishlist={() => toggleWishlist(product.id)}
              wishlisted={wishlist.has(product.id)}
            />
          </Animated.View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  // ── Render Product Detail ─────────────────────────────────────────────────

  const renderProduct = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        {/* Image area */}
        <LinearGradient
          colors={['rgba(124,77,255,0.2)', 'rgba(0,200,255,0.1)']}
          style={styles.productDetailHero}>
          {selectedProduct.badge && (
            <View style={styles.detailBadge}>
              <Text style={styles.detailBadgeText}>{selectedProduct.badge}</Text>
            </View>
          )}
          <MaterialCommunityIcons
            name={selectedProduct.icon as any}
            size={100}
            color={themeColors.tint}
          />
          <View style={styles.discountCircle}>
            <Text style={styles.discountCircleText}>-{selectedProduct.discount}%</Text>
          </View>
        </LinearGradient>

        {/* Details */}
        <GlassCard style={styles.detailCard}>
          <Text style={[styles.detailName, { color: themeColors.text }]}>
            {selectedProduct.name}
          </Text>
          <Text style={[styles.detailTeam, { color: themeColors.icon }]}>
            {selectedProduct.team} · {selectedProduct.category}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <StarRating rating={selectedProduct.rating} size={16} />
            <Text style={[styles.detailRatingNum, { color: themeColors.tint }]}>
              {selectedProduct.rating} ({selectedProduct.reviews.toLocaleString()} reviews)
            </Text>
          </View>

          {/* Price */}
          <View style={styles.detailPriceRow}>
            <Text style={[styles.detailPrice, { color: themeColors.tint }]}>
              ${selectedProduct.price}
            </Text>
            <Text style={[styles.detailOrigPrice, { color: themeColors.icon }]}>
              ${selectedProduct.originalPrice}
            </Text>
            <View style={styles.detailDiscountBadge}>
              <Text style={styles.detailDiscountText}>
                Save ${selectedProduct.originalPrice - selectedProduct.price}
              </Text>
            </View>
          </View>

          {/* Stock */}
          <View style={[styles.stockRow, { borderColor: themeColors.border }]}>
            <MaterialCommunityIcons
              name="package-variant"
              size={16}
              color={selectedProduct.stock < 20 ? '#FF9800' : '#00E676'}
            />
            <Text
              style={[
                styles.stockText,
                { color: selectedProduct.stock < 20 ? '#FF9800' : '#00E676' },
              ]}>
              {selectedProduct.stock < 20
                ? `Only ${selectedProduct.stock} left in stock!`
                : `In Stock (${selectedProduct.stock} available)`}
            </Text>
          </View>

          {/* Description */}
          <Text style={[styles.detailSectionLabel, { color: themeColors.icon }]}>Description</Text>
          <Text style={[styles.detailDesc, { color: themeColors.text }]}>
            {selectedProduct.description}
          </Text>

          {/* Specifications */}
          <Text style={[styles.detailSectionLabel, { color: themeColors.icon }]}>
            Specifications
          </Text>
          {[
            { label: 'Material', value: 'Premium Polyester Blend' },
            { label: 'Technology', value: 'Moisture-Wicking Dri-Fit' },
            { label: 'Origin', value: 'Official FIFA Licensed' },
            { label: 'Delivery', value: '2–5 Business Days' },
            { label: 'Returns', value: '30-Day Easy Returns' },
          ].map(({ label, value }) => (
            <View key={label} style={styles.specRow}>
              <Text style={[styles.specLabel, { color: themeColors.icon }]}>{label}</Text>
              <Text style={[styles.specValue, { color: themeColors.text }]}>{value}</Text>
            </View>
          ))}

          {/* Action Buttons */}
          <View style={styles.detailActions}>
            <TouchableOpacity
              onPress={() => addToCart(selectedProduct)}
              style={styles.detailAddCart}>
              <LinearGradient
                colors={['#7C4DFF', '#00C8FF']}
                style={styles.detailAddCartGrad}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <MaterialCommunityIcons name="cart-plus" size={20} color="#FFF" />
                <Text style={styles.detailAddCartText}>ADD TO CART</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleWishlist(selectedProduct.id)}
              style={[styles.detailWishBtn, { borderColor: '#FF5252' }]}>
              <MaterialCommunityIcons
                name={wishlist.has(selectedProduct.id) ? 'heart' : 'heart-outline'}
                size={20}
                color="#FF5252"
              />
            </TouchableOpacity>
          </View>

          {/* Customize CTA */}
          {selectedProduct.category === 'Jersey' && (
            <TouchableOpacity
              onPress={() => setActiveTab('CUSTOMIZE')}
              style={[styles.customizeCTA, { borderColor: '#7C4DFF' }]}>
              <MaterialCommunityIcons name="palette" size={18} color="#7C4DFF" />
              <Text style={[styles.customizeCTAText, { color: '#7C4DFF' }]}>
                Personalize this Jersey
              </Text>
            </TouchableOpacity>
          )}
        </GlassCard>

        {/* Related Products */}
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Related Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedScroll}>
          {PRODUCTS.filter(
            (p) => p.id !== selectedProduct.id && p.category === selectedProduct.category
          )
            .slice(0, 4)
            .map((p) => (
              <TouchableOpacity
                key={p.id}
                onPress={() => setSelectedProduct(p)}
                style={[
                  styles.relatedCard,
                  { backgroundColor: themeColors.card, borderColor: themeColors.border },
                ]}>
                <MaterialCommunityIcons name={p.icon as any} size={36} color={themeColors.tint} />
                <Text style={[styles.relatedName, { color: themeColors.text }]} numberOfLines={2}>
                  {p.name}
                </Text>
                <Text style={[styles.relatedPrice, { color: themeColors.tint }]}>${p.price}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </Animated.View>
    </ScrollView>
  );

  // ── Render Customize ──────────────────────────────────────────────────────

  const renderCustomize = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          🎨 Jersey Customization
        </Text>

        {/* Live Preview */}
        <GlassCard style={styles.jerseyPreview}>
          <Text style={[styles.previewLabel, { color: themeColors.icon }]}>LIVE PREVIEW</Text>
          <View
            style={[
              styles.jerseyIcon,
              { backgroundColor: customColor + '30', borderColor: customColor },
            ]}>
            <MaterialCommunityIcons name="tshirt-crew" size={80} color={customColor} />
            {customName && (
              <Text
                style={[
                  styles.jerseyCustomName,
                  { fontFamily: undefined, color: themeColors.text },
                ]}>
                {customName.toUpperCase()}
              </Text>
            )}
            {customNumber && (
              <Text style={[styles.jerseyCustomNumber, { color: customColor }]}>
                {customNumber}
              </Text>
            )}
          </View>
          <Text style={[styles.previewFont, { color: themeColors.icon }]}>Font: {customFont}</Text>
        </GlassCard>

        {/* Name Input */}
        <GlassCard style={styles.customCard}>
          <Text style={[styles.customLabel, { color: themeColors.icon }]}>👤 Player Name</Text>
          <TextInput
            value={customName}
            onChangeText={(t) => setCustomName(t.slice(0, 14))}
            placeholder="e.g. VINICIUS JR"
            placeholderTextColor={themeColors.icon}
            style={[
              styles.customInput,
              { color: themeColors.text, borderColor: themeColors.border },
            ]}
            maxLength={14}
          />
          <Text style={[styles.customHint, { color: themeColors.icon }]}>
            {customName.length}/14 characters
          </Text>
        </GlassCard>

        {/* Number Input */}
        <GlassCard style={styles.customCard}>
          <Text style={[styles.customLabel, { color: themeColors.icon }]}>🔢 Jersey Number</Text>
          <TextInput
            value={customNumber}
            onChangeText={(t) => setCustomNumber(t.replace(/\D/g, '').slice(0, 2))}
            placeholder="e.g. 7"
            placeholderTextColor={themeColors.icon}
            keyboardType="numeric"
            style={[
              styles.customInput,
              { color: themeColors.text, borderColor: themeColors.border },
            ]}
            maxLength={2}
          />
        </GlassCard>

        {/* Font Selection */}
        <GlassCard style={styles.customCard}>
          <Text style={[styles.customLabel, { color: themeColors.icon }]}>🖊 Font Style</Text>
          <View style={styles.fontRow}>
            {FONTS.map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => setCustomFont(f)}
                style={[
                  styles.fontChip,
                  customFont === f
                    ? { backgroundColor: '#7C4DFF', borderColor: '#7C4DFF' }
                    : { backgroundColor: themeColors.card, borderColor: themeColors.border },
                ]}>
                <Text
                  style={[
                    styles.fontChipText,
                    { color: customFont === f ? '#FFF' : themeColors.text },
                  ]}>
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </GlassCard>

        {/* Color Selection */}
        <GlassCard style={styles.customCard}>
          <Text style={[styles.customLabel, { color: themeColors.icon }]}>🎨 Jersey Color</Text>
          <View style={styles.colorRow}>
            {JERSEY_COLORS.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setCustomColor(c)}
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: c,
                    borderColor: customColor === c ? '#FFD700' : 'transparent',
                  },
                ]}
              />
            ))}
          </View>
        </GlassCard>

        {/* Pricing */}
        <GlassCard style={styles.customPriceCard}>
          <View style={styles.customPriceRow}>
            <Text style={[styles.customPriceLabel, { color: themeColors.icon }]}>
              Base Jersey Price
            </Text>
            <Text style={[styles.customPriceVal, { color: themeColors.text }]}>$89.00</Text>
          </View>
          <View style={styles.customPriceRow}>
            <Text style={[styles.customPriceLabel, { color: themeColors.icon }]}>
              Custom Printing
            </Text>
            <Text style={[styles.customPriceVal, { color: themeColors.text }]}>$15.00</Text>
          </View>
          <View style={[styles.customPriceDivider, { backgroundColor: themeColors.border }]} />
          <View style={styles.customPriceRow}>
            <Text style={[styles.customPriceTotalLabel, { color: themeColors.text }]}>Total</Text>
            <Text style={[styles.customPriceTotalVal, { color: '#00E676' }]}>$104.00</Text>
          </View>
        </GlassCard>

        <TouchableOpacity
          onPress={() => {
            addToCart(PRODUCTS[0], customName, customNumber);
            setActiveTab('CART');
          }}
          style={styles.customAddBtn}>
          <LinearGradient
            colors={['#7C4DFF', '#00C8FF']}
            style={styles.customAddGrad}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <MaterialCommunityIcons name="cart-plus" size={20} color="#FFF" />
            <Text style={styles.customAddText}>ADD CUSTOM JERSEY TO CART</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{ height: 40 }} />
      </Animated.View>
    </ScrollView>
  );

  // ── Render Cart ───────────────────────────────────────────────────────────

  const renderCart = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          🛒 Shopping Cart ({cart.reduce((s, i) => s + i.qty, 0)} items)
        </Text>

        {cart.length === 0 ? (
          <GlassCard style={styles.emptyCart}>
            <Text style={styles.emptyCartEmoji}>🛒</Text>
            <Text style={[styles.emptyCartText, { color: themeColors.text }]}>
              Your cart is empty
            </Text>
            <TouchableOpacity
              onPress={() => setActiveTab('STORE')}
              style={[styles.shopNowBtn, { backgroundColor: themeColors.tint }]}>
              <Text style={styles.shopNowText}>Browse Store</Text>
            </TouchableOpacity>
          </GlassCard>
        ) : (
          <>
            {cart.map((item, i) => (
              <Animated.View key={item.product.id} entering={SlideInRight.delay(i * 60)}>
                <GlassCard style={styles.cartItem}>
                  <View style={[styles.cartIconWrap, { backgroundColor: themeColors.tint + '15' }]}>
                    <MaterialCommunityIcons
                      name={item.product.icon as any}
                      size={32}
                      color={themeColors.tint}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.cartItemName, { color: themeColors.text }]}>
                      {item.product.name}
                    </Text>
                    {item.customName && (
                      <Text style={[styles.cartItemCustom, { color: '#7C4DFF' }]}>
                        Custom: #{item.customNumber} {item.customName}
                      </Text>
                    )}
                    <Text style={[styles.cartItemPrice, { color: themeColors.tint }]}>
                      ${(item.product.price * item.qty).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      onPress={() => updateQty(item.product.id, -1)}
                      style={[styles.qtyBtn, { borderColor: themeColors.border }]}>
                      <Text style={[styles.qtyBtnText, { color: themeColors.text }]}>−</Text>
                    </TouchableOpacity>
                    <Text style={[styles.qtyNum, { color: themeColors.text }]}>{item.qty}</Text>
                    <TouchableOpacity
                      onPress={() => updateQty(item.product.id, 1)}
                      style={[styles.qtyBtn, { borderColor: themeColors.border }]}>
                      <Text style={[styles.qtyBtnText, { color: themeColors.text }]}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => removeFromCart(item.product.id)}>
                    <MaterialCommunityIcons name="trash-can-outline" size={20} color="#FF5252" />
                  </TouchableOpacity>
                </GlassCard>
              </Animated.View>
            ))}

            {/* Coupon */}
            <GlassCard style={styles.couponCard}>
              <MaterialCommunityIcons name="ticket-percent" size={20} color="#FFD700" />
              <TextInput
                value={couponCode}
                onChangeText={setCouponCode}
                placeholder="Enter coupon code"
                placeholderTextColor={themeColors.icon}
                style={[styles.couponInput, { color: themeColors.text }]}
                editable={!couponApplied}
              />
              <TouchableOpacity
                onPress={() => {
                  if (
                    couponCode.toUpperCase() === 'FIFA2026' ||
                    couponCode.toUpperCase() === 'SAVE10'
                  ) {
                    setCouponApplied(true);
                    Alert.alert(
                      '✅ Coupon Applied!',
                      '10% discount has been applied to your order.'
                    );
                  } else {
                    Alert.alert('❌ Invalid Coupon', 'Try FIFA2026 or SAVE10');
                  }
                }}
                style={[
                  styles.couponBtn,
                  { backgroundColor: couponApplied ? '#00E676' : '#7C4DFF' },
                ]}>
                <Text style={styles.couponBtnText}>{couponApplied ? 'Applied ✓' : 'Apply'}</Text>
              </TouchableOpacity>
            </GlassCard>

            {/* Price Summary */}
            <GlassCard style={styles.priceSummary}>
              <Text style={[styles.summaryTitle, { color: themeColors.text }]}>Price Summary</Text>
              {[
                { label: 'Subtotal', value: `$${cartSubtotal.toFixed(2)}` },
                {
                  label: 'Coupon Discount',
                  value: couponApplied ? `-$${couponDiscount.toFixed(2)}` : '—',
                  color: '#00E676',
                },
                { label: 'Tax (8%)', value: `$${tax.toFixed(2)}` },
                {
                  label: 'Delivery',
                  value: deliveryCharge === 0 ? 'FREE 🎉' : `$${deliveryCharge.toFixed(2)}`,
                  color: deliveryCharge === 0 ? '#00E676' : undefined,
                },
              ].map(({ label, value, color }) => (
                <View key={label} style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, { color: themeColors.icon }]}>{label}</Text>
                  <Text style={[styles.summaryValue, { color: color || themeColors.text }]}>
                    {value}
                  </Text>
                </View>
              ))}
              <View style={[styles.summaryDivider, { backgroundColor: themeColors.border }]} />
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryTotal, { color: themeColors.text }]}>Grand Total</Text>
                <Text style={[styles.summaryTotalVal, { color: '#00E676' }]}>
                  ${grandTotal.toFixed(2)}
                </Text>
              </View>
              {deliveryCharge === 0 && (
                <Text style={[styles.freeDeliveryNote, { color: '#00E676' }]}>
                  🎉 You qualified for free delivery!
                </Text>
              )}
            </GlassCard>

            <TouchableOpacity onPress={() => setActiveTab('CHECKOUT')} style={styles.checkoutBtn}>
              <LinearGradient
                colors={['#7C4DFF', '#00C8FF']}
                style={styles.checkoutBtnGrad}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <MaterialCommunityIcons name="credit-card" size={20} color="#FFF" />
                <Text style={styles.checkoutBtnText}>
                  PROCEED TO CHECKOUT · ${grandTotal.toFixed(2)}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}

        {/* Wishlist */}
        {wishlist.size > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: themeColors.text, marginTop: 24 }]}>
              ❤️ Wishlist ({wishlist.size})
            </Text>
            {PRODUCTS.filter((p) => wishlist.has(p.id)).map((p) => (
              <GlassCard key={p.id} style={styles.wishlistItem}>
                <MaterialCommunityIcons name={p.icon as any} size={28} color={themeColors.tint} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.wishlistName, { color: themeColors.text }]}>{p.name}</Text>
                  <Text style={[styles.wishlistPrice, { color: themeColors.tint }]}>
                    ${p.price}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => addToCart(p)}
                  style={[styles.wishlistAdd, { backgroundColor: themeColors.tint }]}>
                  <MaterialCommunityIcons name="cart-plus" size={16} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleWishlist(p.id)}>
                  <MaterialCommunityIcons name="heart" size={20} color="#FF5252" />
                </TouchableOpacity>
              </GlassCard>
            ))}
          </>
        )}
        <View style={{ height: 40 }} />
      </Animated.View>
    </ScrollView>
  );

  // ── Render Checkout ───────────────────────────────────────────────────────

  const renderCheckout = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        {orderPlaced ? (
          <GlassCard style={styles.orderConfirm}>
            <Text style={styles.orderConfirmEmoji}>🎉</Text>
            <Text style={[styles.orderConfirmTitle, { color: themeColors.text }]}>
              Order Confirmed!
            </Text>
            <Text style={[styles.orderConfirmRef, { color: themeColors.tint }]}>{orderRef}</Text>
            <Text style={[styles.orderConfirmMsg, { color: themeColors.icon }]}>
              Your official FIFA merchandise is packed and will be delivered in 2–5 business days.
            </Text>
            <View style={styles.orderConfirmDetails}>
              {[
                { icon: 'truck-delivery', label: 'Estimated Delivery', value: 'Jul 18–20' },
                { icon: 'map-marker', label: 'Delivery To', value: 'Stadium Gate A, VIP Zone' },
                { icon: 'credit-card', label: 'Payment', value: paymentMethod.toUpperCase() },
              ].map(({ icon, label, value }) => (
                <View key={label} style={styles.confirmDetailRow}>
                  <MaterialCommunityIcons name={icon as any} size={18} color={themeColors.tint} />
                  <Text style={[styles.confirmDetailLabel, { color: themeColors.icon }]}>
                    {label}
                  </Text>
                  <Text style={[styles.confirmDetailValue, { color: themeColors.text }]}>
                    {value}
                  </Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              onPress={() => {
                setOrderPlaced(false);
                setActiveTab('ORDERS');
              }}
              style={[styles.trackOrderBtn, { backgroundColor: '#7C4DFF' }]}>
              <MaterialCommunityIcons name="package-variant" size={18} color="#FFF" />
              <Text style={styles.trackOrderText}>Track Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOrderPlaced(false);
                setActiveTab('STORE');
              }}
              style={[styles.continueShopBtn, { borderColor: themeColors.tint }]}>
              <Text style={[styles.continueShopText, { color: themeColors.tint }]}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </GlassCard>
        ) : (
          <>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>💳 Checkout</Text>

            {/* Delivery Address */}
            <GlassCard style={styles.addressCard}>
              <Text style={[styles.sectionSubTitle, { color: themeColors.text }]}>
                📦 Delivery Address
              </Text>
              <Text style={[styles.addressText, { color: themeColors.icon }]}>Alex Johnson</Text>
              <Text style={[styles.addressText, { color: themeColors.icon }]}>
                MetLife Stadium, Section 112, Row M
              </Text>
              <Text style={[styles.addressText, { color: themeColors.icon }]}>
                East Rutherford, NJ 07073, USA
              </Text>
              <TouchableOpacity
                onPress={() => Alert.alert('Change Address', 'Address update coming soon!')}
                style={[styles.changeAddrBtn, { borderColor: themeColors.tint }]}>
                <Text style={[styles.changeAddrText, { color: themeColors.tint }]}>Change</Text>
              </TouchableOpacity>
            </GlassCard>

            {/* Payment Methods */}
            <GlassCard style={styles.paymentCard}>
              <Text style={[styles.sectionSubTitle, { color: themeColors.text }]}>
                💰 Payment Method
              </Text>
              {[
                { key: 'card', label: 'Credit / Debit Card', icon: 'credit-card' },
                { key: 'upi', label: 'UPI / Net Banking', icon: 'bank' },
                { key: 'gpay', label: 'Google Pay', icon: 'google' },
                { key: 'apple', label: 'Apple Pay', icon: 'apple' },
                { key: 'paypal', label: 'PayPal', icon: 'currency-usd' },
                { key: 'wallet', label: 'Stadium Wallet (2,840 coins)', icon: 'wallet' },
              ].map(({ key, label, icon }) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setPaymentMethod(key)}
                  style={[
                    styles.paymentOption,
                    { borderColor: paymentMethod === key ? themeColors.tint : themeColors.border },
                    paymentMethod === key && { backgroundColor: themeColors.tint + '15' },
                  ]}>
                  <MaterialCommunityIcons
                    name={icon as any}
                    size={22}
                    color={paymentMethod === key ? themeColors.tint : themeColors.icon}
                  />
                  <Text
                    style={[
                      styles.paymentLabel,
                      { color: paymentMethod === key ? themeColors.tint : themeColors.text },
                    ]}>
                    {label}
                  </Text>
                  {paymentMethod === key && (
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={20}
                      color={themeColors.tint}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </GlassCard>

            {/* Order Summary */}
            <GlassCard style={styles.checkoutSummary}>
              <Text style={[styles.sectionSubTitle, { color: themeColors.text }]}>
                Order Summary
              </Text>
              {cart.map((i) => (
                <View key={i.product.id} style={styles.checkoutItemRow}>
                  <Text
                    style={[styles.checkoutItemName, { color: themeColors.text }]}
                    numberOfLines={1}>
                    {i.product.name} × {i.qty}
                  </Text>
                  <Text style={[styles.checkoutItemPrice, { color: themeColors.tint }]}>
                    ${(i.product.price * i.qty).toFixed(2)}
                  </Text>
                </View>
              ))}
              <View style={[styles.summaryDivider, { backgroundColor: themeColors.border }]} />
              <View style={styles.checkoutItemRow}>
                <Text style={[styles.checkoutTotal, { color: themeColors.text }]}>Total</Text>
                <Text style={[styles.checkoutTotalVal, { color: '#00E676' }]}>
                  ${grandTotal.toFixed(2)}
                </Text>
              </View>
            </GlassCard>

            <TouchableOpacity onPress={placeOrder} style={styles.placeOrderBtn}>
              <LinearGradient
                colors={['#00E676', '#00C8FF']}
                style={styles.placeOrderGrad}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <MaterialCommunityIcons name="lock" size={20} color="#FFF" />
                <Text style={styles.placeOrderText}>
                  PLACE ORDER · ${grandTotal > 0 ? grandTotal.toFixed(2) : '0.00'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={[styles.secureNote, { color: themeColors.icon }]}>
              🔒 Secured by FIFA 2026 Official Payment Gateway
            </Text>
          </>
        )}
        <View style={{ height: 40 }} />
      </Animated.View>
    </ScrollView>
  );

  // ── Render Orders ─────────────────────────────────────────────────────────

  const renderOrders = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>📦 Order Tracking</Text>
        {ORDER_HISTORY.map((order, i) => (
          <Animated.View key={order.id} entering={SlideInRight.delay(i * 80)}>
            <GlassCard style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={[styles.orderId, { color: themeColors.tint }]}>{order.id}</Text>
                  <Text style={[styles.orderDate, { color: themeColors.icon }]}>
                    {order.date} · {order.items}
                  </Text>
                </View>
                <Text style={[styles.orderTotal, { color: themeColors.text }]}>${order.total}</Text>
              </View>
              <OrderTimeline status={order.status} />
            </GlassCard>
          </Animated.View>
        ))}
      </Animated.View>
    </ScrollView>
  );

  // ── Render Reviews ────────────────────────────────────────────────────────

  const renderReviews = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>⭐ Reviews & Ratings</Text>

        {/* AI Summary */}
        <GlassCard style={styles.aiSummaryCard}>
          <View style={styles.aiSummaryHeader}>
            <MaterialCommunityIcons name="robot" size={20} color="#7C4DFF" />
            <Text style={[styles.aiSummaryTitle, { color: themeColors.text }]}>
              AI Review Summary
            </Text>
          </View>
          <Text style={[styles.aiSummaryText, { color: themeColors.icon }]}>
            Based on 2,341 verified reviews: Customers love the premium quality fabric and authentic
            FIFA licensing. Most praised: fit (94%), material (91%), and design (89%). Minor
            concern: some reviewers noted delivery time variability.
          </Text>
          <View style={styles.aiSentimentRow}>
            {[
              { label: '😍 Excellent', pct: 68 },
              { label: '😊 Good', pct: 22 },
              { label: '😐 Average', pct: 7 },
              { label: '😞 Poor', pct: 3 },
            ].map(({ label, pct }) => (
              <View key={label} style={styles.sentimentItem}>
                <Text style={[styles.sentimentLabel, { color: themeColors.icon }]}>{label}</Text>
                <Text style={[styles.sentimentPct, { color: themeColors.tint }]}>{pct}%</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Overall Rating */}
        <GlassCard style={styles.overallRating}>
          <Text style={styles.overallRatingNum}>4.7</Text>
          <StarRating rating={4.7} size={22} />
          <Text style={[styles.overallRatingCount, { color: themeColors.icon }]}>
            2,341 verified reviews
          </Text>
        </GlassCard>

        {/* Individual Reviews */}
        {REVIEWS_DATA.map((r, i) => (
          <Animated.View key={i} entering={FadeInUp.delay(i * 70)}>
            <GlassCard style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewAvatarCircle}>
                  <Text style={styles.reviewAvatarText}>{r.user[0].toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={[styles.reviewUser, { color: themeColors.text }]}>{r.user}</Text>
                    {r.verified && (
                      <View style={styles.verifiedBadge}>
                        <MaterialCommunityIcons name="check-decagram" size={12} color="#00E676" />
                        <Text style={styles.verifiedText}>Verified</Text>
                      </View>
                    )}
                  </View>
                  <StarRating rating={r.rating} />
                </View>
                <Text style={[styles.reviewDate, { color: themeColors.icon }]}>{r.date}</Text>
              </View>
              <Text style={[styles.reviewText, { color: themeColors.text }]}>{r.text}</Text>
            </GlassCard>
          </Animated.View>
        ))}

        {/* Write Review */}
        <GlassCard style={styles.writeReview}>
          <Text style={[styles.writeReviewTitle, { color: themeColors.text }]}>
            ✍️ Write a Review
          </Text>
          <View style={{ flexDirection: 'row', gap: 6, marginBottom: 12 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <TouchableOpacity key={s} onPress={() => setNewReviewRating(s)}>
                <MaterialCommunityIcons
                  name={s <= newReviewRating ? 'star' : 'star-outline'}
                  size={28}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            value={newReviewText}
            onChangeText={setNewReviewText}
            placeholder="Share your experience…"
            placeholderTextColor={themeColors.icon}
            multiline
            numberOfLines={3}
            style={[
              styles.reviewInput,
              { color: themeColors.text, borderColor: themeColors.border },
            ]}
          />
          <TouchableOpacity
            onPress={() => {
              if (!newReviewText.trim()) {
                Alert.alert('Empty Review', 'Please write something');
                return;
              }
              Alert.alert('✅ Review Submitted', 'Thank you for your feedback!');
              setNewReviewText('');
              setNewReviewRating(5);
            }}
            style={[styles.submitReviewBtn, { backgroundColor: '#7C4DFF' }]}>
            <Text style={styles.submitReviewText}>Submit Review</Text>
          </TouchableOpacity>
        </GlassCard>
        <View style={{ height: 40 }} />
      </Animated.View>
    </ScrollView>
  );

  // ── Render Flash Sale ─────────────────────────────────────────────────────

  const renderFlash = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInDown.duration(400)}>
        {/* Flash Banner */}
        <LinearGradient
          colors={['#FF5252', '#FF9800']}
          style={styles.flashBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <Text style={styles.flashTitle}>⚡ FLASH SALE</Text>
          <Text style={styles.flashSub}>Ends in:</Text>
          <FlashTimer />
          <Text style={styles.flashNote}>Up to 60% OFF · Limited Stock!</Text>
        </LinearGradient>

        {/* Flash Products */}
        {FLASH_SALE_ITEMS.map((item, i) => (
          <Animated.View key={item.id} entering={SlideInRight.delay(i * 80)}>
            <GlassCard style={styles.flashItem}>
              <View style={[styles.flashIconWrap, { backgroundColor: '#FF525220' }]}>
                <MaterialCommunityIcons name={item.icon as any} size={40} color="#FF5252" />
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={[styles.flashItemName, { color: themeColors.text }]}>{item.name}</Text>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                  <Text style={styles.flashSalePrice}>${item.salePrice}</Text>
                  <Text style={[styles.flashOrigPrice, { color: themeColors.icon }]}>
                    ${item.originalPrice}
                  </Text>
                  <View style={styles.flashDiscBadge}>
                    <Text style={styles.flashDiscText}>
                      -{Math.round((1 - item.salePrice / item.originalPrice) * 100)}%
                    </Text>
                  </View>
                </View>
                <Text style={styles.flashStockWarning}>🔥 Only {item.stock} left!</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  const p = PRODUCTS.find((p) => p.icon === item.icon) || PRODUCTS[0];
                  addToCart({ ...p, price: item.salePrice, name: item.name });
                }}
                style={styles.flashAddBtn}>
                <MaterialCommunityIcons name="cart-plus" size={18} color="#FFF" />
                <Text style={styles.flashAddText}>Add</Text>
              </TouchableOpacity>
            </GlassCard>
          </Animated.View>
        ))}

        {/* Special Offers */}
        <Text style={[styles.sectionTitle, { color: themeColors.text, marginTop: 20 }]}>
          🎁 Special Offers
        </Text>
        <GlassCard style={styles.offerCard}>
          <MaterialCommunityIcons name="gift" size={28} color="#FFD700" />
          <View style={{ flex: 1 }}>
            <Text style={[styles.offerTitle, { color: themeColors.text }]}>
              Buy 2 Jerseys, Get 1 Free
            </Text>
            <Text style={[styles.offerDesc, { color: themeColors.icon }]}>
              Mix & match any team jerseys. Free jersey = lowest priced item.
            </Text>
          </View>
        </GlassCard>
        <GlassCard style={styles.offerCard}>
          <MaterialCommunityIcons name="truck-delivery" size={28} color="#00C8FF" />
          <View style={{ flex: 1 }}>
            <Text style={[styles.offerTitle, { color: themeColors.text }]}>
              Free Stadium Delivery
            </Text>
            <Text style={[styles.offerDesc, { color: themeColors.icon }]}>
              Orders over $100 get free same-day delivery to your stadium seat!
            </Text>
          </View>
        </GlassCard>
        <GlassCard style={styles.offerCard}>
          <MaterialCommunityIcons name="star-circle" size={28} color="#7C4DFF" />
          <View style={{ flex: 1 }}>
            <Text style={[styles.offerTitle, { color: themeColors.text }]}>
              Fan Zone Double XP Weekend
            </Text>
            <Text style={[styles.offerDesc, { color: themeColors.icon }]}>
              Every purchase this weekend earns 2× Fan Zone XP. Level up faster!
            </Text>
          </View>
        </GlassCard>
        <View style={{ height: 40 }} />
      </Animated.View>
    </ScrollView>
  );

  // ── Render AI Assistant ───────────────────────────────────────────────────

  const renderAI = () => (
    <View style={{ flex: 1 }}>
      <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
        🤖 AI Shopping Assistant
      </Text>
      <Text style={[styles.subLabel, { color: themeColors.icon, marginBottom: 12 }]}>
        Ask about products, deals, gifts, or team merchandise
      </Text>

      {/* Quick chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
        {AI_SUGGESTIONS.map((s) => (
          <TouchableOpacity
            key={s.q}
            onPress={() => setAiHistory((h) => [...h, { q: s.q, a: s.a, icon: s.icon }])}
            style={[
              styles.aiChip,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <Text style={styles.aiChipIcon}>{s.icon}</Text>
            <Text style={[styles.aiChipText, { color: themeColors.tint }]}>{s.q}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.aiChatArea}
        contentContainerStyle={{ padding: Theme.spacing.m, paddingBottom: 20 }}>
        {aiHistory.map((item, i) => (
          <View key={i}>
            {item.q && (
              <View style={styles.aiUserBubble}>
                <Text style={styles.aiUserText}>{item.q}</Text>
              </View>
            )}
            <Animated.View
              entering={FadeInUp.duration(300)}
              style={[
                styles.aiBotBubble,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}>
              <Text style={styles.aiBotIcon}>{item.icon || '🤖'}</Text>
              <Text style={[styles.aiBotText, { color: themeColors.text }]}>{item.a}</Text>
            </Animated.View>
          </View>
        ))}
      </ScrollView>

      <View
        style={[
          styles.aiInputRow,
          { backgroundColor: themeColors.card, borderColor: themeColors.border },
        ]}>
        <TextInput
          value={aiInput}
          onChangeText={setAiInput}
          placeholder="Ask about jerseys, deals, gifts…"
          placeholderTextColor={themeColors.icon}
          style={[styles.aiInput, { color: themeColors.text }]}
          onSubmitEditing={sendAI}
        />
        <TouchableOpacity
          onPress={sendAI}
          style={[styles.aiSendBtn, { backgroundColor: '#7C4DFF' }]}>
          <MaterialCommunityIcons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // ── Router ────────────────────────────────────────────────────────────────

  const RENDERERS: Record<Tab, () => React.ReactNode> = {
    STORE: renderStore,
    PRODUCT: renderProduct,
    CUSTOMIZE: renderCustomize,
    CART: renderCart,
    CHECKOUT: renderCheckout,
    ORDERS: renderOrders,
    REVIEWS: renderReviews,
    FLASH: renderFlash,
    AI: renderAI,
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <LinearGradient colors={['#071321', '#040914']} style={StyleSheet.absoluteFillObject} />
      <AnimatedBackground />
      <Header title="🛍 FIFA Merch Store" />

      {/* Tab bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.tabBar, { borderBottomColor: themeColors.border }]}
        contentContainerStyle={styles.tabBarContent}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[
                styles.tabBtn,
                isActive && { borderBottomColor: themeColors.tint, borderBottomWidth: 2 },
              ]}>
              <View style={{ position: 'relative' }}>
                <MaterialCommunityIcons
                  name={tab.icon as any}
                  size={16}
                  color={isActive ? themeColors.tint : themeColors.icon}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <View style={styles.tabBadge}>
                    <Text style={styles.tabBadgeText}>{tab.badge}</Text>
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? themeColors.tint : themeColors.icon },
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Content */}
      <View style={styles.tabContent}>{RENDERERS[activeTab]()}</View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Tab bar
  tabBar: { borderBottomWidth: 1, maxHeight: 52, flexGrow: 0 },
  tabBarContent: { paddingHorizontal: Theme.spacing.s, alignItems: 'center' },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Theme.spacing.m,
    paddingVertical: Theme.spacing.s,
    marginRight: 2,
    position: 'relative',
  },
  tabLabel: { fontSize: 12, fontWeight: '700' },
  tabBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#FF5252',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  tabBadgeText: { color: '#FFF', fontSize: 9, fontWeight: '900' },
  tabContent: { flex: 1, padding: Theme.spacing.m },

  sectionTitle: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: '900',
    marginBottom: Theme.spacing.m,
    letterSpacing: 0.5,
  },
  subLabel: { fontSize: 13, marginTop: -8 },
  sectionSubTitle: { fontSize: 15, fontWeight: '700', marginBottom: 12 },

  // Hero Banner
  heroBanner: {
    borderRadius: 20,
    padding: Theme.spacing.l,
    alignItems: 'center',
    gap: 8,
    marginBottom: Theme.spacing.m,
  },
  heroTitle: { fontSize: 20, fontWeight: '900', color: '#FFF' },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  heroBadgeRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  heroBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  heroBadgeText: { color: '#FFF', fontSize: 12, fontWeight: '600' },

  // Search
  searchCard: { padding: Theme.spacing.m, gap: 10, marginBottom: 8 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 14 },
  searchIcons: { flexDirection: 'row', gap: 10 },
  searchIconBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  searchIconText: { fontSize: 13, fontWeight: '700' },

  // Filters
  filterScroll: { marginBottom: 8, flexGrow: 0 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  filterChipText: { fontSize: 13, fontWeight: '700' },
  filterRow: { gap: 8, marginBottom: 8 },
  teamChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  teamChipText: { fontSize: 12, fontWeight: '700' },
  sortRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  sortChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, borderWidth: 1 },
  sortChipText: { fontSize: 11, fontWeight: '700' },
  resultCount: { fontSize: 12, marginBottom: 8 },

  // AI Rec Banner
  aiRecBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: Theme.spacing.m,
    marginBottom: 12,
  },
  aiRecTitle: { fontSize: 13, fontWeight: '700' },
  aiRecSub: { fontSize: 12, marginTop: 2 },
  aiRecBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12 },
  aiRecBtnText: { color: '#FFF', fontWeight: '900', fontSize: 12 },

  // Product Grid
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  productCardWrap: { width: '47%' },
  productCard: {
    padding: Theme.spacing.m,
    alignItems: 'center',
    gap: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  productBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF9800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  productBadgeText: { color: '#FFF', fontSize: 9, fontWeight: '900' },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 32,
    backgroundColor: '#FF5252',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountBadgeText: { color: '#FFF', fontSize: 9, fontWeight: '900' },
  wishlistBtn: { position: 'absolute', top: 6, right: 8 },
  productIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productName: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  productTeam: { fontSize: 11 },
  productReviews: { fontSize: 10 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  productPrice: { fontSize: 16, fontWeight: '900' },
  productOriginalPrice: { fontSize: 12, textDecorationLine: 'line-through' },
  lowStock: { fontSize: 10, color: '#FF9800', fontWeight: '700' },
  addCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 4,
  },
  addCartText: { color: '#FFF', fontSize: 11, fontWeight: '900' },

  // Product Detail
  productDetailHero: {
    borderRadius: 20,
    padding: Theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
    minHeight: 200,
  },
  detailBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#FF9800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  detailBadgeText: { color: '#FFF', fontWeight: '900', fontSize: 11 },
  discountCircle: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FF5252',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountCircleText: { color: '#FFF', fontWeight: '900', fontSize: 12 },
  detailCard: { padding: Theme.spacing.l, gap: 8 },
  detailName: { fontSize: 20, fontWeight: '900' },
  detailTeam: { fontSize: 13 },
  detailRatingNum: { fontSize: 13, fontWeight: '700' },
  detailPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  detailPrice: { fontSize: 28, fontWeight: '900' },
  detailOrigPrice: { fontSize: 16, textDecorationLine: 'line-through' },
  detailDiscountBadge: {
    backgroundColor: '#00E67620',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  detailDiscountText: { color: '#00E676', fontWeight: '700', fontSize: 12 },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  stockText: { fontSize: 13, fontWeight: '700' },
  detailSectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 8,
  },
  detailDesc: { fontSize: 14, lineHeight: 22 },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  specLabel: { fontSize: 13 },
  specValue: { fontSize: 13, fontWeight: '600' },
  detailActions: { flexDirection: 'row', gap: 10, marginTop: 8 },
  detailAddCart: { flex: 1, borderRadius: 14, overflow: 'hidden' },
  detailAddCartGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
  },
  detailAddCartText: { color: '#FFF', fontWeight: '900', fontSize: 15 },
  detailWishBtn: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 2,
  },
  customizeCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    marginTop: 8,
  },
  customizeCTAText: { fontSize: 14, fontWeight: '700' },
  relatedScroll: { marginBottom: 20 },
  relatedCard: {
    width: 120,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    gap: 6,
    marginRight: 10,
    borderWidth: 1,
  },
  relatedName: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  relatedPrice: { fontSize: 13, fontWeight: '900' },

  // Customize
  jerseyPreview: { padding: Theme.spacing.l, alignItems: 'center', gap: 8, marginBottom: 16 },
  previewLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 2 },
  jerseyIcon: {
    width: 160,
    height: 160,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    gap: 4,
  },
  jerseyCustomName: { fontSize: 13, fontWeight: '900', letterSpacing: 2 },
  jerseyCustomNumber: { fontSize: 32, fontWeight: '900' },
  previewFont: { fontSize: 12 },
  customCard: { padding: Theme.spacing.m, marginBottom: 12 },
  customLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  customInput: { borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 15, fontWeight: '600' },
  customHint: { fontSize: 11, marginTop: 4, textAlign: 'right' },
  fontRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  fontChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  fontChipText: { fontSize: 13, fontWeight: '700' },
  colorRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  colorCircle: { width: 36, height: 36, borderRadius: 18, borderWidth: 3 },
  customPriceCard: { padding: Theme.spacing.m, gap: 8, marginBottom: 16 },
  customPriceRow: { flexDirection: 'row', justifyContent: 'space-between' },
  customPriceLabel: { fontSize: 13 },
  customPriceVal: { fontSize: 13, fontWeight: '700' },
  customPriceDivider: { height: 1, marginVertical: 4 },
  customPriceTotalLabel: { fontSize: 15, fontWeight: '900' },
  customPriceTotalVal: { fontSize: 18, fontWeight: '900' },
  customAddBtn: { borderRadius: 14, overflow: 'hidden', marginBottom: 16 },
  customAddGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
  },
  customAddText: { color: '#FFF', fontWeight: '900', fontSize: 14, letterSpacing: 0.5 },

  // Cart
  emptyCart: { padding: Theme.spacing.xl, alignItems: 'center', gap: 12 },
  emptyCartEmoji: { fontSize: 56 },
  emptyCartText: { fontSize: 18, fontWeight: '700' },
  shopNowBtn: { paddingHorizontal: 28, paddingVertical: 12, borderRadius: 24 },
  shopNowText: { color: '#FFF', fontWeight: '900', fontSize: 15 },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: Theme.spacing.m,
    marginBottom: 10,
  },
  cartIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemName: { fontSize: 13, fontWeight: '700' },
  cartItemCustom: { fontSize: 11 },
  cartItemPrice: { fontSize: 15, fontWeight: '900' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 16, fontWeight: '900' },
  qtyNum: { fontSize: 15, fontWeight: '900', minWidth: 20, textAlign: 'center' },
  couponCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: Theme.spacing.m,
    marginBottom: 12,
  },
  couponInput: { flex: 1, fontSize: 14, paddingVertical: 4 },
  couponBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  couponBtnText: { color: '#FFF', fontWeight: '900', fontSize: 13 },
  priceSummary: { padding: Theme.spacing.l, gap: 10, marginBottom: 16 },
  summaryTitle: { fontSize: 15, fontWeight: '900', marginBottom: 4 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { fontSize: 13 },
  summaryValue: { fontSize: 13, fontWeight: '700' },
  summaryDivider: { height: 1, marginVertical: 4 },
  summaryTotal: { fontSize: 16, fontWeight: '900' },
  summaryTotalVal: { fontSize: 18, fontWeight: '900' },
  freeDeliveryNote: { fontSize: 12, textAlign: 'center', marginTop: 4 },
  checkoutBtn: { borderRadius: 14, overflow: 'hidden', marginBottom: 12 },
  checkoutBtnGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
  },
  checkoutBtnText: { color: '#FFF', fontWeight: '900', fontSize: 14 },
  wishlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: Theme.spacing.m,
    marginBottom: 8,
  },
  wishlistName: { fontSize: 14, fontWeight: '700' },
  wishlistPrice: { fontSize: 14, fontWeight: '900' },
  wishlistAdd: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Checkout
  orderConfirm: { padding: Theme.spacing.xl, alignItems: 'center', gap: 12 },
  orderConfirmEmoji: { fontSize: 64 },
  orderConfirmTitle: { fontSize: 24, fontWeight: '900' },
  orderConfirmRef: { fontSize: 18, fontWeight: '700' },
  orderConfirmMsg: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
  orderConfirmDetails: { width: '100%', gap: 8, marginTop: 8 },
  confirmDetailRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  confirmDetailLabel: { flex: 1, fontSize: 13 },
  confirmDetailValue: { fontSize: 13, fontWeight: '700' },
  trackOrderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
  },
  trackOrderText: { color: '#FFF', fontWeight: '900', fontSize: 15 },
  continueShopBtn: { borderWidth: 1, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 24 },
  continueShopText: { fontWeight: '700' },
  addressCard: { padding: Theme.spacing.l, gap: 4, marginBottom: 12 },
  addressText: { fontSize: 13 },
  changeAddrBtn: {
    borderWidth: 1,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 8,
  },
  changeAddrText: { fontSize: 13, fontWeight: '700' },
  paymentCard: { padding: Theme.spacing.l, gap: 8, marginBottom: 12 },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: Theme.spacing.m,
    borderRadius: 12,
    borderWidth: 1,
  },
  paymentLabel: { flex: 1, fontSize: 14, fontWeight: '600' },
  checkoutSummary: { padding: Theme.spacing.l, gap: 8, marginBottom: 16 },
  checkoutItemRow: { flexDirection: 'row', justifyContent: 'space-between' },
  checkoutItemName: { flex: 1, fontSize: 13, marginRight: 8 },
  checkoutItemPrice: { fontSize: 13, fontWeight: '700' },
  checkoutTotal: { fontSize: 16, fontWeight: '900' },
  checkoutTotalVal: { fontSize: 16, fontWeight: '900' },
  placeOrderBtn: { borderRadius: 14, overflow: 'hidden', marginBottom: 8 },
  placeOrderGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
  },
  placeOrderText: { color: '#FFF', fontWeight: '900', fontSize: 16 },
  secureNote: { textAlign: 'center', fontSize: 12, marginBottom: 20 },

  // Orders
  orderCard: { padding: Theme.spacing.l, marginBottom: 16 },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderId: { fontSize: 15, fontWeight: '900' },
  orderDate: { fontSize: 12, marginTop: 2 },
  orderTotal: { fontSize: 16, fontWeight: '900' },
  timeline: { gap: 0 },
  timelineRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  timelineLeft: { alignItems: 'center', width: 32 },
  timelineDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  timelineLine: { width: 2, height: 28, marginTop: 2 },
  timelineLabel: { fontSize: 13, paddingTop: 6 },

  // Reviews
  aiSummaryCard: { padding: Theme.spacing.l, gap: 10, marginBottom: 16 },
  aiSummaryHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  aiSummaryTitle: { fontSize: 15, fontWeight: '900' },
  aiSummaryText: { fontSize: 13, lineHeight: 20 },
  aiSentimentRow: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  sentimentItem: { alignItems: 'center', gap: 2 },
  sentimentLabel: { fontSize: 11 },
  sentimentPct: { fontSize: 14, fontWeight: '900' },
  overallRating: { padding: Theme.spacing.l, alignItems: 'center', gap: 6, marginBottom: 16 },
  overallRatingNum: { fontSize: 48, fontWeight: '900', color: '#FFD700' },
  overallRatingCount: { fontSize: 13 },
  reviewCard: { padding: Theme.spacing.m, marginBottom: 10 },
  reviewHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
  reviewAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#7C4DFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewAvatarText: { color: '#FFF', fontWeight: '900', fontSize: 16 },
  reviewUser: { fontSize: 13, fontWeight: '700' },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#00E67620',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  verifiedText: { fontSize: 10, color: '#00E676', fontWeight: '700' },
  reviewDate: { fontSize: 11 },
  reviewText: { fontSize: 13, lineHeight: 20 },
  writeReview: { padding: Theme.spacing.l, gap: 8 },
  writeReviewTitle: { fontSize: 15, fontWeight: '900' },
  reviewInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitReviewBtn: { paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  submitReviewText: { color: '#FFF', fontWeight: '900', fontSize: 14 },

  // Flash Sale
  flashBanner: {
    borderRadius: 20,
    padding: Theme.spacing.xl,
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  flashTitle: { fontSize: 28, fontWeight: '900', color: '#FFF', letterSpacing: 2 },
  flashSub: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  flashNote: { fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: '700' },
  timerRow: { flexDirection: 'row', gap: 12 },
  timerUnit: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  timerNum: { fontSize: 28, fontWeight: '900', color: '#FFF' },
  timerLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: '700' },
  flashItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: Theme.spacing.m,
    marginBottom: 10,
  },
  flashIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashItemName: { fontSize: 14, fontWeight: '700' },
  flashSalePrice: { fontSize: 20, fontWeight: '900', color: '#FF5252' },
  flashOrigPrice: { fontSize: 14, textDecorationLine: 'line-through' },
  flashDiscBadge: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  flashDiscText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  flashStockWarning: { fontSize: 12, color: '#FF9800', fontWeight: '700' },
  flashAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FF5252',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  flashAddText: { color: '#FFF', fontWeight: '900', fontSize: 13 },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: Theme.spacing.m,
    marginBottom: 10,
  },
  offerTitle: { fontSize: 14, fontWeight: '700' },
  offerDesc: { fontSize: 12, marginTop: 2, lineHeight: 18 },

  // AI
  aiChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  aiChipIcon: { fontSize: 16 },
  aiChipText: { fontSize: 12, fontWeight: '600' },
  aiChatArea: { flex: 1 },
  aiUserBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#7C4DFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    maxWidth: '80%',
  },
  aiUserText: { color: '#FFF', fontSize: 14 },
  aiBotBubble: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    maxWidth: '90%',
  },
  aiBotIcon: { fontSize: 18 },
  aiBotText: { flex: 1, fontSize: 14, lineHeight: 20 },
  aiInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: Theme.spacing.s,
    borderTopWidth: 1,
    borderRadius: 12,
    margin: Theme.spacing.s,
  },
  aiInput: { flex: 1, fontSize: 14, paddingHorizontal: 8 },
  aiSendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
