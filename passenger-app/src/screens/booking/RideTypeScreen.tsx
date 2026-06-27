import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const RIDE_TYPES = [
  {
    id: 'now',
    title: 'Book Now',
    subtitle: 'Vehicle arrives in 15-20 minutes',
    icon: 'flash' as const,
    color: Colors.primary,
    recommended: true,
  },
  {
    id: 'schedule',
    title: 'Schedule Trip',
    subtitle: 'Choose a date and time that suits you',
    icon: 'calendar' as const,
    color: Colors.secondary,
    recommended: false,
  },
];

export default function RideTypeScreen({ route, navigation }: any) {
  const { vehicle, pickup, drop } = route.params;
  const [selected, setSelected] = useState<string>('now');

  const handleContinue = () => {
    if (selected === 'schedule') {
      navigation.navigate('Schedule', { vehicle, pickup, drop });
    } else {
      navigation.navigate('Fare', { vehicle, pickup, drop, rideType: 'now' });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>When to Travel?</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Route Summary */}
      <View style={styles.routeCard}>
        <View style={styles.routeItem}>
          <View style={[styles.routeDot, { backgroundColor: Colors.map.pickup }]} />
          <Text style={styles.routeText} numberOfLines={1}>{pickup}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routeItem}>
          <View style={[styles.routeDot, { backgroundColor: Colors.map.drop }]} />
          <Text style={styles.routeText} numberOfLines={1}>{drop}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Select ride type</Text>

      <View style={styles.optionsContainer}>
        {RIDE_TYPES.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[styles.optionCard, selected === type.id && { borderColor: type.color, borderWidth: 2 }]}
            onPress={() => setSelected(type.id)}
            activeOpacity={0.85}
          >
            <View style={[styles.optionIcon, { backgroundColor: type.color + '15' }]}>
              <Ionicons name={type.icon} size={28} color={type.color} />
            </View>
            <View style={styles.optionText}>
              <View style={styles.optionTitleRow}>
                <Text style={styles.optionTitle}>{type.title}</Text>
                {type.recommended && (
                  <View style={styles.recommendedChip}>
                    <Text style={styles.recommendedText}>Popular</Text>
                  </View>
                )}
              </View>
              <Text style={styles.optionSub}>{type.subtitle}</Text>
            </View>
            <View style={[styles.radio, selected === type.id && { borderColor: type.color }]}>
              {selected === type.id && (
                <View style={[styles.radioDot, { backgroundColor: type.color }]} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueBtnText}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
  },
  backBtn: { padding: 4 },
  headerTitle: { ...Typography.h4, color: Colors.text.primary },
  routeCard: {
    margin: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  routeItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  routeDot: { width: 10, height: 10, borderRadius: 5 },
  routeText: { ...Typography.bodySmall, color: Colors.text.primary, flex: 1 },
  routeLine: { width: 2, height: 16, backgroundColor: Colors.border, marginLeft: 4, marginVertical: 4 },
  sectionTitle: { ...Typography.h4, color: Colors.text.primary, marginHorizontal: Spacing.lg, marginBottom: Spacing.md },
  optionsContainer: { paddingHorizontal: Spacing.lg, gap: Spacing.md },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: { flex: 1 },
  optionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  optionTitle: { ...Typography.body, color: Colors.text.primary, fontWeight: '600' },
  recommendedChip: {
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  recommendedText: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
  optionSub: { ...Typography.bodySmall, color: Colors.text.secondary },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: { width: 12, height: 12, borderRadius: 6 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: Spacing.lg, backgroundColor: Colors.surface, ...Shadow.md },
  continueBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueBtnText: { ...Typography.button, color: '#FFFFFF' },
});
