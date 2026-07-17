import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../../components/GlassCard';

const SettingRow = ({ icon, label, type, value, onToggle }: any) => (
  <View style={styles.settingRow}>
    <View style={styles.settingLabelContainer}>
      <Ionicons name={icon} size={20} color="rgba(255,255,255,0.7)" style={styles.settingIcon} />
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    {type === 'switch' ? (
      <Switch value={value} onValueChange={onToggle} thumbColor="#00e5ff" trackColor={{ false: '#767577', true: 'rgba(0,229,255,0.5)' }} />
    ) : (
      <View style={styles.settingValueContainer}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.5)" />
      </View>
    )}
  </View>
);

export default function SettingsScreen() {
  const [demoMode, setDemoMode] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>App Settings</Text>
            <SettingRow icon="moon" label="Dark Theme" type="switch" value={darkMode} onToggle={setDarkMode} />
            <SettingRow icon="language" label="Language" type="nav" value="English" />
            <SettingRow icon="notifications" label="Push Notifications" type="switch" value={notifications} onToggle={setNotifications} />
            <SettingRow icon="accessibility" label="Accessibility" type="nav" />
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Developer / Admin</Text>
            <SettingRow icon="flask" label="Live Demo Mode" type="switch" value={demoMode} onToggle={setDemoMode} />
            <SettingRow icon="shield-checkmark" label="Admin Dashboard" type="nav" />
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <SettingRow icon="person" label="Profile Information" type="nav" />
            <SettingRow icon="lock-closed" label="Privacy & Security" type="nav" />
            <TouchableOpacity style={styles.logoutBtn}>
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </GlassCard>
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
  section: {
    padding: Theme.spacing.m,
  },
  sectionTitle: {
    color: '#00e5ff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: Theme.spacing.m,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
    width: 24,
  },
  settingLabel: {
    color: '#fff',
    fontSize: 16,
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginRight: 8,
  },
  logoutBtn: {
    marginTop: Theme.spacing.m,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ff1744',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
