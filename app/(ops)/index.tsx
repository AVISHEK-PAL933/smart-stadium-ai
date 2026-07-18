import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, signOut } from '../../services/firebase';

const STATS = [
  { label: 'Today\'s Revenue', value: '$1.2M', icon: 'currency-usd', color: '#00FF96' },
  { label: 'Tickets Sold', value: '84,200', icon: 'ticket', color: '#00C8FF' },
  { label: 'Visitors Present', value: '78,412', icon: 'account-group', color: '#FFAA00' },
];

const REVENUE_STATS = [
  { label: 'Parking Revenue', value: '$45,000', icon: 'parking' },
  { label: 'Food Revenue', value: '$320,000', icon: 'food' },
  { label: 'Merch Revenue', value: '$180,000', icon: 'tshirt-crew' },
];

const OPS_MODULES = [
  { id: 'crowd-intel', title: 'Crowd Intel', icon: 'account-multiple', route: '/(modules)/crowd-intelligence' },
  { id: 'security', title: 'Security', icon: 'shield-check', route: '/(modules)/admin-mode' },
  { id: 'emergency', title: 'Emergency', icon: 'alert-circle', route: '/(modules)/emergency' },
  { id: 'ai-ops', title: 'AI Command', icon: 'robot', route: '/(modules)/ai-ops-center' },
];

const FACILITY_MODULES = [
  { id: 'iot', title: 'IoT Dashboard', icon: 'access-point-network', route: '/(modules)/smart-iot-center' },
  { id: 'energy', title: 'Energy', icon: 'lightning-bolt', route: '/(modules)/sustainability' },
  { id: 'water', title: 'Water', icon: 'water', route: '/(modules)/sustainability' },
];

const MANAGEMENT_MODULES = [
  { id: 'staff', title: 'Staff', icon: 'account-tie', route: '/(ops)' },
  { id: 'volunteer', title: 'Volunteers', icon: 'hand-heart', route: '/(ops)' },
  { id: 'food-vendor', title: 'Food Vendors', icon: 'store', route: '/(ops)' },
  { id: 'lost-found', title: 'Lost & Found', icon: 'image-search', route: '/(modules)/lost-found' },
  { id: 'translation', title: 'Translations', icon: 'translate', route: '/(ops)' },
  { id: 'accessibility', title: 'Accessibility', icon: 'wheelchair-accessibility', route: '/(ops)' },
];

export default function OrgDashboard() {
  const { themeColors, user, setRole } = useGlobalContext();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setRole(null);
      router.replace('/welcome');
    } catch (e) {
      console.error(e);
    }
  };

  const renderModuleCard = (mod: any, i: number) => (
    <Animated.View key={mod.id} entering={FadeInDown.delay(i * 50)} style={styles.gridItem}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => {
          if (mod.route !== '/(ops)') {
            router.push(mod.route as any);
          }
        }}
      >
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons name={mod.icon as any} size={24} color="#00C8FF" />
        </View>
        <Text style={styles.cardTitle}>{mod.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0F1E', '#16213E']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Executive Control Center</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#FFF" />
            <View style={styles.badge} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Animated.View entering={FadeInUp.delay(100)} style={styles.statsContainer}>
          {STATS.map((stat, i) => (
            <LinearGradient key={i} colors={[`${stat.color}20`, 'transparent']} style={[styles.statCard, { borderColor: `${stat.color}40` }]}>
              <MaterialCommunityIcons name={stat.icon as any} size={24} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </LinearGradient>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200)} style={styles.revenueContainer}>
          {REVENUE_STATS.map((stat, i) => (
            <View key={i} style={styles.revCard}>
              <MaterialCommunityIcons name={stat.icon as any} size={20} color="#8A99AF" />
              <View style={styles.revTextWrap}>
                <Text style={styles.revLabel}>{stat.label}</Text>
                <Text style={styles.revValue}>{stat.value}</Text>
              </View>
            </View>
          ))}
        </Animated.View>

        <Text style={styles.sectionTitle}>Security & Operations</Text>
        <View style={styles.grid}>
          {OPS_MODULES.map(renderModuleCard)}
        </View>

        <Text style={styles.sectionTitle}>Facilities & Environment</Text>
        <View style={styles.grid}>
          {FACILITY_MODULES.map(renderModuleCard)}
        </View>

        <Text style={styles.sectionTitle}>Staff & Management</Text>
        <View style={styles.grid}>
          {MANAGEMENT_MODULES.map(renderModuleCard)}
        </View>

        <Text style={styles.sectionTitle}>Executive</Text>
        <View style={styles.grid}>
          <Animated.View entering={FadeInDown.delay(100)} style={styles.gridItem}>
            <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => router.push('/(modules)/reports' as any)}>
              <View style={styles.iconWrapper}>
                <MaterialCommunityIcons name="file-chart" size={24} color="#00FF96" />
              </View>
              <Text style={styles.cardTitle}>Executive Reports</Text>
            </TouchableOpacity>
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
    backgroundColor: '#0A0F1E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'rgba(10,15,30,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#8A99AF',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3366',
  },
  scrollContent: {
    padding: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#8A99AF',
    textAlign: 'center',
  },
  revenueContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  revCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  revTextWrap: {
    marginLeft: 8,
  },
  revLabel: {
    fontSize: 10,
    color: '#8A99AF',
  },
  revValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  gridItem: {
    width: '31%',
    minWidth: 100,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    height: 110,
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,200,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
