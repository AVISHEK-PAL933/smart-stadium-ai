import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { GlassCard } from '../../components/GlassCard';
import { Theme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { router } from 'expo-router';

export default function SmartTicket() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];

  const [isOfflineMode, setIsOfflineMode] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ticketStatus, setTicketStatus] = useState('VALID'); // VALID, USED

  const qrPulse = useSharedValue(1);

  useEffect(() => {
    qrPulse.value = withRepeat(
      withSequence(withTiming(1.05, { duration: 1000 }), withTiming(0.95, { duration: 1000 })),
      -1,
      true
    );
  }, [qrPulse]);

  const animatedQRStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: qrPulse.value }],
    };
  });

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleOfflineToggle = () => {
    setIsOfflineMode(!isOfflineMode);
    showAlert(
      !isOfflineMode ? 'Offline Mode Enabled' : 'Online Mode Restored',
      !isOfflineMode
        ? 'This ticket has been cached locally. You can access it anytime even without stadium connectivity.'
        : 'Stadium connectivity restored. Ticket validation status refreshed.'
    );
  };

  const handleDownload = () => {
    showAlert('Download Complete', 'FIFA Smart Ticket PDF has been saved to your downloads.');
  };

  const handleShare = () => {
    showAlert('Share Ticket', 'Ticket sharing links generated successfully. Forward to recipient.');
  };

  const handleSaveToDevice = () => {
    showAlert(
      'Saved to Wallet',
      'StadiumMind ticket added successfully to Google Wallet/Apple Wallet.'
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Smart Ticket Wallet" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Ticket Wallet Card */}
        <GlassCard style={styles.card}>
          <View style={styles.ticketHeader}>
            <View style={styles.ticketBrand}>
              <MaterialCommunityIcons name="soccer" size={24} color={themeColors.tint} />
              <Text style={[styles.brandText, { color: themeColors.text }]}>
                FIFA WORLD CUP 2026
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: ticketStatus === 'VALID' ? '#00E67633' : '#EF444433',
                  borderColor: ticketStatus === 'VALID' ? '#00E676' : '#EF4444',
                },
              ]}>
              <Text
                style={[
                  styles.statusText,
                  { color: ticketStatus === 'VALID' ? '#00E676' : '#EF4444' },
                ]}>
                {ticketStatus}
              </Text>
            </View>
          </View>

          {/* Match Details */}
          <View style={[styles.matchSection, { borderBottomColor: themeColors.border }]}>
            <Text style={[styles.matchTeams, { color: themeColors.text }]}>
              BRAZIL vs ARGENTINA
            </Text>
            <Text style={[styles.matchSub, { color: themeColors.icon }]}>
              🏆 Group Stage Match 14
            </Text>
            <Text style={[styles.matchDate, { color: themeColors.icon }]}>
              📅 Wed, July 15, 2026 • 20:00 (EST)
            </Text>
            <Text style={[styles.matchStadium, { color: themeColors.icon }]}>
              📍 MetLife Stadium, NJ
            </Text>
          </View>

          {/* Seat Layout Details */}
          <View style={[styles.seatRow, { borderBottomColor: themeColors.border }]}>
            <View style={styles.seatCell}>
              <Text style={[styles.seatLabel, { color: themeColors.icon }]}>GATE</Text>
              <Text style={[styles.seatValue, { color: themeColors.text }]}>D</Text>
            </View>
            <View style={styles.seatCell}>
              <Text style={[styles.seatLabel, { color: themeColors.icon }]}>SECTION</Text>
              <Text style={[styles.seatValue, { color: themeColors.text }]}>112</Text>
            </View>
            <View style={styles.seatCell}>
              <Text style={[styles.seatLabel, { color: themeColors.icon }]}>ROW</Text>
              <Text style={[styles.seatValue, { color: themeColors.text }]}>M</Text>
            </View>
            <View style={styles.seatCell}>
              <Text style={[styles.seatLabel, { color: themeColors.icon }]}>SEAT</Text>
              <Text style={[styles.seatValue, { color: themeColors.text }]}>42</Text>
            </View>
          </View>

          {/* Ticket ID & Holder info */}
          <View style={styles.infoGrid}>
            <View>
              <Text style={[styles.infoLabel, { color: themeColors.icon }]}>TICKET HOLDER</Text>
              <Text style={[styles.infoVal, { color: themeColors.text }]}>Alex Johnson</Text>
            </View>
            <View style={styles.alignRight}>
              <Text style={[styles.infoLabel, { color: themeColors.icon }]}>CATEGORY</Text>
              <Text style={[styles.infoVal, { color: themeColors.tint }]}>Category 1 - Gold</Text>
            </View>
          </View>

          {/* Animated QR Code Container */}
          <View style={styles.qrWrapper}>
            <Animated.View
              style={[
                styles.qrContainer,
                { backgroundColor: '#FFFFFF', shadowColor: themeColors.tint },
                animatedQRStyle,
              ]}>
              <MaterialCommunityIcons name="qrcode" size={160} color="#000000" />
            </Animated.View>
            <Text style={[styles.ticketId, { color: themeColors.icon }]}>
              TICKET ID: WC-2026-98716A
            </Text>
          </View>

          {/* Offline Sync State Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleOfflineToggle}
            style={[
              styles.offlineBtn,
              {
                borderColor: isOfflineMode ? '#00E676' : themeColors.border,
                backgroundColor: themeColors.card,
              },
            ]}>
            <MaterialCommunityIcons
              name={isOfflineMode ? 'cloud-check-outline' : 'cloud-off-outline'}
              size={20}
              color={isOfflineMode ? '#00E676' : themeColors.icon}
            />
            <Text
              style={[styles.offlineText, { color: isOfflineMode ? '#00E676' : themeColors.text }]}>
              {isOfflineMode ? 'Saved Offline Successfully' : 'Enable Offline Mode Cache'}
            </Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Action Controls */}
        <View style={styles.walletControls}>
          <TouchableOpacity
            onPress={handleSaveToDevice}
            style={[
              styles.controlBtn,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <MaterialCommunityIcons name="wallet" size={20} color={themeColors.text} />
            <Text style={[styles.controlText, { color: themeColors.text }]}>Save to Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            style={[
              styles.controlBtn,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <MaterialCommunityIcons name="share-variant" size={20} color={themeColors.text} />
            <Text style={[styles.controlText, { color: themeColors.text }]}>Share Pass</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDownload}
            style={[
              styles.controlBtn,
              { backgroundColor: themeColors.card, borderColor: themeColors.border },
            ]}>
            <MaterialCommunityIcons name="download" size={20} color={themeColors.text} />
            <Text style={[styles.controlText, { color: themeColors.text }]}>Download PDF</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation / Gate instructions */}
        <GlassCard style={styles.instructionCard}>
          <Text style={[styles.instructTitle, { color: themeColors.text }]}>
            Entry Instructions
          </Text>
          <Text style={[styles.instructBody, { color: themeColors.icon }]}>
            Scan the QR code at Gate D turnstiles. Doors open at 17:30. Ensure screen brightness is
            set to max.
          </Text>
          <PrimaryButton
            title="Navigate to Gate D"
            onPress={() =>
              router.push({ pathname: '/(modules)/navigation', params: { destId: 'gate_d' } })
            }
            style={styles.navGateBtn}
          />
          <PrimaryButton
            title="Navigate to Seat 42"
            onPress={() =>
              router.push({ pathname: '/(modules)/navigation', params: { destId: 'seat' } })
            }
            style={[styles.navGateBtn, { marginTop: 10 }]}
          />
        </GlassCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Theme.spacing.l, paddingBottom: 100 },
  card: { padding: Theme.spacing.l, borderRadius: 24 },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  ticketBrand: { flexDirection: 'row', alignItems: 'center', gap: Theme.spacing.s },
  brandText: { fontWeight: '900', fontSize: Theme.typography.sizes.s, letterSpacing: 1 },
  statusBadge: { borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  matchSection: {
    borderBottomWidth: 1,
    paddingBottom: Theme.spacing.m,
    marginBottom: Theme.spacing.m,
  },
  matchTeams: { fontSize: Theme.typography.sizes.l, fontWeight: '900', marginBottom: 4 },
  matchSub: { fontSize: Theme.typography.sizes.s, fontWeight: '600', marginBottom: 6 },
  matchDate: { fontSize: Theme.typography.sizes.m - 2, marginBottom: 4 },
  matchStadium: { fontSize: Theme.typography.sizes.m - 2 },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: Theme.spacing.m,
    marginBottom: Theme.spacing.m,
  },
  seatCell: { alignItems: 'center' },
  seatLabel: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold', marginBottom: 4 },
  seatValue: { fontSize: Theme.typography.sizes.l, fontWeight: 'bold' },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xl,
  },
  infoLabel: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold', marginBottom: 4 },
  infoVal: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold' },
  alignRight: { alignItems: 'flex-end' },
  qrWrapper: { alignSelf: 'center', alignItems: 'center', marginBottom: Theme.spacing.l },
  qrContainer: {
    padding: Theme.spacing.m,
    borderRadius: Theme.shapes.borderRadius.m,
    marginBottom: Theme.spacing.m,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  ticketId: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold', opacity: 0.7 },
  offlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.m,
    borderRadius: 16,
    borderStyle: 'dashed',
    borderWidth: 1,
    gap: Theme.spacing.s,
  },
  offlineText: { fontSize: Theme.typography.sizes.s, fontWeight: 'bold' },
  walletControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.l,
    marginBottom: Theme.spacing.xl,
    gap: Theme.spacing.s,
  },
  controlBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    gap: 4,
  },
  controlText: { fontSize: Theme.typography.sizes.s - 2, fontWeight: 'bold' },
  instructionCard: { padding: Theme.spacing.l, borderRadius: 24, gap: Theme.spacing.s },
  instructTitle: { fontSize: Theme.typography.sizes.m, fontWeight: 'bold' },
  instructBody: {
    fontSize: Theme.typography.sizes.m - 2,
    lineHeight: 18,
    marginBottom: Theme.spacing.s,
  },
  navGateBtn: { width: '100%' },
});
