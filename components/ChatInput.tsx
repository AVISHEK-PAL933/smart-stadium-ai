import React, { useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  FadeInUp,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

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

  const handlePlusAction = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        if (Platform.OS === 'web') {
          window.alert('Document attached successfully.');
        } else {
          Alert.alert('Success', 'Document attached successfully.');
        }
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert('Error picking document.');
      } else {
        Alert.alert('Error', 'Failed to pick document.');
      }
    }
  };

  const handleImageAction = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        if (Platform.OS === 'web') {
          window.alert('Image uploaded successfully.');
        } else {
          Alert.alert('Success', 'Image uploaded successfully.');
        }
      }
    } catch (error) {
      if (Platform.OS === 'web') {
        window.alert('Error picking image.');
      } else {
        Alert.alert('Error', 'Failed to pick image.');
      }
    }
  };

  return (
    <Animated.View entering={FadeInUp.delay(500)} style={styles.container}>
      <View style={styles.inputCard}>
        <View style={styles.actionsLeft}>
          <TouchableOpacity onPress={handlePlusAction} style={styles.iconBtn}>
            <MaterialCommunityIcons name="plus-circle-outline" size={24} color="#CBD5E1" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleImageAction} style={styles.iconBtn}>
            <MaterialCommunityIcons name="image-outline" size={24} color="#CBD5E1" />
          </TouchableOpacity>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Ask StadiumMind AI..."
          placeholderTextColor="#CBD5E1"
          value={value}
          onChangeText={onChangeText}
          multiline={false}
          onSubmitEditing={onSend}
          blurOnSubmit={false}
          returnKeyType="send"
          maxLength={250}
        />

        <View style={styles.actionsRight}>
          {value.trim().length === 0 ? (
            <TouchableOpacity activeOpacity={0.8} onPress={onVoicePress}>
              <Animated.View style={[styles.voiceBtn, isListening && styles.voiceBtnActive, voiceAnimatedStyle]}>
                <MaterialCommunityIcons 
                  name={isListening ? "microphone" : "microphone-outline"} 
                  size={20} 
                  color={isListening ? "#FFF" : "#00C8FF"} 
                />
              </Animated.View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
              <MaterialCommunityIcons name="arrow-up" size={20} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
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
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: '#16213E',
    overflow: 'hidden',
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
    color: '#FFF',
    fontSize: 15,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: 'Inter',
  },
  actionsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 4,
  },
  voiceBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,200,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceBtnActive: {
    backgroundColor: '#7C4DFF',
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00C8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
