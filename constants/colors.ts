const tintColorLight = '#005CE6';
const tintColorDark = '#00C8FF'; // Neon blue

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
    text: '#FFFFFF',
    background: '#081223', // Deep navy
    tint: tintColorDark,
    icon: '#8F9BB3',
    tabIconDefault: '#8F9BB3',
    tabIconSelected: tintColorDark,
    card: 'rgba(13, 27, 48, 0.65)', // Premium glassmorphism base
    border: 'rgba(0, 200, 255, 0.15)', // Neon blue border
    accent: '#7C4DFF', // Purple accent
    secondary: '#5A6BFF',
    success: '#00E676',
    warning: '#FFC107',
    danger: '#FF5252',
    gradientStart: '#081223',
    gradientEnd: '#00C8FF',
  },
};
