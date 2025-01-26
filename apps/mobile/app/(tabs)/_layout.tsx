import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/haptic-tab";
import TabBarBackground from "@/components/ui/tab-bar-background";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="baby" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="feeds"
        options={{
          title: "Feeds",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="baby-bottle"
              size={24}
              color={color}
              className="-scale-x-100"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="nappies"
        options={{
          title: "Nappies",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="baby-changing-station"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pumps"
        options={{
          title: "Pumps",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="gas-pump" className="text-2xl" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
