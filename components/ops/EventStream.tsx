import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GlassCard } from '../GlassCard';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface EventType {
  id: string;
  time: string;
  event: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export const EventStream = ({ events }: { events: EventType[] }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const getIconAndColor = (type: string) => {
    switch (type) {
      case 'success':
        return { icon: 'checkmark-circle', color: Colors.dark.success };
      case 'warning':
        return { icon: 'warning', color: Colors.dark.warning };
      case 'error':
        return { icon: 'alert-circle', color: Colors.dark.danger };
      case 'info':
      default:
        return { icon: 'information-circle', color: Colors.dark.tint };
    }
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="pulse" size={24} color={Colors.dark.tint} />
        <Text style={styles.title}>Live Event Stream</Text>
      </View>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.stream} 
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {events.map((ev, index) => {
          const { icon, color } = getIconAndColor(ev.type);
          return (
            <View key={ev.id} style={styles.eventRow}>
              <View style={styles.timelineLine} />
              <View style={[styles.iconWrapper, { backgroundColor: color + '20' }]}>
                <Ionicons name={icon as any} size={16} color={color} />
              </View>
              <View style={styles.eventContent}>
                <Text style={styles.time}>{ev.time}</Text>
                <Text style={styles.eventText}>{ev.event}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginHorizontal: Theme.spacing.m,
    marginBottom: Theme.spacing.l,
    padding: Theme.spacing.m,
    backgroundColor: 'rgba(10, 15, 30, 0.7)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: Theme.spacing.s,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: Theme.spacing.s,
  },
  stream: {
    flex: 1,
  },
  eventRow: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.m,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 15,
    top: 30,
    bottom: -20,
    width: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.m,
    zIndex: 1,
  },
  eventContent: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: Theme.spacing.s,
    borderRadius: Theme.shapes.borderRadius.m,
  },
  time: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginBottom: 4,
  },
  eventText: {
    color: '#fff',
    fontSize: 14,
  },
});
