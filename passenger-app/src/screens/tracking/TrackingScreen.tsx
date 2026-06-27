import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const { height } = Dimensions.get('window');

const TRIP_STAGES = [
  { id: 'arriving', label: 'Driver Arriving', icon: 'car-outline' as const, color: Colors.primary },
  { id: 'started', label: 'Trip Started', icon: 'navigate-outline' as const, color: Colors.accent },
  { id: 'completed', label: 'Trip Completed', icon: 'checkmark-circle' as const, color: Colors.accent },
];

export default function TrackingScreen({ route, navigation }: any) {
  const { vehicle, pickup, drop, fare, bookingId, driver } = route.params;
  const [stage, setStage] = useState<'arriving' | 'started' | 'completed'>('arriving');
  const [eta, setEta] = useState(5);

  useEffect(() => {
    // Simulate trip progression
    const t1 = setTimeout(() => setStage('started'), 8000);
    const t2 = setTimeout(() => {
      setStage('completed');
      setTimeout(() => {
        navigation.replace('TripComplete', { vehicle, pickup, drop, fare, driver, bookingId });
      }, 2000);
    }, 20000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <View style={styles.container}>
      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <View style={styles.mapContent}>
          <Ionicons name="map" size={64} color={Colors.border} />
          <Text style={styles.mapText}>Live Map</Text>
          <Text style={styles.mapSub}>Google Maps / react-native-maps</Text>
        </View>

        {/* Booking ID */}
        <View style={styles.bookingBadge}>
          <Text style={styles.bookingBadgeText}>#{bookingId}</Text>
        </View>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Stage Indicator */}
        <View style={styles.stageRow}>
          {TRIP_STAGES.map((s, i) => (
            <React.Fragment key={s.id}>
              <View style={styles.stageItem}>
                <View style={[
                  styles.stageIcon,
                  { backgroundColor: TRIP_STAGES.indexOf(TRIP_STAGES.find(x => x.id === stage)!) >= i ? s.color : Colors.border }
                ]}>
                  <Ionicons name={s.icon} size={16} color="#FFFFFF" />
                </View>
                <Text style={styles.stageLabel}>{s.label}</Text>
              </View>
              {i < TRIP_STAGES.length - 1 && <View style={styles.stageLine} />}
            </React.Fragment>
          ))}
        </View>

        {/* Status */}
        <View style={styles.statusCard}>
          <Ionicons
            name={stage === 'arriving' ? 'car' : stage === 'started' ? 'navigate' : 'checkmark-circle'}
            size={24}
            color={stage === 'completed' ? Colors.accent : Colors.primary}
          />
          <View style={styles.statusText}>
            <Text style={styles.statusTitle}>
              {stage === 'arriving' ? 'Driver is on the way' :
               stage === 'started' ? 'Trip in progress' : 'Trip completed!'}
            </Text>
            <Text style={styles.statusSub}>
              {stage === 'arriving' ? `${eta} min to pickup · ${pickup}` :
               stage === 'started' ? `Heading to ${drop}` : 'Thank you for riding with Travo!'}
            </Text>
          </View>
        </View>

        {/* Driver Card */}
        <View style={styles.driverCard}>
          <View style={styles.driverLeft}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color={Colors.text.secondary} />
            </View>
            <View>
              <Text style={styles.driverName}>{driver?.name}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={12} color={Colors.warning} />
                <Text style={styles.rating}>{driver?.rating}</Text>
              </View>
            </View>
          </View>
          <View style={styles.driverActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="chatbubble" size={18} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="call" size={18} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Fare */}
        <View style={styles.fareRow}>
          <View>
            <Text style={styles.fareLabel}>Vehicle</Text>
            <Text style={styles.fareValue}>{vehicle?.name}</Text>
          </View>
          <View style={styles.fareDivider} />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.fareLabel}>From</Text>
            <Text style={styles.fareValue} numberOfLines={1}>{pickup}</Text>
          </View>
          <View style={styles.fareDivider} />
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.fareLabel}>Fare</Text>
            <Text style={[styles.fareValue, { color: Colors.primary }]}>₹{fare?.total}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContent: { alignItems: 'center', gap: 8 },
  mapText: { ...Typography.h3, color: Colors.text.tertiary },
  mapSub: { ...Typography.bodySmall, color: Colors.text.tertiary },
  bookingBadge: {
    position: 'absolute',
    top: 56,
    right: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    ...Shadow.sm,
  },
  bookingBadgeText: { ...Typography.caption, color: Colors.text.secondary, fontWeight: '600' },
  bottomSheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.lg,
    paddingBottom: 32,
    ...Shadow.lg,
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  stageItem: { alignItems: 'center', gap: 4 },
  stageIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageLabel: { ...Typography.caption, color: Colors.text.secondary, width: 70, textAlign: 'center' },
  stageLine: { flex: 1, height: 2, backgroundColor: Colors.border, marginBottom: 20 },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.borderLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  statusText: { flex: 1 },
  statusTitle: { ...Typography.body, color: Colors.text.primary, fontWeight: '600', marginBottom: 2 },
  statusSub: { ...Typography.bodySmall, color: Colors.text.secondary },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.borderLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  driverLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverName: { ...Typography.body, color: Colors.text.primary, fontWeight: '600' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { ...Typography.caption, color: Colors.text.secondary },
  driverActions: { flexDirection: 'row', gap: Spacing.sm },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fareLabel: { ...Typography.caption, color: Colors.text.secondary, marginBottom: 2 },
  fareValue: { ...Typography.bodySmall, color: Colors.text.primary, fontWeight: '600' },
  fareDivider: { width: 1, height: 30, backgroundColor: Colors.border },
});
