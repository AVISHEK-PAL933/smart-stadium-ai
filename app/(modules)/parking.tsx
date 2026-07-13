import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ParkingAssistant() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  // Tabs: 'PARKING' | 'TRANSIT' | 'TRAFFIC' | 'EV'
  const [activeTab, setActiveTab] = useState<'PARKING' | 'TRANSIT' | 'TRAFFIC' | 'EV'>('PARKING');

  // Interactive Reservations
  const [selectedZone, setSelectedZone] = useState<string>('Zone A');
  const [isReserved, setIsReserved] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // EV charging state
  const [evChargingProgress, setEvChargingProgress] = useState(65);
  const [evReserved, setEvReserved] = useState(false);

  // Flash car indicator
  const [carFlashed, setCarFlashed] = useState(false);

  // AI chat / voice help
  const [aiResponse, setAiResponse] = useState(
    "Tap 'Find Best Parking' to locate open slots based on stadium entry Gate D."
  );

  const parkingZonesData = [
    {
      name: 'Zone A (North)',
      available: 42,
      total: 300,
      cost: '$25',
      walkTime: '6 min',
      type: 'VIP / EV',
    },
    {
      name: 'Zone B (East)',
      available: 120,
      total: 500,
      cost: '$20',
      walkTime: '8 min',
      type: 'General',
    },
    {
      name: 'Zone C (South)',
      available: 8,
      total: 400,
      cost: '$20',
      walkTime: '9 min',
      type: 'Accessible',
    },
    {
      name: 'Zone D (West)',
      available: 0,
      total: 250,
      cost: '$15',
      walkTime: '12 min',
      type: 'General',
    },
    {
      name: 'Zone E (Premium)',
      available: 15,
      total: 100,
      cost: '$45',
      walkTime: '4 min',
      type: 'VIP / EV',
    },
    {
      name: 'Zone F (Express)',
      available: 88,
      total: 600,
      cost: '$18',
      walkTime: '10 min',
      type: 'General',
    },
  ];

  const publicTransitData = [
    { type: 'Metro', route: 'Line 4 Express', eta: '4 min', station: 'MetLife Arena Station' },
    { type: 'Bus', route: 'Stadium Shuttle Route 12', eta: '6 min', station: 'North Gate Depot' },
    { type: 'Taxi', route: 'Yellow Cab Lineup', eta: '1 min', station: 'Gate B Pickup' },
    { type: 'Ride Share', route: 'Uber / Lyft Zone', eta: '5 min', station: 'Lot G Pickup Hub' },
    {
      type: 'Airport Shuttle',
      route: 'EWR Airport Express',
      eta: '15 min',
      station: 'Gate A Bus Terminal',
    },
  ];

  const handleReserve = (zoneName: string) => {
    setSelectedZone(zoneName);
    setIsReserved(true);
    setAiResponse(`Reserved successfully in ${zoneName}! Your QR entry code is ready.`);
    showAlert(
      'Reservation Complete',
      `Your parking spot in ${zoneName} has been booked. Cost added to Stadium Wallet.`
    );
  };

  const handleFlashCar = () => {
    setCarFlashed(true);
    showAlert(
      'Car Alerted',
      "Sending signal... Your vehicle's headlights and horn have been activated."
    );
    setTimeout(() => setCarFlashed(false), 3000);
  };

  const handleBookEV = () => {
    setEvReserved(true);
    showAlert('EV Slot Booked', 'EV charging station reserved in Zone A Stall 14.');
  };

  const handleFindBestParking = () => {
    setAiResponse(
      'AI Recommendation: Zone B has the best balance of spaces (120 left) and proximity to your Ticket Gate D (8 min walk).'
    );
    showAlert(
      'AI Recommendation',
      'Zone B (East) is recommended for your Gate D ticket. 8 mins walk.'
    );
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
      <Header title="Smart Parking & Transit" />

      {/* Live Alerts Announcement */}
      <View style={styles.trafficAlertBar}>
        <MaterialCommunityIcons name="bus-clock" size={16} color="#FFFFFF" />
        <Text style={styles.alertBarText}>
          Traffic Advisory: Heavy congestion on Route 3 Eastbound. Suggested detour via Service Rd.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Module Navigation Tabs */}
        <View style={styles.tabsRow}>
          {(['PARKING', 'TRANSIT', 'TRAFFIC', 'EV'] as const).map((tab) => (
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

        {activeTab === 'PARKING' && (
          <View style={styles.tabContent}>
            {/* AI Parking Assistant recommendation Panel */}
            <GlassCard style={styles.aiAssCard}>
              <View style={styles.aiAssHeader}>
                <MaterialCommunityIcons name="robot" size={24} color={themeColors.tint} />
                <Text style={[styles.aiAssTitle, { color: themeColors.text }]}>
                  AI Parking Advisor
                </Text>
              </View>
              <Text style={[styles.aiAssBody, { color: themeColors.text }]}>{aiResponse}</Text>
              <View style={styles.aiBtnRow}>
                <TouchableOpacity
                  onPress={handleFindBestParking}
                  style={[styles.aiActionBtn, { backgroundColor: themeColors.tint }]}>
                  <Text style={styles.aiBtnLabel}>Recommend Parking</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleReserve('Zone B')}
                  style={[styles.aiActionBtn, { borderColor: themeColors.border, borderWidth: 1 }]}>
                  <Text style={[styles.aiBtnLabel, { color: themeColors.text }]}>Auto-Reserve</Text>
                </TouchableOpacity>
              </View>
            </GlassCard>

            {/* Active Reservation Status */}
            {isReserved && (
              <GlassCard style={styles.reservationSummaryCard}>
                <View style={styles.resHeader}>
                  <View>
                    <Text style={[styles.resTitle, { color: themeColors.text }]}>
                      Active Parking Reservation
                    </Text>
                    <Text style={[styles.resSub, { color: themeColors.icon }]}>
                      {selectedZone} • Spot Stall B-42
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowQR(!showQR)}
                    style={[styles.qrToggleBtn, { backgroundColor: themeColors.tint }]}>
                    <MaterialCommunityIcons name="qrcode" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                {showQR && (
                  <View style={styles.qrWrapper}>
                    {/* Simulated QR Code representation */}
                    <View style={styles.mockQrCode}>
                      <MaterialCommunityIcons name="qrcode-scan" size={120} color="#000000" />
                    </View>
                    <Text style={[styles.qrHelpText, { color: themeColors.icon }]}>
                      Scan at entrance gate barcode readers.
                    </Text>
                  </View>
                )}

                {/* Find my car widget integration */}
                <View style={[styles.findCarBox, { borderTopColor: themeColors.border }]}>
                  <View style={styles.carLocationTextCol}>
                    <MaterialCommunityIcons
                      name="car-connected"
                      size={20}
                      color={themeColors.tint}
                    />
                    <Text style={[styles.carLocVal, { color: themeColors.text }]}>
                      Stall B-42 (Walk: 8 min)
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={handleFlashCar}
                    style={[
                      styles.flashBtn,
                      { backgroundColor: carFlashed ? '#00E676' : themeColors.border },
                    ]}>
                    <MaterialCommunityIcons
                      name="volume-high"
                      size={16}
                      color={carFlashed ? '#FFFFFF' : themeColors.text}
                    />
                    <Text
                      style={[
                        styles.flashBtnLabel,
                        { color: carFlashed ? '#FFFFFF' : themeColors.text },
                      ]}>
                      Flash Lights
                    </Text>
                  </TouchableOpacity>
                </View>
              </GlassCard>
            )}

            {/* Live Parking Map Graphic representation */}
            <GlassCard style={styles.mapCard}>
              <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
                Live Parking Lot Map
              </Text>
              <View style={[styles.mapGraphicLayout, { borderColor: themeColors.border }]}>
                {/* Zone highlights */}
                <View
                  style={[
                    styles.zoneSquare,
                    { left: '10%', top: '10%', backgroundColor: 'rgba(0, 230, 118, 0.2)' },
                  ]}>
                  <Text style={styles.zoneNameText}>Zone A</Text>
                </View>
                <View
                  style={[
                    styles.zoneSquare,
                    { right: '10%', top: '10%', backgroundColor: 'rgba(0, 229, 255, 0.2)' },
                  ]}>
                  <Text style={styles.zoneNameText}>Zone B</Text>
                </View>

                {/* User car node */}
                <View style={[styles.carNodePoint, { left: '60%', top: '40%' }]} />
                <View
                  style={[
                    styles.routeWalkingLine,
                    {
                      left: '42%',
                      top: '42%',
                      width: 70,
                      height: 4,
                      backgroundColor: themeColors.tint,
                    },
                  ]}
                />
              </View>
            </GlassCard>

            {/* Parking Zones grid lists */}
            <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
              Parking Zone Availabilities
            </Text>
            <View style={styles.zonesList}>
              {parkingZonesData.map((zone) => {
                const isFull = zone.available === 0;
                return (
                  <View
                    key={zone.name}
                    style={[styles.zoneItemRow, { borderBottomColor: themeColors.border }]}>
                    <View style={styles.zoneInfoCol}>
                      <Text style={[styles.zoneNameTitle, { color: themeColors.text }]}>
                        {zone.name}
                      </Text>
                      <Text style={[styles.zoneStatsLabel, { color: themeColors.icon }]}>
                        {zone.type} • {zone.walkTime} walk
                      </Text>
                    </View>
                    <View style={styles.actionCol}>
                      <Text
                        style={[styles.zoneAvailNum, { color: isFull ? '#EF5350' : '#00E676' }]}>
                        {isFull ? 'FULL' : `${zone.available} / ${zone.total}`}
                      </Text>
                      {!isFull && (
                        <TouchableOpacity
                          onPress={() => handleReserve(zone.name)}
                          style={[styles.reserveBtnMini, { backgroundColor: themeColors.tint }]}>
                          <Text style={styles.reserveBtnLabelText}>Book</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {activeTab === 'TRANSIT' && (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
              Live Transit Schedules & pickups
            </Text>

            {publicTransitData.map((transit) => (
              <GlassCard key={transit.type} style={styles.transitCard}>
                <View style={styles.transitHeader}>
                  <View style={styles.transitTitleRow}>
                    <MaterialCommunityIcons
                      name={
                        transit.type === 'Metro'
                          ? 'subway-variant'
                          : transit.type === 'Bus'
                            ? 'bus'
                            : transit.type === 'Taxi'
                              ? 'taxi'
                              : 'car-multiple'
                      }
                      size={22}
                      color={themeColors.tint}
                    />
                    <Text style={[styles.transitNameText, { color: themeColors.text }]}>
                      {transit.type} • {transit.route}
                    </Text>
                  </View>
                  <View style={styles.etaBadge}>
                    <Text style={styles.etaBadgeText}>{transit.eta}</Text>
                  </View>
                </View>
                <Text style={[styles.transitDepotText, { color: themeColors.icon }]}>
                  📍 Pickup Station: {transit.station}
                </Text>
              </GlassCard>
            ))}
          </View>
        )}

        {activeTab === 'TRAFFIC' && (
          <View style={styles.tabContent}>
            <GlassCard style={styles.trafficAlertCard}>
              <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
                Congestion & Closure Advisories
              </Text>

              <View style={styles.advisoryRow}>
                <MaterialCommunityIcons name="alert-octagon" size={20} color="#EF5350" />
                <View style={styles.advInfo}>
                  <Text style={[styles.advTitle, { color: themeColors.text }]}>
                    Road Closure: Route 3 ramp
                  </Text>
                  <Text style={[styles.advSub, { color: themeColors.icon }]}>
                    Due to high match security corridor. Re-opens at 23:30.
                  </Text>
                </View>
              </View>

              <View style={styles.advisoryRow}>
                <MaterialCommunityIcons name="clock-alert-outline" size={20} color="#FFB300" />
                <View style={styles.advInfo}>
                  <Text style={[styles.advTitle, { color: themeColors.text }]}>
                    Traffic delay: Stadium exit way
                  </Text>
                  <Text style={[styles.advSub, { color: themeColors.icon }]}>
                    Congestion level high. Extra travel delay: 14 mins.
                  </Text>
                </View>
              </View>
            </GlassCard>
          </View>
        )}

        {activeTab === 'EV' && (
          <View style={styles.tabContent}>
            <GlassCard style={styles.evCard}>
              <Text style={[styles.sectionHeading, { color: themeColors.text }]}>
                Zone A Fast Chargers (EV)
              </Text>

              <View style={styles.evProgressRow}>
                <View>
                  <Text style={[styles.evTitleText, { color: themeColors.text }]}>
                    Stall EV-14 Charger
                  </Text>
                  <Text style={[styles.evSubText, { color: themeColors.icon }]}>
                    Fast charging speed: 150 kW
                  </Text>
                </View>
                <Text style={[styles.evPercentText, { color: themeColors.tint }]}>
                  {evChargingProgress}%
                </Text>
              </View>

              <View style={[styles.chargingBarBase, { backgroundColor: themeColors.border }]}>
                <View
                  style={[
                    styles.chargingBarFill,
                    { width: `${evChargingProgress}%`, backgroundColor: themeColors.tint },
                  ]}
                />
              </View>

              <View style={styles.evActions}>
                <TouchableOpacity
                  onPress={() => setEvChargingProgress((prev) => Math.min(prev + 10, 100))}
                  style={[styles.evActBtn, { backgroundColor: themeColors.tint }]}>
                  <Text style={styles.evActText}>Boost Charge</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleBookEV}
                  style={[styles.evActBtn, { borderColor: themeColors.border, borderWidth: 1 }]}>
                  <Text style={[styles.evActText, { color: themeColors.text }]}>
                    {evReserved ? 'Reserved Slot' : 'Reserve Next Stall'}
                  </Text>
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
  trafficAlertBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.s,
    backgroundColor: '#5E35B1',
    paddingVertical: 10,
    paddingHorizontal: Theme.spacing.l,
  },
  alertBarText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 9, flex: 1 },
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
  tabBtnText: { fontSize: 10, fontWeight: 'bold' },
  tabContent: { gap: Theme.spacing.m },

  aiAssCard: { padding: Theme.spacing.m, borderRadius: 20, gap: Theme.spacing.s },
  aiAssHeader: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.s },
  aiAssTitle: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  aiAssBody: { fontSize: Theme.typography.sizes.s, lineHeight: 18 },
  aiBtnRow: { flexDirection: 'row', gap: Theme.spacing.s, marginTop: 4 },
  aiActionBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  aiBtnLabel: { fontSize: 9, fontWeight: 'bold', color: '#FFFFFF' },

  reservationSummaryCard: { padding: Theme.spacing.m, borderRadius: 20, gap: Theme.spacing.m },
  resHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resTitle: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  resSub: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold', opacity: 0.6 },
  qrToggleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrWrapper: { alignItems: 'center', gap: Theme.spacing.s },
  mockQrCode: { backgroundColor: '#FFFFFF', padding: Theme.spacing.m, borderRadius: 16 },
  qrHelpText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  findCarBox: {
    borderTopWidth: 1,
    paddingTop: Theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carLocationTextCol: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.s },
  carLocVal: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  flashBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  flashBtnLabel: { fontSize: 8, fontWeight: 'bold' },

  mapCard: { padding: Theme.spacing.m, borderRadius: 20, gap: Theme.spacing.s },
  sectionHeading: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  mapGraphicLayout: {
    height: 140,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#071829',
    position: 'relative',
    overflow: 'hidden',
  },
  zoneSquare: { position: 'absolute', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  zoneNameText: { color: '#FFFFFF', fontSize: 8, fontWeight: 'bold' },
  carNodePoint: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFD700',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  routeWalkingLine: { position: 'absolute', borderRadius: 2, filter: 'opacity(0.8)' },

  zonesList: { gap: 2 },
  zoneItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.s,
    borderBottomWidth: 1,
  },
  zoneInfoCol: { gap: 2 },
  zoneNameTitle: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  zoneStatsLabel: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold', opacity: 0.6 },
  actionCol: { alignItems: 'flex-end', gap: 4 },
  zoneAvailNum: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  reserveBtnMini: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  reserveBtnLabelText: { color: '#FFFFFF', fontSize: 8, fontWeight: 'bold' },

  transitCard: { padding: Theme.spacing.m, borderRadius: 20, gap: Theme.spacing.s },
  transitHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  transitTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.s },
  transitNameText: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  etaBadge: {
    backgroundColor: '#EF6C00',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  etaBadgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: 'bold' },
  transitDepotText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },

  trafficAlertCard: { padding: Theme.spacing.m, borderRadius: 20, gap: Theme.spacing.m },
  advisoryRow: { flexDirection: 'row', gap: Theme.spacing.m, alignItems: 'center' },
  advInfo: { gap: 2, flex: 1 },
  advTitle: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  advSub: { fontSize: Theme.typography.sizes.s - 2, lineHeight: 16 },

  evCard: { padding: Theme.spacing.m, borderRadius: 20, gap: Theme.spacing.m },
  evProgressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  evTitleText: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  evSubText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold', opacity: 0.6 },
  evPercentText: { fontSize: Theme.typography.sizes.m, fontWeight: '900' },
  chargingBarBase: { height: 8, borderRadius: 4, width: '100%', overflow: 'hidden' },
  chargingBarFill: { height: '100%', borderRadius: 4 },
  evActions: { flexDirection: 'row', gap: Theme.spacing.s, marginTop: 4 },
  evActBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  evActText: { fontSize: 9, fontWeight: 'bold', color: '#FFFFFF' },
});
