import { View } from "react-native";
import { ParallaxScrollView } from "@/components/parallax-scroll-view";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { tailwind } from "@/util/tailwind";
import { Tile } from "@/components/ui/tile";
import { H1, H2 } from "@/components/ui/typography";

export default function Nappies() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={tailwind.theme.colors.indigo[200]}
      headerImage={
        <FontAwesome5
          name="gas-pump"
          size={250}
          className="absolute top-20 left-8 color-indigo-800"
        />
      }
    >
      <View className="flex-row gap-2">
        <H1>Pumps</H1>
      </View>

      <View className="flex-row flex-wrap gap-8">
        <Tile.Link
          href="/pumps/active"
          icon={(props) => <MaterialCommunityIcons name="timer" {...props} />}
          colors={{
            bg: tailwind.theme.colors.green[200],
            text: tailwind.theme.colors.green[800],
          }}
        >
          Start Pumping
        </Tile.Link>

        <Tile.Link
          href="/pumps/add"
          icon={(props) => (
            <MaterialCommunityIcons name="clipboard-plus" {...props} />
          )}
          colors={{
            bg: tailwind.theme.colors.blue[200],
            text: tailwind.theme.colors.blue[800],
          }}
        >
          Log{"\n"}Pump
        </Tile.Link>
      </View>

      <View className="mt-4 gap-2">
        <H2>Recent Pumps</H2>

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
