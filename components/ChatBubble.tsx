import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeInLeft } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface ChatBubbleProps {
  text: string;
  isBot: boolean;
  actionType?: string;
  actionPayload?: any;
  onActionPress?: (actionType: string, actionPayload?: any) => void;
}

export const ChatBubble = ({ text, isBot, actionType, actionPayload, onActionPress }: ChatBubbleProps) => {
  const getActionIcon = () => {
    switch (actionType) {
      case 'NAVIGATE': return 'navigation-variant';
      case 'TICKET': return 'ticket';
      case 'FOOD': return 'food';
      case 'PARKING': return 'parking';
      case 'SOS': return 'alert';
      case 'LOST_FOUND': return 'magnify';
      case 'FAN_ZONE': return 'account-group';
      case 'MERCH': return 'shopping';
      default: return 'arrow-right';
    }
  };

  if (!isBot) {
    return (
      <Animated.View entering={FadeInRight.duration(400)} style={styles.userContainer}>
        <View style={styles.userBubble}>
          <Text style={styles.userText}>{text}</Text>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeInLeft.duration(400)} style={styles.botContainer}>
      <View style={styles.botAvatar}>
        <MaterialCommunityIcons name="robot-outline" size={20} color="#00C8FF" />
      </View>
      
      <View style={styles.botBubbleWrapper}>
        <LinearGradient
          colors={['rgba(124,77,255,0.2)', 'rgba(0,200,255,0.05)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.botBubble}
        >
          <Text style={styles.botText}>{text}</Text>
          
          {actionType && onActionPress && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.actionBtn}
              onPress={() => onActionPress(actionType, actionPayload)}
            >
              <Text style={styles.actionBtnText}>Take Action</Text>
              <MaterialCommunityIcons name={getActionIcon()} size={16} color="#FFF" />
            </TouchableOpacity>
          )}
        </LinearGradient>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    alignSelf: 'flex-end',
    maxWidth: '80%',
    marginVertical: 6,
  },
  userBubble: {
    backgroundColor: '#00C8FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 4,
  },
  userText: {
    color: '#081223',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  botContainer: {
    alignSelf: 'flex-start',
    maxWidth: '85%',
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(15,23,42,0.8)',
    borderWidth: 1,
    borderColor: '#00C8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  botBubbleWrapper: {
    flex: 1,
  },
  botBubble: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(124,77,255,0.3)',
  },
  botText: {
    color: '#FFF',
    fontSize: 15,
    lineHeight: 24,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    marginTop: 2,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
