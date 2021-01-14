import React, { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      {isRegister ? <LoginScreen /> : <RegisterScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到 {isRegister ? "注册" : "登录"}
      </button>
    </div>
  );
};
