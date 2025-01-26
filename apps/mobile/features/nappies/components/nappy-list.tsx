import { Text } from "@/components/ui/text";
import { format, isToday, isYesterday } from "date-fns";
import { View } from "react-native";

export type NappyListProps = {
  nappies: any[];
};

export function NappyList({ nappies }: NappyListProps) {
  return (
    <View className="gap-4">
      {nappies.map((nappy) => (
        <NappyListItem key={nappy.id} nappy={nappy} />
      ))}
    </View>
  );
}

export type NappyListItemProps = {
  nappy: any;
};

export function NappyListItem({ nappy }: NappyListItemProps) {
  return (
    <View className="bg-white px-4 py-2 rounded-lg flex-row justify-between items-center gap-4">
      {/* Left Side */}
      <View>
        <Text className="text-lg font-bold">
          {format(nappy.changed_at, "H:mm")}
        </Text>
        <Text className="text-gray-700">{getNappyDate(nappy)}</Text>
        {!!nappy.notes && (
          <Text className="mt-2 text-gray-900">{nappy.notes}</Text>
        )}
      </View>

      {/* Right Side */}
      <View className="flex-row gap-2">
        {nappy.is_wet && (
          <View className="rounded-full h-10 w-10 bg-yellow-200 border-yellow-300 border-2 flex justify-center items-center">
            <Text>💦</Text>
          </View>
        )}
        {nappy.is_dirty && (
          <View className="rounded-full h-10 w-10 bg-yellow-600 border-yellow-800 border-2 flex justify-center items-center">
            <Text className="-mt-0.5">💩</Text>
          </View>
        )}
        {!nappy.is_wet && !nappy.is_dirty && (
          <View className="rounded-full h-10 w-10 bg-green-200 border-green-300 border-2 flex justify-center items-center">
            <Text>✨</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function getNappyDate(nappy: any): string {
  const date = format(nappy.changed_at, "d/MM");

  const day = (() => {
    if (isToday(nappy.changed_at)) return "Today";
    if (isYesterday(nappy.changed_at)) return "Yesterday";
    return format(nappy.changed_at, "EEEE");
  })();

  return `${day} · ${date}`;
}
