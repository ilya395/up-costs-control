import React, { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalPlug, } from "..";
import { mainMenuChangePasswordAction, mainMenuLogoutAction, mainMenuMyDataAction } from "../../modules/main-menu";
import { MainMenu } from "../MainMenu/MainMenu.component";

const Logout = lazy(() => import("../Logout/Logout.component"));
const ChangePassword = lazy(() => import("../ChangePassword/ChangePassword.component"));
const MyData = lazy(() => import("../MyData/MyData.component"));

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
    <Suspense fallback={<ModalPlug />}>
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

        <Logout active={mainMenu.logout} />


        <ChangePassword active={mainMenu.changePassword} />


        <MyData profile={profile} active={mainMenu.myData} />

      </div>
    </Suspense>
  );
}

export default Profile;