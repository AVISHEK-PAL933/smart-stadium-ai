import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { Theme } from '../../constants/theme';
import { StadiumMap } from '../../components/StadiumMap';
import { DestinationCard } from '../../components/DestinationCard';
import { NavigationFAB } from '../../components/NavigationFAB';
import { useNavigation } from '../../hooks/useNavigation';
import { useLocalSearchParams } from 'expo-router';

export default function Navigation() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  // Check if a destination was passed from another screen (like Ticket / AI assistant)
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

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stadium Interactive Map View */}
        <StadiumMap currentRoute={currentRoute} selectedDestinationId={selectedDestinationId} />

        {/* Quick Destination Select Options */}
        {!currentRoute && (
          <NavigationFAB
            destinations={destinations}
            onSelectDestination={handleSelectDestination}
            activeId={selectedDestinationId}
          />
        )}

        {/* Active Route Progress Details */}
        {currentRoute && (
          <View style={styles.detailsWrapper}>
            <DestinationCard
              currentRoute={currentRoute}
              activeStep={activeStep}
              onNextStep={nextStep}
              onCancel={endNavigation}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  detailsWrapper: {
    paddingHorizontal: Theme.spacing.l,
    marginTop: Theme.spacing.s,
  },
});
