import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/theme';
import { CameraFeed } from '../../data/crowdSafetyData';

interface Props {
  camera: CameraFeed;
}

const DETECTION_CONFIG: Record<CameraFeed['detection'], { color: string; icon: string }> = {
  'Normal':        { color: '#00E676', icon: 'check-circle'       },
  'Crowd Build-up':{ color: '#FFC107', icon: 'account-group'      },
  'Fight Detected':{ color: '#FF5252', icon: 'account-alert'      },
  'Suspicious Bag':{ color: '#FF7043', icon: 'bag-personal-off'   },
  'Camera Offline':{ color: '#8F9BB3', icon: 'camera-off'         },
};

export const CameraCard: React.FC<Props> = ({ camera }) => {
  const cfg = DETECTION_CONFIG[camera.detection];
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (camera.status === 'online' && camera.detection !== 'Normal') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, { toValue: 0.3, duration: 600, useNativeDriver: true }),
          Animated.timing(blinkAnim, { toValue: 1,   duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      blinkAnim.setValue(1);
    }
  }, [camera.detection, camera.status, blinkAnim]);

  return (
    <View style={[styles.card, { borderColor: cfg.color + '40' }]}>
      {/* Simulated camera view */}
      <View style={styles.cameraScreen}>
        {camera.status === 'offline' ? (
          <MaterialCommunityIcons name="camera-off" size={28} color="#8F9BB3" />
        ) : (
          <>
            {/* Scanline effect */}
            <View style={styles.scanlines} />
            <MaterialCommunityIcons name="video-outline" size={20} color="rgba(0,200,255,0.4)" style={styles.camIcon} />
            {/* Detection overlay */}
            {camera.detection !== 'Normal' && (
              <Animated.View style={[styles.detectionBox, { borderColor: cfg.color, opacity: blinkAnim }]}>
                <Text style={[styles.detectionBoxText, { color: cfg.color }]}>AI DETECT</Text>
              </Animated.View>
            )}
          </>
        )}
        {/* Recording dot */}
        {camera.status === 'online' && (
          <Animated.View style={[styles.recDot, { opacity: blinkAnim }]} />
        )}
      </View>

      {/* Camera info */}
      <View style={styles.infoBlock}>
        <Text style={styles.cameraId}>{camera.id}</Text>
        <Text style={styles.cameraLocation} numberOfLines={1}>{camera.location}</Text>
      </View>

      {/* Detection badge */}
      <View style={[styles.detectionBadge, { backgroundColor: cfg.color + '1A' }]}>
        <MaterialCommunityIcons name={cfg.icon as any} size={11} color={cfg.color} />
        <Text style={[styles.detectionText, { color: cfg.color }]}>{camera.detection}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(8, 18, 35, 0.9)',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    overflow: 'hidden',
    gap: 6,
    padding: 10,
  },
  cameraScreen: {
    height: 90,
    backgroundColor: '#040D1A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  scanlines: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.04,
    backgroundColor: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)',
  },
  camIcon: { position: 'absolute', bottom: 8, right: 8 },
  detectionBox: {
    position: 'absolute',
    top: 14, left: 14, right: 14, bottom: 14,
    borderWidth: 1.5,
    borderRadius: 6,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 3,
  },
  detectionBoxText: { fontSize: 7, fontWeight: '900', letterSpacing: 0.5 },
  recDot: {
    position: 'absolute',
    top: 8, right: 8,
    width: 7, height: 7,
    borderRadius: 4,
    backgroundColor: '#FF5252',
  },
  infoBlock: { gap: 2 },
  cameraId: { color: '#00C8FF', fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  cameraLocation: { color: 'rgba(255,255,255,0.55)', fontSize: 9, fontWeight: '600' },
  detectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  detectionText: { fontSize: 9, fontWeight: '800' },
});
