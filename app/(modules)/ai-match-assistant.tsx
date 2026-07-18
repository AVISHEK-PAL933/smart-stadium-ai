import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { ChatBubble } from '../../components/ChatBubble';
import { TypingIndicator } from '../../components/TypingIndicator';
import { ChatInput } from '../../components/ChatInput';
import { useChat } from '../../hooks/useChat';
import { useSpeech } from '../../hooks/useSpeech';
import { router } from 'expo-router';
import { AIHeader } from '../../components/AIHeader';
import { AIInfoPanel } from '../../components/AIInfoPanel';
import { AIActionCard } from '../../components/AIActionCard';
import { AIWelcomeCard } from '../../components/AIWelcomeCard';

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
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

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
      case 'MERCH':
        router.push('/(modules)/merchandise');
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
    <View style={styles.container}>
      <AIHeader />
      
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.mainSplit, !isDesktop && styles.mobileLayout]}>
          
          {/* Left Chat Area */}
          <View style={[styles.chatPanel, isDesktop && { flex: 7 }]}>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.messagesContainer}>
                {messages.length <= 1 ? (
                  // Intercept the default initial message with the beautiful welcome card
                  <AIWelcomeCard />
                ) : (
                  messages.map((msg, index) => {
                    // Skip the initial invisible bot welcome message if there are real messages
                    if (index === 0 && msg.id === '1') return null;
                    return (
                      <ChatBubble
                        key={msg.id}
                        text={msg.text}
                        isBot={msg.isBot}
                        actionType={msg.actionType}
                        actionPayload={msg.actionPayload}
                        onActionPress={handleAction}
                      />
                    );
                  })
                )}
                {isTyping && <TypingIndicator />}
              </View>

              {/* Suggestions Horizontal Scroll inside chat scroll, below messages */}
              {messages.length <= 1 && (
                <View style={styles.suggestionsWrapper}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsContainer}>
                    {SUGGESTIONS.map((suggestion) => (
                      <AIActionCard key={suggestion} label={suggestion} onPress={sendMessage} />
                    ))}
                  </ScrollView>
                </View>
              )}
            </ScrollView>

            <ChatInput
              value={inputText}
              onChangeText={setInputText}
              onSend={handleSend}
              isListening={isListening}
              onVoicePress={handleVoicePress}
            />
          </View>

          {/* Right Info Panel (Desktop Only) */}
          {isDesktop && (
            <View style={{ flex: 3 }}>
              <AIInfoPanel />
            </View>
          )}

        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081223',
  },
  keyboardView: {
    flex: 1,
  },
  mainSplit: {
    flex: 1,
    flexDirection: 'row',
  },
  mobileLayout: {
    flexDirection: 'column',
  },
  chatPanel: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  messagesContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  suggestionsWrapper: {
    paddingVertical: 12,
  },
  suggestionsContainer: {
    paddingHorizontal: 8,
    gap: 16,
  },
});
