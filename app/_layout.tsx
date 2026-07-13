import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { GlobalProvider } from '../context/GlobalProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GlobalProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(modules)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </GlobalProvider>
  );
}
