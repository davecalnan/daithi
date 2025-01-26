import { useEffect } from "react";
import { AppState } from "react-native";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

/**
 * Warning: do not use this directly. Use `useQueryClient()` in a component.
 */
export const queryClient = new QueryClient();

export type DataProviderProps = {
  children?: React.ReactNode;
};

/**
 * Sets up the Query client and cache to be used for async data.
 */
export function DataProvider({ children }: DataProviderProps) {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (status) => {
      focusManager.setFocused(status === "active");
    });

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
