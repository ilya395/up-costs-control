import { AWAIT_AUTH, ERROR_AUTH, SUCCESS_AUTH, END_AUTH } from "../actions/types/auth.type";

export const initialLoginState = {
  auth: false,
  authData: null,
  await: false,
  error: false
};

export function AuthReducer(state = initialLoginState, action) {
  switch (action.type) {

    case AWAIT_AUTH:
      return {
        ...state,
        auth: false,
        await: true,
        error: false,
      }

    case ERROR_AUTH:
      return {
        ...state,
        auth: false,
        await: false,
        error: action.payload
      }

    case SUCCESS_AUTH:
      return {
        ...state,
        auth: true,
        await: false,
        error: false,
        authData: action.payload,
      }

    case END_AUTH:
      return {
        ...state,
        ...initialLoginState,
      }

    default:
      return {
        ...state
      }
  }
}