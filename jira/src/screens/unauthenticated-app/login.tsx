import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
import { LongButton } from ".";
import { async } from "q";
import { useAsync } from "utils/use-async";

const apiUrl = process.env.REACT_APP_API_URL;

export default function LoginScreen({
  onError
}: {
  onError: (error: Error) => void;
}) {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync();

  // const login = (param: { username: string; password: string }) => {
  //   fetch(`${apiUrl}/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(param)
  //   }).then(async response => {
  //     if (response.ok) {
  //     }
  //   });
  // };

  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values)).catch(onError);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "please input name" }]}
      >
        <Input placeholder={"Username"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "please input password" }]}
      >
        <Input placeholder={"Password"} type="password" id={"password"} />
      </Form.Item>
      <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
        Login
      </LongButton>
    </Form>
  );
}
