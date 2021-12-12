export const buttonColors = new Set([
  "#FF9B5F",
  "#FFE55F",
  "#C2FF5F",
  "#6CFF5F",
  "#5FFFB2",
  "#5FE2FF",
  "#5F82FF",
  "#C25FFF",
  "#F25FFF",
  "#FF5FC9",
  "#FF5F5F",
  "#C15340",
]);

export const API_URL = {
  auth: {
    post: "/api/auth/getToken",
  },
  collection: {
    post: "/api/collection/costs",
  },
  users: {
    get: "/api/users/get",
    set: "/api/users/set",
    delete: "/api/users/delete",
    update: "/api/users/update",
  },
  expenseItems: {
    get: "/api/expenseItems/get",
    set: "/api/expenseItems/set",
    update: "/api/expenseItems/update",
    delete: "/api/expenseItems/delete",
  },
  cost: {
    get: "/api/costs/get",
    set: "/api/costs/set",
    delete: "/api/costs/delete",
    update: "/api/costs/update",
  },
  user: {
    get: "/api/users/get",
    update: "/api/users/update",
  }
};

export const AUTH_DATA = "auth_data";

export const CLICK_DURATION = 1.5 * 1000;
export const CLICK_DELAY = 500;

export const transitionMode = {
  outIn: "out-in",
  inOut: "in-out",
}

export const NOTIFICATION_LIFE_TIME = 1500;

export const NOTIFICATION_ERROR = "NOTIFICATION_ERROR";
export const NOTIFICATION_WARNING = "NOTIFICATION_WARNING";
export const NOTIFICATION_INFO = "NOTIFICATION_INFO";
export const NOTIFICATION_SUCCESS = "NOTIFICATION_SUCCESS";