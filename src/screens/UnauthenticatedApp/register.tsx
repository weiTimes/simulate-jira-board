import React from "react";
import { Form, Input } from "antd";
import { useAuth } from "src/context/AuthContext";
import { Button } from "antd";
import { LongButton } from "./login";

export const RegisterScreen = () => {
  const { register } = useAuth();

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;

  //   register({ username, password });
  // };

  const handleSubmit = (params: { username: string; password: string }) => {
    register(params);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input name="username" placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input name="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" size="large" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
