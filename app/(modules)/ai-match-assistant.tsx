import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { Theme } from '../../constants/theme';
import { ChatBubble } from '../../components/ChatBubble';
import { SuggestionChip } from '../../components/SuggestionChip';
import { TypingIndicator } from '../../components/TypingIndicator';
import { ChatInput } from '../../components/ChatInput';
import { useChat } from '../../hooks/useChat';
import { useSpeech } from '../../hooks/useSpeech';
import { router } from 'expo-router';

const SUGGESTIONS = [
  '🎫 Show my ticket',
  '🪑 Find my seat',
  '🍔 Recommend food',
  '🚻 Nearest washroom',
  '🚑 Emergency help',
  '🅿 Parking Zone B',
  "⚽ Today's matches",
  '🛍 FIFA Store',
];

export default function AIMatchAssistant() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const { isListening, startListening, stopListening, speak } = useSpeech();
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Automatically scroll to bottom when messages or typing state changes
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleVoicePress = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((result) => {
        sendMessage(result);
      });
    }
  };

  const handleAction = (actionType: string, actionPayload?: any) => {
    switch (actionType) {
      case 'NAVIGATE':
        router.push({
          pathname: '/(modules)/navigation',
          params: actionPayload?.destId ? { destId: actionPayload.destId } : undefined,
        });
        break;
      case 'TICKET':
        router.push('/(modules)/smart-ticket');
        break;
      case 'FOOD':
        router.push({
          pathname: '/(modules)/food-ordering',
          params: actionPayload?.filter ? { filter: actionPayload.filter } : undefined,
        });
        break;
      case 'PARKING':
        router.push('/(modules)/parking');
        break;
      case 'SOS':
        router.push('/(modules)/emergency');
        break;
      case 'LOST_FOUND':
        router.push('/(modules)/lost-found');
        break;
      case 'FAN_ZONE':
        router.push('/(modules)/fan-engagement');
        break;
      default:
        break;
    }
  };

  // Optional: Read out last bot message
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.isBot && lastMessage.id !== '1') {
      speak(lastMessage.text);
    }
  }, [messages, speak]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <Header title="AI Stadium Assistant" />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.messagesContainer}>
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              text={msg.text}
              isBot={msg.isBot}
              actionType={msg.actionType}
              actionPayload={msg.actionPayload}
              onActionPress={handleAction}
            />
          ))}
          {isTyping && <TypingIndicator />}
        </View>
      </ScrollView>

      {/* Suggested prompts list */}
      <View style={styles.suggestionsWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestionsContainer}>
          {SUGGESTIONS.map((suggestion) => (
            <SuggestionChip key={suggestion} label={suggestion} onPress={sendMessage} />
          ))}
        </ScrollView>
      </View>

      <ChatInput
        value={inputText}
        onChangeText={setInputText}
        onSend={handleSend}
        isListening={isListening}
        onVoicePress={handleVoicePress}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.l,
    paddingBottom: Theme.spacing.xl,
  },
  messagesContainer: {
    flex: 1,
    paddingBottom: 40,
  },
  suggestionsWrapper: {
    paddingVertical: Theme.spacing.s,
    backgroundColor: 'transparent',
  },
  suggestionsContainer: {
    paddingHorizontal: Theme.spacing.l,
  },
});
