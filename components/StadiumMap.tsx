import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../constants/colors';
import { useColorScheme } from 'react-native';
import { Marker } from './Marker';
import { RouteOverlay } from './RouteOverlay';
import { Theme } from '../constants/theme';
import {
  NavigationRoute,
  CURRENT_LOCATION,
  STADIUM_DESTINATIONS,
} from '../services/navigationService';
import Svg, { Rect, Circle, Line, Path, Defs, RadialGradient, Stop } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface StadiumMapProps {
  currentRoute: NavigationRoute | null;
  selectedDestinationId: string | null;
}

export const StadiumMap = ({ currentRoute, selectedDestinationId }: StadiumMapProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const [mapWidth, setMapWidth] = useState(320);
  const [mapHeight, setMapHeight] = useState(600);

  const FloatingButton = ({ icon, onPress }: any) => (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} color="#FFF" />
    </TouchableOpacity>
  );

  return (
    <View
      style={styles.mapContainer}
      onLayout={(e) => {
        setMapWidth(e.nativeEvent.layout.width);
        setMapHeight(e.nativeEvent.layout.height);
      }}>
      
      <Svg width={mapWidth} height={mapHeight} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="glow" cx="50%" cy="50%" rx="50%" ry="50%" fx="50%" fy="50%">
            <Stop offset="0%" stopColor="#00C8FF" stopOpacity="0.2" />
            <Stop offset="100%" stopColor="#081223" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Ambient Center Glow */}
        <Circle cx={mapWidth / 2} cy={mapHeight / 2} r="200" fill="url(#glow)" />

        {/* Outer stadium outline */}
        <Circle
          cx={mapWidth / 2}
          cy={mapHeight / 2}
          r="180"
          fill="rgba(15, 23, 42, 0.4)"
          stroke="#00C8FF"
          strokeWidth="2"
          opacity={0.3}
        />
        <Circle
          cx={mapWidth / 2}
          cy={mapHeight / 2}
          r="150"
          fill="none"
          stroke="#5B6CFF"
          strokeWidth="1"
          opacity={0.4}
          strokeDasharray="4,6"
        />

        {/* Football pitch in the center */}
        <Rect
          x={mapWidth / 2 - 40}
          y={mapHeight / 2 - 60}
          width="80"
          height="120"
          fill="#1E293B"
          stroke="#00C8FF"
          strokeWidth="1.5"
          rx="4"
        />
        <Line x1={mapWidth / 2 - 40} y1={mapHeight / 2} x2={mapWidth / 2 + 40} y2={mapHeight / 2} stroke="#00C8FF" strokeWidth="1.5" opacity={0.6} />
        <Circle cx={mapWidth / 2} cy={mapHeight / 2} r="15" fill="none" stroke="#00C8FF" strokeWidth="1.5" opacity={0.6} />
      </Svg>

      {/* Path Overlay line if navigating */}
      {currentRoute && (
        <RouteOverlay path={currentRoute.path} width={mapWidth} height={mapHeight} />
      )}

      {/* Default Destinations markers */}
      {STADIUM_DESTINATIONS.map((dest) => {
        const isActiveDestination =
          currentRoute?.destination.id === dest.id || selectedDestinationId === dest.id;
        
        // Translate old fixed coordinates to new dynamic center
        const mappedX = dest.coordinates.x - 160 + mapWidth / 2;
        const mappedY = dest.coordinates.y - 180 + mapHeight / 2;

        return (
          <Marker
            key={dest.id}
            x={mappedX}
            y={mappedY}
            icon={dest.icon}
            isPulsing={isActiveDestination}
            color={isActiveDestination ? '#00C8FF' : '#475569'}
          />
        );
      })}

      {/* Current Location Marker */}
      <Marker
        x={CURRENT_LOCATION.x - 160 + mapWidth / 2}
        y={CURRENT_LOCATION.y - 180 + mapHeight / 2}
        icon="account-navigation"
        isPulsing={true}
        color="#00E676"
      />

      {/* Floating Map Controls */}
      <Animated.View entering={FadeInUp.delay(400)} style={styles.floatingControls}>
        <FloatingButton icon="compass-outline" />
        <FloatingButton icon="cube-outline" />
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomBtn}><MaterialCommunityIcons name="plus" size={24} color="#FFF" /></TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.zoomBtn}><MaterialCommunityIcons name="minus" size={24} color="#FFF" /></TouchableOpacity>
        </View>
        <FloatingButton icon="crosshairs-gps" />
        <TouchableOpacity style={styles.emergencyFab}>
          <MaterialCommunityIcons name="alert" size={24} color="#FFF" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#081223',
  },
  floatingControls: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    gap: 12,
    alignItems: 'center',
    zIndex: 50,
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(15,23,42,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  emergencyFab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF1744',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF1744',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    marginTop: 8,
  },
  zoomControls: {
    backgroundColor: 'rgba(15,23,42,0.85)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  zoomBtn: {
    padding: 12,
  },
  divider: {
    height: 1,
    width: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  }
});
