import { MAIN_MENU_CHANGE_PASSWORD, MAIN_MENU_LOGOUT, MAIN_MENU_MY_DATA, MAIN_MENU_LIST } from "../types/main-menu.type";

export const mainMenuChangePasswordAction = () => ({
  type: MAIN_MENU_CHANGE_PASSWORD,
});

export const mainMenuMyDataAction = () => ({
  type: MAIN_MENU_MY_DATA,
});

export const mainMenuLogoutAction = () => ({
  type: MAIN_MENU_LOGOUT
});

export const mainMenuListAction = () => ({
  type: MAIN_MENU_LIST
});