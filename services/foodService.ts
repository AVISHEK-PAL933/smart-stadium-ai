export interface FoodItem {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  prepTimeMinutes: number;
  calories: number;
  isVegetarian: boolean;
  isAvailable: boolean;
  icon: string;
  description: string;
}

export const FOOD_CATEGORIES = [
  'Burgers',
  'Pizza',
  'Hot Dogs',
  'Popcorn',
  'Nachos',
  'French Fries',
  'Sandwiches',
  'Ice Cream',
  'Coffee',
  'Soft Drinks',
  'Desserts',
  'Healthy Meals',
];

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Classic Gold Burger',
    category: 'Burgers',
    price: 14.5,
    rating: 4.8,
    prepTimeMinutes: 12,
    calories: 650,
    isVegetarian: false,
    isAvailable: true,
    icon: 'hamburger',
    description: 'Flame-grilled angus beef patty with cheese, tomato & special stadium sauce.',
  },
  {
    id: '2',
    name: 'Margherita Stadium Pizza',
    category: 'Pizza',
    price: 16.0,
    rating: 4.7,
    prepTimeMinutes: 15,
    calories: 580,
    isVegetarian: true,
    isAvailable: true,
    icon: 'pizza',
    description: 'Fresh mozzarella, tomato sauce and fresh basil on a thin wood-fired crust.',
  },
  {
    id: '3',
    name: 'Pepperoni Classic Pizza',
    category: 'Pizza',
    price: 18.5,
    rating: 4.9,
    prepTimeMinutes: 15,
    calories: 720,
    isVegetarian: false,
    isAvailable: true,
    icon: 'pizza',
    description: 'Spicy pepperoni slices, mozzarella cheese, and rich marinara sauce.',
  },
  {
    id: '4',
    name: 'FIFA Classic Hot Dog',
    category: 'Hot Dogs',
    price: 8.0,
    rating: 4.6,
    prepTimeMinutes: 6,
    calories: 420,
    isVegetarian: false,
    isAvailable: true,
    icon: 'hamburger',
    description: 'Traditional jumbo beef frank topped with mustard, ketchup, and pickle relish.',
  },
  {
    id: '5',
    name: 'Giant Butter Popcorn',
    category: 'Popcorn',
    price: 7.0,
    rating: 4.8,
    prepTimeMinutes: 3,
    calories: 290,
    isVegetarian: true,
    isAvailable: true,
    icon: 'popcorn',
    description: 'Freshly popped warm bucket of movie-style butter popcorn.',
  },
  {
    id: '6',
    name: 'Ultimate Nachos Platter',
    category: 'Nachos',
    price: 12.0,
    rating: 4.5,
    prepTimeMinutes: 8,
    calories: 520,
    isVegetarian: true,
    isAvailable: true,
    icon: 'cheese',
    description: 'Crispy corn tortilla chips loaded with hot cheese sauce, jalapenos & sour cream.',
  },
  {
    id: '7',
    name: 'Crispy French Fries',
    category: 'French Fries',
    price: 6.5,
    rating: 4.4,
    prepTimeMinutes: 6,
    calories: 340,
    isVegetarian: true,
    isAvailable: true,
    icon: 'french-fries',
    description: 'Golden, crispy, salted shoe-string cut potatoes served with garlic dip.',
  },
  {
    id: '8',
    name: 'Club Chicken Sandwich',
    category: 'Sandwiches',
    price: 11.0,
    rating: 4.3,
    prepTimeMinutes: 10,
    calories: 460,
    isVegetarian: false,
    isAvailable: true,
    icon: 'bread-slice',
    description: 'Toasted bread loaded with grilled chicken breast, lettuce, tomato & mayo.',
  },
  {
    id: '9',
    name: 'Double Chocolate Fudge',
    category: 'Desserts',
    price: 9.0,
    rating: 4.8,
    prepTimeMinutes: 4,
    calories: 410,
    isVegetarian: true,
    isAvailable: true,
    icon: 'cake',
    description: 'Rich, moist chocolate cake with warm hot fudge sauce overlay.',
  },
  {
    id: '10',
    name: 'Organic Quinoa Salad Bowl',
    category: 'Healthy Meals',
    price: 15.0,
    rating: 4.6,
    prepTimeMinutes: 10,
    calories: 280,
    isVegetarian: true,
    isAvailable: true,
    icon: 'leaf',
    description:
      'Fresh organic greens, red quinoa, cherry tomatoes, cucumbers & lemon vinaigrette.',
  },
  {
    id: '11',
    name: 'Espresso Stadium Coffee',
    category: 'Coffee',
    price: 5.0,
    rating: 4.7,
    prepTimeMinutes: 5,
    calories: 20,
    isVegetarian: true,
    isAvailable: true,
    icon: 'coffee',
    description: 'Freshly brewed arabica espresso beans served piping hot.',
  },
  {
    id: '12',
    name: 'FIFA Tournament Cola',
    category: 'Soft Drinks',
    price: 4.5,
    rating: 4.2,
    prepTimeMinutes: 2,
    calories: 140,
    isVegetarian: true,
    isAvailable: true,
    icon: 'glass-cocktail',
    description: 'Chilled carbonated soft drink served in a souvenir cup.',
  },
];

export const getFilteredFoodItems = (query: string): FoodItem[] => {
  const lowerQuery = query.toLowerCase();

  // Keyword query parsing
  if (lowerQuery.includes('veg')) {
    return FOOD_ITEMS.filter((item) => item.isVegetarian);
  }
  if (lowerQuery.includes('low calorie') || lowerQuery.includes('healthy')) {
    return FOOD_ITEMS.filter((item) => item.calories < 400);
  }
  if (lowerQuery.includes('spicy')) {
    return FOOD_ITEMS.filter(
      (item) =>
        item.description.toLowerCase().includes('spicy') ||
        item.name.toLowerCase().includes('pepperoni')
    );
  }
  if (lowerQuery.includes('under 20') || lowerQuery.includes('under $20')) {
    return FOOD_ITEMS.filter((item) => item.price < 20);
  }
  if (lowerQuery.includes('under 10') || lowerQuery.includes('under $10')) {
    return FOOD_ITEMS.filter((item) => item.price < 10);
  }

  // Exact matching categories
  const categoryMatch = FOOD_CATEGORIES.find((cat) => cat.toLowerCase() === lowerQuery);
  if (categoryMatch) {
    return FOOD_ITEMS.filter((item) => item.category === categoryMatch);
  }

  // Broad name matching
  return FOOD_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
  );
};
