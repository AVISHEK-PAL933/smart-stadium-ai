import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const zones = [
  { id: 'north', name: 'North Stand', status: 'Red', visitors: '15,200', capacity: '98%', temp: '24°C', risk: 'High', top: '10%', left: '30%', width: '40%', height: '20%' },
  { id: 'south', name: 'South Stand', status: 'Green', visitors: '10,100', capacity: '65%', temp: '22°C', risk: 'Low', top: '70%', left: '30%', width: '40%', height: '20%' },
  { id: 'east', name: 'East Stand', status: 'Yellow', visitors: '14,000', capacity: '85%', temp: '23°C', risk: 'Medium', top: '30%', left: '70%', width: '20%', height: '40%' },
  { id: 'west', name: 'West Stand (VIP)', status: 'Green', visitors: '4,500', capacity: '45%', temp: '21°C', risk: 'Low', top: '30%', left: '10%', width: '20%', height: '40%' },
  { id: 'pitch', name: 'Center Pitch', status: 'Green', visitors: '22', capacity: 'N/A', temp: '25°C', risk: 'Low', top: '30%', left: '30%', width: '40%', height: '40%' },
];

export const DigitalTwin = () => {
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const pulse = useSharedValue(0.5);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true);
  }, []);

  const getStatusColor = (status: string) => {
    if (status === 'Red') return Colors.dark.danger;
    if (status === 'Yellow') return Colors.dark.warning;
    return Colors.dark.success;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }));

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="scan" size={24} color="#b388ff" />
        <Text style={styles.title}>Digital Twin Simulation</Text>
      </View>
      
      <View style={styles.stadiumWrapper}>
        <View style={styles.stadiumOuter}>
          {zones.map((zone) => {
            const color = getStatusColor(zone.status);
            return (
              <TouchableOpacity
                key={zone.id}
                style={[
                  styles.zone,
                  { top: zone.top as any, left: zone.left as any, width: zone.width as any, height: zone.height as any, borderColor: color }
                ]}
                onPress={() => setSelectedZone(zone)}
              >
                <Animated.View style={[styles.zoneFill, { backgroundColor: color + '40' }, zone.status === 'Red' && animatedStyle]} />
                <Text style={styles.zoneName}>{zone.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Popup Modal */}
      <Modal visible={!!selectedZone} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <GlassCard style={styles.modalContent}>
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'transparent']}
              style={StyleSheet.absoluteFillObject}
            />
            {selectedZone && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedZone.name}</Text>
                  <TouchableOpacity onPress={() => setSelectedZone(null)}>
                    <Ionicons name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
                <View style={styles.modalBody}>
                  <Text style={styles.modalLabel}>Status: <Text style={{ color: getStatusColor(selectedZone.status), fontWeight: 'bold' }}>{selectedZone.status}</Text></Text>
                  <Text style={styles.modalLabel}>Visitors: {selectedZone.visitors}</Text>
                  <Text style={styles.modalLabel}>Capacity: {selectedZone.capacity}</Text>
                  <Text style={styles.modalLabel}>Temperature: {selectedZone.temp}</Text>
                  <Text style={styles.modalLabel}>Risk Score: {selectedZone.risk}</Text>
                </View>
              </>
            )}
          </GlassCard>
        </View>
      </Modal>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(15, 25, 35, 0.8)',
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
  stadiumWrapper: {
    height: 300,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: Theme.shapes.borderRadius.xl,
    padding: Theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stadiumOuter: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 150, // Oval shape
    position: 'relative',
    overflow: 'hidden',
  },
  zone: {
    position: 'absolute',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoneFill: {
    ...StyleSheet.absoluteFillObject,
  },
  zoneName: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.l,
  },
  modalContent: {
    width: '100%',
    padding: Theme.spacing.l,
    backgroundColor: 'rgba(20, 25, 40, 0.95)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingBottom: Theme.spacing.s,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBody: {
    gap: Theme.spacing.s,
  },
  modalLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
});
