import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import GlobalProvider from "@/context/GlobalProvider";

SplashScreen.preventAutoHideAsync(); // prevents the splash screen from auto-hiding before assets done loading

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Bree-Serif": require("../assets/fonts/BreeSerif-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  if (!fontsLoaded && !error) return null;

  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
      </Stack>
    </GlobalProvider>
  );
}
