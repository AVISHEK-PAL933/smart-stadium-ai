import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, FadeInUp, FadeOut } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const zones = [
  { id: 'north', name: 'North Stand', status: 'Red', visitors: '15,200', capacity: '98%', temp: '24°C', risk: 'High', top: '5%', left: '20%', width: '60%', height: '22%' },
  { id: 'south', name: 'South Stand', status: 'Green', visitors: '10,100', capacity: '65%', temp: '22°C', risk: 'Low', top: '73%', left: '20%', width: '60%', height: '22%' },
  { id: 'east', name: 'East Stand', status: 'Yellow', visitors: '14,000', capacity: '85%', temp: '23°C', risk: 'Medium', top: '30%', left: '75%', width: '20%', height: '40%' },
  { id: 'west', name: 'VIP West', status: 'Green', visitors: '4,500', capacity: '45%', temp: '21°C', risk: 'Low', top: '30%', left: '5%', width: '20%', height: '40%' },
  { id: 'pitch', name: 'Center Pitch', status: 'Green', visitors: '22', capacity: 'N/A', temp: '25°C', risk: 'Low', top: '28%', left: '27%', width: '46%', height: '44%' },
];

export const DigitalTwin = () => {
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const pulse = useSharedValue(0.4);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(0.8, { duration: 1500 }), -1, true);
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
        <View style={styles.headerTitleRow}>
          <MaterialCommunityIcons name="cube-scan" size={24} color={Colors.dark.tint} style={styles.headerIcon} />
          <Text style={styles.title}>Live Digital Twin</Text>
        </View>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.dark.danger }]} />
            <Text style={styles.legendText}>Critical</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.dark.warning }]} />
            <Text style={styles.legendText}>Warning</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.dark.success }]} />
            <Text style={styles.legendText}>Normal</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.stadiumWrapper}>
        <LinearGradient colors={['rgba(0,200,255,0.05)', 'rgba(0,0,0,0.4)']} style={StyleSheet.absoluteFillObject} />
        
        {/* Decorative Pitch Grid */}
        <View style={styles.gridOverlay}>
          {[1,2,3,4,5,6,7].map(i => <View key={`v${i}`} style={styles.gridV} />)}
          {[1,2,3,4,5].map(i => <View key={`h${i}`} style={styles.gridH} />)}
        </View>

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
                activeOpacity={0.7}
              >
                <Animated.View style={[styles.zoneFill, { backgroundColor: color }, zone.status === 'Red' ? animatedStyle : { opacity: 0.15 }]} />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)']} style={StyleSheet.absoluteFillObject} />
                <View style={styles.zoneContent}>
                  <Text style={styles.zoneName}>{zone.name}</Text>
                  <View style={[styles.statusIndicator, { backgroundColor: color }]} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Popup Modal */}
      <Modal visible={!!selectedZone} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View entering={FadeInUp} exiting={FadeOut} style={styles.modalContentWrapper}>
            <LinearGradient colors={['#121D33', '#0A1121']} style={styles.modalContent}>
              {selectedZone && (
                <>
                  <View style={styles.modalHeader}>
                    <View style={styles.modalHeaderTitleRow}>
                      <MaterialCommunityIcons name="map-marker-radius" size={24} color={getStatusColor(selectedZone.status)} />
                      <Text style={styles.modalTitle}>{selectedZone.name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setSelectedZone(null)} style={styles.closeBtn}>
                      <Ionicons name="close" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.modalBody}>
                    <View style={styles.statRow}>
                      <View style={styles.statIconBox}>
                        <MaterialCommunityIcons name="account-group" size={20} color={Colors.dark.icon} />
                      </View>
                      <View style={styles.statTextWrap}>
                        <Text style={styles.statLabel}>Occupancy</Text>
                        <Text style={styles.statValue}>{selectedZone.visitors} <Text style={styles.statSub}>({selectedZone.capacity})</Text></Text>
                      </View>
                    </View>

                    <View style={styles.statRow}>
                      <View style={styles.statIconBox}>
                        <MaterialCommunityIcons name="thermometer" size={20} color={Colors.dark.icon} />
                      </View>
                      <View style={styles.statTextWrap}>
                        <Text style={styles.statLabel}>Temperature</Text>
                        <Text style={styles.statValue}>{selectedZone.temp}</Text>
                      </View>
                    </View>

                    <View style={styles.statRow}>
                      <View style={styles.statIconBox}>
                        <MaterialCommunityIcons name="alert" size={20} color={getStatusColor(selectedZone.status)} />
                      </View>
                      <View style={styles.statTextWrap}>
                        <Text style={styles.statLabel}>Risk Level</Text>
                        <Text style={[styles.statValue, { color: getStatusColor(selectedZone.status) }]}>{selectedZone.risk}</Text>
                      </View>
                    </View>
                  </View>
                </>
              )}
            </LinearGradient>
          </Animated.View>
        </View>
      </Modal>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(18,29,51,0.6)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 8,
    textShadowColor: Colors.dark.tint,
    textShadowRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  legend: {
    flexDirection: 'row',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: Colors.dark.icon,
    fontSize: 10,
    fontWeight: 'bold',
  },
  stadiumWrapper: {
    height: 340,
    position: 'relative',
    overflow: 'hidden',
    padding: 20,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  gridV: {
    width: 1,
    height: '100%',
    backgroundColor: '#FFF',
  },
  gridH: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: '#FFF',
    top: '20%',
  },
  stadiumOuter: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'rgba(0,200,255,0.2)',
    borderRadius: 160,
    backgroundColor: 'rgba(0,200,255,0.02)',
    position: 'relative',
    shadowColor: Colors.dark.tint,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
  },
  zone: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  zoneFill: {
    ...StyleSheet.absoluteFillObject,
  },
  zoneContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    gap: 4,
  },
  zoneName: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowRadius: 4,
  },
  statusIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContentWrapper: {
    width: '100%',
    maxWidth: 340,
  },
  modalContent: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  closeBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 6,
    borderRadius: 16,
  },
  modalBody: {
    gap: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 12,
    borderRadius: 16,
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statTextWrap: {
    flex: 1,
  },
  statLabel: {
    color: Colors.dark.icon,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  statValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
  },
  statSub: {
    fontSize: 12,
    color: Colors.dark.icon,
    fontWeight: '600',
  }
});
