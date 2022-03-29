import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
import { LongButton } from ".";

const apiUrl = process.env.REACT_APP_API_URL;

export default function RegisterScreen({
  onError
}: {
  onError: (error: Error) => void;
}) {
  const { register, user } = useAuth();

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

  const handleSubmit = ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("please confirm passwords are same"));
      return;
    }
    register(values).catch(onError);
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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "please confrim password" }]}
      >
        <Input
          placeholder={"confrim password"}
          type="password"
          id={"cpassword"}
        />
      </Form.Item>
      <LongButton type={"primary"} htmlType={"submit"}>
        Register
      </LongButton>
    </Form>
  );
}
