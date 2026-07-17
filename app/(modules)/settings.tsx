import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../../components/GlassCard';
import { useGlobalContext, AppTheme } from '../../context/GlobalProvider';
import { StorageService, StorageKeys } from '../../services/storage';
import { Toast } from '../../components/Toast';
import { router } from 'expo-router';

const SettingRow = ({ icon, label, type, value, onToggle, onPress, loading }: any) => (
  <TouchableOpacity style={styles.settingRow} onPress={type === 'switch' ? undefined : onPress} disabled={type === 'switch' || loading} activeOpacity={0.7}>
    <View style={styles.settingLabelContainer}>
      <Ionicons name={icon} size={20} color="rgba(255,255,255,0.7)" style={styles.settingIcon} />
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    {type === 'switch' ? (
      <Switch value={value} onValueChange={onToggle} disabled={loading} thumbColor="#00e5ff" trackColor={{ false: '#767577', true: 'rgba(0,229,255,0.5)' }} />
    ) : (
      <View style={styles.settingValueContainer}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.5)" />
      </View>
    )}
  </TouchableOpacity>
);

export default function SettingsScreen() {
  const { themePref, changeTheme, language, changeLanguage, setRole } = useGlobalContext();
  
  const [demoMode, setDemoMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [langModalVisible, setLangModalVisible] = useState(false);
  
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const LANGUAGES = ['English', 'Spanish', 'French', 'Portuguese', 'Hindi', 'Arabic', 'Japanese'];

  useEffect(() => {
    const loadNotifs = async () => {
      const stored = await StorageService.getItem(StorageKeys.NOTIFICATIONS);
      if (stored !== null) setNotifications(stored === 'true');
    };
    loadNotifs();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const toggleNotifications = async (val: boolean) => {
    setNotifications(val);
    await StorageService.setItem(StorageKeys.NOTIFICATIONS, val.toString());
    showToast(val ? 'Push notifications enabled.' : 'Push notifications disabled.');
  };

  const toggleTheme = async (val: boolean) => {
    await changeTheme(val ? 'dark' : 'light');
  };

  const handleLangSelect = async (lang: string) => {
    await changeLanguage(lang);
    setLangModalVisible(false);
    showToast(`Language changed to ${lang}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Settings" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>App Settings</Text>
            <SettingRow icon="moon" label="Dark Theme" type="switch" value={themePref === 'dark' || themePref === 'system'} onToggle={toggleTheme} />
            <SettingRow icon="language" label="Language" type="nav" value={language} onPress={() => setLangModalVisible(true)} />
            <SettingRow icon="notifications" label="Push Notifications" type="switch" value={notifications} onToggle={toggleNotifications} />
            <SettingRow icon="accessibility" label="Accessibility" type="nav" onPress={() => router.push('/(modules)/accessibility' as any)} />
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Account & Payments</Text>
            <SettingRow icon="person" label="Profile Information" type="nav" onPress={() => router.push('/(tabs)/profile')} />
            <SettingRow icon="card" label="Payment Methods" type="nav" onPress={() => router.push('/(modules)/payment-methods' as any)} />
            <SettingRow icon="shield-checkmark" label="Security & Privacy" type="nav" onPress={() => router.push('/(modules)/security-privacy' as any)} />
          </GlassCard>
          
          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Support & About</Text>
            <SettingRow icon="help-circle" label="Help & Support" type="nav" onPress={() => router.push('/(modules)/support-center' as any)} />
            
            <View style={styles.aboutContainer}>
              <Text style={styles.aboutTitle}>Smart Stadium AI</Text>
              <Text style={styles.aboutText}>Version 1.0.0 (Build 42)</Text>
              <Text style={styles.aboutText}>Built for FIFA World Cup 2026</Text>
              <Text style={styles.aboutText}>Last Updated: Today</Text>
            </View>
          </GlassCard>

          <TouchableOpacity style={styles.logoutBtn} onPress={() => { setRole(null); router.replace('/login'); }}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Language Modal */}
      <Modal visible={langModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity key={lang} style={styles.langItem} onPress={() => handleLangSelect(lang)}>
                <Text style={[styles.langText, language === lang && styles.langActive]}>{lang}</Text>
                {language === lang && <Ionicons name="checkmark" size={20} color="#00e5ff" />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setLangModalVisible(false)}>
              <Text style={styles.closeBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Toast visible={toastVisible} message={toastMessage} onHide={() => setToastVisible(false)} type="success" />
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
  aboutContainer: {
    paddingVertical: Theme.spacing.l,
    alignItems: 'center',
    gap: 4,
  },
  aboutTitle: {
    color: '#00e5ff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  aboutText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
  logoutBtn: {
    marginVertical: Theme.spacing.xl,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: 'rgba(255,23,68,0.1)',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(255,23,68,0.3)',
  },
  logoutText: {
    color: '#ff1744',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.dark.card,
    borderTopLeftRadius: Theme.shapes.borderRadius.xl,
    borderTopRightRadius: Theme.shapes.borderRadius.xl,
    padding: Theme.spacing.l,
    paddingBottom: 40,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.l,
    textAlign: 'center',
  },
  langItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  langText: {
    color: '#fff',
    fontSize: 16,
  },
  langActive: {
    color: '#00e5ff',
    fontWeight: 'bold',
  },
  closeBtn: {
    marginTop: Theme.spacing.xl,
    paddingVertical: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: Theme.shapes.borderRadius.m,
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
