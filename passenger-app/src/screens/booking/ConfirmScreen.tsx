import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

export default function ConfirmScreen({ route, navigation }: any) {
  const { vehicle, pickup, drop, rideType, scheduledAt, fare, paymentMethod } = route.params;
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    setLoading(true);
    // In production: create booking in Firestore and notify driver
    setTimeout(() => {
      setLoading(false);
      navigation.navigate(rideType === 'schedule' ? 'HomeMain' : 'Waiting', {
        vehicle, pickup, drop, fare, paymentMethod,
        bookingId: 'BK' + Date.now(),
      });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Booking</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Vehicle Card */}
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDark]}
          style={styles.vehicleHero}
        >
          <View style={styles.vehicleIcon}>
            <Ionicons name="bus" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.vehicleName}>{vehicle?.name}</Text>
          <Text style={styles.vehicleSeats}>{vehicle?.seats} seats</Text>
        </LinearGradient>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <SummaryRow icon="location" label="From" value={pickup} iconColor={Colors.map.pickup} />
          <SummaryRow icon="navigate" label="To" value={drop} iconColor={Colors.map.drop} />
          <SummaryRow
            icon={rideType === 'schedule' ? 'calendar' : 'flash'}
            label="Ride Type"
            value={rideType === 'schedule' ? `Scheduled · ${scheduledAt}` : 'Now (15-20 min)'}
            iconColor={Colors.primary}
          />
          <SummaryRow
            icon="cash"
            label="Payment"
            value={paymentMethod?.toUpperCase()}
            iconColor={Colors.accent}
          />
        </View>

        {/* Fare */}
        <View style={styles.fareRow}>
          <Text style={styles.fareLabel}>Total Payable</Text>
          <Text style={styles.fareAmount}>₹{fare?.total}</Text>
        </View>

        {/* Policy */}
        <Text style={styles.policy}>
          By confirming, you agree to our cancellation policy. Free cancellation within 5 minutes of booking.
        </Text>
      </View>

      {/* CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={handleBook}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
              <Text style={styles.bookBtnText}>
                {rideType === 'schedule' ? 'Schedule My Trip' : 'Book Now'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ icon, label, value, iconColor }: any) {
  return (
    <View style={styles.summaryRow}>
      <Ionicons name={icon} size={16} color={iconColor} />
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue} numberOfLines={1}>{value}</Text>
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
    ...Shadow.sm,
  },
  backBtn: { padding: 4 },
  headerTitle: { ...Typography.h4, color: Colors.text.primary },
  content: { flex: 1, padding: Spacing.lg },
  vehicleHero: {
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  vehicleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  vehicleName: { ...Typography.h3, color: '#FFFFFF' },
  vehicleSeats: { ...Typography.bodySmall, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: 2,
    marginBottom: Spacing.lg,
    ...Shadow.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  summaryLabel: { ...Typography.bodySmall, color: Colors.text.secondary, width: 60 },
  summaryValue: { flex: 1, ...Typography.bodySmall, color: Colors.text.primary, fontWeight: '500' },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  fareLabel: { ...Typography.body, color: Colors.primary, fontWeight: '600' },
  fareAmount: { ...Typography.h3, color: Colors.primary },
  policy: { ...Typography.caption, color: Colors.text.tertiary, textAlign: 'center', lineHeight: 18 },
  footer: { padding: Spacing.lg, backgroundColor: Colors.surface, ...Shadow.md },
  bookBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  bookBtnText: { ...Typography.button, color: '#FFFFFF' },
});
