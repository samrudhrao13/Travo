import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Dimensions, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const { width } = Dimensions.get('window');

const VEHICLE_TYPES = [
  {
    id: 'tt',
    label: 'Tempo Traveller',
    shortLabel: 'TT',
    icon: 'bus' as const,
    seats: '9-12 seats',
    color: Colors.primary,
    bg: Colors.primaryLight,
    eta: '15-20 min',
    description: 'Perfect for groups',
  },
  {
    id: 'bus',
    label: 'Private Bus',
    shortLabel: 'Bus',
    icon: 'car-sport' as const,
    seats: '20-45 seats',
    color: Colors.secondary,
    bg: '#DBEAFE',
    eta: '20-30 min',
    description: 'Large group travel',
  },
];

const PROMO_ITEMS = [
  { id: '1', title: '15% off your first ride!', sub: 'Use code TRAVO15', color: Colors.primary },
  { id: '2', title: 'Book a Bus for events', sub: 'Special group rates', color: Colors.secondary },
];

export default function HomeScreen({ navigation }: any) {
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting('Good afternoon');
    else if (hour >= 17) setGreeting('Good evening');
  }, []);

  const handleVehicleSelect = (vehicleType: typeof VEHICLE_TYPES[0]) => {
    navigation.navigate('VehicleSelect', { vehicle: vehicleType });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.userName}>Ready to ride? 🚌</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Location Bar */}
          <TouchableOpacity
            style={styles.locationBar}
            onPress={() => navigation.navigate('Location', { mode: 'pickup' })}
          >
            <Ionicons name="location" size={18} color={Colors.primary} />
            <Text style={styles.locationText}>Where are you going?</Text>
            <Ionicons name="search" size={18} color={Colors.text.secondary} />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.body}>
          {/* Quick Book Banner */}
          <View style={styles.quickBanner}>
            <Ionicons name="flash" size={20} color={Colors.warning} />
            <Text style={styles.quickText}>Quick Booking — Vehicle arrives in 15-20 mins!</Text>
          </View>

          {/* Vehicle Type Cards */}
          <Text style={styles.sectionTitle}>Choose Vehicle Type</Text>
          <View style={styles.vehicleRow}>
            {VEHICLE_TYPES.map((v) => (
              <TouchableOpacity
                key={v.id}
                style={styles.vehicleCard}
                onPress={() => handleVehicleSelect(v)}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={[v.color, v.color + 'CC']}
                  style={styles.vehicleCardGrad}
                >
                  <View style={styles.vehicleIconBg}>
                    <Ionicons name={v.icon} size={36} color="#FFFFFF" />
                  </View>
                  <Text style={styles.vehicleLabel}>{v.shortLabel}</Text>
                  <Text style={styles.vehicleSeats}>{v.seats}</Text>
                  <View style={styles.etaChip}>
                    <Ionicons name="time-outline" size={12} color="#FFFFFF" />
                    <Text style={styles.etaText}>{v.eta}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Schedule Option */}
          <TouchableOpacity
            style={styles.scheduleCard}
            onPress={() => navigation.navigate('VehicleSelect', { scheduleMode: true })}
          >
            <View style={styles.scheduleLeft}>
              <View style={styles.scheduleIcon}>
                <Ionicons name="calendar" size={24} color={Colors.accent} />
              </View>
              <View>
                <Text style={styles.scheduleTitle}>Schedule a Trip</Text>
                <Text style={styles.scheduleSub}>Plan your ride for a specific date & time</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
          </TouchableOpacity>

          {/* Promos */}
          <Text style={styles.sectionTitle}>Offers for you</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promoScroll}>
            {PROMO_ITEMS.map((p) => (
              <LinearGradient
                key={p.id}
                colors={[p.color, p.color + 'CC']}
                style={styles.promoCard}
              >
                <Ionicons name="gift" size={28} color="rgba(255,255,255,0.7)" />
                <Text style={styles.promoTitle}>{p.title}</Text>
                <Text style={styles.promoSub}>{p.sub}</Text>
              </LinearGradient>
            ))}
          </ScrollView>

          {/* Features */}
          <Text style={styles.sectionTitle}>Why Travo?</Text>
          <View style={styles.featuresGrid}>
            {[
              { icon: 'shield-checkmark', label: 'Safe & Verified', color: Colors.accent },
              { icon: 'cash', label: 'Best Prices', color: Colors.primary },
              { icon: 'star', label: 'Rated Drivers', color: Colors.warning },
              { icon: 'headset', label: '24/7 Support', color: Colors.secondary },
            ].map((f) => (
              <View key={f.label} style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: f.color + '20' }]}>
                  <Ionicons name={f.icon as any} size={22} color={f.color} />
                </View>
                <Text style={styles.featureLabel}>{f.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingTop: Spacing.md,
    paddingBottom: 32,
    paddingHorizontal: Spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  greeting: { ...Typography.bodySmall, color: 'rgba(255,255,255,0.8)' },
  userName: { ...Typography.h3, color: '#FFFFFF' },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    gap: 10,
  },
  locationText: { flex: 1, ...Typography.body, color: Colors.text.tertiary },
  body: { padding: Spacing.lg },
  quickBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warning + '15',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: 8,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.warning + '30',
  },
  quickText: { ...Typography.bodySmall, color: Colors.warning, fontWeight: '600', flex: 1 },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
  },
  vehicleRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.lg },
  vehicleCard: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.md,
  },
  vehicleCardGrad: {
    padding: Spacing.lg,
    alignItems: 'center',
    minHeight: 180,
    justifyContent: 'space-between',
  },
  vehicleIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleLabel: { ...Typography.h3, color: '#FFFFFF' },
  vehicleSeats: { ...Typography.caption, color: 'rgba(255,255,255,0.8)' },
  etaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  etaText: { ...Typography.caption, color: '#FFFFFF', fontWeight: '600' },
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadow.sm,
  },
  scheduleLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  scheduleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleTitle: { ...Typography.body, color: Colors.text.primary, fontWeight: '600' },
  scheduleSub: { ...Typography.caption, color: Colors.text.secondary, marginTop: 2 },
  promoScroll: { marginBottom: Spacing.lg },
  promoCard: {
    width: width * 0.65,
    marginRight: Spacing.md,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    gap: 6,
  },
  promoTitle: { ...Typography.h4, color: '#FFFFFF' },
  promoSub: { ...Typography.bodySmall, color: 'rgba(255,255,255,0.85)' },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  featureItem: {
    width: (width - Spacing.lg * 2 - Spacing.md) / 2 - 0.5,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 8,
    ...Shadow.sm,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureLabel: { ...Typography.bodySmall, color: Colors.text.primary, fontWeight: '600', textAlign: 'center' },
});
