import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../constants/colors';

import { Header } from '../../components/Header';
import { useGlobalContext } from '../../context/GlobalProvider';
import { PrimaryButton } from '../../components/PrimaryButton';
import { router } from 'expo-router';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassCard } from '../../components/GlassCard';
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function ProfileScreen() {
  const { role, setRole, theme, themeColors, changeTheme } = useGlobalContext();

  const [userName, setUserName] = useState(role === 'fan' ? 'John Doe' : 'Guest User');
  const [isEditing, setIsEditing] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'You need to allow camera roll permissions to change your avatar.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      setAvatarUri(pickerResult.assets[0].uri);
    }
  };

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
      value: theme === 'dark', 
      onToggle: () => changeTheme(theme === 'dark' ? 'light' : 'dark') 
    },
    { 
      icon: 'translate', 
      title: 'Language AI', 
      type: 'link', 
      onPress: () => router.push('/(modules)/multilingual-guide' as any)
    },
    { 
      icon: 'human-wheelchair', 
      title: 'Accessibility', 
      type: 'link',
      onPress: () => router.push('/(modules)/accessibility' as any)
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
          <TouchableOpacity style={styles.avatarContainer} onPress={handlePickImage} activeOpacity={0.8}>
            <Image source={avatarUri ? { uri: avatarUri } : require('../../assets/user_avatar.png')} style={styles.avatarImage} />
            <View style={[styles.badge, { backgroundColor: '#39FF14', borderColor: themeColors.background }]} />
            <View style={[styles.editBadge, { backgroundColor: themeColors.tint, borderColor: themeColors.background }]}>
              <MaterialCommunityIcons name="camera" size={14} color="#FFF" />
            </View>
          </TouchableOpacity>
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
            {role === 'fan' ? 'FIFA VIP Member' : 'Temporary Access'}
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
                      {item.value !== undefined && item.value !== null && (
                        <Text style={[styles.settingValue, { color: themeColors.icon }]}>
                          {String(item.value)}
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
  avatarContainer: { position: 'relative', marginBottom: Theme.spacing.m, alignItems: 'center', justifyContent: 'center' },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  badge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
  },
  editBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
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
