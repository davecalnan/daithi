import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { AuthProvider } from "@/features/auth/components";
import { DataProvider } from "@/features/data/components";

import "@/util/nativewind";
import "@/assets/styles/global.css";

export default function RootLayout() {
  return (
    <DataProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </DataProvider>
  );
}
