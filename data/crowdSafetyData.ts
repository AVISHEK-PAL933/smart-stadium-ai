// Phase 13 — AI Crowd Safety & Emergency Management Mock Data

export type DensityLevel = 'safe' | 'busy' | 'overcrowded';

export interface StadiumZone {
  id: string;
  name: string;
  occupancy: number;
  capacity: number;
  density: DensityLevel;
  trend: 'rising' | 'stable' | 'falling';
}

export interface EmergencyAlert {
  id: string;
  type:
    | 'Medical Emergency'
    | 'Fire'
    | 'Suspicious Activity'
    | 'Lost Child'
    | 'Power Failure'
    | 'Security Incident';
  priority: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  timestamp: string;
  status: 'active' | 'responding' | 'resolved';
  assignedTeam: string;
}

export interface IncidentStep {
  label: string;
  timestamp: string;
  done: boolean;
}

export interface IncidentRecord {
  id: string;
  title: string;
  location: string;
  steps: IncidentStep[];
}

export interface CameraFeed {
  id: string;
  location: string;
  status: 'online' | 'offline';
  detection: 'Normal' | 'Crowd Build-up' | 'Fight Detected' | 'Suspicious Bag' | 'Camera Offline';
}

export interface EmergencyContact {
  id: string;
  role: string;
  name: string;
  phone: string;
  icon: string;
  color: string;
}

export interface AIRecommendation {
  id: string;
  message: string;
  zone: string;
  urgency: 'critical' | 'warning' | 'info';
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  message: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  timestamp: string;
  read: boolean;
}

export interface PredictionItem {
  id: string;
  label: string;
  value: string;
  confidence: number;
  icon: string;
  color: string;
}

// ─── ZONES ──────────────────────────────────────────────────────────────────

export const STADIUM_ZONES: StadiumZone[] = [
  { id: 'z1', name: 'North Stand',   occupancy: 14200, capacity: 16000, density: 'busy',        trend: 'rising'  },
  { id: 'z2', name: 'South Stand',   occupancy: 7800,  capacity: 16000, density: 'safe',        trend: 'stable'  },
  { id: 'z3', name: 'East Stand',    occupancy: 15800, capacity: 16000, density: 'overcrowded', trend: 'rising'  },
  { id: 'z4', name: 'West Stand',    occupancy: 11200, capacity: 16000, density: 'busy',        trend: 'falling' },
  { id: 'z5', name: 'VIP',           occupancy: 820,   capacity: 1000,  density: 'safe',        trend: 'stable'  },
  { id: 'z6', name: 'Food Court',    occupancy: 3700,  capacity: 4000,  density: 'overcrowded', trend: 'rising'  },
  { id: 'z7', name: 'Parking',       occupancy: 8900,  capacity: 12000, density: 'busy',        trend: 'stable'  },
  { id: 'z8', name: 'Entry Gates',   occupancy: 2200,  capacity: 2000,  density: 'overcrowded', trend: 'rising'  },
];

// ─── ALERTS ─────────────────────────────────────────────────────────────────

export const EMERGENCY_ALERTS: EmergencyAlert[] = [
  {
    id: 'A001', type: 'Medical Emergency',  priority: 'critical', location: 'East Stand — Sec 118',
    timestamp: '18:04:32', status: 'responding', assignedTeam: 'Medical Unit 3',
  },
  {
    id: 'A002', type: 'Suspicious Activity', priority: 'high', location: 'Gate B — Entry',
    timestamp: '17:58:10', status: 'active', assignedTeam: 'Security Alpha',
  },
  {
    id: 'A003', type: 'Lost Child',         priority: 'high', location: 'Food Court — Level 2',
    timestamp: '17:51:45', status: 'responding', assignedTeam: 'Safety Squad',
  },
  {
    id: 'A004', type: 'Fire',               priority: 'critical', location: 'Concourse C — Kitchen',
    timestamp: '17:42:20', status: 'resolved', assignedTeam: 'Fire Response',
  },
  {
    id: 'A005', type: 'Power Failure',      priority: 'medium', location: 'West Stand — Panel 4',
    timestamp: '17:35:00', status: 'resolved', assignedTeam: 'Facilities',
  },
  {
    id: 'A006', type: 'Security Incident',  priority: 'high', location: 'North Stand — Row G',
    timestamp: '18:10:05', status: 'active', assignedTeam: 'Security Bravo',
  },
];

// ─── INCIDENT TIMELINE ───────────────────────────────────────────────────────

export const INCIDENT_RECORDS: IncidentRecord[] = [
  {
    id: 'INC-1042',
    title: 'Medical Emergency — East Stand',
    location: 'Section 118, Row D',
    steps: [
      { label: 'Alert Created',   timestamp: '18:04:32', done: true  },
      { label: 'Team Assigned',   timestamp: '18:04:51', done: true  },
      { label: 'Team Arrived',    timestamp: '18:07:14', done: true  },
      { label: 'Issue Resolved',  timestamp: '—',        done: false },
    ],
  },
  {
    id: 'INC-1041',
    title: 'Fire Alarm — Concourse C',
    location: 'Kitchen Zone, Level 1',
    steps: [
      { label: 'Alert Created',   timestamp: '17:42:20', done: true },
      { label: 'Team Assigned',   timestamp: '17:42:35', done: true },
      { label: 'Team Arrived',    timestamp: '17:45:00', done: true },
      { label: 'Issue Resolved',  timestamp: '17:58:30', done: true },
    ],
  },
];

// ─── CAMERAS ─────────────────────────────────────────────────────────────────

export const CAMERA_FEEDS: CameraFeed[] = [
  { id: 'CAM-01', location: 'North Stand — Overview', status: 'online',  detection: 'Normal'        },
  { id: 'CAM-02', location: 'East Stand — Sec 118',   status: 'online',  detection: 'Crowd Build-up' },
  { id: 'CAM-03', location: 'Gate B — Entry',         status: 'online',  detection: 'Suspicious Bag' },
  { id: 'CAM-04', location: 'Food Court — Level 2',   status: 'online',  detection: 'Crowd Build-up' },
  { id: 'CAM-05', location: 'VIP Zone — Lobby',       status: 'online',  detection: 'Normal'        },
  { id: 'CAM-06', location: 'North Stand — Row G',    status: 'online',  detection: 'Fight Detected' },
  { id: 'CAM-07', location: 'Parking — Zone A',       status: 'offline', detection: 'Camera Offline' },
  { id: 'CAM-08', location: 'West Stand — South',     status: 'online',  detection: 'Normal'        },
  { id: 'CAM-09', location: 'Concourse C',            status: 'online',  detection: 'Normal'        },
];

// ─── EMERGENCY CONTACTS ──────────────────────────────────────────────────────

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { id: 'ec1', role: 'Medical',         name: 'Dr. Sara Khalid',   phone: '+974-4411-7700', icon: 'medical-bag',    color: '#EF5350' },
  { id: 'ec2', role: 'Police',          name: 'Lt. Omar Hassan',   phone: '+974-4422-9911', icon: 'police-badge',   color: '#42A5F5' },
  { id: 'ec3', role: 'Fire',            name: 'Chief Ali Nasser',  phone: '+974-4499-8800', icon: 'fire-truck',     color: '#FF7043' },
  { id: 'ec4', role: 'Security Control',name: 'Sgt. Lee Park',     phone: '+974-4455-3344', icon: 'shield-lock',    color: '#7C4DFF' },
  { id: 'ec5', role: 'Control Room',    name: 'Ops Director',      phone: '+974-4400-0001', icon: 'radio-tower',    color: '#00C8FF' },
];

// ─── AI RECOMMENDATIONS ──────────────────────────────────────────────────────

export const AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'r1',
    message: 'Dispatch Medical Team to Gate B immediately — elevated heart-rate patterns detected.',
    zone: 'Gate B',
    urgency: 'critical',
    timestamp: '18:04:55',
  },
  {
    id: 'r2',
    message: 'Open Exit 4 on North Stand — crowd density exceeds 94%. Divert flow now.',
    zone: 'North Stand',
    urgency: 'warning',
    timestamp: '18:03:10',
  },
  {
    id: 'r3',
    message: 'Reduce congestion at Section 118 — request stewards to redirect fans to South gates.',
    zone: 'East Stand',
    urgency: 'warning',
    timestamp: '18:02:00',
  },
  {
    id: 'r4',
    message: 'Divert crowd toward North Exit — food court is 92% capacity. Close lower concourse.',
    zone: 'Food Court',
    urgency: 'warning',
    timestamp: '18:00:30',
  },
  {
    id: 'r5',
    message: 'All clear — West Stand capacity stabilised at 70%. No intervention required.',
    zone: 'West Stand',
    urgency: 'info',
    timestamp: '17:58:45',
  },
];

// ─── NOTIFICATIONS ───────────────────────────────────────────────────────────

export const NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1',  message: 'Crowd increasing at Section 114 — density now 89%.',   type: 'alert',   timestamp: '18:10:01', read: false },
  { id: 'n2',  message: 'Medical team dispatched to East Stand, Sec 118.',       type: 'info',    timestamp: '18:07:45', read: false },
  { id: 'n3',  message: 'Gate 2 reopened after crowd dispersal.',               type: 'success', timestamp: '18:05:20', read: true  },
  { id: 'n4',  message: 'Rain expected in 15 minutes — deploy cover teams.',    type: 'warning', timestamp: '18:03:50', read: false },
  { id: 'n5',  message: 'VIP zone access cleared — all guests checked in.',     type: 'success', timestamp: '18:01:00', read: true  },
  { id: 'n6',  message: 'Suspicious bag reported at Gate B — security alerted.',type: 'alert',   timestamp: '17:58:15', read: false },
  { id: 'n7',  message: 'Food Court Sec 2 hit 4,000 capacity — close gates.',   type: 'alert',   timestamp: '17:55:40', read: false },
  { id: 'n8',  message: 'Fire alarm cleared at Concourse C — all safe.',        type: 'success', timestamp: '17:50:00', read: true  },
  { id: 'n9',  message: 'Power restored at West Stand Panel 4.',               type: 'success', timestamp: '17:45:30', read: true  },
  { id: 'n10', message: 'CCTV CAM-07 went offline — maintenance dispatched.',   type: 'warning', timestamp: '17:40:00', read: true  },
];

// ─── PREDICTIONS ─────────────────────────────────────────────────────────────

export const PREDICTIONS: PredictionItem[] = [
  { id: 'p1', label: 'Crowd Congestion',   value: 'HIGH in 12 min',    confidence: 91, icon: 'account-group',       color: '#FF5252' },
  { id: 'p2', label: 'Avg Waiting Time',   value: '8.4 minutes',       confidence: 87, icon: 'timer-outline',       color: '#FFA726' },
  { id: 'p3', label: 'Incident Risk',      value: 'Elevated — Sec 118',confidence: 78, icon: 'alert-rhombus',       color: '#FF7043' },
  { id: 'p4', label: 'Weather Impact',     value: 'Rain in ~15 min',   confidence: 94, icon: 'weather-rainy',       color: '#42A5F5' },
  { id: 'p5', label: 'Overall Risk Score', value: '6.8 / 10',          confidence: 85, icon: 'shield-alert-outline', color: '#EF5350' },
];
