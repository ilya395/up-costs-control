import { MAIN_MENU_CHANGE_PASSWORD, MAIN_MENU_LIST, MAIN_MENU_LOGOUT, MAIN_MENU_MY_DATA } from "../actions";

const initialNainMenuState = {
  myData: null,
  changePassword: null,
  logout: null,
}

export const MainMenyReducer = (state = initialNainMenuState, action) => {
  switch (action.type) {
    case MAIN_MENU_CHANGE_PASSWORD:
      return {
        ...state,
        myData: false,
        changePassword: true,
        logout: false,
      }
    case MAIN_MENU_MY_DATA:
      return {
        ...state,
        myData: true,
        changePassword: false,
        logout: false,
      }
    case MAIN_MENU_LOGOUT:
      return {
        ...state,
        myData: false,
        changePassword: false,
        logout: true,
      }
    case MAIN_MENU_LIST:
      return {
        ...state,
        ...initialNainMenuState,
      }
    default:
      return state;
  }
}

export const menuDataSelector = state => state.mainMenu.myData;
export const menuChangePasswordSelector = state => state.mainMenu.changePassword;
export const menuLogoutSelector = state => state.mainMenu.logout;