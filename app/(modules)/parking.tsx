import { useGlobalContext } from '../../context/GlobalProvider';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { Colors } from '../../constants/colors';

import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedBackground } from '../../components/AnimatedBackground';

export default function ParkingAssistant() {
  const { theme, themeColors } = useGlobalContext();

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

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Hi! Ask me which parking place is empty or full!' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMessages = [...chatMessages, { role: 'user' as const, text: inputText }];
    setChatMessages(newMessages);
    setInputText('');

    setTimeout(() => {
      let botResponse = "I'm not sure about that.";
      const lowerInput = inputText.toLowerCase();

      if (lowerInput.includes('empty') || lowerInput.includes('available')) {
        const availableZones = parkingZonesData.filter(z => z.available > 0).map(z => `${z.name} (${z.available})`).join(', ');
        botResponse = `Available spaces: ${availableZones}`;
      } else if (lowerInput.includes('full')) {
        const fullZones = parkingZonesData.filter(z => z.available === 0).map(z => z.name).join(', ');
        botResponse = fullZones ? `Full zones: ${fullZones}` : 'No zones are currently full.';
      } else {
        botResponse = "You can ask me which parking zones are 'empty' or 'full'.";
      }

      setChatMessages(msgs => [...msgs, { role: 'bot' as const, text: botResponse }]);
    }, 500);
  };

  const showAlert = (title: string, msg: string) => {
    if (Platform.OS === 'web') {
      alert(`${title}\n\n${msg}`);
    } else {
      Alert.alert(title, msg);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#081223', '#0A0F1E', '#16213E']}
        style={StyleSheet.absoluteFillObject}
      />
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1518605368461-1e1e38ce8058?q=80&w=2000&auto=format&fit=crop' }}
        style={[StyleSheet.absoluteFillObject, { opacity: 0.08 }]}
        resizeMode="cover"
      />
      <AnimatedBackground />

      <Header title="Smart Parking & Transit" />

      {/* Live Alerts Announcement */}
      <View style={[styles.trafficAlertBar, { backgroundColor: 'rgba(94, 53, 177, 0.9)' }]}>
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
                activeTab === tab && [styles.activeTab, { borderBottomColor: '#00F2FE' }],
              ]}>
              <Text
                style={[
                  styles.tabBtnText,
                  { color: activeTab === tab ? '#FFFFFF' : 'rgba(255,255,255,0.5)' },
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'PARKING' && (
          <View style={styles.tabContent}>
            {/* Removed inline Chatbot Interface from here, moved to floating modal/view */}

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
            <LinearGradient 
              colors={['rgba(0, 200, 255, 0.1)', 'rgba(0, 200, 255, 0.02)']}
              style={[styles.mapCard, { borderColor: 'rgba(0, 200, 255, 0.3)', borderWidth: 1 }]}
            >
              <Text style={[styles.sectionHeading, { color: '#FFFFFF' }]}>
                Live Parking Lot Map
              </Text>
              <View style={[styles.mapGraphicLayout, { borderColor: 'rgba(0, 200, 255, 0.2)' }]}>
                {/* Central Stadium Marker */}
                <View style={[styles.stadiumCenter, { backgroundColor: 'rgba(0, 200, 255, 0.1)', borderColor: 'rgba(0, 200, 255, 0.5)' }]}>
                  <MaterialCommunityIcons name="stadium" size={32} color="#00C8FF" />
                  <Text style={{ color: '#00C8FF', fontSize: 8, fontWeight: '900', marginTop: 2, textShadowColor: '#00C8FF', textShadowRadius: 10 }}>STADIUM</Text>
                </View>

                {/* Zones distributed dynamically around the stadium based on real data */}
                <View style={[styles.zoneMapItem, { top: 15, left: 15, backgroundColor: parkingZonesData[0].available === 0 ? 'rgba(255, 82, 82, 0.15)' : 'rgba(0, 200, 255, 0.15)', borderColor: parkingZonesData[0].available === 0 ? '#FF5252' : '#00C8FF' }, parkingZonesData[0].available === 0 ? styles.mapGlowRed : styles.mapGlowCyan]}>
                   <Text style={[styles.zoneNameText, { color: parkingZonesData[0].available === 0 ? '#FF5252' : '#00C8FF' }]}>Zone A</Text>
                </View>
                <View style={[styles.zoneMapItem, { top: 15, right: 15, backgroundColor: parkingZonesData[1].available === 0 ? 'rgba(255, 82, 82, 0.15)' : 'rgba(0, 200, 255, 0.15)', borderColor: parkingZonesData[1].available === 0 ? '#FF5252' : '#00C8FF' }, parkingZonesData[1].available === 0 ? styles.mapGlowRed : styles.mapGlowCyan]}>
                   <Text style={[styles.zoneNameText, { color: parkingZonesData[1].available === 0 ? '#FF5252' : '#00C8FF' }]}>Zone B</Text>
                </View>
                <View style={[styles.zoneMapItem, { bottom: 15, left: 15, backgroundColor: parkingZonesData[2].available === 0 ? 'rgba(255, 82, 82, 0.15)' : 'rgba(0, 200, 255, 0.15)', borderColor: parkingZonesData[2].available === 0 ? '#FF5252' : '#00C8FF' }, parkingZonesData[2].available === 0 ? styles.mapGlowRed : styles.mapGlowCyan]}>
                   <Text style={[styles.zoneNameText, { color: parkingZonesData[2].available === 0 ? '#FF5252' : '#00C8FF' }]}>Zone C</Text>
                </View>
                <View style={[styles.zoneMapItem, { bottom: 15, right: 15, backgroundColor: parkingZonesData[3].available === 0 ? 'rgba(255, 82, 82, 0.15)' : 'rgba(0, 200, 255, 0.15)', borderColor: parkingZonesData[3].available === 0 ? '#FF5252' : '#00C8FF' }, parkingZonesData[3].available === 0 ? styles.mapGlowRed : styles.mapGlowCyan]}>
                   <Text style={[styles.zoneNameText, { color: parkingZonesData[3].available === 0 ? '#FF5252' : '#00C8FF' }]}>Zone D</Text>
                </View>
                <View style={[styles.zoneMapItem, { top: '42%', left: 15, backgroundColor: parkingZonesData[4].available === 0 ? 'rgba(255, 82, 82, 0.15)' : 'rgba(0, 200, 255, 0.15)', borderColor: parkingZonesData[4].available === 0 ? '#FF5252' : '#00C8FF' }, parkingZonesData[4].available === 0 ? styles.mapGlowRed : styles.mapGlowCyan]}>
                   <Text style={[styles.zoneNameText, { color: parkingZonesData[4].available === 0 ? '#FF5252' : '#00C8FF' }]}>Zone E</Text>
                </View>
                <View style={[styles.zoneMapItem, { top: '42%', right: 15, backgroundColor: parkingZonesData[5].available === 0 ? 'rgba(255, 82, 82, 0.15)' : 'rgba(0, 200, 255, 0.15)', borderColor: parkingZonesData[5].available === 0 ? '#FF5252' : '#00C8FF' }, parkingZonesData[5].available === 0 ? styles.mapGlowRed : styles.mapGlowCyan]}>
                   <Text style={[styles.zoneNameText, { color: parkingZonesData[5].available === 0 ? '#FF5252' : '#00C8FF' }]}>Zone F</Text>
                </View>

                {/* User car node routing shown only if reserved */}
                {isReserved && (
                  <>
                    <View style={[styles.carNodePoint, { right: 25, top: 40 }]} />
                    <View
                      style={[
                        styles.routeWalkingLine,
                        {
                          right: 35,
                          top: 45,
                          width: 80,
                          height: 2,
                          backgroundColor: '#FFD700',
                          borderStyle: 'dashed',
                        },
                      ]}
                    />
                  </>
                )}
              </View>
            </LinearGradient>

            {/* Parking Zones grid lists */}
            <Text style={[styles.sectionHeading, { color: '#FFFFFF' }]}>
              Parking Zone Availabilities
            </Text>
            <View style={styles.zonesGrid}>
              {parkingZonesData.map((zone) => {
                const isFull = zone.available === 0;
                const capacityPercent = ((zone.total - zone.available) / zone.total) * 100;
                
                return (
                  <LinearGradient 
                    key={zone.name} 
                    colors={['rgba(0, 200, 255, 0.1)', 'rgba(0, 200, 255, 0.02)']}
                    style={[styles.zoneCard, isFull ? styles.zoneCardFull : styles.zoneCardOpen]}
                  >
                    <View style={styles.zoneCardHeader}>
                      <Text style={[styles.zoneNameTitle, { color: '#FFFFFF' }]}>{zone.name}</Text>
                      <View style={[styles.badge, { backgroundColor: isFull ? 'rgba(255, 82, 82, 0.2)' : 'rgba(0, 230, 118, 0.2)', borderColor: isFull ? '#FF5252' : '#00E676', borderWidth: 1 }]}>
                         <Text style={[styles.badgeText, { color: isFull ? '#FF5252' : '#00E676' }]}>
                           {isFull ? 'FULL' : 'OPEN'}
                         </Text>
                      </View>
                    </View>

                    <Text style={[styles.zoneStatsLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                      {zone.type} • {zone.walkTime} walk
                    </Text>

                    <View style={styles.capacityRow}>
                      <Text style={[styles.capacityText, { color: '#FFFFFF' }]}>
                        {zone.available} spaces left
                      </Text>
                      <Text style={[styles.capacitySub, { color: 'rgba(255, 255, 255, 0.4)' }]}>
                        / {zone.total}
                      </Text>
                    </View>

                    <View style={[styles.progressBarBase, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                      <View style={[styles.progressBarFill, { width: `${capacityPercent}%`, backgroundColor: isFull ? '#FF5252' : '#00C8FF' }]} />
                    </View>

                    {!isFull && (
                      <TouchableOpacity onPress={() => handleReserve(zone.name)} style={styles.reserveBtnFull}>
                        <Text style={styles.reserveBtnLabelText}>Book Spot - {zone.cost}</Text>
                      </TouchableOpacity>
                    )}
                  </LinearGradient>
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
              <LinearGradient 
                key={transit.type} 
                colors={['rgba(0, 200, 255, 0.1)', 'rgba(0, 200, 255, 0.02)']}
                style={[styles.transitCard, { borderColor: 'rgba(0, 200, 255, 0.3)', borderWidth: 1 }]}
              >
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
                      color="#00C8FF"
                    />
                    <Text style={[styles.transitNameText, { color: '#FFFFFF' }]}>
                      {transit.type} • {transit.route}
                    </Text>
                  </View>
                  <View style={[styles.etaBadge, { backgroundColor: 'rgba(0, 200, 255, 0.15)', borderColor: '#00C8FF', borderWidth: 1 }]}>
                    <Text style={[styles.etaBadgeText, { color: '#00C8FF' }]}>{transit.eta}</Text>
                  </View>
                </View>
                <Text style={[styles.transitDepotText, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                  📍 Pickup Station: {transit.station}
                </Text>
              </LinearGradient>
            ))}
          </View>
        )}

        {activeTab === 'TRAFFIC' && (
          <View style={styles.tabContent}>
            <LinearGradient 
              colors={['rgba(255, 179, 0, 0.1)', 'rgba(255, 179, 0, 0.02)']}
              style={[styles.trafficAlertCard, { borderColor: 'rgba(255, 179, 0, 0.3)', borderWidth: 1 }]}
            >
              <Text style={[styles.sectionHeading, { color: '#FFFFFF' }]}>
                Congestion & Closure Advisories
              </Text>

              <View style={styles.advisoryRow}>
                <MaterialCommunityIcons name="alert-octagon" size={20} color="#FF5252" />
                <View style={styles.advInfo}>
                  <Text style={[styles.advTitle, { color: '#FFFFFF' }]}>
                    Road Closure: Route 3 ramp
                  </Text>
                  <Text style={[styles.advSub, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    Due to high match security corridor. Re-opens at 23:30.
                  </Text>
                </View>
              </View>

              <View style={styles.advisoryRow}>
                <MaterialCommunityIcons name="clock-alert-outline" size={20} color="#FFB300" />
                <View style={styles.advInfo}>
                  <Text style={[styles.advTitle, { color: '#FFFFFF' }]}>
                    Traffic delay: Stadium exit way
                  </Text>
                  <Text style={[styles.advSub, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    Congestion level high. Extra travel delay: 14 mins.
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {activeTab === 'EV' && (
          <View style={styles.tabContent}>
            <LinearGradient 
              colors={['rgba(0, 200, 255, 0.1)', 'rgba(0, 200, 255, 0.02)']}
              style={[styles.evCard, { borderColor: 'rgba(0, 200, 255, 0.3)', borderWidth: 1 }]}
            >
              <Text style={[styles.sectionHeading, { color: '#FFFFFF' }]}>
                Zone A Fast Chargers (EV)
              </Text>

              <View style={styles.evProgressRow}>
                <View>
                  <Text style={[styles.evTitleText, { color: '#FFFFFF' }]}>
                    Stall EV-14 Charger
                  </Text>
                  <Text style={[styles.evSubText, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                    Fast charging speed: 150 kW
                  </Text>
                </View>
                <Text style={[styles.evPercentText, { color: '#00C8FF' }]}>
                  {evChargingProgress}%
                </Text>
              </View>

              <View style={[styles.chargingBarBase, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                <View
                  style={[
                    styles.chargingBarFill,
                    { width: `${evChargingProgress}%`, backgroundColor: '#00C8FF' },
                  ]}
                />
              </View>

              <View style={styles.evActions}>
                <TouchableOpacity
                  onPress={() => setEvChargingProgress((prev) => Math.min(prev + 10, 100))}
                  style={[styles.evActBtn, { backgroundColor: 'rgba(0, 200, 255, 0.15)', borderColor: '#00C8FF', borderWidth: 1 }]}>
                  <Text style={[styles.evActText, { color: '#00C8FF' }]}>Boost Charge</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleBookEV}
                  style={[styles.evActBtn, { borderColor: 'rgba(255, 255, 255, 0.2)', borderWidth: 1 }]}>
                  <Text style={[styles.evActText, { color: '#FFFFFF' }]}>
                    {evReserved ? 'Reserved Slot' : 'Reserve Next Stall'}
                  </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}
      </ScrollView>

      {/* Floating Chatbot UI */}
      {isChatbotOpen && (
        <View style={[styles.floatingChatbotContainer, { backgroundColor: themeColors.background, borderColor: themeColors.border }]}>
          <View style={[styles.floatingChatHeader, { borderBottomColor: themeColors.border }]}>
            <MaterialCommunityIcons name="robot-outline" size={20} color={themeColors.tint} />
            <Text style={[styles.chatbotTitle, { color: themeColors.text }]}>Parking Assistant</Text>
            <TouchableOpacity onPress={() => setIsChatbotOpen(false)} style={styles.closeChatBtn}>
              <MaterialCommunityIcons name="close" size={20} color={themeColors.icon} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.chatArea} nestedScrollEnabled>
            {chatMessages.map((msg, idx) => (
              <View key={idx} style={[styles.chatBubble, msg.role === 'user' ? [styles.chatUser, { backgroundColor: themeColors.tint }] : [styles.chatBot, { backgroundColor: themeColors.border }]]}>
                <Text style={{ color: msg.role === 'user' ? '#fff' : themeColors.text, fontSize: 12 }}>{msg.text}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.chatInputRow}>
            <TextInput
              style={[styles.chatInput, { color: themeColors.text, borderColor: themeColors.border }]}
              placeholder="Ask about empty or full..."
              placeholderTextColor={themeColors.icon}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity onPress={handleSendMessage} style={[styles.chatSendBtn, { backgroundColor: themeColors.tint }]}>
              <MaterialCommunityIcons name="send" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Floating Bot Button */}
      {!isChatbotOpen && (
        <TouchableOpacity onPress={() => setIsChatbotOpen(true)} style={[styles.fabBot, { backgroundColor: themeColors.tint }]}>
          <MaterialCommunityIcons name="robot" size={24} color="#FFFFFF" />
          <Text style={[styles.fabBotText, { color: '#FFFFFF' }]}>Ask Bot</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  trafficAlertBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.s,
    paddingVertical: 12,
    paddingHorizontal: Theme.spacing.l,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  alertBarText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 9, flex: 1 },
  content: { padding: Theme.spacing.l, paddingBottom: 100 },

  tabsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Theme.spacing.m, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, overflow: 'hidden' },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Theme.spacing.m,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: { borderBottomWidth: 2 },
  tabBtnText: { fontSize: 10, fontWeight: 'bold' },
  tabContent: { gap: Theme.spacing.m },

  chatbotCard: { padding: Theme.spacing.m, borderRadius: 24, gap: Theme.spacing.s },
  chatbotHeader: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.s, marginBottom: 4 },
  chatbotTitle: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold', flex: 1 },
  chatArea: { maxHeight: 250, paddingVertical: 4 },
  chatBubble: { padding: 10, borderRadius: 12, marginBottom: 8, maxWidth: '85%' },
  chatUser: { alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  chatBot: { alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  chatInputRow: { flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 4, paddingBottom: 8 },
  chatInput: { flex: 1, borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, fontSize: 12 },
  chatSendBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  fabBot: { position: 'absolute', bottom: 30, right: 20, flexDirection: 'row', gap: 6, paddingHorizontal: 20, paddingVertical: 14, borderRadius: 100, alignItems: 'center', justifyContent: 'center', elevation: 8, shadowColor: '#000', shadowOpacity: 0.15, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12 },
  fabBotText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 },
  floatingChatbotContainer: { position: 'absolute', bottom: 30, right: 20, left: 20, borderWidth: 1, borderRadius: 24, padding: 16, elevation: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 8 }, shadowRadius: 20, maxHeight: 400 },
  floatingChatHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingBottom: 10, borderBottomWidth: 1, marginBottom: 8 },
  closeChatBtn: { padding: 4 },

  reservationSummaryCard: { padding: Theme.spacing.m, borderRadius: 24, gap: Theme.spacing.m },
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

  mapCard: { padding: Theme.spacing.m, borderRadius: 24, gap: Theme.spacing.s, shadowColor: '#00C8FF', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 15, overflow: 'hidden' },
  sectionHeading: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  mapGraphicLayout: {
    height: 220,
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: 'rgba(0, 200, 255, 0.05)',
    borderColor: 'rgba(0, 200, 255, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stadiumCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 200, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(0, 200, 255, 0.5)',
    shadowColor: '#00C8FF',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
  },
  zoneMapItem: {
    position: 'absolute',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  mapGlowCyan: {
    shadowColor: '#00C8FF',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  mapGlowRed: {
    shadowColor: '#FF5252',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  zoneSquare: { position: 'absolute', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  zoneNameText: { fontSize: 10, fontWeight: 'bold' },
  carNodePoint: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFD700',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 10,
  },
  routeWalkingLine: { position: 'absolute', opacity: 0.7, zIndex: 5 },

  zonesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Theme.spacing.m, justifyContent: 'space-between' },
  zoneCard: { 
    width: '48%', 
    padding: Theme.spacing.m, 
    borderRadius: 24, 
    gap: 8, 
    minWidth: 150,
    borderWidth: 1,
    overflow: 'hidden',
  },
  zoneCardOpen: {
    borderColor: 'rgba(0, 200, 255, 0.3)',
    shadowColor: '#00C8FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  zoneCardFull: {
    borderColor: 'rgba(255, 82, 82, 0.3)',
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  zoneCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 8, fontWeight: '900' },
  zoneNameTitle: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  zoneStatsLabel: { fontSize: Theme.typography.sizes.s - 2, fontWeight: '500' },
  capacityRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 4 },
  capacityText: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  capacitySub: { fontSize: Theme.typography.sizes.s - 2 },
  progressBarBase: { height: 6, borderRadius: 6, width: '100%', overflow: 'hidden', marginTop: 4, marginBottom: 8 },
  progressBarFill: { height: '100%', borderRadius: 6 },
  reserveBtnFull: { paddingVertical: 10, borderRadius: 16, alignItems: 'center', backgroundColor: 'rgba(0, 200, 255, 0.15)', borderWidth: 1, borderColor: 'rgba(0, 200, 255, 0.5)' },
  reserveBtnLabelText: { color: '#00C8FF', fontSize: 11, fontWeight: 'bold' },

  transitCard: { padding: Theme.spacing.m, borderRadius: 24, gap: Theme.spacing.s, overflow: 'hidden' },
  transitHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  transitTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.s },
  transitNameText: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  etaBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  etaBadgeText: { color: '#00C8FF', fontSize: 10, fontWeight: '900' },
  transitDepotText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: '500' },

  trafficAlertCard: { padding: Theme.spacing.m, borderRadius: 24, gap: Theme.spacing.m, overflow: 'hidden' },
  advisoryRow: { flexDirection: 'row', gap: Theme.spacing.m, alignItems: 'center' },
  advInfo: { gap: 2, flex: 1 },
  advTitle: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  advSub: { fontSize: Theme.typography.sizes.s - 2, lineHeight: 16 },

  evCard: { padding: Theme.spacing.m, borderRadius: 24, gap: Theme.spacing.m, overflow: 'hidden' },
  evProgressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  evTitleText: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  evSubText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold', opacity: 0.6 },
  evPercentText: { fontSize: Theme.typography.sizes.m, fontWeight: '900' },
  chargingBarBase: { height: 8, borderRadius: 4, width: '100%', overflow: 'hidden' },
  chargingBarFill: { height: '100%', borderRadius: 4 },
  evActions: { flexDirection: 'row', gap: Theme.spacing.s, marginTop: 4 },
  evActBtn: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  evActText: { fontSize: 9, fontWeight: 'bold', color: '#FFFFFF' },
});
