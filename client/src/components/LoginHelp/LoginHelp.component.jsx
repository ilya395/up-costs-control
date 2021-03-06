import React from "react";
import cn from "classnames";
import s from "./LoginHelp.module.scss";
import { memo } from "react";

export const LoginHelp = memo(() => {
  return (
    <div className={cn(s["login-help"], "simple-text_other")}>
      <span>Забыли пароль?</span>&nbsp;
      <a href="#" className="simple-text_other simple-text_other-bold">Помощь</a>
    </div>
  );
});