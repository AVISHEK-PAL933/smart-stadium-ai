import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Platform } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface ChatBubbleProps {
  text: string;
  isBot: boolean;
  onActionPress?: (actionType: string, actionPayload?: any) => void;
  actionType?: string;
  actionPayload?: any;
}

export const ChatBubble = ({
  text,
  isBot,
  onActionPress,
  actionType,
  actionPayload,
}: ChatBubbleProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const copyToClipboard = () => {
    Clipboard.setString(text);
  };

  return (
    <Animated.View
      entering={FadeInUp.duration(300)}
      style={[styles.bubbleContainer, isBot ? styles.botAlign : styles.userAlign]}>
      <View
        style={[
          styles.bubble,
          isBot
            ? [
                styles.botBubble,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]
            : [
                styles.userBubble,
                { backgroundColor: themeColors.tint, borderColor: themeColors.tint },
              ],
        ]}>
        <Text style={[styles.text, { color: isBot ? themeColors.text : '#FFFFFF' }]}>{text}</Text>

        <View style={styles.bubbleFooter}>
          <Text
            style={[styles.time, { color: isBot ? themeColors.icon : 'rgba(255,255,255,0.7)' }]}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          <TouchableOpacity onPress={copyToClipboard} style={styles.copyBtn}>
            <MaterialCommunityIcons
              name="content-copy"
              size={14}
              color={isBot ? themeColors.icon : 'rgba(255,255,255,0.7)'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isBot && actionType && onActionPress && (
        <TouchableOpacity
          onPress={() => onActionPress(actionType, actionPayload)}
          style={[
            styles.actionBtn,
            { backgroundColor: themeColors.tint + '15', borderColor: themeColors.tint },
          ]}>
          <MaterialCommunityIcons name="open-in-new" size={16} color={themeColors.tint} />
          <Text style={[styles.actionBtnText, { color: themeColors.tint }]}>
            Go to {actionType === 'NAVIGATE' ? 'Map' : actionType}
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    marginVertical: Theme.spacing.s,
    maxWidth: '85%',
    gap: 6,
  },
  botAlign: {
    alignSelf: 'flex-start',
  },
  userAlign: {
    alignSelf: 'flex-end',
  },
  bubble: {
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.l,
    borderWidth: 1,
  },
  botBubble: {
    borderTopLeftRadius: 4,
  },
  userBubble: {
    borderTopRightRadius: 4,
  },
  text: {
    fontSize: Theme.typography.sizes.m,
    lineHeight: 20,
  },
  bubbleFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 6,
    gap: Theme.spacing.s,
  },
  time: {
    fontSize: Theme.typography.sizes.s - 2,
  },
  copyBtn: {
    padding: 2,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: Theme.spacing.m,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    marginTop: 2,
  },
  actionBtnText: {
    fontSize: Theme.typography.sizes.s,
    fontWeight: 'bold',
  },
});
