import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../../components/GlassCard';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedBackground } from '../../components/AnimatedBackground';

export default function HelpCenterScreen() {
  const faqs = [
    { q: "How do I use the AR Navigation?", a: "Tap 'Navigate' on the dashboard, hold your phone up, and follow the arrows on screen." },
    { q: "Where do I pick up my food?", a: "Once your order is ready, you will receive a notification with the Express Lane number at your designated concession stand." },
    { q: "How do I earn Fan Points?", a: "You earn points by buying tickets, ordering food, checking in early, and participating in Live Polls." }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#071321', '#040914']} style={StyleSheet.absoluteFillObject} />
      <AnimatedBackground />
      <Header title="Help Center" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.contactRow}>
            <GlassCard style={styles.contactCard}>
              <Ionicons name="chatbubbles" size={24} color="#00e5ff" />
              <Text style={styles.contactText}>Live Chat</Text>
            </GlassCard>
            <GlassCard style={styles.contactCard}>
              <Ionicons name="call" size={24} color="#00e676" />
              <Text style={styles.contactText}>Call Support</Text>
            </GlassCard>
            <GlassCard style={styles.contactCard}>
              <Ionicons name="bug" size={24} color="#ff3d00" />
              <Text style={styles.contactText}>Report Bug</Text>
            </GlassCard>
          </View>

          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq, idx) => (
            <GlassCard key={idx} style={styles.faqCard}>
              <Text style={styles.faqQ}>{faq.q}</Text>
              <Text style={styles.faqA}>{faq.a}</Text>
            </GlassCard>
          ))}

          <View style={styles.footer}>
            <Text style={styles.versionText}>Smart Stadium AI v1.0.0 (Production Build)</Text>
            <Text style={styles.versionText}>Hackathon Demo Edition</Text>
          </View>
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
  contactRow: {
    flexDirection: 'row',
    gap: Theme.spacing.s,
    marginBottom: Theme.spacing.m,
  },
  contactCard: {
    flex: 1,
    padding: Theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  faqCard: {
    padding: Theme.spacing.m,
  },
  faqQ: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  faqA: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: Theme.spacing.xl,
    marginBottom: Theme.spacing.xl,
  },
  versionText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
  },
});
