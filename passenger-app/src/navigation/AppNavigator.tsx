import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { Colors } from '../theme';

const Stack = createNativeStackNavigator();

interface Props {
  user: any;
  loading: boolean;
  demoMode?: boolean;
  onDemoLogin?: () => void;
  onDemoLogout?: () => void;
}

export default function AppNavigator({ user, loading, demoMode, onDemoLogin, onDemoLogout }: Props) {
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Main">
          {(props) => <MainNavigator {...props} onDemoLogout={onDemoLogout} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Auth">
          {(props) => <AuthNavigator {...props} demoMode={demoMode} onDemoLogin={onDemoLogin} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F97316',
  },
});
