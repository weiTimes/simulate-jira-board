import React from "react";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { useAuth } from "./context/AuthContext";
import { ProjectListScreen } from "./screens/ProjectList";
import { Row } from "./style/common";

import { ReactComponent as SoftwareLogo } from "./assets/software_logo.svg";

const Container = styled.div``;
const Header = styled(Row)`
  height: 6rem;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const HeaderItem = styled.div``;

const Main = styled.header`
  height: calc(100vh - 6rem);
`;

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const value: any = undefined;

  return (
    <Container>
      {value.val}
      <Header justify="space-between">
        <HeaderLeft gap>
          <SoftwareLogo width="18rem" color="rgba(38,122,155)" />
          <HeaderItem>项目</HeaderItem>
          <HeaderItem>用户</HeaderItem>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="logout">
                  <Button type="link" onClick={logout}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="link" onClick={(e) => e.preventDefault()}>
              Hi, I'm {user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};
