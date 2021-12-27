import { AWAIT_PUSH_MESSAGE_TO_SUPPORT, SUCCESS_PUSH_MESSAGE_TO_SUPPORT, ERROR_PUSH_MESSAGE_TO_SUPPORT } from "../actions/types/support.type";

const initialSupportState = {
  await: false,
  data: null,
  error: null,
}

export const SupportReducer = (state = initialSupportState, action) => {
  switch (action.type) {
    case AWAIT_PUSH_MESSAGE_TO_SUPPORT:
      return {
        ...state,
        await: true,
        error: null,
      }
    case SUCCESS_PUSH_MESSAGE_TO_SUPPORT:
      return {
        ...state,
        await: false,
        data: action.payload,
        error: null,
      }
    case ERROR_PUSH_MESSAGE_TO_SUPPORT:
      return {
        ...state,
        await: false,
        error: action.payload
      }
    default:
      return {
        ...state
      }
  }
}