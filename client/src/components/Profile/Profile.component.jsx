import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { ChangePassword, Logout, MyData } from "..";
import { mainMenuChangePasswordAction, mainMenuLogoutAction, mainMenuMyDataAction } from "../../modules/main-menu";
import { MainMenu } from "../MainMenu/MainMenu.component";

const Profile = props => {

  const { profile } = props;

  const dispatch = useDispatch();

  const mainMenu = useSelector(state => state.mainMenu);

  const onLogout = () => {
    dispatch(mainMenuLogoutAction());
  }

  const onChangePassword = () => {
    dispatch(mainMenuChangePasswordAction());
  }

  const onGetMyData = () => {
    dispatch(mainMenuMyDataAction());
  }

  return (
    <>
      <h2>
        {
          (!mainMenu.logout && !mainMenu.changePassword && !mainMenu.myData) ?
          (profile ? `${profile.shortName} ${profile.surname}` : "... ...") :
          (
            (mainMenu.logout && "Выход") ||
            (mainMenu.changePassword && "Смена пароля") ||
            (mainMenu.myData && "Мои данные")
          )
        }
      </h2>
      <div className="support-container">
        {
          (!mainMenu.logout && !mainMenu.changePassword && !mainMenu.myData) &&
          <MainMenu
            profile={profile}
            onLogout={onLogout}
            onChangePassword={onChangePassword}
            onGetMyData={onGetMyData}
          />
        }

        <CSSTransition
          in={mainMenu.logout}
          timeout={400}
          classNames={{
            enterActive: "block-show",
            exitActive: "block-hide",
          }}
          mountOnEnter
          unmountOnExit
        >
          <Logout />
        </CSSTransition>

        <CSSTransition
          in={mainMenu.changePassword}
          timeout={400}
          classNames={{
            enterActive: "block-show",
          }}
          mountOnEnter
          unmountOnExit
        >
          <ChangePassword />
        </CSSTransition>
        <CSSTransition
          in={mainMenu.myData}
          timeout={400}
          classNames={{
            enterActive: "block-show",
          }}
          mountOnEnter
          unmountOnExit
        >
          <MyData profile={profile} />
        </CSSTransition>
      </div>
    </>
  );
}

export default Profile;