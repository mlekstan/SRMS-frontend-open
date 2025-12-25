import { createContext } from "react";


type AuthContextType = {
  signIn: (accessToken: string) => void;
  signOut: () => void;
  accessToken: string | null;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  accessToken: null,
  isAuthenticated: false,
});