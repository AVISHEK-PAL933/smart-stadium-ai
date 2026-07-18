import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../../components/GlassCard';
import { Toast } from '../../components/Toast';


const ToggleRow = ({ icon, label, value, onToggle }: any) => {
  const { theme, themeColors } = useGlobalContext();
  
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={20} color="rgba(255,255,255,0.7)" style={styles.icon} />
        <Text style={[styles.rowLabel, { color: themeColors.text }]}>{label}</Text>
      </View>
      <Switch value={value} onValueChange={onToggle} thumbColor="#00e5ff" trackColor={{ false: '#767577', true: 'rgba(0,229,255,0.5)' }} />
    </View>
  );
};

const LinkRow = ({ icon, label, onPress }: any) => {
  const { theme, themeColors } = useGlobalContext();
  
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={20} color="rgba(255,255,255,0.7)" style={styles.icon} />
        <Text style={[styles.rowLabel, { color: themeColors.text }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.5)" />
    </TouchableOpacity>
  );
};

export default function SecurityPrivacy() {
  const { theme, themeColors } = useGlobalContext();

  const [biometrics, setBiometrics] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [location, setLocation] = useState(true);
  
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Security & Privacy" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Login & Security</Text>
            <LinkRow icon="key" label="Change Password" onPress={() => showToast('Password reset link sent to email.')} />
            <ToggleRow icon="finger-print" label="Biometric / Face ID" value={biometrics} onToggle={(v: boolean) => { setBiometrics(v); showToast(`Biometrics ${v ? 'enabled' : 'disabled'}`); }} />
            <ToggleRow icon="shield-checkmark" label="Two-Factor Authentication" value={twoFactor} onToggle={(v: boolean) => { setTwoFactor(v); showToast(`2FA ${v ? 'enabled' : 'disabled'}`); }} />
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Data & Privacy</Text>
            <ToggleRow icon="location" label="Location Services" value={location} onToggle={(v: boolean) => { setLocation(v); showToast(`Location tracking ${v ? 'enabled' : 'disabled'}`); }} />
            <LinkRow icon="document-text" label="Privacy Settings" onPress={() => showToast('Opened privacy dashboard.')} />
            <LinkRow icon="download" label="Download My Data" onPress={() => showToast('Data export started.')} />
          </GlassCard>
          
          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Devices & Sessions</Text>
            <LinkRow icon="phone-portrait" label="Device History" onPress={() => showToast('Showing active devices.')} />
            <LinkRow icon="log-out" label="Log out of all devices" onPress={() => showToast('Logged out of all other sessions.')} />
          </GlassCard>
        </View>
      </ScrollView>
      <Toast visible={toastVisible} message={toastMessage} onHide={() => setToastVisible(false)} type="success" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  content: { padding: Theme.spacing.m, gap: Theme.spacing.m },
  section: { padding: Theme.spacing.m },
  sectionTitle: { color: '#00e5ff', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: Theme.spacing.m },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 12, width: 24 },
  rowLabel: { fontSize: 16 },
});
