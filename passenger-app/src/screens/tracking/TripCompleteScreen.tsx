import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

export default function TripCompleteScreen({ route, navigation }: any) {
  const { vehicle, pickup, drop, fare, driver, bookingId } = route.params;
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => navigation.navigate('HomeMain'), 2000);
  };

  if (submitted) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <LinearGradient colors={[Colors.accent, '#059669']} style={styles.successCircle}>
          <Ionicons name="checkmark" size={56} color="#FFFFFF" />
        </LinearGradient>
        <Text style={styles.successTitle}>Thanks for your rating!</Text>
        <Text style={styles.successSub}>Redirecting to home...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Hero */}
        <LinearGradient colors={[Colors.accent, '#059669']} style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="checkmark-circle" size={56} color="#FFFFFF" />
          </View>
          <Text style={styles.heroTitle}>Trip Completed!</Text>
          <Text style={styles.heroSub}>You've arrived at your destination</Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Summary */}
          <View style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Trip Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Booking ID</Text>
              <Text style={styles.summaryValue}>#{bookingId}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Vehicle</Text>
              <Text style={styles.summaryValue}>{vehicle?.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>From</Text>
              <Text style={styles.summaryValue} numberOfLines={1}>{pickup}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>To</Text>
              <Text style={styles.summaryValue} numberOfLines={1}>{drop}</Text>
            </View>
            <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
              <Text style={[styles.summaryLabel, { fontWeight: '700' }]}>Total Paid</Text>
              <Text style={[styles.summaryValue, { color: Colors.primary, fontWeight: '800', fontSize: 18 }]}>
                ₹{fare?.total}
              </Text>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.ratingCard}>
            <View style={styles.driverRow}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={28} color={Colors.text.secondary} />
              </View>
              <View>
                <Text style={styles.driverName}>{driver?.name}</Text>
                <Text style={styles.driverSub}>How was your trip?</Text>
              </View>
            </View>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={40}
                    color={star <= rating ? Colors.warning : Colors.border}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.ratingLabel}>
              {rating === 0 ? 'Tap to rate' :
               rating <= 2 ? 'Sorry to hear that' :
               rating === 3 ? 'Average experience' :
               rating === 4 ? 'Good trip!' : 'Excellent! ⭐'}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitBtn, rating === 0 && styles.submitBtnAlt]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitBtnText}>
            {rating === 0 ? 'Skip & Go Home' : 'Submit Rating'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  successTitle: { ...Typography.h2, color: Colors.text.primary, marginBottom: 8 },
  successSub: { ...Typography.body, color: Colors.text.secondary },
  hero: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  heroIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  heroTitle: { ...Typography.h2, color: '#FFFFFF', marginBottom: 8 },
  heroSub: { ...Typography.body, color: 'rgba(255,255,255,0.85)' },
  content: { padding: Spacing.lg },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow.sm,
  },
  sectionTitle: { ...Typography.h4, color: Colors.text.primary, marginBottom: Spacing.md },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  summaryLabel: { ...Typography.bodySmall, color: Colors.text.secondary },
  summaryValue: { ...Typography.bodySmall, color: Colors.text.primary, fontWeight: '500', flex: 1, textAlign: 'right' },
  ratingCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadow.sm,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverName: { ...Typography.body, color: Colors.text.primary, fontWeight: '600' },
  driverSub: { ...Typography.bodySmall, color: Colors.text.secondary },
  stars: { flexDirection: 'row', gap: 8, marginBottom: Spacing.md },
  ratingLabel: { ...Typography.bodySmall, color: Colors.text.secondary },
  footer: { padding: Spacing.lg, backgroundColor: Colors.surface, ...Shadow.md },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitBtnAlt: { backgroundColor: Colors.border },
  submitBtnText: { ...Typography.button, color: '#FFFFFF' },
});
