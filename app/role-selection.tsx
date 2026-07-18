import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGlobalContext } from '../context/GlobalProvider';
import { auth, db, setDoc, doc } from '../services/firebase';

export default function RoleSelectionScreen() {
  const { setRole } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'fan' | 'admin' | null>(null);

  const handleSelectFan = async () => {
    setSelectedRole('fan');
    setIsLoading(true);

    try {
      if (auth.currentUser) {
        await setDoc(doc(db, 'users', auth.currentUser.uid), { role: 'fan' }, { merge: true });
      }
      setRole('fan');
      router.replace('/(tabs)');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAdmin = () => {
    router.push('/org-verification');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#081223', '#0A0F1E', '#16213E']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(800)} style={styles.header}>
          <Text style={styles.brandTitle}>Choose Your Experience</Text>
          <Text style={styles.brandSubtitle}>Select your primary reason for using StadiumMind AI</Text>
        </Animated.View>

        <View style={styles.cardsContainer}>
          {/* Card 1: Fan Experience */}
          <Animated.View entering={FadeInDown.duration(800).delay(200)}>
            <View style={styles.roleCard}>
              <View style={styles.cardHeader}>
                <View style={styles.iconCircleFan}>
                  <MaterialCommunityIcons name="ticket-confirmation" size={32} color="#00C8FF" />
                </View>
                <View style={styles.cardHeaderTexts}>
                  <Text style={styles.roleTitle}>Fan Experience</Text>
                  <Text style={styles.roleDesc}>For visitors attending the FIFA World Cup.</Text>
                </View>
              </View>

              <View style={styles.featuresList}>
                {[
                  'AI Assistant', 'Ticket', 'Navigation', 'Food', 'Parking',
                  'Live Match', 'Translation', 'Accessibility', 'Fan Zone', 'Lost & Found'
                ].map((feature, i) => (
                  <View key={i} style={styles.featureItem}>
                    <MaterialCommunityIcons name="check-circle" size={16} color="#00C8FF" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={handleSelectFan}
                disabled={isLoading}
                style={styles.cardButton}
              >
                <LinearGradient
                  colors={['#00C8FF', '#0072FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  {isLoading && selectedRole === 'fan' ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <>
                      <Text style={styles.buttonText}>Continue as Fan</Text>
                      <MaterialCommunityIcons name="arrow-right" size={20} color="#FFF" />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Card 2: Organization Portal */}
          <Animated.View entering={FadeInDown.duration(800).delay(400)}>
            <View style={[styles.roleCard, { borderColor: 'rgba(255, 170, 0, 0.2)' }]}>
              <View style={styles.cardHeader}>
                <View style={styles.iconCircleAdmin}>
                  <MaterialCommunityIcons name="shield-crown" size={32} color="#FFAA00" />
                </View>
                <View style={styles.cardHeaderTexts}>
                  <Text style={[styles.roleTitle, { color: '#FFAA00' }]}>Organization Portal</Text>
                  <Text style={styles.roleDesc}>For Stadium Management, Security and Operations Team.</Text>
                </View>
              </View>

              <View style={styles.featuresList}>
                {[
                  'Revenue Analytics', 'Ticket Sales', 'Executive Dashboard', 'Crowd Monitoring',
                  'AI Operations', 'Staff Management', 'Incident Management', 'Sustainability',
                  'Parking Analytics', 'Security Center'
                ].map((feature, i) => (
                  <View key={i} style={styles.featureItem}>
                    <MaterialCommunityIcons name="check-circle" size={16} color="#FFAA00" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={handleSelectAdmin}
                style={styles.cardButton}
              >
                <LinearGradient
                  colors={['#FFAA00', '#FF8800']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>Continue as Organization</Text>
                  <MaterialCommunityIcons name="shield-lock" size={20} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081223',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    maxWidth: 700,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: 'center',
  },
  brandSubtitle: {
    fontSize: 16,
    color: '#8A99AF',
    textAlign: 'center',
    lineHeight: 24,
  },
  cardsContainer: {
    gap: 24,
  },
  roleCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 200, 255, 0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircleFan: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0,200,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.3)',
    marginRight: 16,
  },
  iconCircleAdmin: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,170,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,170,0,0.3)',
    marginRight: 16,
  },
  cardHeaderTexts: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00C8FF',
    marginBottom: 4,
  },
  roleDesc: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 16,
    borderRadius: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  featureText: {
    color: '#E2E8F0',
    fontSize: 14,
    marginLeft: 8,
  },
  cardButton: {
    width: '100%',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
