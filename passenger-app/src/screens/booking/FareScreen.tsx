import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash', icon: 'cash' as const },
  { id: 'upi', label: 'UPI', icon: 'phone-portrait' as const },
  { id: 'card', label: 'Card', icon: 'card' as const },
];

function estimateFare(vehicle: any, distanceKm = 12) {
  const base = vehicle?.basePrice || 250;
  const perKm = vehicle?.pricePerKm || 18;
  const subtotal = base + perKm * distanceKm;
  const gst = Math.round(subtotal * 0.05);
  return { subtotal, gst, total: subtotal + gst, distance: distanceKm };
}

export default function FareScreen({ route, navigation }: any) {
  const { vehicle, pickup, drop, rideType, scheduledAt } = route.params;
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const fare = estimateFare(vehicle);

  const handleConfirm = () => {
    navigation.navigate('Confirm', {
      vehicle, pickup, drop, rideType, scheduledAt, fare, paymentMethod,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fare Estimate</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Fare Hero */}
        <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.fareHero}>
          <Text style={styles.fareLabel}>Estimated Fare</Text>
          <Text style={styles.fareAmount}>₹{fare.total}</Text>
          <Text style={styles.fareSubLabel}>{fare.distance} km · {vehicle?.name}</Text>
        </LinearGradient>

        {/* Route & Timing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Details</Text>
          <View style={styles.detailCard}>
            <DetailRow icon="location" label="Pickup" value={pickup} color={Colors.map.pickup} />
            <View style={styles.detailDivider} />
            <DetailRow icon="navigate" label="Drop" value={drop} color={Colors.map.drop} />
            <View style={styles.detailDivider} />
            <DetailRow
              icon={rideType === 'schedule' ? 'calendar' : 'flash'}
              label="Type"
              value={rideType === 'schedule' ? `Scheduled · ${scheduledAt}` : 'Book Now (15-20 min)'}
              color={Colors.primary}
            />
          </View>
        </View>

        {/* Fare Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fare Breakdown</Text>
          <View style={styles.fareCard}>
            <FareRow label={`Base fare (${vehicle?.seats} seats)`} value={`₹${vehicle?.basePrice}`} />
            <FareRow label={`Distance (${fare.distance} km × ₹${vehicle?.pricePerKm})`} value={`₹${vehicle?.pricePerKm * fare.distance}`} />
            <FareRow label="GST (5%)" value={`₹${fare.gst}`} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{fare.total}</Text>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentRow}>
            {PAYMENT_METHODS.map((pm) => (
              <TouchableOpacity
                key={pm.id}
                style={[styles.pmCard, paymentMethod === pm.id && styles.pmCardActive]}
                onPress={() => setPaymentMethod(pm.id)}
              >
                <Ionicons
                  name={pm.icon}
                  size={22}
                  color={paymentMethod === pm.id ? Colors.primary : Colors.text.secondary}
                />
                <Text style={[styles.pmLabel, paymentMethod === pm.id && styles.pmLabelActive]}>
                  {pm.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmBtnText}>Confirm Booking</Text>
          <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function DetailRow({ icon, label, value, color }: any) {
  return (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={16} color={color} />
      <View style={styles.detailText}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

function FareRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.fareRow}>
      <Text style={styles.fareRowLabel}>{label}</Text>
      <Text style={styles.fareRowValue}>{value}</Text>
    </View>
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
  fareHero: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  fareLabel: { ...Typography.bodySmall, color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  fareAmount: { fontSize: 48, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1 },
  fareSubLabel: { ...Typography.bodySmall, color: 'rgba(255,255,255,0.8)', marginTop: 8 },
  section: { padding: Spacing.lg },
  sectionTitle: { ...Typography.h4, color: Colors.text.primary, marginBottom: Spacing.md },
  detailCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, overflow: 'hidden', ...Shadow.sm },
  detailRow: { flexDirection: 'row', alignItems: 'flex-start', padding: Spacing.md, gap: Spacing.md },
  detailDivider: { height: 1, backgroundColor: Colors.border, marginLeft: 48 },
  detailText: { flex: 1 },
  detailLabel: { ...Typography.caption, color: Colors.text.secondary, marginBottom: 2 },
  detailValue: { ...Typography.bodySmall, color: Colors.text.primary, fontWeight: '500' },
  fareCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  fareRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  fareRowLabel: { ...Typography.bodySmall, color: Colors.text.secondary },
  fareRowValue: { ...Typography.bodySmall, color: Colors.text.primary },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 4,
  },
  totalLabel: { ...Typography.body, color: Colors.text.primary, fontWeight: '700' },
  totalValue: { ...Typography.h3, color: Colors.primary },
  paymentRow: { flexDirection: 'row', gap: Spacing.md },
  pmCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 6,
  },
  pmCardActive: { borderColor: Colors.primary, backgroundColor: Colors.primaryLight },
  pmLabel: { ...Typography.caption, color: Colors.text.secondary },
  pmLabelActive: { color: Colors.primary, fontWeight: '600' },
  footer: { padding: Spacing.lg, backgroundColor: Colors.surface, ...Shadow.md },
  confirmBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmBtnText: { ...Typography.button, color: '#FFFFFF' },
});
