import { Href } from "expo-router";
import { createContext } from "react";

export type DoubleNavigationProviderProps = {
  children?: React.ReactNode;
};

export type DoubleNavigationContextType = {
  doubleNavigation?: Href;
  redirect?: () => void;
};

const DoubleNavigationProvider = createContext<{ doubleNavigation }>(null);

export function DoubleNavigationProvider({
  children,
}: DoubleNavigationProviderProps) {
  return;
}
