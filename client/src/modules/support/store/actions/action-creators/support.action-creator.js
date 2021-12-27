import { AWAIT_PUSH_MESSAGE_TO_SUPPORT, ERROR_PUSH_MESSAGE_TO_SUPPORT, PUSH_MESSAGE_TO_SUPPORT, SUCCESS_PUSH_MESSAGE_TO_SUPPORT } from "../types/support.type";

export const pushMessageToSupportAction = payload => ({
  type: PUSH_MESSAGE_TO_SUPPORT,
  payload,
});

export const awaitPushMessageToSupportAction = () => ({
  type: AWAIT_PUSH_MESSAGE_TO_SUPPORT
});

export const errorPushMessageToSupportAction = payload => ({
  type: ERROR_PUSH_MESSAGE_TO_SUPPORT,
  payload,
});

export const succesPushMessageToSupport = payload => ({
  type: SUCCESS_PUSH_MESSAGE_TO_SUPPORT,
  payload,
});