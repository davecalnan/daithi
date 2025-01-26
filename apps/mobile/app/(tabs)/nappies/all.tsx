import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { NappyListItem } from "@/features/nappies/components";
import { api } from "@/features/api/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";

export default function AllNappies() {
  const router = useRouter();
  const nappies = useInfiniteQuery({
    queryKey: ["nappies", "infinite"],
    queryFn: async ({ pageParam }) => {
      const response = await api.get("nappies", { page: pageParam });

      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const hasMore = !!lastPage?.next_page_url;

      return hasMore ? lastPage?.current_page + 1 : undefined;
    },
  });

  const allNappies = (nappies.data?.pages ?? []).flatMap((page) => page.data);

  return (
    <SafeAreaView className="px-8">
      <Text onPress={() => router.back()}>Back</Text>

      <H1>Nappies</H1>

      <FlatList
        data={allNappies}
        keyExtractor={(nappy) => nappy.id}
        renderItem={({ item: nappy }) => (
          <NappyListItem key={nappy.id} nappy={nappy} />
        )}
        contentContainerClassName="gap-4"
        className="mt-2"
        onEndReached={() => {
          if (!nappies.hasNextPage) return;
          nappies.fetchNextPage();
        }}
      />
    </SafeAreaView>
  );
}
