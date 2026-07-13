import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export default function EmergencyHelp() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  // Active tabs: 'DASHBOARD' | 'NAVIGATION' | 'GUIDE' | 'REPORT' | 'CHAT'
  const [activeTab, setActiveTab] = useState<
    'DASHBOARD' | 'NAVIGATION' | 'GUIDE' | 'REPORT' | 'CHAT'
  >('DASHBOARD');

  // SOS state
  const [sosActive, setSosActive] = useState(false);

  // Evacuation routing path selection
  const [selectedPath, setSelectedPath] = useState<'FASTEST' | 'ACCESSIBLE' | 'ALT'>('FASTEST');

  // Interactive report mock states
  const [reportType, setReportType] = useState('Suspicious Activity');
  const [description, setDescription] = useState('');
  const [submittedReports, setSubmittedReports] = useState<
    { id: string; type: string; status: string }[]
  >([]);

  // Emergency assistant messages
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: 'Emergency AI Response Hub active. Type your safety concern or tap an action.',
    },
  ]);

  // Pulse animation controller
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.8);

  useEffect(() => {
    pulseScale.value = withRepeat(withTiming(1.3, { duration: 1000 }), -1, true);
    pulseOpacity.value = withRepeat(withTiming(0.2, { duration: 1000 }), -1, true);
  }, []);

  const animatedSosPulse = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value }],
      opacity: pulseOpacity.value,
    };
  });

  const handleTriggerSOS = () => {
    setSosActive(true);
    showAlert(
      'SOS Broadcasted',
      'Your location has been shared with MetLife Stadium Command Center. Medical & Security teams have been dispatched.'
    );
  };

  const handleSendReport = () => {
    if (!description.trim()) {
      showAlert('Error', 'Please enter details of the incident.');
      return;
    }
    const newReport = {
      id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
      type: reportType,
      status: 'DISPATCHING TEAM',
    };
    setSubmittedReports((prev) => [newReport, ...prev]);
    setDescription('');
    showAlert('Incident Filed', `Report #${newReport.id} logged. Stadium control is responding.`);
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let answer =
        'Command center notified. Stay calm. If you require medical care, please head to First Aid at Gate B.';
      if (lower.includes('cpr')) {
        answer =
          'To perform CPR: Push hard and fast in the center of the chest (100-120 compressions/min). Call help immediately.';
      } else if (lower.includes('heat') || lower.includes('stroke') || lower.includes('hot')) {
        answer =
          'Heat Stroke: Move the person to a cool area, apply damp cloths, and sip water. Dispatched medical patrol.';
      } else if (lower.includes('fire')) {
        answer =
          'Fire detected. Alerting fire wardens. Evacuate via the nearest illuminated Exit Gate C.';
      } else if (lower.includes('lost') || lower.includes('child')) {
        answer =
          'Child safety alert registered. Security squad is searching Gate D. Please meet at the Gate D Information Desk.';
      }
      setChatMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
    }, 1000);
  };

  const showAlert = (title: string, msg: string) => {
    if (Platform.OS === 'web') {
      alert(`${title}\n\n${msg}`);
    } else {
      Alert.alert(title, msg);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title={sosActive ? '⚠️ EMERGENCY DISPATCH ACTIVE' : 'Crowd Safety & SOS'} />

      {/* Live Safety Announcement Bar */}
      <View style={[styles.alertBar, { backgroundColor: '#D32F2F' }]}>
        <MaterialCommunityIcons name="bullhorn-outline" size={18} color="#FFFFFF" />
        <Text style={styles.alertBarText}>
          Warning: Congestion near Gate A. Please use Gate C for exits.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Navigation Tabs */}
        <View style={styles.tabsRow}>
          {(['DASHBOARD', 'NAVIGATION', 'GUIDE', 'REPORT', 'CHAT'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabBtn,
                activeTab === tab && [styles.activeTab, { borderBottomColor: themeColors.tint }],
              ]}>
              <Text
                style={[
                  styles.tabBtnText,
                  { color: activeTab === tab ? themeColors.text : themeColors.icon },
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'DASHBOARD' && (
          <View style={styles.tabContent}>
            {/* SOS Pulse Button Widget */}
            <GlassCard style={[styles.sosCard, { borderColor: '#EF5350' }]}>
              <View style={styles.pulseContainer}>
                <Animated.View style={[styles.pulseRing, animatedSosPulse]} />
                <TouchableOpacity
                  onPress={handleTriggerSOS}
                  activeOpacity={0.8}
                  style={styles.sosCircle}>
                  <Text style={styles.sosCircleText}>SOS</Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.sosCardTitle, { color: themeColors.text }]}>
                Emergency Broadcast Beacon
              </Text>
              <Text style={[styles.sosCardSub, { color: themeColors.icon }]}>
                Tap the SOS button to instantly summon emergency medics & security dispatchers
                directly to Section 112.
              </Text>
            </GlassCard>

            {/* Live Crowd Intelligence Metrics */}
            <GlassCard style={styles.metricsCard}>
              <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
                🏟 Live Crowd Intelligence
              </Text>
              <View style={styles.gridRow}>
                <View style={[styles.gridCell, { borderColor: themeColors.border }]}>
                  <Text style={[styles.cellVal, { color: '#00E676' }]}>Low</Text>
                  <Text style={[styles.cellLabel, { color: themeColors.icon }]}>Density</Text>
                </View>
                <View style={[styles.gridCell, { borderColor: themeColors.border }]}>
                  <Text style={[styles.cellVal, { color: '#FFD700' }]}>Moderate</Text>
                  <Text style={[styles.cellLabel, { color: themeColors.icon }]}>Congestion</Text>
                </View>
                <View style={[styles.gridCell, { borderColor: themeColors.border }]}>
                  <Text style={[styles.cellVal, { color: themeColors.text }]}>4.5 min</Text>
                  <Text style={[styles.cellLabel, { color: themeColors.icon }]}>
                    Est. Evacuation
                  </Text>
                </View>
              </View>

              <View style={[styles.locationDetails, { borderTopColor: themeColors.border }]}>
                <View style={styles.locItem}>
                  <MaterialCommunityIcons name="logout" size={16} color={themeColors.tint} />
                  <Text style={[styles.locText, { color: themeColors.text }]}>
                    Nearest Exit: Gate C (40m)
                  </Text>
                </View>
                <View style={styles.locItem}>
                  <MaterialCommunityIcons name="medical-bag" size={16} color="#00E676" />
                  <Text style={[styles.locText, { color: themeColors.text }]}>
                    Nearest Aid Station: Sec 110 (12m)
                  </Text>
                </View>
              </View>
            </GlassCard>
          </View>
        )}

        {activeTab === 'NAVIGATION' && (
          <View style={styles.tabContent}>
            {/* Map overlays */}
            <GlassCard style={styles.mapCard}>
              <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
                Emergency Evacuation Routing
              </Text>

              {/* Path Option selector buttons */}
              <View style={styles.pathSelectorRow}>
                <TouchableOpacity
                  onPress={() => setSelectedPath('FASTEST')}
                  style={[
                    styles.pathBtn,
                    selectedPath === 'FASTEST' && [
                      styles.activePathBtn,
                      { backgroundColor: themeColors.tint },
                    ],
                  ]}>
                  <Text
                    style={[
                      styles.pathBtnText,
                      { color: selectedPath === 'FASTEST' ? '#FFFFFF' : themeColors.text },
                    ]}>
                    Shortest Exit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedPath('ACCESSIBLE')}
                  style={[
                    styles.pathBtn,
                    selectedPath === 'ACCESSIBLE' && [
                      styles.activePathBtn,
                      { backgroundColor: themeColors.tint },
                    ],
                  ]}>
                  <Text
                    style={[
                      styles.pathBtnText,
                      { color: selectedPath === 'ACCESSIBLE' ? '#FFFFFF' : themeColors.text },
                    ]}>
                    Wheelchair Access
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedPath('ALT')}
                  style={[
                    styles.pathBtn,
                    selectedPath === 'ALT' && [
                      styles.activePathBtn,
                      { backgroundColor: themeColors.tint },
                    ],
                  ]}>
                  <Text
                    style={[
                      styles.pathBtnText,
                      { color: selectedPath === 'ALT' ? '#FFFFFF' : themeColors.text },
                    ]}>
                    Alt Route
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Graphic Mock map drawing */}
              <View style={[styles.mapGraphic, { borderColor: themeColors.border }]}>
                {/* Stadium exits */}
                <View style={[styles.exitGateNode, { left: '10%', top: '10%' }]}>
                  <Text style={styles.gateLabelText}>Gate A</Text>
                </View>
                <View style={[styles.exitGateNode, { right: '10%', bottom: '10%' }]}>
                  <Text style={styles.gateLabelText}>Gate C (Exit)</Text>
                </View>

                {/* User node */}
                <View style={[styles.userNode, { left: '40%', top: '50%' }]} />

                {/* SVG Polyline representing navigation route */}
                <View
                  style={[
                    styles.routePathLine,
                    {
                      left: '42%',
                      top: '52%',
                      width: selectedPath === 'FASTEST' ? '45%' : '52%',
                      height: 4,
                      backgroundColor: selectedPath === 'ACCESSIBLE' ? '#00E676' : themeColors.tint,
                    },
                  ]}
                />
              </View>

              <Text style={[styles.routeDescText, { color: themeColors.icon }]}>
                {selectedPath === 'FASTEST'
                  ? 'Follow the illuminated blue path to Gate C. Distance: 45 meters.'
                  : selectedPath === 'ACCESSIBLE'
                    ? 'Ramp accessible pathway leading to Elevator 2 & Exit Gate C.'
                    : 'Alternative path routing through South Corridor to bypass crowd density.'}
              </Text>
            </GlassCard>
          </View>
        )}

        {activeTab === 'GUIDE' && (
          <View style={styles.tabContent}>
            {/* Guides and Emergency Medical Aids */}
            <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
              Quick First Aid Protocols
            </Text>

            <GlassCard style={styles.guideCard}>
              <Text style={[styles.guideTitle, { color: themeColors.text }]}>
                ❤️ CPR Instructions
              </Text>
              <Text style={[styles.guideBody, { color: themeColors.icon }]}>
                1. Push hard and fast in the center of the chest.{'\n'}
                2. Maintain rate of 100 to 120 compressions per minute (e.g. rhythm of "Staying
                Alive").{'\n'}
                3. Allow chest to rise completely between compressions.
              </Text>
            </GlassCard>

            <GlassCard style={styles.guideCard}>
              <Text style={[styles.guideTitle, { color: themeColors.text }]}>
                ☀️ Heat Exhaustion & Stroke
              </Text>
              <Text style={[styles.guideBody, { color: themeColors.icon }]}>
                1. Relocate to an air-conditioned stadium zone (e.g. Concourses).{'\n'}
                2. Dampen shirt with cold water and fan the victim.{'\n'}
                3. Sip cool water slowly. Seek medical support if vomiting persists.
              </Text>
            </GlassCard>

            <GlassCard style={styles.guideCard}>
              <Text style={[styles.guideTitle, { color: themeColors.text }]}>
                🤕 Bleeding & Cuts
              </Text>
              <Text style={[styles.guideBody, { color: themeColors.icon }]}>
                1. Place direct pressure on the wound with a clean cloth.{'\n'}
                2. Keep the injured extremity elevated.{'\n'}
                3. Apply sterile bandages from nearby Gate B medical locker.
              </Text>
            </GlassCard>
          </View>
        )}

        {activeTab === 'REPORT' && (
          <View style={styles.tabContent}>
            {/* Incident Reports Submission */}
            <GlassCard style={styles.reportFormCard}>
              <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
                File Incident Report
              </Text>

              <Text style={[styles.inputLabel, { color: themeColors.text }]}>
                Choose Incident Category
              </Text>
              <View style={styles.incidentRow}>
                {['Suspicious Activity', 'Crowd Incident', 'Facilities Issue'].map((t) => (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setReportType(t)}
                    style={[
                      styles.incBtn,
                      { borderColor: themeColors.border },
                      reportType === t && {
                        backgroundColor: themeColors.tint,
                        borderColor: themeColors.tint,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.incBtnText,
                        { color: reportType === t ? '#FFFFFF' : themeColors.text },
                      ]}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text
                style={[
                  styles.inputLabel,
                  { color: themeColors.text, marginTop: Theme.spacing.m },
                ]}>
                Incident Details
              </Text>
              <TextInput
                style={[
                  styles.descInput,
                  {
                    color: themeColors.text,
                    borderColor: themeColors.border,
                    backgroundColor:
                      theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  },
                ]}
                placeholder="Enter description, location, or row details..."
                placeholderTextColor={themeColors.icon}
                value={description}
                onChangeText={setDescription}
                multiline
              />

              <PrimaryButton title="Submit Report to Security" onPress={handleSendReport} />
            </GlassCard>

            {submittedReports.length > 0 && (
              <View style={styles.historySection}>
                <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
                  Active Report Logs
                </Text>
                {submittedReports.map((rep) => (
                  <View
                    key={rep.id}
                    style={[
                      styles.reportRowCard,
                      { backgroundColor: themeColors.card, borderColor: themeColors.border },
                    ]}>
                    <View style={styles.repRowHeader}>
                      <Text style={[styles.repIdText, { color: themeColors.text }]}>
                        {rep.id} • {rep.type}
                      </Text>
                      <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>{rep.status}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {activeTab === 'CHAT' && (
          <View style={styles.tabContent}>
            {/* Assistant Chatbot Integration */}
            <GlassCard style={styles.chatCard}>
              <ScrollView
                style={styles.chatScroll}
                contentContainerStyle={styles.chatContentContainer}>
                {chatMessages.map((msg, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.chatBubble,
                      msg.role === 'user'
                        ? [styles.userBubble, { backgroundColor: themeColors.tint }]
                        : [styles.botBubble, { backgroundColor: themeColors.border }],
                    ]}>
                    <Text
                      style={{
                        color: msg.role === 'user' ? '#FFFFFF' : themeColors.text,
                        fontSize: Theme.typography.sizes.s,
                      }}>
                      {msg.text}
                    </Text>
                  </View>
                ))}
              </ScrollView>

              <View style={[styles.chatInputRow, { borderTopColor: themeColors.border }]}>
                <TextInput
                  style={[
                    styles.chatTextInput,
                    { color: themeColors.text, borderColor: themeColors.border },
                  ]}
                  placeholder="Ask Emergency AI assistant..."
                  placeholderTextColor={themeColors.icon}
                  value={chatInput}
                  onChangeText={setChatInput}
                />
                <TouchableOpacity
                  onPress={handleSendChatMessage}
                  style={[styles.sendBtn, { backgroundColor: themeColors.tint }]}>
                  <MaterialCommunityIcons name="send" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </GlassCard>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  alertBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.s,
    paddingVertical: 10,
    paddingHorizontal: Theme.spacing.l,
  },
  alertBarText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 10 },
  content: { padding: Theme.spacing.l, paddingBottom: 100 },

  tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Theme.spacing.m },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Theme.spacing.s,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomWidth: 2 },
  tabBtnText: { fontSize: 9, fontWeight: 'bold' },
  tabContent: { gap: Theme.spacing.m },

  sosCard: { padding: Theme.spacing.l, alignItems: 'center', borderWidth: 1, gap: Theme.spacing.m },
  pulseContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pulseRing: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(239, 83, 80, 0.4)',
  },
  sosCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EF5350',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  sosCircleText: { color: '#FFFFFF', fontWeight: '900', fontSize: Theme.typography.sizes.m },
  sosCardTitle: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold' },
  sosCardSub: { fontSize: Theme.typography.sizes.s - 2, textAlign: 'center', lineHeight: 18 },

  metricsCard: { padding: Theme.spacing.m, borderRadius: 20, gap: Theme.spacing.m },
  sectionHeading: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', gap: Theme.spacing.s },
  gridCell: {
    flex: 1,
    paddingVertical: Theme.spacing.s,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
  },
  cellVal: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  cellLabel: { fontSize: 8, fontWeight: 'bold', opacity: 0.6 },
  locationDetails: { borderTopWidth: 1, paddingTop: Theme.spacing.s, gap: Theme.spacing.s },
  locItem: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.s },
  locText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },

  mapCard: { padding: Theme.spacing.m, borderRadius: 20, gap: Theme.spacing.m },
  pathSelectorRow: { flexDirection: 'row', justifyContent: 'space-between', gap: Theme.spacing.s },
  pathBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activePathBtn: { borderRadius: 12 },
  pathBtnText: { fontSize: 9, fontWeight: 'bold' },
  mapGraphic: {
    height: 160,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#0C1C2F',
    position: 'relative',
    overflow: 'hidden',
  },
  exitGateNode: {
    position: 'absolute',
    backgroundColor: '#EF5350',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  gateLabelText: { color: '#FFFFFF', fontSize: 8, fontWeight: 'bold' },
  userNode: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00E676',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  routePathLine: { position: 'absolute', borderRadius: 2, zIndex: 1 },
  routeDescText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold', opacity: 0.6 },

  guideCard: { padding: Theme.spacing.m, borderRadius: 20, gap: 6 },
  guideTitle: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  guideBody: { fontSize: Theme.typography.sizes.s - 2, lineHeight: 18 },

  reportFormCard: { padding: Theme.spacing.m, borderRadius: 20, gap: Theme.spacing.s },
  inputLabel: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  incidentRow: { flexDirection: 'row', justifyContent: 'space-between', gap: Theme.spacing.s },
  incBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12, borderWidth: 1 },
  incBtnText: { fontSize: 8, fontWeight: 'bold' },
  descInput: {
    padding: Theme.spacing.m,
    borderRadius: 16,
    borderWidth: 1,
    fontSize: Theme.typography.sizes.s,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: Theme.spacing.s,
  },

  historySection: { gap: Theme.spacing.s },
  reportRowCard: { padding: Theme.spacing.m, borderRadius: 16, borderWidth: 1 },
  repRowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  repIdText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  statusBadge: {
    backgroundColor: '#FF704333',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: { color: '#FF7043', fontSize: 8, fontWeight: 'bold' },

  chatCard: {
    padding: Theme.spacing.m,
    borderRadius: 20,
    height: 260,
    justifyContent: 'space-between',
  },
  chatScroll: { flex: 1, marginBottom: Theme.spacing.s },
  chatContentContainer: { gap: Theme.spacing.s },
  chatBubble: { padding: Theme.spacing.m, borderRadius: 16, maxWidth: '80%' },
  userBubble: { alignSelf: 'flex-end' },
  botBubble: { alignSelf: 'flex-start' },
  chatInputRow: {
    borderTopWidth: 1,
    paddingTop: Theme.spacing.s,
    flexDirection: 'row',
    gap: Theme.spacing.s,
  },
  chatTextInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: Theme.spacing.m,
    height: 38,
    fontSize: Theme.typography.sizes.s - 2,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
