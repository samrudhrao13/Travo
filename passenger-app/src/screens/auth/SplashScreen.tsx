import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography } from '../../theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }: any) {
  const scale = new Animated.Value(0.6);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.container}>
      <Animated.View style={[styles.logoWrapper, { transform: [{ scale }], opacity }]}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoLetter}>T</Text>
        </View>
        <Text style={styles.appName}>travo</Text>
        <Text style={styles.tagline}>Your ride, your time</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  logoLetter: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  appName: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    letterSpacing: 1,
  },
});
