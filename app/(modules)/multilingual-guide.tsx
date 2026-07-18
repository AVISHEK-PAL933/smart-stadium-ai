import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../../constants/colors';

import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedBackground } from '../../components/AnimatedBackground';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

// Global Design System Colors
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

const LANGUAGES = [
  { id: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { id: 'en', name: 'English', flag: '🇬🇧' },
  { id: 'es', name: 'Español', flag: '🇪🇸' },
  { id: 'fr', name: 'Français', flag: '🇫🇷' },
  { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { id: 'pt', name: 'Português', flag: '🇧🇷' },
  { id: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { id: 'ja', name: 'Japanese', flag: '🇯🇵' },
];

const HISTORY = [
  { id: 1, text: 'Where is the nearest restroom?', trans: '¿Dónde está el baño más cercano?' },
  { id: 2, text: 'I need medical assistance.', trans: 'Necesito asistencia médica.' },
];

export default function MultilingualGuide() {
  const router = useRouter();
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [inputText, setInputText] = useState('');
  
  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
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
        <MaterialCommunityIcons name="translate" size={28} color={GLOBAL_COLORS.primary} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>AI Translation</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Global Background */}
      <LinearGradient colors={[GLOBAL_COLORS.bg, '#040914']} style={StyleSheet.absoluteFillObject} />
      <AnimatedBackground />

      {renderHeader()}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Language Selector Card */}
        <Animated.View entering={FadeInUp.delay(100)}>
          <LinearGradient colors={[GLOBAL_COLORS.glass, 'rgba(18,29,51,0.95)']} style={styles.heroCard}>
            <View style={styles.langSwapRow}>
              <View style={styles.langBubble}>
                <Text style={styles.langBubbleText}>{LANGUAGES.find(l => l.id === sourceLang)?.name}</Text>
              </View>
              <TouchableOpacity style={styles.swapBtn} onPress={swapLanguages}>
                <MaterialCommunityIcons name="swap-horizontal" size={24} color={GLOBAL_COLORS.primary} />
              </TouchableOpacity>
              <View style={[styles.langBubble, { borderColor: GLOBAL_COLORS.primary, borderWidth: 1 }]}>
                <Text style={[styles.langBubbleText, { color: GLOBAL_COLORS.primary }]}>{LANGUAGES.find(l => l.id === targetLang)?.name}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Quick Select</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.langList}>
              {LANGUAGES.map((lang, idx) => (
                <TouchableOpacity key={lang.id} onPress={() => setTargetLang(lang.id)}>
                  <View style={[styles.langChip, targetLang === lang.id && styles.langChipActive]}>
                    <Text style={styles.langFlag}>{lang.flag}</Text>
                    <Text style={[styles.langChipText, targetLang === lang.id && { color: '#FFF' }]}>{lang.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </LinearGradient>
        </Animated.View>

        {/* Translation Box */}
        <Animated.View entering={FadeInUp.delay(200)}>
          <LinearGradient colors={[GLOBAL_COLORS.glass, 'rgba(18,29,51,0.95)']} style={styles.card}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Tap to type or speak..."
                placeholderTextColor={GLOBAL_COLORS.textSecondary}
                multiline
                value={inputText}
                onChangeText={setInputText}
              />
              <TouchableOpacity style={styles.micBtn}>
                <MaterialCommunityIcons name="microphone" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
            
            {inputText.length > 0 && (
              <Animated.View entering={FadeIn} style={styles.resultBox}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultLangLabel}>{LANGUAGES.find(l => l.id === targetLang)?.name} Translation</Text>
                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.iconBtn}><MaterialCommunityIcons name="content-copy" size={20} color={GLOBAL_COLORS.textSecondary} /></TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}><MaterialCommunityIcons name="share-variant" size={20} color={GLOBAL_COLORS.textSecondary} /></TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.resultText}>[AI Translation Result...]</Text>
                
                <TouchableOpacity style={styles.playBtn}>
                  <LinearGradient colors={[GLOBAL_COLORS.primary, '#0098FF']} style={styles.playBtnGradient}>
                    <MaterialCommunityIcons name="volume-high" size={24} color="#FFF" />
                    <Text style={styles.playBtnText}>Play Audio</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            )}
          </LinearGradient>
        </Animated.View>

        {/* Recent History */}
        <Animated.View entering={FadeInUp.delay(300)}>
          <Text style={[styles.sectionTitle, { marginLeft: 4, marginTop: 16 }]}>Recent Translations</Text>
          {HISTORY.map((item, idx) => (
            <Animated.View entering={FadeInUp.delay(400 + idx * 50)} key={item.id}>
              <LinearGradient colors={[GLOBAL_COLORS.glass, 'rgba(18,29,51,0.95)']} style={styles.historyCard}>
                <Text style={styles.historyOrig}>{item.text}</Text>
                <Text style={styles.historyTrans}>{item.trans}</Text>
                <TouchableOpacity style={styles.historyPlay}>
                  <MaterialCommunityIcons name="volume-high" size={20} color={GLOBAL_COLORS.primary} />
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>
          ))}
        </Animated.View>

      </ScrollView>
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

  card: { borderRadius: 24, padding: 24, marginBottom: 16, borderWidth: 1, borderColor: GLOBAL_COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
  heroCard: { borderRadius: 24, padding: 24, marginBottom: 16, borderWidth: 1, borderColor: GLOBAL_COLORS.border },

  langSwapRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, backgroundColor: 'rgba(0,0,0,0.2)', padding: 12, borderRadius: 20 },
  langBubble: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)' },
  langBubbleText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  swapBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(0, 200, 255, 0.1)', justifyContent: 'center', alignItems: 'center', marginHorizontal: 12, borderWidth: 1, borderColor: GLOBAL_COLORS.primary },

  sectionTitle: { color: GLOBAL_COLORS.textSecondary, fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  langList: { gap: 12, paddingBottom: 8 },
  langChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'transparent' },
  langChipActive: { backgroundColor: 'rgba(0, 200, 255, 0.1)', borderColor: GLOBAL_COLORS.primary },
  langFlag: { fontSize: 20, marginRight: 8 },
  langChipText: { color: GLOBAL_COLORS.textSecondary, fontSize: 14, fontWeight: 'bold' },

  inputWrapper: { position: 'relative', minHeight: 140 },
  input: { flex: 1, fontSize: 20, color: '#FFF', textAlignVertical: 'top', paddingRight: 60 },
  micBtn: { position: 'absolute', bottom: 0, right: 0, width: 56, height: 56, borderRadius: 28, backgroundColor: GLOBAL_COLORS.primary, justifyContent: 'center', alignItems: 'center', shadowColor: GLOBAL_COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 12 },

  resultBox: { marginTop: 24, paddingTop: 24, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  resultLangLabel: { color: GLOBAL_COLORS.primary, fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' },
  actionRow: { flexDirection: 'row', gap: 16 },
  iconBtn: { padding: 4 },
  resultText: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  playBtn: { alignSelf: 'flex-start' },
  playBtnGradient: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 24 },
  playBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },

  historyCard: { position: 'relative', borderRadius: 20, padding: 20, marginBottom: 12, borderWidth: 1, borderColor: GLOBAL_COLORS.border },
  historyOrig: { color: GLOBAL_COLORS.textSecondary, fontSize: 14, marginBottom: 8, paddingRight: 40 },
  historyTrans: { color: '#FFF', fontSize: 18, fontWeight: 'bold', paddingRight: 40 },
  historyPlay: { position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,200,255,0.1)', justifyContent: 'center', alignItems: 'center' },
});
