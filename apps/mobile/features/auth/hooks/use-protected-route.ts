import { useEffect } from "react";
import { useSegments, useRouter } from "expo-router";
import { AuthContextType } from "../components";

export function useProtectedRoute(
  token: AuthContextType["token"],
  isLoading: boolean
) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    // If the user is not signed in and the initial segment is not in the auth group.
    if (!token && !inAuthGroup) {
      router.replace("/login");
    } else if (token && inAuthGroup) {
      router.replace("/");
    }
  }, [token, segments, isLoading]);
}
