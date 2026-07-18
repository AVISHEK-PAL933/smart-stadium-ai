import { Stack, useSegments, useRouter, usePathname } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { GlobalProvider } from '../context/GlobalProvider';
import { useGlobalContext } from '../context/GlobalProvider';
import { useEffect } from 'react';

function RootLayoutNav() {
  const { theme, role, isLoading } = useGlobalContext();
  const segments = useSegments();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    
    const inAuthGroup = segments[0] === 'login' || segments[0] === 'signup' || segments[0] === 'welcome' || segments[0] === 'role-selection' || segments[0] === 'org-verification';
    const isRoot = pathname === '/' || segments.length === 0;

    // Protection Logic
    if (role === 'fan') {
      // Fan tries to access ops or restricted modules
      if (segments[0] === '(ops)') {
        router.replace('/(tabs)');
      }
      
      const restrictedModules = [
        '/admin-mode', '/analytics', '/executive-analytics', '/smart-iot-center',
        '/ai-ops-center', '/emergency', '/reports', '/sustainability', '/crowd-intelligence'
      ];
      if (restrictedModules.some(mod => pathname.includes(mod))) {
        router.replace('/(tabs)');
      }
      
      if (isRoot) {
        router.replace('/(tabs)');
      }
    } else if (role === 'admin') {
      // Admin tries to access fan tabs? Usually fine, but let's guide them to ops on root
      if (isRoot) {
        router.replace('/(ops)');
      }
    } else if (role === 'guest') {
      if (segments[0] === '(ops)' || segments[0] === 'role-selection' || segments[0] === 'org-verification') {
        router.replace('/(tabs)');
      }
      if (isRoot) {
        router.replace('/(tabs)');
      }
    } else {
      // Not logged in or no role selected
      if (!inAuthGroup && !isRoot) {
        router.replace('/welcome');
      }
    }
  }, [role, isLoading, segments, pathname]);

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="role-selection" options={{ headerShown: false }} />
        <Stack.Screen name="org-verification" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(ops)" options={{ headerShown: false }} />
        <Stack.Screen name="(modules)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GlobalProvider>
      <RootLayoutNav />
    </GlobalProvider>
  );
}
