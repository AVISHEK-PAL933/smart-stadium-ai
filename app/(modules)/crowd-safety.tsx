import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { Theme } from '../../constants/theme';
import { ZoneDensityCard } from '../../components/crowd-safety/ZoneDensityCard';
import { AlertCard } from '../../components/crowd-safety/AlertCard';
import { CameraCard } from '../../components/crowd-safety/CameraCard';
import { AIRecommendationBubble } from '../../components/crowd-safety/AIRecommendationBubble';
import {
  STADIUM_ZONES,
  EMERGENCY_ALERTS,
  INCIDENT_RECORDS,
  CAMERA_FEEDS,
  EMERGENCY_CONTACTS,
  AI_RECOMMENDATIONS,
  NOTIFICATIONS,
  PREDICTIONS,
  StadiumZone,
  EmergencyAlert,
  NotificationItem,
  PredictionItem,
} from '../../data/crowdSafetyData';

// ─── Tab type ─────────────────────────────────────────────────────────────────

type Tab = 'OVERVIEW' | 'HEATMAP' | 'ALERTS' | 'CAMERAS' | 'EVACUATE' | 'CONTACTS';

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: 'OVERVIEW',  icon: 'view-dashboard-outline', label: 'Overview'  },
  { id: 'HEATMAP',   icon: 'map-marker-radius',       label: 'Heatmap'   },
  { id: 'ALERTS',    icon: 'alert-circle-outline',    label: 'Alerts'    },
  { id: 'CAMERAS',   icon: 'cctv',                   label: 'Cameras'   },
  { id: 'EVACUATE',  icon: 'exit-run',               label: 'Evacuate'  },
  { id: 'CONTACTS',  icon: 'phone-dial-outline',      label: 'Contacts'  },
];

// ─── Heatmap zone positions (relative 0..1) ───────────────────────────────────

const HEATMAP_ZONES = [
  { id: 'ns', label: 'North\nStand',  cx: 0.50, cy: 0.10, density: 'busy'        as const, r: 0.12 },
  { id: 'ss', label: 'South\nStand',  cx: 0.50, cy: 0.88, density: 'safe'        as const, r: 0.12 },
  { id: 'es', label: 'East\nStand',   cx: 0.88, cy: 0.50, density: 'overcrowded' as const, r: 0.12 },
  { id: 'ws', label: 'West\nStand',   cx: 0.12, cy: 0.50, density: 'busy'        as const, r: 0.12 },
  { id: 'vip',label: 'VIP',           cx: 0.50, cy: 0.38, density: 'safe'        as const, r: 0.08 },
  { id: 'fc', label: 'Food\nCourt',   cx: 0.72, cy: 0.22, density: 'overcrowded' as const, r: 0.09 },
  { id: 'pk', label: 'Parking',       cx: 0.15, cy: 0.85, density: 'busy'        as const, r: 0.08 },
  { id: 'eg', label: 'Gate',          cx: 0.50, cy: 0.60, density: 'overcrowded' as const, r: 0.06 },
];

const HEATMAP_COLORS: Record<string, string> = {
  safe:        '#00E676',
  busy:        '#FFC107',
  overcrowded: '#FF5252',
};

// ─── Evacuation exit config ───────────────────────────────────────────────────

interface ExitState { id: string; label: string; open: boolean; capacity: number }

const INITIAL_EXITS: ExitState[] = [
  { id: 'ex1', label: 'Exit 1 — North',  open: true,  capacity: 800  },
  { id: 'ex2', label: 'Exit 2 — South',  open: true,  capacity: 800  },
  { id: 'ex3', label: 'Exit 3 — East',   open: false, capacity: 1000 },
  { id: 'ex4', label: 'Exit 4 — West',   open: true,  capacity: 600  },
  { id: 'ex5', label: 'Exit 5 — VIP',    open: true,  capacity: 200  },
  { id: 'ex6', label: 'Exit 6 — Gate B', open: false, capacity: 1200 },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function CrowdSafety() {
  const [activeTab, setActiveTab] = useState<Tab>('OVERVIEW');

  // Dynamic zone data
  const [zones, setZones] = useState<StadiumZone[]>(STADIUM_ZONES);
  // Dynamic alerts
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(EMERGENCY_ALERTS);
  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  // Exits
  const [exits, setExits] = useState<ExitState[]>(INITIAL_EXITS);
  // Emergency mode
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Heatmap pulsing
  const pulseAnims = useRef(HEATMAP_ZONES.map(() => new Animated.Value(1))).current;

  // Simulate live zone updates every 5 s
  useEffect(() => {
    const timer = setInterval(() => {
      setZones((prev) =>
        prev.map((z) => {
          const delta = Math.floor(Math.random() * 120) - 60;
          const newOcc = Math.max(0, Math.min(z.capacity, z.occupancy + delta));
          const pct = newOcc / z.capacity;
          return {
            ...z,
            occupancy: newOcc,
            density:
              pct >= 0.9 ? 'overcrowded' : pct >= 0.75 ? 'busy' : 'safe',
            trend: delta > 20 ? 'rising' : delta < -20 ? 'falling' : 'stable',
          };
        })
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Animate heatmap pulses
  useEffect(() => {
    HEATMAP_ZONES.forEach((z, i) => {
      if (z.density === 'overcrowded') {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnims[i], { toValue: 1.35, duration: 900, useNativeDriver: true }),
            Animated.timing(pulseAnims[i], { toValue: 1,    duration: 900, useNativeDriver: true }),
          ])
        ).start();
      }
    });
  }, [pulseAnims]);

  // Simulate incoming notification every 12 s
  useEffect(() => {
    const timer = setInterval(() => {
      const newNote: NotificationItem = {
        id:        `n_live_${Date.now()}`,
        message:   'AI: Crowd flow deviation detected — East concourse.',
        type:      'alert',
        timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        read:      false,
      };
      setNotifications((prev) => [newNote, ...prev.slice(0, 14)]);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleResolveAlert = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'resolved' } : a))
    );
  }, []);

  const handleToggleExit = useCallback((id: string) => {
    setExits((prev) =>
      prev.map((e) => (e.id === id ? { ...e, open: !e.open } : e))
    );
  }, []);

  const handleEmergencyMode = () => {
    setEmergencyMode(true);
    setExits((prev) => prev.map((e) => ({ ...e, open: true })));
    showAlert('🚨 Emergency Mode Activated', 'All exits opened. Broadcast message sent to all staff. Evacuation protocol initiated.');
  };

  const handleBroadcast = () => {
    showAlert('📢 Broadcast Sent', 'Stadium-wide PA announcement dispatched: "Please proceed to nearest exit in an orderly manner."');
  };

  const handleCall = (contact: typeof EMERGENCY_CONTACTS[0]) => {
    const url = `tel:${contact.phone}`;
    Linking.canOpenURL(url)
      .then((can) => { if (can) Linking.openURL(url); })
      .catch(() => showAlert('Call', `Calling ${contact.name} — ${contact.phone}`));
  };

  const showAlert = (title: string, msg: string) => {
    if (Platform.OS === 'web') {
      alert(`${title}\n\n${msg}`);
    } else {
      Alert.alert(title, msg);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const activeAlertsCount = alerts.filter((a) => a.status !== 'resolved').length;
  const openExits = exits.filter((e) => e.open).length;
  const totalExitCapacity = exits.filter((e) => e.open).reduce((s, e) => s + e.capacity, 0);
  const estimatedEvacMin = Math.ceil(78450 / (totalExitCapacity || 1) / 60 * 10) / 10;

  // ─── Render helpers ────────────────────────────────────────────────────────

  const renderOverview = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabContent}>
      {/* Status summary bar */}
      <LinearGradient
        colors={emergencyMode ? ['rgba(239,83,80,0.25)', 'rgba(239,83,80,0.08)'] : ['rgba(0,200,255,0.15)', 'rgba(124,77,255,0.1)']}
        style={styles.summaryBar}>
        <SummaryChip icon="alert-circle" value={`${activeAlertsCount}`} label="Active Alerts" color="#FF5252" />
        <SummaryChip icon="account-group" value="78,450" label="Visitors" color="#00C8FF" />
        <SummaryChip icon="shield-check" value={emergencyMode ? 'EMERGENCY' : 'NORMAL'} label="Mode" color={emergencyMode ? '#FF5252' : '#00E676'} />
        <SummaryChip icon="bell-badge" value={`${unreadCount}`} label="Unread" color="#FFC107" />
      </LinearGradient>

      {/* Zone density grid */}
      <SectionHeader icon="map-marker-radius" title="Zone Crowd Density" />
      <View style={styles.zoneGrid}>
        {zones.map((z) => (
          <View key={z.id} style={styles.zoneCardWrap}>
            <ZoneDensityCard zone={z} />
          </View>
        ))}
      </View>

      {/* AI Prediction Panel */}
      <SectionHeader icon="brain" title="AI Prediction Panel" />
      {PREDICTIONS.map((pred: PredictionItem) => (
        <PredictionRow key={pred.id} pred={pred} />
      ))}

      {/* Notification Feed */}
      <SectionHeader icon="bell-ring-outline" title="Live Notification Feed" />
      {notifications.slice(0, 8).map((n: NotificationItem) => (
        <NotificationRow key={n.id} item={n} onRead={() => setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))} />
      ))}
    </ScrollView>
  );

  const renderHeatmap = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabContent}>
      <SectionHeader icon="map-marker-radius" title="Live Stadium Heatmap" />
      <Text style={styles.heatmapSub}>
        AI-powered crowd density visualisation — updated every 5 s
      </Text>

      {/* Heatmap SVG-like canvas */}
      <View style={styles.heatmapContainer}>
        {/* Stadium oval outline */}
        <View style={styles.stadiumOval} />
        <View style={styles.stadiumInner} />

        {/* Hotspot zones */}
        {HEATMAP_ZONES.map((hz, i) => {
          const color = HEATMAP_COLORS[hz.density];
          const size = 120 * hz.r * 2;
          return (
            <Animated.View
              key={hz.id}
              style={[
                styles.hotspot,
                {
                  left: `${hz.cx * 100}%` as any,
                  top:  `${hz.cy * 100}%` as any,
                  width: size,
                  height: size,
                  marginLeft: -size / 2,
                  marginTop:  -size / 2,
                  backgroundColor: color + '55',
                  borderColor: color,
                  transform: [{ scale: pulseAnims[i] }],
                },
              ]}>
              <Text style={[styles.hotspotLabel, { color }]}>{hz.label}</Text>
            </Animated.View>
          );
        })}
      </View>

      {/* Legend */}
      <View style={styles.legendRow}>
        <LegendItem color="#00E676" label="Safe" />
        <LegendItem color="#FFC107" label="Busy" />
        <LegendItem color="#FF5252" label="Overcrowded" />
      </View>

      {/* AI Emergency Assistant panel below heatmap */}
      <SectionHeader icon="robot-outline" title="AI Emergency Assistant" />
      {AI_RECOMMENDATIONS.map((rec, i) => (
        <AIRecommendationBubble key={rec.id} rec={rec} delay={i * 80} />
      ))}
    </ScrollView>
  );

  const renderAlerts = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabContent}>
      <SectionHeader icon="alert-circle-outline" title="Emergency Alert Center" />

      {/* Filter tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {(['All', 'Active', 'Responding', 'Resolved'] as const).map((f) => (
          <TouchableOpacity key={f} style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
            onPress={() => setActiveFilter(f)}>
            <Text style={[styles.filterChipText, activeFilter === f && styles.filterChipTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredAlerts.map((a) => (
        <AlertCard key={a.id} alert={a} onResolve={handleResolveAlert} />
      ))}

      {/* Incident Timeline */}
      <SectionHeader icon="timeline-outline" title="Incident Timeline" />
      {INCIDENT_RECORDS.map((rec) => (
        <View key={rec.id} style={styles.timelineCard}>
          <Text style={styles.timelineTitle}>{rec.title}</Text>
          <Text style={styles.timelineLoc}>
            <MaterialCommunityIcons name="map-marker" size={11} color="#8F9BB3" />{'  '}{rec.location}
          </Text>
          <View style={styles.timelineSteps}>
            {rec.steps.map((step, i) => (
              <View key={i} style={styles.timelineStep}>
                <View style={[styles.stepDot, { backgroundColor: step.done ? '#00E676' : '#8F9BB3' }]} />
                {i < rec.steps.length - 1 && (
                  <View style={[styles.stepLine, { backgroundColor: step.done ? '#00E676' : '#8F9BB3' }]} />
                )}
                <View style={styles.stepInfo}>
                  <Text style={[styles.stepLabel, { color: step.done ? '#FFFFFF' : '#8F9BB3' }]}>{step.label}</Text>
                  <Text style={styles.stepTs}>{step.timestamp}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderCameras = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabContent}>
      <SectionHeader icon="cctv" title="Security Camera Grid" />
      <Text style={styles.cameraCount}>{CAMERA_FEEDS.filter((c) => c.status === 'online').length} cameras online • {CAMERA_FEEDS.filter((c) => c.status === 'offline').length} offline</Text>
      <View style={styles.cameraGrid}>
        {CAMERA_FEEDS.map((cam) => (
          <View key={cam.id} style={styles.cameraCardWrap}>
            <CameraCard camera={cam} />
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderEvacuate = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabContent}>
      <SectionHeader icon="exit-run" title="Stadium Evacuation Simulator" />

      {/* Stats row */}
      <View style={styles.evacStatsRow}>
        <View style={styles.evacStatCard}>
          <Text style={styles.evacStatVal}>{openExits}</Text>
          <Text style={styles.evacStatLabel}>Open Exits</Text>
        </View>
        <View style={styles.evacStatCard}>
          <Text style={styles.evacStatVal}>{totalExitCapacity.toLocaleString()}</Text>
          <Text style={styles.evacStatLabel}>Exit Capacity/h</Text>
        </View>
        <View style={[styles.evacStatCard, emergencyMode && styles.evacStatCardEmergency]}>
          <Text style={[styles.evacStatVal, { color: '#FF5252' }]}>{estimatedEvacMin} min</Text>
          <Text style={styles.evacStatLabel}>Est. Evacuation</Text>
        </View>
      </View>

      {/* Control buttons */}
      <View style={styles.evacControlRow}>
        <TouchableOpacity style={styles.broadcastBtn} onPress={handleBroadcast} activeOpacity={0.8}>
          <MaterialCommunityIcons name="bullhorn-outline" size={20} color="#FFF" />
          <Text style={styles.broadcastBtnText}>Broadcast Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.emergencyBtn, emergencyMode && styles.emergencyBtnActive]}
          onPress={handleEmergencyMode}
          activeOpacity={0.8}
          disabled={emergencyMode}>
          <MaterialCommunityIcons name="alarm-light-outline" size={20} color="#FFF" />
          <Text style={styles.emergencyBtnText}>{emergencyMode ? 'Emergency Active' : 'Activate Emergency'}</Text>
        </TouchableOpacity>
      </View>

      {/* Exit list */}
      <SectionHeader icon="door-open" title="Exit Controls" />
      {exits.map((exit) => (
        <View key={exit.id} style={styles.exitRow}>
          <View style={styles.exitInfo}>
            <View style={[styles.exitStatusDot, { backgroundColor: exit.open ? '#00E676' : '#FF5252' }]} />
            <View>
              <Text style={styles.exitLabel}>{exit.label}</Text>
              <Text style={styles.exitCap}>Capacity: {exit.capacity.toLocaleString()} / h</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.exitToggleBtn, { backgroundColor: exit.open ? 'rgba(0,230,118,0.15)' : 'rgba(255,82,82,0.15)' }]}
            onPress={() => handleToggleExit(exit.id)}
            activeOpacity={0.75}>
            <MaterialCommunityIcons
              name={exit.open ? 'door-open' : 'door-closed'}
              size={16}
              color={exit.open ? '#00E676' : '#FF5252'}
            />
            <Text style={[styles.exitToggleText, { color: exit.open ? '#00E676' : '#FF5252' }]}>
              {exit.open ? 'Close' : 'Open'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderContacts = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tabContent}>
      <SectionHeader icon="phone-dial-outline" title="Emergency Contacts" />
      {EMERGENCY_CONTACTS.map((contact) => (
        <View key={contact.id} style={styles.contactCard}>
          <View style={[styles.contactIconWrap, { backgroundColor: contact.color + '22' }]}>
            <MaterialCommunityIcons name={contact.icon as any} size={26} color={contact.color} />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactRole}>{contact.role}</Text>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactPhone}>{contact.phone}</Text>
          </View>
          <TouchableOpacity
            style={[styles.callBtn, { backgroundColor: contact.color }]}
            onPress={() => handleCall(contact)}
            activeOpacity={0.8}>
            <MaterialCommunityIcons name="phone" size={18} color="#FFF" />
            <Text style={styles.callBtnText}>Call</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  // Filter state for alerts tab
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Responding' | 'Resolved'>('All');
  const filteredAlerts = activeFilter === 'All'
    ? alerts
    : alerts.filter((a) => a.status === activeFilter.toLowerCase() as EmergencyAlert['status']);

  const renderTab = () => {
    switch (activeTab) {
      case 'OVERVIEW':  return renderOverview();
      case 'HEATMAP':   return renderHeatmap();
      case 'ALERTS':    return renderAlerts();
      case 'CAMERAS':   return renderCameras();
      case 'EVACUATE':  return renderEvacuate();
      case 'CONTACTS':  return renderContacts();
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Crowd Safety & Emergency" />

      {/* Emergency mode banner */}
      {emergencyMode && (
        <LinearGradient colors={['#B71C1C', '#D32F2F']} style={styles.emergencyBanner}>
          <MaterialCommunityIcons name="alarm-light" size={18} color="#FFF" />
          <Text style={styles.emergencyBannerText}>🚨 EMERGENCY MODE ACTIVE — All exits open · Evacuation in progress</Text>
        </LinearGradient>
      )}

      {/* Tab bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBarScroll}
        contentContainerStyle={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabBtn, activeTab === tab.id && styles.tabBtnActive]}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.8}>
            <MaterialCommunityIcons
              name={tab.icon as any}
              size={16}
              color={activeTab === tab.id ? '#00C8FF' : '#8F9BB3'}
            />
            <Text style={[styles.tabBtnText, activeTab === tab.id && styles.tabBtnTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tab content */}
      {renderTab()}
    </View>
  );
}

// ─── Small helper components ──────────────────────────────────────────────────

const SectionHeader: React.FC<{ icon: string; title: string }> = ({ icon, title }) => (
  <View style={sharedStyles.sectionHeader}>
    <MaterialCommunityIcons name={icon as any} size={18} color="#00C8FF" />
    <Text style={sharedStyles.sectionTitle}>{title}</Text>
  </View>
);

const SummaryChip: React.FC<{ icon: string; value: string; label: string; color: string }> = ({
  icon, value, label, color,
}) => (
  <View style={sharedStyles.summaryChip}>
    <MaterialCommunityIcons name={icon as any} size={16} color={color} />
    <Text style={[sharedStyles.summaryVal, { color }]}>{value}</Text>
    <Text style={sharedStyles.summaryLabel}>{label}</Text>
  </View>
);

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <View style={sharedStyles.legendItem}>
    <View style={[sharedStyles.legendDot, { backgroundColor: color }]} />
    <Text style={sharedStyles.legendLabel}>{label}</Text>
  </View>
);

const PredictionRow: React.FC<{ pred: PredictionItem }> = ({ pred }) => (
  <View style={sharedStyles.predRow}>
    <View style={[sharedStyles.predIconWrap, { backgroundColor: pred.color + '22' }]}>
      <MaterialCommunityIcons name={pred.icon as any} size={20} color={pred.color} />
    </View>
    <View style={sharedStyles.predInfo}>
      <Text style={sharedStyles.predLabel}>{pred.label}</Text>
      <Text style={[sharedStyles.predValue, { color: pred.color }]}>{pred.value}</Text>
    </View>
    <View style={sharedStyles.confidenceWrap}>
      <Text style={sharedStyles.confidenceText}>{pred.confidence}%</Text>
      <Text style={sharedStyles.confidenceLabel}>confidence</Text>
      <View style={sharedStyles.confidenceBar}>
        <View style={[sharedStyles.confidenceFill, { width: `${pred.confidence}%` as any, backgroundColor: pred.color }]} />
      </View>
    </View>
  </View>
);

const NotificationRow: React.FC<{ item: NotificationItem; onRead: () => void }> = ({ item, onRead }) => {
  const TYPE_COLORS: Record<NotificationItem['type'], string> = {
    alert:   '#FF5252',
    info:    '#00C8FF',
    success: '#00E676',
    warning: '#FFC107',
  };
  const TYPE_ICONS: Record<NotificationItem['type'], string> = {
    alert:   'bell-alert',
    info:    'information',
    success: 'check-circle',
    warning: 'alert',
  };
  const color = TYPE_COLORS[item.type];
  return (
    <TouchableOpacity style={[sharedStyles.notifRow, !item.read && sharedStyles.notifRowUnread]} onPress={onRead} activeOpacity={0.8}>
      <View style={[sharedStyles.notifDot, { backgroundColor: color + '33' }]}>
        <MaterialCommunityIcons name={TYPE_ICONS[item.type] as any} size={14} color={color} />
      </View>
      <View style={sharedStyles.notifContent}>
        <Text style={[sharedStyles.notifMsg, !item.read && sharedStyles.notifMsgUnread]}>{item.message}</Text>
        <Text style={sharedStyles.notifTs}>{item.timestamp}</Text>
      </View>
      {!item.read && <View style={[sharedStyles.unreadBadge, { backgroundColor: color }]} />}
    </TouchableOpacity>
  );
};

// ─── Shared helper styles ─────────────────────────────────────────────────────

const sharedStyles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: Theme.spacing.l,
    marginBottom: Theme.spacing.s,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: Theme.typography.sizes.m,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  summaryChip: { alignItems: 'center', gap: 2, flex: 1 },
  summaryVal: { fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  summaryLabel: { color: '#8F9BB3', fontSize: 9, fontWeight: '600' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendLabel: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
  predRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.m,
    backgroundColor: 'rgba(13,27,48,0.8)',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.1)',
    padding: Theme.spacing.m,
    marginBottom: 8,
  },
  predIconWrap: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  predInfo: { flex: 1, gap: 2 },
  predLabel: { color: '#8F9BB3', fontSize: 11, fontWeight: '600' },
  predValue: { fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  confidenceWrap: { alignItems: 'flex-end', gap: 2, minWidth: 70 },
  confidenceText: { color: '#FFFFFF', fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  confidenceLabel: { color: '#8F9BB3', fontSize: 8 },
  confidenceBar: { height: 4, width: 60, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' },
  confidenceFill: { height: '100%', borderRadius: 2 },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(13,27,48,0.7)',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.08)',
    padding: 12,
    marginBottom: 6,
  },
  notifRowUnread: { borderColor: 'rgba(0,200,255,0.2)', backgroundColor: 'rgba(0,200,255,0.05)' },
  notifDot: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  notifContent: { flex: 1, gap: 2 },
  notifMsg: { color: '#8F9BB3', fontSize: 11, fontWeight: '500', lineHeight: 16 },
  notifMsgUnread: { color: '#FFFFFF', fontWeight: '700' },
  notifTs: { color: '#8F9BB3', fontSize: 10 },
  unreadBadge: { width: 8, height: 8, borderRadius: 4 },
});

// ─── Main styles ──────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081223',
  },
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Theme.spacing.l,
    paddingVertical: 10,
  },
  emergencyBannerText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '900',
    flex: 1,
  },
  tabBarScroll: { flexGrow: 0 },
  tabBar: {
    paddingHorizontal: Theme.spacing.m,
    paddingVertical: 10,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,200,255,0.1)',
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabBtnActive: {
    backgroundColor: 'rgba(0,200,255,0.12)',
    borderColor: 'rgba(0,200,255,0.3)',
  },
  tabBtnText: { color: '#8F9BB3', fontSize: 11, fontWeight: '700' },
  tabBtnTextActive: { color: '#00C8FF' },
  tabContent: {
    padding: Theme.spacing.m,
    paddingBottom: 120,
  },
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: Theme.shapes.borderRadius.l,
    padding: Theme.spacing.m,
    marginBottom: Theme.spacing.s,
  },
  zoneGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  zoneCardWrap: { width: '48%' },

  // Heatmap
  heatmapSub: { color: '#8F9BB3', fontSize: 11, marginBottom: Theme.spacing.m },
  heatmapContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#040D1A',
    borderRadius: Theme.shapes.borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.15)',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: Theme.spacing.m,
  },
  stadiumOval: {
    position: 'absolute',
    top: '15%', left: '15%', right: '15%', bottom: '15%',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: 'rgba(0,200,255,0.2)',
    backgroundColor: 'rgba(0,200,255,0.03)',
  },
  stadiumInner: {
    position: 'absolute',
    top: '32%', left: '32%', right: '32%', bottom: '32%',
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.1)',
    backgroundColor: '#040D1A',
  },
  hotspot: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotspotLabel: {
    fontSize: 8,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Theme.spacing.xl,
    marginBottom: Theme.spacing.l,
  },

  // Alerts
  filterScroll: { marginBottom: Theme.spacing.m },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.15)',
    marginRight: 8,
    backgroundColor: 'rgba(13,27,48,0.5)',
  },
  filterChipActive: {
    backgroundColor: 'rgba(0,200,255,0.15)',
    borderColor: 'rgba(0,200,255,0.4)',
  },
  filterChipText: { color: '#8F9BB3', fontSize: 11, fontWeight: '700' },
  filterChipTextActive: { color: '#00C8FF' },

  // Timeline
  timelineCard: {
    backgroundColor: 'rgba(13,27,48,0.85)',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.12)',
    padding: Theme.spacing.m,
    gap: 6,
    marginBottom: 12,
  },
  timelineTitle: { color: '#FFFFFF', fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  timelineLoc: { color: '#8F9BB3', fontSize: 11, marginBottom: 4 },
  timelineSteps: { gap: 0 },
  timelineStep: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingBottom: 4 },
  stepDot: { width: 10, height: 10, borderRadius: 5, marginTop: 3, flexShrink: 0 },
  stepLine: { position: 'absolute', left: 4, top: 13, width: 2, height: 24 },
  stepInfo: { flex: 1, gap: 1 },
  stepLabel: { fontSize: 12, fontWeight: '700' },
  stepTs: { color: '#8F9BB3', fontSize: 10 },

  // Cameras
  cameraCount: { color: '#8F9BB3', fontSize: 11, marginBottom: Theme.spacing.m },
  cameraGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  cameraCardWrap: { width: '48%' },

  // Evacuation
  evacStatsRow: { flexDirection: 'row', gap: 10, marginBottom: Theme.spacing.m },
  evacStatCard: {
    flex: 1,
    backgroundColor: 'rgba(13,27,48,0.85)',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.12)',
    padding: Theme.spacing.m,
    alignItems: 'center',
    gap: 4,
  },
  evacStatCardEmergency: { borderColor: 'rgba(255,82,82,0.4)', backgroundColor: 'rgba(255,82,82,0.08)' },
  evacStatVal: { color: '#FFFFFF', fontSize: Theme.typography.sizes.l, fontWeight: '900' },
  evacStatLabel: { color: '#8F9BB3', fontSize: 9, fontWeight: '600', textAlign: 'center' },
  evacControlRow: { flexDirection: 'row', gap: 10, marginBottom: Theme.spacing.m },
  broadcastBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#00C8FF',
    borderRadius: Theme.shapes.borderRadius.m,
    paddingVertical: 12,
  },
  broadcastBtnText: { color: '#081223', fontSize: 12, fontWeight: '900' },
  emergencyBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#EF5350',
    borderRadius: Theme.shapes.borderRadius.m,
    paddingVertical: 12,
  },
  emergencyBtnActive: { backgroundColor: '#B71C1C', opacity: 0.7 },
  emergencyBtnText: { color: '#FFFFFF', fontSize: 11, fontWeight: '900' },
  exitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(13,27,48,0.85)',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.1)',
    padding: Theme.spacing.m,
    marginBottom: 8,
  },
  exitInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  exitStatusDot: { width: 10, height: 10, borderRadius: 5, flexShrink: 0 },
  exitLabel: { color: '#FFFFFF', fontSize: Theme.typography.sizes.s, fontWeight: '700' },
  exitCap: { color: '#8F9BB3', fontSize: 10, marginTop: 2 },
  exitToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },
  exitToggleText: { fontSize: 11, fontWeight: '900' },

  // Contacts
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.m,
    backgroundColor: 'rgba(13,27,48,0.85)',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.1)',
    padding: Theme.spacing.m,
    marginBottom: 10,
  },
  contactIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  contactInfo: { flex: 1, gap: 2 },
  contactRole: { color: '#8F9BB3', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  contactName: { color: '#FFFFFF', fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  contactPhone: { color: '#00C8FF', fontSize: 11, fontWeight: '600' },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },
  callBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '900' },
});
