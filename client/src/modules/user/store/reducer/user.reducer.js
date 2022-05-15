import { AWAIT_GET_USER, AWAIT_SET_USER_DATA, ERROR_GET_USER, ERROR_SET_USER_DATA, SUCCESS_GET_USER, SUCCESS_SET_USER_DATA } from "..";

export const initialGetUser = {
  data: null,
  await: false,
  error: false
};

export const UserReducer = (state = initialGetUser, action) => {
  switch (action.type) {
    case AWAIT_GET_USER:
      return {
        ...state,
        await: true,
        error: false,
      }
    case SUCCESS_GET_USER:
      return {
        ...state,
        data: action.payload,
        await: false,
        error: false,
      }
    case ERROR_GET_USER:
      return {
        ...state,
        data: null,
        await: false,
        error: action.payload,
      }
    default:
      return {
        ...state
      }
  }
}
export const userValueSelector = state => state.user.data;
export const userAwaitSelector = state => state.user.await;
export const userErrorSelector = state => state.user.error;

export const UserDataReducer = (
    state = {
      data: null,
      await: false,
      error: false
    },
    action
  ) => {
  switch (action.type) {
    case AWAIT_SET_USER_DATA:
      return {
        ...state,
        await: true,
        error: false,
      }
    case SUCCESS_SET_USER_DATA:
      return {
        ...state,
        data: action.payload,
        await: false,
        error: false,
      }
    case ERROR_SET_USER_DATA:
      return {
        ...state,
        await: false,
        error: action.payload,
      }
    default:
      return {
        ...state
      }
  }
}