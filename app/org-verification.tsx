import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, useSharedValue, useAnimatedStyle, withSequence, withTiming, withRepeat } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, db, setDoc, doc } from '../services/firebase';
import { useGlobalContext } from '../context/GlobalProvider';
import { AppConfig } from '../constants/config';

export default function OrgVerificationScreen() {
  const { setRole } = useGlobalContext();
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const shakeOffset = useSharedValue(0);

  const shakeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeOffset.value }]
    };
  });

  const triggerShake = () => {
    shakeOffset.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withRepeat(withTiming(10, { duration: 100 }), 3, true),
      withTiming(0, { duration: 50 })
    );
  };

  const handleVerify = async () => {
    setErrorMsg('');
    if (!code) {
      setErrorMsg('Please enter the access code');
      triggerShake();
      return;
    }

    setIsLoading(true);
    
    // Simulate network delay for verification
    await new Promise(r => setTimeout(r, 800));

    if (code === AppConfig.ADMIN_ACCESS_CODE) {
      try {
        if (auth.currentUser) {
          await setDoc(doc(db, 'users', auth.currentUser.uid), { role: 'admin' }, { merge: true });
        }
        setRole('admin');
        router.replace('/(ops)');
      } catch (e: any) {
        setErrorMsg(e.message || 'Verification failed');
        triggerShake();
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setErrorMsg('Invalid Organization Access Code');
      triggerShake();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LinearGradient
        colors={['#081223', '#0A0F1E', '#16213E']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(800)} style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <MaterialCommunityIcons name="shield-lock" size={48} color="#FFAA00" style={styles.shieldIcon} />
          <Text style={styles.brandTitle}>Organization Verification</Text>
          <Text style={styles.brandSubtitle}>Secure access for staff and management</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(800).delay(200)} style={shakeStyle}>
          <View style={styles.glassCard}>
            
            <Text style={styles.inputLabel}>Enter Organization Access Code</Text>
            
            <View style={[styles.inputContainer, errorMsg ? styles.inputError : null]}>
              <MaterialCommunityIcons name="lock-outline" size={20} color={errorMsg ? '#FF3366' : '#8A99AF'} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Access Code"
                placeholderTextColor="#8A99AF"
                secureTextEntry={!showCode}
                value={code}
                onChangeText={(t) => {
                  setCode(t);
                  setErrorMsg('');
                }}
                autoCapitalize="characters"
              />
              <TouchableOpacity onPress={() => setShowCode(!showCode)} style={styles.eyeIcon}>
                <MaterialCommunityIcons name={showCode ? "eye-off-outline" : "eye-outline"} size={20} color="#8A99AF" />
              </TouchableOpacity>
            </View>

            {errorMsg ? (
              <Animated.Text entering={FadeInUp.duration(300)} style={styles.errorText}>
                {errorMsg}
              </Animated.Text>
            ) : null}

            <View style={styles.row}>
              <TouchableOpacity onPress={() => setErrorMsg('Contact your IT administrator for the access code.')}>
                <Text style={styles.forgotText}>Forgot code?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.8} onPress={handleVerify} disabled={isLoading}>
              <LinearGradient
                colors={['#FFAA00', '#FF8800']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <>
                    <MaterialCommunityIcons name="shield-check" size={20} color="#FFF" />
                    <Text style={styles.primaryButtonText}>Verify & Continue</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081223',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  shieldIcon: {
    marginBottom: 16,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  brandSubtitle: {
    fontSize: 16,
    color: '#8A99AF',
    textAlign: 'center',
  },
  glassCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,170,0,0.2)',
  },
  inputLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputError: {
    borderColor: '#FF3366',
    backgroundColor: 'rgba(255,51,102,0.05)',
  },
  inputIcon: {
    marginRight: 12,
  },
  eyeIcon: {
    padding: 8,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    height: '100%',
    letterSpacing: 2,
  },
  errorText: {
    color: '#FF3366',
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 32,
  },
  forgotText: {
    color: '#FFAA00',
    fontSize: 14,
    fontWeight: '600',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
