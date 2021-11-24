import React from "react";
import { useDispatch } from "react-redux";
import { modalSupportAction } from "../../modules/modal";
import { NavButton } from "../NavButton/NavButton.component";

export const NavBar = () => {

  const dispatch = useDispatch();

  const openProfile = () => {
    dispatch(modalSupportAction());
  }

  const openSupport = () => {}

  const addObject = () => {}

  return (
    <nav className="nav-bar">
      <NavButton
        icon={
          () => (
            <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7018 8.34033C20.7018 12.3899 17.2967 15.7024 13.0589 15.7024C8.82122 15.7024 5.41608 12.3899 5.41608 8.34033C5.41608 4.29077 8.82122 0.978271 13.0589 0.978271C17.2967 0.978271 20.7018 4.29077 20.7018 8.34033Z" stroke="#AC1900"/>
              <path d="M24.6304 24.4783C22.8159 22.1945 17.8015 17.6743 12.2592 17.8633C6.71697 18.0523 2.19738 22.352 0.630371 24.4783" stroke="#AC1900"/>
            </svg>
          )
        }
        title={"профиль"}
        url={"/profile"}
        callback={openProfile}
      />
      <NavButton
        icon={
          () => (
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.27586 1L1 7.98182V25H25V1H9.27586Z" stroke="#AC1900"/>
              <path d="M5 11.5H21" stroke="#AC1900"/>
              <path d="M5 15.5H21" stroke="#AC1900"/>
              <path d="M5 19.5H21" stroke="#AC1900"/>
            </svg>
          )
        }
        title={"поддержка"}
        url={"/support"}
        callback={openSupport}
      />
      <NavButton
        icon={
          () => (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12H0H12ZM12 24V12V24ZM12 12V0V12ZM12 12H24H12Z" stroke="#AC1900" strokeLinecap="round"/>
            </svg>
          )
        }
        title={"добавить"}
        url={"/add"}
        callback={addObject}
      />
    </nav>
  );
}