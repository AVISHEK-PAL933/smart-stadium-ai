import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

interface AIWelcomeCardProps {
  onSuggestionPress?: (text: string) => void;
}

export const AIWelcomeCard = ({ onSuggestionPress }: AIWelcomeCardProps) => {
  const float = useSharedValue(0);

  React.useEffect(() => {
    float.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1500 }),
        withTiming(0, { duration: 1500 })
      ),
      -1,
      true
    );
  }, [float]);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }],
  }));

  return (
    <Animated.View entering={FadeInDown.duration(600)} style={styles.wrapper}>
      <View style={styles.card}>
        <LinearGradient 
          colors={['#16213E', '#0F172A']} 
          style={StyleSheet.absoluteFillObject} 
          start={{x:0, y:0}} 
          end={{x:1, y:1}} 
        />
        <View style={styles.headerRow}>
          <View style={styles.avatarBox}>
            <MaterialCommunityIcons name="robot-outline" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>StadiumMind AI</Text>
            <Text style={styles.subtitle}>Hello!</Text>
          </View>
        </View>
        
        <Text style={styles.desc}>
          Your AI companion for navigation, tickets, food, parking and live match updates.
        </Text>

        <View style={styles.featureGrid}>
          {['Navigation', 'Tickets', 'Live Match', 'Support'].map((item) => (
            <TouchableOpacity 
              key={item} 
              style={styles.feature}
              onPress={() => onSuggestionPress?.(item)}
              activeOpacity={0.7}
            >
              <Text style={styles.featureText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 8,
  },
  card: {
    padding: 16,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    maxWidth: '85%',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  avatarBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 14,
    color: '#CBD5E1',
    fontFamily: 'Inter',
  },
  desc: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
    marginBottom: 12,
    marginTop: 12,
    fontFamily: 'Inter',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  feature: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
});
