import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function AIMatchAssistant() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! I am your StadiumMind AI. Ask me about match stats, player lineups, or stadium facilities.',
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), text: input, isBot: false }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "I'm still learning, but I'll soon be able to answer that!",
          isBot: true,
        },
      ]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header title="AI Assistant" />
      <ScrollView contentContainerStyle={styles.content}>
        {messages.map((msg, idx) => (
          <Animated.View
            key={msg.id}
            entering={FadeInUp.delay(idx * 100)}
            style={[
              styles.messageBubble,
              msg.isBot ? styles.botBubble : styles.userBubble,
              { backgroundColor: msg.isBot ? themeColors.card : themeColors.tint },
            ]}>
            <Text style={[styles.messageText, { color: msg.isBot ? themeColors.text : '#fff' }]}>
              {msg.text}
            </Text>
          </Animated.View>
        ))}
      </ScrollView>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: themeColors.card, borderTopColor: themeColors.border },
        ]}>
        <TextInput
          style={[
            styles.input,
            {
              color: themeColors.text,
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            },
          ]}
          placeholder="Ask something..."
          placeholderTextColor={themeColors.icon}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <LinearGradient
            colors={[
              themeColors.gradientStart || themeColors.tint,
              themeColors.gradientEnd || themeColors.tint,
            ]}
            style={styles.sendGradient}>
            <MaterialCommunityIcons name="send" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Theme.spacing.l, gap: Theme.spacing.m, paddingBottom: 40 },
  messageBubble: {
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.m,
    maxWidth: '80%',
  },
  botBubble: { alignSelf: 'flex-start', borderBottomLeftRadius: 0 },
  userBubble: { alignSelf: 'flex-end', borderBottomRightRadius: 0 },
  messageText: { fontSize: Theme.typography.sizes.m },
  inputContainer: {
    flexDirection: 'row',
    padding: Theme.spacing.m,
    borderTopWidth: 1,
    alignItems: 'center',
    gap: Theme.spacing.s,
  },
  input: {
    flex: 1,
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.xl,
    fontSize: Theme.typography.sizes.m,
  },
  sendButton: { width: 44, height: 44, borderRadius: 22, overflow: 'hidden' },
  sendGradient: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
