import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { PrimaryButton } from '../../components/PrimaryButton';

const SERVICES = [
  {
    id: 'wheelchair',
    title: 'Wheelchair Assistance',
    icon: 'accessible',
    desc: 'Request an escort with a wheelchair from your gate.',
  },
  {
    id: 'sensory',
    title: 'Sensory Room Access',
    icon: 'spa',
    desc: 'Book time in our quiet, sensory-friendly rooms.',
  },
  {
    id: 'interpreter',
    title: 'Sign Language',
    icon: 'sign-language',
    desc: 'Request an interpreter for the match broadcast.',
  },
  {
    id: 'audio',
    title: 'Audio Description',
    icon: 'headset',
    desc: 'Get a headset for live descriptive commentary.',
  },
];

export default function AccessibilityServices() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Accessibility" />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInUp.delay(100)}>
          <GlassCard style={styles.heroCard}>
            <MaterialIcons
              name="accessible-forward"
              size={48}
              color={themeColors.tint}
              style={styles.icon}
            />
            <Text style={[styles.title, { color: themeColors.text }]}>Inclusive Stadium</Text>
            <Text style={[styles.subtitle, { color: themeColors.icon }]}>
              We are committed to providing a seamless experience for all fans. Select a service
              below.
            </Text>
          </GlassCard>
        </Animated.View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Available Services</Text>

        <View style={styles.serviceList}>
          {SERVICES.map((service, index) => (
            <Animated.View key={service.id} entering={FadeInUp.delay(200 + index * 100)}>
              <TouchableOpacity onPress={() => setSelectedService(service.id)}>
                <GlassCard
                  style={[
                    styles.serviceCard,
                    selectedService === service.id && { borderColor: themeColors.tint },
                  ]}>
                  <View
                    style={[
                      styles.serviceIconBg,
                      {
                        backgroundColor:
                          selectedService === service.id ? themeColors.tint : themeColors.border,
                      },
                    ]}>
                    <MaterialIcons
                      name={service.icon as any}
                      size={24}
                      color={selectedService === service.id ? '#fff' : themeColors.icon}
                    />
                  </View>
                  <View style={styles.serviceInfo}>
                    <Text style={[styles.serviceTitle, { color: themeColors.text }]}>
                      {service.title}
                    </Text>
                    <Text style={[styles.serviceDesc, { color: themeColors.icon }]}>
                      {service.desc}
                    </Text>
                  </View>
                </GlassCard>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {selectedService && (
          <Animated.View entering={FadeInUp}>
            <PrimaryButton
              title="Request Selected Service"
              onPress={() => {}}
              style={styles.reqBtn}
            />
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Theme.spacing.l, paddingBottom: 100 },
  heroCard: { padding: Theme.spacing.l, alignItems: 'center', marginBottom: Theme.spacing.xl },
  icon: {
    marginBottom: Theme.spacing.m,
    textShadowColor: 'rgba(0, 229, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  title: { fontSize: Theme.typography.sizes.xl, fontWeight: 'bold', marginBottom: Theme.spacing.s },
  subtitle: { fontSize: Theme.typography.sizes.m, textAlign: 'center' },
  sectionTitle: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.m,
  },
  serviceList: { gap: Theme.spacing.m },
  serviceCard: {
    padding: Theme.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.m,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  serviceIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceInfo: { flex: 1, gap: 4 },
  serviceTitle: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold' },
  serviceDesc: { fontSize: Theme.typography.sizes.s },
  reqBtn: { marginTop: Theme.spacing.xl },
});
