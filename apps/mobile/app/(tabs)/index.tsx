import { ParallaxScrollView } from "@/components/parallax-scroll-view";
import { Tile } from "@/components/ui/tile";
import { H1 } from "@/components/ui/typography";
import { useAuth } from "@/features/auth/hooks";
import { useDoubleNavigate } from "@/features/routing/hooks";
import { tailwind } from "@/util/tailwind";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function HomeScreen() {
  const auth = useAuth();
  const doubleNavigate = useDoubleNavigate();
  const [daithiPresses, setDaithiPresses] = useState(0);

  useEffect(() => {
    if (daithiPresses >= 5) {
      auth.logOut();
    }
  }, [daithiPresses]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={tailwind.theme.colors.green[200]}
      headerImage={
        <FontAwesome5
          name="baby"
          size={310}
          className="absolute top-16 left-4 text-green-800"
        />
      }
    >
      <H1
        onPress={() => {
          setDaithiPresses((presses) => presses + 1);
        }}
      >
        Daithí
      </H1>

      <View className="flex-row flex-wrap gap-8">
        <Tile
          onPress={() => {
            doubleNavigate({ to: "/feeds/active", via: "/feeds" });
          }}
          icon={(props) => (
            <MaterialCommunityIcons name="baby-bottle" {...props} />
          )}
          colors={{
            bg: tailwind.theme.colors.yellow[200],
            text: tailwind.theme.colors.yellow[800],
          }}
        >
          Start Feeding
        </Tile>

        <Tile
          onPress={() => {
            doubleNavigate({
              to: "/nappies/add",
              via: "/nappies",
            });
          }}
          icon={(props) => (
            <MaterialIcons name="baby-changing-station" {...props} />
          )}
          colors={{
            bg: tailwind.theme.colors.orange[200],
            text: tailwind.theme.colors.orange[800],
          }}
        >
          Log Nappy
        </Tile>

        <Tile
          onPress={() => {
            doubleNavigate({ to: "/pumps/active", via: "/pumps" });
          }}
          icon={(props) => <FontAwesome5 name="gas-pump" {...props} />}
          colors={{
            bg: tailwind.theme.colors.indigo[200],
            text: tailwind.theme.colors.indigo[800],
          }}
        >
          Start Pumping
        </Tile>
      </View>
    </ParallaxScrollView>
  );
}
