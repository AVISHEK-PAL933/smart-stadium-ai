import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput, Alert } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { useGlobalContext } from '../../context/GlobalProvider';
import { PrimaryButton } from '../../components/PrimaryButton';
import { router } from 'expo-router';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassCard } from '../../components/GlassCard';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];
  const { role, setRole } = useGlobalContext();

  const [userName, setUserName] = useState(role === 'user' ? 'John Doe' : 'Guest User');
  const [isEditing, setIsEditing] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [darkEnabled, setDarkEnabled] = useState(theme === 'dark');

  const handleLogout = () => {
    setRole(null);
    router.replace('/login');
  };

  const SETTINGS = [
    { 
      icon: 'bell', 
      title: 'Push Notifications', 
      type: 'switch', 
      value: pushEnabled, 
      onToggle: () => setPushEnabled(!pushEnabled) 
    },
    { 
      icon: 'theme-light-dark', 
      title: 'Dark Mode', 
      type: 'switch', 
      value: darkEnabled, 
      onToggle: () => setDarkEnabled(!darkEnabled) 
    },
    { 
      icon: 'translate', 
      title: 'Language', 
      type: 'link', 
      value: 'English (US)',
      onPress: () => Alert.alert('Language', 'Language options will be available soon.')
    },
    { 
      icon: 'credit-card', 
      title: 'Payment Methods', 
      type: 'link',
      onPress: () => Alert.alert('Payment Methods', 'Manage your saved cards securely.') 
    },
    { 
      icon: 'shield-check', 
      title: 'Security & Privacy', 
      type: 'link',
      onPress: () => Alert.alert('Security', 'Your account is secured with end-to-end encryption.') 
    },
    { 
      icon: 'help-circle-outline', 
      title: 'Help & Support', 
      type: 'link',
      onPress: () => Alert.alert('Support', 'Connecting you to our 24/7 support team...') 
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Profile & Settings" />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInUp.delay(100)} style={styles.headerSection}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons name="account-circle" size={100} color={themeColors.tint} />
            <View style={[styles.badge, { backgroundColor: '#39FF14' }]} />
          </View>
          {isEditing ? (
            <TextInput
              style={[styles.nameInput, { color: themeColors.text, borderColor: themeColors.border }]}
              value={userName}
              onChangeText={setUserName}
              onSubmitEditing={() => setIsEditing(false)}
              onBlur={() => setIsEditing(false)}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.nameRow}>
              <Text style={[styles.name, { color: themeColors.text }]}>{userName}</Text>
              <MaterialCommunityIcons name="pencil" size={16} color={themeColors.icon} style={styles.editIcon} />
            </TouchableOpacity>
          )}
          <Text style={[styles.role, { color: themeColors.icon }]}>
            {role === 'user' ? 'FIFA VIP Member' : 'Temporary Access'}
          </Text>
        </Animated.View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Settings</Text>

        <GlassCard style={styles.settingsCard}>
          {SETTINGS.map((item, index) => (
            <Animated.View key={item.title} entering={FadeInUp.delay(200 + index * 50)}>
              <TouchableOpacity
                onPress={item.type === 'switch' ? item.onToggle : item.onPress}
                style={[
                  styles.settingRow,
                  index !== SETTINGS.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: themeColors.border,
                  },
                ]}
                activeOpacity={0.7}>
                <View style={styles.settingLeft}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={24}
                    color={themeColors.icon}
                  />
                  <Text style={[styles.settingTitle, { color: themeColors.text }]}>
                    {item.title}
                  </Text>
                </View>
                <View style={styles.settingRight}>
                  {item.type === 'switch' ? (
                    <Switch
                      value={item.value as boolean}
                      onValueChange={item.onToggle}
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
                      <MaterialCommunityIcons
                        name="chevron-right"
                        size={24}
                        color={themeColors.icon}
                      />
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
  name: { fontSize: Theme.typography.sizes.xxl, fontWeight: 'bold' },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  editIcon: { marginLeft: 8 },
  nameInput: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    minWidth: 150,
    textAlign: 'center',
    paddingVertical: 4,
    marginBottom: 4,
  },
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
