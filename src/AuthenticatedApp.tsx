import React from "react";
import { Button } from "antd";
import styled from "@emotion/styled";
import { useAuth } from "./context/AuthContext";
import { ProjectListScreen } from "./screens/ProjectList";
import { Row } from "./style/common";

const Container = styled.div``;
const Header = styled(Row)`
  height: 6rem;
  padding: 0 2rem;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const HeaderItem = styled.div``;

const Main = styled.header`
  height: calc(100vh - 6rem);
`;

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Header justify="space-between">
        <HeaderLeft gap>
          <HeaderItem>Logo</HeaderItem>
          <HeaderItem>项目</HeaderItem>
          <HeaderItem>用户</HeaderItem>
        </HeaderLeft>
        <HeaderRight>
          <Button type="primary" size="large" onClick={logout}>
            登出
          </Button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};
