export const Colors = {
  primary: '#1E3A5F',
  primaryLight: '#DBEAFE',
  secondary: '#F97316',
  accent: '#10B981',
  accentLight: '#D1FAE5',
  danger: '#EF4444',
  warning: '#F59E0B',
  background: '#F0F4F8',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  borderLight: '#F8FAFC',
  online: '#10B981',
  offline: '#6B7280',
  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    inverse: '#FFFFFF',
  },
};

export const Spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
};

export const BorderRadius = {
  sm: 8, md: 12, lg: 16, xl: 24, full: 9999,
};

export const Typography = {
  h1: { fontSize: 32, fontWeight: '700' as const },
  h2: { fontSize: 24, fontWeight: '700' as const },
  h3: { fontSize: 20, fontWeight: '600' as const },
  h4: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  bodySmall: { fontSize: 14, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
  button: { fontSize: 16, fontWeight: '600' as const },
};

export const Shadow = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 8 },
};
