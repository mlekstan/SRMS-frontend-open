import { useSyncExternalStore, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthService } from "./AuthService";

type Props = {
  children: ReactNode;
  authService: AuthService;
}


export function AuthProvider({ children, authService }: Props) {
  const auth = useSyncExternalStore(
    (cb) => authService.subscribe(cb), 
    () => authService.getState()
  );

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        signIn: authService.signIn.bind(authService),
        signOut: authService.signOut.bind(authService),
      }}
    >
      { children }
    </AuthContext.Provider>
  );
}