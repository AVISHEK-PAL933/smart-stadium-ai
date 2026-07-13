import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { useGlobalContext } from '../../context/GlobalProvider';
import { PrimaryButton } from '../../components/PrimaryButton';
import { router } from 'expo-router';
import { Theme } from '../../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { GlassCard } from '../../components/GlassCard';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];
  const { role, setRole } = useGlobalContext();

  const handleLogout = () => {
    setRole(null);
    router.replace('/login');
  };

  const SETTINGS = [
    { icon: 'notifications', title: 'Push Notifications', type: 'switch', value: true },
    { icon: 'dark-mode', title: 'Dark Mode', type: 'switch', value: theme === 'dark' },
    { icon: 'language', title: 'Language', type: 'link', value: 'English (US)' },
    { icon: 'payment', title: 'Payment Methods', type: 'link' },
    { icon: 'security', title: 'Security & Privacy', type: 'link' },
    { icon: 'help-outline', title: 'Help & Support', type: 'link' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Profile & Settings" />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInUp.delay(100)} style={styles.headerSection}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="account-circle" size={100} color={themeColors.tint} />
            <View style={[styles.badge, { backgroundColor: '#39FF14' }]} />
          </View>
          <Text style={[styles.name, { color: themeColors.text }]}>
            {role === 'user' ? 'John Doe' : 'Guest User'}
          </Text>
          <Text style={[styles.role, { color: themeColors.icon }]}>
            {role === 'user' ? 'FIFA VIP Member' : 'Temporary Access'}
          </Text>
        </Animated.View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Settings</Text>

        <GlassCard style={styles.settingsCard}>
          {SETTINGS.map((item, index) => (
            <Animated.View key={item.title} entering={FadeInUp.delay(200 + index * 50)}>
              <TouchableOpacity
                style={[
                  styles.settingRow,
                  index !== SETTINGS.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: themeColors.border,
                  },
                ]}
                disabled={item.type === 'switch'}>
                <View style={styles.settingLeft}>
                  <MaterialIcons name={item.icon as any} size={24} color={themeColors.icon} />
                  <Text style={[styles.settingTitle, { color: themeColors.text }]}>
                    {item.title}
                  </Text>
                </View>
                <View style={styles.settingRight}>
                  {item.type === 'switch' ? (
                    <Switch
                      value={item.value as boolean}
                      trackColor={{ true: themeColors.tint }}
                      thumbColor="#fff"
                    />
                  ) : (
                    <>
                      {item.value && (
                        <Text style={[styles.settingValue, { color: themeColors.icon }]}>
                          {item.value as string}
                        </Text>
                      )}
                      <MaterialIcons name="chevron-right" size={24} color={themeColors.icon} />
                    </>
                  )}
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </GlassCard>

        <Animated.View entering={FadeInUp.delay(600)} style={styles.actions}>
          <PrimaryButton title="Log Out" onPress={handleLogout} style={styles.logoutBtn} />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Theme.spacing.l, paddingBottom: 100 },
  headerSection: { alignItems: 'center', marginBottom: Theme.spacing.xxl },
  avatarContainer: { position: 'relative', marginBottom: Theme.spacing.m },
  badge: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#070A13',
  },
  name: { fontSize: Theme.typography.sizes.xxl, fontWeight: 'bold', marginBottom: 4 },
  role: { fontSize: Theme.typography.sizes.m },
  sectionTitle: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.m,
    marginLeft: Theme.spacing.s,
  },
  settingsCard: { padding: 0, overflow: 'hidden' },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing.l,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.m },
  settingTitle: { fontSize: Theme.typography.sizes.m, fontWeight: '500' },
  settingRight: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.s },
  settingValue: { fontSize: Theme.typography.sizes.m },
  actions: { marginTop: Theme.spacing.xxl, marginBottom: Theme.spacing.xl },
  logoutBtn: { width: '100%', backgroundColor: 'rgba(239, 68, 68, 0.2)' },
});
