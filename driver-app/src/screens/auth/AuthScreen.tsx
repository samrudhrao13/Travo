import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

export default function AuthScreen() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      Alert.alert('Invalid Number', 'Enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('otp'); }, 1500);
  };

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    setLoading(true);
    // In production: confirm Firebase OTP
    setTimeout(() => { setLoading(false); }, 1500);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={[Colors.primary, '#152A46']} style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>T</Text>
            </View>
            <View>
              <Text style={styles.brand}>travo</Text>
              <Text style={styles.brandSub}>Driver Partner</Text>
            </View>
          </View>
          <Text style={styles.headerTitle}>
            {step === 'phone' ? 'Welcome, Driver!' : 'Verify OTP'}
          </Text>
          <Text style={styles.headerSub}>
            {step === 'phone'
              ? 'Login to your driver account'
              : `Code sent to +91 ${phone}`}
          </Text>
        </LinearGradient>

        <View style={styles.card}>
          {step === 'phone' ? (
            <>
              <Text style={styles.cardTitle}>Mobile Number</Text>
              <View style={styles.inputRow}>
                <Text style={styles.countryCode}>🇮🇳 +91</Text>
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
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.btnText}>Get OTP</Text>}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.cardTitle}>Enter 6-Digit OTP</Text>
              <TextInput
                style={styles.otpInput}
                placeholder="------"
                placeholderTextColor={Colors.text.tertiary}
                keyboardType="number-pad"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
                textAlign="center"
              />
              <TouchableOpacity
                style={[styles.btn, otp.length !== 6 && styles.btnDisabled]}
                onPress={handleVerify}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.btnText}>Verify & Login</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setStep('phone')} style={styles.backLink}>
                <Text style={styles.backLinkText}>Change number</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="shield-checkmark" size={20} color={Colors.accent} />
          <Text style={styles.infoText}>
            Only verified Travo driver partners can access this app. Contact support to register.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flexGrow: 1 },
  header: { paddingTop: 64, paddingBottom: 48, paddingHorizontal: Spacing.lg },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.xl },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: { fontSize: 26, fontWeight: '800', color: '#FFFFFF' },
  brand: { fontSize: 22, fontWeight: '800', color: '#FFFFFF' },
  brandSub: { ...Typography.caption, color: 'rgba(255,255,255,0.7)' },
  headerTitle: { ...Typography.h2, color: '#FFFFFF', marginBottom: 6 },
  headerSub: { ...Typography.body, color: 'rgba(255,255,255,0.8)' },
  card: {
    margin: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginTop: -24,
    ...Shadow.lg,
  },
  cardTitle: { ...Typography.h4, color: Colors.text.primary, marginBottom: Spacing.md },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  countryCode: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 16,
    backgroundColor: Colors.borderLight,
    borderRightWidth: 1.5,
    borderRightColor: Colors.border,
    ...Typography.body,
    color: Colors.text.primary,
    fontWeight: '600',
  },
  input: { flex: 1, paddingHorizontal: Spacing.md, ...Typography.body, color: Colors.text.primary },
  otpInput: {
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    ...Typography.h3,
    color: Colors.text.primary,
    letterSpacing: 8,
    marginBottom: Spacing.lg,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  btnDisabled: { backgroundColor: Colors.border },
  btnText: { ...Typography.button, color: '#FFFFFF' },
  backLink: { alignItems: 'center', padding: Spacing.sm },
  backLinkText: { ...Typography.bodySmall, color: Colors.secondary, fontWeight: '600' },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    margin: Spacing.lg,
    backgroundColor: Colors.accentLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  infoText: { flex: 1, ...Typography.caption, color: Colors.text.secondary, lineHeight: 18 },
});
