import { useContext } from "react";
import {
  AuthContext,
  AuthContextType,
  RequiredUserAuthContext,
} from "../components";

export function useOptionalAuth(): AuthContextType {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error(`useAuth must be used within an <AuthProvider />`);
  }

  return auth;
}

export function useAuth(): RequiredUserAuthContext {
  const auth = useOptionalAuth();

  if (!auth.token) {
    return {
      ...auth,
      token: "",
    } as RequiredUserAuthContext;
  }

  return auth as RequiredUserAuthContext;
}
