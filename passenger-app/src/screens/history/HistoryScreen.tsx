import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const MOCK_TRIPS = [
  {
    id: 'BK001',
    vehicle: 'Tempo Traveller 9',
    pickup: 'Indiranagar',
    drop: 'Whitefield',
    date: 'Today, 10:30 AM',
    fare: 840,
    status: 'completed',
    rating: 5,
  },
  {
    id: 'BK002',
    vehicle: 'Mini Bus',
    pickup: 'MG Road',
    drop: 'Electronic City',
    date: 'Yesterday, 2:00 PM',
    fare: 1620,
    status: 'completed',
    rating: 4,
  },
  {
    id: 'BK003',
    vehicle: 'Tempo Traveller 12',
    pickup: 'Koramangala',
    drop: 'Bangalore Airport',
    date: 'Jun 23, 6:00 AM',
    fare: 1150,
    status: 'scheduled',
    rating: 0,
  },
  {
    id: 'BK004',
    vehicle: 'Tempo Traveller 9',
    pickup: 'Jayanagar',
    drop: 'Mysore Road',
    date: 'Jun 20, 9:00 AM',
    fare: 620,
    status: 'cancelled',
    rating: 0,
  },
];

const STATUS_CONFIG = {
  completed: { color: Colors.accent, bg: Colors.accentLight, label: 'Completed' },
  scheduled: { color: Colors.primary, bg: Colors.primaryLight, label: 'Scheduled' },
  cancelled: { color: Colors.danger, bg: '#FEE2E2', label: 'Cancelled' },
};

export default function HistoryScreen() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'scheduled' | 'cancelled'>('all');

  const filtered = filter === 'all' ? MOCK_TRIPS : MOCK_TRIPS.filter((t) => t.status === filter);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Trips</Text>
      </View>

      {/* Filter Pills */}
      <View style={styles.filterRow}>
        {(['all', 'completed', 'scheduled', 'cancelled'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterPill, filter === f && styles.filterPillActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="bus-outline" size={64} color={Colors.border} />
          <Text style={styles.emptyText}>No trips found</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: Spacing.lg }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const s = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];
            return (
              <View style={styles.tripCard}>
                <View style={styles.tripTop}>
                  <View>
                    <Text style={styles.vehicleName}>{item.vehicle}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: s.bg }]}>
                    <Text style={[styles.statusText, { color: s.color }]}>{s.label}</Text>
                  </View>
                </View>

                <View style={styles.routeRow}>
                  <View style={styles.routePoint}>
                    <View style={[styles.dot, { backgroundColor: Colors.map.pickup }]} />
                    <Text style={styles.routeText}>{item.pickup}</Text>
                  </View>
                  <View style={styles.routeArrow}>
                    <Ionicons name="arrow-down" size={14} color={Colors.border} />
                  </View>
                  <View style={styles.routePoint}>
                    <View style={[styles.dot, { backgroundColor: Colors.map.drop }]} />
                    <Text style={styles.routeText}>{item.drop}</Text>
                  </View>
                </View>

                <View style={styles.tripBottom}>
                  <Text style={styles.fareText}>₹{item.fare}</Text>
                  {item.rating > 0 && (
                    <View style={styles.ratingRow}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Ionicons
                          key={s}
                          name={s <= item.rating ? 'star' : 'star-outline'}
                          size={14}
                          color={Colors.warning}
                        />
                      ))}
                    </View>
                  )}
                  {item.status === 'completed' && item.rating === 0 && (
                    <TouchableOpacity style={styles.rateBtn}>
                      <Text style={styles.rateBtnText}>Rate Trip</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    ...Shadow.sm,
  },
  headerTitle: { ...Typography.h3, color: Colors.text.primary },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  filterPill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  filterPillActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { ...Typography.caption, color: Colors.text.secondary, fontWeight: '500' },
  filterTextActive: { color: '#FFFFFF', fontWeight: '600' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.md },
  emptyText: { ...Typography.body, color: Colors.text.tertiary },
  tripCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  tripTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  vehicleName: { ...Typography.body, color: Colors.text.primary, fontWeight: '600', marginBottom: 4 },
  dateText: { ...Typography.caption, color: Colors.text.secondary },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  statusText: { ...Typography.caption, fontWeight: '600' },
  routeRow: { marginBottom: Spacing.md },
  routePoint: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  routeText: { ...Typography.bodySmall, color: Colors.text.primary },
  routeArrow: { paddingLeft: 12 },
  tripBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.sm,
  },
  fareText: { ...Typography.h4, color: Colors.primary },
  ratingRow: { flexDirection: 'row', gap: 2 },
  rateBtn: {
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
  },
  rateBtnText: { ...Typography.caption, color: Colors.primary, fontWeight: '600' },
});
