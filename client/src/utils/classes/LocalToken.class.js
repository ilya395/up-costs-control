import { TOKEN } from "../../constants";

class LocalToken {
  setToken(data) {
    return localStorage.setItem(TOKEN, data.token);
  }
  getToken() {
    return localStorage.getItem(TOKEN);
  }
  removeToken() {
    return localStorage.removeItem(TOKEN);
  }
}

export const localToken = new LocalToken();