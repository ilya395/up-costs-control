import React, { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalPlug, } from "..";
import { mainMenuChangePasswordAction, mainMenuLogoutAction, mainMenuMyDataAction, menuChangePasswordSelector, menuDataSelector, menuLogoutSelector } from "../../modules/main-menu";
import { MainMenu } from "../MainMenu/MainMenu.component";

const Logout = lazy(() => import("../Logout/Logout.component"));
const ChangePassword = lazy(() => import("../ChangePassword/ChangePassword.component"));
const MyData = lazy(() => import("../MyData/MyData.component"));

const Profile = props => {

  const { profile } = props;

  const dispatch = useDispatch();

  const myData = useSelector(menuDataSelector);
  const changePassword = useSelector(menuChangePasswordSelector);
  const logout = useSelector(menuLogoutSelector);

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
          (!logout && !changePassword && !myData) ?
          (profile ? `${profile.shortName} ${profile.surname}` : "... ...") :
          (
            (logout && "Выход") ||
            (changePassword && "Смена пароля") ||
            (myData && "Мои данные")
          )
        }
      </h2>
      <div className="support-container">
        {
          (!logout && !changePassword && !myData) &&
          <MainMenu
            profile={profile}
            onLogout={onLogout}
            onChangePassword={onChangePassword}
            onGetMyData={onGetMyData}
          />
        }

        <Logout active={logout} />


        <ChangePassword active={changePassword} />


        <MyData profile={profile} active={myData} />

      </div>
    </Suspense>
  );
}

export default Profile;