import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../constants/colors';

import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedBackground } from '../../components/AnimatedBackground';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  MATCH_STATS,
  SQUAD_BRAZIL,
  SQUAD_ARGENTINA,
  COMMENTARY_EVENTS,
  AI_MATCH_SUMMARY,
  Player,
} from '../../services/matchService';

export default function LiveMatch() {
  const { theme, themeColors } = useGlobalContext();

  // Active View tabs: 'STATS' | 'LINEUPS' | 'COMMENTARY'
  const [activeTab, setActiveTab] = useState<'STATS' | 'LINEUPS' | 'COMMENTARY'>('STATS');

  // Interactive poll state
  const [userVoted, setUserVoted] = useState(false);
  const [pollVotes, setPollVotes] = useState({ home: 42, draw: 18, away: 40 });

  // Player details modal state
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Active event click highlight
  const [activeEventIndex, setActiveEventIndex] = useState<number | null>(null);

  const handleVote = (option: 'home' | 'draw' | 'away') => {
    if (userVoted) return;
    setPollVotes((prev) => {
      const next = { ...prev };
      next[option]++;
      return next;
    });
    setUserVoted(true);
  };

  const getVotePercentage = (votes: number) => {
    const total = pollVotes.home + pollVotes.draw + pollVotes.away;
    return Math.round((votes / total) * 100);
  };

  return (
    <View style={styles.container}>
      {/* Premium Dark Space Background */}
      <LinearGradient
        colors={['#081223', '#040D1A', '#0D1B2A']}
        style={StyleSheet.absoluteFillObject}
      />
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce8058?q=80&w=2000&auto=format&fit=crop' }}
        style={[StyleSheet.absoluteFillObject, { opacity: 0.08 }]}
        resizeMode="cover"
      />
      <AnimatedBackground />

      <Header title="Live Match Updates" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Match Header Scoreboard Card */}
        <LinearGradient 
          colors={['rgba(0, 200, 255, 0.15)', 'rgba(0, 200, 255, 0.05)']}
          style={[styles.scoreCard, { borderColor: 'rgba(0, 200, 255, 0.4)', borderWidth: 1 }]}
        >
          {/* Authentic Pitch Background */}
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200' }}
            style={[StyleSheet.absoluteFillObject, { borderRadius: 24, opacity: 0.3 }]}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(8,18,35,0.7)', 'rgba(8,18,35,0.9)']}
            style={[StyleSheet.absoluteFillObject, { borderRadius: 24 }]}
          />

          <View style={styles.stadiumRow}>
            <Text style={[styles.stadiumText, { color: '#8F9BB3' }]}>
              📍 MetLife Stadium • Group Stage
            </Text>
            <View style={styles.liveIndicator}>
              <View style={styles.redDot} />
              <Text style={styles.liveText}>LIVE 89'</Text>
            </View>
          </View>

          <View style={styles.teamsRow}>
            {/* Brazil */}
            <View style={styles.teamBox}>
              <View style={[styles.squadLogoCircle, { backgroundColor: 'rgba(255, 213, 79, 0.1)', borderColor: '#FFD54F', borderWidth: 2 }]}>
                <Image source={{ uri: 'https://flagcdn.com/w320/br.png' }} style={styles.flagImage} />
              </View>
              <Text style={[styles.teamName, { color: '#FFFFFF' }]}>BRAZIL</Text>
            </View>

            {/* Score */}
            <View style={styles.scoreBox}>
              <Text style={[styles.scoreValue, { color: '#00C8FF', textShadowColor: '#00C8FF', textShadowRadius: 10 }]}>1 - 1</Text>
              <Text style={[styles.aggregateText, { color: '#8F9BB3' }]}>Group A</Text>
            </View>

            {/* Argentina */}
            <View style={styles.teamBox}>
              <View style={[styles.squadLogoCircle, { backgroundColor: 'rgba(128, 216, 255, 0.1)', borderColor: '#80D8FF', borderWidth: 2 }]}>
                <Image source={{ uri: 'https://flagcdn.com/w320/ar.png' }} style={styles.flagImage} />
              </View>
              <Text style={[styles.teamName, { color: '#FFFFFF' }]}>ARGENTINA</Text>
            </View>
          </View>

          {/* Quick Weather & Match Info */}
          <View style={[styles.refRow, { borderTopColor: 'rgba(255,255,255,0.1)' }]}>
            <Text style={[styles.refText, { color: '#8F9BB3' }]}>Ref: Wilmar Roldan</Text>
            <Text style={[styles.refText, { color: '#8F9BB3' }]}>☁ 24°C • Att: 82,500</Text>
          </View>
        </LinearGradient>

        {/* Clickable Horizontal Events Timeline */}
        <View style={styles.timelineContainer}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Interactive Event Match Timeline
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.timelineScroll}>
            {COMMENTARY_EVENTS.map((event, idx) => {
              const isActive = activeEventIndex === idx;
              return (
                <TouchableOpacity
                  key={event.minute}
                  activeOpacity={0.8}
                  onPress={() => setActiveEventIndex(isActive ? null : idx)}
                  style={[
                    styles.timelineNode,
                    {
                      backgroundColor: isActive ? 'rgba(0, 200, 255, 0.3)' : 'rgba(0, 200, 255, 0.05)',
                      borderColor: isActive ? '#00C8FF' : 'rgba(0, 200, 255, 0.2)',
                    },
                  ]}>
                  <Text
                    style={[styles.nodeMin, { color: isActive ? '#FFFFFF' : '#00C8FF' }]}>
                    {event.minute}'
                  </Text>
                  <MaterialCommunityIcons
                    name={
                      event.type === 'GOAL'
                        ? 'soccer'
                        : event.type === 'CARD'
                          ? 'card'
                          : event.type === 'SUB'
                            ? 'account-convert'
                            : 'flag-triangle'
                    }
                    size={20}
                    color={isActive ? '#FFFFFF' : event.type === 'GOAL' ? '#00E676' : '#FFD700'}
                  />
                  <Text
                    style={[styles.nodeTitle, { color: isActive ? '#FFFFFF' : '#FFFFFF' }]}>
                    {event.type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Highlighted Event detail box */}
          {activeEventIndex !== null && (
            <Animated.View
              entering={FadeInUp}
              style={[
                styles.highlightedEventCard,
                { backgroundColor: 'rgba(0, 200, 255, 0.1)', borderColor: '#00C8FF' },
              ]}>
              <View style={styles.highlightHeader}>
                <Text style={[styles.highlightTime, { color: '#00C8FF' }]}>
                  Event Detail ({COMMENTARY_EVENTS[activeEventIndex].minute}')
                </Text>
                <TouchableOpacity onPress={() => setActiveEventIndex(null)}>
                  <MaterialCommunityIcons name="close" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <Text style={[styles.highlightName, { color: '#FFFFFF' }]}>
                {COMMENTARY_EVENTS[activeEventIndex].title}
              </Text>
              <Text style={[styles.highlightBody, { color: 'rgba(255, 255, 255, 0.7)' }]}>
                {COMMENTARY_EVENTS[activeEventIndex].body}
              </Text>
            </Animated.View>
          )}
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabsRow}>
          {(['STATS', 'LINEUPS', 'COMMENTARY'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabButton,
                activeTab === tab && [styles.activeTab, { borderBottomColor: themeColors.tint }],
              ]}>
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === tab ? themeColors.text : themeColors.icon },
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab contents */}
        {activeTab === 'STATS' && (
          <View style={styles.tabContent}>
            {/* AI Summary Card */}
            <LinearGradient 
              colors={['rgba(0, 200, 255, 0.1)', 'rgba(0, 200, 255, 0.02)']}
              style={[styles.summaryCard, { borderColor: 'rgba(0, 200, 255, 0.3)', borderWidth: 1 }]}
            >
              <Text style={[styles.summaryHeader, { color: '#FFFFFF' }]}>
                🎙 AI Match Summary
              </Text>
              <Text style={[styles.summaryBody, { color: 'rgba(255, 255, 255, 0.7)' }]}>
                {AI_MATCH_SUMMARY}
              </Text>
            </LinearGradient>

            {/* Statistics comparison bars */}
            <View style={styles.statsList}>
              <Text style={[styles.summaryHeader, { color: themeColors.text, marginBottom: 4 }]}>
                Team Match Statistics
              </Text>

              {/* Possession comparison */}
              <View style={styles.statProgressItem}>
                <View style={styles.statLabelRow}>
                  <Text style={[styles.statValueText, { color: themeColors.text }]}>
                    {MATCH_STATS.possessionHome}%
                  </Text>
                  <Text style={[styles.statTitleText, { color: themeColors.icon }]}>
                    Possession
                  </Text>
                  <Text style={[styles.statValueText, { color: themeColors.text }]}>
                    {MATCH_STATS.possessionAway}%
                  </Text>
                </View>
                <View style={[styles.progressBase, { backgroundColor: themeColors.border }]}>
                  <View
                    style={[
                      styles.progressFillHome,
                      {
                        width: `${MATCH_STATS.possessionHome}%`,
                        backgroundColor: themeColors.tint,
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.progressFillAway,
                      {
                        width: `${MATCH_STATS.possessionAway}%`,
                        backgroundColor: themeColors.tint + '90',
                      },
                    ]}
                  />
                </View>
              </View>

              {/* xG expected goals comparison */}
              <View style={styles.statProgressItem}>
                <View style={styles.statLabelRow}>
                  <Text style={[styles.statValueText, { color: themeColors.text }]}>
                    {MATCH_STATS.xgHome}
                  </Text>
                  <Text style={[styles.statTitleText, { color: themeColors.icon }]}>
                    Expected Goals (xG)
                  </Text>
                  <Text style={[styles.statValueText, { color: themeColors.text }]}>
                    {MATCH_STATS.xgAway}
                  </Text>
                </View>
                <View style={[styles.progressBase, { backgroundColor: themeColors.border }]}>
                  <View
                    style={[
                      styles.progressFillHome,
                      { width: '42%', backgroundColor: themeColors.tint },
                    ]}
                  />
                  <View
                    style={[
                      styles.progressFillAway,
                      { width: '58%', backgroundColor: themeColors.tint + '90' },
                    ]}
                  />
                </View>
              </View>

              {/* Grid values check */}
              <View
                style={[
                  styles.statsGrid,
                  { backgroundColor: themeColors.card, borderColor: themeColors.border },
                ]}>
                <View style={styles.gridRow}>
                  <Text style={[styles.gridVal, { color: themeColors.text }]}>
                    {MATCH_STATS.shotsHome}
                  </Text>
                  <Text style={[styles.gridLabel, { color: themeColors.icon }]}>Total Shots</Text>
                  <Text style={[styles.gridVal, { color: themeColors.text }]}>
                    {MATCH_STATS.shotsAway}
                  </Text>
                </View>
                <View style={styles.gridRow}>
                  <Text style={[styles.gridVal, { color: themeColors.text }]}>
                    {MATCH_STATS.shotsOnTargetHome}
                  </Text>
                  <Text style={[styles.gridLabel, { color: themeColors.icon }]}>
                    Shots on Target
                  </Text>
                  <Text style={[styles.gridVal, { color: themeColors.text }]}>
                    {MATCH_STATS.shotsOnTargetAway}
                  </Text>
                </View>
                <View style={styles.gridRow}>
                  <Text style={[styles.gridVal, { color: themeColors.text }]}>
                    {MATCH_STATS.cornersHome}
                  </Text>
                  <Text style={[styles.gridLabel, { color: themeColors.icon }]}>Corners</Text>
                  <Text style={[styles.gridVal, { color: themeColors.text }]}>
                    {MATCH_STATS.cornersAway}
                  </Text>
                </View>
                <View style={styles.gridRow}>
                  <Text style={[styles.gridVal, { color: themeColors.text }]}>
                    {MATCH_STATS.passAccuracyHome}%
                  </Text>
                  <Text style={[styles.gridLabel, { color: themeColors.icon }]}>Pass Accuracy</Text>
                  <Text style={[styles.gridVal, { color: themeColors.text }]}>
                    {MATCH_STATS.passAccuracyAway}%
                  </Text>
                </View>
              </View>
            </View>

            {/* Voting Fan Poll */}
            <LinearGradient 
              colors={['rgba(13, 71, 161, 0.2)', 'rgba(13, 71, 161, 0.05)']}
              style={[styles.pollCard, { borderColor: 'rgba(13, 71, 161, 0.4)', borderWidth: 1 }]}
            >
              <Text style={[styles.pollHeader, { color: '#FFFFFF' }]}>
                Who will win this match?
              </Text>
              {!userVoted ? (
                <View style={styles.pollOptionsRow}>
                  <TouchableOpacity
                    onPress={() => handleVote('home')}
                    style={[styles.pollOptionBtn, { borderColor: 'rgba(0,200,255,0.3)', backgroundColor: 'rgba(0,200,255,0.1)' }]}>
                    <Text style={[styles.pollOptionText, { color: '#FFFFFF' }]}>Brazil</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleVote('draw')}
                    style={[styles.pollOptionBtn, { borderColor: 'rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                    <Text style={[styles.pollOptionText, { color: '#FFFFFF' }]}>Draw</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleVote('away')}
                    style={[styles.pollOptionBtn, { borderColor: 'rgba(0,200,255,0.3)', backgroundColor: 'rgba(0,200,255,0.1)' }]}>
                    <Text style={[styles.pollOptionText, { color: '#FFFFFF' }]}>
                      Argentina
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.pollResults}>
                  <View style={styles.resultItem}>
                    <Text style={[styles.resultLabel, { color: '#FFFFFF' }]}>Brazil</Text>
                    <View style={[styles.resultBarBase, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                      <View
                        style={[
                          styles.resultBarFill,
                          {
                            width: `${getVotePercentage(pollVotes.home)}%`,
                            backgroundColor: '#00C8FF',
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.resultPercent, { color: '#00C8FF' }]}>
                      {getVotePercentage(pollVotes.home)}%
                    </Text>
                  </View>

                  <View style={styles.resultItem}>
                    <Text style={[styles.resultLabel, { color: '#FFFFFF' }]}>Draw</Text>
                    <View style={[styles.resultBarBase, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                      <View
                        style={[
                          styles.resultBarFill,
                          {
                            width: `${getVotePercentage(pollVotes.draw)}%`,
                            backgroundColor: '#8F9BB3',
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.resultPercent, { color: '#8F9BB3' }]}>
                      {getVotePercentage(pollVotes.draw)}%
                    </Text>
                  </View>

                  <View style={styles.resultItem}>
                    <Text style={[styles.resultLabel, { color: '#FFFFFF' }]}>Argentina</Text>
                    <View style={[styles.resultBarBase, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                      <View
                        style={[
                          styles.resultBarFill,
                          {
                            width: `${getVotePercentage(pollVotes.away)}%`,
                            backgroundColor: '#00C8FF',
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.resultPercent, { color: '#00C8FF' }]}>
                      {getVotePercentage(pollVotes.away)}%
                    </Text>
                  </View>
                </View>
              )}
            </LinearGradient>

            {/* MOTM AI Confidence */}
            <LinearGradient 
              colors={['rgba(124, 77, 255, 0.2)', 'rgba(124, 77, 255, 0.05)']}
              style={[styles.motmCard, { borderColor: 'rgba(124, 77, 255, 0.4)', borderWidth: 1 }]}
            >
              <Text style={[styles.pollHeader, { color: '#FFFFFF', marginBottom: 4 }]}>
                AI Man of the Match Predictor
              </Text>
              <View style={styles.motmRow}>
                <View style={styles.motmPlayerInfo}>
                  <View style={[styles.numCircle, { backgroundColor: '#7C4DFF' }]}>
                    <Text style={styles.numText}>10</Text>
                  </View>
                  <View>
                    <Text style={[styles.motmName, { color: '#FFFFFF' }]}>Lionel Messi</Text>
                    <Text style={[styles.motmClub, { color: 'rgba(255,255,255,0.6)' }]}>
                      Argentina • FWD
                    </Text>
                  </View>
                </View>
                <View style={[styles.confidenceBadge, { backgroundColor: 'rgba(124, 77, 255, 0.2)' }]}>
                  <Text style={[styles.confidenceText, { color: '#7C4DFF' }]}>82% AI Confidence</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {activeTab === 'LINEUPS' && (
          <View style={styles.tabContent}>
            {/* Squad lists */}
            <View style={styles.squadHeader}>
              <Text style={[styles.squadTitleText, { color: themeColors.text }]}>
                Brazil Squad Lineup (Starting XI)
              </Text>
            </View>
            <View style={styles.lineupList}>
              {SQUAD_BRAZIL.map((player) => (
                <TouchableOpacity
                  key={player.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedPlayer(player)}
                  style={[styles.playerItemRow, { borderBottomColor: themeColors.border }]}>
                  <View style={styles.playerNumBox}>
                    <Text style={[styles.playerNumVal, { color: themeColors.tint }]}>
                      {player.number}
                    </Text>
                  </View>
                  <View style={styles.playerNameCol}>
                    <Text style={[styles.playerNameText, { color: themeColors.text }]}>
                      {player.name}{' '}
                      {player.isCaptain && <Text style={{ color: '#FFD700' }}>[C]</Text>}
                    </Text>
                    <Text style={[styles.playerPositionText, { color: themeColors.icon }]}>
                      {player.position}
                    </Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={18} color={themeColors.icon} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={[styles.squadHeader, { marginTop: Theme.spacing.l }]}>
              <Text style={[styles.squadTitleText, { color: themeColors.text }]}>
                Argentina Squad Lineup (Starting XI)
              </Text>
            </View>
            <View style={styles.lineupList}>
              {SQUAD_ARGENTINA.map((player) => (
                <TouchableOpacity
                  key={player.id}
                  activeOpacity={0.8}
                  onPress={() => setSelectedPlayer(player)}
                  style={[styles.playerItemRow, { borderBottomColor: themeColors.border }]}>
                  <View style={styles.playerNumBox}>
                    <Text style={[styles.playerNumVal, { color: themeColors.tint }]}>
                      {player.number}
                    </Text>
                  </View>
                  <View style={styles.playerNameCol}>
                    <Text style={[styles.playerNameText, { color: themeColors.text }]}>
                      {player.name}{' '}
                      {player.isCaptain && <Text style={{ color: '#FFD700' }}>[C]</Text>}
                    </Text>
                    <Text style={[styles.playerPositionText, { color: themeColors.icon }]}>
                      {player.position}
                    </Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={18} color={themeColors.icon} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'COMMENTARY' && (
          <View style={styles.tabContent}>
            {/* Live commentary feeds */}
            <View style={styles.commentaryList}>
              {COMMENTARY_EVENTS.slice()
                .reverse()
                .map((event, idx) => (
                  <LinearGradient
                    key={idx}
                    colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.01)']}
                    style={[
                      styles.commentaryCardItem,
                      { borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 },
                    ]}>
                    <View style={styles.commentaryHeaderRow}>
                      <View style={[styles.commentaryMinBadge, { backgroundColor: '#00C8FF' }]}>
                        <Text style={[styles.comMinText, { color: '#FFFFFF' }]}>{event.minute}'</Text>
                      </View>
                      <Text style={[styles.comTypeTitle, { color: '#FFFFFF' }]}>
                        {event.title}
                      </Text>
                    </View>
                    <Text style={[styles.comBodyText, { color: 'rgba(255,255,255,0.7)' }]}>
                      {event.body}
                    </Text>
                  </LinearGradient>
                ))}
            </View>
          </View>
        )}

        {/* Player Detail Statistics Modal overlay */}
        {selectedPlayer && (
          <View style={styles.modalOverlay}>
            <GlassCard style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <View style={styles.playerTitleRow}>
                  <View style={[styles.numCircle, { backgroundColor: themeColors.tint }]}>
                    <Text style={styles.numText}>{selectedPlayer.number}</Text>
                  </View>
                  <View>
                    <Text style={[styles.modalPlayerName, { color: themeColors.text }]}>
                      {selectedPlayer.name}
                    </Text>
                    <Text style={[styles.modalPlayerSub, { color: themeColors.icon }]}>
                      {selectedPlayer.position} • Season Stats
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setSelectedPlayer(null)}>
                  <MaterialCommunityIcons name="close" size={22} color={themeColors.text} />
                </TouchableOpacity>
              </View>

              {/* Statistics Grid */}
              <View style={styles.playerStatsGrid}>
                <View style={styles.pStatCell}>
                  <Text style={[styles.pStatVal, { color: themeColors.tint }]}>
                    {selectedPlayer.goals}
                  </Text>
                  <Text style={[styles.pStatLabel, { color: themeColors.icon }]}>Goals</Text>
                </View>
                <View style={styles.pStatCell}>
                  <Text style={[styles.pStatVal, { color: themeColors.tint }]}>
                    {selectedPlayer.assists}
                  </Text>
                  <Text style={[styles.pStatLabel, { color: themeColors.icon }]}>Assists</Text>
                </View>
                <View style={styles.pStatCell}>
                  <Text style={[styles.pStatVal, { color: themeColors.text }]}>
                    {selectedPlayer.minutesPlayed}
                  </Text>
                  <Text style={[styles.pStatLabel, { color: themeColors.icon }]}>Mins</Text>
                </View>
                <View style={styles.pStatCell}>
                  <Text style={[styles.pStatVal, { color: '#FFD700' }]}>
                    {selectedPlayer.yellowCards}
                  </Text>
                  <Text style={[styles.pStatLabel, { color: themeColors.icon }]}>Yellows</Text>
                </View>
              </View>

              {/* Heat Map representation */}
              <Text style={[styles.heatTitle, { color: themeColors.text }]}>
                Zone Activity Heat Map (AI Tracking)
              </Text>
              <View style={[styles.heatmapContainer, { borderColor: themeColors.border }]}>
                {/* Field markings overlay */}
                <View style={styles.halfField} />
                <View style={styles.centerGoalRing} />

                {/* Hotspot indicators representing messi / forward heatmap zones */}
                <View
                  style={[
                    styles.hotspotNode,
                    {
                      left: '60%',
                      top: '40%',
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: 'rgba(255, 82, 82, 0.6)',
                    },
                  ]}
                />
                <View
                  style={[
                    styles.hotspotNode,
                    {
                      left: '70%',
                      top: '50%',
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: 'rgba(255, 82, 82, 0.4)',
                    },
                  ]}
                />
                <View
                  style={[
                    styles.hotspotNode,
                    {
                      left: '50%',
                      top: '30%',
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: 'rgba(0, 230, 118, 0.2)',
                    },
                  ]}
                />
              </View>

              <PrimaryButton
                title="Close Profile"
                onPress={() => setSelectedPlayer(null)}
                style={styles.modalCloseBtn}
              />
            </GlassCard>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Theme.spacing.l, paddingBottom: 100 },
  scoreCard: { padding: Theme.spacing.l, borderRadius: 24 },
  stadiumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  stadiumText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EF444433',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  redDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#EF4444' },
  liveText: { color: '#EF4444', fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  teamsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Theme.spacing.s,
  },
  teamBox: { alignItems: 'center', gap: 6, width: '30%' },
  squadLogoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  flagImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  teamName: { fontSize: Theme.typography.sizes.s, fontWeight: '900', letterSpacing: 1 },
  scoreBox: { alignItems: 'center', gap: 2 },
  scoreValue: { fontSize: Theme.typography.sizes.xl + 4, fontWeight: '900' },
  aggregateText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  refRow: {
    borderTopWidth: 1,
    paddingTop: Theme.spacing.s,
    marginTop: Theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  refText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },

  timelineContainer: { marginVertical: Theme.spacing.m },
  sectionTitle: {
    fontSize: Theme.typography.sizes.m - 2,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.s,
  },
  timelineScroll: { gap: Theme.spacing.s, paddingBottom: Theme.spacing.s },
  timelineNode: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    gap: 4,
  },
  nodeMin: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  nodeTitle: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  highlightedEventCard: {
    padding: Theme.spacing.m,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: Theme.spacing.s,
    gap: 4,
  },
  highlightHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  highlightTime: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  highlightName: { fontSize: Theme.typography.sizes.m - 2, fontWeight: 'bold' },
  highlightBody: { fontSize: Theme.typography.sizes.s, lineHeight: 18 },

  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Theme.spacing.m,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Theme.spacing.s,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomWidth: 2 },
  tabText: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  tabContent: { gap: Theme.spacing.m },

  summaryCard: { padding: Theme.spacing.m, borderRadius: 20, gap: Theme.spacing.s },
  summaryHeader: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  summaryBody: { fontSize: Theme.typography.sizes.s, lineHeight: 18 },

  statsList: { gap: Theme.spacing.s },
  statProgressItem: { gap: Theme.spacing.s, marginBottom: 4 },
  statLabelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statValueText: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  statTitleText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  progressBase: { height: 8, borderRadius: 4, flexDirection: 'row', overflow: 'hidden' },
  progressFillHome: { height: '100%' },
  progressFillAway: { height: '100%', alignSelf: 'flex-end', position: 'absolute', right: 0 },

  statsGrid: { padding: Theme.spacing.m, borderRadius: 20, borderWidth: 1, gap: 12 },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  gridVal: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  gridLabel: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },

  pollCard: { padding: Theme.spacing.m, borderRadius: 20, gap: Theme.spacing.m },
  pollHeader: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  pollOptionsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: Theme.spacing.s },
  pollOptionBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
  },
  pollOptionText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  pollResults: { gap: Theme.spacing.s },
  resultItem: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.s },
  resultLabel: { width: 60, fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  resultBarBase: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  resultBarFill: { height: '100%' },
  resultPercent: {
    width: 30,
    fontSize: Theme.typography.sizes.s - 2,
    fontWeight: 'bold',
    textAlign: 'right',
  },

  motmCard: { padding: Theme.spacing.m, borderRadius: 20 },
  motmRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  motmPlayerInfo: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.m },
  numCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: Theme.typography.sizes.s },
  motmName: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  motmClub: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold', opacity: 0.6 },
  confidenceBadge: {
    backgroundColor: '#7C4DFF33',
    borderWidth: 1,
    borderColor: '#7C4DFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: { color: '#7C4DFF', fontSize: 10, fontWeight: 'bold' },

  squadHeader: { paddingHorizontal: Theme.spacing.s, marginBottom: Theme.spacing.s },
  squadTitleText: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  lineupList: { gap: 2 },
  playerItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  playerNumBox: { width: 28 },
  playerNumVal: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  playerNameCol: { flex: 1 },
  playerNameText: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  playerPositionText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold', opacity: 0.6 },

  commentaryList: { gap: Theme.spacing.s },
  commentaryCardItem: {
    padding: Theme.spacing.m,
    borderRadius: 16,
    borderWidth: 1,
    gap: Theme.spacing.s,
  },
  commentaryHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.m },
  commentaryMinBadge: {
    backgroundColor: '#00C8FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  comMinText: { color: '#FFFFFF', fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  comTypeTitle: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  comBodyText: { fontSize: Theme.typography.sizes.s, lineHeight: 18 },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: Theme.spacing.l,
    zIndex: 100,
  },
  modalCard: { padding: Theme.spacing.l, borderRadius: 24, gap: Theme.spacing.m },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  playerTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.m },
  modalPlayerName: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold' },
  modalPlayerSub: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold', opacity: 0.6 },
  playerStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Theme.spacing.s,
  },
  pStatCell: { alignItems: 'center', flex: 1 },
  pStatVal: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold' },
  pStatLabel: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold', opacity: 0.6 },
  heatTitle: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold', marginBottom: 2 },
  heatmapContainer: {
    height: 120,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: '#0F223D',
    overflow: 'hidden',
    position: 'relative',
  },
  halfField: {
    position: 'absolute',
    right: 0,
    width: '50%',
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.2)',
  },
  centerGoalRing: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -25,
    marginTop: -25,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  hotspotNode: { position: 'absolute', filter: 'blur(8px)', opacity: 0.8 },
  modalCloseBtn: { width: '100%' },
});
