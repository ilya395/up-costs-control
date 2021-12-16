import React, { memo } from "react";

export const MainMenu = memo(props => {

  const logoutHandler = () => props.onLogout();

  const myDataHandler = () => props.onGetMyData();

  const changePasswordHandler = () => props.onChangePassword();

  return (
    <ul className="main-menu__list">
      <li className="main-menu__item simple-text_main" onClick={changePasswordHandler}>
        Сменить пароль
      </li>
      <li className="main-menu__item simple-text_main" onClick={myDataHandler}>
        Мои данные
      </li>
      <li className="main-menu__item simple-text_main" onClick={logoutHandler}>
        Выход
      </li>
    </ul>
  );
});