import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch,
  Animated, Dimensions, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';
import EarningsScreen from '../earnings/EarningsScreen';
import TripsScreen from '../trips/TripsScreen';

const Tab = createBottomTabNavigator();

// ─── Home / Dashboard ──────────────────────────────────────────────────────
function HomeTab() {
  const [isOnline, setIsOnline] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [timeOnline, setTimeOnline] = useState(0);
  const slideAnim = new Animated.Value(300);

  const MOCK_REQUEST = {
    id: 'BK' + Date.now(),
    passenger: 'Aditya P.',
    vehicle: 'Tempo Traveller 9',
    pickup: 'Indiranagar, Bangalore',
    drop: 'Whitefield, Bangalore',
    distance: '14 km',
    fare: 840,
    eta: '4 min away',
  };

  useEffect(() => {
    if (!isOnline) return;
    const interval = setInterval(() => setTimeOnline((t) => t + 1), 60000);
    // Simulate incoming ride request after 5 seconds
    const t = setTimeout(() => {
      if (isOnline) {
        setShowRequest(true);
        Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true }).start();
      }
    }, 5000);
    return () => { clearInterval(interval); clearTimeout(t); };
  }, [isOnline]);

  const handleAccept = () => {
    setShowRequest(false);
    Alert.alert('Ride Accepted!', `Navigate to ${MOCK_REQUEST.pickup}`);
  };

  const handleDecline = () => {
    setShowRequest(false);
    Animated.timing(slideAnim, { toValue: 300, duration: 200, useNativeDriver: true }).start();
  };

  const toggleOnline = (value: boolean) => {
    setIsOnline(value);
    if (!value) { setTimeOnline(0); setShowRequest(false); }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={isOnline ? [Colors.accent, '#059669'] : [Colors.primary, '#152A46']}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Good morning</Text>
              <Text style={styles.driverName}>Rajan Kumar</Text>
            </View>
            <TouchableOpacity onPress={() => signOut(auth)} style={styles.logoutBtn}>
              <Ionicons name="log-out-outline" size={22} color="rgba(255,255,255,0.8)" />
            </TouchableOpacity>
          </View>

          {/* Online Toggle */}
          <View style={styles.toggleCard}>
            <View>
              <Text style={styles.toggleLabel}>
                {isOnline ? '🟢 You are Online' : '⚫ You are Offline'}
              </Text>
              <Text style={styles.toggleSub}>
                {isOnline
                  ? `Online for ${timeOnline} min · Ready for rides`
                  : 'Go online to start receiving ride requests'}
              </Text>
            </View>
            <Switch
              value={isOnline}
              onValueChange={toggleOnline}
              trackColor={{ false: Colors.border, true: '#FFFFFF50' }}
              thumbColor={isOnline ? '#FFFFFF' : Colors.text.tertiary}
            />
          </View>
        </LinearGradient>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { label: "Today's Earnings", value: '₹1,240', icon: 'cash', color: Colors.accent },
            { label: 'Trips Today', value: '4', icon: 'car', color: Colors.primary },
            { label: 'Rating', value: '4.8 ⭐', icon: 'star', color: Colors.warning },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Ionicons name={s.icon as any} size={20} color={s.color} />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Vehicle Info */}
        <View style={styles.vehicleCard}>
          <View style={styles.vehicleLeft}>
            <View style={styles.vehicleIcon}>
              <Ionicons name="bus" size={28} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.vehicleName}>Tempo Traveller 9</Text>
              <Text style={styles.vehicleNum}>KA 04 AB 1234</Text>
            </View>
          </View>
          <View style={[styles.vehicleStatus, { backgroundColor: isOnline ? Colors.accentLight : Colors.borderLight }]}>
            <Text style={[styles.vehicleStatusText, { color: isOnline ? Colors.accent : Colors.text.secondary }]}>
              {isOnline ? 'Active' : 'Idle'}
            </Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {[
            { time: '10:30 AM', route: 'Indiranagar → Whitefield', fare: '₹840', status: 'completed' },
            { time: '8:00 AM', route: 'MG Road → Airport', fare: '₹1,200', status: 'completed' },
          ].map((a, i) => (
            <View key={i} style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityRoute}>{a.route}</Text>
                <Text style={styles.activityTime}>{a.time}</Text>
              </View>
              <Text style={styles.activityFare}>{a.fare}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Ride Request Popup */}
      {showRequest && (
        <Animated.View style={[styles.requestCard, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.requestHeader}>
            <Text style={styles.requestTitle}>New Ride Request!</Text>
            <Text style={styles.requestEta}>{MOCK_REQUEST.eta}</Text>
          </View>
          <View style={styles.requestBody}>
            <View style={styles.requestRoute}>
              <View style={[styles.routeDot, { backgroundColor: Colors.accent }]} />
              <Text style={styles.routeText}>{MOCK_REQUEST.pickup}</Text>
            </View>
            <View style={[styles.routeDot, { height: 16, width: 2, backgroundColor: Colors.border, marginLeft: 5 }]} />
            <View style={styles.requestRoute}>
              <View style={[styles.routeDot, { backgroundColor: Colors.warning }]} />
              <Text style={styles.routeText}>{MOCK_REQUEST.drop}</Text>
            </View>
          </View>
          <View style={styles.requestDetails}>
            <Text style={styles.requestDetail}>{MOCK_REQUEST.vehicle}</Text>
            <Text style={styles.requestFare}>₹{MOCK_REQUEST.fare}</Text>
          </View>
          <View style={styles.requestBtns}>
            <TouchableOpacity style={styles.declineBtn} onPress={handleDecline}>
              <Text style={styles.declineBtnText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
              <Text style={styles.acceptBtnText}>Accept Ride</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

export default function DriverMain() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.text.secondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 68,
        },
        tabBarIcon: ({ color, focused }) => {
          const icons: Record<string, { active: string; inactive: string }> = {
            Dashboard: { active: 'home', inactive: 'home-outline' },
            Trips: { active: 'list', inactive: 'list-outline' },
            Earnings: { active: 'wallet', inactive: 'wallet-outline' },
          };
          const icon = icons[route.name];
          return <Ionicons name={(focused ? icon?.active : icon?.inactive) as any} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={HomeTab} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
    </Tab.Navigator>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: Spacing.md, paddingBottom: 32, paddingHorizontal: Spacing.lg },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.lg },
  greeting: { ...Typography.bodySmall, color: 'rgba(255,255,255,0.8)' },
  driverName: { ...Typography.h3, color: '#FFFFFF' },
  logoutBtn: { padding: Spacing.sm, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: BorderRadius.full },
  toggleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  toggleLabel: { ...Typography.body, color: '#FFFFFF', fontWeight: '600', marginBottom: 4 },
  toggleSub: { ...Typography.caption, color: 'rgba(255,255,255,0.8)', maxWidth: width * 0.55 },
  statsRow: {
    flexDirection: 'row',
    margin: Spacing.lg,
    gap: Spacing.md,
    marginTop: -20,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 4,
    ...Shadow.md,
  },
  statValue: { ...Typography.h4, color: Colors.text.primary },
  statLabel: { ...Typography.caption, color: Colors.text.secondary, textAlign: 'center' },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadow.sm,
  },
  vehicleLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  vehicleIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleName: { ...Typography.body, color: Colors.text.primary, fontWeight: '600' },
  vehicleNum: { ...Typography.bodySmall, color: Colors.text.secondary },
  vehicleStatus: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
  },
  vehicleStatusText: { ...Typography.caption, fontWeight: '600' },
  section: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xl },
  sectionTitle: { ...Typography.h4, color: Colors.text.primary, marginBottom: Spacing.md },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  activityDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.accent },
  activityInfo: { flex: 1 },
  activityRoute: { ...Typography.bodySmall, color: Colors.text.primary, fontWeight: '500' },
  activityTime: { ...Typography.caption, color: Colors.text.secondary },
  activityFare: { ...Typography.body, color: Colors.accent, fontWeight: '700' },
  requestCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: Spacing.lg,
    paddingBottom: 32,
    ...Shadow.lg,
  },
  requestHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  requestTitle: { ...Typography.h3, color: Colors.text.primary },
  requestEta: {
    ...Typography.bodySmall,
    color: Colors.accent,
    fontWeight: '700',
    backgroundColor: Colors.accentLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  requestBody: { marginBottom: Spacing.md },
  requestRoute: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 4 },
  routeDot: { width: 10, height: 10, borderRadius: 5 },
  routeText: { ...Typography.bodySmall, color: Colors.text.primary },
  requestDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.borderLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  requestDetail: { ...Typography.bodySmall, color: Colors.text.secondary },
  requestFare: { ...Typography.h3, color: Colors.primary },
  requestBtns: { flexDirection: 'row', gap: Spacing.md },
  declineBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.danger,
    alignItems: 'center',
  },
  declineBtnText: { ...Typography.button, color: Colors.danger },
  acceptBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.accent,
    alignItems: 'center',
  },
  acceptBtnText: { ...Typography.button, color: '#FFFFFF' },
});
