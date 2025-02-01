import { View } from "react-native";
import { ParallaxScrollView } from "@/components/parallax-scroll-view";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { tailwind } from "@/util/tailwind";
import { Tile } from "@/components/ui/tile";
import { H1, H2 } from "@/components/ui/typography";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/features/api/client";
import { NappyList } from "@/features/nappies/components";

export default function Nappies() {
  const nappies = useQuery({
    queryKey: ["nappies", { per_page: 5, page: 1 }],
    queryFn: async () =>
      api
        .get("nappies", {
          per_page: 5,
        })
        .then(({ data }) => data ?? null),
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={tailwind.theme.colors.orange[200]}
      headerImage={
        <MaterialIcons
          name="baby-changing-station"
          size={310}
          className="absolute top-10 color-orange-800"
        />
      }
      onRefresh={async () => {
        await nappies.refetch();
      }}
    >
      <H1>Nappies</H1>

      <View className="flex-row flex-wrap gap-8">
        <Tile.Link
          href="/nappies/add"
          icon={(props) => (
            <MaterialCommunityIcons name="clipboard-plus" {...props} />
          )}
          colors={{
            bg: tailwind.theme.colors.blue[200],
            text: tailwind.theme.colors.blue[800],
          }}
        >
          Log Nappy
        </Tile.Link>
      </View>

      <View className="mt-4 gap-2">
        <H2>Recent Nappies</H2>

        <NappyList nappies={nappies.data ?? []} />

        <Link href="/nappies/all" asChild>
          <Button variant="link">
            <Text>View all</Text>
          </Button>
        </Link>
      </View>
    </ParallaxScrollView>
  );
}
