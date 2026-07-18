import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image, TextInput, Modal, useWindowDimensions, KeyboardAvoidingView, Platform } from 'react-native';
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

const LOST_ITEMS = [
  { id: '1', name: 'Black iPhone 13', location: 'Gate D Security', time: '10 mins ago', status: 'Found', confidence: '98%', img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop' },
  { id: '2', name: 'Brown Leather Wallet', location: 'Section 112, Row 4', time: '1 hr ago', status: 'Lost', confidence: 'N/A', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop' },
  { id: '3', name: 'Toyota Car Keys', location: 'Restroom C', time: '2 hrs ago', status: 'Found', confidence: '100%', img: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=600&auto=format&fit=crop' },
  { id: '4', name: 'Blue Ray-Ban Sunglasses', location: 'VIP Lounge North', time: '3 hrs ago', status: 'Lost', confidence: 'N/A', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop' },
];

export default function LostFound() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backBtn} onPress={() => {
        if (router.canGoBack()) router.back();
        else router.replace('/');
      }}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>
      <View style={styles.headerTitleRow}>
        <MaterialCommunityIcons name="line-scan" size={28} color={GLOBAL_COLORS.primary} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>AI Lost & Found</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient colors={[GLOBAL_COLORS.bg, '#040914']} style={StyleSheet.absoluteFillObject} />
      <AnimatedBackground />

      {renderHeader()}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Top AI Search / Upload Card */}
        <Animated.View entering={FadeInUp.delay(100)}>
          <LinearGradient colors={[GLOBAL_COLORS.glass, 'rgba(18,29,51,0.95)']} style={styles.heroCard}>
            <View style={styles.heroHeader}>
              <View>
                <Text style={styles.heroTitle}>AI Item Matching</Text>
                <Text style={styles.heroDesc}>Upload an image or describe your lost item.</Text>
              </View>
              <MaterialCommunityIcons name="brain" size={40} color={GLOBAL_COLORS.primary} />
            </View>

            <View style={styles.searchRow}>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="magnify" size={24} color={GLOBAL_COLORS.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Black iPhone with red case..."
                  placeholderTextColor={GLOBAL_COLORS.textSecondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <TouchableOpacity style={styles.uploadBtn}>
                <MaterialCommunityIcons name="camera" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryBtn}>
              <LinearGradient colors={[GLOBAL_COLORS.primary, GLOBAL_COLORS.secondary]} style={styles.gradientBtn}>
                <Text style={styles.btnText}>Report Lost Item</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        <Text style={styles.sectionTitle}>Recently Found & Reported</Text>

        <View style={styles.grid}>
          {LOST_ITEMS.map((item, idx) => (
            <Animated.View key={item.id} entering={FadeInUp.delay(200 + idx * 50)} style={[styles.gridItem, { width: width > 768 ? '48%' : '100%' }]}>
              <LinearGradient colors={[GLOBAL_COLORS.glass, 'rgba(18,29,51,0.95)']} style={styles.itemCard}>
                <Image source={{ uri: item.img }} style={styles.itemImg} />
                
                <View style={styles.badgeRow}>
                  <View style={[styles.statusBadge, { backgroundColor: item.status === 'Found' ? GLOBAL_COLORS.success + '20' : GLOBAL_COLORS.warning + '20', borderColor: item.status === 'Found' ? GLOBAL_COLORS.success : GLOBAL_COLORS.warning }]}>
                    <Text style={[styles.statusText, { color: item.status === 'Found' ? GLOBAL_COLORS.success : GLOBAL_COLORS.warning }]}>{item.status}</Text>
                  </View>
                  {item.status === 'Found' && (
                    <View style={[styles.statusBadge, { backgroundColor: GLOBAL_COLORS.primary + '20', borderColor: GLOBAL_COLORS.primary }]}>
                      <Text style={[styles.statusText, { color: GLOBAL_COLORS.primary }]}>{item.confidence} Match</Text>
                    </View>
                  )}
                </View>

                <View style={styles.itemDetails}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.itemMetaRow}>
                    <MaterialCommunityIcons name="map-marker" size={14} color={GLOBAL_COLORS.textSecondary} />
                    <Text style={styles.itemMetaText}>{item.location}</Text>
                  </View>
                  <View style={styles.itemMetaRow}>
                    <MaterialCommunityIcons name="clock-outline" size={14} color={GLOBAL_COLORS.textSecondary} />
                    <Text style={styles.itemMetaText}>{item.time}</Text>
                  </View>
                </View>

                <View style={styles.cardActions}>
                  <TouchableOpacity style={styles.secondaryBtn} onPress={() => setSelectedItem(item)}>
                    <Text style={styles.secondaryBtnText}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Text style={[styles.actionBtnText, { color: item.status === 'Found' ? GLOBAL_COLORS.success : GLOBAL_COLORS.primary }]}>
                      {item.status === 'Found' ? 'Claim Item' : 'Track Status'}
                    </Text>
                  </TouchableOpacity>
                </View>

              </LinearGradient>
            </Animated.View>
          ))}
        </View>

      </ScrollView>

      {/* Item Details Modal */}
      {selectedItem && (
        <Modal transparent visible={!!selectedItem} animationType="fade">
          <View style={styles.modalBackdrop}>
            <Animated.View entering={FadeInUp} exiting={FadeOut}>
              <LinearGradient colors={['#121D33', '#0A1121']} style={styles.modalCard}>
                <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedItem(null)}>
                  <MaterialCommunityIcons name="close" size={24} color="#FFF" />
                </TouchableOpacity>
                
                <Image source={{ uri: selectedItem.img }} style={styles.modalImg} />
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                
                <View style={styles.timeline}>
                  <View style={styles.timelineItem}>
                    <View style={[styles.dot, { backgroundColor: GLOBAL_COLORS.primary }]} />
                    <Text style={styles.timelineText}>Reported missing {selectedItem.time}</Text>
                  </View>
                  {selectedItem.status === 'Found' && (
                    <View style={styles.timelineItem}>
                      <View style={[styles.dot, { backgroundColor: GLOBAL_COLORS.success }]} />
                      <Text style={styles.timelineText}>Located at {selectedItem.location}</Text>
                    </View>
                  )}
                </View>

                <TouchableOpacity style={styles.modalPrimaryBtn} onPress={() => setSelectedItem(null)}>
                  <LinearGradient colors={[GLOBAL_COLORS.primary, GLOBAL_COLORS.secondary]} style={styles.gradientBtn}>
                    <Text style={styles.btnText}>{selectedItem.status === 'Found' ? 'Initiate Claim Process' : 'Update Report'}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>
          </View>
        </Modal>
      )}

    </KeyboardAvoidingView>
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

  heroCard: { borderRadius: 24, padding: 24, marginBottom: 24, borderWidth: 1, borderColor: GLOBAL_COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  heroTitle: { color: '#FFF', fontSize: 24, fontWeight: '900', marginBottom: 8 },
  heroDesc: { color: GLOBAL_COLORS.textSecondary, fontSize: 14 },

  searchRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  inputWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 16, borderWidth: 1, borderColor: GLOBAL_COLORS.border, paddingHorizontal: 16 },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, height: 56, color: '#FFF', fontSize: 16 },
  uploadBtn: { width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(0,200,255,0.1)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: GLOBAL_COLORS.primary },

  primaryBtn: { height: 56, borderRadius: 28, overflow: 'hidden', shadowColor: GLOBAL_COLORS.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16 },
  gradientBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

  sectionTitle: { color: GLOBAL_COLORS.textSecondary, fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16, marginLeft: 8 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  gridItem: { flexGrow: 1, minWidth: 300 },
  itemCard: { borderRadius: 24, padding: 20, borderWidth: 1, borderColor: GLOBAL_COLORS.border, flexDirection: 'column' },
  itemImg: { width: '100%', height: 180, borderRadius: 16, marginBottom: 16 },
  
  badgeRow: { position: 'absolute', top: 32, left: 32, flexDirection: 'row', gap: 8 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  statusText: { fontSize: 12, fontWeight: 'bold' },

  itemDetails: { marginBottom: 16 },
  itemName: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  itemMetaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  itemMetaText: { color: GLOBAL_COLORS.textSecondary, fontSize: 14, marginLeft: 8 },

  cardActions: { flexDirection: 'row', gap: 12 },
  secondaryBtn: { flex: 1, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  secondaryBtnText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  actionBtn: { flex: 1, height: 44, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  actionBtnText: { fontSize: 14, fontWeight: 'bold' },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', maxWidth: 400, borderRadius: 24, padding: 24, borderWidth: 1, borderColor: GLOBAL_COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.5, shadowRadius: 30 },
  closeBtn: { position: 'absolute', top: 16, right: 16, zIndex: 10, padding: 8, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20 },
  modalImg: { width: '100%', height: 220, borderRadius: 16, marginBottom: 20 },
  modalTitle: { color: '#FFF', fontSize: 24, fontWeight: '900', marginBottom: 24 },
  
  timeline: { borderLeftWidth: 2, borderLeftColor: 'rgba(255,255,255,0.1)', marginLeft: 10, paddingLeft: 20, marginBottom: 32 },
  timelineItem: { position: 'relative', marginBottom: 24 },
  dot: { position: 'absolute', left: -27, top: 4, width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: '#121D33' },
  timelineText: { color: GLOBAL_COLORS.textSecondary, fontSize: 15 },

  modalPrimaryBtn: { height: 56, borderRadius: 28, overflow: 'hidden' },
});
