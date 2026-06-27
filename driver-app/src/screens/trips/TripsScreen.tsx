import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const TRIPS = [
  { id: 'T001', pickup: 'Indiranagar', drop: 'Whitefield', date: 'Today 10:30 AM', fare: 840, seats: 9, distance: '14 km', status: 'completed' },
  { id: 'T002', pickup: 'MG Road', drop: 'Bangalore Airport', date: 'Today 8:00 AM', fare: 1200, seats: 9, distance: '42 km', status: 'completed' },
  { id: 'T003', pickup: 'Koramangala', drop: 'Electronic City', date: 'Yesterday 4:00 PM', fare: 620, seats: 9, distance: '10 km', status: 'completed' },
  { id: 'T004', pickup: 'Jayanagar', drop: 'Mysore', date: 'Jun 23 6:00 AM', fare: 3200, seats: 12, distance: '145 km', status: 'scheduled' },
];

export default function TripsScreen() {
  const [tab, setTab] = useState<'all' | 'completed' | 'scheduled'>('all');
  const filtered = tab === 'all' ? TRIPS : TRIPS.filter((t) => t.status === tab);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
      </View>

      <View style={styles.tabs}>
        {(['all', 'completed', 'scheduled'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: Spacing.lg }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.tripId}>#{item.id}</Text>
              <View style={[
                styles.badge,
                { backgroundColor: item.status === 'completed' ? Colors.accentLight : Colors.primaryLight }
              ]}>
                <Text style={[
                  styles.badgeText,
                  { color: item.status === 'completed' ? Colors.accent : Colors.primary }
                ]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <View style={styles.route}>
              <View style={styles.routeRow}>
                <View style={[styles.dot, { backgroundColor: Colors.accent }]} />
                <Text style={styles.routeText}>{item.pickup}</Text>
              </View>
              <View style={[styles.dot, { width: 2, height: 14, marginLeft: 4, backgroundColor: Colors.border }]} />
              <View style={styles.routeRow}>
                <View style={[styles.dot, { backgroundColor: Colors.warning }]} />
                <Text style={styles.routeText}>{item.drop}</Text>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <View style={styles.metaItem}>
                <Ionicons name="people" size={14} color={Colors.text.secondary} />
                <Text style={styles.metaText}>{item.seats} seats</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="navigate" size={14} color={Colors.text.secondary} />
                <Text style={styles.metaText}>{item.distance}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time" size={14} color={Colors.text.secondary} />
                <Text style={styles.metaText}>{item.date}</Text>
              </View>
              <Text style={styles.fare}>₹{item.fare}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: Spacing.lg, backgroundColor: Colors.surface, ...Shadow.sm },
  title: { ...Typography.h3, color: Colors.text.primary },
  tabs: { flexDirection: 'row', padding: Spacing.md, gap: Spacing.sm },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  tabActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabText: { ...Typography.bodySmall, color: Colors.text.secondary, fontWeight: '500' },
  tabTextActive: { color: '#FFFFFF', fontWeight: '700' },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.sm,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  tripId: { ...Typography.bodySmall, color: Colors.text.secondary, fontWeight: '600' },
  badge: { paddingHorizontal: Spacing.sm, paddingVertical: 4, borderRadius: BorderRadius.full },
  badgeText: { ...Typography.caption, fontWeight: '600' },
  route: { marginBottom: Spacing.md },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 3 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  routeText: { ...Typography.bodySmall, color: Colors.text.primary },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.borderLight, paddingTop: Spacing.sm },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { ...Typography.caption, color: Colors.text.secondary },
  fare: { marginLeft: 'auto', ...Typography.h4, color: Colors.accent },
});
