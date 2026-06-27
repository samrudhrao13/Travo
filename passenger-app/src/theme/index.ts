export const Colors = {
  primary: '#F97316',
  primaryDark: '#EA6C0A',
  primaryLight: '#FED7AA',
  secondary: '#1E3A5F',
  secondaryLight: '#2D5282',
  accent: '#10B981',
  accentLight: '#D1FAE5',
  danger: '#EF4444',
  warning: '#F59E0B',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
    link: '#F97316',
  },
  map: {
    pickup: '#10B981',
    drop: '#EF4444',
    route: '#F97316',
  },
  status: {
    online: '#10B981',
    offline: '#6B7280',
    busy: '#F59E0B',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Typography = {
  h1: { fontSize: 32, fontWeight: '700' as const, letterSpacing: -0.5 },
  h2: { fontSize: 24, fontWeight: '700' as const, letterSpacing: -0.3 },
  h3: { fontSize: 20, fontWeight: '600' as const },
  h4: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  bodySmall: { fontSize: 14, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
  label: { fontSize: 13, fontWeight: '500' as const, letterSpacing: 0.3 },
  button: { fontSize: 16, fontWeight: '600' as const, letterSpacing: 0.2 },
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};
