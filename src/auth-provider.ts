// 在真实开发环境中，如果使用firebase第三方服务，就不需要开发本文件了

import { User } from "./screens/ProjectList/SearchPanel";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorygeKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorygeKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorygeKey, user.token || "");

  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorygeKey);
