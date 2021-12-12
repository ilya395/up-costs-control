import { call, put, takeEvery, delay } from "redux-saga/effects";
import { addNotificationMessageAction, NOTIFICATION_MESSAGE, removeNotificationMessageAction } from "..";
import { NOTIFICATION_LIFE_TIME } from "../../../constants";

function* moveNotification(data) {
  const { payload: message } = data;
  yield put(addNotificationMessageAction(message));
  yield delay(NOTIFICATION_LIFE_TIME);
  yield put(removeNotificationMessageAction(message));
}

export function* watchNotification() {
  yield takeEvery(NOTIFICATION_MESSAGE, moveNotification);
}