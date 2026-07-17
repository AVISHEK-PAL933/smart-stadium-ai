import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const ARSelfieZone = () => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="camera" size={24} color="#b388ff" />
        <Text style={styles.title}>AR Selfie Zone</Text>
      </View>
      <View style={styles.mockCamera}>
        <LinearGradient colors={['rgba(255,255,255,0.1)', 'transparent']} style={StyleSheet.absoluteFillObject} />
        <Ionicons name="scan-outline" size={80} color="rgba(255,255,255,0.2)" />
        <Text style={styles.cameraText}>Point camera at the field to activate AR</Text>
      </View>
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="trophy" size={20} color="#ffd600" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="shirt" size={20} color="#00e5ff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="happy" size={20} color="#00e676" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, styles.captureBtn]}>
          <Ionicons name="aperture" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(20, 10, 30, 0.7)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: Theme.spacing.s,
  },
  mockCamera: {
    height: 180,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: Theme.shapes.borderRadius.m,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.m,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cameraText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    marginTop: 8,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#b388ff',
  },
});
