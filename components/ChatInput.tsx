import React, { useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  FadeInUp,
} from 'react-native-reanimated';
import { GlassCard } from './GlassCard';

interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isListening: boolean;
  onVoicePress: () => void;
}

export const ChatInput = ({
  value,
  onChangeText,
  onSend,
  isListening,
  onVoicePress,
}: ChatInputProps) => {
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (isListening) {
      pulse.value = withRepeat(
        withSequence(withTiming(1.3, { duration: 600 }), withTiming(1, { duration: 600 })),
        -1,
        true
      );
    } else {
      pulse.value = withTiming(1);
    }
  }, [isListening, pulse]);

  const voiceAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    shadowColor: isListening ? '#7C4DFF' : 'transparent',
    shadowOpacity: isListening ? 0.8 : 0,
    shadowRadius: isListening ? 10 : 0,
    shadowOffset: { width: 0, height: 0 },
  }));

  const handleMockAction = () => {
    // Just a UI mock action, we don't have APIs for this yet as per implementation plan
  };

  return (
    <Animated.View entering={FadeInUp.delay(500)} style={styles.container}>
      <GlassCard style={styles.inputCard} gradientColors={['rgba(8,18,35,0.95)', 'rgba(15,23,42,0.9)']}>
        <View style={styles.actionsLeft}>
          <TouchableOpacity onPress={handleMockAction} style={styles.iconBtn}>
            <MaterialCommunityIcons name="plus-circle-outline" size={24} color="rgba(255,255,255,0.5)" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMockAction} style={styles.iconBtn}>
            <MaterialCommunityIcons name="image-outline" size={24} color="rgba(255,255,255,0.5)" />
          </TouchableOpacity>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Ask anything about the stadium..."
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={value}
          onChangeText={onChangeText}
          multiline
          maxLength={250}
        />

        <View style={styles.actionsRight}>
          {value.trim().length === 0 ? (
            <TouchableOpacity activeOpacity={0.8} onPress={onVoicePress}>
              <Animated.View style={[styles.voiceBtn, isListening && styles.voiceBtnActive, voiceAnimatedStyle]}>
                <MaterialCommunityIcons 
                  name={isListening ? "microphone" : "microphone-outline"} 
                  size={24} 
                  color={isListening ? "#FFF" : "#00C8FF"} 
                />
              </Animated.View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
              <MaterialCommunityIcons name="arrow-up" size={22} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
      </GlassCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(124,77,255,0.3)',
    shadowColor: '#00C8FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  actionsLeft: {
    flexDirection: 'row',
    gap: 4,
    marginLeft: 4,
  },
  iconBtn: {
    padding: 8,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    color: '#FFF',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  actionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
  voiceBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,200,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceBtnActive: {
    backgroundColor: '#7C4DFF',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00C8FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00C8FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});
