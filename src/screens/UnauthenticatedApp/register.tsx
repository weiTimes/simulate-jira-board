import React from "react";
import { Form, Input } from "antd";
import { useAuth } from "src/context/AuthContext";
import { LongButton } from "./login";
import { useAsync } from "src/utils";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync();

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;

  //   register({ username, password });
  // };

  const handleSubmit = ({
    cpassword,
    ...params
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== params.password) {
      onError(new Error("两次密码输入不一致"));
      return;
    }

    run(register(params).catch(onError));
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
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input type="password" placeholder="确认密码" />
      </Form.Item>
      <Form.Item>
        <LongButton
          loading={isLoading}
          type="primary"
          size="large"
          htmlType="submit"
        >
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
