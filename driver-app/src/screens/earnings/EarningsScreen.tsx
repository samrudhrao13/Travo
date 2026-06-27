import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const PERIODS = ['Today', 'This Week', 'This Month'];

const EARNINGS_DATA: Record<string, { total: number; trips: number; hours: number; breakdown: { label: string; amount: number }[] }> = {
  Today: {
    total: 1240,
    trips: 4,
    hours: 6,
    breakdown: [
      { label: 'Base fare', amount: 1050 },
      { label: 'Distance bonus', amount: 140 },
      { label: 'Peak hour bonus', amount: 50 },
    ],
  },
  'This Week': {
    total: 8650,
    trips: 22,
    hours: 38,
    breakdown: [
      { label: 'Base fare', amount: 7200 },
      { label: 'Distance bonus', amount: 980 },
      { label: 'Peak hour bonus', amount: 470 },
    ],
  },
  'This Month': {
    total: 32400,
    trips: 88,
    hours: 145,
    breakdown: [
      { label: 'Base fare', amount: 27000 },
      { label: 'Distance bonus', amount: 3800 },
      { label: 'Peak hour bonus', amount: 1600 },
    ],
  },
};

export default function EarningsScreen() {
  const [period, setPeriod] = useState('Today');
  const data = EARNINGS_DATA[period];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Earnings</Text>
        </View>

        {/* Period Selector */}
        <View style={styles.periodRow}>
          {PERIODS.map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.periodBtn, period === p && styles.periodBtnActive]}
              onPress={() => setPeriod(p)}
            >
              <Text style={[styles.periodText, period === p && styles.periodTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Earnings Hero */}
        <LinearGradient colors={[Colors.primary, '#152A46']} style={styles.earningsHero}>
          <Text style={styles.earningsLabel}>Total Earnings</Text>
          <Text style={styles.earningsAmount}>₹{data.total.toLocaleString()}</Text>
          <View style={styles.earningsStats}>
            <View style={styles.earningStat}>
              <Ionicons name="car" size={16} color="rgba(255,255,255,0.7)" />
              <Text style={styles.earningStatText}>{data.trips} Trips</Text>
            </View>
            <View style={styles.earningStat}>
              <Ionicons name="time" size={16} color="rgba(255,255,255,0.7)" />
              <Text style={styles.earningStatText}>{data.hours} Hours</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Earnings Breakdown</Text>
          <View style={styles.breakdownCard}>
            {data.breakdown.map((b, i) => (
              <React.Fragment key={b.label}>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>{b.label}</Text>
                  <Text style={styles.breakdownValue}>₹{b.amount.toLocaleString()}</Text>
                </View>
                {i < data.breakdown.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{data.total.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>
          <View style={styles.performanceGrid}>
            {[
              { label: 'Acceptance Rate', value: '94%', icon: 'checkmark-circle', color: Colors.accent },
              { label: 'Completion Rate', value: '98%', icon: 'flag', color: Colors.primary },
              { label: 'Avg. Rating', value: '4.8 ⭐', icon: 'star', color: Colors.warning },
              { label: 'Cancellations', value: '2', icon: 'close-circle', color: Colors.danger },
            ].map((p) => (
              <View key={p.label} style={styles.perfCard}>
                <Ionicons name={p.icon as any} size={24} color={p.color} />
                <Text style={styles.perfValue}>{p.value}</Text>
                <Text style={styles.perfLabel}>{p.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Payout */}
        <View style={styles.payoutCard}>
          <Ionicons name="wallet" size={24} color={Colors.accent} />
          <View style={styles.payoutText}>
            <Text style={styles.payoutTitle}>Next Payout</Text>
            <Text style={styles.payoutSub}>₹8,650 · Expected Monday</Text>
          </View>
          <TouchableOpacity style={styles.payoutBtn}>
            <Text style={styles.payoutBtnText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: Spacing.lg, backgroundColor: Colors.surface, ...Shadow.sm },
  title: { ...Typography.h3, color: Colors.text.primary },
  periodRow: { flexDirection: 'row', padding: Spacing.md, gap: Spacing.sm },
  periodBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  periodBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  periodText: { ...Typography.bodySmall, color: Colors.text.secondary, fontWeight: '500' },
  periodTextActive: { color: '#FFFFFF', fontWeight: '700' },
  earningsHero: {
    margin: Spacing.lg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  earningsLabel: { ...Typography.bodySmall, color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  earningsAmount: { fontSize: 52, fontWeight: '800', color: '#FFFFFF', letterSpacing: -1, marginBottom: Spacing.lg },
  earningsStats: { flexDirection: 'row', gap: Spacing.xl },
  earningStat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  earningStatText: { ...Typography.bodySmall, color: 'rgba(255,255,255,0.85)' },
  section: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.lg },
  sectionTitle: { ...Typography.h4, color: Colors.text.primary, marginBottom: Spacing.md },
  breakdownCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, padding: Spacing.md, ...Shadow.sm },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  breakdownLabel: { ...Typography.bodySmall, color: Colors.text.secondary },
  breakdownValue: { ...Typography.bodySmall, color: Colors.text.primary, fontWeight: '500' },
  divider: { height: 1, backgroundColor: Colors.borderLight },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 4,
  },
  totalLabel: { ...Typography.body, color: Colors.text.primary, fontWeight: '700' },
  totalValue: { ...Typography.h4, color: Colors.accent },
  performanceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md },
  perfCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 4,
    ...Shadow.sm,
  },
  perfValue: { ...Typography.h4, color: Colors.text.primary },
  perfLabel: { ...Typography.caption, color: Colors.text.secondary, textAlign: 'center' },
  payoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    margin: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  payoutText: { flex: 1 },
  payoutTitle: { ...Typography.body, color: Colors.text.primary, fontWeight: '600' },
  payoutSub: { ...Typography.bodySmall, color: Colors.text.secondary },
  payoutBtn: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
  },
  payoutBtnText: { ...Typography.bodySmall, color: '#FFFFFF', fontWeight: '700' },
});
