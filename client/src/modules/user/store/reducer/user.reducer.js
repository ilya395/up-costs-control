import { AWAIT_GET_USER, ERROR_GET_USER, SUCCESS_GET_USER } from "../actions/types/user.type";

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