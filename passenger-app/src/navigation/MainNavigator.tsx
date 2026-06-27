import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography } from '../theme';

import HomeScreen from '../screens/home/HomeScreen';
import VehicleSelectScreen from '../screens/booking/VehicleSelectScreen';
import LocationScreen from '../screens/booking/LocationScreen';
import RideTypeScreen from '../screens/booking/RideTypeScreen';
import ScheduleScreen from '../screens/booking/ScheduleScreen';
import FareScreen from '../screens/booking/FareScreen';
import ConfirmScreen from '../screens/booking/ConfirmScreen';
import WaitingScreen from '../screens/tracking/WaitingScreen';
import TrackingScreen from '../screens/tracking/TrackingScreen';
import TripCompleteScreen from '../screens/tracking/TripCompleteScreen';
import HistoryScreen from '../screens/history/HistoryScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="VehicleSelect" component={VehicleSelectScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="RideType" component={RideTypeScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="Fare" component={FareScreen} />
      <Stack.Screen name="Confirm" component={ConfirmScreen} />
      <Stack.Screen name="Waiting" component={WaitingScreen} />
      <Stack.Screen name="Tracking" component={TrackingScreen} />
      <Stack.Screen name="TripComplete" component={TripCompleteScreen} />
    </Stack.Navigator>
  );
}

export default function MainNavigator({ onDemoLogout }: { onDemoLogout?: () => void }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text.secondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 68,
        },
        tabBarLabelStyle: {
          ...Typography.caption,
          fontWeight: '500',
          marginTop: 2,
        },
        tabBarIcon: ({ color, focused }) => {
          const icons: Record<string, { active: string; inactive: string }> = {
            Home: { active: 'home', inactive: 'home-outline' },
            History: { active: 'time', inactive: 'time-outline' },
            Profile: { active: 'person', inactive: 'person-outline' },
          };
          const icon = icons[route.name];
          return (
            <Ionicons
              name={(focused ? icon?.active : icon?.inactive) as any}
              size={24}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} onDemoLogout={onDemoLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
