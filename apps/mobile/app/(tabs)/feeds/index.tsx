import { View } from "react-native";
import { ParallaxScrollView } from "@/components/parallax-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { tailwind } from "@/util/tailwind";
import { Tile } from "@/components/ui/tile";
import { Link } from "expo-router";
import { H1, H2 } from "@/components/ui/typography";

export default function FeedsOverview() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={tailwind.theme.colors.yellow[200]}
      headerImage={
        <MaterialCommunityIcons
          name="baby-bottle"
          size={310}
          className="absolute top-12 -scale-x-100 text-yellow-800"
        />
      }
    >
      <H1>Feeds</H1>

      <View className="flex-row flex-wrap gap-8">
        <Link href="/(tabs)/feeds/active" asChild>
          <Tile
            icon={(props) => <MaterialCommunityIcons name="timer" {...props} />}
            colors={{
              bg: tailwind.theme.colors.green[200],
              text: tailwind.theme.colors.green[800],
            }}
          >
            Start Feeding
          </Tile>
        </Link>

        <Link href="/(tabs)/feeds/add" asChild>
          <Tile
            icon={(props) => (
              <MaterialCommunityIcons name="clipboard-plus" {...props} />
            )}
            colors={{
              bg: tailwind.theme.colors.blue[200],
              text: tailwind.theme.colors.blue[800],
            }}
          >
            Log{"\n"}Feed
          </Tile>
        </Link>
      </View>

      <View className="mt-4 gap-2">
        <H2>Recent Feeds</H2>

        <View className="gap-4">
          <View className="bg-gray-300 rounded w-full h-8" />
          <View className="bg-gray-300 rounded w-full h-8" />
          <View className="bg-gray-300 rounded w-full h-8" />
          <View className="bg-gray-300 rounded w-full h-8" />
        </View>
      </View>
    </ParallaxScrollView>
  );
}
