import { Stack } from "expo-router";

export default function SettingLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitle: "Cài đặt" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
}