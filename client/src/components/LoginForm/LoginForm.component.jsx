import React from "react";
import cn from "classnames";
import s from "./LoginForm.module.scss";

export const LoginForm = () => {
  return (
    <form className={s["login-form"]}>
      <div className="form-field">
        <label className="form-field__label simple-text_main" htmlFor="login">логин:</label>
        <input type="text" className="form-field__input simple-text_main" id="login" name="login" />
      </div>
      <div className="form-field">
        <label className="form-field__label simple-text_main" htmlFor="pass">пароль:</label>
        <input type="text" className="form-field__input simple-text_main" id="pass" name="password" />
      </div>
      <div className={s["login-form__button-block"]}>
        <button className="big-button simple-title_other">Войти</button>
        <div className={cn(s["button-block__prompt"], s["simple-text_other"])}>
          <span>Нет аккаунта? </span>
          <a href="#" className="simple-text_other simple-text_other-bold">Зарегистрироваться</a>
        </div>
      </div>
    </form>
  );
}