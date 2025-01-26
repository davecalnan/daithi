import { Stack } from "expo-router";

export default function NappiesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="add" options={{ presentation: "modal" }} />
      <Stack.Screen name="all" />
    </Stack>
  );
}
