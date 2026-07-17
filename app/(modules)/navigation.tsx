import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions, TextInput, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { Theme } from '../../constants/theme';
import { StadiumMap } from '../../components/StadiumMap';
import { DestinationCard } from '../../components/DestinationCard';
import { NavigationFAB } from '../../components/NavigationFAB';
import { useNavigation } from '../../hooks/useNavigation';
import { useLocalSearchParams } from 'expo-router';
import { GlassCard } from '../../components/GlassCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp, FadeInRight } from 'react-native-reanimated';

export default function Navigation() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];
  const { width } = useWindowDimensions();

  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

  const params = useLocalSearchParams<{ destId?: string }>();
  const { destinations, currentRoute, activeStep, startNavigation, endNavigation, nextStep } =
    useNavigation();

  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);

  useEffect(() => {
    if (params?.destId) {
      setSelectedDestinationId(params.destId);
      startNavigation(params.destId);
    }
  }, [params, startNavigation]);

  const handleSelectDestination = (id: string) => {
    setSelectedDestinationId(id);
    startNavigation(id);
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Indoor Stadium Navigation" />

      <View style={[styles.mainLayout, isDesktop && styles.desktopLayout]}>
        
        {/* Left Map Panel (70% on Desktop, Full on Mobile) */}
        <View style={[styles.mapPanel, isDesktop && { flex: 7 }]}>
          
          {/* Floating Search Bar */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.floatingSearchContainer}>
            <GlassCard style={styles.searchCard}>
              <MaterialCommunityIcons name="magnify" size={24} color="#00C8FF" />
              <TextInput 
                placeholder="Search gate, restroom, parking, food..."
                placeholderTextColor="rgba(255,255,255,0.5)"
                style={styles.searchInput}
              />
              <TouchableOpacity>
                <MaterialCommunityIcons name="microphone" size={24} color="#00C8FF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.qrButton}>
                <MaterialCommunityIcons name="qrcode-scan" size={20} color="#FFF" />
              </TouchableOpacity>
            </GlassCard>
          </Animated.View>

          {/* Live Status Widget */}
          <Animated.View entering={FadeInRight.delay(200)} style={styles.statusWidgetContainer}>
            <GlassCard style={styles.statusWidget}>
              <View style={styles.statusRow}>
                <MaterialCommunityIcons name="crosshairs-gps" size={16} color="#00E676" />
                <Text style={styles.statusText}>Zone A (Level 1)</Text>
              </View>
              <View style={styles.statusRow}>
                <MaterialCommunityIcons name="battery-60" size={16} color="#00C8FF" />
                <Text style={styles.statusText}>60% Battery</Text>
              </View>
              <View style={styles.statusRow}>
                <MaterialCommunityIcons name="account-group" size={16} color="#FF9800" />
                <Text style={styles.statusText}>Moderate Crowd</Text>
              </View>
            </GlassCard>
          </Animated.View>

          <StadiumMap currentRoute={currentRoute} selectedDestinationId={selectedDestinationId} />
        </View>

        {/* Right Info Panel (30% on Desktop) */}
        <View style={[styles.infoPanel, isDesktop && { flex: 3 }, (!isDesktop && currentRoute) && styles.mobileBottomSheet]}>
          <ScrollView contentContainerStyle={styles.infoScroll} showsVerticalScrollIndicator={false}>
            {!currentRoute ? (
              <Animated.View entering={FadeInUp.delay(300)}>
                <NavigationFAB
                  destinations={destinations}
                  onSelectDestination={handleSelectDestination}
                  activeId={selectedDestinationId}
                />
              </Animated.View>
            ) : (
              <Animated.View entering={FadeInUp.delay(100)}>
                <DestinationCard
                  currentRoute={currentRoute}
                  activeStep={activeStep}
                  onNextStep={nextStep}
                  onCancel={endNavigation}
                />
              </Animated.View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainLayout: { flex: 1, flexDirection: 'column' },
  desktopLayout: { flexDirection: 'row' },
  mapPanel: { flex: 1, position: 'relative' },
  infoPanel: { padding: Theme.spacing.m, backgroundColor: 'transparent' },
  mobileBottomSheet: { position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 100 },
  infoScroll: { paddingBottom: 100 },
  floatingSearchContainer: { position: 'absolute', top: 16, left: 16, right: 16, zIndex: 50, maxWidth: 500, alignSelf: 'center' },
  searchCard: { flexDirection: 'row', alignItems: 'center', padding: 8, paddingHorizontal: 16, borderRadius: 30, gap: 12, backgroundColor: 'rgba(8,18,35,0.85)' },
  searchInput: { flex: 1, color: '#FFF', fontSize: 16, height: 40 },
  qrButton: { backgroundColor: '#7C4DFF', padding: 8, borderRadius: 20 },
  statusWidgetContainer: { position: 'absolute', top: 80, right: 16, zIndex: 40 },
  statusWidget: { padding: 12, gap: 8, backgroundColor: 'rgba(15,23,42,0.85)' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
});
