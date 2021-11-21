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
  "#e0e0e0", // убрать на проде
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
  }
};

export const AUTH_DATA = "auth_data";

export const CLICK_DURATION = 1.5 * 1000;
export const CLICK_DELAY = 500;