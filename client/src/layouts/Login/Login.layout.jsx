import React from "react";
import cn from "classnames";
import s from "./Login.module.scss";
import { LoginForm, LoginHelp, WelcomeHeader } from "../../components";


export const Login = () => {
  return (
    <div className="container">
      <div className={cn(s["login-main-section"])}>
        <WelcomeHeader />
        <LoginForm />
        <LoginHelp />
      </div>
    </div>
  );
}