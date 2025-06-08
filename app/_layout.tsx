import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {  useEffect, useState } from "react";
import "react-native-reanimated";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Provider as AntdProvider,
} from "@ant-design/react-native";
import * as Font from "expo-font";
import { AuthProvider } from "@/contexts/AuthContext";
import Spin from "@/components/common/Spin";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AntdProvider>
        <Stack initialRouteName="(home)" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(home)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </AntdProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          ...FontAwesome.font,
          SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
          antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
          antfill: require("@ant-design/icons-react-native/fonts/antfill.ttf"),
        });
      } catch (e) {
        console.warn("Font loading error", e);
      } finally {
        setAppReady(true);
        SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!appReady) return <Spin/>;

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
