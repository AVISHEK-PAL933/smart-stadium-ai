export const Theme = {
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    sizes: {
      xs: 12,
      s: 14,
      m: 16,
      l: 20,
      xl: 28,
      xxl: 36,
    },
    weights: {
      regular: '400' as const,
      medium: '500' as const,
      bold: '700' as const,
      black: '900' as const,
    },
  },
  shapes: {
    borderRadius: {
      s: 8,
      m: 16,
      l: 24,
      xl: 32,
      round: 9999,
    },
  },
  shadows: {
    glass: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 10,
    },
  },
};
