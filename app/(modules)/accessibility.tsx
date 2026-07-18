import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image, Modal, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/colors';

import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedBackground } from '../../components/AnimatedBackground';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeIn, FadeOut } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const GLOBAL_COLORS = {
  bg: '#071321',
  card: '#121D33',
  primary: '#00C8FF',
  secondary: '#6C63FF',
  success: '#00E676',
  warning: '#FFC107',
  danger: '#FF5252',
  textPrimary: '#FFFFFF',
  textSecondary: '#B8C4D9',
  border: 'rgba(255, 255, 255, 0.05)',
  glass: 'rgba(18, 29, 51, 0.85)',
};

const SERVICES = [
  { id: 'wheelchair', title: 'Wheelchair Assistance', icon: 'wheelchair', desc: 'Request a dedicated escort and wheelchair from your arrival gate directly to your seat.', color: GLOBAL_COLORS.primary },
  { id: 'sign', title: 'Sign Language', icon: 'hand-okay', desc: 'Book an on-demand sign language interpreter for broadcast and stadium announcements.', color: GLOBAL_COLORS.success },
  { id: 'audio', title: 'Audio Guide', icon: 'headset', desc: 'Reserve a low-latency headset for live descriptive match commentary and alerts.', color: GLOBAL_COLORS.warning },
  { id: 'vision', title: 'Low Vision Support', icon: 'eye-outline', desc: 'Request high-contrast stadium maps, tactile guides, or personal navigation assistance.', color: GLOBAL_COLORS.secondary },
  { id: 'medical', title: 'Medical Assistance', icon: 'medical-bag', desc: 'Notify on-site medical staff for non-emergency health support and secure medication storage.', color: GLOBAL_COLORS.danger },
  { id: 'family', title: 'Family Support', icon: 'baby-carriage', desc: 'Access private nursing rooms, family restrooms, and stroller valet services.', color: '#E040FB' },
];

export default function AccessibilityServices() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [bookingState, setBookingState] = useState<'idle' | 'loading' | 'confirmed'>('idle');

  const handleBook = () => {
    setBookingState('loading');
    setTimeout(() => {
      setBookingState('confirmed');
    }, 1500);
  };

  const closeDialog = () => {
    setSelectedService(null);
    setTimeout(() => setBookingState('idle'), 300);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={() => {
        if (router.canGoBack()) router.back();
        else router.replace('/');
      }}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>
      <View style={styles.headerTitleRow}>
        <MaterialCommunityIcons name="human-wheelchair" size={28} color={GLOBAL_COLORS.primary} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Accessibility</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={[GLOBAL_COLORS.bg, '#040914']} style={StyleSheet.absoluteFillObject} />
      <AnimatedBackground />

      {renderHeader()}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <Animated.View entering={FadeInUp.delay(100)}>
          <LinearGradient colors={[GLOBAL_COLORS.glass, 'rgba(18,29,51,0.95)']} style={styles.heroCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1574883441380-6060c5a242c7?q=80&w=1200&auto=format&fit=crop' }} 
              style={styles.heroImg}
              resizeMode="cover"
            />
            <LinearGradient colors={['transparent', 'rgba(18,29,51,0.9)', '#121D33']} style={styles.heroOverlay} />
            <View style={styles.heroTextContent}>
              <Text style={styles.heroTitle}>Inclusive Stadium</Text>
              <Text style={styles.heroDesc}>World-class accessibility services ensuring a seamless, barrier-free experience for every fan.</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        <Text style={styles.sectionTitle}>Available Services</Text>

        <View style={styles.grid}>
          {SERVICES.map((service, idx) => (
            <Animated.View key={service.id} entering={FadeInUp.delay(200 + idx * 50)} style={styles.gridItem}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setSelectedService(service)}>
                <LinearGradient colors={[GLOBAL_COLORS.glass, 'rgba(18,29,51,0.95)']} style={styles.serviceCard}>
                  <View style={[styles.iconBox, { backgroundColor: service.color + '20' }]}>
                    <MaterialCommunityIcons name={service.icon as any} size={32} color={service.color} />
                  </View>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDesc} numberOfLines={2}>{service.desc}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {/* Booking Dialog Modal */}
      {selectedService && (
        <Modal transparent visible={!!selectedService} animationType="fade">
          <View style={styles.modalBackdrop}>
            <Animated.View entering={FadeInUp} exiting={FadeOut}>
              <LinearGradient colors={['#121D33', '#0A1121']} style={styles.modalCard}>
                
                {bookingState === 'idle' && (
                  <>
                    <View style={[styles.modalIconBox, { backgroundColor: selectedService.color + '20' }]}>
                      <MaterialCommunityIcons name={selectedService.icon} size={48} color={selectedService.color} />
                    </View>
                    <Text style={styles.modalTitle}>Book {selectedService.title}</Text>
                    <Text style={styles.modalDesc}>{selectedService.desc}</Text>
                    <View style={styles.modalActions}>
                      <TouchableOpacity style={[styles.pillBtn, { backgroundColor: 'rgba(255,255,255,0.1)' }]} onPress={closeDialog}>
                        <Text style={styles.pillBtnText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.primaryPillBtn} onPress={handleBook}>
                        <LinearGradient colors={[GLOBAL_COLORS.primary, GLOBAL_COLORS.secondary]} style={styles.gradientPill}>
                          <Text style={[styles.pillBtnText, { color: '#FFF' }]}>Confirm Booking</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {bookingState === 'loading' && (
                  <View style={styles.loadingState}>
                    <ActivityIndicator size="large" color={GLOBAL_COLORS.primary} />
                    <Text style={styles.loadingText}>Processing Request...</Text>
                  </View>
                )}

                {bookingState === 'confirmed' && (
                  <Animated.View entering={FadeIn} style={styles.loadingState}>
                    <View style={[styles.modalIconBox, { backgroundColor: GLOBAL_COLORS.success + '20', marginBottom: 16 }]}>
                      <MaterialCommunityIcons name="check-circle" size={48} color={GLOBAL_COLORS.success} />
                    </View>
                    <Text style={styles.modalTitle}>Service Confirmed</Text>
                    <Text style={styles.modalDesc}>Staff have been notified and will meet you at your designated location.</Text>
                    <TouchableOpacity style={[styles.primaryPillBtn, { marginTop: 24, width: '100%' }]} onPress={closeDialog}>
                      <LinearGradient colors={[GLOBAL_COLORS.success, '#00BFA5']} style={styles.gradientPill}>
                        <Text style={[styles.pillBtnText, { color: '#FFF' }]}>Track Status</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </Animated.View>
                )}

              </LinearGradient>
            </Animated.View>
          </View>
        </Modal>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: GLOBAL_COLORS.bg },
  scrollContent: { padding: 16, paddingBottom: 100 },
  
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: GLOBAL_COLORS.border, backgroundColor: 'rgba(7,19,33,0.8)' },
  backBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12 },
  headerTitleRow: { flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 16 },
  headerIcon: { marginRight: 12, textShadowColor: GLOBAL_COLORS.primary, textShadowRadius: 10 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#FFF', letterSpacing: 0.5 },

  heroCard: { borderRadius: 24, overflow: 'hidden', marginBottom: 24, borderWidth: 1, borderColor: GLOBAL_COLORS.border, height: 240, position: 'relative' },
  heroImg: { width: '100%', height: '100%' },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%' },
  heroTextContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24 },
  heroTitle: { color: '#FFF', fontSize: 28, fontWeight: '900', marginBottom: 8, textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 10 },
  heroDesc: { color: GLOBAL_COLORS.textSecondary, fontSize: 14, lineHeight: 20 },

  sectionTitle: { color: GLOBAL_COLORS.textSecondary, fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16, marginLeft: 8 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  gridItem: { width: '47%', minWidth: 160, flexGrow: 1 },
  serviceCard: { borderRadius: 24, padding: 20, borderWidth: 1, borderColor: GLOBAL_COLORS.border, minHeight: 180 },
  iconBox: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  serviceTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  serviceDesc: { color: GLOBAL_COLORS.textSecondary, fontSize: 13, lineHeight: 18 },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', maxWidth: 400, borderRadius: 24, padding: 32, borderWidth: 1, borderColor: GLOBAL_COLORS.border, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.5, shadowRadius: 30 },
  modalIconBox: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  modalTitle: { color: '#FFF', fontSize: 24, fontWeight: '900', marginBottom: 12, textAlign: 'center' },
  modalDesc: { color: GLOBAL_COLORS.textSecondary, fontSize: 16, textAlign: 'center', marginBottom: 32, lineHeight: 24 },
  modalActions: { flexDirection: 'row', gap: 16, width: '100%' },
  pillBtn: { flex: 1, borderRadius: 100, height: 56, justifyContent: 'center', alignItems: 'center' },
  primaryPillBtn: { flex: 1, borderRadius: 100, height: 56, shadowColor: GLOBAL_COLORS.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16 },
  gradientPill: { flex: 1, width: '100%', borderRadius: 100, justifyContent: 'center', alignItems: 'center' },
  pillBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

  loadingState: { alignItems: 'center', paddingVertical: 40 },
  loadingText: { color: GLOBAL_COLORS.primary, fontSize: 18, fontWeight: 'bold', marginTop: 24 },
});
