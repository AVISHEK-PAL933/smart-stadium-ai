import { Tabs } from 'expo-router';
import { useColorScheme, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { FloatingAIAssistant } from '../../components/FloatingAIAssistant';
import React from 'react';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[theme].tint,
          tabBarInactiveTintColor: Colors[theme].tabIconDefault,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: theme === 'dark' ? 'rgba(7,10,19,0.7)' : 'rgba(248,250,252,0.8)',
            borderTopColor: Colors[theme].border,
            elevation: 0,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 10,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={theme === 'dark' ? 60 : 80}
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
            tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={26} color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="account-circle" size={26} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
      <FloatingAIAssistant />
    </>
  );
}
