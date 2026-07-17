import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/theme';
import { EmergencyAlert } from '../../data/crowdSafetyData';

interface Props {
  alert: EmergencyAlert;
  onResolve?: (id: string) => void;
}

const PRIORITY_COLORS: Record<EmergencyAlert['priority'], string> = {
  critical: '#FF5252',
  high:     '#FF7043',
  medium:   '#FFC107',
  low:      '#00E676',
};

const STATUS_COLORS: Record<EmergencyAlert['status'], string> = {
  active:     '#FF5252',
  responding: '#FFC107',
  resolved:   '#00E676',
};

const TYPE_ICONS: Record<EmergencyAlert['type'], string> = {
  'Medical Emergency':   'medical-bag',
  'Fire':                'fire',
  'Suspicious Activity': 'eye-alert-outline',
  'Lost Child':          'account-child',
  'Power Failure':       'lightning-bolt',
  'Security Incident':   'police-badge',
};

export const AlertCard: React.FC<Props> = ({ alert, onResolve }) => {
  const priorityColor = PRIORITY_COLORS[alert.priority];
  const statusColor   = STATUS_COLORS[alert.status];
  const typeIcon      = TYPE_ICONS[alert.type];

  return (
    <View style={[styles.card, { borderLeftColor: priorityColor }]}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={[styles.iconWrap, { backgroundColor: priorityColor + '22' }]}>
          <MaterialCommunityIcons name={typeIcon as any} size={20} color={priorityColor} />
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.alertType}>{alert.type}</Text>
          <Text style={styles.alertLocation}>
            <MaterialCommunityIcons name="map-marker" size={10} color="#8F9BB3" />
            {'  '}{alert.location}
          </Text>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '22' }]}>
          <Text style={[styles.priorityText, { color: priorityColor }]}>
            {alert.priority.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Meta Row */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons name="clock-outline" size={11} color="#8F9BB3" />
          <Text style={styles.metaText}>{alert.timestamp}</Text>
        </View>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons name="account-tie" size={11} color="#8F9BB3" />
          <Text style={styles.metaText}>{alert.assignedTeam}</Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: statusColor + '22' }]}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {alert.status.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Resolve button for non-resolved */}
      {alert.status !== 'resolved' && onResolve && (
        <TouchableOpacity
          style={[styles.resolveBtn, { borderColor: statusColor + '55' }]}
          onPress={() => onResolve(alert.id)}
          activeOpacity={0.75}>
          <MaterialCommunityIcons name="check-circle-outline" size={14} color={statusColor} />
          <Text style={[styles.resolveBtnText, { color: statusColor }]}>Mark Resolved</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(13, 27, 48, 0.85)',
    borderRadius: Theme.shapes.borderRadius.m,
    borderWidth: 1,
    borderColor: 'rgba(0,200,255,0.12)',
    borderLeftWidth: 4,
    padding: Theme.spacing.m,
    gap: Theme.spacing.s,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Theme.spacing.s },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: { flex: 1, gap: 3 },
  alertType: { color: '#FFFFFF', fontSize: Theme.typography.sizes.s, fontWeight: '900' },
  alertLocation: { color: '#8F9BB3', fontSize: 11 },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  priorityText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.m,
    flexWrap: 'wrap',
  },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: '#8F9BB3', fontSize: 10 },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  statusDot: { width: 5, height: 5, borderRadius: 3 },
  statusText: { fontSize: 9, fontWeight: '900', letterSpacing: 0.4 },
  resolveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  resolveBtnText: { fontSize: 11, fontWeight: '700' },
});
