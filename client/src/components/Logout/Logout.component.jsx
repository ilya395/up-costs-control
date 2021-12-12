import React from "react";
import { useDispatch } from "react-redux";
import { authEndAction, modalClearAction } from "../../modules";
import { localAuthData } from "../../utils";

export const Logout = () => {

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(authEndAction());
    dispatch(modalClearAction());
    localAuthData.removeAuthData();
  }

  return (
    <div>
      <p className="simple-text_wide paragraph">
        Уверены, что хотите покинуть приложение? Ваши расходы сохранятся.
      </p>
      <button
        className="little-button simple-title_other margin-auto"
        onClick={onLogout}
      >
        Выйти
      </button>
    </div>
  );
}