import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const PhotoGallery = () => {
  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="images" size={24} color="#b388ff" />
        <Text style={styles.title}>Fan Photo Gallery</Text>
      </View>
      <View style={styles.grid}>
        <View style={styles.col}>
          <View style={[styles.photoCard, { height: 120 }]}>
            <LinearGradient colors={['rgba(255,255,255,0.1)', 'transparent']} style={StyleSheet.absoluteFillObject} />
            <Ionicons name="image-outline" size={32} color="rgba(255,255,255,0.3)" />
          </View>
          <View style={[styles.photoCard, { height: 160 }]}>
            <LinearGradient colors={['rgba(255,255,255,0.1)', 'transparent']} style={StyleSheet.absoluteFillObject} />
            <Ionicons name="image-outline" size={32} color="rgba(255,255,255,0.3)" />
          </View>
        </View>
        <View style={styles.col}>
          <View style={[styles.photoCard, { height: 160 }]}>
            <LinearGradient colors={['rgba(255,255,255,0.1)', 'transparent']} style={StyleSheet.absoluteFillObject} />
            <Ionicons name="image-outline" size={32} color="rgba(255,255,255,0.3)" />
          </View>
          <View style={[styles.photoCard, { height: 120 }]}>
            <LinearGradient colors={['rgba(255,255,255,0.1)', 'transparent']} style={StyleSheet.absoluteFillObject} />
            <Ionicons name="image-outline" size={32} color="rgba(255,255,255,0.3)" />
          </View>
        </View>
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
  grid: {
    flexDirection: 'row',
    gap: Theme.spacing.m,
  },
  col: {
    flex: 1,
    gap: Theme.spacing.m,
  },
  photoCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: Theme.shapes.borderRadius.m,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
