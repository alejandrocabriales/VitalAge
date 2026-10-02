import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  OnboardingStatusProvider,
  useOnboardingStatus,
} from "../features/onboarding/OnboardingStatus";
import { useAppFonts } from "../hooks/useAppFonts";
import { AppStoreProvider } from "../store/AppStore";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <OnboardingStatusProvider>
      <AppStoreProvider>
        <RootNavigator />
      </AppStoreProvider>
    </OnboardingStatusProvider>
  );
}

function RootNavigator() {
  const fontsReady = useAppFonts();
  const { isLoaded: statusReady, isCompleted } = useOnboardingStatus();
  const appReady = fontsReady && statusReady;

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isCompleted}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="session" options={{ gestureEnabled: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isCompleted}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>
    </Stack>
  );
}
