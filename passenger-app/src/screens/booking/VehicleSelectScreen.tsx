import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const VEHICLES = [
  {
    id: 'tt_small',
    type: 'tt',
    name: 'Tempo Traveller 9',
    seats: 9,
    icon: 'bus',
    pricePerKm: 18,
    basePrice: 250,
    features: ['AC', 'GPS Tracked', 'Driver Included'],
    color: Colors.primary,
  },
  {
    id: 'tt_large',
    type: 'tt',
    name: 'Tempo Traveller 12',
    seats: 12,
    icon: 'bus',
    pricePerKm: 22,
    basePrice: 350,
    features: ['AC', 'GPS Tracked', 'Driver Included', 'Luggage Space'],
    color: Colors.primary,
  },
  {
    id: 'bus_mini',
    type: 'bus',
    name: 'Mini Bus',
    seats: 20,
    icon: 'car-sport',
    pricePerKm: 35,
    basePrice: 800,
    features: ['AC', 'GPS Tracked', 'Driver Included', 'Large Boot'],
    color: Colors.secondary,
  },
  {
    id: 'bus_full',
    type: 'bus',
    name: 'Full Size Bus',
    seats: 45,
    icon: 'car-sport',
    pricePerKm: 65,
    basePrice: 1800,
    features: ['AC', 'GPS Tracked', 'Driver + Helper', 'Ample Luggage'],
    color: Colors.secondary,
  },
];

export default function VehicleSelectScreen({ route, navigation }: any) {
  const { scheduleMode } = route.params || {};
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    const vehicle = VEHICLES.find((v) => v.id === selected)!;
    navigation.navigate('Location', { vehicle, scheduleMode });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Vehicle</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          {scheduleMode ? 'Scheduling a trip — choose your vehicle' : 'Book now, arrive in 15-20 min'}
        </Text>

        <Text style={styles.sectionLabel}>Tempo Travellers</Text>
        {VEHICLES.filter((v) => v.type === 'tt').map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            selected={selected === vehicle.id}
            onSelect={() => setSelected(vehicle.id)}
          />
        ))}

        <Text style={styles.sectionLabel}>Private Buses</Text>
        {VEHICLES.filter((v) => v.type === 'bus').map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            selected={selected === vehicle.id}
            onSelect={() => setSelected(vehicle.id)}
          />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueBtn, !selected && styles.continueBtnDisabled]}
          onPress={handleContinue}
          disabled={!selected}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function VehicleCard({ vehicle, selected, onSelect }: any) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && { borderColor: vehicle.color, borderWidth: 2 }]}
      onPress={onSelect}
      activeOpacity={0.85}
    >
      <View style={styles.cardLeft}>
        <View style={[styles.cardIcon, { backgroundColor: vehicle.color + '15' }]}>
          <Ionicons name={vehicle.icon} size={30} color={vehicle.color} />
        </View>
      </View>
      <View style={styles.cardMid}>
        <Text style={styles.cardName}>{vehicle.name}</Text>
        <Text style={styles.cardSeats}>{vehicle.seats} seats</Text>
        <View style={styles.tags}>
          {vehicle.features.slice(0, 2).map((f: string) => (
            <View key={f} style={styles.tag}>
              <Text style={styles.tagText}>{f}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.basePrice}>₹{vehicle.basePrice}</Text>
        <Text style={styles.perKm}>₹{vehicle.pricePerKm}/km</Text>
        {selected && (
          <View style={[styles.checkCircle, { backgroundColor: vehicle.color }]}>
            <Ionicons name="checkmark" size={14} color="#FFFFFF" />
          </View>
        )}
      </View>
    </TouchableOpacity>
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
    ...Shadow.sm,
  },
  backBtn: { padding: 4 },
  headerTitle: { ...Typography.h4, color: Colors.text.primary },
  scroll: { flex: 1, padding: Spacing.lg },
  subtitle: { ...Typography.bodySmall, color: Colors.text.secondary, marginBottom: Spacing.lg },
  sectionLabel: {
    ...Typography.label,
    color: Colors.text.secondary,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  cardLeft: { marginRight: Spacing.md },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardMid: { flex: 1 },
  cardName: { ...Typography.body, color: Colors.text.primary, fontWeight: '600', marginBottom: 2 },
  cardSeats: { ...Typography.caption, color: Colors.text.secondary, marginBottom: 6 },
  tags: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  tag: {
    backgroundColor: Colors.borderLight,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: { ...Typography.caption, color: Colors.text.secondary },
  cardRight: { alignItems: 'flex-end', gap: 4 },
  basePrice: { ...Typography.h4, color: Colors.text.primary },
  perKm: { ...Typography.caption, color: Colors.text.secondary },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  footer: {
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    ...Shadow.md,
  },
  continueBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueBtnDisabled: { backgroundColor: Colors.border },
  continueBtnText: { ...Typography.button, color: '#FFFFFF' },
});
