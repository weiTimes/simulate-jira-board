import React from "react";
import { Button } from "antd";
import { useAuth } from "./context/AuthContext";
import { ProjectListScreen } from "./screens/ProjectList";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      <Button type="primary" size="large" onClick={logout}>
        登出
      </Button>
      <ProjectListScreen />
    </div>
  );
};
