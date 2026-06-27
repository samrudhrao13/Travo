import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const TIMES = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
  '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
];

function getDates() {
  const dates = [];
  const now = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  for (let i = 0; i < 14; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    dates.push({
      day: days[d.getDay()],
      date: d.getDate(),
      month: months[d.getMonth()],
      full: d.toISOString().split('T')[0],
      isToday: i === 0,
    });
  }
  return dates;
}

export default function ScheduleScreen({ route, navigation }: any) {
  const { vehicle, pickup, drop } = route.params;
  const dates = getDates();
  const [selectedDate, setSelectedDate] = useState(dates[0].full);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleContinue = () => {
    if (!selectedDate || !selectedTime) return;
    navigation.navigate('Fare', {
      vehicle,
      pickup,
      drop,
      rideType: 'schedule',
      scheduledAt: `${selectedDate} ${selectedTime}`,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Trip</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Date Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
            {dates.map((d) => (
              <TouchableOpacity
                key={d.full}
                style={[styles.dateCard, selectedDate === d.full && styles.dateCardActive]}
                onPress={() => setSelectedDate(d.full)}
              >
                <Text style={[styles.dateDay, selectedDate === d.full && styles.dateTextActive]}>
                  {d.isToday ? 'Today' : d.day}
                </Text>
                <Text style={[styles.dateNum, selectedDate === d.full && styles.dateTextActive]}>
                  {d.date}
                </Text>
                <Text style={[styles.dateMon, selectedDate === d.full && styles.dateTextActive]}>
                  {d.month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {TIMES.map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.timeChip, selectedTime === t && styles.timeChipActive]}
                onPress={() => setSelectedTime(t)}
              >
                <Text style={[styles.timeText, selectedTime === t && styles.timeTextActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Summary */}
        {selectedDate && selectedTime && (
          <View style={styles.summaryCard}>
            <Ionicons name="calendar-check" size={24} color={Colors.accent} />
            <View style={styles.summaryText}>
              <Text style={styles.summaryLabel}>Your scheduled trip</Text>
              <Text style={styles.summaryValue}>
                {dates.find((d) => d.full === selectedDate)?.day},{' '}
                {dates.find((d) => d.full === selectedDate)?.date}{' '}
                {dates.find((d) => d.full === selectedDate)?.month} · {selectedTime}
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueBtn, (!selectedDate || !selectedTime) && styles.continueBtnDisabled]}
          onPress={handleContinue}
          disabled={!selectedDate || !selectedTime}
        >
          <Text style={styles.continueBtnText}>See Fare Estimate</Text>
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
    ...Shadow.sm,
  },
  backBtn: { padding: 4 },
  headerTitle: { ...Typography.h4, color: Colors.text.primary },
  section: { padding: Spacing.lg },
  sectionTitle: { ...Typography.h4, color: Colors.text.primary, marginBottom: Spacing.md },
  dateScroll: { marginHorizontal: -4 },
  dateCard: {
    width: 62,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    marginHorizontal: 4,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  dateCardActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  dateDay: { ...Typography.caption, color: Colors.text.secondary, marginBottom: 4 },
  dateNum: { ...Typography.h3, color: Colors.text.primary, marginBottom: 2 },
  dateMon: { ...Typography.caption, color: Colors.text.secondary },
  dateTextActive: { color: '#FFFFFF' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  timeChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  timeChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  timeText: { ...Typography.bodySmall, color: Colors.text.primary },
  timeTextActive: { color: '#FFFFFF', fontWeight: '600' },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    margin: Spacing.lg,
    backgroundColor: Colors.accentLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  summaryText: { flex: 1 },
  summaryLabel: { ...Typography.caption, color: Colors.text.secondary },
  summaryValue: { ...Typography.body, color: Colors.text.primary, fontWeight: '600' },
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
