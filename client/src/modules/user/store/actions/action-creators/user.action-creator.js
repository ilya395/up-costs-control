import { AWAIT_GET_USER, ERROR_GET_USER, GET_USER, SET_USER_DATA, SUCCESS_GET_USER, SUCCESS_SET_USER_DATA, ERROR_SET_USER_DATA, AWAIT_SET_USER_DATA } from "../types/user.type";

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

export const setUserDataAction = payload => ({
  type: SET_USER_DATA,
  payload,
});

export const awaitSetUserDataAction = () => ({
  type: AWAIT_SET_USER_DATA,
});
export const successSetUserDataAction = payload => ({
  type: SUCCESS_SET_USER_DATA,
  payload,
});
export const errorSetUserDataAction = payload => ({
  type: ERROR_SET_USER_DATA,
  payload,
});