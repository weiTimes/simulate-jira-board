import React, { useState } from "react";
import { Card, Button, Typography, Divider } from "antd";
import styled from "@emotion/styled";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

import ICON_LOGO from "../../assets/logo.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
const Header = styled.div`
  background: url(${ICON_LOGO}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;
const Title = styled.div`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132); ;
`;

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Header />
      <ShadowCard>
        <Title>{isRegister ? "请登录" : "请注册"}</Title>
        {isRegister ? <LoginScreen /> : <RegisterScreen />}
        <Divider />
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "没有账号？请注册" : "已经注册账号了？直接登录"}
        </Button>
      </ShadowCard>
    </Container>
  );
};
