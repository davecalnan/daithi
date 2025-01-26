import { createApiClient } from "@davekit/typesafe-api-client";

const API_BASE_URL = __DEV__
  ? "http://localhost:8000"
  : "https://api.daithi.app";

export const api = createApiClient<any>({
  baseUrl: API_BASE_URL,
  onRequest: ({ request }) => {
    console.log(`[api] ${request.method} ${request.url}`);
  },
});

export function setAccessToken(token: string) {
  api.headers.set("Authorization", `Bearer ${token}`);
}

export function clearAccessToken() {
  api.headers.delete("Authorization");
}
