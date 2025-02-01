import { useState, type PropsWithChildren, type ReactElement } from "react";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  View,
} from "react-native";
import { useBottomTabOverflow } from "@/components/ui/tab-bar-background";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 250;

export type ParallaxScrollViewProps = PropsWithChildren<{
  onRefresh?: () => Promise<void>;
  headerImage: ReactElement;
  headerBackgroundColor: string;
}>;

export function ParallaxScrollView({
  onRefresh,
  children,
  headerImage,
  headerBackgroundColor,
}: ParallaxScrollViewProps) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const insets = useSafeAreaInsets();
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <View className="flex-1">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={async () => {
                setIsRefreshing(true);
                await onRefresh();
                setIsRefreshing(false);
              }}
            />
          ) : undefined
        }
      >
        <Animated.View
          className="overflow-hidden"
          style={[
            { height: HEADER_HEIGHT, backgroundColor: headerBackgroundColor },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <View className="flex-1 pt-8 px-8 pb-16 gap-4 overflow-hidden bg-gray-100">
          {children}
        </View>
      </Animated.ScrollView>

      {isRefreshing && (
        <View
          className="absolute flex-row justify-center top-0 inset-x-0"
          style={{ paddingTop: insets.top }}
        >
          <ActivityIndicator size="large" className="mt-0.5" />
        </View>
      )}
    </View>
  );
}
