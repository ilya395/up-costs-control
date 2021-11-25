import React, { useState } from "react";
import { MainMenu } from "../MainMenu/MainMenu.component";

export const Profile = props => {
  console.log("Support: ", props)

  const { profile } = props.props;

  const [visibleLogoutComponent, setVisibleLogoutComponent] = useState(false);
  const [visibleChangePasswordComponent, setVisibleChangePasswordComponent] = useState(false);
  const [visibleMyDataComponent, setVisibleMyDataComponent] = useState(false);

  const onLogout = () => {
    setVisibleLogoutComponent(true);
    setVisibleChangePasswordComponent(false);
    setVisibleMyDataComponent(false);
  }

  const onChangePassword = () => {
    setVisibleLogoutComponent(false);
    setVisibleChangePasswordComponent(true);
    setVisibleMyDataComponent(false);
  }

  const onGetMyData = () => {
    setVisibleLogoutComponent(false);
    setVisibleChangePasswordComponent(false);
    setVisibleMyDataComponent(true);
  }

  return (
    <>
      <h2>
        {
          profile ? `${profile.shortName} ${profile.surname}` : "... ..."
        }
      </h2>
      <div className="support-container">
        <MainMenu
          profile={profile}
          onLogout={onLogout}
          onChangePassword={onChangePassword}
          onGetMyData={onGetMyData}
        />
      </div>
    </>
  );
}