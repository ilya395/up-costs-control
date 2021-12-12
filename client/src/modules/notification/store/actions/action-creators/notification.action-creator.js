import { ADD_NOTIFICATION_MESSAGE, CLEAR_NOTIFICATION_MESSAGE, NOTIFICATION_MESSAGE, REMOVE_NOTIFICATION_MESSAGE } from "..";

export const notificationMessageAction = payload => ({
  type: NOTIFICATION_MESSAGE,
  payload,
});

export const addNotificationMessageAction = payload => ({
  type: ADD_NOTIFICATION_MESSAGE,
  payload,
});

export const removeNotificationMessageAction = payload => ({
  type: REMOVE_NOTIFICATION_MESSAGE,
  payload,
});

export const clearNotificationMessageAction = payload => ({
  type: CLEAR_NOTIFICATION_MESSAGE,
  payload,
});