import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

const LANGUAGES = [
  { id: 'es', name: 'Español', flag: '🇪🇸' },
  { id: 'pt', name: 'Português', flag: '🇧🇷' },
  { id: 'fr', name: 'Français', flag: '🇫🇷' },
  { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export default function MultilingualGuide() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const [selectedLang, setSelectedLang] = useState('es');
  const [inputText, setInputText] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Translation & Guide" />
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInUp.delay(100)}>
          <GlassCard style={styles.heroCard}>
            <MaterialIcons
              name="g-translate"
              size={48}
              color={themeColors.tint}
              style={styles.icon}
            />
            <Text style={[styles.title, { color: themeColors.text }]}>Live Translation</Text>
            <Text style={[styles.subtitle, { color: themeColors.icon }]}>
              Type or speak to translate stadium announcements and ask staff questions.
            </Text>
          </GlassCard>
        </Animated.View>

        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Target Language</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.langList}>
          {LANGUAGES.map((lang, index) => (
            <Animated.View key={lang.id} entering={FadeInUp.delay(200 + index * 50)}>
              <TouchableOpacity onPress={() => setSelectedLang(lang.id)}>
                <GlassCard
                  style={[
                    styles.langCard,
                    selectedLang === lang.id && { borderColor: themeColors.tint },
                  ]}>
                  <Text style={styles.flag}>{lang.flag}</Text>
                  <Text style={[styles.langName, { color: themeColors.text }]}>{lang.name}</Text>
                </GlassCard>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>

        <Text
          style={[styles.sectionTitle, { color: themeColors.text, marginTop: Theme.spacing.l }]}>
          Translator
        </Text>
        <Animated.View entering={FadeInUp.delay(400)}>
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <TextInput
              style={[styles.input, { color: themeColors.text }]}
              placeholder="Type English text to translate..."
              placeholderTextColor={themeColors.icon}
              multiline
              value={inputText}
              onChangeText={setInputText}
            />
            <View style={styles.inputActions}>
              <TouchableOpacity style={styles.micBtn}>
                <MaterialIcons name="mic" size={24} color={themeColors.tint} />
              </TouchableOpacity>
            </View>
          </View>

          {inputText.length > 0 && (
            <GlassCard style={styles.resultCard}>
              <Text style={[styles.resultLabel, { color: themeColors.tint }]}>
                Translated to {LANGUAGES.find((l) => l.id === selectedLang)?.name}
              </Text>
              <Text style={[styles.resultText, { color: themeColors.text }]}>
                [AI Translation Result...]
              </Text>
              <TouchableOpacity style={styles.speakBtn}>
                <MaterialIcons name="volume-up" size={24} color="#fff" />
              </TouchableOpacity>
            </GlassCard>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Theme.spacing.l, paddingBottom: 100 },
  heroCard: { padding: Theme.spacing.l, alignItems: 'center', marginBottom: Theme.spacing.xl },
  icon: {
    marginBottom: Theme.spacing.m,
    textShadowColor: 'rgba(0, 229, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  title: { fontSize: Theme.typography.sizes.xl, fontWeight: 'bold', marginBottom: Theme.spacing.s },
  subtitle: { fontSize: Theme.typography.sizes.m, textAlign: 'center' },
  sectionTitle: {
    fontSize: Theme.typography.sizes.l,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.m,
  },
  langList: { gap: Theme.spacing.m },
  langCard: {
    padding: Theme.spacing.m,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  flag: { fontSize: 32, marginBottom: 8 },
  langName: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold' },
  inputContainer: {
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    minHeight: 120,
  },
  input: { flex: 1, fontSize: Theme.typography.sizes.m, textAlignVertical: 'top' },
  inputActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: Theme.spacing.m },
  micBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultCard: {
    marginTop: Theme.spacing.m,
    padding: Theme.spacing.l,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
  },
  resultLabel: {
    fontSize: Theme.typography.sizes.s,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.s,
  },
  resultText: { fontSize: Theme.typography.sizes.l, marginBottom: Theme.spacing.l },
  speakBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00E5FF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});
