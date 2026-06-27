import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../theme';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    icon: 'bus' as const,
    title: 'Book TT & Buses\nInstantly',
    description: 'Tempo Travelers and private buses at your fingertips. No travel agency, no hassle.',
    color: Colors.primary,
  },
  {
    id: '2',
    icon: 'flash' as const,
    title: 'Ready in\n15-20 Minutes',
    description: 'No pre-planning needed. Book now and your vehicle arrives quickly within the city.',
    color: '#8B5CF6',
  },
  {
    id: '3',
    icon: 'calendar' as const,
    title: 'Or Schedule\nAhead',
    description: 'Plan a trip days in advance. Set the date, time, and route — we handle the rest.',
    color: Colors.accent,
  },
  {
    id: '4',
    icon: 'location' as const,
    title: 'City &\nIntercity Rides',
    description: 'Travel within your city or cross cities. Transparent pricing, real-time tracking.',
    color: Colors.secondary,
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('PhoneAuth');
    }
  };

  const handleSkip = () => navigation.replace('PhoneAuth');

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <LinearGradient
              colors={[item.color + '20', '#FFFFFF']}
              style={styles.slideGradient}
            >
              <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={64} color={item.color} />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </LinearGradient>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === currentIndex && styles.dotActive]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          style={[styles.nextBtn, { backgroundColor: slides[currentIndex].color }]}
        >
          <Text style={styles.nextText}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  slide: { flex: 1 },
  slideGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h1,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: 40,
  },
  description: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
  },
  skipBtn: { padding: Spacing.md },
  skipText: { ...Typography.body, color: Colors.text.secondary },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
  },
  nextText: { ...Typography.button, color: '#FFFFFF' },
});
