import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../theme';

const OTP_LENGTH = 6;

export default function OTPScreen({ route, navigation, demoMode, onDemoLogin }: any) {
  const { phone, demoMode: routeDemoMode, onDemoLogin: routeOnDemoLogin } = route.params;
  const isDemo = demoMode || routeDemoMode;
  const doLogin = onDemoLogin || routeOnDemoLogin;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length !== OTP_LENGTH) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isDemo) {
        // Demo mode: any 6-digit code works
        doLogin?.();
      } else {
        // Production: use Firebase confirmationResult.confirm(code)
        Alert.alert('Success', 'Phone verified! Welcome to Travo!');
      }
    }, 1000);
  };

  const handleResend = () => {
    setResendTimer(30);
    setOtp(Array(OTP_LENGTH).fill(''));
    Alert.alert('OTP Sent', `A new code has been sent to ${phone}`);
  };

  const otpComplete = otp.every((d) => d !== '');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="chatbubble-ellipses" size={40} color={Colors.primary} />
        </View>

        <Text style={styles.title}>Verify your number</Text>
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to{'\n'}
          <Text style={styles.phone}>{phone}</Text>
        </Text>
        {isDemo && (
          <View style={styles.demoBanner}>
            <Text style={styles.demoText}>🧪 Demo Mode — type any 6 digits</Text>
          </View>
        )}

        {/* OTP Inputs */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => { inputs.current[index] = el; }}
              style={[styles.otpBox, digit && styles.otpBoxFilled]}
              value={digit}
              onChangeText={(t) => handleChange(t, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[styles.btn, !otpComplete && styles.btnDisabled]}
          onPress={handleVerify}
          disabled={!otpComplete || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.btnText}>Verify & Continue</Text>
          )}
        </TouchableOpacity>

        {/* Resend */}
        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Didn't receive the code? </Text>
          {resendTimer > 0 ? (
            <Text style={styles.timerText}>Resend in {resendTimer}s</Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendBtn}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  backBtn: {
    padding: Spacing.md,
    marginTop: 48,
    marginLeft: Spacing.md,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    alignItems: 'center',
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: { ...Typography.h2, color: Colors.text.primary, marginBottom: Spacing.sm },
  subtitle: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 24,
  },
  phone: { color: Colors.text.primary, fontWeight: '700' },
  demoBanner: {
    backgroundColor: '#FEF9C3',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#FDE047',
  },
  demoText: { ...Typography.bodySmall, color: '#854D0E', fontWeight: '600', textAlign: 'center' },
  otpRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: Spacing.xl,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    textAlign: 'center',
    ...Typography.h3,
    color: Colors.text.primary,
    backgroundColor: Colors.surface,
  },
  otpBoxFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  btnDisabled: { backgroundColor: Colors.border },
  btnText: { ...Typography.button, color: '#FFFFFF' },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendLabel: { ...Typography.bodySmall, color: Colors.text.secondary },
  timerText: { ...Typography.bodySmall, color: Colors.text.tertiary },
  resendBtn: { ...Typography.bodySmall, color: Colors.primary, fontWeight: '600' },
});
