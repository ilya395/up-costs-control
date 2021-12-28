import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { authEndAction, modalClearAction } from "../../modules";
import { localAuthData } from "../../utils";

const Logout = memo(props => {

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(authEndAction());
    dispatch(modalClearAction());
    localAuthData.removeAuthData();
  }

  return (
    <CSSTransition
      in={props.active}
      timeout={400}
      classNames={{
        enterActive: "block-show",
        exitActive: "block-hide",
      }}
      mountOnEnter
      unmountOnExit
    >
      <div className="logout-block">
        <p className="simple-text_wide paragraph">
          Уверены, что хотите покинуть приложение? Ваши расходы сохранятся.
        </p>
        <button
          className="little-button simple-title_other margin-auto"
          onClick={onLogout}
          aria-label={"Выйти из приложения"}
        >
          Выйти
        </button>
      </div>
    </CSSTransition>
  );
});

export default Logout;