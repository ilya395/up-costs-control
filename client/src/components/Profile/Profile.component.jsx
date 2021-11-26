import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangePassword, Logout, MyData } from "..";
import { mainMenuChangePasswordAction, mainMenuListAction, mainMenuLogoutAction, mainMenuMyDataAction } from "../../modules/main-menu";
import { MainMenu } from "../MainMenu/MainMenu.component";

export const Profile = props => {

  const { profile } = props.props;

  const dispatch = useDispatch();

  const mainMenu = useSelector(state => state.mainMenu);
  const open = useSelector(state => state.modal.open);
  useEffect(() => {
    open && dispatch(mainMenuListAction());
  }, [open])

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
          (!mainMenu.logout && !mainMenu.changePassword && !mainMenu.myData) ?
          <MainMenu
            profile={profile}
            onLogout={onLogout}
            onChangePassword={onChangePassword}
            onGetMyData={onGetMyData}
          /> :
          null
        }

        {
          mainMenu.logout && <Logout />
        }
        {
          mainMenu.changePassword && <ChangePassword />
        }
        {
          mainMenu.myData && <MyData />
        }
      </div>
    </>
  );
}