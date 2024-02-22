import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Feather, Octicons } from '@expo/vector-icons';
import {
  DarkTheme as DefaultDarkTheme,
  DefaultTheme as DefaultLightTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PushNotificationManager } from '@/components/push-notification-manager';
import Colors from '@/constants/Colors';
import { PersonProvider } from '@/hooks/use-person';
import { ThemeProvider as CustomThemeProvider, useTheme } from '@/hooks/use-theme';
import { UserProvider } from '@/hooks/use-user';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    ...Octicons.font,
    ...Feather.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <RootLayoutNav />
    </CustomThemeProvider>
  );
}

const DarkTheme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    background: '#232323',
    text: Colors.dark.text,
  },
};

const LightTheme = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    background: '#fff',
    text: Colors.light.text,
  },
};

function RootLayoutNav() {
  const { theme } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActionSheetProvider>
        <UserProvider>
          <PersonProvider>
            <SafeAreaProvider>
              <ThemeProvider value={theme === 'dark' ? DarkTheme : LightTheme}>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="settings" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="welcome"
                    options={{
                      headerShown: false,
                    }}
                  />
                </Stack>
              </ThemeProvider>
            </SafeAreaProvider>
            <StatusBar style="light" />
          </PersonProvider>
          <PushNotificationManager />
        </UserProvider>
      </ActionSheetProvider>
    </GestureHandlerRootView>
  );
}
