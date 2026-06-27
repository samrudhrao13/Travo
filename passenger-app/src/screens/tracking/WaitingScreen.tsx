import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const MOCK_DRIVER = {
  name: 'Rajan Kumar',
  rating: 4.8,
  totalTrips: 342,
  vehicleNumber: 'KA 04 AB 1234',
  phone: '+91 98765 43210',
};

export default function WaitingScreen({ route, navigation }: any) {
  const { vehicle, pickup, drop, fare, bookingId } = route.params;
  const [eta, setEta] = useState(18);
  const [driverAssigned, setDriverAssigned] = useState(false);
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.2, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();

    // Simulate driver assignment after 3 seconds
    const t1 = setTimeout(() => setDriverAssigned(true), 3000);

    // ETA countdown
    const t2 = setInterval(() => {
      setEta((e) => {
        if (e <= 1) {
          clearInterval(t2);
          navigation.replace('Tracking', { vehicle, pickup, drop, fare, bookingId, driver: MOCK_DRIVER });
          return 0;
        }
        return e - 1;
      });
    }, 6000); // Speed up for demo

    return () => { clearTimeout(t1); clearInterval(t2); };
  }, []);

  const handleCancel = () => {
    Alert.alert('Cancel Booking', 'Are you sure you want to cancel?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes, Cancel', style: 'destructive', onPress: () => navigation.navigate('HomeMain') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* ETA Banner */}
      <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.etaBanner}>
        <Text style={styles.etaLabel}>Estimated arrival</Text>
        <Text style={styles.etaTime}>{eta} min</Text>
        <Text style={styles.bookingId}>Booking #{bookingId}</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Pulse Loader */}
        {!driverAssigned ? (
          <View style={styles.searchingContainer}>
            <Animated.View style={[styles.pulseOuter, { transform: [{ scale: pulse }] }]}>
              <View style={styles.pulseInner}>
                <Ionicons name="bus" size={36} color={Colors.primary} />
              </View>
            </Animated.View>
            <Text style={styles.searchingText}>Finding your driver...</Text>
            <Text style={styles.searchingSub}>We're matching you with the best available driver</Text>
          </View>
        ) : (
          <View style={styles.driverCard}>
            <View style={styles.driverAvatar}>
              <Ionicons name="person" size={36} color={Colors.text.secondary} />
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{MOCK_DRIVER.name}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color={Colors.warning} />
                <Text style={styles.rating}>{MOCK_DRIVER.rating}</Text>
                <Text style={styles.trips}>· {MOCK_DRIVER.totalTrips} trips</Text>
              </View>
              <Text style={styles.vehicleNum}>{MOCK_DRIVER.vehicleNumber}</Text>
            </View>
            <TouchableOpacity style={styles.callBtn}>
              <Ionicons name="call" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        )}

        {/* Route Summary */}
        <View style={styles.routeCard}>
          <View style={styles.routeRow}>
            <View style={[styles.routeDot, { backgroundColor: Colors.map.pickup }]} />
            <Text style={styles.routeText} numberOfLines={1}>{pickup}</Text>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routeRow}>
            <View style={[styles.routeDot, { backgroundColor: Colors.map.drop }]} />
            <Text style={styles.routeText} numberOfLines={1}>{drop}</Text>
          </View>
        </View>

        {/* Fare */}
        <View style={styles.fareRow}>
          <Text style={styles.fareLabel}>Total Fare</Text>
          <Text style={styles.fareAmount}>₹{fare?.total}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
        <Text style={styles.cancelText}>Cancel Booking</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  etaBanner: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  etaLabel: { ...Typography.bodySmall, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  etaTime: { fontSize: 52, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1 },
  bookingId: { ...Typography.caption, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  content: { flex: 1, padding: Spacing.lg },
  searchingContainer: { alignItems: 'center', paddingVertical: Spacing.xl },
  pulseOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  pulseInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary + '30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchingText: { ...Typography.h3, color: Colors.text.primary, marginBottom: 8 },
  searchingSub: { ...Typography.bodySmall, color: Colors.text.secondary, textAlign: 'center' },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    gap: Spacing.md,
    ...Shadow.md,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverInfo: { flex: 1 },
  driverName: { ...Typography.body, color: Colors.text.primary, fontWeight: '700', marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  rating: { ...Typography.bodySmall, color: Colors.text.primary, fontWeight: '600' },
  trips: { ...Typography.bodySmall, color: Colors.text.secondary },
  vehicleNum: { ...Typography.bodySmall, color: Colors.text.secondary },
  callBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  routeDot: { width: 10, height: 10, borderRadius: 5 },
  routeText: { flex: 1, ...Typography.bodySmall, color: Colors.text.primary },
  routeLine: { width: 2, height: 16, backgroundColor: Colors.border, marginLeft: 4, marginVertical: 4 },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  fareLabel: { ...Typography.bodySmall, color: Colors.primary },
  fareAmount: { ...Typography.h4, color: Colors.primary },
  cancelBtn: {
    margin: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.danger,
    alignItems: 'center',
  },
  cancelText: { ...Typography.body, color: Colors.danger, fontWeight: '600' },
});
