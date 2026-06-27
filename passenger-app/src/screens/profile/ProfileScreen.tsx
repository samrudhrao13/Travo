import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const MENU_ITEMS = [
  { id: 'payment', icon: 'card', label: 'Payment Methods', sub: 'Manage cards & UPI', color: Colors.primary },
  { id: 'notifications', icon: 'notifications', label: 'Notifications', sub: 'Manage alerts', color: Colors.warning },
  { id: 'support', icon: 'headset', label: 'Help & Support', sub: '24/7 customer care', color: Colors.secondary },
  { id: 'refer', icon: 'gift', label: 'Refer & Earn', sub: 'Invite friends, get ₹100', color: Colors.accent },
  { id: 'about', icon: 'information-circle', label: 'About Travo', sub: 'Version 1.0.0', color: Colors.text.secondary },
];

export default function ProfileScreen({ onDemoLogout }: any) {
  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => onDemoLogout?.() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient colors={[Colors.secondary, Colors.secondaryLight]} style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Ionicons name="person" size={48} color="#FFFFFF" />
          </View>
          <Text style={styles.userName}>Travo User</Text>
          <Text style={styles.phoneNumber}>+91 XXXXX XXXXX</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil" size={14} color="#FFFFFF" />
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Trips', value: '12' },
            { label: 'Rating', value: '4.8 ⭐' },
            { label: 'Saved', value: '₹340' },
          ].map((s) => (
            <View key={s.label} style={styles.statItem}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.id}>
              <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuSub}>{item.sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.text.tertiary} />
              </TouchableOpacity>
              {index < MENU_ITEMS.length - 1 && <View style={styles.menuDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color={Colors.danger} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Travo Passenger v1.0.0</Text>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  profileHeader: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: 48,
    paddingHorizontal: Spacing.lg,
  },
  avatarLarge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  userName: { ...Typography.h3, color: '#FFFFFF', marginBottom: 4 },
  phoneNumber: { ...Typography.bodySmall, color: 'rgba(255,255,255,0.8)', marginBottom: Spacing.md },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
  },
  editBtnText: { ...Typography.caption, color: '#FFFFFF', fontWeight: '600' },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    marginTop: -24,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadow.md,
    marginBottom: Spacing.lg,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { ...Typography.h3, color: Colors.text.primary, marginBottom: 4 },
  statLabel: { ...Typography.caption, color: Colors.text.secondary },
  menuCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadow.sm,
    marginBottom: Spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: { flex: 1 },
  menuLabel: { ...Typography.body, color: Colors.text.primary, fontWeight: '500' },
  menuSub: { ...Typography.caption, color: Colors.text.secondary, marginTop: 2 },
  menuDivider: { height: 1, backgroundColor: Colors.borderLight, marginLeft: 72 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.danger + '40',
    backgroundColor: '#FEF2F2',
    marginBottom: Spacing.md,
  },
  logoutText: { ...Typography.body, color: Colors.danger, fontWeight: '600' },
  version: { ...Typography.caption, color: Colors.text.tertiary, textAlign: 'center' },
});
