import React from "react";
import { Button, Form, Input } from "antd";
import { useAuth } from "src/context/AuthContext";
import styled from "@emotion/styled";

export const LongButton = styled(Button)`
  width: 100%;
`;

export const LoginScreen = () => {
  const { login } = useAuth();

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;

  //   login({ username, password });
  // };

  const handleSubmit = (params: { username: string; password: string }) => {
    login(params);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" size="large" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
