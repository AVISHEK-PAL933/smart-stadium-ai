import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';


type NotifChannel = 'All Fans' | 'Section A' | 'VIP' | 'Staff' | 'Emergency';
type NotifType = 'Info' | 'Warning' | 'Emergency' | 'Promo';

interface Notification {
  id: string;
  title: string;
  message: string;
  channel: NotifChannel;
  type: NotifType;
  time: string;
  reach: number;
  opened: number;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 'N001',
    title: 'Half-Time Show Announcement',
    message:
      "Don't miss the spectacular half-time performance starting in 5 minutes at the main stage!",
    channel: 'All Fans',
    type: 'Info',
    time: '15m ago',
    reach: 78450,
    opened: 62100,
  },
  {
    id: 'N002',
    title: 'East Wing Crowd Warning',
    message: 'East Wing is at 99% capacity. Please use alternative exits via North Gate.',
    channel: 'Section A',
    type: 'Warning',
    time: '22m ago',
    reach: 18000,
    opened: 17200,
  },
  {
    id: 'N003',
    title: 'VIP Lounge Happy Hour',
    message: 'Enjoy 30% off all premium beverages in the VIP Lounge until 17:00.',
    channel: 'VIP',
    type: 'Promo',
    time: '45m ago',
    reach: 1940,
    opened: 1650,
  },
  {
    id: 'N004',
    title: 'Emergency Assembly Point',
    message: 'All staff: Report to emergency assembly point for briefing.',
    channel: 'Staff',
    type: 'Emergency',
    time: '1h ago',
    reach: 1240,
    opened: 1238,
  },
];

const TYPE_CONFIG: Record<NotifType, { color: string; icon: string }> = {
  Info: { color: '#00C8FF', icon: 'information' },
  Warning: { color: '#FFC107', icon: 'alert' },
  Emergency: { color: '#FF5252', icon: 'alert-octagon' },
  Promo: { color: '#00E676', icon: 'tag' },
};

const CHANNEL_CONFIG: Record<NotifChannel, { color: string }> = {
  'All Fans': { color: '#00C8FF' },
  'Section A': { color: '#7C4DFF' },
  VIP: { color: '#FFC107' },
  Staff: { color: '#00E676' },
  Emergency: { color: '#FF5252' },
};

export default function NotificationCenter() {
  const { theme, themeColors } = useGlobalContext();
  const [tab, setTab] = useState<'history' | 'compose'>('history');
  const [composeTitle, setComposeTitle] = useState('');
  const [composeMsg, setComposeMsg] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<NotifChannel>('All Fans');
  const [selectedType, setSelectedType] = useState<NotifType>('Info');

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['rgba(255,193,7,0.12)', 'transparent']} style={styles.bgGrad} />

      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Notification Center</Text>
          <Text style={[styles.headerSub, { color: themeColors.icon }]}>Broadcasts & Alerts</Text>
        </View>
        <View
          style={[styles.notifBadge, { backgroundColor: '#FFC10722', borderColor: '#FFC10744' }]}>
          <Text style={[styles.notifBadgeText, { color: '#FFC107' }]}>{NOTIFICATIONS.length}</Text>
        </View>
      </Animated.View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.statsRow}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <Text style={[styles.statValue, { color: '#FFC107' }]}>{NOTIFICATIONS.length}</Text>
            <Text style={[styles.statLabel, { color: themeColors.icon }]}>Sent Today</Text>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <Text style={[styles.statValue, { color: '#00E676' }]}>94.2%</Text>
            <Text style={[styles.statLabel, { color: themeColors.icon }]}>Open Rate</Text>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <Text style={[styles.statValue, { color: '#00C8FF' }]}>78K</Text>
            <Text style={[styles.statLabel, { color: themeColors.icon }]}>Fans Reached</Text>
          </View>
        </Animated.View>

        {/* Tabs */}
        <Animated.View entering={FadeInUp.delay(150)} style={styles.tabRow}>
          {(['history', 'compose'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={[
                styles.tabBtn,
                {
                  backgroundColor: tab === t ? '#FFC107' : themeColors.card,
                  borderColor: tab === t ? '#FFC107' : themeColors.border,
                },
              ]}>
              <Text style={[styles.tabText, { color: tab === t ? '#000' : themeColors.text }]}>
                {t === 'history' ? '📋 Sent History' : '✍️ Compose'}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* History */}
        {tab === 'history' && (
          <View style={styles.list}>
            {NOTIFICATIONS.map((notif, i) => {
              const typeCfg = TYPE_CONFIG[notif.type];
              const chanCfg = CHANNEL_CONFIG[notif.channel];
              const openRate = Math.round((notif.opened / notif.reach) * 100);
              return (
                <Animated.View key={notif.id} entering={FadeInDown.delay(200 + i * 50)}>
                  <View
                    style={[
                      styles.notifCard,
                      { backgroundColor: themeColors.card, borderColor: `${typeCfg.color}33` },
                    ]}>
                    <LinearGradient
                      colors={[`${typeCfg.color}10`, 'transparent']}
                      style={styles.notifGrad}
                    />
                    <View style={styles.notifHeader}>
                      <MaterialCommunityIcons
                        name={typeCfg.icon as any}
                        size={18}
                        color={typeCfg.color}
                      />
                      <Text style={[styles.notifTitle, { color: themeColors.text }]}>
                        {notif.title}
                      </Text>
                      <View style={[styles.typePill, { backgroundColor: `${typeCfg.color}22` }]}>
                        <Text style={[styles.typeText, { color: typeCfg.color }]}>
                          {notif.type}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.notifMsg, { color: themeColors.icon }]} numberOfLines={2}>
                      {notif.message}
                    </Text>
                    <View style={styles.notifFooter}>
                      <View style={[styles.channelPill, { backgroundColor: `${chanCfg.color}22` }]}>
                        <Text style={[styles.channelText, { color: chanCfg.color }]}>
                          → {notif.channel}
                        </Text>
                      </View>
                      <Text style={[styles.notifTime, { color: themeColors.icon }]}>
                        {notif.time}
                      </Text>
                    </View>
                    <View style={styles.openRateRow}>
                      <Text style={[styles.openRateLabel, { color: themeColors.icon }]}>
                        Open Rate
                      </Text>
                      <View style={[styles.openBarBg, { backgroundColor: `${typeCfg.color}22` }]}>
                        <View
                          style={[
                            styles.openBarFill,
                            { width: `${openRate}%`, backgroundColor: typeCfg.color },
                          ]}
                        />
                      </View>
                      <Text style={[styles.openRatePct, { color: typeCfg.color }]}>
                        {openRate}%
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        )}

        {/* Compose */}
        {tab === 'compose' && (
          <Animated.View entering={FadeInUp.delay(200)}>
            <View
              style={[
                styles.composeCard,
                { backgroundColor: themeColors.card, borderColor: themeColors.border },
              ]}>
              <Text style={[styles.composeLabel, { color: themeColors.text }]}>
                Notification Title
              </Text>
              <TextInput
                value={composeTitle}
                onChangeText={setComposeTitle}
                placeholder="Enter notification title..."
                placeholderTextColor={themeColors.icon}
                style={[
                  styles.composeInput,
                  { color: themeColors.text, borderColor: themeColors.border },
                ]}
              />

              <Text style={[styles.composeLabel, { color: themeColors.text }]}>Message</Text>
              <TextInput
                value={composeMsg}
                onChangeText={setComposeMsg}
                placeholder="Type your message here..."
                placeholderTextColor={themeColors.icon}
                multiline
                numberOfLines={4}
                style={[
                  styles.composeTextArea,
                  { color: themeColors.text, borderColor: themeColors.border },
                ]}
              />

              <Text style={[styles.composeLabel, { color: themeColors.text }]}>Channel</Text>
              <View style={styles.chipRow}>
                {(['All Fans', 'Section A', 'VIP', 'Staff', 'Emergency'] as NotifChannel[]).map(
                  (ch) => {
                    const col = CHANNEL_CONFIG[ch].color;
                    return (
                      <TouchableOpacity
                        key={ch}
                        onPress={() => setSelectedChannel(ch)}
                        style={[
                          styles.chip,
                          {
                            backgroundColor: selectedChannel === ch ? col : `${col}22`,
                            borderColor: `${col}44`,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.chipText,
                            { color: selectedChannel === ch ? '#000' : col },
                          ]}>
                          {ch}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>

              <Text style={[styles.composeLabel, { color: themeColors.text }]}>Type</Text>
              <View style={styles.chipRow}>
                {(['Info', 'Warning', 'Emergency', 'Promo'] as NotifType[]).map((t) => {
                  const col = TYPE_CONFIG[t].color;
                  return (
                    <TouchableOpacity
                      key={t}
                      onPress={() => setSelectedType(t)}
                      style={[
                        styles.chip,
                        {
                          backgroundColor: selectedType === t ? col : `${col}22`,
                          borderColor: `${col}44`,
                        },
                      ]}>
                      <MaterialCommunityIcons
                        name={TYPE_CONFIG[t].icon as any}
                        size={12}
                        color={selectedType === t ? '#000' : col}
                      />
                      <Text style={[styles.chipText, { color: selectedType === t ? '#000' : col }]}>
                        {t}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity style={[styles.sendBtn, { backgroundColor: '#FFC107' }]}>
                <MaterialCommunityIcons name="send" size={18} color="#000" />
                <Text style={styles.sendText}>Send Notification</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 200 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.l,
    paddingTop: 56,
    paddingBottom: Theme.spacing.m,
    gap: Theme.spacing.m,
  },
  backBtn: { padding: 4 },
  headerCenter: { flex: 1 },
  headerTitle: { fontSize: Theme.typography.sizes.l, fontWeight: '900' },
  headerSub: { fontSize: Theme.typography.sizes.s, marginTop: 2 },
  notifBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: { fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  scrollContent: { paddingHorizontal: Theme.spacing.l, paddingBottom: 100 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: Theme.spacing.l },
  statCard: {
    flex: 1,
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    alignItems: 'center',
    gap: 4,
  },
  statValue: { fontSize: Theme.typography.sizes.m, fontWeight: '900' },
  statLabel: { fontSize: 10, textAlign: 'center' },
  tabRow: { flexDirection: 'row', gap: 10, marginBottom: Theme.spacing.l },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
  tabText: { fontSize: Theme.typography.sizes.s, fontWeight: '700' },
  list: { gap: 12 },
  notifCard: {
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    padding: Theme.spacing.m,
    overflow: 'hidden',
    gap: 8,
  },
  notifGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 60 },
  notifHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  notifTitle: { flex: 1, fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  typePill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  typeText: { fontSize: 10, fontWeight: '700' },
  notifMsg: { fontSize: 12, lineHeight: 18 },
  notifFooter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  channelPill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  channelText: { fontSize: 11, fontWeight: '700' },
  notifTime: { flex: 1, textAlign: 'right', fontSize: 11 },
  openRateRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  openRateLabel: { width: 65, fontSize: 11 },
  openBarBg: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  openBarFill: { height: '100%', borderRadius: 3 },
  openRatePct: { width: 36, textAlign: 'right', fontSize: 11, fontWeight: '700' },
  composeCard: {
    borderRadius: Theme.shapes.borderRadius.l,
    borderWidth: 1,
    padding: Theme.spacing.l,
    gap: 12,
  },
  composeLabel: { fontSize: Theme.typography.sizes.s, fontWeight: '700', marginBottom: -4 },
  composeInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: Theme.typography.sizes.s,
  },
  composeTextArea: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: Theme.typography.sizes.s,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: { fontSize: 12, fontWeight: '700' },
  sendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 4,
  },
  sendText: { color: '#000', fontSize: Theme.typography.sizes.m, fontWeight: '900' },
});
