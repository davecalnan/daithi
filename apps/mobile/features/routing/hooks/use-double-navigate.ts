import { Href, useRouter } from "expo-router";

export type DoubleNavigate = (options: { to: Href; via: Href }) => void;

export function useDoubleNavigate(): DoubleNavigate {
  const router = useRouter();

  return function doubleNavigate({ to, via }) {
    router.push(via);

    setTimeout(() => router.push(to));
  };
}
