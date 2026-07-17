import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { mockOpsData } from '../../data/mockOpsData';
import { Colors } from '../../constants/colors';

// Import Components
import { LiveStatusCards } from '../../components/ops/LiveStatusCards';
import { DigitalTwin } from '../../components/ops/DigitalTwin';
import { EventStream } from '../../components/ops/EventStream';
import { AIDecisionEngine } from '../../components/ops/AIDecisionEngine';
import { PredictiveAnalytics } from '../../components/ops/PredictiveAnalytics';
import { ResourceManagement } from '../../components/ops/ResourceManagement';
import { SystemHealth } from '../../components/ops/SystemHealth';
import { LiveKPIDashboard } from '../../components/ops/LiveKPIDashboard';
import { CommandActions } from '../../components/ops/CommandActions';
import { WorldMap } from '../../components/ops/WorldMap';
import { AIInsightsPanel } from '../../components/ops/AIInsightsPanel';

export default function AIOpsCenterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="AI Operations Command Center" showBack />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <LiveStatusCards data={mockOpsData.liveStatus} />
          
          <DigitalTwin />
          
          <LiveKPIDashboard chartData={mockOpsData.chartData} />
          
          <AIDecisionEngine decisions={mockOpsData.aiDecisions} />
          
          <EventStream events={mockOpsData.eventStream} />
          
          <PredictiveAnalytics predictions={mockOpsData.predictiveAnalytics} />
          
          <AIInsightsPanel insights={mockOpsData.aiInsights} />
          
          <ResourceManagement resources={mockOpsData.resources} />
          
          <SystemHealth systems={mockOpsData.systemHealth} />
          
          <WorldMap />
          
          <CommandActions />
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
