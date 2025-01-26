import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { SafeAreaView, View } from "react-native";

export default function LogFeed() {
  return (
    <SafeAreaView>
      <View>
        <H1>Log a Feed</H1>
      </View>

      <View>
        <Text>Toggle between log bottle and breast feed</Text>
      </View>
    </SafeAreaView>
  );
}
