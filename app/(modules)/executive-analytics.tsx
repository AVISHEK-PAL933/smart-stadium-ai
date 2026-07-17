import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { Colors } from '../../constants/colors';
import { mockAnalyticsData } from '../../data/mockAnalyticsData';

// Import BI Components
import { ExecutiveKPIDashboard } from '../../components/analytics/ExecutiveKPIDashboard';
import { RevenueAnalytics } from '../../components/analytics/RevenueAnalytics';
import { VisitorAnalytics } from '../../components/analytics/VisitorAnalytics';
import { FanBehaviourAnalytics } from '../../components/analytics/FanBehaviourAnalytics';
import { AIInsightsEngine } from '../../components/analytics/AIInsightsEngine';
import { PredictiveForecasting } from '../../components/analytics/PredictiveForecasting';
import { SponsorAnalytics } from '../../components/analytics/SponsorAnalytics';
import { OperationalPerformance } from '../../components/analytics/OperationalPerformance';
import { ReportGenerator } from '../../components/analytics/ReportGenerator';
import { AIExecutiveAssistant } from '../../components/analytics/AIExecutiveAssistant';

export default function ExecutiveAnalyticsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Executive Analytics & BI" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <AIExecutiveAssistant assistant={mockAnalyticsData.aiAssistant} />
          
          <ExecutiveKPIDashboard kpis={mockAnalyticsData.kpis as any} />
          
          <AIInsightsEngine insights={mockAnalyticsData.aiInsights} />
          
          <RevenueAnalytics revenue={mockAnalyticsData.revenue} />
          
          <VisitorAnalytics visitors={mockAnalyticsData.visitors} />
          
          <FanBehaviourAnalytics behaviour={mockAnalyticsData.fanBehaviour} />
          
          <PredictiveForecasting predictions={mockAnalyticsData.predictions} />
          
          <OperationalPerformance operations={mockAnalyticsData.operations} />
          
          <SponsorAnalytics sponsors={mockAnalyticsData.sponsors} />
          
          <ReportGenerator />
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
