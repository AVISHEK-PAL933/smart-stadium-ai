import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export const ReportGenerator = () => {
  const reports = [
    'Daily Operations Report',
    'Match Day Summary',
    'Revenue & Sales Report',
    'Security & Incident Report',
    'Executive Summary',
  ];

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="document-text" size={24} color="#00e5ff" />
        <Text style={styles.title}>Report Generator</Text>
      </View>
      <View style={styles.content}>
        {reports.map((report, idx) => (
          <View key={idx} style={styles.reportRow}>
            <Text style={styles.reportName}>{report}</Text>
            <View style={styles.exportButtons}>
              <TouchableOpacity style={styles.exportBtn}>
                <Ionicons name="document" size={14} color="#ff1744" />
                <Text style={styles.exportText}>PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exportBtn}>
                <Ionicons name="grid" size={14} color="#00e676" />
                <Text style={styles.exportText}>XLSX</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(10, 20, 30, 0.7)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: Theme.spacing.s,
  },
  content: {
    gap: Theme.spacing.m,
  },
  reportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  reportName: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  exportButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.s,
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  exportText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
