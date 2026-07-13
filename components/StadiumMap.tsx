import React from 'react';
import { View, StyleSheet } from 'react-native';
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
import Svg, { Rect, Circle, Line } from 'react-native-svg';

interface StadiumMapProps {
  currentRoute: NavigationRoute | null;
  selectedDestinationId: string | null;
}

export const StadiumMap = ({ currentRoute, selectedDestinationId }: StadiumMapProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const mapWidth = 320;
  const mapHeight = 360;

  return (
    <View
      style={[
        styles.mapContainer,
        { backgroundColor: themeColors.card, borderColor: themeColors.border },
      ]}>
      {/* Stadium Layout SVG Grid Background */}
      <Svg width={mapWidth} height={mapHeight} style={StyleSheet.absoluteFill}>
        {/* Outer stadium outline */}
        <Circle
          cx={mapWidth / 2}
          cy={mapHeight / 2}
          r="150"
          fill="none"
          stroke={themeColors.border}
          strokeWidth="6"
          opacity={0.6}
        />
        <Circle
          cx={mapWidth / 2}
          cy={mapHeight / 2}
          r="130"
          fill="none"
          stroke={themeColors.border}
          strokeWidth="2"
          opacity={0.4}
          strokeDasharray="5,5"
        />

        {/* Seating section divisions */}
        <Line
          x1={mapWidth / 2}
          y1={mapHeight / 2 - 150}
          x2={mapWidth / 2}
          y2={mapHeight / 2 + 150}
          stroke={themeColors.border}
          strokeWidth="1"
          opacity={0.3}
        />
        <Line
          x1={mapWidth / 2 - 150}
          y1={mapHeight / 2}
          x2={mapWidth / 2 + 150}
          y2={mapHeight / 2}
          stroke={themeColors.border}
          strokeWidth="1"
          opacity={0.3}
        />

        {/* Football pitch in the center */}
        <Rect
          x={mapWidth / 2 - 50}
          y={mapHeight / 2 - 70}
          width="100"
          height="140"
          fill={theme === 'dark' ? '#0F223D' : '#E0ECF8'}
          stroke={themeColors.border}
          strokeWidth="2"
          rx="6"
        />
        <Line
          x1={mapWidth / 2 - 50}
          y1={mapHeight / 2}
          x2={mapWidth / 2 + 50}
          y2={mapHeight / 2}
          stroke={themeColors.border}
          strokeWidth="2"
        />
        <Circle
          cx={mapWidth / 2}
          cy={mapHeight / 2}
          r="25"
          fill="none"
          stroke={themeColors.border}
          strokeWidth="2"
        />
      </Svg>

      {/* Path Overlay line if navigating */}
      {currentRoute && (
        <RouteOverlay path={currentRoute.path} width={mapWidth} height={mapHeight} />
      )}

      {/* Default Destinations markers */}
      {STADIUM_DESTINATIONS.map((dest) => {
        const isActiveDestination =
          currentRoute?.destination.id === dest.id || selectedDestinationId === dest.id;
        return (
          <Marker
            key={dest.id}
            x={dest.coordinates.x}
            y={dest.coordinates.y}
            icon={dest.icon}
            isPulsing={isActiveDestination}
            color={isActiveDestination ? themeColors.tint : '#90A4AE'}
          />
        );
      })}

      {/* Current Location Marker */}
      <Marker
        x={CURRENT_LOCATION.x}
        y={CURRENT_LOCATION.y}
        icon="account-navigation"
        isPulsing={true}
        color="#00E676"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 360,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: Theme.spacing.m,
  },
});
