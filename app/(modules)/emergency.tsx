import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

const EMERGENCY_ACTIONS = [
  {
    id: 'medical',
    title: 'Medical Emergency',
    icon: 'medical-bag',
    color: '#EF4444',
    desc: 'Request immediate medical assistance',
  },
  {
    id: 'security',
    title: 'Security Incident',
    icon: 'police-badge',
    color: '#FACC15',
    desc: 'Report a security or safety concern',
  },
  {
    id: 'facilities',
    title: 'Facilities Issue',
    icon: 'tools',
    color: '#3B82F6',
    desc: 'Report a spill, broken seat, or restroom issue',
  },
];

export default function EmergencyHelp() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Emergency & Help" />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInUp.delay(100)}>
          <GlassCard style={styles.sosCard}>
            <View style={styles.sosPulse}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={64}
                color="#EF4444"
                style={styles.icon}
              />
            </View>
            <Text style={[styles.title, { color: themeColors.text }]}>SOS Alert</Text>
            <Text style={[styles.subtitle, { color: themeColors.icon }]}>
              Hold for 3 seconds to instantly dispatch security and medical to your location (Sec
              112, Row M).
            </Text>
            <TouchableOpacity style={styles.sosButton}>
              <Text style={styles.sosButtonText}>HOLD FOR SOS</Text>
            </TouchableOpacity>
          </GlassCard>
        </Animated.View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Specific Reports</Text>

        <View style={styles.actionList}>
          {EMERGENCY_ACTIONS.map((action, index) => (
            <Animated.View key={action.id} entering={FadeInUp.delay(200 + index * 100)}>
              <TouchableOpacity>
                <GlassCard style={styles.actionCard}>
                  <View style={[styles.actionIconBg, { backgroundColor: action.color + '20' }]}>
                    <MaterialCommunityIcons
                      name={action.icon as any}
                      size={28}
                      color={action.color}
                    />
                  </View>
                  <View style={styles.actionInfo}>
                    <Text style={[styles.actionTitle, { color: themeColors.text }]}>
                      {action.title}
                    </Text>
                    <Text style={[styles.actionDesc, { color: themeColors.icon }]}>
                      {action.desc}
                    </Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={themeColors.icon} />
                </GlassCard>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Theme.spacing.l, paddingBottom: 100 },
  sosCard: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
    borderColor: '#EF4444',
    borderWidth: 1,
  },
  sosPulse: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.m,
  },
  icon: {
    textShadowColor: 'rgba(239, 68, 68, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  title: {
    fontSize: Theme.typography.sizes.xxl,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.s,
    color: '#EF4444',
  },
  subtitle: {
    fontSize: Theme.typography.sizes.m,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  sosButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  sosButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: Theme.typography.sizes.m,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.m,
  },
  actionList: { gap: Theme.spacing.m },
  actionCard: {
    flexDirection: 'row',
    padding: Theme.spacing.m,
    alignItems: 'center',
    gap: Theme.spacing.m,
  },
  actionIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionInfo: { flex: 1, gap: 4 },
  actionTitle: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold' },
  actionDesc: { fontSize: Theme.typography.sizes.s },
});
