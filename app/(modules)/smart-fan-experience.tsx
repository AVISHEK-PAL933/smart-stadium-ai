import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { Colors } from '../../constants/colors';
import { mockFanData } from '../../data/mockFanData';

// Import Fan Experience Components
import { PersonalizedHomeFeed } from '../../components/fan-experience/PersonalizedHomeFeed';
import { DigitalFanPassport } from '../../components/fan-experience/DigitalFanPassport';
import { AchievementsBadges } from '../../components/fan-experience/AchievementsBadges';
import { RewardPoints } from '../../components/fan-experience/RewardPoints';
import { ARSelfieZone } from '../../components/fan-experience/ARSelfieZone';
import { FanChallenges } from '../../components/fan-experience/FanChallenges';
import { SocialWall } from '../../components/fan-experience/SocialWall';
import { FantasyPredictor } from '../../components/fan-experience/FantasyPredictor';
import { LivePolls } from '../../components/fan-experience/LivePolls';
import { FanMarketplace } from '../../components/fan-experience/FanMarketplace';
import { PhotoGallery } from '../../components/fan-experience/PhotoGallery';
import { AIRecommendations } from '../../components/fan-experience/AIRecommendations';
import { MoodTracker } from '../../components/fan-experience/MoodTracker';
import { LiveFanStatistics } from '../../components/fan-experience/LiveFanStatistics';
import { FanSettings } from '../../components/fan-experience/FanSettings';

export default function SmartFanExperienceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Fan Experience" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <PersonalizedHomeFeed feed={mockFanData.homeFeed} />
          
          <DigitalFanPassport user={mockFanData.user} />
          
          <MoodTracker />
          
          <AIRecommendations recommendations={mockFanData.recommendations} />
          
          <FanChallenges challenges={mockFanData.challenges} />
          
          <RewardPoints rewards={mockFanData.rewards} />
          
          <AchievementsBadges badges={mockFanData.achievements} />
          
          <FantasyPredictor data={mockFanData.fantasyPredictor} />
          
          <LivePolls polls={mockFanData.livePolls} />
          
          <SocialWall posts={mockFanData.socialWall} />
          
          <ARSelfieZone />
          
          <FanMarketplace items={mockFanData.marketplace} />
          
          <PhotoGallery />
          
          <LiveFanStatistics stats={mockFanData.liveStats} />
          
          <FanSettings />
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
