import React, { useState } from "react";
import RegisterScreen from "./register";
import LoginScreen from "./login";
import { Card, Divider, Button } from "antd";
import styled from "@emotion/styled";
import jira from "assets/jira.svg";

export default function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Container>
      <Header />
      <ShadowCard>
        <Title>{isRegister ? "Please sign up" : "please login"}</Title>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Divider />
        <a onClick={() => setIsRegister(!isRegister)}>
          switch to {isRegister ? "Login" : "SignUp"}
        </a>
      </ShadowCard>
    </Container>
  );
}

export const LongButton = styled(Button)`
  width: 100%;
`;

const Header = styled.header`
  background: url(${jira}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
