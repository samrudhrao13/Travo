import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const COUNTRY_CODE = '+91';

export default function PhoneAuthScreen({ navigation, demoMode, onDemoLogin }: any) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTP', { phone: `${COUNTRY_CODE}${phone}`, demoMode, onDemoLogin });
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <LinearGradient colors={[Colors.primary, Colors.primaryDark]} style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoMini}>
              <Text style={styles.logoText}>T</Text>
            </View>
            <Text style={styles.brand}>travo</Text>
          </View>
          <Text style={styles.headerTitle}>Welcome!</Text>
          <Text style={styles.headerSub}>Enter your mobile number to continue</Text>
        </LinearGradient>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mobile Number</Text>
          <Text style={styles.cardSub}>We'll send a verification code to this number</Text>

          <View style={styles.inputRow}>
            <View style={styles.countryCode}>
              <Text style={styles.flag}>🇮🇳</Text>
              <Text style={styles.codeText}>{COUNTRY_CODE}</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              placeholderTextColor={Colors.text.tertiary}
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TouchableOpacity
            style={[styles.btn, phone.length !== 10 && styles.btnDisabled]}
            onPress={handleSendOTP}
            disabled={loading || phone.length !== 10}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.btnText}>Send OTP</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
              </>
            )}
          </TouchableOpacity>

          <Text style={styles.terms}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text> &{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flexGrow: 1 },
  header: {
    paddingTop: 60,
    paddingBottom: 48,
    paddingHorizontal: Spacing.lg,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.xl },
  logoMini: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: { fontSize: 20, fontWeight: '800', color: '#FFFFFF' },
  brand: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  headerTitle: { ...Typography.h1, color: '#FFFFFF', marginBottom: 6 },
  headerSub: { ...Typography.body, color: 'rgba(255,255,255,0.85)' },
  card: {
    margin: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginTop: -24,
    ...Shadow.lg,
  },
  cardTitle: { ...Typography.h3, color: Colors.text.primary, marginBottom: 6 },
  cardSub: { ...Typography.bodySmall, color: Colors.text.secondary, marginBottom: Spacing.xl },
  inputRow: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.borderLight,
    borderRightWidth: 1.5,
    borderRightColor: Colors.border,
    gap: 6,
  },
  flag: { fontSize: 20 },
  codeText: { ...Typography.body, color: Colors.text.primary, fontWeight: '600' },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: 16,
    ...Typography.body,
    color: Colors.text.primary,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  btnDisabled: { backgroundColor: Colors.border },
  btnText: { ...Typography.button, color: '#FFFFFF' },
  terms: { ...Typography.caption, color: Colors.text.secondary, textAlign: 'center', lineHeight: 18 },
  link: { color: Colors.primary, fontWeight: '600' },
});
