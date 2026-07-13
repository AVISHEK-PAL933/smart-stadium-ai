import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { useColorScheme } from 'react-native';
import { Header } from '../../components/Header';
import { useGlobalContext } from '../../context/GlobalProvider';
import { PrimaryButton } from '../../components/PrimaryButton';
import { router } from 'expo-router';
import { Theme } from '../../constants/theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = Colors[theme];
  const { role, setRole } = useGlobalContext();

  const handleLogout = () => {
    setRole(null);
    router.replace('/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Header title="Profile" />
      <View style={styles.content}>
        <MaterialIcons
          name="account-circle"
          size={80}
          color={themeColors.tint}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: themeColors.text }]}>
          {role === 'user' ? 'John Doe' : 'Guest User'}
        </Text>
        <Text style={[styles.role, { color: themeColors.icon }]}>
          {role === 'user' ? 'FIFA VIP Member' : 'Temporary Access'}
        </Text>

        <View style={styles.actions}>
          <PrimaryButton title="Log Out" onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: Theme.spacing.xl,
  },
  avatar: {
    marginBottom: Theme.spacing.m,
  },
  name: {
    fontSize: Theme.typography.sizes.xl,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.xs,
  },
  role: {
    fontSize: Theme.typography.sizes.m,
    marginBottom: Theme.spacing.xxl,
  },
  actions: {
    width: '100%',
    marginTop: 'auto',
    marginBottom: Theme.spacing.xl,
  },
});
