const tintColorLight = '#005CE6'; // Deep blue
const tintColorDark = '#00E5FF'; // Neon cyan

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F8FAFC',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    card: '#FFFFFF',
    border: '#E2E8F0',
    accent: tintColorLight,
    gradientStart: '#005CE6',
    gradientEnd: '#3B82F6',
  },
  dark: {
    text: '#F8FAFC',
    background: '#070A13', // Premium deep dark blue
    tint: tintColorDark,
    icon: '#8F9BB3',
    tabIconDefault: '#8F9BB3',
    tabIconSelected: tintColorDark,
    card: 'rgba(21, 28, 44, 0.65)', // Glassmorphism base
    border: 'rgba(0, 229, 255, 0.15)', // Neon border glow
    accent: '#39FF14', // Neon green accent
    gradientStart: '#005CE6', // Deep blue for gradients
    gradientEnd: '#00E5FF', // Neon cyan for gradients
  },
};
