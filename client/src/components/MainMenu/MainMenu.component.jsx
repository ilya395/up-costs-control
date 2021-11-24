import React from "react";

export const MainMenu = () => {
  return (
    <ul className="main-menu__list">
      <li className="main-menu__item simple-text_main">
        Сменить пароль
      </li>
      <li className="main-menu__item simple-text_main">
        Мои данные
      </li>
      <li className="main-menu__item simple-text_main">
        Выход
      </li>
    </ul>
  );
}