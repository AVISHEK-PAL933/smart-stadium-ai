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

interface IncidentButton {
  id: string;
  title: string;
  icon: string;
  color: string;
}

export default function EmergencyHelp() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  // Active tab selection
  const [activeTab, setActiveTab] = useState<
    'DASHBOARD' | 'NAVIGATION' | 'GUIDE' | 'REPORT' | 'CHAT'
  >('DASHBOARD');

  // Emergency States
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(10);
  const [activeIncidentDispatch, setActiveIncidentDispatch] = useState<string | null>(null);

  // Evacuation route selection
  const [selectedPath, setSelectedPath] = useState<'FASTEST' | 'ACCESSIBLE' | 'ALT'>('FASTEST');

  // Report fields
  const [reportType, setReportType] = useState('Suspicious Activity'); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [description, setDescription] = useState('');
  const [submittedReports, setSubmittedReports] = useState<
    { id: string; type: string; status: string }[]
  >([{ id: 'REP-7421', type: 'Crowd Incident', status: 'RESPONDERS ON SCENE' }]);

  // Chat integration
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: 'Stadium Emergency Response Center is online. Type a safety concern or tap an emergency action above.',
    },
  ]);

  // Countdown timer for SOS dispatch
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosActive && sosCountdown > 0) {
      timer = setTimeout(() => {
        setSosCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [sosActive, sosCountdown]);

  const handleTriggerSOS = () => {
    setSosActive(true);
    setSosCountdown(10);
    setActiveIncidentDispatch('SOS General Alarm');
    showAlert(
      'SOS Broadcasted',
      'SOS signal transmitted. Responders have been dispatched to Sec 112, Row M, Seat 42.'
    );
  };

  const handleTriggerIncident = (incident: IncidentButton) => {
    setActiveIncidentDispatch(incident.title);
    setSosActive(true);
    setSosCountdown(10);

    // Add to submitted reports
    const newRep = {
      id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
      type: incident.title,
      status: 'DISPATCHED',
    };
    setSubmittedReports((prev) => [newRep, ...prev]);

    showAlert(
      `${incident.title} Dispatched`,
      `A dispatch ticket has been opened for ${incident.title} at your seat Section 112.`
    );
  };

  const handleCancelSOS = () => {
    setSosActive(false);
    setActiveIncidentDispatch(null);
    showAlert('SOS Cancelled', 'The emergency signal was cancelled.');
  };

  const handleSendReport = () => {
    if (!description.trim()) {
      showAlert('Error', 'Please describe the incident.');
      return;
    }
    const newReport = {
      id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
      type: reportType,
      status: 'DISPATCHING TEAM',
    };
    setSubmittedReports((prev) => [newReport, ...prev]);
    setDescription('');
    showAlert('Incident Logged', `Report #${newReport.id} logged. Security desk is reviewing.`);
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

  const INCIDENT_ACTIONS: IncidentButton[] = [
    { id: 'med', title: 'Medical Emergency', icon: 'medical-bag', color: '#EF5350' },
    { id: 'sec', title: 'Security Incident', icon: 'police-badge', color: '#42A5F5' },
    { id: 'fire', title: 'Fire Alert', icon: 'fire', color: '#FF7043' },
    { id: 'child', title: 'Lost Child', icon: 'account-child', color: '#AB47BC' },
    { id: 'item', title: 'Lost Item', icon: 'wallet-giftcard', color: '#FFA726' },
    { id: 'susp', title: 'Suspicious Activity', icon: 'eye-outline', color: '#26A69A' },
    { id: 'crowd', title: 'Crowd Incident', icon: 'account-group-outline', color: '#78909C' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Crowd Safety & SOS" />

      {/* Dispatch status bar */}
      {sosActive && (
        <View style={styles.alertBanner}>
          <MaterialCommunityIcons name="alert-decagram" size={20} color="#FFFFFF" />
          <Text style={styles.alertBannerText}>
            ACTIVE DISPATCH: {activeIncidentDispatch} • ETA {sosCountdown}s
          </Text>
          <TouchableOpacity onPress={handleCancelSOS} style={styles.cancelBannerBtn}>
            <Text style={styles.cancelBtnText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      )}

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
            {/* SOS Trigger Card */}
            <GlassCard
              style={[
                styles.sosCard,
                sosActive && { borderColor: '#EF5350', backgroundColor: 'rgba(239, 83, 80, 0.1)' },
              ]}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleTriggerSOS}
                style={[styles.sosCircle, sosActive && { backgroundColor: '#B71C1C' }]}>
                <Text style={styles.sosCircleText}>{sosActive ? 'ALERTING' : 'SOS'}</Text>
              </TouchableOpacity>
              <Text style={[styles.sosCardTitle, { color: themeColors.text }]}>
                {sosActive ? 'DISPATCHING RESPONDERS' : 'Broadcast SOS Signal'}
              </Text>
              <Text style={[styles.sosCardSub, { color: themeColors.icon }]}>
                {sosActive
                  ? 'Responders are navigating to Section 112, Row M, Seat 42.'
                  : 'Tap to instantly alert medical, security, and safety wardens to your seat location.'}
              </Text>
            </GlassCard>

            {/* Incident Types Grid */}
            <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
              Report Specific Emergencies
            </Text>
            <View style={styles.incidentsGrid}>
              {INCIDENT_ACTIONS.map((incident) => (
                <TouchableOpacity
                  key={incident.id}
                  activeOpacity={0.8}
                  onPress={() => handleTriggerIncident(incident)}
                  style={[
                    styles.incidentCardBtn,
                    { backgroundColor: themeColors.card, borderColor: themeColors.border },
                  ]}>
                  <View
                    style={[styles.iconWrapperCircle, { backgroundColor: incident.color + '20' }]}>
                    <MaterialCommunityIcons
                      name={incident.icon as any}
                      size={24}
                      color={incident.color}
                    />
                  </View>
                  <Text
                    style={[styles.incidentCardTitle, { color: themeColors.text }]}
                    numberOfLines={1}>
                    {incident.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Live Crowd Intelligence Metrics */}
            <GlassCard style={styles.metricsCard}>
              <Text
                style={[
                  styles.sectionHeading,
                  { color: themeColors.text, marginBottom: Theme.spacing.s },
                ]}>
                🏟 Live Crowd Stats
              </Text>
              <View style={styles.gridRow}>
                <View style={[styles.gridCell, { borderColor: themeColors.border }]}>
                  <Text style={[styles.cellVal, { color: '#00E676' }]}>Low</Text>
                  <Text style={[styles.cellLabel, { color: themeColors.icon }]}>Crowd Density</Text>
                </View>
                <View style={[styles.gridCell, { borderColor: themeColors.border }]}>
                  <Text style={[styles.cellVal, { color: '#FFD700' }]}>Moderate</Text>
                  <Text style={[styles.cellLabel, { color: themeColors.icon }]}>Congestion</Text>
                </View>
                <View style={[styles.gridCell, { borderColor: themeColors.border }]}>
                  <Text style={[styles.cellVal, { color: themeColors.text }]}>4.5 min</Text>
                  <Text style={[styles.cellLabel, { color: themeColors.icon }]}>Evac Duration</Text>
                </View>
              </View>
            </GlassCard>
          </View>
        )}

        {activeTab === 'NAVIGATION' && (
          <View style={styles.tabContent}>
            <GlassCard style={styles.mapCard}>
              <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
                Emergency Evacuation Route
              </Text>

              <View style={styles.pathSelectorRow}>
                {(['FASTEST', 'ACCESSIBLE', 'ALT'] as const).map((path) => (
                  <TouchableOpacity
                    key={path}
                    onPress={() => setSelectedPath(path)}
                    style={[
                      styles.pathBtn,
                      selectedPath === path && [
                        styles.activePathBtn,
                        { backgroundColor: themeColors.tint },
                      ],
                    ]}>
                    <Text
                      style={[
                        styles.pathBtnText,
                        { color: selectedPath === path ? '#FFFFFF' : themeColors.text },
                      ]}>
                      {path}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={[styles.mapGraphic, { borderColor: themeColors.border }]}>
                <View style={[styles.exitGateNode, { left: '10%', top: '10%' }]}>
                  <Text style={styles.gateLabelText}>Gate A</Text>
                </View>
                <View style={[styles.exitGateNode, { right: '10%', bottom: '10%' }]}>
                  <Text style={styles.gateLabelText}>Gate C (Exit)</Text>
                </View>
                <View style={[styles.userNode, { left: '40%', top: '50%' }]} />

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
                  ? 'Follow the green exits signs directly to Gate C. Evacuation clearway.'
                  : selectedPath === 'ACCESSIBLE'
                    ? 'Wheelchair elevator access corridor mapping to Gate C level.'
                    : 'Secondary path avoiding the central concourse lines.'}
              </Text>
            </GlassCard>
          </View>
        )}

        {activeTab === 'GUIDE' && (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
              Emergency Medical Guides
            </Text>
            <GlassCard style={styles.guideCard}>
              <Text style={[styles.guideTitle, { color: themeColors.text }]}>
                ❤️ CPR Resuscitation
              </Text>
              <Text style={[styles.guideBody, { color: themeColors.icon }]}>
                1. Push chest center hard and fast.{'\n'}
                2. Keep pace of 100-120 compressions per minute.{'\n'}
                3. Perform Rescue Breaths if trained.
              </Text>
            </GlassCard>

            <GlassCard style={styles.guideCard}>
              <Text style={[styles.guideTitle, { color: themeColors.text }]}>
                ☀️ Heat Stroke Relief
              </Text>
              <Text style={[styles.guideBody, { color: themeColors.icon }]}>
                1. Relocate to a cold concourse booth.{'\n'}
                2. Apply cool wet clothes to wrists and neck.{'\n'}
                3. Sip water slowly. Do not gulp.
              </Text>
            </GlassCard>
          </View>
        )}

        {activeTab === 'REPORT' && (
          <View style={styles.tabContent}>
            <GlassCard style={styles.reportFormCard}>
              <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
                Log Security Concern
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
                placeholder="Describe suspicious activity or crowd hazard details here..."
                placeholderTextColor={themeColors.icon}
                value={description}
                onChangeText={setDescription}
                multiline
              />

              <PrimaryButton title="File Incident Log" onPress={handleSendReport} />
            </GlassCard>

            {submittedReports.length > 0 && (
              <View style={styles.historySection}>
                <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
                  Active Report Tickets
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
                  placeholder="Ask for first aid guides..."
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
  alertBanner: {
    backgroundColor: '#D32F2F',
    padding: Theme.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  alertBannerText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 10, flex: 1 },
  cancelBannerBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cancelBtnText: { color: '#D32F2F', fontSize: 9, fontWeight: '900' },

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

  sosCard: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    gap: Theme.spacing.m,
    borderRadius: 24,
  },
  sosCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#EF5350',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  sosCircleText: { color: '#FFFFFF', fontWeight: '900', fontSize: Theme.typography.sizes.l },
  sosCardTitle: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold', marginTop: 4 },
  sosCardSub: { fontSize: Theme.typography.sizes.s - 2, textAlign: 'center', lineHeight: 18 },

  sectionHeading: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  incidentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.s,
    justifyContent: 'space-between',
  },
  incidentCardBtn: {
    width: '48%',
    padding: Theme.spacing.m,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    gap: 8,
    marginBottom: Theme.spacing.s,
  },
  iconWrapperCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incidentCardTitle: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },

  metricsCard: { padding: Theme.spacing.m, borderRadius: 20, gap: Theme.spacing.m },
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
