import qs from "qs";
import { useAuth } from "src/context/AuthContext";
import * as auth from "../auth-provider";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = (
  path: string,
  { token, data, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? `application/json` : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    path += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window.fetch(`${apiUrl}${path}`, config).then(async (response) => {
    if (response.status === 401) {
      // 未登录/token失效
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();

  return (...[path, config]: Parameters<typeof http>) =>
    http(path, { ...config, token: user?.token });
};
