import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { mockIotData } from '../../data/mockIotData';
import { Colors } from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedBackground } from '../../components/AnimatedBackground';

// Import Components
import { LiveIoTSensorDashboard } from '../../components/iot/LiveIoTSensorDashboard';
import { SmartEnergyDashboard } from '../../components/iot/SmartEnergyDashboard';
import { WaterManagement } from '../../components/iot/WaterManagement';
import { WasteManagement } from '../../components/iot/WasteManagement';
import { AISustainabilityScore } from '../../components/iot/AISustainabilityScore';
import { SmartMaintenance } from '../../components/iot/SmartMaintenance';
import { EnvironmentalDashboard } from '../../components/iot/EnvironmentalDashboard';
import { PredictiveMaintenance } from '../../components/iot/PredictiveMaintenance';
import { ExecutiveSustainabilityDashboard } from '../../components/iot/ExecutiveSustainabilityDashboard';
import { AIRecommendationsPanel } from '../../components/iot/AIRecommendationsPanel';

export default function SmartIoTCenterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#071321', '#040914']} style={StyleSheet.absoluteFillObject} />
      <AnimatedBackground />
      <Header title="IoT & Sustainability Platform" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <LiveIoTSensorDashboard sensors={mockIotData.sensors as any} />
          
          <ExecutiveSustainabilityDashboard kpis={mockIotData.execKpis as any} />
          
          <AISustainabilityScore score={mockIotData.sustainabilityScore} />
          
          <SmartEnergyDashboard data={mockIotData.energy as any} />
          
          <WaterManagement data={mockIotData.water as any} />
          
          <WasteManagement data={mockIotData.waste as any} />
          
          <AIRecommendationsPanel recommendations={mockIotData.aiRecommendations as any} />
          
          <SmartMaintenance maintenance={mockIotData.maintenance as any} />
          
          <PredictiveMaintenance predictions={mockIotData.predictions as any} />
          
          <EnvironmentalDashboard env={mockIotData.environment as any} />
          
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingTop: 16,
  },
});
