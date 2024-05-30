// StoreProvider.js

import React from "react";
import { GlobalState } from "../types";

const AuthContext = React.createContext<{
  auth: GlobalState | null;
  setAuth: (auth: GlobalState) => void;
} | null>(null);

export const useAuthStore = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthStore must be used within a AuthStoreProvider");
  }
  return context;
};

const AuthStoreProvider = ({ children }: any) => {
  const [auth, setAuth] = React.useState<GlobalState | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthStoreProvider, AuthContext };
