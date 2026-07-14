import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { useColorScheme } from 'react-native';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

const QUICK_QUERIES = [
  'What is current crowd density?',
  'Show me open incidents',
  'Revenue summary today',
  'Staff on duty now',
  'Parking availability',
  'Any alerts I should know?',
];

const AI_RESPONSES: Record<string, string> = {
  'What is current crowd density?':
    '📊 Current crowd density: **78,450 fans** across all zones.\n\n⚠️ **East Wing** is at critical capacity (99%). I recommend deploying 20 additional staff to Gate 3 and opening overflow areas. North and West Stands are within safe limits.',
  'Show me open incidents':
    '🚨 There are **3 active incidents:**\n\n1. **INC-001** — Medical Emergency, Section C7 (Assigned to Dr. Park)\n2. **INC-002** — Crowd Crush Risk, East Wing Gate 3 (**Unassigned** ⚠️)\n3. **INC-003** — Fan Altercation, North Stand (Assigned to Security Team 4)\n\nWould you like me to auto-assign a team to INC-002?',
  'Revenue summary today':
    "💰 **Today's Revenue Summary:**\n\n• Total: **$2.41M** (+8.3% vs last match)\n• Ticketing: $1.8M\n• Food & Beverage: $480K\n• Parking: $124K\n• Merchandise: $6K\n\n📈 On track to exceed match target by $180K.",
  'Staff on duty now':
    '👮 **Staff Overview:**\n\n• Total on duty: **1,240** staff\n• Security: 420\n• Medical: 85\n• F&B: 380\n• Cleaning: 220\n• Ticketing: 135\n\n⚡ 3 staff currently dispatched to incidents.',
  'Parking availability':
    '🅿️ **Parking Status:**\n\n• Zone A (North): 80 spaces free ⚠️ Almost Full\n• Zone B (South): 520 spaces free ✅\n• Zone C (East): **5 spaces free** 🔴 FULL\n• Zone D (VIP): 10 spaces free ⚠️\n• Zone E (Staff): 60 spaces free ✅\n\nRecommendation: Redirect Zone C overflow to Zone B via alternate signage.',
  'Any alerts I should know?':
    '🔔 **Priority Alerts:**\n\n1. 🔴 East Wing crowd at 99% capacity — immediate action needed\n2. 🟡 Taco Station food stock below 30%\n3. 🟡 Gate 3 queue > 60 vehicles\n4. 🔴 INC-002 (Crowd Crush Risk) is unassigned\n5. 🟡 Rain forecast at 17:30 — prepare covered routes\n\nWould you like me to generate an action plan?',
};

const DEFAULT_RESPONSE =
  "🤖 I'm processing your request. Based on real-time stadium data, here is what I found:\n\nAll systems are currently operational. Crowd flow is within parameters for most zones with the exception of East Wing. Would you like a detailed breakdown of any specific area?";

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'init',
    role: 'assistant',
    text: "👋 Hello! I'm your **AI Operations Assistant**. I have real-time access to all stadium systems — crowd data, incidents, revenue, staff, parking, and more.\n\nHow can I help you manage today's event?",
    time: 'Now',
  },
];

export default function AIOperationsAssistant() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, time: 'Now' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiText = AI_RESPONSES[text] ?? DEFAULT_RESPONSE;
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: aiText,
        time: 'Now',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 1200);
  };

  const renderText = (text: string, color: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <Text key={i} style={[styles.msgLine, { color }]}>
          {parts.map((part, pi) =>
            pi % 2 === 1 ? (
              <Text key={pi} style={{ fontWeight: '900', color }}>
                {part}
              </Text>
            ) : (
              part
            )
          )}
          {i < text.split('\n').length - 1 ? '\n' : ''}
        </Text>
      );
    });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['rgba(0,200,255,0.15)', 'transparent']} style={styles.bgGrad} />

      {/* Header */}
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <View style={[styles.aiAvatar, { backgroundColor: '#00C8FF22', borderColor: '#00C8FF44' }]}>
          <MaterialCommunityIcons name="robot-excited" size={24} color="#00C8FF" />
        </View>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>AI Ops Assistant</Text>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online · All systems connected</Text>
          </View>
        </View>
        <View
          style={[styles.modelBadge, { backgroundColor: '#AB47BC22', borderColor: '#AB47BC44' }]}>
          <Text style={[styles.modelText, { color: '#AB47BC' }]}>AI</Text>
        </View>
      </Animated.View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
        {messages.map((msg, i) => (
          <Animated.View
            key={msg.id}
            entering={FadeInUp.delay(i === 0 ? 200 : 0)}
            style={[styles.msgRow, msg.role === 'user' ? styles.msgRowUser : styles.msgRowAI]}>
            {msg.role === 'assistant' && (
              <View style={[styles.aiBubbleAvatar, { backgroundColor: '#00C8FF22' }]}>
                <MaterialCommunityIcons name="robot-excited" size={16} color="#00C8FF" />
              </View>
            )}
            <View
              style={[
                styles.bubble,
                msg.role === 'user'
                  ? { backgroundColor: '#00C8FF', borderRadius: 18, borderBottomRightRadius: 4 }
                  : {
                      backgroundColor: themeColors.card,
                      borderColor: themeColors.border,
                      borderWidth: 1,
                      borderRadius: 18,
                      borderBottomLeftRadius: 4,
                    },
              ]}>
              {renderText(msg.text, msg.role === 'user' ? '#000' : themeColors.text)}
            </View>
          </Animated.View>
        ))}

        {isTyping && (
          <View style={styles.typingRow}>
            <View style={[styles.aiBubbleAvatar, { backgroundColor: '#00C8FF22' }]}>
              <MaterialCommunityIcons name="robot-excited" size={16} color="#00C8FF" />
            </View>
            <View
              style={[
                styles.typingBubble,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}>
              <Text style={[styles.typingDots, { color: themeColors.icon }]}>●●●</Text>
            </View>
          </View>
        )}

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Quick Queries */}
      <Animated.View entering={FadeInDown.delay(300)} style={styles.quickQueries}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickContent}>
          {QUICK_QUERIES.map((q) => (
            <TouchableOpacity
              key={q}
              onPress={() => sendMessage(q)}
              style={[
                styles.quickChip,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}>
              <Text style={[styles.quickText, { color: themeColors.text }]}>{q}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Input */}
      <View
        style={[
          styles.inputRow,
          { backgroundColor: themeColors.card, borderColor: themeColors.border },
        ]}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask about crowd, incidents, revenue..."
          placeholderTextColor={themeColors.icon}
          style={[styles.input, { color: themeColors.text }]}
          multiline
          returnKeyType="send"
          onSubmitEditing={() => sendMessage(input)}
        />
        <TouchableOpacity
          onPress={() => sendMessage(input)}
          disabled={!input.trim()}
          style={[
            styles.sendBtn,
            { backgroundColor: input.trim() ? '#00C8FF' : `${themeColors.border}` },
          ]}>
          <MaterialCommunityIcons
            name="send"
            size={18}
            color={input.trim() ? '#000' : themeColors.icon}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 200 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.l,
    paddingTop: 56,
    paddingBottom: Theme.spacing.m,
    gap: Theme.spacing.m,
  },
  backBtn: { padding: 4 },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: { flex: 1 },
  headerTitle: { fontSize: Theme.typography.sizes.m, fontWeight: '900' },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  onlineDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#00E676' },
  onlineText: { fontSize: 11, color: '#00E676', fontWeight: '600' },
  modelBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1 },
  modelText: { fontSize: 11, fontWeight: '900' },
  messagesContent: { paddingHorizontal: Theme.spacing.l, paddingTop: Theme.spacing.m },
  msgRow: { marginBottom: Theme.spacing.m, maxWidth: '85%' },
  msgRowAI: { flexDirection: 'row', alignSelf: 'flex-start', gap: 8, alignItems: 'flex-end' },
  msgRowUser: { alignSelf: 'flex-end' },
  aiBubbleAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: { padding: Theme.spacing.m, maxWidth: '100%' },
  msgLine: { fontSize: Theme.typography.sizes.s, lineHeight: 20 },
  typingRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: Theme.spacing.m,
    paddingHorizontal: Theme.spacing.l,
  },
  typingBubble: {
    padding: Theme.spacing.m,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  typingDots: { fontSize: 18, letterSpacing: 4 },
  quickQueries: { paddingVertical: 10 },
  quickContent: { paddingHorizontal: Theme.spacing.l, gap: 8 },
  quickChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  quickText: { fontSize: 12, fontWeight: '600' },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Theme.spacing.m,
    paddingVertical: Theme.spacing.s,
    borderTopWidth: 1,
    gap: 10,
    paddingBottom: 24,
  },
  input: { flex: 1, fontSize: Theme.typography.sizes.s, maxHeight: 100, paddingVertical: 8 },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
