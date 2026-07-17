import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../../components/GlassCard';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function AdminModeScreen() {
  const router = useRouter();

  const adminRoles = [
    { title: 'Executive Analytics', role: 'Stadium Owner', icon: 'pie-chart', route: '/(modules)/executive-analytics', color: '#b388ff' },
    { title: 'Operations Center', role: 'Ops Manager', icon: 'shield-checkmark', route: '/(modules)/ai-operations', color: '#00e5ff' },
    { title: 'IoT & Sustainability', role: 'Facilities Manager', icon: 'leaf', route: '/(modules)/smart-iot-center', color: '#00e676' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Admin Portal" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <GlassCard style={styles.authCard}>
            <Ionicons name="lock-closed" size={48} color="#ffd600" />
            <Text style={styles.authTitle}>Secure Access</Text>
            <Text style={styles.authDesc}>Mock Authentication System active. Tap a role below to simulate login.</Text>
          </GlassCard>

          <Text style={styles.sectionTitle}>Available Dashboards</Text>
          {adminRoles.map((role, idx) => (
            <TouchableOpacity key={idx} onPress={() => router.push(role.route as any)}>
              <GlassCard style={styles.roleCard}>
                <LinearGradient colors={[`${role.color}15`, 'transparent']} style={StyleSheet.absoluteFillObject} />
                <View style={[styles.iconBox, { backgroundColor: `${role.color}20` }]}>
                  <Ionicons name={role.icon as any} size={24} color={role.color} />
                </View>
                <View style={styles.roleInfo}>
                  <Text style={styles.roleTitle}>{role.title}</Text>
                  <Text style={styles.roleSub}>{role.role}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.3)" />
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Theme.spacing.m,
    gap: Theme.spacing.m,
  },
  authCard: {
    alignItems: 'center',
    padding: Theme.spacing.l,
    backgroundColor: 'rgba(255, 214, 0, 0.05)',
    borderColor: 'rgba(255,214,0,0.3)',
  },
  authTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: Theme.spacing.m,
  },
  authDesc: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: Theme.spacing.m,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Theme.spacing.m,
    marginBottom: Theme.spacing.s,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.m,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  roleSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginTop: 2,
  },
});
