import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  FlatList, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const RECENT_PLACES = [
  { id: '1', name: 'MG Road', address: 'Mahatma Gandhi Road, Bangalore', icon: 'time' },
  { id: '2', name: 'Indiranagar', address: '100 Feet Road, Indiranagar, Bangalore', icon: 'time' },
  { id: '3', name: 'Koramangala', address: '5th Block, Koramangala, Bangalore', icon: 'time' },
];

const POPULAR = [
  { id: '4', name: 'Bangalore Airport', address: 'Kempegowda International Airport, Devanahalli', icon: 'airplane' },
  { id: '5', name: 'Electronic City', address: 'Electronic City Phase 1, Bangalore', icon: 'business' },
  { id: '6', name: 'Whitefield', address: 'Whitefield Main Road, Bangalore', icon: 'location' },
];

export default function LocationScreen({ route, navigation }: any) {
  const { vehicle, scheduleMode } = route.params || {};
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [activeInput, setActiveInput] = useState<'pickup' | 'drop'>('pickup');
  const [loading, setLoading] = useState(false);

  const handlePlaceSelect = (place: any) => {
    if (activeInput === 'pickup') {
      setPickup(place.name);
      setActiveInput('drop');
    } else {
      setDrop(place.name);
    }
  };

  const handleContinue = () => {
    if (!pickup || !drop) return;
    if (scheduleMode) {
      navigation.navigate('Schedule', { vehicle, pickup, drop });
    } else {
      navigation.navigate('RideType', { vehicle, pickup, drop });
    }
  };

  const activeValue = activeInput === 'pickup' ? pickup : drop;
  const filtered = [...RECENT_PLACES, ...POPULAR].filter(
    (p) => !activeValue || p.name.toLowerCase().includes(activeValue.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Set Pickup & Drop</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Location Inputs */}
      <View style={styles.inputsCard}>
        {/* Pickup */}
        <TouchableOpacity
          style={[styles.inputRow, activeInput === 'pickup' && styles.inputRowActive]}
          onPress={() => setActiveInput('pickup')}
        >
          <View style={[styles.dot, { backgroundColor: Colors.map.pickup }]} />
          <TextInput
            style={styles.input}
            placeholder="Pickup location"
            placeholderTextColor={Colors.text.tertiary}
            value={pickup}
            onChangeText={(t) => { setPickup(t); setActiveInput('pickup'); }}
            onFocus={() => setActiveInput('pickup')}
          />
          {pickup ? (
            <TouchableOpacity onPress={() => setPickup('')}>
              <Ionicons name="close-circle" size={18} color={Colors.text.tertiary} />
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>

        {/* Divider line */}
        <View style={styles.routeLine} />

        {/* Drop */}
        <TouchableOpacity
          style={[styles.inputRow, activeInput === 'drop' && styles.inputRowActive]}
          onPress={() => setActiveInput('drop')}
        >
          <View style={[styles.dot, { backgroundColor: Colors.map.drop }]} />
          <TextInput
            style={styles.input}
            placeholder="Drop location"
            placeholderTextColor={Colors.text.tertiary}
            value={drop}
            onChangeText={(t) => { setDrop(t); setActiveInput('drop'); }}
            onFocus={() => setActiveInput('drop')}
          />
          {drop ? (
            <TouchableOpacity onPress={() => setDrop('')}>
              <Ionicons name="close-circle" size={18} color={Colors.text.tertiary} />
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
      </View>

      {/* Current Location */}
      <TouchableOpacity
        style={styles.currentLocBtn}
        onPress={() => handlePlaceSelect({ name: 'Current Location', address: 'Using GPS' })}
      >
        <Ionicons name="navigate" size={18} color={Colors.accent} />
        <Text style={styles.currentLocText}>Use current location</Text>
      </TouchableOpacity>

      {/* Suggestions */}
      <Text style={styles.sectionLabel}>
        {activeValue ? 'Search Results' : 'Recent & Popular'}
      </Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.placeItem} onPress={() => handlePlaceSelect(item)}>
            <View style={styles.placeIcon}>
              <Ionicons name={item.icon as any} size={18} color={Colors.text.secondary} />
            </View>
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{item.name}</Text>
              <Text style={styles.placeAddress} numberOfLines={1}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueBtn, (!pickup || !drop) && styles.continueBtnDisabled]}
          onPress={handleContinue}
          disabled={!pickup || !drop}
        >
          <Text style={styles.continueBtnText}>
            {scheduleMode ? 'Set Date & Time' : 'See Fare'}
          </Text>
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
  inputsCard: {
    margin: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadow.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    gap: Spacing.md,
  },
  inputRowActive: { backgroundColor: Colors.borderLight },
  dot: { width: 12, height: 12, borderRadius: 6 },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.text.primary,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: Colors.border,
    marginLeft: 21,
  },
  currentLocBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  currentLocText: { ...Typography.bodySmall, color: Colors.accent, fontWeight: '600' },
  sectionLabel: {
    ...Typography.label,
    color: Colors.text.secondary,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  list: { flex: 1 },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    gap: Spacing.md,
    backgroundColor: Colors.surface,
  },
  placeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeInfo: { flex: 1 },
  placeName: { ...Typography.body, color: Colors.text.primary, fontWeight: '500' },
  placeAddress: { ...Typography.caption, color: Colors.text.secondary, marginTop: 2 },
  separator: { height: 1, backgroundColor: Colors.border, marginLeft: 70 },
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
