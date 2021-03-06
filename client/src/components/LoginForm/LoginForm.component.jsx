import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import cn from "classnames";
import s from "./LoginForm.module.scss";
import { requestAuthAction } from "../../modules/auth/store/actions/action-creators/auth.action-creator";
import { cheekiBreekiValidator } from "../../utils";
import { notificationMessageAction } from "../../modules";
import { NOTIFICATION_WARNING } from "../../constants";

export const LoginForm = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const submitForm = (event) => {
    event.preventDefault();

    if (formData.password && formData.login) {
      if (!validateForm(formData)) {
        return;
      }
      dispatch(requestAuthAction(formData));
    }
  }

  const changeValue = (event) => {
    const field = event.target;
    const value = field.value;
    const name = field.name;

    const data = {...formData};
    data[name] = value;

    setFormData(data);

  }

  const validateForm = ({login, password}) => {
    let result = true;
    if (!cheekiBreekiValidator.checkName(login)) {
      dispatch(notificationMessageAction({
        message: "Корректно заполните поле логина!",
        notificationType: NOTIFICATION_WARNING
      }));
      result = false;
    }
    if (!cheekiBreekiValidator.checkPassword(password)) {
      dispatch(notificationMessageAction({
        message: "Корректно заполните поле пароля!",
        notificationType: NOTIFICATION_WARNING
      }));
      result = false;
    }
    return result;
  }

  const [visibleLink, setVisibleLink] = useState(false);

  return (
    <form className={s["login-form"]} onSubmit={submitForm}>
      <div className="form-field">
        <label className="form-field__label simple-text_main" htmlFor="login">логин:</label>
        <input
          type="text"
          className="form-field__input simple-text_main"
          id="login"
          name="login"
          required
          value={formData.login}
          onChange={changeValue}
        />
      </div>
      <div className="form-field">
        <label className="form-field__label simple-text_main" htmlFor="pass">пароль:</label>
        <input
          type="password"
          className="form-field__input simple-text_main"
          id="pass"
          name="password"
          required
          value={formData.password}
          onChange={changeValue}
        />
      </div>
      <div className={s["login-form__button-block"]}>
        <button className="big-button simple-title_other" aria-label={"Войти в приложение"}>Войти</button>
        <div className={cn(s["button-block__prompt"], s["simple-text_other"])}>
          {
            visibleLink && (
              <>
                <span>Нет аккаунта? </span>
                <a href="#" className="simple-text_other simple-text_other-bold">Зарегистрироваться</a>
              </>
            )
          }

        </div>
      </div>
    </form>
  );
}