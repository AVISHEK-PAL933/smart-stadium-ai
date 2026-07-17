import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { GlassCard } from '../../components/GlassCard';
import { Toast } from '../../components/Toast';
import { useColorScheme } from 'react-native';

const SupportRow = ({ icon, label, onPress }: any) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={20} color="#00e5ff" style={styles.icon} />
        <Text style={[styles.rowLabel, { color: themeColors.text }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.5)" />
    </TouchableOpacity>
  );
};

export default function SupportCenter() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Help & Support" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <GlassCard style={styles.headerCard}>
            <MaterialCommunityIcons name="headset" size={48} color="#00e5ff" />
            <Text style={styles.headerTitle}>How can we help you?</Text>
            <Text style={styles.headerSub}>Our team is available 24/7</Text>
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Us</Text>
            <SupportRow icon="chatbubbles" label="Live Chat (Demo)" onPress={() => showToast('Connecting to a live agent...')} />
            <SupportRow icon="mail" label="Email Support" onPress={() => showToast('Opened email client.')} />
            <SupportRow icon="bug" label="Report a Bug" onPress={() => showToast('Bug report form opened.')} />
          </GlassCard>

          <GlassCard style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>
            <SupportRow icon="help-circle" label="FAQ" onPress={() => showToast('Opened FAQ page.')} />
            <SupportRow icon="document-text" label="Terms & Conditions" onPress={() => showToast('Opened Terms & Conditions.')} />
            <SupportRow icon="shield-checkmark" label="Privacy Policy" onPress={() => showToast('Opened Privacy Policy.')} />
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
  headerCard: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 8 },
  headerSub: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  section: { padding: Theme.spacing.m },
  sectionTitle: { color: '#00e5ff', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: Theme.spacing.m },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 16, width: 24, textAlign: 'center' },
  rowLabel: { fontSize: 16 },
});
