import React, { ReactNode, useState } from "react";
import { FullPageError, FullPageLoading } from "src/components";
import { User } from "src/screens/ProjectList/SearchPanel";
import { useAsync, useMount } from "src/utils";
import { http } from "src/utils/http";
import * as auth from "../auth-provider";

interface AuthForm {
  username: string;
  password: string;
}

// 初始化用户信息
const bootstrapUser = async () => {
  let user = null;

  const token = auth.getToken();

  if (token) {
    const data = await http("/me", { token });
    user = data.user;
  }

  return user;
};

const AuthContext = React.createContext<
  | undefined
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
>(undefined);
AuthContext.displayName = "AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    run,
    isLoading,
    isIdle,
    isError,
    data: user,
    error,
    setData: setUser,
  } = useAsync<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser);

  const register = (form: AuthForm) => auth.register(form).then(setUser);

  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("userAuth必须在AuthProvider中使用");
  }

  return context;
};
