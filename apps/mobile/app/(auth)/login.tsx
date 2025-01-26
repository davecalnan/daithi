import { ParallaxScrollView } from "@/components/parallax-scroll-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { api } from "@/features/api";
import { useOptionalAuth } from "@/features/auth/hooks";
import { tailwind } from "@/util/tailwind";
import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useId, useState } from "react";
import { View } from "react-native";

export default function Login() {
  const auth = useOptionalAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailLabelId = useId();
  const passwordLabelId = useId();

  async function handleSubmit() {
    const response = await api.post("login", { email, password });
    console.log("response:", response);
    auth.logIn({ token: response.token });

    router.replace("/");
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false, animation: "none" }} />
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
        <H1>Daithí</H1>

        <View className="gap-6">
          <View className="gap-1">
            <Label nativeID={emailLabelId}>Email</Label>
            <Input
              value={email}
              onChangeText={setEmail}
              aria-labelledby={emailLabelId}
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View className="gap-1">
            <Label nativeID={passwordLabelId}>Password</Label>
            <Input
              value={password}
              onChangeText={setPassword}
              aria-labelledby={passwordLabelId}
              secureTextEntry
              autoComplete="password"
            />
          </View>
        </View>

        <Button onPress={handleSubmit} className="mt-6">
          <Text>Log in</Text>
        </Button>
      </ParallaxScrollView>
    </>
  );
}
