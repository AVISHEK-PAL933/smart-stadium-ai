import { useGlobalContext } from '../../context/GlobalProvider';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FloatingAIAssistant } from '../../components/FloatingAIAssistant';
import React from 'react';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const { theme } = useGlobalContext();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[theme].tint,
          tabBarInactiveTintColor: Colors[theme].tabIconDefault,
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: theme === 'dark' ? 'rgba(8,18,35,0.7)' : 'rgba(248,250,252,0.8)',
            borderTopColor: 'transparent',
            borderColor: Colors[theme].border,
            borderWidth: 1,
            borderRadius: 30,
            elevation: 10,
            height: 65,
            paddingBottom: 12,
            overflow: 'hidden',
          },
          tabBarBackground: () => (
            <BlurView
              intensity={theme === 'dark' ? 80 : 100}
              tint={theme}
              style={StyleSheet.absoluteFill}
            />
          ),
          headerStyle: {
            backgroundColor: Colors[theme].background,
          },
          headerTintColor: Colors[theme].text,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="view-dashboard" size={26} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" size={26} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
      <FloatingAIAssistant />
    </>
  );
}
