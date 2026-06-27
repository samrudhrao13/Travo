import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

// DEMO MODE: set to true to skip Firebase and test all screens instantly.
// Set to false once you add your real Firebase config.
const DEMO_MODE = true;

export default function App() {
  const [demoLoggedIn, setDemoLoggedIn] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator
            user={DEMO_MODE ? (demoLoggedIn ? ({ uid: 'demo' } as any) : null) : null}
            loading={false}
            demoMode={DEMO_MODE}
            onDemoLogin={() => setDemoLoggedIn(true)}
            onDemoLogout={() => setDemoLoggedIn(false)}
          />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
