import { AWAIT_GET_USER, ERROR_GET_USER, GET_USER, SUCCESS_GET_USER } from "../types/user.type";

export const getUserAction = payload => ({
  type: GET_USER,
  payload,
});

export const awaitGetUserAction = () => ({
  type: AWAIT_GET_USER,
});
export const successGetUserAction = payload => ({
  type: SUCCESS_GET_USER,
  payload,
});
export const errorGetUserAction = payload => ({
  type: ERROR_GET_USER,
  payload,
});