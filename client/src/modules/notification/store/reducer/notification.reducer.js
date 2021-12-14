import { ADD_NOTIFICATION_MESSAGE, CLEAR_NOTIFICATION_MESSAGE, REMOVE_NOTIFICATION_MESSAGE } from "../actions";

export const initialNotificationState = {
  messages: [],
}

export const NotificationReducer = (state = initialNotificationState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION_MESSAGE:
      return {
        ...state,
        messages: state.messages.find(item => item.message === action.payload.message) ? [
          ...state.messages,
        ] : [
          ...state.messages,
          {
            active: true,
            message: action.payload.message,
            notificationType: action.payload.notificationType,
          }
        ],
      }
    case REMOVE_NOTIFICATION_MESSAGE:
      return {
        ...state,
        messages: state.messages.map(item => {
          if (item.message === action.payload.message) {
            return {
              active: false,
              message: action.payload.message,
              notificationType: action.payload.notificationType,
            }
          }
          return item;
        }), // state.messages.filter(item => item !== action.payload),
      }
    case CLEAR_NOTIFICATION_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(item => item.active),
      }
    default:
      return {
        ...state
      }
  }
}