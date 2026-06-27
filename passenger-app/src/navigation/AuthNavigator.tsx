import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/auth/SplashScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import PhoneAuthScreen from '../screens/auth/PhoneAuthScreen';
import OTPScreen from '../screens/auth/OTPScreen';

const Stack = createNativeStackNavigator();

interface Props {
  demoMode?: boolean;
  onDemoLogin?: () => void;
}

export default function AuthNavigator({ demoMode, onDemoLogin }: Props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="PhoneAuth">
        {(props) => <PhoneAuthScreen {...props} demoMode={demoMode} onDemoLogin={onDemoLogin} />}
      </Stack.Screen>
      <Stack.Screen name="OTP">
        {(props) => <OTPScreen {...props} demoMode={demoMode} onDemoLogin={onDemoLogin} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
