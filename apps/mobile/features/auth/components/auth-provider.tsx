import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { clearAccessToken, setAccessToken } from "@/features/api";
import { useAsyncStorage } from "@/features/storage/hooks";
import { useProtectedRoute } from "../hooks";

SplashScreen.preventAutoHideAsync();

export type PersistedAuthState = {
  token: string;
};

type NonPersistedAuthContext = {
  logIn: (data: PersistedAuthState) => Promise<void>;
  logOut: () => Promise<void>;
};

export type RequiredUserAuthContext = PersistedAuthState &
  NonPersistedAuthContext;

export type OptionalUserAuthContextType = Partial<PersistedAuthState> &
  NonPersistedAuthContext;

export type AuthContextType =
  | OptionalUserAuthContextType
  | RequiredUserAuthContext;

export const AuthContext = createContext<AuthContextType | null>(null);

export type AuthProviderProps = { children?: React.ReactNode };

/**
 * Ensures the user is authenticated, and redirects to the login screen if not.
 * Provides the current authenticated user to the rest of the app.
 *
 * Also handles showing the splash screen until the app is ready:
 * - Persisted auth state is retrieved
 * - Home screen data is loaded if needed
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [status, setStatus] = useState<"pending" | "ready">("pending");
  async function hideSplashScreen() {
    setStatus("ready");
    await SplashScreen.hideAsync();
  }

  const [authState, setAuth] = useAsyncStorage<PersistedAuthState>("auth");
  const hasLoggedIn = !!authState?.data;

  const router = useRouter();

  useEffect(() => {
    if (authState.status !== "ready") return;

    if (hasLoggedIn) {
      setAccessToken(authState.data!.token);
    }

    hideSplashScreen();
  }, [authState.status]);

  useProtectedRoute(authState.data?.token, status === "pending");

  async function logIn({ token }: PersistedAuthState) {
    setAccessToken(token);

    await setAuth({
      token,
    });
  }

  async function logOut() {
    setAuth(null);
    clearAccessToken();
    router.replace("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        ...(authState.data ?? {}),
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
