import React, { useState } from "react";
import { Card, Button, Divider, Typography } from "antd";
import styled from "@emotion/styled";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

import ICON_LOGO from "../../assets/logo.svg";
import ICON_LEFT from "../../assets/left.svg";
import ICON_RIGHT from "../../assets/right.svg";

const Container = styled.div`
  min-height: 100vh;
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

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-image: url(${ICON_LEFT}), url(${ICON_RIGHT});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
`;

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    // { display: "grid", gridTemplateRow: "6rem calc(100vh - 6rem)" }
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Background />

      <Header />
      <ShadowCard>
        <Title>{isRegister ? "请登录" : "请注册"}</Title>
        {error ? (
          <Typography.Text type="danger">{error.message}</Typography.Text>
        ) : null}
        {isRegister ? (
          <LoginScreen onError={setError} />
        ) : (
          <RegisterScreen onError={setError} />
        )}
        <Divider />
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "没有账号？请注册" : "已经注册账号了？直接登录"}
        </Button>
      </ShadowCard>
    </Container>
  );
};
