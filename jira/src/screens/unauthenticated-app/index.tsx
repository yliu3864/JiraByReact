import React, { useState } from "react";
import RegisterScreen from "./register";
import LoginScreen from "./login";
import { Card } from "antd";

export default function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <button onClick={() => setIsRegister(!isRegister)}>
          switch to {isRegister ? "Login" : "SignUp"}
        </button>
      </Card>
    </div>
  );
}
