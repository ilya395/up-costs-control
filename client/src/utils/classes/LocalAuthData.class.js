import { AUTH_DATA } from "../../constants";

class LocalAuthData {
  setAuthData(data) {
    return localStorage.setItem(AUTH_DATA, data);
  }
  getAuthData() {
    return localStorage.getItem(AUTH_DATA);
  }
  removeAuthData() {
    return localStorage.removeItem(AUTH_DATA);
  }
  getToken() {
    if (localStorage.getItem(AUTH_DATA)) {
      if (typeof localStorage.getItem(AUTH_DATA) === "string") {
        return JSON.parse(localStorage.getItem(AUTH_DATA)).token;
      }
    }
    return localStorage.getItem(AUTH_DATA) && localStorage.getItem(AUTH_DATA).token;
  }
  getLogin() {
    if (localStorage.getItem(AUTH_DATA)) {
      if (typeof localStorage.getItem(AUTH_DATA) === "string") {
        return JSON.parse(localStorage.getItem(AUTH_DATA)).login;
      }
    }
    return localStorage.getItem(AUTH_DATA) && localStorage.getItem(AUTH_DATA).login;
  }
  getUserId() {
    if (localStorage.getItem(AUTH_DATA)) {
      if (typeof localStorage.getItem(AUTH_DATA) === "string") {
        return JSON.parse(localStorage.getItem(AUTH_DATA)).id;
      }
    }
    return localStorage.getItem(AUTH_DATA) && localStorage.getItem(AUTH_DATA).id;
  }
}

export const localAuthData = new LocalAuthData();