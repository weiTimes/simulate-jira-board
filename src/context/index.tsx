import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

import { AuthProvider } from "./AuthContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
