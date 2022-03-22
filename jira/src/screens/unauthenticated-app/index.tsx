import React, { useState } from "react";
import RegisterScreen from "./register";
import LoginScreen from "./login";

export default function UnauthenticatedApp() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        swith to {isRegister ? "Login" : "SignUp"}
      </button>
    </div>
  );
}
